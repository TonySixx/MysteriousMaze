import * as THREE from 'three';
import seedrandom from 'seedrandom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const loader = new THREE.TextureLoader();
const floorTexture = loader.load("cihly.jpg");
floorTexture.colorSpace =  THREE.SRGBColorSpace;
const textureSets = [
  {
    wallTexture: "wall.jpg",
    ceilingTexture: "wall.jpg",
    specialTextures: [
      "wall-sign-1.jpg",
      "wall-sign-2.jpg",
      "wall-sign-3.jpg",
    ],
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

let keyModel;


async function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  try {
    await loadKeyModel();
    createMaze();
    createPlayer();
    startTimer();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("click", onMouseClick, false);
    window.addEventListener("resize", onWindowResize);

    animate();
  } catch (error) {
    console.error("Failed to load key model:", error);
  }
}

function createMaze(inputText = "") {
  walls = [];
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  scene.background = new THREE.Color(0x48515b);

  const seed = getHash(inputText);
  let rng = new seedrandom(seed);
  const textureSetIndex = Math.floor(rng() * textureSets.length);
  const selectedTextureSet = textureSets[textureSetIndex];

  const brickTexture = loader.load(selectedTextureSet.wallTexture);
  const ceilingTexture = loader.load(selectedTextureSet.ceilingTexture);
  brickTexture.colorSpace = THREE.SRGBColorSpace;
  ceilingTexture.colorSpace = THREE.SRGBColorSpace;

  const specialTextures = selectedTextureSet.specialTextures.map((textureName) =>
    loader.load(textureName)
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

  const wallGeometry = new THREE.BoxGeometry(
    CELL_SIZE,
    WALL_HEIGHT,
    CELL_SIZE
  );
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

  const goalGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const goalMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
  });
  const goal = new THREE.Mesh(goalGeometry, goalMaterial);
  goal.userData.isGoal = true;
  placeObjectInFreeCell(goal, rng);
  scene.add(goal);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(0, 10, 0);
  scene.add(directionalLight);

  keyCount = 0;
  updateKeyCount();

  console.log("Maze created");
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
          metalness: 0.7,
          roughness: 0.3,
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

      if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        carvePassage(nx, ny);
      }
    }
  }

  carvePassage(1, 1);

  // Přidáme haly (méně často)
  const hallProbability = 0.01;
  const hallSize = 3;

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
            maze[y + dy * Math.floor(hallSize / 2)][x + dx * Math.floor(hallSize / 2)] = 0;
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
  if (object.userData.isTeleport) { height = 1; }
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
    particlePositions[i * 3] =
      (Math.random() - 0.5) * teleport.scale.x * 2;
    particlePositions[i * 3 + 1] =
      (Math.random() - 0.5) * teleport.scale.y * 2;
    particlePositions[i * 3 + 2] =
      (Math.random() - 0.5) * teleport.scale.z * 2;
  }

  particleGeometry.setAttribute(
    'position',
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
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    playerRotation -= movementX * 0.002;
    player.rotation.y = playerRotation;

    const verticalRotation = camera.rotation.x - movementY * 0.002;
    camera.rotation.x = Math.max(Math.min(verticalRotation, Math.PI / 2), -Math.PI / 2);
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

  playerVelocity.applyAxisAngle(
    new THREE.Vector3(0, 1, 0),
    playerRotation
  );

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
      } else if (child.userData.isGoal && distance < 1) {
        if (keyCount === totalKeys) {
          console.log("Dosaženo cíle");
          alert("Gratulujeme! Dosáhli jste cíle!");
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

function updateKeyCount() {
  document.getElementById("keyCount").textContent = `${keyCount}/${totalKeys}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000); // Aktualizace každou sekundu
}

function stopTimer() {
  clearInterval(timerInterval);
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
  setTimeout(() => {
    minimap.style.display = "none";
  }, getMinimapDisplayTime() * 1000); // Použití dynamické doby zobrazení minimapy
}

setInterval(showMinimap, 15000); // Interval 20 vteřin

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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function rotateTeleports() {
  scene.children.forEach((child) => {
    if (child.userData.isTeleport) {
      child.rotation.y += 0.01; // Pomalá rotace kolem osy Y
    }
  });
}


function animate() {
  requestAnimationFrame(animate);
  updatePlayerPosition();
  checkObjectInteractions();
  animateKeys();
  rotateTeleports();
  renderer.render(scene, camera);
}

document.getElementById("generateMaze").addEventListener("click", () => {
  const inputText = document.getElementById("mazeInput").value;
  createMaze(inputText);
  createPlayer();
  moveCount = 0;
  keyCount = 0;
  document.getElementById("moveCount").textContent = moveCount;
  document.getElementById("timeCount").textContent = "0:00";
  camera.position.set(0, 1.6, 0);
  startTimer(); // Spuštění časovače
});

init();
