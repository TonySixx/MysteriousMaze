import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Boss,
  canSeePlayer,
  setBossCounter,
  bossCounter,
  bosses,
} from "../boss.js";
import { player } from "../player.js";
import {
  addNebula,
  bossSoundBuffer,
  CELL_SIZE,
  createTeleportModel,
  manager,
  MAZE_SIZE,
  playSound,
  selectedFloor,
  setMazeSize,
  teleportSoundBuffer,
  WALL_HEIGHT,
} from "../main.js";
import { createTorchOnCenterTower, createTorchOnWall } from "../camp.js";
import { textureSets } from "../globals.js";
import { createBossCastEffect, showMessage } from "../utils.js";
import { getItemName, itemDatabase } from "../itemDatabase.js";
import { updateQuestsOnEvent } from "../quests.js";
import { CallOfWildAbility, MultiShotAbility, SeedBurstAbility, SpawnDragonsAbility, StateMachine, VineGrabAbility } from "./mainBossUtils.js";

export const MAIN_BOSS_TYPES = [
  {
    name: "Stinový démon",
    translationKey: "bossFloor1",
    abilities: [MultiShotAbility, SpawnDragonsAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0x200f38,
      metalness: 0.4,
      roughness: 0.1,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.4,
      roughness: 0.1,
    }),
    attackColor: new THREE.Color(0xff5252),
    attackCooldown: 0.8,
    emissiveIntensity: 3,
    maxHealth: 20000,
    bossHitBoxMarginY: 2.5,
    attackSpeed: 0.5,
    attackSize: 0.5,
    dropItems: [
      { item: itemDatabase.scarletRunecloak, chance: 0.2 },
      { item: itemDatabase.powerLapisia, chance: 0.3 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
    ],
    ambientLightColor: 0xe0b6bf,
    nebulaColors: ["#FF0000","#FF69B4"]
  },
  {
    name: "Strážce Džungle",
    translationKey: "jungleGuardian",
    abilities: [VineGrabAbility, SeedBurstAbility, CallOfWildAbility],
    mainMaterial: new THREE.MeshStandardMaterial({
      color: 0x75ba1a, 
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x75ba1a,
      emissiveIntensity: 1,
    }),
    secondaryMaterial: new THREE.MeshStandardMaterial({
      color: 0x8B4513, 
      metalness: 0.5,
      roughness: 0.1,
    }),
    attackColor: new THREE.Color(0x9fff87),
    attackCooldown: 1,
    emissiveIntensity: 3,
    maxHealth: 30000,
    bossHitBoxMarginY: 3.0,
    attackSpeed: 0.7,
    attackSize: 0.6,
    dropItems: [
      { item: itemDatabase.powerLapisia, chance: 0.5 },
      { item: itemDatabase.protectorsLapisia, chance: 0.5 },
      { item: itemDatabase.greaterHealthPotion, chance: 1 },
      { item: itemDatabase.greaterManaPotion, chance: 1 },
    ],
    ambientLightColor: 0xb6e0bf,
    nebulaColors: ["#4ed145","#e4fc8d"]
  },
];

export class MainBoss extends Boss {
  constructor(position, id, rng, floor, type) {
    super(position, id, rng, floor, true, type);
    this.maxHealth = type.maxHealth;
    this.health = type.maxHealth;
    this.isMainBoss = true;
    this.lastSpecialAttackTime = Date.now();
    this.specialAttackInterval = 20000; // 20 sekund
    this.centerPosition = new THREE.Vector3(0, 0.5, 0);
    this.dontDropKey = true;

    this.abilities = type.abilities.map((AbilityClass) => new AbilityClass(this, type));
    this.currentAbilityIndex = 0;
    this.stateMachine = new StateMachine(this);
    this.isUsingAbility = false;

    // Iniciace aktivních efektů
    this.activeEffects = [];

    this.loadMainBossModel();
    this.changeDirection();
    this.createHealthUI();
  }

  loadMainBossModel() {
    const loader = new GLTFLoader();
    loader.load("models/GhostSkull.glb", (gltf) => {
      this.model = gltf.scene;
      this.model.position.copy(this.position);
      this.model.scale.set(1, 1, 1);
      this.model.traverse((child) => {
        if (child.isMesh) {
          console.log(child.name);
          if (child.name === "Ghost_Skull_1") {
            child.material = this.type.mainMaterial;
          } else if (child.name === "Ghost_Skull_2") {
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

  update(deltaTime) {
    if (this.isFrozen) return;

    // Aktualizace stavového stroje
    this.stateMachine.update(deltaTime);

    // Aktualizace mixeru a modelu
    if (this.mixer) {
      this.mixer.update(deltaTime * this.slowEffect);
    }

    if (this.model) {
      this.model.lookAt(player.position);
    }

    // Ostatní aktualizace (stavy, efekty)
    this.updateStates(deltaTime);
  }


  // Implementace metody updateStates
  updateStates(deltaTime) {
    // Aktualizace efektu zpomalení
    if (Date.now() > this.slowEndTime) {
      this.slowEffect = 1;
      this.removeSlowParticles();
    } else if (this.slowParticles) {
      this.updateSlowParticles(deltaTime);
    }

    // Aktualizace hoření (burning effect)
    this.updateBurning(deltaTime);

    // Aktualizace a odstranění aktivních efektů
    this.activeEffects = this.activeEffects.filter((effect) => {
      const isActive = effect.userData.update(deltaTime);
      if (!isActive) {
        scene.remove(effect);
      }
      return isActive;
    });
  }

  die() {
    super.die();
    this.activeEffects = this.activeEffects.forEach((effect) => {
      scene.remove(effect);
    });

    // Aktualizace questu po zabití bosse
    updateQuestsOnEvent('mainBossDeath', { bossType: this.type.translationKey });

    // Přidání truhly po poražení bosse
    const loader = new GLTFLoader(manager);
    loader.load("models/Chest.glb", (gltf) => {
      const chest = gltf.scene;
      chest.position.x = 0;
      chest.position.z = 0;
      chest.position.y = 0;
      chest.scale.set(0.6, 0.6, 0.6);
      chest.name = "chest";
      scene.add(chest);

      // Přidání interakční zóny
      const interactionZone = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 2, 32),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      interactionZone.position.copy(chest.position);
      scene.add(interactionZone);

      // Přidání textu pro interakci
      const interactionText = document.createElement("div");
      interactionText.className = "interaction-text";
      interactionText.textContent = "Press 'F' to open chest";
      interactionText.style.display = "none";
      document.body.appendChild(interactionText);
      var chestOpened = false;

      // Přidání portálu po poražení bosse
      const portal = createTeleportModel(0xff8080); // Zelená barva pro portál
      portal.position.set(0, 1.5, (-MAZE_SIZE * CELL_SIZE) / 2 + 2); // Umístění portálu na severní stranu místnosti
      scene.add(portal);

      // Přidání interakční zóny pro portál
      const portalInteractionZone = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 2, 32),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      portalInteractionZone.position.copy(portal.position);
      scene.add(portalInteractionZone);

      // Přidání textu pro interakci s portálem
      const portalInteractionText = document.createElement("div");
      portalInteractionText.className = "interaction-text";
      portalInteractionText.textContent = "Press 'F' to teleport to camp";
      portalInteractionText.style.display = "none";
      document.body.appendChild(portalInteractionText);

      // Vytvoření mixeru pro animaci truhly
      chestMixer = new THREE.AnimationMixer(chest);
      const chestOpenAction = chestMixer.clipAction(
        gltf.animations.find((clip) => clip.name === "Chest_Open")
      );
      chestOpenAction.setLoop(THREE.LoopOnce);
      chestOpenAction.clampWhenFinished = true;

      bossChestAndPortalData = {
        items: this.type.dropItems,
        chest: chest,
        portal: portal,
        interactionText: interactionText,
        portalInteractionText: portalInteractionText,
        chestOpened: false,
        chestMixer: chestMixer,
        chestOpenAction: chestOpenAction,
      };
    });
  }

  // Nová metoda pro rozhodování o použití schopnosti
  shouldUseAbility() {
    const currentTime = Date.now();
    return (
      currentTime - this.lastSpecialAttackTime >= this.specialAttackInterval &&
      !this.isUsingAbility
    );
  }

  // Metoda pro získání další schopnosti
  getNextAbility() {
    for (let i = 0; i < this.abilities.length; i++) {
      const abilityIndex = (this.currentAbilityIndex + i) % this.abilities.length;
      const ability = this.abilities[abilityIndex];
      if (ability.canUse()) {
        this.currentAbilityIndex = abilityIndex + 1;
        this.lastSpecialAttackTime = Date.now();
        return ability;
      }
    }
    // Žádná schopnost není dostupná
    return null;
  }


  createAttackEffect() {
    if (this.model) {
      const effectPosition = this.model.position.clone();
      const castEffect = createBossCastEffect(
        effectPosition,
        this.type.attackColor,
        {
          particleCount: 50,
          duration: 0.5,
          spread: { x: 0.5, y: 0.3, z: 0.2 },
          offset: { x: 0, y: 1, z: 0.05 },
          speedFactor: 2.0,
          glowIntensity: 1,
          minSize: 0.2,
          maxSize: 0.3,
        }
      );
      scene.add(castEffect);

      // Přidáme efekt do seznamu pro aktualizaci a odstranění
      this.activeEffects.push(castEffect);
    }
  }

  multiShot() {
    this.createAttackEffect();
    playSound(bossSoundBuffer);
    const playerDirection = new THREE.Vector3()
      .subVectors(player.position, this.position)
      .normalize();
    const numberOfShots = 25; // Celkový počet střel
    const angleStep = (2 * Math.PI) / numberOfShots;

    for (let i = 0; i < numberOfShots; i++) {
      const angle = i * angleStep;
      const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

      // Přidáme náhodný offset
      const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 1,
        0,
        (Math.random() - 0.5) * 1
      );
      direction.add(randomOffset).normalize();

      // Nastavíme Y komponentu směru tak, aby mířila na hráče
      direction.y = playerDirection.y;

      const magicBall = this.createMagicBall(
        this.position,
        this.position.clone().add(direction),
        0.5
      );
      scene.add(magicBall);
      magicBalls.push(magicBall);
    }
  }

  spawnDragons() {
    this.createAttackEffect();
    playSound(teleportSoundBuffer);
    const centerPosition = new THREE.Vector3(0, 0.5, 0);
    const spacing = 2;
    const dragonStartHeight = 20;
    const dragonPositions = [
      new THREE.Vector3(
        centerPosition.x - spacing,
        centerPosition.y,
        centerPosition.z - spacing
      ),
      new THREE.Vector3(
        centerPosition.x + spacing,
        centerPosition.y,
        centerPosition.z - spacing
      ),
      new THREE.Vector3(
        centerPosition.x - spacing,
        centerPosition.y,
        centerPosition.z + spacing
      ),
      new THREE.Vector3(
        centerPosition.x + spacing,
        centerPosition.y,
        centerPosition.z + spacing
      ),
    ];

    dragonPositions.forEach((targetPosition) => {
      const startPosition = targetPosition.clone().setY(dragonStartHeight);
      setBossCounter(bossCounter + 1);
      const dragon = new Boss(
        startPosition,
        bossCounter,
        this.rng,
        selectedFloor - 100 + 1,
        false,
        null,
        true
      );
      dragon.health = dragon.maxHealth;
      bosses.push(dragon);

      mainBossDragons.push({
        dragon: dragon,
        startPosition: startPosition,
        targetPosition: targetPosition,
        startTime: performance.now(),
      });
    });
  }

  attack() {
    const currentTime = performance.now();
    const attackCooldown = this.type.attackCooldown / this.slowEffect;
    if (currentTime - this.lastAttackTime >= attackCooldown * 1000) {
      this.performStandardAttack();
      this.createAttackEffect();
      this.lastAttackTime = currentTime;
    }
  }
}

export function createMainBossRoom(rng, options = {}) {
  const {
    roomSize = 10,
    textureSet = textureSets[1],
    torchColor = 0xffa500,
    bossType = MAIN_BOSS_TYPES[selectedFloor - 100],
    spawnDelay = 6000,
    countdownDuration = 5,
    roomAmbientLightColor = 0xffffff,
    roomAmbientLightIntensity = 0.5,
    nebulaColors = ["#FF0000", "#FF69B4"],
    fogDensity = 0.05
  } = options;

  setMazeSize(roomSize);
  const cornerWallSize = 1;
  const cornerWallDistance = 2.5;

  const room = new THREE.Group();
  const loader = new THREE.TextureLoader(manager);
  const floorTexture = loader.load(textureSet.floorTexture);
  floorTexture.colorSpace = THREE.SRGBColorSpace;
  const wallTexture = loader.load(textureSet.wallTexture);
  wallTexture.colorSpace = THREE.SRGBColorSpace;
  floorTexture.repeat.set(roomSize, roomSize);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;

  // Vytvoření podlahy
  const floorGeometry = new THREE.PlaneGeometry(
    roomSize * CELL_SIZE,
    roomSize * CELL_SIZE
  );
  const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  // Vytvoření zdí
  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

  const createWall = (x, y, z, isMerlon = false) => {
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(x, y, z);
    room.add(wall);
    walls.push(wall);

    if (isMerlon) {
      const merlonBlock = new THREE.Mesh(wallGeometry, wallMaterial);
      merlonBlock.position.set(x, y + WALL_HEIGHT, z);
      room.add(merlonBlock);
      walls.push(merlonBlock);
    }
  };

  // Vytvoření hraničních zdí s hradbami
  for (let i = -roomSize / 2; i <= roomSize / 2; i += 1) {
    const isMerlon = i % 2 === 0;
    createWall(
      i * CELL_SIZE,
      WALL_HEIGHT / 2,
      (-roomSize * CELL_SIZE) / 2,
      isMerlon
    );
    createWall(
      i * CELL_SIZE,
      WALL_HEIGHT / 2,
      (roomSize * CELL_SIZE) / 2,
      isMerlon
    );
    createWall(
      (-roomSize * CELL_SIZE) / 2,
      WALL_HEIGHT / 2,
      i * CELL_SIZE,
      isMerlon
    );
    createWall(
      (roomSize * CELL_SIZE) / 2,
      WALL_HEIGHT / 2,
      i * CELL_SIZE,
      isMerlon
    );
  }

  // Vytvoření rohových zdí s pochodněmi
  const cornerWallGeometry = new THREE.BoxGeometry(
    cornerWallSize * CELL_SIZE,
    WALL_HEIGHT,
    cornerWallSize * CELL_SIZE
  );
  const cornerPositions = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  cornerPositions.forEach(([x, z]) => {
    const cornerX = x * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;
    const cornerZ = z * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;

    for (let i = 0; i < 2; i++) {
      const cornerWall = new THREE.Mesh(cornerWallGeometry, wallMaterial);
      cornerWall.position.set(
        cornerX,
        WALL_HEIGHT / 2 + i * WALL_HEIGHT,
        cornerZ
      );
      room.add(cornerWall);
      walls.push(cornerWall);
    }

    const directions = [
      { dx: 1, dz: 0 },
      { dx: -1, dz: 0 },
      { dx: 0, dz: 1 },
      { dx: 0, dz: -1 },
    ];

    directions.forEach((dir) => {
      createTorchOnCenterTower(cornerX, cornerZ, 1, dir, torchColor);
    });
  });

  // Přidáme časovač pro spawn bosse
  const spawnTimeout = setTimeout(() => {
    const mainBossStartPosition = new THREE.Vector3(0, 20, 0);
    const mainBossTargetPosition = new THREE.Vector3(0, 0.5, 0);
    setBossCounter(bossCounter + 1);
    const mainBoss = new MainBoss(
      mainBossStartPosition,
      bossCounter,
      rng,
      selectedFloor - 100 + 2,
      bossType
    );
    document.getElementById("bossHealthContainer").style = "display:block";
    bosses.push(mainBoss);

    mainBossEntryData = {
      mainBoss,
      startPosition: mainBossStartPosition.clone(),
      targetPosition: mainBossTargetPosition.clone(),
      startTime: performance.now(),
      flyDuration: 3,
    };
    playSound(teleportSoundBuffer);
  }, spawnDelay);

  const countdownInterval = showCountdown(countdownDuration);

  // Přidání mlhoviny a mlhy
  nebulaMaterial = addNebula(...nebulaColors);
  scene.fog = new THREE.FogExp2(0x000000, fogDensity);

  // Přidání ambientního světla
  const ambientLight = new THREE.AmbientLight(roomAmbientLightColor, roomAmbientLightIntensity);
  scene.add(ambientLight);

  return { room, spawnTimeout, countdownInterval };
}

function showCountdown(duration) {
  const countdownElement = document.createElement("div");
  countdownElement.id = "boss-countdown";
  countdownElement.style.position = "fixed";
  countdownElement.style.top = "50%";
  countdownElement.style.left = "50%";
  countdownElement.style.transform = "translate(-50%, -50%)";
  countdownElement.style.fontSize = "100px";
  countdownElement.style.fontWeight = "bold";
  countdownElement.style.color = "#ee2f2f";
  countdownElement.style.textShadow = "2px 2px 4px #000000";
  countdownElement.style.zIndex = "1000";
  document.body.appendChild(countdownElement);

  let timeLeft = duration;
  const countdownInterval = setInterval(() => {
    countdownElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownElement.remove();
    }
    timeLeft--;
  }, 1000);

  return countdownInterval;
}
