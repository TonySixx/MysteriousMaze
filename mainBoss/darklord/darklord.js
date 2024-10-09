import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { maxMana, player, playerMana, setPlayerMana } from "../../player";
import { MainBoss } from "../baseBoss";
import { playSound, CELL_SIZE, spell1SoundBuffer, spell2SoundBuffer, teleportSoundBuffer } from "../../main";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { playerTakeDamage, showTimeDilationEffect } from "../../utils";
import { playAttackAnimation } from '../../boss';
import { Boss, bossCounter, bosses, setBossCounter } from "../../boss";

export class DarklordBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel();
        this.darkMistActive = false;
        this.darkMistDuration = 8000
        this.darkMistStartTime = 0;
    }

    loadMainBossModel() {
        const loader = new GLTFLoader();
        loader.load("models/Tribal.glb", (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(this.type.size || 1, this.type.size || 1, this.type.size || 1);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === "Tribal_Flying_1") {
                        child.material = this.type.tribalMainMaterial;
                    } else if (child.name === "Tribal_Flying_2") {
                        child.material = this.type.tribalGoldMaterial;
                    } else if (child.name === "Tribal_Flying_3") {
                        child.material = this.type.eyeWhiteMaterial;
                    } else if (child.name === "Tribal_Flying_4") {
                        child.material = this.type.eyeBlackMaterial;
                    } else if (child.name === "Tribal_Flying_5") {
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

    calculateAttackCooldown() {
        const baseAttackCooldown = this.type.attackCooldown;
        const healthPercentage = this.health / this.maxHealth;
        if (healthPercentage > 0.5) {
            return baseAttackCooldown;
        } else if (healthPercentage > 0.25) {
            return baseAttackCooldown * 0.7;
        } else {
            return baseAttackCooldown * 0.8;
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.darkMistActive && Date.now() - this.darkMistStartTime > this.darkMistDuration) {
            this.darkMistActive = false;
        }
    }
}

export class DarkMistAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 20000;
        this.lastUseTime = 0;
        this.duration = 8000;
        this.slowFactor = 0.6;
        this.fadeOutDuration = 3000; // Doba postupného mizení (3 sekundy)
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell1SoundBuffer);
        playAttackAnimation(this.boss);
        this.boss.darkMistActive = true;
        this.boss.darkMistStartTime = Date.now();
        this.createDarkMistEffect();
        showTimeDilationEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createDarkMistEffect() {
        const particleCount = 3000;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);

        const roomSize = 10 * CELL_SIZE;
        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * roomSize;
            particlePositions[i * 3 + 1] = Math.random() * 5; // Výška mlhy
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * roomSize;
            particleSizes[i] = Math.random() * 2 + 0.5;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x4B0082) },
                duration: { value: this.duration / 1000 },
                fadeOutDuration: { value: this.fadeOutDuration / 1000 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                uniform float duration;
                uniform float fadeOutDuration;
                
                void main() {
                    vColor = vec3(0.29, 0.0, 0.51);
                    vec3 pos = position;
                    pos.y += sin(time * 0.5 + position.x * 0.1 + position.z * 0.1) * 0.2;
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    float fadeOut = smoothstep(duration - fadeOutDuration, duration, time);
                    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 - fadeOut);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform float time;
                uniform float duration;
                uniform float fadeOutDuration;
                
                void main() {
                    float r = distance(gl_PointCoord, vec2(0.5));
                    if (r > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.2, r);
                    float fadeOut = smoothstep(duration - fadeOutDuration, duration, time);
                    gl_FragColor = vec4(vColor, alpha * 0.6 * (1.0 - fadeOut));
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        darkMistEffect = {
            particles: particles,
            startTime: Date.now(),
            duration: this.duration,
            fadeOutDuration: this.fadeOutDuration,
            slowFactor: this.slowFactor,
            update: (deltaTime) => {
                const elapsedTime = (Date.now() - darkMistEffect.startTime) / 1000;
                particles.material.uniforms.time.value = elapsedTime;

                // Pohyb částic
                const positions = particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += Math.sin(elapsedTime * 0.5 + positions[i] * 0.1) * 0.01;
                    positions[i + 2] += Math.cos(elapsedTime * 0.5 + positions[i + 2] * 0.1) * 0.01;
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }
        };
    }

    cancelAbility() {
        if (darkMistEffect) {
            scene.remove(darkMistEffect.particles);
            darkMistEffect = null;
        }
        this.boss.darkMistActive = false;
        this.boss.isUsingAbility = false;
    }
}

export class SummonDragonsAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 37000; // 37 sekund
        this.lastUseTime = 0;
        this.dragonCount = 2;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(teleportSoundBuffer);
        playAttackAnimation(this.boss);
        const spawnPositions = [
            new THREE.Vector3(-3, 0.5, -3),
            new THREE.Vector3(3, 0.5, 3),
        ];

        const dragonStartHeight = 20;

        for (let i = 0; i < this.dragonCount; i++) {
            const targetPosition = spawnPositions[i].add(this.boss.position);
            const startPosition = targetPosition.clone().setY(dragonStartHeight);
            
            setBossCounter(bossCounter + 1);
            const dragon = new Boss(startPosition, bossCounter, this.boss.rng, 12, false, null, true);
            dragon.health = dragon.maxHealth;
            bosses.push(dragon);

            mainBossDragons.push({
                dragon: dragon,
                startPosition: startPosition,
                targetPosition: targetPosition,
                startTime: performance.now(),
            });
        }

        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }
}

export class ManaDrainAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 30000; // 30 sekund
        this.lastUseTime = 0;
        this.drainDuration = 5000; // 5 sekund
        this.drainPercentage = 0.7; // 70% many
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell2SoundBuffer);
        playAttackAnimation(this.boss);
        this.createManaDrainEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;

        const totalDrain = maxMana * this.drainPercentage;
        const drainPerSecond = totalDrain / (this.drainDuration / 1000);

        const drainInterval = setInterval(() => {
            setPlayerMana(Math.max(0, playerMana - drainPerSecond * 0.1));
            if (Date.now() - this.lastUseTime >= this.drainDuration) {
                clearInterval(drainInterval);
            }
        }, 100);
    }

    createManaDrainEffect() {
        const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
        const beamMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x8A2BE2) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec2 vUv;
                void main() {
                    float wave = sin(vUv.y * 20.0 - time * 10.0) * 0.5 + 0.5;
                    gl_FragColor = vec4(color, wave * 0.8);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        scene.add(beam);

        manaDrainEffect = {
            mesh: beam,
            startTime: Date.now(),
            duration: this.drainDuration,
            update: (deltaTime) => {
                const elapsedTime = Date.now() - manaDrainEffect.startTime;
                beam.material.uniforms.time.value = elapsedTime / 1000;

                const bossPosition = this.boss.position.clone();
                bossPosition.y += 2;
                const playerPosition = player.position.clone();
                playerPosition.y += 1;

                beam.position.copy(bossPosition.clone().lerp(playerPosition, 0.5));
                beam.scale.y = bossPosition.distanceTo(playerPosition);
                beam.lookAt(playerPosition);
                beam.rotateX(Math.PI / 2);

                if (elapsedTime >= this.drainDuration) {
                    scene.remove(beam);
                    manaDrainEffect = null;
                }
            }
        };
    }

    cancelAbility() {
        if (manaDrainEffect) {
            scene.remove(manaDrainEffect.mesh);
            manaDrainEffect = null;
        }
        this.boss.isUsingAbility = false;
    }
}

