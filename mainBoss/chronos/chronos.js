import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { playerTakeDamage } from "../../utils";
import { MainBoss } from "../baseBoss";
import { playSound, slowSoundBuffer, spell1SoundBuffer, voidRiftSoundBuffer } from "../../main";
import { playAttackAnimation } from '../../boss';

export class ChronosBoss extends MainBoss {
  constructor(position, id, rng, floor, type) {
    super(position, id, rng, floor, type);
    this.timeWarpActive = false;
    this.timeWarpDuration = 10000; // 10 sekund
    this.timeWarpStartTime = 0;
    this.clockwiseRotation = true;
  }

  calculateAttackCooldown() {
    const baseAttackCooldown = this.timeWarpActive ? this.type.attackCooldown * 0.5 : this.type.attackCooldown;
    const healthPercentage = this.health / this.maxHealth;
    if (healthPercentage > 0.5) {
      return baseAttackCooldown;
    } else if (healthPercentage > 0.25) {
      return baseAttackCooldown * 0.8;
    } else {
      return baseAttackCooldown * 0.6;
    }
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.timeWarpActive && Date.now() - this.timeWarpStartTime > this.timeWarpDuration) {
      this.timeWarpActive = false;
    }
    
    // Rotace bosse
    if (this.model) {
      const rotationSpeed = this.clockwiseRotation ? 0.5 : -0.5;
      this.model.rotation.y += rotationSpeed * deltaTime;
    }
  }
}

export class TimeWarpAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 30000; // 30 sekund
    this.lastUseTime = 0;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(spell1SoundBuffer);
    playAttackAnimation(this.boss);
    this.boss.timeWarpActive = true;
    this.boss.timeWarpStartTime = Date.now();
    this.createTimeWarpEffect();
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }

  createTimeWarpEffect() {
    const geometry = new THREE.TorusGeometry(12, 1, 16, 100);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffd700) }
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
          float wave = sin(vUv.x * 20.0 - time * 5.0) * 0.5 + 0.5;
          float alpha = smoothstep(0.4, 0.6, wave);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const effect = new THREE.Mesh(geometry, material);
    effect.position.copy(this.boss.position);
    effect.rotation.x = Math.PI / 2;
    scene.add(effect);

    timeWarpEffects.push({
      mesh: effect,
      startTime: Date.now(),
      duration: this.boss.timeWarpDuration
    });
  }
}

export class TemporalEchoAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 25000; // 25 sekund
    this.lastUseTime = 0;
    this.echoDuration = 8000; // 8 sekund
    this.echoCount = 4;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(slowSoundBuffer);
    playAttackAnimation(this.boss);
    this.createTemporalEchoes();
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }

  createTemporalEchoes() {
    const radius = 8;
    for (let i = 0; i < this.echoCount; i++) {
      const angle = (i / this.echoCount) * Math.PI * 2;
      const x = this.boss.position.x + Math.cos(angle) * radius;
      const z = this.boss.position.z + Math.sin(angle) * radius;
      const position = new THREE.Vector3(x, this.boss.position.y, z);
      
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.7,
        emissive: 0xffd700,
        emissiveIntensity: 2,
      });
      const echo = new THREE.Mesh(geometry, material);
      echo.position.copy(position);
      scene.add(echo);

      temporalEchoes.push({
        mesh: echo,
        startTime: Date.now(),
        duration: this.echoDuration,
        damage: this.boss.type.attackDamage * 0.5,
        originalPosition: position.clone()
      });
    }
  }
}

export class ChronoNovaAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 40000;
    this.lastUseTime = 0;
    this.chargeDuration = 3000;
    this.explosionRadius = 20;
    this.explosionDuration = 2000;
    this.isCharging = false;
    this.chargeTimer = null;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown && !this.isCharging;
  }

  use() {
    if (this.isCharging) return;

    this.isCharging = true;
    playSound(voidRiftSoundBuffer);
    this.createChargeEffect();
    playAttackAnimation(this.boss);

    this.chargeTimer = setTimeout(() => {
      playSound(spell1SoundBuffer);
      this.createChronoNovaExplosion();
      this.lastUseTime = Date.now();
      this.boss.isUsingAbility = false;
      this.isCharging = false;
      this.chargeTimer = null;
    }, this.chargeDuration);
  }

  cancelAbility() {
    if (this.chargeTimer) {
      clearTimeout(this.chargeTimer);
      this.chargeTimer = null;
    }
    this.isCharging = false;
    this.boss.isUsingAbility = false;
  }

  createChargeEffect() {
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffd700) }
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
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float pulse = sin(time * 10.0) * 0.5 + 0.5;
          float edge = smoothstep(0.5, 0.7, dot(vNormal, vec3(0, 1, 0)));
          vec3 finalColor = mix(color, vec3(1.0), edge * pulse);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    const effect = new THREE.Mesh(geometry, material);
    effect.position.copy(this.boss.position);
    scene.add(effect);

    chronoNovaEffects.push({
      mesh: effect,
      startTime: Date.now(),
      duration: this.chargeDuration,
      type: 'charge'
    });
  }

  createChronoNovaExplosion() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffd700) }
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
          float wave = sin(dist * 50.0 - time * 15.0) * 0.5 + 0.5;
          float alpha = smoothstep(1.0, 0.0, dist) * wave;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const explosion = new THREE.Mesh(geometry, material);
    explosion.position.copy(this.boss.position);
    scene.add(explosion);

    chronoNovaEffects.push({
      mesh: explosion,
      startTime: Date.now(),
      duration: this.explosionDuration,
      type: 'explosion',
      radius: this.explosionRadius,
      boss: this.boss
    });
  }
}