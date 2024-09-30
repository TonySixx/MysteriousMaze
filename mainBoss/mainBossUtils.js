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


