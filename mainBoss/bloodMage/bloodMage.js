import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { MainBoss } from "../baseBoss";
import { playSound, CELL_SIZE, spell2SoundBuffer, spell1SoundBuffer } from "../../main";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { playerTakeDamage } from '../../utils';
import { playAttackAnimation } from '../../boss';

export class BloodMageBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel();
        this.bloodRitualActive = false;
        this.bloodRitualDuration = 15000; // 15 sekund
        this.bloodRitualStartTime = 0;
    }

    loadMainBossModel() {
        const loader = new GLTFLoader();
        loader.load("models/Tribal.glb", (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(this.type.size || 1, this.type.size || 1, this.type.size || 1);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    console.log(child.name);
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
            return baseAttackCooldown * 0.5;
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.bloodRitualActive && Date.now() - this.bloodRitualStartTime > this.bloodRitualDuration) {
            this.bloodRitualActive = false;
        }
    }
}

export class BloodVortexAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 20000;
        this.lastUseTime = 0;
        this.vortexCount = 3;
        this.vortexDuration = 8000;
        this.vortexRadius = 5;
        this.damagePerSecond = 50;
        this.pullForce = 5;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell1SoundBuffer);
        playAttackAnimation(this.boss);
        for (let i = 0; i < this.vortexCount; i++) {
            this.createBloodVortex();
        }
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createBloodVortex() {
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * CELL_SIZE * 8,
            0.5,
            (Math.random() - 0.5) * CELL_SIZE * 8
        ).add(this.boss.position);

        const vortexGeometry = new THREE.CylinderGeometry(0.1, this.vortexRadius, 10, 32, 1, true);
        const vortexMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x8B0000) },
                color2: { value: new THREE.Color(0xFF0000) },
                duration: { value: this.vortexDuration / 1000 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float duration;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                float noise(vec3 p) {
                    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
                }
                
                void main() {
                    float n = noise(vPosition * 0.1 + time * 0.5);
                    vec3 color = mix(color1, color2, n);
                    
                    float edge = smoothstep(0.0, 0.2, 1.0 - vUv.y);
                    float swirl = sin(vUv.y * 20.0 + time * 5.0 + vUv.x * 10.0) * 0.5 + 0.5;
                    float plasma = sin(vUv.x * 20.0 + time * 3.0) * sin(vUv.y * 20.0 + time * 2.0) * 0.5 + 0.5;
                    
                    float alpha = edge * swirl * plasma * smoothstep(1.0, 0.0, time / duration);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const vortex = new THREE.Mesh(vortexGeometry, vortexMaterial);
        vortex.position.copy(position);
        scene.add(vortex);

        bloodVortexes.push({
            mesh: vortex,
            startTime: Date.now(),
            duration: this.vortexDuration,
            radius: this.vortexRadius,
            damagePerSecond: this.damagePerSecond,
            pullForce: this.pullForce
        });
    }

    cancelAbility() {
        bloodVortexes.forEach(vortex => {
            scene.remove(vortex.mesh);
        });
        bloodVortexes = [];
        this.boss.isUsingAbility = false;
    }
}

export class BloodRitualAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 30000;
        this.lastUseTime = 0;
        this.ritualDuration = 15000;
        this.damagePerSecond = 30;
        this.healPerSecond = 1000;
        this.ritualRadius = 7;
        this.moveSpeed = 3; // Rychlost pohybu rituálu
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell2SoundBuffer);
        playAttackAnimation(this.boss);
        this.boss.bloodRitualActive = true;
        this.boss.bloodRitualStartTime = Date.now();
        this.createBloodRitualEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createBloodRitualEffect() {
        const ritualGeometry = new THREE.SphereGeometry(this.ritualRadius, 32, 32);
        const ritualMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x8B0000) },
                duration: { value: this.ritualDuration / 1000 }
            },
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                uniform float duration;
                varying vec3 vPosition;
                
                void main() {
                    float stripePattern = abs(sin(vPosition.y * 10.0 + time * 5.0));
                    vec3 stripeColor = mix(color, vec3(1.0, 0.0, 0.0), stripePattern);
                    
                    float edge = smoothstep(0.9, 1.0, length(vPosition) / ${this.ritualRadius.toFixed(1)});
                    float pulse = sin(time * 5.0 + length(vPosition) * 10.0) * 0.5 + 0.5;
                    
                    float fadeOut = smoothstep(duration - 1.0, duration, time);
                    float alpha = edge * pulse * (1.0 - fadeOut);
                    
                    gl_FragColor = vec4(stripeColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const ritual = new THREE.Mesh(ritualGeometry, ritualMaterial);
        ritual.userData.boss = this.boss; // Nastavení userData s odkazem na bosse
        scene.add(ritual);

        const startPosition = this.boss.position.clone();
        const direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();

        bloodRitualEffect = {
            mesh: ritual,
            startTime: Date.now(),
            duration: this.ritualDuration,
            damagePerSecond: this.damagePerSecond,
            healPerSecond: this.healPerSecond,
            radius: this.ritualRadius,
            position: startPosition,
            direction: direction,
            moveSpeed: this.moveSpeed
        };
    }

    cancelAbility() {
        if (bloodRitualEffect) {
            scene.remove(bloodRitualEffect.mesh);
            bloodRitualEffect = null;
        }
        this.boss.bloodRitualActive = false;
        this.boss.isUsingAbility = false;
    }
}

export class BloodLanceAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 15000;
        this.lastUseTime = 0;
        this.lanceCount = 5;
        this.lanceDamage = 100;
        this.lanceSpeed = 0.5;
        this.lanceRadius = 0.3;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playAttackAnimation(this.boss);
        for (let i = 0; i < this.lanceCount; i++) {
            setTimeout(() => this.createBloodLance(), i * 300);
        }
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createBloodLance() {
        playSound(spell1SoundBuffer);
        const lanceGeometry = new THREE.CylinderGeometry(this.lanceRadius, 0, 3, 8);
        const lanceMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x8B0000) }
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
                    float noise = sin(vUv.y * 10.0 + time * 5.0) * 0.5 + 0.5;
                    gl_FragColor = vec4(color, noise);
                }
            `,
            transparent: true
        });

        const lance = new THREE.Mesh(lanceGeometry, lanceMaterial);
        lance.position.copy(this.boss.position);
        lance.position.y += 2;

        const targetPosition = player.position.clone();
        targetPosition.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, lance.position).normalize();
        lance.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        scene.add(lance);

        bloodLances.push({
            mesh: lance,
            velocity: direction.multiplyScalar(this.lanceSpeed),
            damage: this.lanceDamage,
            startTime: Date.now(),
            duration: 5000
        });
    }

    cancelAbility() {
        bloodLances.forEach(lance => {
            scene.remove(lance.mesh);
        });
        bloodLances = [];
        this.boss.isUsingAbility = false;
    }
}