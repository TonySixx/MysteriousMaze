import { Ability } from "../mainBossUtils";

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