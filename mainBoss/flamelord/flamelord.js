import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { MainBoss } from "../baseBoss";
import { playSound, fireballSoundBuffer, voidRiftSoundBuffer, CELL_SIZE } from "../../main";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Tween, Easing } from '@tweenjs/tween.js';  // Přidáno

export class FlamelordBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel();
        this.meteorStrikeActive = false;
        this.meteorStrikeDuration = 10000; // 10 sekund
        this.meteorStrikeStartTime = 0;
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
        if (this.meteorStrikeActive && Date.now() - this.meteorStrikeStartTime > this.meteorStrikeDuration) {
            this.meteorStrikeActive = false;
        }
    }
}

export class MeteorStrikeAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 25000; // 25 sekund
        this.lastUseTime = 0;
        this.meteorCount = 15;
        this.meteorInterval = 500; // 0.5 sekundy mezi meteory
        this.meteorsFired = 0;
        this.lastMeteorTime = 0;
        this.warningDuration = 1000; // 1 sekunda varování
        this.activeWarnings = [];
        this.activeMeteors = [];
        this.meteorTimer = null;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use(deltaTime) {
        const currentTime = Date.now();
        if (currentTime - this.lastMeteorTime >= this.meteorInterval) {
            this.prepareMeteorStrike();
            this.meteorsFired++;
            this.lastMeteorTime = currentTime;
        }

        if (this.meteorsFired >= this.meteorCount) {
            this.meteorsFired = 0;
            this.lastUseTime = currentTime;
            this.boss.isUsingAbility = false;
        }
    }

    prepareMeteorStrike() {
        const targetPosition = this.getRandomPosition();
        const warning = this.createWarningIndicator(targetPosition);
        this.activeWarnings.push(warning);

        this.meteorTimer = setTimeout(() => {
            this.fireMeteor(targetPosition);
            this.activeWarnings = this.activeWarnings.filter(w => w !== warning);
            scene.remove(warning);
        }, this.warningDuration);
    }

    getRandomPosition() {
        const roomSize = 10 * CELL_SIZE;
        const x = (Math.random() - 0.5) * roomSize;
        const z = (Math.random() - 0.5) * roomSize;
        return new THREE.Vector3(x, 0, z);
    }

    createWarningIndicator(position) {
        const geometry = new THREE.CircleGeometry(2, 32);
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

    fireMeteor(targetPosition) {
        playSound(fireballSoundBuffer);

        const meteorGroup = new THREE.Group();

        const meteorGeometry = new THREE.SphereGeometry(1, 32, 32);
        const meteorMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xff4500) },
                color2: { value: new THREE.Color(0xff8c00) }
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
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                
                void main() {
                    float t = sin(vUv.y * 10.0 + time * 5.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, t);
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });
        const meteorMesh = new THREE.Mesh(meteorGeometry, meteorMaterial);
        meteorGroup.add(meteorMesh);

        // Vytvoření "ohonu" meteoritu
        const trailGeometry = new THREE.ConeGeometry(0.5, 5, 32);
        const trailMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xff4500) },
                color2: { value: new THREE.Color(0xff8c00) }
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
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                
                void main() {
                    float t = sin(vUv.y * 5.0 - time * 10.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, t);
                    float alpha = smoothstep(1.0, 0.0, vUv.y);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        const trail = new THREE.Mesh(trailGeometry, trailMaterial);
        trail.position.y = -2.5;
        trail.rotation.x = Math.PI;
        meteorGroup.add(trail);

        const startPosition = targetPosition.clone();
        startPosition.y = 40;
        meteorGroup.position.copy(startPosition);

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
        const speed = 40;
        meteorGroup.velocity = direction.multiplyScalar(speed);

        scene.add(meteorGroup);

        const meteor = {
            group: meteorGroup,
            velocity: meteorGroup.velocity,
            damage: 100,
            startTime: Date.now(),
            duration: 5000,
            targetPosition: targetPosition,
            update: (deltaTime) => {
                meteorGroup.position.add(meteorGroup.velocity.clone().multiplyScalar(deltaTime));
                meteorGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), meteorGroup.velocity.clone().normalize());
                
                meteorMesh.material.uniforms.time.value += deltaTime;
                trail.material.uniforms.time.value += deltaTime;

                if (meteorGroup.position.y <= targetPosition.y) {
                    this.createExplosion(targetPosition);
                    scene.remove(meteorGroup);
                    return false;
                }
                return true;
            }
        };

        this.activeMeteors.push(meteor);
        meteors.push(meteor);
    }

    createExplosion(position) {
        const explosionGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const explosionMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xff4500) },
                color2: { value: new THREE.Color(0xff8c00) },
                color3: { value: new THREE.Color(0xffff00) }
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
                uniform vec3 color3;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                float noise(vec3 p) {
                    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
                }
                
                void main() {
                    float n = noise(vPosition * 3.0 + time * 5.0);
                    float rim = 1.0 - max(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 0.0);
                    vec3 color = mix(mix(color1, color2, n), color3, rim);
                    float alpha = (1.0 - length(vUv - 0.5) * 1.7) * smoothstep(1.0, 0.0, time);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
        explosion.position.copy(position);
        scene.add(explosion);

        const scale = { value: 0.1 };
        const duration = 500; // Prodloužíme dobu trvání exploze
        const tween = new Tween(scale)
            .to({ value: 20 }, duration) // Zvětšíme maximální velikost exploze
            .easing(Easing.Exponential.Out)
            .onUpdate(() => {
                explosion.scale.setScalar(scale.value);
                explosion.material.uniforms.time.value = (Date.now() - explosion.startTime) / 1000;
            })
            .onComplete(() => {
                scene.remove(explosion);
            })
            .start();

        explosion.startTime = Date.now();
        meteorExplosions.push({ mesh: explosion, tween: tween });
    }

    cancelAbility() {
        if (this.meteorTimer) {
            clearTimeout(this.meteorTimer);
            this.meteorTimer = null;
        }

        this.activeWarnings.forEach(warning => {
            scene.remove(warning);
        });
        this.activeWarnings = [];

        this.activeMeteors.forEach(meteor => {
            scene.remove(meteor.group);
            meteors = meteors.filter(m => m !== meteor);
        });
        this.activeMeteors = [];

        this.meteorsFired = 0;
        this.boss.isUsingAbility = false;
    }
}

export class InfernoWaveAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 20000; // 20 sekund
        this.lastUseTime = 0;
        this.waveDuration = 5000; // 5 sekund
        this.waveRadius = 12;
        this.damagePerSecond = 50;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(fireballSoundBuffer);
        this.createInfernoWaveEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createInfernoWaveEffect() {
        const waveMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xff4500) },
                color2: { value: new THREE.Color(0xff8c00) },
                waveRadius: { value: this.waveRadius }
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
                uniform float waveRadius;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    float dist = length(vPosition.xz);
                    float wave = sin(dist * 0.5 - time * 5.0) * 0.5 + 0.5;
                    float edge = smoothstep(waveRadius - 2.0, waveRadius, dist);
                    vec3 color = mix(color1, color2, wave);
                    float alpha = (1.0 - edge) * (0.6 + 0.4 * wave);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const waveGeometry = new THREE.PlaneGeometry(this.waveRadius * 2, this.waveRadius * 2, 32, 32);
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.rotation.x = -Math.PI / 2;
        wave.position.copy(this.boss.position);
        wave.position.y = 0.1;
        scene.add(wave);

        infernoWaves.push({
            mesh: wave,
            startTime: Date.now(),
            duration: this.waveDuration,
            radius: this.waveRadius,
            damagePerSecond: this.damagePerSecond,
            boss: this.boss
        });
    }

    cancelAbility() {
        infernoWaves.forEach(wave => {
            scene.remove(wave.mesh);
        });
        infernoWaves = [];
        this.boss.isUsingAbility = false;
    }
}

export class PhoenixRebirthAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 60000; // 60 sekund
        this.lastUseTime = 0;
        this.healAmount = 0.3; // 30% maximálního zdraví
        this.damageRadius = 10;
        this.damageAmount = 100;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown && this.boss.health <= this.boss.maxHealth * 0.3;
    }

    use() {
        console.log("Phoenix Rebirth Ability used");
        playSound(voidRiftSoundBuffer);
        this.createPhoenixRebirthEffect();
        this.healBoss();
        this.damagePlayer();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createPhoenixRebirthEffect() {
        const phoenixGeometry = new THREE.SphereGeometry(3, 32, 32);
        const phoenixMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xff4500) },
                color2: { value: new THREE.Color(0xffd700) }
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
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    float dist = distance(vUv, center);
                    float wave = sin(dist * 20.0 - time * 10.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, wave);
                    float alpha = smoothstep(0.5, 0.0, dist);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const phoenix = new THREE.Mesh(phoenixGeometry, phoenixMaterial);
        phoenix.position.copy(this.boss.position);
        scene.add(phoenix);

        phoenixRebirthEffects.push({
            mesh: phoenix,
            startTime: Date.now(),
            duration: 3000, // 3 sekundy
        });
    }

    healBoss() {
        const healAmount = this.boss.maxHealth * this.healAmount;
        this.boss.health = Math.min(this.boss.health + healAmount, this.boss.maxHealth);
        this.boss.updateHealthBar();
    }

    damagePlayer() {
        if (player.position.distanceTo(this.boss.position) <= this.damageRadius) {
            playerTakeDamage(this.damageAmount);
        }
    }

    cancelAbility() {
        phoenixRebirthEffects.forEach(effect => {
            scene.remove(effect.mesh);
        });
        phoenixRebirthEffects = [];
        this.boss.isUsingAbility = false;
    }
}