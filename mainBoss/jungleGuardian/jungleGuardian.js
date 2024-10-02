import { playSound, seedBurstSoundBuffer, vineGrabSoundBuffer } from "../../main";
import * as THREE from 'three';
import { Ability } from "../mainBossUtils";
import { player } from "../../player";
import { Boss, bossCounter, bosses, setBossCounter } from "../../boss";
import { playerTakeDamage } from "../../utils";

export class VineGrabAbility extends Ability {
    constructor(boss) {
      super(boss);
      this.cooldown = 10000; // 10 sekund
      this.lastUseTime = 0;
    }
  
    canUse() {
      return Date.now() - this.lastUseTime >= this.cooldown;
    }
  
    use() {
      playSound(vineGrabSoundBuffer);
      const direction = new THREE.Vector3().subVectors(player.position, this.boss.position).normalize();
      const vineLength = this.boss.position.distanceTo(player.position);
      
      // Vytvoření a přidání vizuálního efektu liány
      const vineGeometry = new THREE.CylinderGeometry(0.1, 0.1, vineLength);
      const vineMaterial = new THREE.MeshStandardMaterial({ color: 0x96ff45,emissive: 0x96ff45,emissiveIntensity:1.5 });
      const vine = new THREE.Mesh(vineGeometry, vineMaterial);
      
      vine.position.copy(this.boss.position);
      vine.lookAt(player.position);
      vine.rotateX(Math.PI / 2);
      
      scene.add(vine);
      
      const vineObject = {
        mesh: vine,
        startTime: Date.now(),
        duration: 1000,
        startPosition: player.position.clone(),
        endPosition: this.boss.position.clone().setY(player.position.y)
      };
      
      activeVines.push(vineObject);
  
      this.lastUseTime = Date.now();
      this.boss.isUsingAbility = false;
    }
  }
  
  export class SeedBurstAbility extends Ability {
    constructor(boss) {
      super(boss);
      this.cooldown = 15000; // 15 sekund
      this.lastUseTime = 0;
      this.duration = 5000; // 5 sekund trvání DoT
      this.damagePerSecond = 10;
      this.radius = 12;
    }
  
    canUse() {
      return Date.now() - this.lastUseTime >= this.cooldown;
    }
  
    use() {
      // Vytvoření vizuálního efektu s animací
      playSound(seedBurstSoundBuffer);
      const particleCount = 500;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
  
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * this.radius * 0.1; // Začínáme blízko středu
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = 0.5;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
  
        // Nastavíme rychlosti pro pohyb částic směrem ven
        velocities[i * 3] = Math.cos(angle) * (Math.random() * 0.2 + 0.1);
        velocities[i * 3 + 1] = Math.random() * 0.1;
        velocities[i * 3 + 2] = Math.sin(angle) * (Math.random() * 0.2 + 0.1);
      }
  
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x9cff38,
        size: 0.2,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
  
      const particleSystem = new THREE.Points(particles, particleMaterial);
      particleSystem.position.copy(this.boss.position);
      scene.add(particleSystem);
  
      particleSystem.startTime = Date.now();
      particleSystem.duration = this.duration;
      seedBurstParticleSystems.push(particleSystem);
  
      // Aplikace poškození v čase
      const startTime = Date.now();
      const applyDamage = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < this.duration) {
          if (player.position.distanceTo(this.boss.position) <= this.radius) {
            playerTakeDamage(this.damagePerSecond / 10); // Aplikujeme poškození každých 100ms
          }
          setTimeout(applyDamage, 100);
        }
      };
  
      applyDamage();
  
      this.lastUseTime = Date.now();
      this.boss.isUsingAbility = false;
    }
  }
  
  export class CallOfWildAbility extends Ability {
    constructor(boss) {
      super(boss);
      this.cooldown = 20000; // 20 sekund
      this.lastUseTime = 0;
      this.dragonCount = 2;
    }
  
    canUse() {
      return Date.now() - this.lastUseTime >= this.cooldown && this.boss.health <= this.boss.maxHealth / 2;
    }
  
    use() {
      const spawnPositions = [
        new THREE.Vector3(-3, 0.5, -3),
        new THREE.Vector3(3, 0.5, 3),
        new THREE.Vector3(-3, 0.5, 3),
        new THREE.Vector3(3, 0.5, -3)
      ];
  
      const dragonStartHeight = 20;
  
      for (let i = 0; i < this.dragonCount; i++) {
        const targetPosition = spawnPositions[i].add(this.boss.position);
        const startPosition = targetPosition.clone().setY(dragonStartHeight);
        
        setBossCounter(bossCounter + 1);
        const dragon = new Boss(startPosition, bossCounter, this.boss.rng, 2, false, null, true);
        dragon.health = dragon.maxHealth; 
        bosses.push(dragon);
  
        mainBossDragons.push({
          dragon: dragon,
          startPosition: startPosition,
          targetPosition: targetPosition,
          startTime: performance.now(),
        });
      }
  
      this.lastUseTime = Date.now();
      this.boss.isUsingAbility = false;
    }
  }
  