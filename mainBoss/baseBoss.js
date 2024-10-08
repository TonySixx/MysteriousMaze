import { StateMachine } from "./mainBossUtils";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createBossCastEffect } from "../utils";
import {
    Boss,
    setBossCounter,
    bossCounter,
    bosses,
} from "../boss.js";
import { player } from "../player.js";
import {
    CELL_SIZE,
    createTeleportModel,
    manager,
    MAZE_SIZE,
    playSound,
    selectedFloor,
    spell1SoundBuffer,
    teleportSoundBuffer,
} from "../main.js";
import { updateQuestsOnEvent } from "../quests.js";
import { getTranslation } from "../langUtils.js";

export class MainBoss extends Boss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, true, type);
        this.maxHealth = type.maxHealth;
        this.health = type.maxHealth;
        this.isMainBoss = true;
        this.lastSpecialAttackTime = Date.now();
        this.specialAttackInterval = type.specialAttackInterval || 20000; // 20 sekund
        this.centerPosition = new THREE.Vector3(0, 0.5, 0);
        this.dontDropKey = true;

        this.abilities = type.abilities.map((AbilityClass) => new AbilityClass(this, type));
        this.currentAbilityIndex = 0;
        this.stateMachine = new StateMachine(this);
        this.isUsingAbility = false;

        // Iniciace aktivních efektů
        this.activeEffects = [];

        if (!this.type.hasCustomModel) {
            this.loadMainBossModel();
        }
        this.type.name = getTranslation(this.type.translationKey);
        this.changeDirection();
        this.createHealthUI();
    }

    loadMainBossModel() {
        const loader = new GLTFLoader();
        loader.load("models/GhostSkull.glb", (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(this.type.size || 1, this.type.size || 1, this.type.size || 1);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === "Ghost_Skull_1") {
                        child.material = this.type.mainMaterial;
                    } else if (child.name === "Ghost_Skull_2") {
                        child.material = this.type.secondaryMaterial;
                    }
                }
            });
            scene.add(this.model);

            this.animations = gltf.animations;
            this.mixer = new THREE.AnimationMixer(this.model);
            this.idleAction = this.mixer.clipAction(
                this.animations.find(
                    (clip) => clip.name === "CharacterArmature|Flying_Idle"
                )
            );
            this.attackAction = this.mixer.clipAction(
                this.animations.find((clip) => clip.name === "CharacterArmature|Punch")
            );
            this.idleAction.play();

            this.createHealthBar();
        });
    }

    update(deltaTime) {
        if (this.isFrozen) return;

        // Aktualizace stavového stroje
        this.stateMachine.update(deltaTime);

        // Aktualizace mixeru a modelu
        if (this.mixer) {
            this.mixer.update(deltaTime * this.slowEffect);
        }

        if (this.model) {
            this.model.lookAt(player.position);
        }

        // Ostatní aktualizace (stavy, efekty)
        this.updateStates(deltaTime);
    }


    // Implementace metody updateStates
    updateStates(deltaTime) {
        // Aktualizace efektu zpomalení
        if (Date.now() > this.slowEndTime) {
            this.slowEffect = 1;
            this.removeSlowParticles();
        } else if (this.slowParticles) {
            this.updateSlowParticles(deltaTime);
        }

        // Aktualizace hoření (burning effect)
        this.updateBurning(deltaTime);

        // Aktualizace a odstranění aktivních efektů
        this.activeEffects = this.activeEffects.filter((effect) => {
            const isActive = effect.userData.update(deltaTime);
            if (!isActive) {
                scene.remove(effect);
            }
            return isActive;
        });
    }

    die() {
        super.die();
        this.activeEffects = this.activeEffects.forEach((effect) => {
            scene.remove(effect);
        });

        // Aktualizace questu po zabití bosse
        updateQuestsOnEvent('mainBossDeath', { bossType: this.type.translationKey });

        // Přidání truhly po poražení bosse
        const loader = new GLTFLoader();
        loader.load("models/Chest.glb", (gltf) => {
            const chest = gltf.scene;
            chest.position.x = 0;
            chest.position.z = 0;
            chest.position.y = 0;
            chest.scale.set(0.6, 0.6, 0.6);
            chest.name = "chest";
            scene.add(chest);

            // Přidání interakční zóny
            const interactionZone = new THREE.Mesh(
                new THREE.CylinderGeometry(2, 2, 2, 32),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            interactionZone.position.copy(chest.position);
            scene.add(interactionZone);

            // Přidání textu pro interakci
            const interactionText = document.createElement("div");
            interactionText.className = "interaction-text";
            interactionText.textContent = "Press 'F' to open chest";
            interactionText.style.display = "none";
            document.body.appendChild(interactionText);
            var chestOpened = false;

            // Přidání portálu po poražení bosse
            const portal = createTeleportModel(0xff8080); // Zelená barva pro portál
            portal.position.set(0, 1.5, (-MAZE_SIZE * CELL_SIZE) / 2 + 2); // Umístění portálu na severní stranu místnosti
            scene.add(portal);

            // Přidání interakční zóny pro portál
            const portalInteractionZone = new THREE.Mesh(
                new THREE.CylinderGeometry(2, 2, 2, 32),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            portalInteractionZone.position.copy(portal.position);
            scene.add(portalInteractionZone);

            // Přidání textu pro interakci s portálem
            const portalInteractionText = document.createElement("div");
            portalInteractionText.className = "interaction-text";
            portalInteractionText.textContent = "Press 'F' to teleport to camp";
            portalInteractionText.style.display = "none";
            document.body.appendChild(portalInteractionText);

            // Vytvoření mixeru pro animaci truhly
            chestMixer = new THREE.AnimationMixer(chest);
            const chestOpenAction = chestMixer.clipAction(
                gltf.animations.find((clip) => clip.name === "Chest_Open")
            );
            chestOpenAction.setLoop(THREE.LoopOnce);
            chestOpenAction.clampWhenFinished = true;

            bossChestAndPortalData = {
                items: this.type.dropItems,
                chest: chest,
                portal: portal,
                interactionText: interactionText,
                portalInteractionText: portalInteractionText,
                chestOpened: false,
                chestMixer: chestMixer,
                chestOpenAction: chestOpenAction,
            };
        });
    }

    // Nová metoda pro rozhodování o použití schopnosti
    shouldUseAbility() {
        const currentTime = Date.now();
        return (
            currentTime - this.lastSpecialAttackTime >= this.specialAttackInterval &&
            !this.isUsingAbility
        );
    }

    // Metoda pro získání další schopnosti
    getNextAbility() {
        for (let i = 0; i < this.abilities.length; i++) {
            const abilityIndex = (this.currentAbilityIndex + i) % this.abilities.length;
            const ability = this.abilities[abilityIndex];
            if (ability.canUse()) {
                this.currentAbilityIndex = abilityIndex + 1;
                this.lastSpecialAttackTime = Date.now();
                return ability;
            }
        }
        // Žádná schopnost není dostupná
        return null;
    }


    createAttackEffect() {
        if (this.model) {
            const effectPosition = this.model.position.clone();
            const castEffect = createBossCastEffect(
                effectPosition,
                this.type.attackColor,
                {
                    particleCount: 50,
                    duration: 0.5,
                    spread: { x: 0.5, y: 0.3, z: 0.2 },
                    offset: { x: 0, y: 1, z: 0.05 },
                    speedFactor: 2.0,
                    glowIntensity: 1,
                    minSize: 0.2,
                    maxSize: 0.3,
                }
            );
            scene.add(castEffect);

            // Přidáme efekt do seznamu pro aktualizaci a odstranění
            this.activeEffects.push(castEffect);
        }
    }

    multiShot() {
        this.createAttackEffect();
        playSound(spell1SoundBuffer);
        const playerDirection = new THREE.Vector3()
            .subVectors(player.position, this.position)
            .normalize();
        const numberOfShots = 25; // Celkový počet střel
        const angleStep = (2 * Math.PI) / numberOfShots;

        for (let i = 0; i < numberOfShots; i++) {
            const angle = i * angleStep;
            const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

            // Přidáme náhodný offset
            const randomOffset = new THREE.Vector3(
                (Math.random() - 0.5) * 1,
                0,
                (Math.random() - 0.5) * 1
            );
            direction.add(randomOffset).normalize();

            // Nastavíme Y komponentu směru tak, aby mířila na hráče
            direction.y = playerDirection.y;

            const magicBall = this.createMagicBall(
                this.position,
                this.position.clone().add(direction),
                0.5
            );
            scene.add(magicBall);
            magicBalls.push(magicBall);
        }
    }

    spawnDragons() {
        this.createAttackEffect();
        playSound(teleportSoundBuffer);
        const centerPosition = new THREE.Vector3(0, 0.5, 0);
        const spacing = 2;
        const dragonStartHeight = 20;
        const dragonPositions = [
            new THREE.Vector3(
                centerPosition.x - spacing,
                centerPosition.y,
                centerPosition.z - spacing
            ),
            new THREE.Vector3(
                centerPosition.x + spacing,
                centerPosition.y,
                centerPosition.z - spacing
            ),
            new THREE.Vector3(
                centerPosition.x - spacing,
                centerPosition.y,
                centerPosition.z + spacing
            ),
            new THREE.Vector3(
                centerPosition.x + spacing,
                centerPosition.y,
                centerPosition.z + spacing
            ),
        ];

        dragonPositions.forEach((targetPosition) => {
            const startPosition = targetPosition.clone().setY(dragonStartHeight);
            setBossCounter(bossCounter + 1);
            const dragon = new Boss(
                startPosition,
                bossCounter,
                this.rng,
                selectedFloor - 100 + 1,
                false,
                null,
                true
            );
            dragon.health = dragon.maxHealth;
            bosses.push(dragon);

            mainBossDragons.push({
                dragon: dragon,
                startPosition: startPosition,
                targetPosition: targetPosition,
                startTime: performance.now(),
            });
        });
    }

    attack() {
        const currentTime = performance.now();
        const attackCooldown = this.calculateAttackCooldown() / this.slowEffect;
        if (currentTime - this.lastAttackTime >= attackCooldown * 1000) {
            this.performStandardAttack();
            this.createAttackEffect();
            this.lastAttackTime = currentTime;
        }
    }

    calculateAttackCooldown() {
        return this.type.attackCooldown;
    }
}
