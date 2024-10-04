import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { MainBoss } from "../baseBoss";
import { CELL_SIZE, frostBoltHitSoundBuffer, frostBoltSoundBuffer, playSound } from "../../main";
import { playerTakeDamage } from "../../utils";
import { canSeePlayer } from '../../boss';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export class FrostlordBoss extends MainBoss {
  constructor(position, id, rng, floor, type) {
    super(position, id, rng, floor, type);
    this.loadMainBossModel();
    this.frostAuraActive = false;
    this.frostAuraDuration = 10000; // 10 sekund
    this.frostAuraStartTime = 0;
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
    if (this.frostAuraActive && Date.now() - this.frostAuraStartTime > this.frostAuraDuration) {
      this.frostAuraActive = false;
    }
  }
}

export class GlacialNovaAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 15000;
    this.lastUseTime = 0;
    this.novaDuration = 3000;
    this.novaRadius = 15;
    this.damagePerSecond = 30;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(frostBoltSoundBuffer);
    this.createGlacialNovaEffect();
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;

    if (this.boss.attackAction) {
        this.boss.attackAction.reset().play();
        this.boss.attackAction.clampWhenFinished = true;
        this.boss.attackAction.setLoop(THREE.LoopOnce);
    }
  }

  createGlacialNovaEffect() {
    const novaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x87cefa) },
        color2: { value: new THREE.Color(0xffffff) },
        duration: { value: this.novaDuration / 1000 }
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
          float n = noise(vPosition * 0.5 + time * 0.2);
          float edge = smoothstep(0.8, 1.0, length(vPosition) / ${this.novaRadius.toFixed(1)});
          vec3 color = mix(color1, color2, n);
          float fadeOut = smoothstep(1.0, 0.0, time / duration);
          float alpha = (1.0 - edge) * (0.6 + 0.4 * sin(time * 3.0 + n * 10.0)) * fadeOut;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const novaGeometry = new THREE.IcosahedronGeometry(this.novaRadius, 4);
    const nova = new THREE.Mesh(novaGeometry, novaMaterial);
    nova.position.copy(this.boss.position);
    nova.position.y = 1;
    scene.add(nova);

    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * this.novaRadius;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
      particleSizes[i] = Math.random() * 0.5 + 0.1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x87cefa) },
        duration: { value: this.novaDuration / 1000 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform float duration;
        void main() {
          vColor = vec3(0.5 + 0.5 * sin(time + position.y), 0.5 + 0.5 * sin(time + position.x), 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(1.0, 0.0, time / duration);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          gl_FragColor = vec4(vColor, (1.0 - r * 2.0) * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.position.copy(this.boss.position);
    particles.position.y = 1;
    scene.add(particles);

    glacialNovaEffects.push({
      mesh: nova,
      particles: particles,
      startTime: Date.now(),
      duration: this.novaDuration,
      radius: this.novaRadius,
      damagePerSecond: this.damagePerSecond,
      boss: this.boss
    });
  }
}

export class IcicleBarrageAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 8000;
    this.lastUseTime = 0;
    this.icicleCount = 10;
    this.iciclesPerSalvo = 3;
    this.icicleInterval = 500;
    this.iciclesFired = 0;
    this.lastIcicleTime = 0;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use(deltaTime) {
    const currentTime = Date.now();
    if (currentTime - this.lastIcicleTime >= this.icicleInterval) {
      this.fireSalvo();
      this.iciclesFired++;
      this.lastIcicleTime = currentTime;
    }

    if (this.iciclesFired >= this.icicleCount) {
      this.iciclesFired = 0;
      this.lastUseTime = currentTime;
      this.boss.isUsingAbility = false;
    }
  }

  fireIcicle(targetPosition) {
    const icicleGeometry = new THREE.ConeGeometry(0.2, 1, 8);
    const icicleMaterial = new THREE.MeshPhongMaterial({
      color: 0x87cefa,
      transparent: true,
      opacity: 0.8,
      emissive: 0x87cefa,
      emissiveIntensity: 1.5
    });

    const icicle = new THREE.Mesh(icicleGeometry, icicleMaterial);

    const startPosition = this.boss.position.clone();
    startPosition.y += 5;
    icicle.position.copy(startPosition);

    const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
    icicle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    const speed = 0.5;
    icicle.velocity = direction.multiplyScalar(speed);

    scene.add(icicle);

    icicleBullets.push({
      mesh: icicle,
      velocity: icicle.velocity,
      damage: 30,
      startTime: Date.now(),
      duration: 5000
    });
  }

  fireSalvo() {
    if (!canSeePlayer(this.boss.position, player.position)) return;
    playSound(frostBoltSoundBuffer);

    if (this.boss.attackAction) {
        this.boss.attackAction.reset().play();
        this.boss.attackAction.clampWhenFinished = true;
        this.boss.attackAction.setLoop(THREE.LoopOnce);
    }
  

    const targetPosition = player.position.clone();
    const spread = 8; // Zvětšený rozptyl

    for (let i = 0; i < this.iciclesPerSalvo; i++) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        0,
        (Math.random() - 0.5) * spread
      );
      this.fireIcicle(targetPosition.clone().add(offset));
    }
  }
}

export class FrostWalkerAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 20000;
    this.lastUseTime = 0;
    this.duration = 10000;
    this.fadeOutDuration = 2000; // Doba, po kterou bude zóna mizet
    this.iceZoneCount = 5;
    this.iceZoneRadius = 4;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(frostBoltSoundBuffer);
    this.createIceZones();
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;

    if (this.boss.attackAction) {
        this.boss.attackAction.reset().play();
        this.boss.attackAction.clampWhenFinished = true;
        this.boss.attackAction.setLoop(THREE.LoopOnce);
    }

  }

  createIceZones() {
    for (let i = 0; i < this.iceZoneCount; i++) {
      const position = this.getRandomPosition();
      this.createIceZone(position);
    }
  }

  getRandomPosition() {
    const mapSize = 10 * CELL_SIZE;
    return new THREE.Vector3(
      (Math.random() - 0.5) * mapSize,
      0.05,
      (Math.random() - 0.5) * mapSize
    );
  }

  createIceZone(position) {
    const iceGeometry = new THREE.CircleGeometry(this.iceZoneRadius, 32);
    const iceMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x87cefa) },
        duration: { value: this.duration / 1000 },
        fadeOutDuration: { value: this.fadeOutDuration / 1000 }
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
        uniform float duration;
        uniform float fadeOutDuration;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - 0.5);
          float edge = smoothstep(0.9, 1.0, dist);
          float pulse = 0.5 + 0.5 * sin(time * 2.0 - dist * 5.0);
          vec3 finalColor = mix(color, vec3(1.0), pulse * 0.3);
          float fadeOut = smoothstep(duration - fadeOutDuration, duration, time);
          float alpha = (1.0 - edge) * (0.8 + 0.2 * pulse) * (1.0 - fadeOut);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const iceZone = new THREE.Mesh(iceGeometry, iceMaterial);
    iceZone.rotation.x = -Math.PI / 2;
    iceZone.position.copy(position);
    iceZone.position.y = 0.01;
    scene.add(iceZone);

    iceTrails.push({
      mesh: iceZone,
      startTime: Date.now(),
      duration: this.duration,
      fadeOutDuration: this.fadeOutDuration,
      position: position,
      radius: this.iceZoneRadius
    });
  }
}