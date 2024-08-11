import * as THREE from "three";
import seedrandom from "seedrandom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createClient } from "@supabase/supabase-js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Initialize Supabase client
const supabaseUrl = "https://olhgutdozhdvniefmltx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saGd1dGRvemhkdm5pZWZtbHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NzYwNTgsImV4cCI6MjAzODQ1MjA1OH0.RmahBsbb4QnO0xpTH-Bpe8f9vJFypcq6z5--e4s0MJI";
const supabase = createClient(supabaseUrl, supabaseKey);

// Add these variables
let playerName = "";
let bestTime = Infinity;

const loader = new THREE.TextureLoader();
const floorTexture = loader.load("cihly.jpg");
floorTexture.colorSpace = THREE.SRGBColorSpace;
const textureSets = [
  {
    wallTexture: "wall.jpg",
    ceilingTexture: "wall.jpg",
    specialTextures: ["wall-sign-1.jpg", "wall-sign-2.jpg", "wall-sign-3.jpg"],
  },
  {
    wallTexture: "wall-egypt.jpg",
    ceilingTexture: "wall-egypt.jpg",
    specialTextures: [
      "wall-egypt-sign-1.jpg",
      "wall-egypt-sign-2.jpg",
      "wall-egypt-sign-3.jpg",
    ],
  },
  {
    wallTexture: "wall-crystal.jpg",
    ceilingTexture: "wall-crystal.jpg",
    specialTextures: [
      "wall-crystal-sign-1.jpg",
      "wall-crystal-sign-2.jpg",
      "wall-crystal-sign-3.jpg",
    ],
  },
];

let scene, camera, renderer, maze, player;
let startTime, timerInterval;
let moveCount = 0,
  keyCount = 0;
let MAZE_SIZE = 20;
let totalKeys = 3; // Přidání deklarace proměnné totalKeys
const WALL_HEIGHT = 2.6;
const CELL_SIZE = 2.4;
const OBJECT_HEIGHT = 1.6;
let walls = [];

let moveForward = false,
  moveBackward = false,
  moveLeft = false,
  moveRight = false;
let playerRotation = 0;
let playerVelocity = new THREE.Vector3();
let lastTeleportTime = 0;
const teleportCooldown = 3000;
let nearTeleport = null; // Přidáno: sleduje, zda je hráč blízko teleportu

// Přidejte tyto globální proměnné
const torches = [];
// Globální proměnné
let composer, lightManager;
const MAX_VISIBLE_LIGHTS = 10; // Maximální počet viditelných světel

let keyModel;
let treasureModel;


var showMinimapTimer = setInterval(showMinimap, 15000); // Interval 15 vteřin
var minimapVisibleTimer;

let nebula, nebulaMaterial;
async function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1600
  );
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  try {

    await loadKeyModel();
    await loadTreasureModel();
    createMaze();
    createPlayer();
    startTimer();

    // Načtení jména hráče z local storage
    playerName = localStorage.getItem("playerName");
    if (!playerName) {
      showNameModal();
    } else {
      document.getElementById("playerName").textContent = playerName;
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("click", onMouseClick, false);
    window.addEventListener("resize", onWindowResize);

    // Přidání event listenerů pro nové funkce
    document.getElementById("submitName").addEventListener("click", () => {
      playerName = document.getElementById("playerNameInput").value;
      localStorage.setItem("playerName", playerName);
      document.getElementById("playerName").textContent = playerName;
      hideNameModal();
    });

    document
      .getElementById("mazeSearchInput")
      .addEventListener("input", filterScores);

    document
      .querySelector("#scoreModal .close")
      .addEventListener("click", hideScoreModal);

    document.addEventListener("keydown", (event) => {
      // Zkontrolujeme, zda aktivní element není input nebo textarea
      if (event.key === "c" || event.key === "C") {
        const activeElement = document.activeElement;
        const isInput =
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA";

        if (!isInput) {
          if (document.getElementById("scoreModal").style.display === "block") {
            hideScoreModal();
          } else {
            showScoreModal();
            getScores().then(updateScoreTable);
          }
        }
      }
    });
    // Nastavení post-processingu
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.2;
    bloomPass.strength = 0.6;
    bloomPass.radius = 0;
    composer.addPass(bloomPass);

    animate();


  } catch (error) {
    console.error("Failed to load key model:", error);
  }
}

function createMaze(inputText = "") {
    // Odstraňte existující mlhovinu a mlhu, pokud existují
    if (nebula) {
      scene.remove(nebula);
    }
    scene.fog = null;
  
  lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
  walls = [];
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

    // Odstraňte nebo zakomentujte tuto řádku:
  // scene.background = new THREE.Color(0x48515b);


  const seed = getHash(inputText);
  let rng = new seedrandom(seed);
  const textureSetIndex = Math.floor(rng() * textureSets.length);
  const selectedTextureSet = textureSets[textureSetIndex];

  const brickTexture = loader.load(selectedTextureSet.wallTexture);
  const ceilingTexture = loader.load(selectedTextureSet.ceilingTexture);
  brickTexture.colorSpace = THREE.SRGBColorSpace;
  ceilingTexture.colorSpace = THREE.SRGBColorSpace;

  const specialTextures = selectedTextureSet.specialTextures.map(
    (textureName) => loader.load(textureName)
  );
  specialTextures.forEach((x) => (x.colorSpace = THREE.SRGBColorSpace));

  MAZE_SIZE = Math.max(20, Math.min(50, 20 + Math.floor(rng() * 31)));

  totalKeys = Math.max(3, Math.min(10, 3 + Math.floor(rng() * 8)));
  const teleportPairsCount = Math.max(
    1,
    Math.min(3, 1 + Math.floor(rng() * 3))
  );

  const floorGeometry = new THREE.PlaneGeometry(
    MAZE_SIZE * CELL_SIZE,
    MAZE_SIZE * CELL_SIZE
  );
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x8c8480,
    map: floorTexture,
  });
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(MAZE_SIZE, MAZE_SIZE);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const ceilingGeometry = new THREE.PlaneGeometry(
    MAZE_SIZE * CELL_SIZE,
    MAZE_SIZE * CELL_SIZE
  );
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(MAZE_SIZE, MAZE_SIZE);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: ceilingTexture,
    color: 0x635a56,
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = WALL_HEIGHT;
  scene.add(ceiling);

  maze = generateMaze(MAZE_SIZE, MAZE_SIZE, seed);

  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: brickTexture,
  });

  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 1) {
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(
          (i - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
          WALL_HEIGHT / 2,
          (j - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );
        scene.add(wall);
        walls.push(wall);
      }
    }
  }

  // Přidání speciálních zdí
  addSpecialWalls(rng, specialTextures);

  const teleportColors = [
    0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00, 0x00ffff,
  ];
  for (let i = 0; i < teleportPairsCount; i++) {
    const teleport1 = createTeleportModel(teleportColors[i]);
    teleport1.userData.isTeleport = true;
    teleport1.userData.pairIndex = i;
    placeObjectInFreeCell(teleport1, rng);
    scene.add(teleport1);

    const teleport2 = createTeleportModel(teleportColors[i]);
    teleport2.userData.isTeleport = true;
    teleport2.userData.pairIndex = i;
    placeObjectInFreeCell(teleport2, rng);
    scene.add(teleport2);
  }

  createKeys(rng);
  createTorches(walls, maze, CELL_SIZE, MAZE_SIZE);


    // Použijeme model truhly jako cíl
    const goal = treasureModel.clone();
    goal.userData.isGoal = true;
    placeObjectInFreeCell(goal, rng);
    scene.add(goal);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  

 // Přidejte mlhovinu
 nebulaMaterial = addNebula();
  addFloatingObjects();
  
 // Přidejte mlhu
 scene.fog = new THREE.FogExp2(0x000000,0.05); // Zvýšili jsme hustotu mlhy

  keyCount = 0;
  updateKeyCount();

  clearInterval(showMinimapTimer);
  clearTimeout(minimapVisibleTimer);
  minimap.style.display = "none";
  showMinimapTimer = setInterval(showMinimap, 15000);


  console.log("Maze created");
  console.log("lights " + lightManager.lights.length);
}

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// vytvoření klíčů
function createKeys(rng) {
  if (!keyModel) {
    console.error("Key model not loaded");
    return;
  }

  for (let i = 0; i < totalKeys; i++) {
    const key = keyModel.clone();
    key.userData.isKey = true;

    // Změna barvy na zlatou
    key.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.6,
          roughness: 0.10,
        });
      }
    });

    // Rotace klíče
    key.rotation.y = Math.PI / 4; // Otočení o 30 stupňů kolem osy Y

    placeObjectInFreeCell(key, rng);
    scene.add(key);
  }
}

function animateKeys() {
  scene.children.forEach((child) => {
    if (child.userData.isKey) {
      child.rotation.y += 0.01; // Pomalu otáčíme kolem Y osy
    }
  });
}
function animateGoal() {
  scene.children.forEach((child) => {
    if (child.userData.isGoal) {
      child.rotation.y += 0.01; // Pomalu otáčíme kolem Y osy
       // Vznášení nahoru a dolů
       const time = Date.now() * 0.001; // Aktuální čas v sekundách
       const floatHeight = Math.sin(time) * 0.1; // Výška vznášení
       child.position.y = 0.5 + floatHeight; // Nastavení pozice na ose Y
    }
  });
}

function addSpecialWalls(rng, specialTextures) {
  const specialWallCount = Math.min(5, Math.floor(rng() * 5) + 1); // Počet speciálních zdí
  const selectedTextures = [];

  for (let i = 0; i < specialWallCount; i++) {
    const textureIndex = Math.floor(rng() * specialTextures.length);
    const specialTexture = specialTextures[textureIndex];
    selectedTextures.push(specialTexture);
  }

  for (let i = 0; i < selectedTextures.length; i++) {
    const specialWallGeometry = new THREE.BoxGeometry(
      CELL_SIZE,
      WALL_HEIGHT,
      CELL_SIZE
    );
    const specialWallMaterial = new THREE.MeshStandardMaterial({
      map: selectedTextures[i],
    });

    let placed = false;
    while (!placed) {
      const x = Math.floor(rng() * MAZE_SIZE);
      const z = Math.floor(rng() * MAZE_SIZE);

      if (maze[x][z] === 1) {
        // Na tomto místě je zeď
        const wall = new THREE.Mesh(specialWallGeometry, specialWallMaterial);
        wall.position.set(
          (x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
          WALL_HEIGHT / 2,
          (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );
        scene.add(wall);
        walls.push(wall);
        placed = true;
      }
    }
  }
}

function generateMaze(width, height, seed) {
  let rng = new seedrandom(seed);
  let maze = Array(height)
    .fill()
    .map(() => Array(width).fill(1));

  function carvePassage(x, y) {
    const directions = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    directions.sort(() => rng() - 0.5);

    maze[y][x] = 0;

    for (let [dx, dy] of directions) {
      let nx = x + dx * 2;
      let ny = y + dy * 2;

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        maze[ny][nx] === 1
      ) {
        maze[y + dy][x + dx] = 0;
        carvePassage(nx, ny);
      }
    }
  }

  carvePassage(1, 1);

  // Náhodně generujeme pravděpodobnost a velikost haly na základě seed
  const hallProbability = 0.008 + rng() * (0.02 - 0.008);
  const hallSize = 2 + Math.floor(rng() * (4 - 2 + 1));

  for (let y = 1; y < height - hallSize; y += hallSize) {
    for (let x = 1; x < width - hallSize; x += hallSize) {
      if (rng() < hallProbability) {
        for (let dy = 0; dy < hallSize; dy++) {
          for (let dx = 0; dx < hallSize; dx++) {
            maze[y + dy][x + dx] = 0;
          }
        }
        // Vytvoříme cesty vedoucí z haly
        let directions = [
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ];
        for (let [dx, dy] of directions) {
          let nx = x + dx * hallSize,
            ny = y + dy * hallSize;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            maze[y + dy * Math.floor(hallSize / 2)][
              x + dx * Math.floor(hallSize / 2)
            ] = 0;
          }
        }
      }
    }
  }

  // Zajistíme, že existuje cesta k cíli
  if (maze[height - 1][width - 1] === 1) {
    let x = width - 1;
    let y = height - 1;
    while (maze[y][x] === 1) {
      maze[y][x] = 0;
      if (x > 0 && maze[y][x - 1] === 0) {
        x--;
      } else if (y > 0 && maze[y - 1][x] === 0) {
        y--;
      } else if (x > 1) {
        maze[y][x - 1] = 0;
        x -= 2;
      } else if (y > 1) {
        maze[y - 1][x] = 0;
        y -= 2;
      }
    }
  }

  return maze;
}

function placeObjectInFreeCell(object, rng) {
  let freeCells = [];

  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 0) {
        freeCells.push({ x: i, z: j });
      }
    }
  }
  let height = 0.5;
  if (object.userData.isTeleport) {
    height = 1;
  }
 
  if (freeCells.length > 0) {
    let cell = freeCells[Math.floor(rng() * freeCells.length)];
    object.position.set(
      (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
      height,
      (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
    );
  } else {
    console.error("Nepodařilo se najít volnou buňku pro umístění objektu.");
  }
}

// Funkce pro vytvoření nového 3D modelu teleportu s particle efekty
function createTeleportModel(color) {
  const teleportGeometry = new THREE.TorusGeometry(0.8, 0.1, 32, 64);
  const teleportMaterial = new THREE.MeshStandardMaterial({
    color: color,
    transparent: true,
    opacity: 0.7,
  });
  const teleport = new THREE.Mesh(teleportGeometry, teleportMaterial);

  // Přidání particle efektů
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * teleport.scale.x * 2;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * teleport.scale.y * 2;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * teleport.scale.z * 2;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: color,
    size: 0.1,
    transparent: true,
    opacity: 0.7,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  teleport.add(particleSystem);

  // Animace particle efektů
  const clock = new THREE.Clock();
  function animateTeleport() {
    const delta = clock.getDelta();
    particleSystem.rotation.x += 0.01 * delta;
    particleSystem.rotation.y += 0.01 * delta;
    particleSystem.scale.x = 1 + 0.1 * Math.sin(performance.now() * 0.005);
    particleSystem.scale.y = 1 + 0.1 * Math.sin(performance.now() * 0.005);
    particleSystem.scale.z = 1 + 0.1 * Math.sin(performance.now() * 0.005);
    requestAnimationFrame(animateTeleport);
  }
  animateTeleport();

  return teleport;
}

function createPlayer() {
  player = new THREE.Group();
  camera.position.set(0, 1.6, 0);
  player.add(camera);
  scene.add(player);

  const seed = getHash(document.getElementById("mazeInput").value);
  let rng = new seedrandom(seed);

  // Najděme volnou buňku v bludišti pro umístění hráče
  let freeCells = [];
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 0) {
        freeCells.push({ x: i, z: j });
      }
    }
  }

  if (freeCells.length > 0) {
    // Vybereme náhodnou volnou buňku a umístíme na ni hráče
    let cell = freeCells[Math.floor(rng() * freeCells.length)];
    player.position.set(
      (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
      0,
      (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
    );
  } else {
    console.error("Nepodařilo se najít volnou buňku pro umístění hráče.");
  }
}

function onKeyDown(event) {
  switch (event.code) {
    case "KeyW":
      moveForward = true;
      break;
    case "KeyS":
      moveBackward = true;
      break;
    case "KeyA":
      moveLeft = true;
      break;
    case "KeyD":
      moveRight = true;
      break;
    case "KeyF": // Přidáno: reakce na stisknutí klávesy F
      if (nearTeleport) {
        teleportPlayer(nearTeleport);
      }
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case "KeyW":
      moveForward = false;
      break;
    case "KeyS":
      moveBackward = false;
      break;
    case "KeyA":
      moveLeft = false;
      break;
    case "KeyD":
      moveRight = false;
      break;
  }
}

function onMouseMove(event) {
  if (document.pointerLockElement === document.body) {
    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    playerRotation -= movementX * 0.002;
    player.rotation.y = playerRotation;

    const verticalRotation = camera.rotation.x - movementY * 0.002;
    camera.rotation.x = Math.max(
      Math.min(verticalRotation, Math.PI / 2),
      -Math.PI / 2
    );
  }
}

function onMouseClick() {
  if (document.pointerLockElement !== document.body) {
    document.body.requestPointerLock();
  }
}

function checkCollisions() {
  const playerRadius = 0.3;
  const wallMargin = 0.2; // Přidáme malou mezeru mezi hráčem a zdí
  for (let wall of walls) {
    const dx = player.position.x - wall.position.x;
    const dz = player.position.z - wall.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    if (distance < CELL_SIZE / 2 + playerRadius + wallMargin) {
      const angle = Math.atan2(dz, dx);
      player.position.x =
        wall.position.x +
        Math.cos(angle) * (CELL_SIZE / 2 + playerRadius + wallMargin);
      player.position.z =
        wall.position.z +
        Math.sin(angle) * (CELL_SIZE / 2 + playerRadius + wallMargin);
      return true;
    }
  }
  return false;
}

function updatePlayerPosition() {
  playerVelocity.set(0, 0, 0);

  const speed = 0.1;
  if (moveForward) playerVelocity.z -= speed;
  if (moveBackward) playerVelocity.z += speed;
  if (moveLeft) playerVelocity.x -= speed;
  if (moveRight) playerVelocity.x += speed;

  playerVelocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation);

  const oldPosition = player.position.clone();
  player.position.add(playerVelocity);

  if (checkCollisions()) {
    player.position.copy(oldPosition);
  } else if (playerVelocity.length() > 0) {
    moveCount++;
    document.getElementById("moveCount").textContent = moveCount;
    lastTeleport = null; // Resetujeme poslední teleport pouze při skutečném pohybu
  }

  // Limit player movement to the maze area
  player.position.x = Math.max(
    Math.min(player.position.x, (MAZE_SIZE * CELL_SIZE) / 2),
    (-MAZE_SIZE * CELL_SIZE) / 2
  );
  player.position.z = Math.max(
    Math.min(player.position.z, (MAZE_SIZE * CELL_SIZE) / 2),
    (-MAZE_SIZE * CELL_SIZE) / 2
  );

  checkObjectInteractions();
}

let lastTeleport = null;

let keysAlertShown = false; // Přidáme proměnnou pro kontrolu zobrazení alertu

function checkObjectInteractions() {
  const currentTime = performance.now();
  nearTeleport = null;

  scene.children.forEach((child) => {
    if (
      child.userData.isKey ||
      child.userData.isTeleport ||
      child.userData.isGoal
    ) {
      const distance = player.position.distanceTo(child.position);

      if (child.userData.isKey && distance < 0.7) {
        console.log("Sbírám klíč");
        scene.remove(child);
        keyCount++;
        updateKeyCount();
        showKeyMessage(); // Zobrazí zprávu o sebrání klíče
      } else if (child.userData.isTeleport && distance < 1.5) {
        nearTeleport = child;
        showTeleportPrompt();
      } else if (child.userData.isGoal && distance < 1.5) {
        if (keyCount === totalKeys) {
          console.log("Dosaženo cíle");
          showFinishMessage();
          stopTimer();
          createMaze(document.getElementById("mazeInput").value);
          createPlayer();
          moveCount = 0;
          keyCount = 0;
          updateKeyCount();
          document.getElementById("moveCount").textContent = moveCount;
        } else {
          if (!keysAlertShown) {
            console.log(
              "Musíte nasbírat všechny kouzelné klíče, než dosáhnete cíle!"
            );
            showGoalMessage(keyCount, totalKeys); // Zobrazí zprávu o nesplněném cíli
            keysAlertShown = true;
          }
        }
      }
    }
  });

  if (!nearTeleport) {
    hideTeleportPrompt();
  }
}

function showKeyMessage() {
  const keyMessageElement = document.getElementById("keyMessage");
  keyMessageElement.style.display = "block";

  setTimeout(() => {
    keyMessageElement.style.display = "none";
  }, 2500);
}

function showFinishMessage() {
  const finishMessageElement = document.getElementById("finishMessage");
  finishMessageElement.style.display = "block";

  setTimeout(() => {
    finishMessageElement.style.display = "none";
  }, 2500);
}

function showGoalMessage(keyCount, totalKeys) {
  const goalMessageElement = document.getElementById("goalMessage");
  goalMessageElement.textContent = `Musíte nasbírat všechny kouzelné klíče, než dosáhnete cíle! (${keyCount}/${totalKeys})`;
  goalMessageElement.style.display = "block";

  setTimeout(() => {
    goalMessageElement.style.display = "none";
  }, 4000);
}

function teleportPlayer(teleport) {
  const currentTime = performance.now();
  if (currentTime - lastTeleportTime > teleportCooldown) {
    console.log("Teleportuji se");
    const otherTeleport = scene.children.find(
      (otherChild) =>
        otherChild instanceof THREE.Mesh &&
        otherChild.userData.isTeleport &&
        otherChild.userData.pairIndex === teleport.userData.pairIndex &&
        otherChild !== teleport
    );
    if (otherTeleport) {
      player.position.set(
        otherTeleport.position.x,
        0,
        otherTeleport.position.z
      );
      lastTeleportTime = currentTime;

      while (checkCollisions()) {
        player.position.set(
          (Math.random() - 0.5) * MAZE_SIZE * CELL_SIZE,
          0,
          (Math.random() - 0.5) * MAZE_SIZE * CELL_SIZE
        );
      }
    }
  }
}

function showTeleportPrompt() {
  // Vytvoříme nebo aktualizujeme element pro výzvu
  let promptElement = document.getElementById("teleportPrompt");
  if (!promptElement) {
    promptElement = document.createElement("div");
    promptElement.id = "teleportPrompt";
    promptElement.style.position = "absolute";
    promptElement.style.top = "50%";
    promptElement.style.left = "50%";
    promptElement.style.transform = "translate(-50%, -50%)";
    promptElement.style.color = "white";
    promptElement.style.fontSize = "20px";
    document.body.appendChild(promptElement);
  }
  promptElement.textContent = 'Stiskněte "F" pro použití teleportu.';
  promptElement.style.display = "block";
}

async function startGame() {
  const inputText = document.getElementById("mazeInput").value;
  await getBestTime(inputText);
  createMaze(inputText);
  createPlayer();
  moveCount = 0;
  keyCount = 0;
  document.getElementById("moveCount").textContent = moveCount;
  document.getElementById("timeCount").textContent = "0:00";
  camera.position.set(0, 1.6, 0);
  startTimer(); // Spuštění časovače
}

async function getBestTime(levelName) {
  try {
    const { data, error } = await supabase
      .from("maze_score")
      .select("time_score")
      .eq("playername", playerName)
      .eq("levelname", levelName)
      .order("time_score", { ascending: true })
      .limit(1);

    if (error) throw error;

    if (data.length > 0) {
      bestTime = data[0].time_score;
    } else {
      bestTime = Infinity;
    }
  } catch (error) {
    console.error("Error fetching best time:", error.message);
    bestTime = Infinity;
  }
}

function updateKeyCount() {
  document.getElementById("keyCount").textContent = `${keyCount}/${totalKeys}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000); // Aktualizace každou sekundu
}

async function stopTimer() {
  clearInterval(timerInterval);
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (elapsedTime < bestTime) {
    bestTime = elapsedTime;
    await submitScore(document.getElementById("mazeInput").value, bestTime);
  }
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  document.getElementById("timeCount").textContent = `${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}`;
}

function hideTeleportPrompt() {
  const promptElement = document.getElementById("teleportPrompt");
  if (promptElement) {
    promptElement.style.display = "none";
  }
}

function drawArrow(ctx, x, y, angle, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-size / 2, -size / 2);
  ctx.lineTo(size / 2, 0);
  ctx.lineTo(-size / 2, size / 2);
  ctx.lineTo(0, 0); // Dlouhá strana šipky směřující dopředu
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMinimap() {
  const minimap = document.getElementById("minimap");
  const ctx = minimap.getContext("2d");
  const scale = minimap.width / (MAZE_SIZE * CELL_SIZE);

  // Vymazání canvasu
  ctx.clearRect(0, 0, minimap.width, minimap.height);

  // Vykreslení pozadí
  ctx.fillStyle = "#6e6e6e";
  ctx.fillRect(0, 0, minimap.width, minimap.height);

  // Vykreslení zdí
  ctx.fillStyle = "black";
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 1) {
        ctx.fillRect(
          i * CELL_SIZE * scale,
          j * CELL_SIZE * scale,
          CELL_SIZE * scale,
          CELL_SIZE * scale
        );
      }
    }
  }

  // Vykreslení teleportů
  scene.children.forEach((child) => {
    if (child.userData.isTeleport) {
      ctx.fillStyle = child.material.color.getStyle();
      ctx.beginPath();
      ctx.arc(
        (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (CELL_SIZE * scale) / 3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  });

  // Vykreslení klíčů
  scene.children.forEach((child) => {
    if (child.userData.isKey) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(
        (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (CELL_SIZE * scale) / 4,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  });

  // Vykreslení cíle
  scene.children.forEach((child) => {
    if (child.userData.isGoal) {
      ctx.fillStyle = "cyan";
      ctx.beginPath();
      ctx.arc(
        (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
        (CELL_SIZE * scale) / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  });

  // Vykreslení pozice hráče jako šipky
  ctx.fillStyle = "blue";
  const playerX = (player.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerZ = (player.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerAngle = -player.rotation.y - Math.PI / 2; // Úprava úhlu rotace
  drawArrow(ctx, playerX, playerZ, playerAngle, CELL_SIZE * scale);
}

function getMinimapDisplayTime() {
  return Math.max(5, Math.min(10, MAZE_SIZE / 5));
}

function showMinimap() {
  drawMinimap();
  const minimap = document.getElementById("minimap");
  minimap.style.display = "block";

  minimapVisibleTimer = setTimeout(() => {
    minimap.style.display = "none";
  }, getMinimapDisplayTime() * 1000); // Použití dynamické doby zobrazení minimapy
}


// Funkce pro načtení modelu klíče
function loadKeyModel() {
  return new Promise((resolve, reject) => {
    console.log("Starting to load key model");
    const loader = new GLTFLoader();
    loader.load(
      "Key.glb",
      (gltf) => {
        console.log("GLTF loaded successfully", gltf);
        keyModel = gltf.scene;
        keyModel.scale.set(0.3, 0.3, 0.3);
        console.log("Key model processed");
        resolve(keyModel);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading model:", error);
        reject(error);
      }
    );
  });
}

async function loadTreasureModel() {
  return new Promise((resolve, reject) => {
    console.log("Starting to load treasure model");
    const loader = new GLTFLoader();
    loader.load(
      "TreasureChest.glb",
      (gltf) => {
        console.log("Treasure model loaded successfully", gltf);
        treasureModel = gltf.scene;
        treasureModel.scale.set(0.5, 0.5, 0.5);
        console.log("Treasure model processed");
        resolve(treasureModel);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading treasure model:", error);
        reject(error);
      }
    );
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

function rotateTeleports() {
  scene.children.forEach((child) => {
    if (child.userData.isTeleport) {
      child.rotation.y += 0.01; // Pomalá rotace kolem osy Y
    }
  });
}


// Třída pro správu světel
class LightManager {
  constructor(scene, maxVisibleLights, tolerance = 2) {
    this.scene = scene;
    this.maxVisibleLights = maxVisibleLights;
    this.lights = [];
    this.tolerance = tolerance; // Přidáme toleranci
  }

  addLight(light) {
    this.lights.push(light);
    this.scene.add(light);
    light.visible = false; // Začněte se všemi světly vypnutými
  }

  update(playerPosition, camera) {
    // Vytvoříme frustum kamery s tolerancí
    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();
    camera.updateMatrixWorld(); // Zajistíme, že matice kamery je aktuální
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    this.lights.forEach(light => {
      light.visible = false;
    });

    // Seřaďte světla podle vzdálenosti od hráče a zjistěte, zda jsou v záběru s tolerancí
    const sortedLights = this.lights
      .map(light => ({
        light,
        distance: light.position.distanceTo(playerPosition),
        inView: frustum.intersectsSphere(new THREE.Sphere(light.position, this.tolerance))
      }))
      .filter(lightInfo => lightInfo.inView) // Filtrujte pouze světla, která jsou v záběru nebo blízko záběru
      .sort((a, b) => a.distance - b.distance);

    // Zapněte pouze nejbližší světla
    for (let i = 0; i < Math.min(this.maxVisibleLights, sortedLights.length); i++) {
      sortedLights[i].light.visible = true;
    }
  }
}


function createTorches(walls, maze, CELL_SIZE, MAZE_SIZE) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

  const rng = new seedrandom(getHash(document.getElementById("mazeInput").value));

  // Vytvoříme pomocné pole pro sledování, kde už jsou pochodně umístěny
  const torchPositions = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(false));

  for (let x = 0; x < MAZE_SIZE; x++) {
    for (let z = 0; z < MAZE_SIZE; z++) {
      if (maze[x][z] === 0) { // Jsme v chodbě
        // Zkontrolujeme sousední buňky
        const directions = [
          { dx: 1, dz: 0 },
          { dx: -1, dz: 0 },
          { dx: 0, dz: 1 },
          { dx: 0, dz: -1 }
        ];

        directions.forEach(dir => {
          const nx = x + dir.dx;
          const nz = z + dir.dz;

          // Pokud je sousední buňka zeď a zde ještě není pochodeň
          if (nx >= 0 && nx < MAZE_SIZE && nz >= 0 && nz < MAZE_SIZE &&
            maze[nx][nz] === 1 && !torchPositions[x][z]) {

            // S určitou pravděpodobností umístíme pochodeň
            if (rng() < 0.3) { // 30% šance na umístění pochodně
              const torch = new THREE.Mesh(torchGeometry, torchMaterial);

              torch.position.set(
                (x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dx * CELL_SIZE * 0.5,
                WALL_HEIGHT / 2,
                (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dz * CELL_SIZE * 0.5
              );

              // Natočíme pochodeň směrem ke zdi

              torch.rotateZ(Math.PI / 1);

              scene.add(torch);

              const fire = createFireParticles();
              fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
              scene.add(fire);

              const light = new THREE.PointLight(0xffa500, 1.5, CELL_SIZE * 4);
              light.position.set(
                (x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dx * CELL_SIZE * 0.18,
                (WALL_HEIGHT / 2) + 0.25,
                (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dz * CELL_SIZE * 0.18
              );

              lightManager.addLight(light);

              torches.push({ torch, fire, light });
              torchPositions[x][z] = true;
            }
          }
        });
      }
    }
  }
}


// Upravte funkci createFireParticles()
function createFireParticles() {
  const particleCount = 12;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = Math.random() * 0.3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

    colors[i * 3] = 1.5;
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
    colors[i * 3 + 2] = 0;

    sizes[i] = 0.1 + Math.random() * 0.1; // Zvětšené částice
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.1, // Zvětšená velikost částic
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

// Přidejte tuto funkci pro animaci ohně
function animateFire() {
  torches.forEach(({ fire }) => {
    const positions = fire.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += 0.01 + Math.random() * 0.02;
      positions[i + 2] += (Math.random() - 0.5) * 0.01;

      if (positions[i + 1] > 0.6) {
        positions[i] = (Math.random() - 0.5) * 0.1;
        positions[i + 1] = 0;
        positions[i + 2] = (Math.random() - 0.5) * 0.1;
      }
    }
    fire.geometry.attributes.position.needsUpdate = true;
  });
}

let floatingObjects = [];

function addFloatingObjects() {
  // Nejprve odstraníme staré objekty, pokud existují
  floatingObjects.forEach(obj => scene.remove(obj));
  floatingObjects = [];

  const geometries = [
    new THREE.TetrahedronGeometry(0.5),
    new THREE.OctahedronGeometry(0.5),
    new THREE.DodecahedronGeometry(0.5)
  ];

  for (let i = 0; i < 100; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      metalness: 0.7,
      roughness: 0.3
    });
    const object = new THREE.Mesh(geometry, material);

    object.position.set(
      (Math.random() - 0.5) * MAZE_SIZE * CELL_SIZE * 3,
      Math.random() * MAZE_SIZE * CELL_SIZE,
      (Math.random() - 0.5) * MAZE_SIZE * CELL_SIZE * 3
    );

    object.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
    
    object.userData.rotationSpeed = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    };

    object.userData.floatSpeed = (Math.random() - 0.5) * 0.05;

    scene.add(object);
    floatingObjects.push(object);
  }
}
function addNebula() {
  const geometry = new THREE.SphereGeometry(1500, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
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
      varying vec3 vNormal;
      void main() {
        vec3 color = 0.5 + 0.5 * cos(time * 0.2 + vNormal.xyx + vec3(0,2,4));
        gl_FragColor = vec4(color, 0.3);
      }
    `,
    side: THREE.BackSide,
    transparent: true
  });
  nebula = new THREE.Mesh(geometry, material);
  scene.add(nebula);
  
  return { material, object: nebula };
}

// Upravte funkci animate()
function animate() {
  requestAnimationFrame(animate);
  updatePlayerPosition();
  checkObjectInteractions();
  animateKeys();
  animateGoal();
  rotateTeleports();
  animateFire();

   // Animace létajících objektů
   floatingObjects.forEach(obj => {
    obj.rotation.x += obj.userData.rotationSpeed.x;
    obj.rotation.y += obj.userData.rotationSpeed.y;
    obj.rotation.z += obj.userData.rotationSpeed.z;

    obj.position.y += obj.userData.floatSpeed;

    // Pokud objekt vyletí příliš vysoko nebo nízko, obrátíme směr
    if (obj.position.y > MAZE_SIZE * CELL_SIZE || obj.position.y < 0) {
      obj.userData.floatSpeed *= -1;
    }
  });
 
  if (nebulaMaterial) {
    nebulaMaterial.material.uniforms.time.value += 0.01;
  }

  lightManager.update(player.position, camera); // Aktualizace světel s hráčovou pozicí a kamerou

  composer.render();
}

function showNameModal() {
  document.getElementById("nameModal").style.display = "block";
}

function hideNameModal() {
  document.getElementById("nameModal").style.display = "none";
}

function showScoreModal() {
  document.getElementById("scoreModal").style.display = "block";
}

function hideScoreModal() {
  document.getElementById("scoreModal").style.display = "none";
}

async function submitScore(levelName, time) {
  try {
    const { data, error } = await supabase
      .from("maze_score")
      .upsert([
        { playername: playerName, levelname: levelName, time_score: time },
      ], { onConflict: ['playername', 'levelname'] });

    if (error) throw error;
    console.log("Score submitted successfully");
  } catch (error) {
    console.error("Error submitting score:", error.message);
  }
}


async function getScores() {
  try {
    const { data, error } = await supabase
      .from("maze_score")
      .select("*")
      .order("levelname", { ascending: true })
      .order("time_score", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching scores:", error.message);
    return [];
  }
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Přidejte tuto funkci pro seskupování a řazení skóre
function groupAndSortScores(scores) {
  const groupedScores = {};
  scores.forEach((score) => {
    if (!groupedScores[score.levelname]) {
      groupedScores[score.levelname] = [];
    }
    groupedScores[score.levelname].push(score);
  });

  Object.values(groupedScores).forEach((group) => {
    group.sort((a, b) => a.time_score - b.time_score);
  });

  return groupedScores;
}

function updateScoreTable(scores) {
  const tbody = document.querySelector("#scoreTable tbody");
  tbody.innerHTML = "";

  const groupedScores = groupAndSortScores(scores);

  Object.entries(groupedScores).forEach(([levelName, levelScores]) => {
    const groupRow = tbody.insertRow();
    const groupCell = groupRow.insertCell(0);
    groupCell.colSpan = 3;
    groupCell.textContent = levelName;
    groupCell.style.fontWeight = "bold";
    groupCell.style.backgroundColor = "#34495e";

    levelScores.forEach((score, index) => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = "" //index === 0 ? "" : levelName;
      row.insertCell(1).textContent = score.playername;
      row.insertCell(2).textContent = formatTime(score.time_score);
    });
  });
}

function filterScores() {
  const searchTerm = document
    .getElementById("mazeSearchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#scoreTable tbody tr");

  let currentGroup = "";
  rows.forEach((row) => {
    if (row.cells[0].colSpan === 3) {
      currentGroup = row.cells[0].textContent.toLowerCase();
      row.style.display = currentGroup.includes(searchTerm) ? "" : "none";
    } else {
      row.style.display = currentGroup.includes(searchTerm) ? "" : "none";
    }
  });
}

document.getElementById("generateMaze").addEventListener("click", startGame);

init();
