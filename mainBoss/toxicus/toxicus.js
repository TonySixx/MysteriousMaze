import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { MainBoss } from "../baseBoss";
import { playSound, seedBurstSoundBuffer, voidRiftSoundBuffer } from "../../main";
import { Tween } from 'three/examples/jsm/libs/tween.module.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { playAttackAnimation } from '../../boss';

export class ToxicusBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel()
        this.poisonCloudActive = false;
        this.poisonCloudDuration = 8000; // 8 sekund
        this.poisonCloudStartTime = 0;
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
            return baseAttackCooldown * 0.5;
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.poisonCloudActive && Date.now() - this.poisonCloudStartTime > this.poisonCloudDuration) {
            this.poisonCloudActive = false;
        }
    }
}

export class PoisonCloudAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 20000;
        this.lastUseTime = 0;
        this.cloudRadius = 6;
        this.damagePerSecond = 25;
        this.cloudSpeed = 2;
        this.cloudLifetime = 10000;
        this.activeCloud = null;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(voidRiftSoundBuffer);
        playAttackAnimation(this.boss);
        this.createPoisonCloudEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createPoisonCloudEffect() {
        const cloudMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x00FF00) },
                color2: { value: new THREE.Color(0x008000) }
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
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
        }
        
        void main() {
          float n = noise(vPosition * 0.5 + time * 0.2);
          float edge = smoothstep(0.8, 1.0, length(vPosition) / ${this.cloudRadius.toFixed(1)});
          vec3 color = mix(color1, color2, n);
          float alpha = (1.0 - edge) * (0.6 + 0.4 * sin(time * 3.0 + n * 10.0));
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const cloudGeometry = new THREE.IcosahedronGeometry(this.cloudRadius, 4);
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.copy(this.boss.position);
        scene.add(cloud);

        const startPosition = this.boss.position.clone();
        const direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();

        this.activeCloud = {
            mesh: cloud,
            startTime: Date.now(),
            duration: this.cloudLifetime,
            radius: this.cloudRadius,
            damagePerSecond: this.damagePerSecond,
            startPosition: startPosition,
            direction: direction,
            speed: this.cloudSpeed
        };

        poisonClouds.push(this.activeCloud);
    }

    cancelAbility() {
        if (this.activeCloud) {
            scene.remove(this.activeCloud.mesh);
            poisonClouds = poisonClouds.filter(cloud => cloud !== this.activeCloud);
            this.activeCloud = null;
        }
        this.boss.isUsingAbility = false;
    }
}

export class AcidSprayAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 15000;
        this.lastUseTime = 0;
        this.sprayCount = 20;
        this.sprayInterval = 400;
        this.spraysFired = 0;
        this.lastSprayTime = 0;
        this.warningDuration = 500;
        this.innerRadius = 0;
        this.outerRadius = 5;
        this.activeWarnings = [];
        this.activeAcidSprays = [];
        this.sprayTimer = null;
    }


    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use(deltaTime) {
        const currentTime = Date.now();
        if (currentTime - this.lastSprayTime >= this.sprayInterval) {
            this.prepareAcidSpray();
            this.spraysFired++;
            this.lastSprayTime = currentTime;
        }

        if (this.spraysFired >= this.sprayCount) {
            this.spraysFired = 0;
            this.lastUseTime = currentTime;
            this.boss.isUsingAbility = false;
        }
    }

    prepareAcidSpray() {
        const targetPosition = this.getRandomPositionAroundPlayer();
        const warning = this.createWarningIndicator(targetPosition);
        this.activeWarnings.push(warning);

        this.sprayTimer = setTimeout(() => {
            this.fireAcidSpray(targetPosition);
            this.activeWarnings = this.activeWarnings.filter(w => w !== warning);
            scene.remove(warning);
        }, this.warningDuration);
    }

    getRandomPositionAroundPlayer() {
        const angle = Math.random() * Math.PI * 2;
        const distance = this.innerRadius + Math.random() * (this.outerRadius - this.innerRadius);
        const x = player.position.x + Math.cos(angle) * distance;
        const z = player.position.z + Math.sin(angle) * distance;
        return new THREE.Vector3(x, 0, z);
    }

    createWarningIndicator(position) {
        const geometry = new THREE.CircleGeometry(1.5, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5
        });
        const indicator = new THREE.Mesh(geometry, material);
        indicator.position.copy(position);
        indicator.position.y = 0.1;
        indicator.rotation.x = -Math.PI / 2;

        scene.add(indicator);

        return indicator;
    }

    fireAcidSpray(targetPosition) {
        playAttackAnimation(this.boss);
        playSound(seedBurstSoundBuffer);

        const sprayGroup = new THREE.Group();

        const sprayGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const sprayMaterial = new THREE.MeshPhongMaterial({
            color: 0xAAFF00,
            transparent: true,
            opacity: 0.8,
            emissive: 0x88FF00,
            emissiveIntensity: 0.5
        });
        const spray = new THREE.Mesh(sprayGeometry, sprayMaterial);
        sprayGroup.add(spray);

        const coreGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFF00,
            transparent: true,
            opacity: 0.7
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        sprayGroup.add(core);

        const particleCount = 50;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00FF00,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        for (let i = 0; i < particleCount; i++) {
            const radius = 0.7 * Math.random();
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i * 3 + 2] = radius * Math.cos(phi);
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        sprayGroup.add(particles);

        const startPosition = targetPosition.clone();
        startPosition.y = 20;
        sprayGroup.position.copy(startPosition);

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
        const speed = 0.7;
        sprayGroup.velocity = direction.multiplyScalar(speed);

        scene.add(sprayGroup);

        const pulseTween = new Tween({ scale: 0.8 })
            .to({ scale: 1.2 }, 500)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate((obj) => {
                spray.scale.setScalar(obj.scale);
                core.scale.setScalar(obj.scale * 0.8);
            });

        pulseTween.start();

        const acidSpray = {
            group: sprayGroup,
            velocity: sprayGroup.velocity,
            damage: 50,
            startTime: Date.now(),
            duration: 4000,
            targetPosition: targetPosition,
            update: (deltaTime) => {
                sprayGroup.rotation.x += deltaTime * 2;
                sprayGroup.rotation.y += deltaTime * 3;
                particles.rotation.y -= deltaTime * 5;
            }
        };

        this.activeAcidSprays.push(acidSpray);
        acidSprays.push(acidSpray);
    }

    cancelAbility() {
        if (this.sprayTimer) {
            clearTimeout(this.sprayTimer);
            this.sprayTimer = null;
        }

        this.activeWarnings.forEach(warning => {
            scene.remove(warning);
        });
        this.activeWarnings = [];

        this.activeAcidSprays.forEach(spray => {
            scene.remove(spray.group);
            acidSprays = acidSprays.filter(s => s !== spray);
        });
        this.activeAcidSprays = [];

        this.spraysFired = 0;
        this.boss.isUsingAbility = false;
    }
}