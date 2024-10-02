import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { Boss, bossCounter, bosses, setBossCounter } from "../../boss";
import { playerTakeDamage } from "../../utils";
import { MainBoss } from "../baseBoss";
import { playSound, spell1SoundBuffer } from "../../main";

export class QuantumGuardianBoss extends MainBoss {
    constructor(position, id, rng, floor, type) {
      super(position, id, rng, floor, type);
      this.isFlying = false;
      this.flyingHeight = 10;
      this.flyingDuration = 15000; // 15 sekund
      this.flyingStartTime = 0;
      this.normalAttackCooldown = this.type.attackCooldown;
      this.flyingAttackCooldown = this.normalAttackCooldown * 0.5; // Větší rychlost útoku během létání
    }
  
    calculateAttackCooldown() {
      const baseAttackCooldown = this.isFlying && this.position.y > 5 ? this.flyingAttackCooldown : this.normalAttackCooldown;
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
      if (this.isFlying) {
        const elapsedTime = Date.now() - this.flyingStartTime;
        const progress = Math.min(elapsedTime / this.flyingDuration, 1);
        
        if (progress < 1) {
          const height = this.flyingHeight * Math.sin(progress * Math.PI);
          this.position.y = 0.5 + height;
          if (this.model) {
            this.model.position.y = this.position.y;
          }
        } else {
          this.isFlying = false;
          this.position.y = 0.5;
          if (this.model) {
            this.model.position.y = this.position.y;
          }
        }
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
    playSound(spell1SoundBuffer);
    this.boss.isFlying = true;
    this.boss.flyingStartTime = Date.now();
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
    playSound(spell1SoundBuffer);
    const timeDilationEffect = {
      startTime: Date.now(),
      duration: this.duration,
    };
    timeDilationEffects.push(timeDilationEffect);
    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
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
      this.warningDuration = 1500; // 1.5 sekundy varování
    }
  
    canUse() {
      return Date.now() - this.lastUseTime >= this.cooldown;
    }
  
    use() {
      playSound(spell1SoundBuffer);
      
      // Vytvoření varovného efektu
      const warningGeometry = new THREE.CylinderGeometry(0.1, 2, 0.1, 32);
      const warningMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
      });
      const warning = new THREE.Mesh(warningGeometry, warningMaterial);
      warning.position.copy(this.boss.position);
      scene.add(warning);
  
      // Po uplynutí varovné doby vytvoříme skutečný paprsek
      setTimeout(() => {
        scene.remove(warning);
        
        const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, this.maxRange, 32);
        const beamMaterial = new THREE.MeshStandardMaterial({
          color: 0xb8f8ff,
          transparent: true,
          opacity: 0.7,
          emissive: 0xb8f8ff,
          emissiveIntensity: 2,
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
      }, this.warningDuration);
  
      this.lastUseTime = Date.now();
      this.boss.isUsingAbility = false;
    }
  }