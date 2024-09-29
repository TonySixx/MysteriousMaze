import { Boss, bossCounter, bosses, canSeePlayer, setBossCounter } from "../boss";
import { player } from "../player";
import * as THREE from "three";
import { playerTakeDamage } from "../utils";
import { playSound, seedBurstSoundBuffer, vineGrabSoundBuffer } from "../main";

export class Ability {
  constructor(boss) {
    this.boss = boss;
  }

  use(target) {
    // Abstraktní metoda pro použití schopnosti
  }

  canUse() {
    return true; // Výchozí implementace, může být přepsána
  }
}

export class StateMachine {
  constructor(boss) {
    this.boss = boss;
    this.currentState = new IdleState(this.boss);
  }

  update(deltaTime) {
    this.currentState.update(deltaTime);
  }

  changeState(NewStateClass) {
    this.currentState.exit();
    this.currentState = new NewStateClass(this.boss);
    this.currentState.enter();
  }
}


export class MultiShotAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.maxShots = boss.type.maxMultiShots || 10;
    this.shotInterval = boss.type.multiShotInterval || 500;
    this.shotsFired = 0;
    this.lastShotTime = 0;
  }

  use(deltaTime) {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime >= this.shotInterval) {
      this.boss.multiShot();
      this.shotsFired++;
      this.lastShotTime = currentTime;
    }

    if (this.shotsFired >= this.maxShots) {
      this.shotsFired = 0;
      this.boss.isUsingAbility = false;
    }
  }

  canUse() {
    return true;
  }
}

export class SpawnDragonsAbility extends Ability {
  constructor(boss) {
    super(boss);
    this.used = false;
  }

  canUse() {
    return !this.used && this.boss.health <= this.boss.maxHealth / 2;
  }

  use() {
    this.boss.spawnDragons();
    this.used = true;
    this.boss.isUsingAbility = false;
  }
}

export class IdleState {
  constructor(boss) {
    this.boss = boss;
  }

  enter() { }

  update(deltaTime) {
    if (canSeePlayer(this.boss.position, player.position)) {
      this.boss.stateMachine.changeState(AttackState);
    } else {
      this.boss.stateMachine.changeState(ChaseState);
    }
  }

  exit() { }
}


export class AttackState {
  constructor(boss) {
    this.boss = boss;
  }

  enter() { }

  update(deltaTime) {
    if (this.boss.shouldUseAbility()) {
      // Přejdeme do stavu MoveToCenterState
      this.boss.stateMachine.changeState(MoveToCenterState);
    } else if (canSeePlayer(this.boss.position, player.position)) {
      this.boss.attack();
    } else {
      this.boss.stateMachine.changeState(ChaseState);
    }
  }

  exit() { }
}

export class ChaseState {
  constructor(boss) {
    this.boss = boss;
  }

  enter() { }

  update(deltaTime) {
    if (this.boss.shouldUseAbility()) {
      // Přejdeme do stavu MoveToCenterState
      this.boss.stateMachine.changeState(MoveToCenterState);
    } else if (canSeePlayer(this.boss.position, player.position)) {
      this.boss.stateMachine.changeState(AttackState);
    } else {
      this.boss.move(deltaTime, 2);
    }
  }

  exit() { }
}

export class MoveToCenterState {
  constructor(boss) {
    this.boss = boss;
    this.centerPosition = new THREE.Vector3(0, 0.5, 0);
  }

  enter() {
    // Inicializace při vstupu do stavu
  }

  update(deltaTime) {
    const direction = new THREE.Vector3().subVectors(
      this.centerPosition,
      this.boss.position
    );
    const distance = direction.length();

    if (distance > 0.1) {
      direction.normalize();
      const moveStep = direction.multiplyScalar(5 * deltaTime);
      this.boss.position.add(moveStep);
      if (this.boss.model) {
        this.boss.model.position.copy(this.boss.position);
      }
    } else {
      // Po dosažení středu přejdeme do stavu použití schopnosti
      this.boss.stateMachine.changeState(AbilityState);
    }
  }

  exit() {
    // Čištění při opuštění stavu (pokud je potřeba)
  }
}

export class AbilityState {
  constructor(boss) {
    this.boss = boss;
    this.currentAbility = this.boss.getNextAbility();
    if (this.currentAbility) {
      this.boss.isUsingAbility = true;
    } else {
      this.boss.isUsingAbility = false;
      // Návrat do stavu útoku
      this.boss.stateMachine.changeState(AttackState);
    }
  }

  enter() {
    this.boss.isUsingAbility = true;
  }

  update(deltaTime) {
    if (this.currentAbility) {
      this.currentAbility.use(deltaTime);

      if (!this.boss.isUsingAbility) {
        // Po použití schopnosti se vrátíme do AttackState
        this.boss.stateMachine.changeState(AttackState);
      }
    } else {
      // Žádná schopnost není dostupná, návrat do AttackState
      this.boss.stateMachine.changeState(AttackState);
    }
  }

  exit() {
    this.boss.isUsingAbility = false;
  }
}

// JUNGLE GUARDIAN

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
    this.radius = 10;
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

    for (let i = 0; i < this.dragonCount; i++) {
      const spawnPosition = spawnPositions[i].add(this.boss.position);
      setBossCounter(bossCounter + 1);
      const dragon = new Boss(spawnPosition, bossCounter, this.boss.rng, 2,false,null,true);
      dragon.health = dragon.maxHealth; // Poloviční zdraví pro vyvolané draky
      bosses.push(dragon);
    }

    this.lastUseTime = Date.now();
    this.boss.isUsingAbility = false;
  }
}
