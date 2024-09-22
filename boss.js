import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { player, setPlayerHealth, playerHealth, updatePlayerHealthBar, addExperience, addGold, getPlayerLevel } from "./player.js"
import { CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, magicBalls, setTotalKeys, totalKeys, bossSoundBuffer, keyModel, playerDeath, frostBoltHitSoundBuffer, teleportSoundBuffer, killConfirmationSoundBuffer, frostBoltSoundBuffer, magicArrowSoundBuffer, playSound, aoeBlastSoundBuffer } from './main.js';
import { getTranslation } from "./langUtils.js";

export var bossCounter = 0; // Globální počítadlo pro ID bossů
export let bosses = [];

export function setBosses(value) {
    bosses = value;
}

export function setBossCounter(value) {
    bossCounter = value;
}

const BOSS_TYPES = [
    // První podlaží
    {
        name: "Ohnivý drak",
        translationKey: "fireDragon",
        specialAttacks: ['multiShot', 'aoeBlast'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xff7542, roughness: 0.1, metalness: 0.1 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xffa061, emissive: 0xffa061, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0xffa061),
        attackCooldown: 1,
        attackEmmisiveIntensity: 3,
        minHealth: 1000,
        maxHealth: 1500
    },
    {
        name: "Ledový drak",
        translationKey: "iceDragon",
        specialAttacks: ['frostbolt', 'teleport'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x45c1ff, roughness: 0.1, metalness: 0.1 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0x5cf7ff, emissive: 0x5cf7ff, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0x8af5ff),
        attackCooldown: 1,
        minHealth: 1500,
        maxHealth: 2000
    },
    {
        name: "Zemní drak",
        translationKey: "earthDragon",
        specialAttacks: ['aoeBlast', 'teleport'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x7bd672, roughness: 0.1, metalness: 0.1 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0x5cff74, emissive: 0x5cff74, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0x5cff74),
        attackCooldown: 1,
        minHealth: 1000,
        maxHealth: 2000
    },
    // Druhé podlaží
    {
        name: "Bouřkový drak",
        translationKey: "stormDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x4169e1, roughness: 0.1, metalness: 0.3 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xecff6e, emissive: 0xecff6e, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0x636eff),
        attackCooldown: 0.8,
        attackEmmisiveIntensity: 3,
        minHealth: 3000,
        maxHealth: 4500
    },
    {
        name: "Stínový drak",
        translationKey: "shadowDragon",
        specialAttacks: ['frostbolt', 'teleport', 'aoeBlast'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x4b0082, roughness: 0.1, metalness: 0.2 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0x8e4a91, emissive: 0x8e4a91, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0x8e4a91),
        attackCooldown: 0.8,
        minHealth: 2500,
        maxHealth: 5000
    },
    {
        name: "Krystalový drak",
        translationKey: "crystalDragon",
        specialAttacks: ['multiShot', 'frostbolt', 'teleport'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.7 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0x1fffff, emissive: 0x1fffff, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0x1fffff),
        attackCooldown: 0.8,
        minHealth: 3000,
        maxHealth: 6000
    },
    // Třetí podlaží
    {
        name: "Nebeský drak",
        translationKey: "celestialDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xadd8e6, roughness: 0.1, metalness: 0.5 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 }),
        attackColor: new THREE.Color(0xffffff),
        attackCooldown: 0.6,
        minHealth: 5500,
        maxHealth: 9000
    },
    {
        name: "Lávový drak",
        translationKey: "lavaDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 0.1, metalness: 0.3 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xff4500, emissiveIntensity: 1.5 }),
        attackColor: new THREE.Color(0xff643d),
        attackEmmisiveIntensity: 3,
        attackCooldown: 0.6,
        minHealth: 8000,
        maxHealth: 11000
    },
    {
        name: "Vesmírný drak",
        translationKey: "spaceDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt','magicArrow'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x3b278f, roughness: 0.1, metalness: 0.7 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 5 }),
        attackColor: new THREE.Color(0xffe34d),
        attackEmmisiveIntensity: 5,
        attackCooldown: 0.6,
        minHealth: 6000,
        maxHealth: 12500
    },
    // Čtvrté podlaží
    {
        name: "Astrální drak",
        translationKey: "astralDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xE6E6FA, roughness: 0.1, metalness: 0.8 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 3 }),
        attackColor: new THREE.Color(0xd0a1ff),
        attackCooldown: 0.5,
        attackEmmisiveIntensity: 4,
        minHealth: 8000,
        maxHealth: 12000
    },
    {
        name: "Kvantový drak",
        translationKey: "quantumDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0x2e7eff, roughness: 0.1, metalness: 0.7, transparent: true, opacity: 0.8 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0x2e7eff, emissive: 0x2e7eff, emissiveIntensity: 3 }),
        attackColor: new THREE.Color(0x2e7eff),
        attackCooldown: 0.4,
        attackEmmisiveIntensity: 4,
        minHealth: 10000,
        maxHealth: 15000
      },
    {
        name: "Éterický drak",
        translationKey: "etherealDragon",
        specialAttacks: ['multiShot', 'aoeBlast', 'teleport', 'frostbolt','magicArrow'],
        dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.8 }),
        eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
        eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xffb5d8, emissive: 0xffb5d8, emissiveIntensity: 3 }),
        attackColor: new THREE.Color(0xffb5d8),
        attackCooldown: 0.3,
        attackEmmisiveIntensity: 4,
        minHealth: 12000,
        maxHealth: 18000
    },
];


class Boss {
    constructor(position, id, rng, floor) {
        this.id = id;
        this.floor = floor;
        this.type = this.selectBossType(floor, rng);
        this.maxHealth = this.generateHealth(rng);
        this.health = this.maxHealth;
        this.position = position;
        this.attackCooldown = this.type.attackCooldown;
        this.teleportCooldown = 2000; // 2 sekundy cooldown
        this.lastTeleportTime = 0;
        this.originalMaterial = null;
        this.frozenMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEFA, emissive: 0x4169E1 });
        this.isFrozen = false;
        this.isBurning = false;
        this.burningTimer = 0;
        this.lastBurningDamageTime = 0;
        this.fireParticles = null;
        this.model = null;
        this.healthBar = null;
        this.healthBarContainer = null;
        this.mixer = null;
        this.idleAction = null;
        this.attackAction = null;
        this.clock = new THREE.Clock();
        this.lastAttackTime = 0;
        this.moveDirection = new THREE.Vector3();
        this.slowEffect = 1; // 1 znamená normální rychlost
        this.slowEndTime = 0;
        this.slowParticles = null;

        this.rng = rng;
        this.loadModel();
        this.changeDirection();
        this.createHealthUI();
    }

    selectBossType(floor, rng) {
        const floorTypes = BOSS_TYPES.slice((floor - 1) * 3, floor * 3);
        const selectedType = floorTypes[Math.floor(rng() * floorTypes.length)];
        selectedType.name = getTranslation(selectedType.translationKey);
        return selectedType;
    }

    generateHealth(rng) {
        const minHealth = this.type.minHealth
        const maxHealth = this.type.maxHealth
        const interval = 200;
        const possibleValues = Math.floor((maxHealth - minHealth) / interval) + 1;
        const randomIndex = Math.floor(rng() * possibleValues);
        let health = minHealth + (randomIndex * interval);
        return Math.max(minHealth, Math.min(maxHealth, health));
    }

    getSpecialAttackProbability(attackType) {
        switch (attackType) {
            case 'frostbolt':
                return 0.4; // 40% šance pro frostbolt
            case 'multiShot':
            case 'aoeBlast':
            case 'teleport':
                return 0.5; // 50% šance pro ostatní útoky
            default:
                return 0.5; // Výchozí hodnota pro případ, že by byl přidán nový typ útoku
        }
    }

    getBossColor(rng) {
        const colors = [
            new THREE.Color(0x33adff), // Modrá
            new THREE.Color(0x66ff99), // Zelená
            new THREE.Color(0xffff66), // Žlutá
            new THREE.Color(0xff66ff)  // Růžová
        ];
        return colors[Math.floor(rng() * colors.length)];
    }


    getSpecialAttackProbability() {
        switch (this.specialAttackType) {
            case 'frostbolt':
                return 0.2;
            case 'multiShot':
                return 0.5;
            case 'aoeBlast':
                return 0.3;
            case 'teleport':
                return 0.5;
            default:
                return 0.5; // Výchozí hodnota pro případ, že by byl přidán nový typ útoku
        }
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('models/Dragon.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(0.5, 0.5, 0.5);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === "Dragon_1") {
                        child.material = this.type.dragonMainMaterial;
                    } else if (child.name === "Dragon_4") {
                        child.material = this.type.eyeBlackMaterial;
                    } else if (child.name === "Dragon_5") {
                        child.material = this.type.eyeWhiteMaterial;
                    }
                }
            });
            scene.add(this.model);

            this.animations = gltf.animations;
            this.mixer = new THREE.AnimationMixer(this.model);
            this.idleAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Flying_Idle'));
            this.attackAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Punch'));
            this.idleAction.play();

            this.createHealthBar();
        });
    }

    createHealthBar() {
        const healthBarContainerGeometry = new THREE.PlaneGeometry(2, 0.2);
        const healthBarContainerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.healthBarContainer = new THREE.Mesh(healthBarContainerGeometry, healthBarContainerMaterial);
        this.healthBarContainer.position.set(0, 3, 0);
        this.model.add(this.healthBarContainer);

        const healthBarGeometry = new THREE.PlaneGeometry(2, 0.2);
        const healthBarMaterial = new THREE.MeshBasicMaterial({ color: this.type.attackColor });
        this.healthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
        this.healthBar.position.set(-1, 0, 0.01); // Posuneme healthbar do levého kraje kontejneru
        const healthRatio = this.health / this.maxHealth;
        this.healthBar.scale.x = healthRatio;
        this.healthBar.position.x = -1 + healthRatio;
        this.healthBarContainer.add(this.healthBar);
    }

    createHealthUI() {
        const bossHealthContainer = document.getElementById("bossHealthContainer");
        const bossHealthElement = document.createElement("div");
        bossHealthElement.id = `boss-${this.id}`;
        bossHealthElement.className = "boss-health";
        bossHealthElement.innerHTML = `
        <div class="boss-name">${this.type.name}</div>
        <div class="boss-health-bar">
          <div class="boss-health-fill" style="background-color: ${this.type.attackColor.getStyle()}"></div>
          <div class="boss-health-text"></div>
        </div>
      `;
        bossHealthContainer.appendChild(bossHealthElement);

        this.updateHealthUI();
    }


    updateHealthUI() {
        const bossHealthElement = document.getElementById(`boss-${this.id}`);
        if (bossHealthElement) {
            const healthFill = bossHealthElement.querySelector('.boss-health-fill');
            const healthText = bossHealthElement.querySelector('.boss-health-text');
            const healthPercentage = (this.health / this.maxHealth) * 100;
            healthFill.style.width = `${healthPercentage}%`;
            healthText.textContent = `${Math.round(this.health)} / ${this.maxHealth}`;
        }
    }

    updateHealthBar() {
        if (this.healthBar) {
            const healthRatio = this.health / this.maxHealth;
            this.healthBar.scale.x = healthRatio;
            this.healthBar.position.x = -1 + healthRatio;
        }

        this.updateHealthUI();
    }

    takeDamage(damage, burningEffect = false) {
        this.health -= damage;
        this.showDamageText(damage);
        if (this.health <= 0) {
            this.die();
        } else {
            if (burningEffect && !this.isBurning) {
                this.startBurning();
            }
        }
        this.updateHealthBar();
    }

    startBurning() {
        this.isBurning = true;
        this.burningTimer = 2000; // 2 sekundy
        this.lastBurningDamageTime = Date.now();
        this.createFireParticles();
    }

    createFireParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 1] = Math.random() * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

            colors[i * 3] = 1;
            colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
            colors[i * 3 + 2] = 0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });

        this.fireParticles = new THREE.Points(geometry, material);
        this.model.add(this.fireParticles);
    }

    updateBurning(deltaTime) {
        if (this.isBurning) {
            this.burningTimer -= deltaTime * 1000;
            const currentTime = Date.now();
            if (currentTime - this.lastBurningDamageTime >= 500) { // každých 0.5 sekundy
                this.takeDamage(20);
                this.lastBurningDamageTime = currentTime;
            }
            if (this.burningTimer <= 0) {
                this.stopBurning();
            }

            if (this.fireParticles) {
                this.updateFireParticles(deltaTime);
            }
        }
    }

    updateFireParticles(deltaTime) {
        const positions = this.fireParticles.geometry.attributes.position.array;
        const colors = this.fireParticles.geometry.attributes.color.array;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += deltaTime * 2; // Pohyb částic nahoru

            if (positions[i + 1] > 2) {
                positions[i + 1] = 0;
                positions[i] = (Math.random() - 0.5) * 2;
                positions[i + 2] = (Math.random() - 0.5) * 2;
            }

            // Změna barvy částic
            colors[i + 1] = Math.max(0, colors[i + 1] - deltaTime * 0.5);
        }

        this.fireParticles.geometry.attributes.position.needsUpdate = true;
        this.fireParticles.geometry.attributes.color.needsUpdate = true;
    }

    stopBurning() {
        this.isBurning = false;
        if (this.fireParticles) {
            this.model.remove(this.fireParticles);
            this.fireParticles.geometry.dispose();
            this.fireParticles.material.dispose();
            this.fireParticles = null;
        }
    }

    showDamageText(damage) {
        if (this.model) {
            const damageText = document.createElement('div');
            damageText.textContent = `-${damage}`;
            damageText.style.position = 'absolute';
            damageText.style.color = 'red';
            damageText.style.fontSize = '24px';
            damageText.style.fontWeight = 'bold';
            damageText.style.textShadow = '2px 2px 2px black';
            damageText.style.pointerEvents = 'none';

            document.body.appendChild(damageText);

            const startTime = performance.now();
            const duration = 2000; // 2 sekundy

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                if (elapsed < duration) {
                    const bossScreenPosition = this.getScreenPosition();
                    damageText.style.left = `${bossScreenPosition.x}px`;
                    damageText.style.top = `${bossScreenPosition.y - 50 - (elapsed / duration) * 50}px`;
                    damageText.style.opacity = 1 - (elapsed / duration);
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(damageText);
                }
            };

            requestAnimationFrame(animate);
        }
    }

    getScreenPosition() {
        const vector = new THREE.Vector3();
        this.model.getWorldPosition(vector);
        vector.project(camera);

        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        return {
            x: (vector.x * widthHalf) + widthHalf,
            y: -(vector.y * heightHalf) + heightHalf
        };
    }

    setFrozenAppearance(isFrozen) {
        if (this.model) {
            this.model.traverse((child) => {
                if (child.isMesh && child !== this.healthBar && child !== this.healthBarContainer) {
                    if (isFrozen) {
                        child.userData.originalMaterial = child.material;
                        child.material = this.frozenMaterial;
                    } else {
                        child.material = child.userData.originalMaterial || this.originalMaterial;
                    }
                }
            });
        }
    }

    freeze(time = 2000) {
        this.isFrozen = true;
        this.setFrozenAppearance(true);
        playSound(frostBoltHitSoundBuffer,0.7);
        setTimeout(() => {
            this.isFrozen = false;
            this.setFrozenAppearance(false);
        }, time);
    }

    showExpText(exp) {
        if (this.model) {
            const expText = document.createElement('div');
            expText.textContent = `+${exp} EXP`;
            expText.style.position = 'absolute';
            expText.style.color = 'purple';
            expText.style.fontSize = '28px';
            expText.style.fontWeight = 'bold';
            expText.style.textShadow = '2px 2px 2px black';
            expText.style.pointerEvents = 'none';

            document.body.appendChild(expText);

            const startTime = performance.now();
            const duration = 3000; // 3 sekundy

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                if (elapsed < duration) {
                    const bossScreenPosition = this.getScreenPosition();
                    expText.style.left = `${bossScreenPosition.x}px`;
                    expText.style.top = `${bossScreenPosition.y - 100 - (elapsed / duration) * 100}px`;
                    expText.style.opacity = 1 - (elapsed / duration);
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(expText);
                }
            };

            requestAnimationFrame(animate);
        }
    }

    showGoldText(gold) {
        if (this.model) {
            const expText = document.createElement('div');
            expText.textContent = `+${gold} G`;
            expText.style.position = 'absolute';
            expText.style.color = 'gold';
            expText.style.fontSize = '24px';
            expText.style.fontWeight = 'bold';
            expText.style.textShadow = '2px 2px 2px black';
            expText.style.pointerEvents = 'none';

            document.body.appendChild(expText);

            const startTime = performance.now();
            const duration = 3000; // 3 sekundy

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                if (elapsed < duration) {
                    const bossScreenPosition = this.getScreenPosition();
                    expText.style.left = `${bossScreenPosition.x}px`;
                    expText.style.top = `${bossScreenPosition.y - 130 - (elapsed / duration) * 100}px`;
                    expText.style.opacity = 1 - (elapsed / duration);
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(expText);
                }
            };

            requestAnimationFrame(animate);
        }
    }



    die() {
        if (this.model) {
            scene.remove(this.model);
        }
        this.stopBurning();

       playSound(killConfirmationSoundBuffer);

        const key = keyModel.clone();
        key.userData.isKey = true;
        key.position.copy(this.position);
        scene.add(key);

        bosses = bosses.filter(b => b !== this);

        const bossHealthElement = document.getElementById(`boss-${this.id}`);
        if (bossHealthElement) {
            bossHealthElement.remove();
        }

    // Přidání exp za zabití bosse
    const expGained = this.maxHealth + ((this.floor-1)* 1000);
    const exponent = 1.1;
    let totalExperience = Math.round(expGained * Math.pow(this.floor, exponent));

    // Úprava zkušeností na základě úrovně hráče a podlaží
    const playerLevel = getPlayerLevel(); // Předpokládáme, že tato funkce existuje
    let expMultiplier = 1;

    if (this.floor === 1 && playerLevel > 7) {
        expMultiplier = Math.max(0.1, 1 - (playerLevel - 7) * 0.15);
    } else if (this.floor === 2 && playerLevel > 12) {
        expMultiplier = Math.max(0.1, 1 - (playerLevel - 12) * 0.15);
    } else if (this.floor === 3 && playerLevel > 16) {
        expMultiplier = Math.max(0.1, 1 - (playerLevel - 16) * 0.15);
    } else if (this.floor === 4 && playerLevel > 20) {
        expMultiplier = Math.max(0.1, 1 - (playerLevel - 20) * 0.15);
    }

    totalExperience = Math.round(totalExperience * expMultiplier);
    addExperience(totalExperience);
    this.showExpText(totalExperience)

        // Přidání zlaťáků za zabití bosse
        const goldGained = Math.round((this.maxHealth / 100) + (this.floor * 10) + (Math.random() * 0.1 * this.maxHealth / 100));
        addGold(goldGained);
        this.showGoldText(goldGained);
    }

    attack() {
        const currentTime = performance.now();
        const attackCooldown = this.type.attackCooldown / this.slowEffect;
        if (currentTime - this.lastAttackTime >= attackCooldown * 1000) {
            const distanceToPlayer = this.position.distanceTo(player.position);
            if (distanceToPlayer > 15 && this.type.specialAttacks.includes('magicArrow') && this.rng() < 0.3) {
                this.magicArrowAttack();
            } else if (this.health < this.maxHealth / 2 && this.type.specialAttacks.length > 0) {
                const attackType = this.type.specialAttacks[Math.floor(this.rng() * this.type.specialAttacks.length)];
                if (this.rng() < this.getSpecialAttackProbability(attackType)) {
                    this.specialAttack(attackType);
                } else {
                    this.performStandardAttack();
                }
            } else {
                this.performStandardAttack();
            }
            this.lastAttackTime = currentTime;
        }
    }

    performStandardAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }
        playSound(bossSoundBuffer);
        const magicBall = this.createMagicBall(this.position, player.position);
        scene.add(magicBall);
        magicBalls.push(magicBall);
    }


    specialAttack(attackType) {
        switch (attackType) {
            case 'multiShot':
                this.multiShotAttack();
                break;
            case 'aoeBlast':
                this.aoeBlastAttack();
                break;
            case 'teleport':
                this.teleportAttack();
                break;
            case 'frostbolt':
                this.frostboltAttack();
                break;
        }
    }
    

    frostboltAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }
        playSound(frostBoltSoundBuffer);
        const frostbolt = this.createFrostbolt(this.position, player.position);
        scene.add(frostbolt);
        magicBalls.push(frostbolt);
    }

    createFrostbolt(startPosition, targetPosition) {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x87CEFA,
            emissive: 0x87CEFA,
            emissiveIntensity: 2
        });
        const frostbolt = new THREE.Mesh(geometry, material);
        frostbolt.position.copy(startPosition);
        frostbolt.position.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
        const speed = 0.3;
        frostbolt.velocity = direction.multiplyScalar(speed);
        frostbolt.isFrostbolt = true;

        return frostbolt;
    }

    multiShotAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }
        playSound(bossSoundBuffer);
        for (let i = 0; i < 5; i++) {
            const angle = (i - 2) * Math.PI / 10;
            const direction = new THREE.Vector3()
                .subVectors(player.position, this.position)
                .normalize()
                .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            const magicBall = this.createMagicBall(this.position, this.position.clone().add(direction));
            scene.add(magicBall);
            magicBalls.push(magicBall);
        }
    }

    aoeBlastAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }

        playSound(aoeBlastSoundBuffer);
        const blastRadius = 5;
        const blastGeometry = new THREE.SphereGeometry(blastRadius, 32, 32);
        const blastMaterial = new THREE.MeshBasicMaterial({
            color: this.type.attackColor,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const blast = new THREE.Mesh(blastGeometry, blastMaterial);
        blast.position.copy(this.position);
        scene.add(blast);



        // Damage player if within blast radius
        if (player.position.distanceTo(this.position) < blastRadius) {
            setPlayerHealth(playerHealth - 20);
            updatePlayerHealthBar();
            if (playerHealth <= 0) {
                playerDeath();
            }
        }

        // Remove blast effect after a short delay
        setTimeout(() => {
            scene.remove(blast);
        }, 1000);
    }

    teleportAttack() {
        const currentTime = performance.now();
        if (currentTime - this.lastTeleportTime < this.teleportCooldown) {
            return;
        }
    
        const teleportDistance = 5;
        let teleportDirection = new THREE.Vector3()
            .subVectors(player.position, this.position)
            .normalize()
            .multiplyScalar(teleportDistance);
        teleportDirection.y = 0;
    
        this.createTeleportParticles(this.position);
    
        const originalPosition = this.position.clone();
        let newPosition = this.position.clone().add(teleportDirection);
    
        newPosition = this.findSafeTeleportPosition(newPosition, originalPosition);
    
        if (newPosition) {
            playSound(teleportSoundBuffer);
    
            this.position.copy(newPosition);
            this.model.position.copy(this.position);
    
            const halfMazeSize = (MAZE_SIZE * CELL_SIZE) / 2;
            this.position.x = Math.max(Math.min(this.position.x, halfMazeSize), -halfMazeSize);
            this.position.z = Math.max(Math.min(this.position.z, halfMazeSize), -halfMazeSize);
    
            this.createTeleportParticles(this.position);
            this.lastTeleportTime = currentTime;
            this.performStandardAttack();
        } else {
            console.log("Boss nemohl najít bezpečnou pozici pro teleportaci");
        }
    }
    
    findSafeTeleportPosition(targetPosition, originalPosition) {
        if (!this.checkCollisionOnMove(targetPosition)) {
            return targetPosition;
        }
    
        const directions = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
        ];
    
        for (let i = 1; i <= 10; i++) {
            for (const direction of directions) {
                const testPosition = targetPosition.clone().add(direction.clone().multiplyScalar(i * 0.5));
                if (!this.checkCollisionOnMove(testPosition)) {
                    return testPosition;
                }
            }
        }
    
        return originalPosition; // Vrátíme původní pozici, pokud nebyla nalezena žádná bezpečná pozice
    }

    createTeleportParticles(position) {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = Math.random() * 2;
            const z = (Math.random() - 0.5) * 2;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: this.type.attackColor,
            size: 0.1,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        particles.position.copy(position);
        scene.add(particles);

        // Animace částic
        const animate = () => {
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += (Math.random() - 0.5) * 0.1;
                positions[i + 1] += 0.1;
                positions[i + 2] += (Math.random() - 0.5) * 0.1;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            material.opacity -= 0.02;

            if (material.opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                scene.remove(particles);
            }
        };

        animate();
    }


    magicArrowAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }

        playSound(magicArrowSoundBuffer);
        
        const magicArrow = this.createMagicArrow(this.position, player.position);
        scene.add(magicArrow);
        magicBalls.push(magicArrow);
    }
    
    createMagicArrow(startPosition, targetPosition) {
        const geometry = new THREE.ConeGeometry(0.1, 0.5, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0xc9a6ff,
            emissive: 0xc9a6ff,
            emissiveIntensity: 5
        });
        const magicArrow = new THREE.Mesh(geometry, material);
        magicArrow.position.copy(startPosition);
        magicArrow.position.y += 1;
    
        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
        magicArrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    
        const speed = 0.5; // Rychlejší než běžné útoky
        magicArrow.velocity = direction.multiplyScalar(speed);
        magicArrow.isMagicArrow = true;
        magicArrow.damage = 30; // Větší poškození
    
        return magicArrow;
    }


    createMagicBall(startPosition, targetPosition) {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: this.type.attackColor, emissive: this.type.attackColor,
            emissiveIntensity: this.type.emissiveIntensity || 2
        });
        const magicBall = new THREE.Mesh(geometry, material);
        magicBall.position.copy(startPosition);
        magicBall.position.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();

        // Nastavení rychlosti na základě rng, v rozmezí 0.2 - 0.3
        const speed = 0.2 + this.rng() * 0.1;
        magicBall.velocity = direction.multiplyScalar(speed);

        return magicBall;
    }

    changeDirection() {
        const randomAngle = Math.random() * 2 * Math.PI;
        this.moveDirection.set(Math.cos(randomAngle), 0, Math.sin(randomAngle));
    }

    move(deltaTime) {
        if (!this.model || !this.position) {
            return;
        }

        if (this.moveDirection.length() === 0) {
            this.changeDirection();
        }

        const speed = 5.0 * this.slowEffect; // Aplikujeme efekt zpomalení na rychlost pohybu
        const moveStep = this.moveDirection.clone().multiplyScalar(speed * deltaTime);
        const nextPosition = this.position.clone().add(moveStep);

        const halfMazeSize = (MAZE_SIZE * CELL_SIZE) / 2;
        if (
            nextPosition.x < -halfMazeSize || nextPosition.x > halfMazeSize ||
            nextPosition.z < -halfMazeSize || nextPosition.z > halfMazeSize
        ) {
            this.changeDirection(); // Pokud by boss opustil hranice bludiště, změní směr
        } else if (!this.checkCollisionOnMove(nextPosition)) {
            this.position.add(moveStep);
            this.model.position.copy(this.position);
        } else {
            this.changeDirection();
        }
    }


    checkCollisionOnMove(position) {
        for (let wall of walls) {
            const distance = position.distanceTo(wall.position);
            if (distance < CELL_SIZE / 2 + 1) { // Přidáme větší odstup pro bosse
                return true;
            }
        }
        return false;
    }

    slow(slowFactor, duration) {
        if (this.slowEffect === 1) {
            this.slowEffect = Math.min(this.slowEffect, slowFactor);
            this.slowEndTime = Math.max(this.slowEndTime, Date.now() + duration);
        this.createSlowParticles();
        }
    }

    update(deltaTime) {
        this.updateSlowParticles(deltaTime);
        if (this.isFrozen) return;

        if (Date.now() > this.slowEndTime) {
            this.slowEffect = 1;
            this.removeSlowParticles();
        } else if (this.slowParticles) {
            this.updateSlowParticles(deltaTime);
        }

        this.updateBurning(deltaTime);

        if (this.mixer) {
            this.mixer.update(deltaTime * this.slowEffect);
        }

        if (this.model) {
            this.model.lookAt(player.position);
        }

        if (canSeePlayer(this.position, player.position)) {
            this.attack();
        } else {
            this.move(deltaTime);
        }
    }

    createSlowParticles() {
        if (this.slowParticles) {
            this.removeSlowParticles();
        }
    
        this.slowParticles = new THREE.Group();
    
        // Ice trail
        const trailParticles = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({
                color: 0xADD8E6,
                size: 0.1,
                blending: THREE.AdditiveBlending,
                transparent: true,
            })
        );
    
        const trailPositions = new Float32Array(60 * 3);
        trailParticles.geometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
        this.slowParticles.add(trailParticles);
    
        // Jemné ledové částice
        const iceParticles = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({
                color: 0xFFFFFF,
                size: 0.03,
                blending: THREE.AdditiveBlending,
                opacity: 1,
            })
        );
    
        const icePositions = new Float32Array(100 * 3); // Zvýšili jsme počet částic
        for (let i = 0; i < icePositions.length; i += 3) {
            icePositions[i] = (Math.random() - 0.5) * 2; // Zvětšili jsme rozptyl na 2
            icePositions[i + 1] = (Math.random() - 0.5) * 2;
            icePositions[i + 2] = (Math.random() - 0.5) * 2;
        }
        iceParticles.geometry.setAttribute('position', new THREE.BufferAttribute(icePositions, 3));
        this.slowParticles.add(iceParticles);
    
        this.model.add(this.slowParticles);
    }
    
    updateSlowParticles(deltaTime) {
        if (!this.slowParticles) return;
    
        const trailParticles = this.slowParticles.children[0];
        const iceParticles = this.slowParticles.children[1];
    
        // Animate ice trail
        const trailPositions = trailParticles.geometry.attributes.position.array;
        for (let i = trailPositions.length - 1; i >= 3; i -= 3) {
            trailPositions[i] = trailPositions[i - 3];
            trailPositions[i - 1] = trailPositions[i - 4];
            trailPositions[i - 2] = trailPositions[i - 5];
        }
        
        // Nastavení nové pozice částice s větším rozptylem
        trailPositions[0] = (Math.random() - 0.5) * 2;
        trailPositions[1] = (Math.random() - 0.5) * 2;
        trailPositions[2] = (Math.random() - 0.5) * 2;
        
        trailParticles.geometry.attributes.position.needsUpdate = true;
    
        // Animate ice particles
        const icePositions = iceParticles.geometry.attributes.position.array;
        for (let i = 0; i < icePositions.length; i += 3) {
            icePositions[i] += (Math.random() - 0.5) * 0.02; // Zvětšili jsme pohyb částic
            icePositions[i + 1] += (Math.random() - 0.5) * 0.02;
            icePositions[i + 2] += (Math.random() - 0.5) * 0.02;
    
            // Omezení maximální vzdálenosti částic od středu
            const distance = Math.sqrt(
                icePositions[i] * icePositions[i] + 
                icePositions[i + 1] * icePositions[i + 1] + 
                icePositions[i + 2] * icePositions[i + 2]
            );
            if (distance > 1) {
                icePositions[i] *= 1 / distance;
                icePositions[i + 1] *= 1 / distance;
                icePositions[i + 2] *= 1 / distance;
            }
        }
        iceParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    removeSlowParticles() {
        if (this.slowParticles) {
            this.model.remove(this.slowParticles);
            this.slowParticles = null;
        }
    }


}

function spawnBossInMaze(maze, rng, selectedFloor) {
    let freeCells = [];

    for (let i = 0; i < MAZE_SIZE; i++) {
        for (let j = 0; j < MAZE_SIZE; j++) {
            if (maze[i][j] === 0) {
                freeCells.push({ x: i, z: j });
            }
        }
    }

    if (freeCells.length > 0) {
        let cell = freeCells[Math.floor(rng() * freeCells.length)];
        const bossPosition = new THREE.Vector3(
            (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
            0.5,
            (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );

        setBossCounter(bossCounter + 1)
        const boss = new Boss(bossPosition, bossCounter, rng, selectedFloor);
        boss.health = boss.maxHealth;
        bosses.push(boss);
        setTotalKeys(totalKeys + 1);
    } else {
        console.error("Nepodařilo se najít volnou buňku pro umístění bosse.");
    }
}

function canSeePlayer(bossPosition, playerPosition) {

    if (bossPosition.distanceTo(playerPosition) > 25) {
        return false;
    }

    // Vytvoříme kopie pozic, abychom neměnili originální objekty
    const bossPos = bossPosition.clone();
    const playerPos = playerPosition.clone();

    playerPos.y = 0;

    // Vytvoříme směrový vektor od bosse k hráči
    const direction = new THREE.Vector3().subVectors(playerPos, bossPos).normalize();

    // Vytvoříme raycaster
    const raycaster = new THREE.Raycaster(bossPos, direction);

    // Zkontrolujeme kolize se zdmi
    const intersects = raycaster.intersectObjects(walls);

    // Boss vidí hráče, pokud není žádná zeď mezi nimi
    return intersects.length === 0;
}

export { Boss, spawnBossInMaze };