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
  spell1SoundBuffer,
  teleportSoundBuffer,
  WALL_HEIGHT,
} from "../main.js";
import { createTorchOnCenterTower, createTorchOnWall } from "../camp.js";
import { textureSets } from "../globals.js";
import { MAIN_BOSS_TYPES } from "./mainBossTypes.js";
import { MainBoss } from "./baseBoss";

export { MainBoss } from './baseBoss';


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
    fogDensity = 0.05,
    flyDuration = 3,
    merlonHeight = 1, // Nová option pro výšku merlonů (v násobcích WALL_HEIGHT)
    cornerWallHeight = 2 // Nová option pro výšku rohových zdí (v násobcích WALL_HEIGHT)
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
      for (let i = 0; i < merlonHeight; i++) {
        const merlonBlock = new THREE.Mesh(wallGeometry, wallMaterial);
        merlonBlock.position.set(x, y + WALL_HEIGHT * (i + 1), z);
        room.add(merlonBlock);
        walls.push(merlonBlock);
      }
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

    for (let i = 0; i < cornerWallHeight; i++) {
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
      // Zachováváme původní výšku pochodní (1 * WALL_HEIGHT)
      createTorchOnCenterTower(cornerX, cornerZ, 1, dir, torchColor);
    });
  });

  // Přidáme časovač pro spawn bosse
  const spawnTimeout = setTimeout(() => {
    const mainBossStartPosition = new THREE.Vector3(0, 20, 0);
    const mainBossTargetPosition = new THREE.Vector3(0, 0.5, 0);
    setBossCounter(bossCounter + 1);
    const BossClass = bossType.bossClass || MainBoss;
    const mainBoss = new BossClass(
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
      flyDuration: flyDuration,
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
