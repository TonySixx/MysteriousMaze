import { CELL_SIZE, playSound, spell1SoundBuffer, teleportSoundBuffer, voidRiftSoundBuffer } from "../../main";
import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { Boss, bossCounter, bosses, playAttackAnimation, setBossCounter } from "../../boss";
import { playerTakeDamage } from "../../utils";
import { MainBoss } from "../baseBoss";

export class ObsidianBlastAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 10000;
    this.lastUseTime = 0;
    this.duration = 3000; // 3 sekundy trvání
    this.damagePerSecond = 20;
    this.radius = 10;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(spell1SoundBuffer);
    playAttackAnimation(this.boss);
    const roomSize = 10 * CELL_SIZE; // Předpokládáme, že velikost místnosti je 10x10
    const possiblePositions = [
      new THREE.Vector3(-roomSize / 2, 0.5, -roomSize / 2),
      new THREE.Vector3(roomSize / 2, 0.5, -roomSize / 2),
      new THREE.Vector3(-roomSize / 2, 0.5, roomSize / 2),
      new THREE.Vector3(roomSize / 2, 0.5, roomSize / 2),
      new THREE.Vector3(0, 0.5, 0)
    ];
    const blastPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];

    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * this.radius;
      positions[i * 3] = Math.cos(angle) * radius + blastPosition.x;
      positions[i * 3 + 1] = Math.random() * 5 + blastPosition.y;
      positions[i * 3 + 2] = Math.sin(angle) * radius + blastPosition.z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = Math.random() * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8B00FF,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    particleSystem.startTime = Date.now();
    particleSystem.duration = this.duration;
    obsidianBlastParticleSystems.push(particleSystem);

    const startTime = Date.now();
    const applyDamage = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < this.duration) {
        if (player.position.distanceTo(blastPosition) <= this.radius) {
          playerTakeDamage(this.damagePerSecond / 10);
        }
        setTimeout(applyDamage, 100);
      }
    };

    applyDamage();

    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}

export class ShadowCloneAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 20000; // 20 sekund
    this.lastUseTime = 0;
    this.cloneCount = 2;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(teleportSoundBuffer);
    playAttackAnimation(this.boss);
    const clonePositions = [
      new THREE.Vector3(-3, 0.5, -3),
      new THREE.Vector3(3, 0.5, 3),
    ];

    const cloneStartHeight = 20;

    for (let i = 0; i < this.cloneCount; i++) {
      const targetPosition = clonePositions[i].add(this.boss.position);
      const startPosition = targetPosition.clone().setY(cloneStartHeight);
      
      setBossCounter(bossCounter + 1);
      const clone = new Boss(startPosition, bossCounter, this.boss.rng, 3, false, null, true);
      clone.health = clone.maxHealth;
      bosses.push(clone);

      mainBossDragons.push({
        dragon: clone,
        startPosition: startPosition,
        targetPosition: targetPosition,
        startTime: performance.now(),
      });
    }

    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}

export class VoidRiftAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 10000;
    this.lastUseTime = 0;
    this.duration = 8000; // 8 sekund
    this.damagePerSecond = 15;
    this.pullForce = 5;
    this.radius = 6;
    this.riftCount = 3 + Math.floor(Math.random() * 2); // 3 až 4 rifty
    this.roomSize = 10 * CELL_SIZE; // Předpokládáme, že velikost místnosti je 10x10
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(voidRiftSoundBuffer,0.8);
    playAttackAnimation(this.boss);
    for (let i = 0; i < this.riftCount; i++) {
      const riftPosition = new THREE.Vector3(
        (Math.random() - 0.5) * (this.roomSize/2),
        0.5,
        (Math.random() - 0.5) * (this.roomSize/2)
      ).add(this.boss.position);

      const riftGeometry = new THREE.SphereGeometry(1, 32, 32);
      const riftMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x8B00FF) }
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
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            float pulse = sin(time * 5.0) * 0.5 + 0.5;
            float alpha = smoothstep(0.5, 0.0, dist) * pulse;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const rift = new THREE.Mesh(riftGeometry, riftMaterial);
      rift.position.copy(riftPosition);
      scene.add(rift);

      // Upravíme směr pohybu, aby se rift pohyboval pouze v rámci místnosti
      const moveDirection = new THREE.Vector3(
        Math.random() - 0.5,
        0,
        Math.random() - 0.5
      ).normalize().multiplyScalar(0.05); // Snížíme rychlost pohybu

      voidRifts.push({
        rift,
        moveDirection,
        startTime: Date.now(),
        duration: this.duration,
        pullForce: this.pullForce,
        radius: this.radius,
        roomCenter: this.boss.position.clone(), // Přidáme střed místnosti
        roomSize: this.roomSize, // Přidáme velikost místnosti
        damagePerSecond: this.damagePerSecond
      });
    }

    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}


export class ObsidarothBoss extends MainBoss {
  constructor(position, id, rng, floor, type) {
    super(position, id, rng, floor, type);
  }

  calculateAttackCooldown() {
    const healthPercentage = this.health / this.maxHealth;
    if (healthPercentage > 0.5) {
      return this.type.attackCooldown;
    } else if (healthPercentage > 0.25) {
      return 0.8;
    } else {
      return 0.5;
    }
  }
}