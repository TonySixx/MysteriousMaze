import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { Boss, bossCounter, bosses, playAttackAnimation, setBossCounter } from "../../boss";
import { playerTakeDamage, showTimeDilationEffect } from "../../utils";
import { MainBoss } from "../baseBoss";
import { blowSoundBuffer, playSound, slowSoundBuffer, spell1SoundBuffer } from "../../main";

export class QuantumGuardianBoss extends MainBoss {
  constructor(position, id, rng, floor, type) {
    super(position, id, rng, floor, type);
    this.isFlying = false;
    this.flyingHeight = 10;
    this.flyingDuration = 15000; // 15 sekund
    this.flyingStartTime = 0;
    this.flyingElapsedTime = 0;
    this.normalAttackCooldown = this.type.attackCooldown;
    this.flyingAttackCooldown = this.normalAttackCooldown * 0.7; // Větší rychlost útoku během létání
    this.flyingAttackSpeed = this.attackSpeed * 1.3
  }

  calculateAttackCooldown() {
    const baseAttackCooldown = this.isFlying && this.position.y > 9 ? this.flyingAttackCooldown : this.normalAttackCooldown;
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
    if (this.isFlying && !this.isFrozen) {
      this.flyingElapsedTime += deltaTime * 1000;
      const progress = Math.min(this.flyingElapsedTime / this.flyingDuration, 1);

      if (progress < 1) {
        const height = this.flyingHeight * Math.sin(progress * Math.PI);
        this.position.y = 0.5 + height;
        if (this.model) {
          this.model.position.y = this.position.y;
        }
      } else {
        this.isFlying = false;
        this.attackSpeed = this.normalAttackCooldown;
        this.position.y = 0.5;
        if (this.model) {
          this.model.position.y = this.position.y;
        }
      }
    }
  }

  freeze(time = 2000) {
    super.freeze(time);
    if (this.isFlying) {
      this.flyingStartTime = Date.now() - this.flyingElapsedTime;
    }
  }
}

export class QuantumLeapAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 30000; // 30 sekund
    this.lastUseTime = 0;
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(blowSoundBuffer);
    this.boss.isFlying = true;
    this.boss.attackSpeed = this.boss.flyingAttackSpeed;
    this.boss.flyingStartTime = Date.now();
    this.boss.flyingElapsedTime = 0;
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}

export class TimeDilationAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 25000; // 25 sekund
    this.lastUseTime = 0;
    this.duration = 5000; // 5 sekund
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(slowSoundBuffer);
    playAttackAnimation(this.boss);
    const timeDilationEffect = this.createTimeDilationVisualEffect();
    timeDilationEffects.push(timeDilationEffect);
    showTimeDilationEffect(); // Přidáno: zobrazení efektu při aktivaci schopnosti
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }

  createTimeDilationVisualEffect() {
    const geometry = new THREE.SphereGeometry(13, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) }
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
          float wave = sin(dist * 20.0 - time * 5.0) * 0.5 + 0.5;
          float alpha = smoothstep(0.5, 0.0, dist) * wave;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const effect = new THREE.Mesh(geometry, material);
    effect.position.copy(this.boss.position);
    scene.add(effect);

    return {
      mesh: effect,
      startTime: Date.now(),
      duration: this.duration,
    };
  }
}

export class EntanglementBeamAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.cooldown = 20000; // 20 sekund
    this.lastUseTime = 0;
    this.duration = 5000; // 5 sekund
    this.damage = 30; // Snížené poškození za sekundu
    this.maxRange = 15; // Maximální dosah paprsku
  }

  canUse() {
    return Date.now() - this.lastUseTime >= this.cooldown;
  }

  use() {
    playSound(spell1SoundBuffer);
    playAttackAnimation(this.boss);
    const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, this.maxRange, 32);
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8f8ff,
      transparent: true,
      opacity: 0.7,
      emissive: 0xb8f8ff,
      emissiveIntensity: 4,
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.copy(this.boss.position);
    scene.add(beam);

    const entanglementBeam = {
      mesh: beam,
      startTime: Date.now(),
      duration: this.duration,
      damage: this.damage,
      maxRange: this.maxRange,
    };
    entanglementBeams.push(entanglementBeam);


    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}