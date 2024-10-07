import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { MainBoss } from "../baseBoss";
import { playSound, spell1SoundBuffer, spell2SoundBuffer } from "../../main";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { playerTakeDamage } from '../../utils';
import { playAttackAnimation } from '../../boss';

export class ArcaneLordBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, type);
        this.loadMainBossModel();
        this.arcaneShieldActive = false;
        this.arcaneShieldDuration = 10000; // 10 sekund
        this.arcaneShieldStartTime = 0;
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
        if (this.arcaneShieldActive && Date.now() - this.arcaneShieldStartTime > this.arcaneShieldDuration) {
            this.arcaneShieldActive = false;
        }
    }
}

export class ArcaneBarrageAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 15000;
        this.lastUseTime = 0;
        this.projectileCount = 30;
        this.projectileInterval = 200;
        this.projectilesFired = 0;
        this.lastProjectileTime = 0;
        this.projectileTimer = null;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use(deltaTime) {
        const currentTime = Date.now();
        if (currentTime - this.lastProjectileTime >= this.projectileInterval) {
            this.fireArcaneProjectile();
            this.projectilesFired++;
            this.lastProjectileTime = currentTime;
        }

        if (this.projectilesFired >= this.projectileCount) {
            this.projectilesFired = 0;
            this.lastUseTime = currentTime;
            this.boss.isUsingAbility = false;
        }
    }

    fireArcaneProjectile() {
        playSound(spell1SoundBuffer);
        playAttackAnimation(this.boss);

        const projectileGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const projectileMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x8A2BE2) },
                color2: { value: new THREE.Color(0x4B0082) }
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

        const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
        projectile.position.copy(this.boss.position);
        projectile.position.y += 2;

        const targetPosition = player.position.clone();
        targetPosition.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, projectile.position).normalize();
        const speed = 0.5;
        projectile.velocity = direction.multiplyScalar(speed);

        scene.add(projectile);

        arcaneProjectiles.push({
            mesh: projectile,
            velocity: projectile.velocity,
            damage: 40,
            startTime: Date.now(),
            duration: 5000
        });
    }

    cancelAbility() {
        if (this.projectileTimer) {
            clearTimeout(this.projectileTimer);
            this.projectileTimer = null;
        }
        this.projectilesFired = 0;
        this.boss.isUsingAbility = false;
    }
}

export class DimensionalRiftAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 25000;
        this.lastUseTime = 0;
        this.riftCount = 3;
        this.riftDuration = 8000;
        this.damagePerSecond = 30;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell2SoundBuffer);
        playAttackAnimation(this.boss);
        for (let i = 0; i < this.riftCount; i++) {
            this.createDimensionalRift();
        }
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createDimensionalRift() {
        const riftGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const riftMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x8A2BE2) },
                color2: { value: new THREE.Color(0x4B0082) }
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
                    float t = sin(vUv.x * 20.0 - time * 5.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, t);
                    float alpha = smoothstep(0.4, 0.6, t);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const rift = new THREE.Mesh(riftGeometry, riftMaterial);
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = Math.random() * 8 + 4;
        rift.position.set(
            this.boss.position.x + Math.cos(randomAngle) * randomRadius,
            this.boss.position.y + 1,
            this.boss.position.z + Math.sin(randomAngle) * randomRadius
        );
        rift.rotation.x = Math.PI / 2;
        scene.add(rift);

        dimensionalRifts.push({
            mesh: rift,
            startTime: Date.now(),
            duration: this.riftDuration,
            damagePerSecond: this.damagePerSecond
        });
    }

    cancelAbility() {
        dimensionalRifts.forEach(rift => {
            scene.remove(rift.mesh);
        });
        dimensionalRifts = [];
        this.boss.isUsingAbility = false;
    }
}

export class ArcaneShieldAbility extends Ability {
    constructor(boss) {
        super(boss);
        this.cooldown = 30000;
        this.lastUseTime = 0;
        this.shieldDuration = 10000;
    }

    canUse() {
        return Date.now() - this.lastUseTime >= this.cooldown;
    }

    use() {
        playSound(spell2SoundBuffer);
        this.boss.arcaneShieldActive = true;
        this.boss.arcaneShieldStartTime = Date.now();
        this.createArcaneShieldEffect();
        this.lastUseTime = Date.now();
        this.boss.isUsingAbility = false;
    }

    createArcaneShieldEffect() {
        const shieldGeometry = new THREE.SphereGeometry(3, 32, 32);
        const shieldMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x8A2BE2) },
                color2: { value: new THREE.Color(0x4B0082) }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec3 vNormal;
                
                void main() {
                    float t = sin(vNormal.y * 10.0 + time * 2.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, t);
                    float alpha = 0.6 + 0.4 * sin(time * 5.0);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
        this.boss.model.add(shield);

        arcaneShieldEffect = {
            mesh: shield,
            startTime: Date.now(),
            duration: this.shieldDuration
        };
    }

    cancelAbility() {
        if (arcaneShieldEffect) {
            arcaneShieldEffect.mesh.parent.remove(arcaneShieldEffect.mesh);
            arcaneShieldEffect = null;
        }
        this.boss.arcaneShieldActive = false;
        this.boss.isUsingAbility = false;
    }
}