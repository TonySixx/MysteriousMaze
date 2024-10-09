import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { MainBoss } from "../baseBoss";
import { playSound, CELL_SIZE, chainLightningSoundBuffer } from "../../main";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { createExplosion, playerTakeDamage } from '../../utils';
import { playAttackAnimation } from '../../boss';


export class ThunderlordBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel();
        this.electromagneticPulseActive = false;
        this.electromagneticPulseDuration = 5000; // 5 sekund
        this.electromagneticPulseStartTime = 0;
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
        if (this.electromagneticPulseActive && Date.now() - this.electromagneticPulseStartTime > this.electromagneticPulseDuration) {
            this.electromagneticPulseActive = false;
        }
    }
}

export class LightningStrikeAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 15000;
        this.lastUseTime = 0;
        this.strikeCount = 10;
        this.strikeInterval = 500;
        this.strikesFired = 0;
        this.lastStrikeTime = 0;
        this.strikeDamage = 200;
        this.strikeRadius = 3;
        this.warningDuration = 800; // 0.8 sekundy pro varování
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use(deltaTime) {
        this.strikeCount = this.boss.health / this.boss.maxHealth <= 0.25 ? 15 : 10;
        const currentTime = Date.now();
        if (currentTime - this.lastStrikeTime >= this.strikeInterval) {
            this.prepareLightningStrike();
            this.strikesFired++;
            this.lastStrikeTime = currentTime;
        }

        if (this.strikesFired >= this.strikeCount) {
            this.strikesFired = 0;
            this.lastUseTime = currentTime;
            this.boss.isUsingAbility = false;
        }
    }

    prepareLightningStrike() {
        const strikePosition = new THREE.Vector3(
            (Math.random() - 0.5) * 10 * CELL_SIZE,
            0,
            (Math.random() - 0.5) * 10 * CELL_SIZE
        );

        this.createWarningIndicator(strikePosition);

        setTimeout(() => {
            this.fireLightningStrike(strikePosition);
        }, this.warningDuration);
    }

    createWarningIndicator(position) {
        const warningGeometry = new THREE.CircleGeometry(this.strikeRadius, 32);
        const warningMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5
        });
        const warning = new THREE.Mesh(warningGeometry, warningMaterial);
        warning.position.copy(position);
        warning.position.y = 0.1;
        warning.rotation.x = -Math.PI / 2;
        scene.add(warning);

        setTimeout(() => {
            scene.remove(warning);
        }, this.warningDuration);
    }

    fireLightningStrike(position) {
        playSound(chainLightningSoundBuffer);
        playAttackAnimation(this.boss);
    
        // Generování cesty blesku
        const points = [];
        let currentPoint = new THREE.Vector3(position.x, 20, position.z);
        points.push(currentPoint.clone());
    
        for (let i = 0; i < 10; i++) {
            const nextPoint = currentPoint.clone().add(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    -1.5,
                    (Math.random() - 0.5) * 2
                )
            );
            points.push(nextPoint.clone());
            currentPoint = nextPoint;
        }
    
        points.push(new THREE.Vector3(position.x, 0, position.z));
    
        // Vytvoření křivky z bodů
        const lightningCurve = new THREE.CatmullRomCurve3(points);
    
        // Vytvoření TubeGeometry podél křivky
        const lightningGeometry = new THREE.TubeGeometry(
            lightningCurve,
            64,    // počet segmentů podél křivky
            0.15,   // poloměr trubice (tloušťka blesku)
            8,     // počet segmentů kolem obvodu
            false  // uzavřená křivka
        );
    
        // Vytvoření materiálu s vlastností emissive
        const lightningMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,             // Bílá barva jádra
            emissive: 0x4f2bff,          // Modrá záře
            emissiveIntensity: 7,        // Intenzita záře
            side: THREE.DoubleSide,
        });
    
        const lightningMesh = new THREE.Mesh(lightningGeometry, lightningMaterial);
        lightningMesh.frustumCulled = false;
        scene.add(lightningMesh);
        createExplosion(position,0xfffad1);
    
        lightningStrikes.push({
            mesh: lightningMesh,
            startTime: Date.now(),
            duration: 500,
            position: position,
            damage: this.strikeDamage,
            radius: this.strikeRadius,
            hasDamagedPlayer: false
        });
    }

    cancelAbility() {
        this.strikesFired = 0;
        this.boss.isUsingAbility = false;
        lightningStrikes.forEach(strike => {
            scene.remove(strike.mesh);
        });
        lightningStrikes = [];
    }
}

export class BallLightningAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 20000;
        this.lastUseTime = 0;
        this.ballCount = Math.floor(Math.random() * 3) + 1; // 1-3 kulové blesky
        this.ballDuration = 10000; // 10 sekund
        this.ballDamage = 50;
        this.ballRadius = 1;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(chainLightningSoundBuffer);
        playAttackAnimation(this.boss);
        for (let i = 0; i < this.ballCount; i++) {
            this.createBallLightning();
        }
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createBallLightning() {
        const ballGeometry = new THREE.SphereGeometry(this.ballRadius, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({
            color: 0x248aff,
            transparent: true,
            opacity: 0.8,
            emissive: 0x248aff,
            emissiveIntensity: 5
        });
        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        ball.position.set(
            (Math.random() - 0.5) * 5 * CELL_SIZE,
            this.ballRadius,
            (Math.random() - 0.5) * 5 * CELL_SIZE
        );
        scene.add(ball);

        const direction = new THREE.Vector3(
            Math.random() - 0.5,
            0,
            Math.random() - 0.5
        ).normalize();

        ballLightnings.push({
            mesh: ball,
            startTime: Date.now(),
            duration: this.ballDuration,
            direction: direction,
            speed: 5,
            damage: this.ballDamage,
            radius: this.ballRadius
        });
    }

    cancelAbility() {
        ballLightnings.forEach(ball => {
            scene.remove(ball.mesh);
        });
        ballLightnings = [];
        this.boss.isUsingAbility = false;
    }
}

export class ElectromagneticPulseAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 25000;
        this.lastUseTime = 0;
        this.pulseDuration = 5000; // 5 sekund
        this.pulseRadius = 18;
        this.damagePerSecond = 40;
        this.pullForce = 11;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(chainLightningSoundBuffer);
        playAttackAnimation(this.boss);
        this.boss.electromagneticPulseActive = true;
        this.boss.electromagneticPulseStartTime = Date.now();
        this.createElectromagneticPulseEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createElectromagneticPulseEffect() {
        const pulseGeometry = new THREE.SphereGeometry(this.pulseRadius, 32, 32);
        const pulseMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x3c2bcf) }
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
                    float intensity = 0.5 + 0.5 * sin(vUv.y * 10.0 + time * 5.0);
                    gl_FragColor = vec4(color, intensity * 0.5);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.position.copy(this.boss.position);
        scene.add(pulse);
        

        electromagneticPulse = {
            mesh: pulse,
            startTime: Date.now(),
            duration: this.pulseDuration,
            radius: this.pulseRadius,
            damagePerSecond: this.damagePerSecond,
            pullForce: this.pullForce,
            boss: this.boss
        };
    }

    cancelAbility() {
        if (electromagneticPulse) {
            scene.remove(electromagneticPulse.mesh);
            electromagneticPulse = null;
        }
        this.boss.electromagneticPulseActive = false;
        this.boss.isUsingAbility = false;
    }
}