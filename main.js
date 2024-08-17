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

let playerHealth = 100;
let playerMana = 100;
const maxMana = 100;
const manaRegenRate = 0.5; // Počet MP, které se obnoví za interval

let moveForward = false,
  moveBackward = false,
  moveLeft = false,
  moveRight = false;
let playerRotation = 0;
let playerVelocity = new THREE.Vector3();
let lastTeleportTime = 0;
const teleportCooldown = 1000;
let nearTeleport = null;

const torches = [];
// Globální proměnné
let composer, lightManager;
const MAX_VISIBLE_LIGHTS = 10; // Maximální počet viditelných světel

let keyModel;
let treasureModel;
// Přidejte globální proměnné
const BLOCKING_WALL = 2;
let staffModel;
let fireBalls = [];
let magicBalls = [];
let bosses = [];
let bossCounter = 0; // Globální počítadlo pro ID bossů

let isConsoleOpen = false;
let consoleInput = '';
let canWalkThroughWalls = false;




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
    await loadStaffModel();
    createMaze();
    createPlayer();
    attachStaffToCamera();
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
    document.addEventListener('mousedown', onMouseDown);
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

function processConsoleCommand(command) {
  switch (command.toLowerCase()) {
    case 'ghost':
      enableGhostMode();
      break;
    case 'walk':
      disableGhostMode();
      break;
    default:
      console.log('Neznámý příkaz:', command);
      break;
  }
}

function enableGhostMode() {
  canWalkThroughWalls = true;
  console.log("Ghost mode activated!");
}

function disableGhostMode() {
  canWalkThroughWalls = false;
  console.log("Ghost mode deactivated!");
}

function attachStaffToCamera() {
  if (staffModel) {
    staffModel.position.set(0.3, -0.2, -0.5); // Upravte pozici podle potřeby
    staffModel.rotation.set(0, Math.PI / 2, 0); // Upravte rotaci podle potřeby
    camera.add(staffModel);
  }
}

function onMouseDown(event) {
  if (event.button === 0) { // Levé tlačítko myši
    shootFireball();
  }
}


function updateMagicBalls(deltaTime) {
  for (let i = magicBalls.length - 1; i >= 0; i--) {
    const magicBall = magicBalls[i];
    magicBall.position.add(magicBall.velocity.clone().multiplyScalar(deltaTime*40));

    var player_position_for_collision = { ...player.position };
    player_position_for_collision.y = 1;
    if (magicBall.position.distanceTo(player_position_for_collision) < 0.5) {
      playerHealth -= 30;
      updatePlayerHealthBar();
      if (playerHealth <= 0) {
        playerDeath();
      }
      createExplosion(magicBall.position, magicBall.material.color.getHex()); // Vytvoření exploze s barvou střely
      scene.remove(magicBall);
      magicBalls.splice(i, 1);
    }

    for (let j = 0; j < walls.length; j++) {
      const wall = walls[j];
      if (magicBall.position.distanceTo(wall.position) < CELL_SIZE / 2) {
        createExplosion(magicBall.position, magicBall.material.color.getHex()); // Vytvoření exploze s barvou střely
        scene.remove(magicBall);
        magicBalls.splice(i, 1);
        break;
      }
    }

     // Časový limit - pokud střela existuje déle než 5 sekund, odstranit ji
     magicBall.userData.lifeTime = (magicBall.userData.lifeTime || 0) + deltaTime;
     if (magicBall.userData.lifeTime > 5) {
       scene.remove(magicBall);
       magicBalls.splice(i, 1);
     }

  }
}

function canSeePlayer(bossPosition, playerPosition) {
  const raycaster = new THREE.Raycaster(bossPosition, new THREE.Vector3().subVectors(playerPosition, bossPosition).normalize());
  const intersects = raycaster.intersectObjects(walls);
  return intersects.length === 0;
}

function playerDeath() {
  // Restart hry
  createMaze(document.getElementById("mazeInput").value);
  createPlayer();
  moveCount = 0;
  keyCount = 0;
  playerHealth = 100;
  updatePlayerHealthBar();
  updateKeyCount();
  document.getElementById("timeCount").textContent = "0:00";
  startTimer();
}

// Funkce pro vystřelení ohnivé koule
function shootFireball() {
  if (playerMana >= 20) {
    playerMana -= 20;
    updatePlayerManaBar();

    const fireball = createFireball();

    // Nastavení počáteční pozice ohnivé koule na pozici staffModel
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    fireball.position.copy(staffWorldPosition);
    fireball.position.y += 0.3;

    // Vytvoření efektu při vyčarování ohnivé koule
    createCastEffect(staffWorldPosition);

    // Získání směru střelby z kamery
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    fireball.velocity = direction.multiplyScalar(0.25);

    // Přidání ohnivé koule do scény
    scene.add(fireball);
    fireBalls.push(fireball);
  } else {
    console.log("Not enough mana to cast fireball.");
  }
}

function regenerateMana(deltaTime) {
  if (playerMana < maxMana) {
    playerMana = Math.min(playerMana + (manaRegenRate * (deltaTime*40)), maxMana);
    updatePlayerManaBar();
  }
}

function regenerateHealth(deltaTime) {
  if (playerHealth < 100) {
    playerHealth = Math.min(playerHealth + (0.05 * (deltaTime*40)), 100);
    updatePlayerHealthBar();
  }
}


// Funkce pro vytvoření ohnivé koule
function createFireball() {
  const fireball = new THREE.Group();

  // Vytvoření základní koule s emissive materiálem
  const geometry = new THREE.SphereGeometry(0.2, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 2
  });
  const core = new THREE.Mesh(geometry, material);
  fireball.add(core);

  // Přidání částicového efektu
  const particleCount = 50;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.05,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.45;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.45;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  fireball.add(particles);

  // Animace částic
  fireball.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.02;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.04;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  return fireball;
}

function createCastEffect(position) {
  const castEffectGroup = new THREE.Group();

  const particleCount = 30;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xffa500,
      size: 0.02,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  castEffectGroup.add(particles);

  castEffectGroup.position.copy(position);
  castEffectGroup.position.y += 0.3;
  scene.add(castEffectGroup);

  // Animace částic
  castEffectGroup.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  // Automatické odstranění efektu po určité době
  setTimeout(() => {
    scene.remove(castEffectGroup);
  }, 500); // Efekt trvá 0.5 sekundy

  return castEffectGroup;
}

function createExplosion(position,color = 0xff4500) {
  const explosionGroup = new THREE.Group();

  const particleCount = 100;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: color, // Použití předané barvy nebo výchozí barvy
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

    velocities[i * 3] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  explosionGroup.add(particles);

  explosionGroup.position.copy(position);
  scene.add(explosionGroup);

  // Animace částic
  explosionGroup.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      velocities[i] *= 0.95; // Zpomalení částic
      velocities[i + 1] *= 0.95;
      velocities[i + 2] *= 0.95;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  // Automatické odstranění výbuchu po určité době
  setTimeout(() => {
    scene.remove(explosionGroup);
  }, 1000); // Výbuch trvá 1 sekundu

  return explosionGroup;
}



function createMaze(inputText = "") {

  // Odstranění všech UI elementů pro bosse
  const bossHealthContainer = document.getElementById("bossHealthContainer");
  while (bossHealthContainer.firstChild) {
    bossHealthContainer.removeChild(bossHealthContainer.firstChild);
  }

  // Resetování pole bossů
  bosses = [];
  bossCounter = 0;

  bosses = [];
  bossCounter = 0;

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

  // Nastavení seed pro generátor náhodných čísel
  const seed = getHash(inputText);
  let rng = new seedrandom(seed);

  // Vybereme sadu textur
  const textureSetIndex = Math.floor(rng() * textureSets.length);
  const selectedTextureSet = textureSets[textureSetIndex];

  const loader = new THREE.TextureLoader();
  const floorTexture = loader.load("cihly.jpg");
  floorTexture.colorSpace = THREE.SRGBColorSpace;

  const brickTexture = loader.load(selectedTextureSet.wallTexture);
  const ceilingTexture = loader.load(selectedTextureSet.ceilingTexture);
  brickTexture.colorSpace = THREE.SRGBColorSpace;
  ceilingTexture.colorSpace = THREE.SRGBColorSpace;

  const specialTextures = selectedTextureSet.specialTextures.map(
    (textureName) => loader.load(textureName)
  );
  specialTextures.forEach((x) => (x.colorSpace = THREE.SRGBColorSpace));

  //Velikost bludiště
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

  // Přidání blokujících zdí na základě seed
  const blockingWallCount = Math.floor(MAZE_SIZE * MAZE_SIZE * 0.02);
  for (let i = 0; i < blockingWallCount; i++) {
    let x, z;
    do {
      x = Math.floor(rng() * MAZE_SIZE);
      z = Math.floor(rng() * MAZE_SIZE);
    } while (maze[x][z] !== 0);
    maze[x][z] = BLOCKING_WALL;
  }

  // Přidejte vytvoření blokujících zdí
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === BLOCKING_WALL) {
        const blockingWall = createBlockingWall(brickTexture);
        blockingWall.position.set(
          (i - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
          WALL_HEIGHT / 2,
          (j - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );
        scene.add(blockingWall);
        walls.push(blockingWall);
      }
    }
  }

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
  scene.fog = new THREE.FogExp2(0x000000, 0.05); // Zvýšili jsme hustotu mlhy

  keyCount = 0;
  updateKeyCount();

  clearInterval(showMinimapTimer);
  clearTimeout(minimapVisibleTimer);
  minimap.style.display = "none";
  showMinimapTimer = setInterval(showMinimap, 15000);

  // Resetování zdraví hráče při vytvoření nového bludiště
  playerHealth = 100;
  playerMana = maxMana;
  updatePlayerHealthBar();
  updatePlayerManaBar();

  console.log("Maze created");
  console.log("lights " + lightManager.lights.length);
  console.log("bosses " + bosses.length);
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

  // Spočítáme, kolik klíčů už je přiděleno bossům
  const keysWithBosses = bosses.length;

  // Vypočítáme, kolik klíčů zbývá k rozmístění do bludiště
  const remainingKeys = totalKeys - keysWithBosses;

  // Ujistíme se, že počet klíčů je v požadovaném rozmezí
  if (remainingKeys < 0) {
    console.error("Počet klíčů přiřazených bossům přesahuje celkový počet klíčů.");
    return;
  }

  for (let i = 0; i < remainingKeys; i++) {
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

function animateKeys(deltaTime) {
  scene.children.forEach((child) => {
    if (child.userData.isKey) {
      child.rotation.y += 1 * deltaTime; // Rychlost rotace klíče
    }
  });
}
function animateGoal(deltaTime) {
  scene.children.forEach((child) => {
    if (child.userData.isGoal) {
      child.rotation.y += 1 * deltaTime; // Rychlost rotace cíle

      // Vznášení nahoru a dolů
      const floatSpeed = 0.5; // Základní rychlost vznášení
      const time = Date.now() * 0.001; // Aktuální čas v sekundách
      const floatHeight = Math.sin(time * floatSpeed) * 0.1; // Výška vznášení
      child.position.y = 0.5 + floatHeight;
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

  // Přidáme generování hal a bossů
  const hallProbability = 0.008 + rng() * (0.02 - 0.008);
  const hallSize = 2 + Math.floor(rng() * (4 - 2 + 1));
  const bossProbability = 0.8; // 80% šance na spawnutí bosse v hale

  for (let y = 1; y < MAZE_SIZE - hallSize; y += hallSize) {
    for (let x = 1; x < MAZE_SIZE - hallSize; x += hallSize) {
      if (rng() < hallProbability) {
        // Vytvoření haly
        for (let dy = 0; dy < hallSize; dy++) {
          for (let dx = 0; dx < hallSize; dx++) {
            maze[y + dy][x + dx] = 0;
          }
        }

        // Vytvoření cest vedoucích z haly
        let directions = [
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ];
        for (let [dx, dy] of directions) {
          let nx = x + dx * hallSize,
            ny = y + dy * hallSize;
          if (nx >= 0 && nx < MAZE_SIZE && ny >= 0 && ny < MAZE_SIZE) {
            maze[y + dy * Math.floor(hallSize / 2)][
              x + dx * Math.floor(hallSize / 2)
            ] = 0;
          }
        }

        // Šance na spawnutí bosse v hale
        if (rng() < bossProbability) {       
          spawnBossInMaze(maze,rng);
        }
      }
    }
    document.getElementById("bossHealthContainer").style = "display:block";
    if (bosses.length === 0) {
      document.getElementById("bossHealthContainer").style = "display:none;";
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

// function placeObjectInHall(hallCenter, hallSize, rng) {
//   const halfSize = Math.floor(hallSize / 2);
//   let freeCells = [];

//   const startX = Math.floor(hallCenter.x / CELL_SIZE) - halfSize + MAZE_SIZE / 2;
//   const startZ = Math.floor(hallCenter.z / CELL_SIZE) - halfSize + MAZE_SIZE / 2;

//   // Projdeme všechny buňky v oblasti haly
//   for (let x = startX; x <= startX + hallSize; x++) {
//     for (let z = startZ; z <= startZ + hallSize; z++) {
//       // Kontrola, zda se jedná o platné indexy a buňku ve volném prostoru
//       if (x >= 0 && x < MAZE_SIZE && z >= 0 && z < MAZE_SIZE && maze[x] && maze[x][z] === 0) {
//         freeCells.push({ x, z });
//       }
//     }
//   }

//   if (freeCells.length > 0) {
//     let cell = freeCells[Math.floor(rng() * freeCells.length)];
//     return new THREE.Vector3(
//       (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
//       0.5,
//       (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
//     );
//   } else {
//     console.error("Nepodařilo se najít volnou buňku pro umístění objektu v hale.");
//     return null;
//   }
// }







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

// Funkce pro vytvoření blokující zdi
function createBlockingWall(brickTexture) {
  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: brickTexture,
    emissive: 0xff3300,
    emissiveIntensity: 1.5,
  });
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);

  // Přidejte částicový efekt
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xff3300,
      size: 0.2,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const particleCount = 0;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * CELL_SIZE;
    positions[i * 3 + 1] = Math.random() * WALL_HEIGHT;
    positions[i * 3 + 2] = (Math.random() - 0.5) * CELL_SIZE;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  wall.add(particles);

  wall.userData.isBlockingWall = true;
  return wall;
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
  if (canWalkThroughWalls) {
    return false; // Pokud je aktivní Ghost mode, ignorujeme kolize
  }

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

function updatePlayerHealthBar() {
  const healthBarFill = document.getElementById('playerHealthFill');
  const healthPercentage = Math.max(playerHealth, 0) + '%';
  healthBarFill.style.width = `${playerHealth}%`;
}

function updatePlayerManaBar() {
  const manaBarFill = document.getElementById('playerManaFill');
  const manaPercentage = Math.max(playerMana, 0) + '%';
  manaBarFill.style.width = `${playerMana}%`;
}

function updatePlayerPosition(deltaTime) {
  playerVelocity.set(0, 0, 0);

  const speed = 6.5; // Základní rychlost hráče
  if (moveForward) playerVelocity.z -= speed * deltaTime;
  if (moveBackward) playerVelocity.z += speed * deltaTime;
  if (moveLeft) playerVelocity.x -= speed * deltaTime;
  if (moveRight) playerVelocity.x += speed * deltaTime;

  playerVelocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation);

  const oldPosition = player.position.clone();
  player.position.add(playerVelocity);

  if (checkCollisions()) {
    player.position.copy(oldPosition);
  } else if (playerVelocity.length() > 0) {
    moveCount++;
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
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(
          i * CELL_SIZE * scale,
          j * CELL_SIZE * scale,
          CELL_SIZE * scale,
          CELL_SIZE * scale
        );
      } else if (maze[i][j] === BLOCKING_WALL) {
        ctx.fillStyle = "orange";
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

  // Vykreslení bossů jako bílý křížek
  bosses.forEach((boss) => {
    const bossX = (boss.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
    const bossZ = (boss.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // Vykreslení křížku
    ctx.beginPath();
    ctx.moveTo(bossX - 5, bossZ - 5);
    ctx.lineTo(bossX + 5, bossZ + 5);
    ctx.moveTo(bossX + 5, bossZ - 5);
    ctx.lineTo(bossX - 5, bossZ + 5);
    ctx.stroke();
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

// Funkce pro načtení modelu kouzelné hole
async function loadStaffModel() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      "Staff.glb",
      (gltf) => {
        staffModel = gltf.scene;

        // Přidání emisivního materiálu k hůlce
        staffModel.traverse((child) => {
          if (child.isMesh && child.name == "Staff_04_Circle011-Mesh_2") {
            child.material = new THREE.MeshStandardMaterial({
              emissive: 0xff4500, // Emisivní oranžová barva
              emissiveIntensity: 1.5, // Intenzita emisivní barvy
              metalness: 1,
              roughness: 0.5
            });

          }

        });

        staffModel.scale.set(0.1, 0.1, 0.1);
        resolve(staffModel);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading staff model:", error);
        reject(error);
      }
    );
  });
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

function rotateTeleports(deltaTime) {
  scene.children.forEach((child) => {
    if (child.userData.isTeleport) {
      child.rotation.y += 1 * deltaTime; // Pomalá rotace kolem osy Y
    }
  });
}

class Boss {
  constructor(position, id, rng) {
    this.id = id;
    this.maxHealth = Math.floor(rng() * 1500) + 1000; // Náhodné HP v rozmezí 1000 - 2500
    this.health = this.maxHealth;
    this.position = position;
    this.attackCooldown = rng() * 0.5 + 0.5; // Náhodný cooldown útoku v rozmezí 0.5 - 1 vteřina

      // Definování dostupných barev střel
      const colors = [
        new THREE.Color(0x0000ff), // Modrá
        new THREE.Color(0x00ff00), // Zelená
        new THREE.Color(0xffff00), // Žlutá
        new THREE.Color(0xff00ff)  // Růžová
      ];
  
      // Náhodně vybereme jednu barvu
      this.attackColor = colors[Math.floor(rng() * colors.length)];

    this.model = null;
    this.healthBar = null;
    this.healthBarContainer = null;
    this.mixer = null;
    this.idleAction = null;
    this.attackAction = null;
    this.clock = new THREE.Clock();
    this.lastAttackTime = 0;
    this.moveDirection = new THREE.Vector3();
    this.rng = rng; // Uložení rng pro pozdější použití
    this.loadModel();
    this.changeDirection();
    this.createHealthUI();
  }

  loadModel() {
    const loader = new GLTFLoader();
    loader.load('Dragon.glb', (gltf) => {
      this.model = gltf.scene;
      this.model.position.copy(this.position);
      this.model.scale.set(0.5, 0.5, 0.5);
      scene.add(this.model);

      this.animations = gltf.animations;
      this.mixer = new THREE.AnimationMixer(this.model);
      this.idleAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Flying_Idle'));
      this.attackAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Punch'));
      this.idleAction.play();

      this.createHealthBar();
    });
  }

  createHealthBar() {
    const healthBarContainerGeometry = new THREE.PlaneGeometry(2, 0.2);
    const healthBarContainerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.healthBarContainer = new THREE.Mesh(healthBarContainerGeometry, healthBarContainerMaterial);
    this.healthBarContainer.position.set(0, 3, 0);
    this.model.add(this.healthBarContainer);

    const healthBarGeometry = new THREE.PlaneGeometry(2, 0.2);
    const healthBarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.healthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
    this.healthBar.position.set(-1, 0, 0.01); // Posuneme healthbar do levého kraje kontejneru
    const healthRatio = this.health / this.maxHealth;
    this.healthBar.scale.x = healthRatio;
    this.healthBar.position.x = -1 + healthRatio;
    this.healthBarContainer.add(this.healthBar);
  }

  createHealthUI() {
    const bossHealthContainer = document.getElementById("bossHealthContainer");
    const bossHealthElement = document.createElement("div");
    bossHealthElement.id = `boss-${this.id}`;
    bossHealthElement.className = "boss-health";
    bossHealthElement.style.margin = "10px";
    bossHealthElement.style.color = "white";
    bossHealthElement.style.fontSize = "18px";
    bossHealthContainer.appendChild(bossHealthElement);

    this.updateHealthUI();
  }

  updateHealthUI() {
    const bossHealthElement = document.getElementById(`boss-${this.id}`);
    if (bossHealthElement) {
      bossHealthElement.textContent = `Boss ${this.id}: ${Math.max(this.health, 0)}/${this.maxHealth} HP`;
    }
  }

  updateHealthBar() {
    if (this.healthBar) {
      const healthRatio = this.health / this.maxHealth;
      this.healthBar.scale.x = healthRatio;
      this.healthBar.position.x = -1 + healthRatio;
    }

    this.updateHealthUI();
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
    this.updateHealthBar();
  }

 die() {
    if (this.model) {
      scene.remove(this.model); // Odstranění modelu bosse ze scény
    }

    // Přidání klíče na místo, kde boss zemřel
    const key = keyModel.clone();
    key.userData.isKey = true;
    key.position.copy(this.position);
    scene.add(key);

    // Odstranění bosse z pole bossů
    bosses = bosses.filter(b => b !== this);

    // Odstranění UI elementu z DOMu
    const bossHealthElement = document.getElementById(`boss-${this.id}`);
    if (bossHealthElement) {
      bossHealthElement.remove();
    }
  }

   attack() {
    const currentTime = performance.now();
    if (currentTime - this.lastAttackTime >= this.attackCooldown * 1000) {
      if (this.health < this.maxHealth / 2 && this.rng() < 0.3) {
        // 30% šance na speciální útok, pokud má boss méně než polovinu života
        this.specialAttack();
      } else {
        this.performStandardAttack();
      }
      this.lastAttackTime = currentTime;
    }
  }

  performStandardAttack() {
    if (this.attackAction) {
      this.attackAction.reset().play();
      this.attackAction.clampWhenFinished = true;
      this.attackAction.setLoop(THREE.LoopOnce);
    }
    const magicBall = this.createMagicBall(this.position, player.position);
    scene.add(magicBall);
    magicBalls.push(magicBall);
  }

  specialAttack() {

    // Příklad speciálního útoku: Boss vytvoří více magických koulí najednou
    for (let i = 0; i < 3; i++) {
      const offsetAngle = (i - 1) * Math.PI / 8; // Nastaví úhel pro rozptyl útoku
      const direction = new THREE.Vector3()
        .subVectors(player.position, this.position)
        .normalize()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), offsetAngle);

      const magicBall = this.createMagicBall(this.position, this.position.clone().add(direction));
      scene.add(magicBall);
      magicBalls.push(magicBall);
    }
  }

  createMagicBall(startPosition, targetPosition) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: this.attackColor });
    const magicBall = new THREE.Mesh(geometry, material);
    magicBall.position.copy(startPosition);
    magicBall.position.y += 1;

    const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();

    // Nastavení rychlosti na základě rng, v rozmezí 0.2 - 0.3
    const speed = 0.2 + this.rng() * 0.1;
    magicBall.velocity = direction.multiplyScalar(speed);

    return magicBall;
  }

  changeDirection() {
    const randomAngle = Math.random() * 2 * Math.PI;
    this.moveDirection.set(Math.cos(randomAngle), 0, Math.sin(randomAngle));
  }

  move(deltaTime) {
    if (this.moveDirection.length() === 0) {
      this.changeDirection();
    }

    const speed = 5.0; // Základní rychlost pohybu bosse
    const moveStep = this.moveDirection.clone().multiplyScalar(speed * deltaTime);
    const nextPosition = this.position.clone().add(moveStep);

    if (!this.checkCollision(nextPosition)) {
      this.position.add(moveStep);
      this.model.position.copy(this.position);
    } else {
      this.changeDirection();
    }
  }

  checkCollision(position) {
    for (let wall of walls) {
      const distance = position.distanceTo(wall.position);
      if (distance < CELL_SIZE / 2 + 0.8) {
        return true;
      }
    }
    return false;
  }

  update(deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }

    if (this.model) {
      this.model.lookAt(player.position);
    }

    if (canSeePlayer(this.position, player.position) && this.position.distanceTo(player.position) < 20) {
      this.attack();
    } else {
      this.move(deltaTime); // Předání deltaTime do funkce move
    }
  }
}




function spawnBossInMaze(maze,rng) {
  let freeCells = [];

  // Projdeme celé bludiště a najdeme volné buňky
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 0) {
        freeCells.push({ x: i, z: j });
      }
    }
  }

  if (freeCells.length > 0) {
    // Vybereme náhodnou volnou buňku
    let cell = freeCells[Math.floor(rng() * freeCells.length)];
    const bossPosition = new THREE.Vector3(
      (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
      0.5,
      (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
    );

    // Vytvoříme bosse a přidáme ho do scény
    const boss = new Boss(bossPosition, ++bossCounter, rng);
    bosses.push(boss);
    totalKeys++; // Aktualizace celkového počtu klíčů při přidání bosse
  } else {
    console.error("Nepodařilo se najít volnou buňku pro umístění bosse.");
  }
}


function updateBosses(deltaTime) {
  bosses.forEach(boss => boss.update(deltaTime));
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
function animateFire(deltaTime) {
  torches.forEach(({ fire }) => {
    const positions = fire.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01 * (deltaTime*50);
      positions[i + 1] += 0.01 * (deltaTime*50) + Math.random() * 0.02 * (deltaTime*50);
      positions[i + 2] += (Math.random() - 0.5) * 0.01 * (deltaTime*50);

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

// Funkce pro aktualizaci pozic a animace ohnivých koulí
function updateFireballs(deltaTime) {
  for (let i = fireBalls.length - 1; i >= 0; i--) {
    const fireball = fireBalls[i];
    fireball.position.add(fireball.velocity.clone().multiplyScalar(deltaTime * 40));

    // Animace částic v ohnivé kouli
    fireball.userData.animate();

    // Kolize s bossy
    for (let boss of bosses) {
      if (boss.model && fireball.position.distanceTo(boss.model.position) < 1) {

        // Vytvoření výbuchu při kolizi
        createExplosion(fireball.position);

        boss.takeDamage(100);
        scene.remove(fireball);
        fireBalls.splice(i, 1);
        break;
      }
    }

    // Detekce kolize s podlahou a stropem
    if (fireball.position.y <= 0 || fireball.position.y >= WALL_HEIGHT) {
      console.log("Collision detected with floor or ceiling at", fireball.position);

      // Vytvoření výbuchu při kolizi
      createExplosion(fireball.position);

      scene.remove(fireball);
      fireBalls.splice(i, 1);
      continue;
    }

    // Detekce kolize s zdmi
    for (let j = walls.length - 1; j >= 0; j--) {
      const wall = walls[j];
      if (fireball.position.distanceTo(wall.position) < CELL_SIZE / 2) {
        console.log("Collision detected with wall at", wall.position);

        // Vytvoření výbuchu při kolizi
        createExplosion(fireball.position);

        scene.remove(fireball);
        fireBalls.splice(i, 1);

        if (wall.userData.isBlockingWall) {
          console.log("Destroying blocking wall at", wall.position);
          scene.remove(wall);
          walls.splice(j, 1);
          // Aktualizujte matici bludiště
          const x = Math.round((wall.position.x / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          const z = Math.round((wall.position.z / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          maze[x][z] = 0;
        }

        break;
      }
    }

    // Odstraňte ohnivou kouli, pokud je příliš daleko
    if (fireball.position.distanceTo(player.position) > MAZE_SIZE * CELL_SIZE) {
      scene.remove(fireball);
      fireBalls.splice(i, 1);
    }
  }
}


let previousTime = performance.now(); // Definice a inicializace previousTime
function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - previousTime) / 1000; // Delta time v sekundách
  previousTime = currentTime;

  requestAnimationFrame(animate);
  updatePlayerPosition(deltaTime);
  checkObjectInteractions();
  animateKeys(deltaTime);
  animateGoal(deltaTime);
  rotateTeleports(deltaTime);
  animateFire(deltaTime);
  updateFireballs(deltaTime);
  updateBosses(deltaTime);
  updateMagicBalls(deltaTime);
  regenerateMana(deltaTime);
  regenerateHealth(deltaTime)

  // Animace létajících objektů
  floatingObjects.forEach(obj => {
    obj.rotation.x += obj.userData.rotationSpeed.x * (deltaTime*30);
    obj.rotation.y += obj.userData.rotationSpeed.y * (deltaTime*50);
    obj.rotation.z += obj.userData.rotationSpeed.z * (deltaTime*30);

    obj.position.y += obj.userData.floatSpeed * (deltaTime*30);

    // Pokud objekt vyletí příliš vysoko nebo nízko, obrátíme směr
    if (obj.position.y > MAZE_SIZE * CELL_SIZE || obj.position.y < 0) {
      obj.userData.floatSpeed *= -1;
    }
  });

  // Animace všech částicových efektů ve scéně
  scene.children.forEach(child => {
    if (child.userData.animate) {
      child.userData.animate(deltaTime*30);
    }
  });

  if (nebulaMaterial) {
    nebulaMaterial.material.uniforms.time.value += deltaTime*1;
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



function toggleConsole() {
  const consoleElement = document.getElementById("gameConsole");
  isConsoleOpen = !isConsoleOpen;

  if (isConsoleOpen) {
    consoleInput = '';
    debugger;
    consoleElement.value = "";
    consoleElement.style.display = "block";
    consoleElement.focus();
  } else {
    consoleElement.style.display = "none";
    consoleInput = ''; // Resetujeme vstup
    consoleElement.value = "";
  }
}

document.addEventListener('keydown', (event) => {
  debugger;
  if (event.key === ';') {
    toggleConsole();
  } else if (isConsoleOpen) {
    if (event.key === 'Enter') {
      processConsoleCommand(consoleInput);
      toggleConsole();
    } else if (event.key === 'Backspace') {
      consoleInput = consoleInput.slice(0, -1);
    } else {
      consoleInput += event.key;
    }

   
  }
});

document.getElementById("generateMaze").addEventListener("click", startGame);

init();
