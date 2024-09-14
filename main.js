import * as THREE from "three";
import seedrandom from "seedrandom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createClient } from "@supabase/supabase-js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AudioLoader } from 'three';
import { setBossCounter, setBosses, spawnBossInMaze, bosses } from './boss.js';
import { spells, updateFireballs, updateFrostbolts, updateArcaneMissiles, lastSpellCastTime, updateChainLightnings, updateSpellUpgrades } from './spells.js';
import {
  createPlayer,
  updatePlayerPosition,
  updatePlayerHealthBar,
  updatePlayerManaBar,
  regenerateMana,
  regenerateHealth,
  setPlayerHealth,
  setPlayerMana,
  maxMana,
  playerHealth,
  player, moveBackward, moveForward, moveLeft, moveRight, onMouseClick, onMouseMove, onKeyDown, onKeyUp,
  initPlayerUI,
  loadPlayerProgress,
  addExperience,
  playerLevel,
} from './player.js';
import { initSkillTree, isSpellUnlocked, skillTree } from "./skillTree.js";

export const version = "1.1.6";

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
    torchColor: { light: 0xffa500, particles: 0xff4500 } // Original orange color
  },
  {
    wallTexture: "wall-egypt.jpg",
    ceilingTexture: "wall-egypt.jpg",
    specialTextures: [
      "wall-egypt-sign-1.jpg",
      "wall-egypt-sign-2.jpg",
      "wall-egypt-sign-3.jpg",
    ],
    torchColor: { light: 0x00bfff, particles: 0x1e90ff } // Magical blue
  },
  {
    wallTexture: "wall-jungle.jpg",
    ceilingTexture: "wall-jungle.jpg",
    specialTextures: [
      "wall-jungle-sign-1.jpg",
      "wall-jungle-sign-2.jpg",
      "wall-jungle-sign-3.jpg",
    ],
    torchColor: { light: 0x00ff7f, particles: 0x2ecc71 } // Emerald green
  },
  {
    wallTexture: "wall-mythical.jpg",
    ceilingTexture: "wall-mythical.jpg",
    specialTextures: [
      "wall-mythical-sign-1.jpg",
      "wall-mythical-sign-2.jpg",
      "wall-mythical-sign-3.jpg",
    ],
    torchColor: { light: 0xa35ee8, particles: 0xa35ee8 } // Amethyst purple
  },
  {
    wallTexture: "wall-obsidian.jpg",
    ceilingTexture: "wall-obsidian.jpg",
    specialTextures: [
      "wall-obsidian-sign-1.jpg",
      "wall-obsidian-sign-2.jpg",
      "wall-obsidian-sign-3.jpg",
    ],
    torchColor: { light: 0x9896ff, particles: 0x9896ff }
  },
  {
    wallTexture: "wall-obsidian.jpg",
    ceilingTexture: "wall-obsidian.jpg",
    specialTextures: [
      "wall-obsidian-sign-1.jpg",
      "wall-obsidian-sign-2.jpg",
      "wall-obsidian-sign-3.jpg",
    ],
    torchColor: { light: 0xfdff6b, particles: 0xfdff6b }
  },
  {
    wallTexture: "wall-abyss.jpg",
    ceilingTexture: "wall-abyss.jpg",
    specialTextures: [
      "wall-abyss.jpg",
      "wall-abyss.jpg",
      "wall-abyss.jpg",
    ],
    torchColor: { light: 0x69ffb9, particles: 0x69ffb9 }
  },
  {
    wallTexture: "wall-abyss.jpg",
    ceilingTexture: "wall-abyss.jpg",
    specialTextures: [
      "wall-abyss.jpg",
      "wall-abyss.jpg",
      "wall-abyss.jpg",
    ],
    torchColor: { light: 0xd6fffc, particles: 0xd6fffc }
  },
];

export let scene, camera, renderer, maze
let startTime, timerInterval;
let moveCount = 0,
  keyCount = 0;
export var MAZE_SIZE = 20;
export var totalKeys = 3; // Přidání deklarace proměnné totalKeys
export const WALL_HEIGHT = 3.1;
export const CELL_SIZE = 2.5;
export const OBJECT_HEIGHT = 1.6;
export var walls = [];
export var highWallAreas = [];


let lastTeleportTime = 0;
const teleportCooldown = 1000;
export var nearTeleport = null;

const torches = [];
// Globální proměnné
let composer, lightManager;
let MAX_VISIBLE_LIGHTS = 10; // Default value
let qualityFactor = 1;

export var keyModel;
let treasureModel;
// Přidejte globální proměnné
const BLOCKING_WALL = 2;
export var staffModel;
export let magicBalls = [];

let isConsoleOpen = false;
let consoleInput = '';
export let canWalkThroughWalls = false;
export let isFlying = false;

let currentStaffColor = new THREE.Color(0xff4500);
let targetStaffColor = new THREE.Color(0xff4500);
let colorTransitionSpeed = 5; // Rychlost přechodu barev


let isMinimapVisible = false;
let minimapTimeMultiplier = 1;
let cumulativeTime = 0;
let lastUpdateTime;
let canOpenMinimap = true;
let minimapCooldownTimer = null;

let teleportPairsCount = 0;


let nebula, nebulaMaterial;

export var fireballSoundBuffer;
export var frostBoltSoundBuffer;
export var magicMissileSoundBuffer;
export var frostBoltHitSoundBuffer;
export var teleportSoundBuffer;
export var killConfirmationSoundBuffer;
export var chainLightningSoundBuffer;
export var magicArrowSoundBuffer;

export var bossSoundBuffer;
export var backgroundMusic;
let isMusicPlaying = true;
let footstepsSound;

const showFloorSelectBtn = document.getElementById('showFloorSelect');
const floorSelectModal = document.getElementById('floorSelectModal');
const floorOptions = document.querySelectorAll('.floor-option');
let selectedFloor = 1;


const audioLoader = new AudioLoader();


export function setTotalKeys(value) {
  totalKeys = value;
}

// Přidejte tuto funkci do init() nebo tam, kde načítáte ostatní nastavení
function loadSettings() {
  MAX_VISIBLE_LIGHTS = parseInt(localStorage.getItem('maxVisibleLights')) || 10;
  qualityFactor = parseFloat(localStorage.getItem('qualityFactor')) || 1;
  setQuality(qualityFactor);
}

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
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // Načtení nastavení z local storage
    loadSettings();
  document.body.appendChild(renderer.domElement);

  // Check for seed in URL
  const seedFromUrl = getUrlParameter('seed');
  if (seedFromUrl) {
    document.getElementById("mazeInput").value = seedFromUrl;
  }

  audioLoader.load('footstep.mp3', function (buffer) {
    footstepsSound = new THREE.Audio(new THREE.AudioListener());
    footstepsSound.setBuffer(buffer);
    footstepsSound.setLoop(true);
    footstepsSound.setVolume(0.5); // Upravte hlasitost podle potřeby
  });

  audioLoader.load('audio_bg.mp3', function (buffer) {
    backgroundMusic = new THREE.Audio(new THREE.AudioListener());
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true);
    backgroundMusic.setVolume(0.25); // Nastavte hlasitost podle potřeby
    backgroundMusic.play();
  });



  audioLoader.load('snd_fireball.wav', function (buffer) {
    fireballSoundBuffer = buffer;
  });
  audioLoader.load('snd_frostbolt.wav', function (buffer) {
    frostBoltSoundBuffer = buffer;
  });
  audioLoader.load('snd_frostbolt_hit.wav', function (buffer) {
    frostBoltHitSoundBuffer = buffer;
  });
  audioLoader.load('snd_magicmissile.wav', function (buffer) {
    magicMissileSoundBuffer = buffer;
  });

  audioLoader.load('snd_teleport.mp3', function (buffer) {
    teleportSoundBuffer = buffer;
  });

  audioLoader.load('snd_kill_confirm.mp3', function (buffer) {
    killConfirmationSoundBuffer = buffer;
  });

  audioLoader.load('snd_boss_attack.wav', function (buffer) {
    bossSoundBuffer = buffer;
  });

  audioLoader.load('snd_magic_arrow.wav', function (buffer) {
    magicArrowSoundBuffer = buffer;
  });


  audioLoader.load('snd_chain_lightning.mp3', function (buffer) {
    chainLightningSoundBuffer = buffer;
  });

  loadPlayerProgress();
  const floorParam = getUrlParameter('floor');
  if (floorParam) {
    let selectedFloorInt = parseInt(floorParam);
    if (canSelectFloor(selectedFloorInt)) {
      selectedFloor = selectedFloorInt;
    }
    else {
      selectedFloor = 1; 
      setUrlParameter('floor', selectedFloor);
    }
  }




  try {
    await loadKeyModel();
    await loadTreasureModel();
    await loadStaffModel();

    // Use the seed from URL or input to create the maze
    const _inputText = document.getElementById("mazeInput").value;
    await getBestTime(_inputText);
    createMaze(_inputText, selectedFloor);
    createPlayer();
    createSkillbar()
    initSkillTree();
    attachStaffToCamera();
    startTimer();
    const crosshair = createCrosshair();
    camera.add(crosshair);


    initPlayerUI();
    showFloorSelectBtn.textContent = `Podlaží ${selectedFloor}`;
    updateFloorOptions()
    updateSpellUpgrades(skillTree);

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
      const activeElement = document.activeElement;
      const isInput =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA";
      if (event.key === "c" || event.key === "C") {


        if (!isInput) {
          if (document.getElementById("scoreModal").style.display === "block") {
            hideScoreModal();
          } else {
            showScoreModal();
            displayScores(null);
          }
        }
      }
      else if (event.key === "i" || event.key === "I") {
        if (!isInput) {
          if (document.getElementById("hintModal").style.display === "block") {
            hideHintModal();
          } else {
            showHintModal();
          }
        }
      }
      else if (event.key === 'p' || event.key === 'P') {
        if (!isInput) {
          showFPS = !showFPS;
          fpsCounter.style.display = showFPS ? 'block' : 'none';
        }
      }
      else if (event.key === "o" || event.key === "O") {
        if (!isInput) {
          showSettingsModal();
        }
      }
      else if (event.key === "b" || event.key === "B") {
        if (!isInput) {
          toggleBackgroundMusic();
        }
      }

    });

    document.querySelector("#hintModal .close").addEventListener("click", hideHintModal)

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

    const inputText = document.getElementById("mazeInput").value;
    getBestTime(inputText);
    initFPSCounter();

    animate();


  } catch (error) {
    console.error("Failed to load key model:", error);
  }
}

function processConsoleCommand(command) {
  switch (command.toLowerCase()) {
    case 'ghost.cmd':
      enableGhostMode();
      break;
    case 'walk.cmd':
      disableGhostMode();
      break;
    case 'fly.cmd':
      toggleFlyMode();
      break;
    case 'exp.cmd':
      addExperience(4000);
      break;
    case 'exp2.cmd':
      addExperience(40000);
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

function toggleFlyMode() {
  isFlying = !isFlying;
  canWalkThroughWalls = isFlying; // Povolit procházení zdmi, pokud je aktivní letový režim
  if (isFlying) {
    console.log("Fly mode activated!");
    scene.fog = null;

  } else {
    console.log("Fly mode deactivated!");
    scene.fog = new THREE.FogExp2(0x000000, 0.05);
  }
}


function attachStaffToCamera() {
  if (staffModel) {
    staffModel.position.set(0.3, -0.2, -0.5);
    staffModel.rotation.set(0, Math.PI / 2, 0);
    staffModel.traverse((child) => {
      if (child.isMesh && child.name == "Staff_04_Circle011-Mesh_2") {
        child.material = new THREE.MeshStandardMaterial({
          emissive: currentStaffColor,
          emissiveIntensity: 2,
          metalness: 1,
          roughness: 0.5
        });
      }
    });
    camera.add(staffModel);
  }
}

function onMouseDown(event) {
  if (player.isFrozen) return; // Přidáme tuto kontrolu

  if (event.button === 0) {
    const fireballSpell = spells.find(spell => spell.name === 'Fireball');
    if (fireballSpell && fireballSpell.isReady()) {
      let fired = fireballSpell.cast();
      if (fired) {
        fireballSpell.lastCastTime = Date.now();
      }
    }
  } else if (event.button === 2) {
    const arcaneMissileSpell = spells.find(spell => spell.name === 'Arcane Missile');
    if (arcaneMissileSpell && arcaneMissileSpell.isReady()) {
      let fired = arcaneMissileSpell.cast();
      if (fired) {
        arcaneMissileSpell.lastCastTime = Date.now();
      }
    }
  }
}

function toggleBackgroundMusic() {
  if (backgroundMusic) {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      document.getElementById("toggleMusicText").style.color = "red";
    } else {
      backgroundMusic.play();
      document.getElementById("toggleMusicText").style.color = "white";
    }
    isMusicPlaying = !isMusicPlaying;
  }
}



let freezeEndTime = 0;

function freezePlayer() {
  const currentTime = Date.now();
  const freezeDuration = 2000; // 2 sekundy

  // Aktualizujeme čas konce zmrazení
  freezeEndTime = Math.max(freezeEndTime, currentTime + freezeDuration);

  player.isFrozen = true;

  // Vytvoření nebo aktualizace ledového efektu
  if (!player.iceEffect) {
    const iceGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const iceMaterial = new THREE.MeshPhongMaterial({
      color: 0xADD8E6,
      transparent: true,
      opacity: 0.4,
      shininess: 100,
      side: THREE.DoubleSide
    });
    player.iceEffect = new THREE.Mesh(iceGeometry, iceMaterial);
    player.iceEffect.position.set(0, 0, -0.5);
    camera.add(player.iceEffect);
  }

  // Přidání zvukového efektu zmrazení
  if (frostBoltHitSoundBuffer) {
    const sound = new THREE.Audio(new THREE.AudioListener());
    sound.setVolume(0.7);
    sound.setBuffer(frostBoltHitSoundBuffer);
    sound.play();
    sound.onEnded = () => {
      sound.disconnect();
    };
  }
}

function removeFreezeEffect() {
  if (player.iceEffect) {
    camera.remove(player.iceEffect);
    player.iceEffect.geometry.dispose();
    player.iceEffect.material.dispose();
    player.iceEffect = null;

  }
  // Odstraňte vizuální efekt zamrznutí z ikon kouzel
  document.querySelectorAll('.spell-icon').forEach(icon => {
    icon.classList.remove('frozen');
  });
  player.isFrozen = false;
  freezeEndTime = 0;
}

function updateFreezeEffect() {
  const currentTime = Date.now();

  if (currentTime < freezeEndTime) {
    player.isFrozen = true;
    if (player.iceEffect) {
      player.iceEffect.visible = true;
    }
    // Přidejte vizuální efekt zamrznutí na ikony kouzel
    document.querySelectorAll('.spell-icon').forEach(icon => {
      icon.classList.add('frozen');
    });
  } else {
    player.isFrozen = false;
    if (player.iceEffect) {
      player.iceEffect.visible = false;
    }
    // Odstraňte vizuální efekt zamrznutí z ikon kouzel
    document.querySelectorAll('.spell-icon').forEach(icon => {
      icon.classList.remove('frozen');
    });
  }
}

function updateMagicBalls(deltaTime) {
  for (let i = magicBalls.length - 1; i >= 0; i--) {
    const magicBall = magicBalls[i];
    magicBall.position.add(magicBall.velocity.clone().multiplyScalar(deltaTime * 40));

    var player_position_for_collision = { ...player.position };
    player_position_for_collision.y = 1;
    if (magicBall.position.distanceTo(player_position_for_collision) < 0.5) {
      if (magicBall.isFrostbolt) {
        freezePlayer();
      } else {
        setPlayerHealth(playerHealth - 20);
        updatePlayerHealthBar();
        if (playerHealth <= 0) {
          playerDeath();
        }
      }
      createExplosion(magicBall.position, magicBall.material.color.getHex());
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


function updateFootstepsSound() {
  if (moveForward || moveBackward || moveLeft || moveRight) {
    if (!footstepsSound.isPlaying) {
      footstepsSound.play();
    }
  } else {
    if (footstepsSound.isPlaying) {
      footstepsSound.stop();
    }
  }
}

export function playerDeath() {
  // Restart hry
  startGame();
}





export function createCastEffect(position, color = 0xffa500) {
  const castEffectGroup = new THREE.Group();

  const particleCount = 30;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: color,
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

  castEffectGroup.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  setTimeout(() => {
    scene.remove(castEffectGroup);
  }, 500);

  return castEffectGroup;
}

export function createExplosion(position, color = 0xff8f45) {
  const explosionGroup = new THREE.Group();

  const particleCount = 100;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexColors: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

    velocities[i * 3] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

    const particleColor = new THREE.Color(color);
    colors[i * 3] = particleColor.r;
    colors[i * 3 + 1] = particleColor.g;
    colors[i * 3 + 2] = particleColor.b;

    sizes[i] = Math.random() * 0.2 + 0.05;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  particles.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particles.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  explosionGroup.position.copy(position);
  scene.add(explosionGroup);

  explosionGroup.add(particles);

  const startTime = performance.now();
  const duration = 1000; // Doba trvání exploze v milisekundách

  function animateExplosion() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;
    const colors = particles.geometry.attributes.color.array;
    const sizes = particles.geometry.attributes.size.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      colors[i * 3 + 3] = 1 - progress; // Plynulé mizení
      sizes[i] *= 0.99; // Postupné zmenšování částic
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;

    if (progress < 1) {
      requestAnimationFrame(animateExplosion);
    } else {
      scene.remove(explosionGroup);
    }
  }

  animateExplosion();

  return explosionGroup;
}



function createMaze(inputText = "", selectedFloor = 1) {
  const bossHealthContainer = document.getElementById("bossHealthContainer");
  while (bossHealthContainer.firstChild) {
    bossHealthContainer.removeChild(bossHealthContainer.firstChild);
  }

  setBosses([]);
  setBossCounter(0);

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

  // Upravíme výběr textureSets podle podlaží
  let availableTextureSets;
  switch (selectedFloor) {
    case 1:
      availableTextureSets = textureSets.slice(0, 2);
      break;
    case 2:
      availableTextureSets = textureSets.slice(2, 4);
      break;
    case 3:
      availableTextureSets = textureSets.slice(4, 6);
      break;
    case 4:
      availableTextureSets = textureSets.slice(6, 8);
      break;
  }
  const textureSetIndex = Math.floor(rng() * availableTextureSets.length);
  const selectedTextureSet = availableTextureSets[textureSetIndex];


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

  let minSize, maxSize;
  switch (selectedFloor) {
    case 1:
      minSize = 20;
      maxSize = 25;
      break;
    case 2:
      minSize = 25;
      maxSize = 35;
      break;
    case 3:
      minSize = 30;
      maxSize = 50;
      break;
    case 4:
      minSize = 20;
      maxSize = 30;
      break;
  }
  MAZE_SIZE = Math.floor(rng() * (maxSize - minSize + 1)) + minSize;
  totalKeys = Math.max(3, Math.min(10, 3 + Math.floor(rng() * 8)));

  teleportPairsCount = Math.max(1, Math.min(3, 1 + Math.floor(rng() * 3)));

  const floorGeometry = new THREE.PlaneGeometry(MAZE_SIZE * CELL_SIZE, MAZE_SIZE * CELL_SIZE);
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

  maze = generateMaze(MAZE_SIZE, MAZE_SIZE, seed, selectedFloor);


  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

  const ceilingGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: ceilingTexture,
  });
  const ceilingMaterialHigh = new THREE.MeshStandardMaterial({
    map: ceilingTexture,
    color: 0x918B88,
  });


  // Determine high wall areas
  highWallAreas = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(false));
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 0 && rng() < 0.1) {
        highWallAreas[i][j] = true;
        // Zajistíme, že okolní buňky budou také vysoké
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (i + di >= 0 && i + di < MAZE_SIZE && j + dj >= 0 && j + dj < MAZE_SIZE) {
              highWallAreas[i + di][j + dj] = true;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      const isHighWallArea = highWallAreas[i][j];
      const wallHeight = isHighWallArea ? WALL_HEIGHT * 2 : WALL_HEIGHT;

      if (maze[i][j] === 1) {
        // Základní zeď
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(
          (i - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
          WALL_HEIGHT / 2,
          (j - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );
        scene.add(wall);
        walls.push(wall);

        // Přidáme druhou zeď pro vysoké oblasti
        if (isHighWallArea) {
          const upperWall = new THREE.Mesh(wallGeometry, wallMaterial);
          upperWall.position.set(
            (i - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
            WALL_HEIGHT * 1.5,
            (j - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
          );
          scene.add(upperWall);
          walls.push(upperWall);
        }
      }

      // Strop pro každou buňku
      const ceiling = new THREE.Mesh(ceilingGeometry, (isHighWallArea) ? ceilingMaterialHigh : ceilingMaterial);
      ceiling.position.set(
        (i - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
        wallHeight + WALL_HEIGHT / 2,
        (j - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
      );
      scene.add(ceiling);
    }
  }

  // Add special walls
  addSpecialWalls(rng, specialTextures);

  // Add blocking walls
  const blockingWallCount = Math.floor(MAZE_SIZE * MAZE_SIZE * 0.02);
  for (let i = 0; i < blockingWallCount; i++) {
    let x, z;
    do {
      x = Math.floor(rng() * MAZE_SIZE);
      z = Math.floor(rng() * MAZE_SIZE);
    } while (maze[x][z] !== 0);
    maze[x][z] = BLOCKING_WALL;
  }

  // Create blocking walls
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
  createTorches(walls, maze, CELL_SIZE, MAZE_SIZE, selectedTextureSet.torchColor);

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


  if (isMinimapVisible) {
    toggleMinimap();
  }

  // Resetování zdraví hráče při vytvoření nového bludiště
  setPlayerHealth(100);
  setPlayerMana(maxMana);
  updatePlayerHealthBar();
  updatePlayerManaBar();

  console.log("Maze created");
  console.log("lights " + lightManager.lights.length);
  console.log("bosses " + bosses.length);
}


export function getHash(str) {
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

function generateMaze(width, height, seed, selectedFloor) {
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
   const baseHallProbability = 0.02;
   const hallProbabilityDecrease = -0.001;
   let hallProbability = baseHallProbability + (selectedFloor - 1) * hallProbabilityDecrease;
   
   // Zvýšíme pravděpodobnost hal pro 4. podlaží
   if (selectedFloor === 4) {
     hallProbability *= 3;
   }
  // Upravíme velikost haly podle podlaží
  let minHallSize, maxHallSize;
  minHallSize = 2;

  if (selectedFloor === 1) {
    maxHallSize = 3;
  } else if (selectedFloor === 2) {
    maxHallSize = 4;
  } else {
    maxHallSize = 5;
  }
  const hallSize = minHallSize + Math.floor(rng() * (maxHallSize - minHallSize + 1));
  var bossProbability = 0.8; // 80% šance na spawnutí bosse v hale
  if (selectedFloor === 4) {
    bossProbability = 1.0;
  }

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
          spawnBossInMaze(maze, rng, selectedFloor);
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







function checkCollisionsWhenTeleport() {
  if (canWalkThroughWalls) {
    return false; // Pokud je aktivní Ghost mode, ignorujeme kolize
  }

  const playerRadius = 0.4;
  const wallMargin = 0.3;
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



let lastTeleport = null;

let keysAlertShown = false; // Přidáme proměnnou pro kontrolu zobrazení alertu

export function checkObjectInteractions() {
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
          startGame();
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

function createCrosshair() {
  const crosshairSize = 0.01;
  const crosshairColor = 0xffffff;

  const material = new THREE.LineBasicMaterial({ color: crosshairColor });

  const points = [];
  points.push(new THREE.Vector3(-crosshairSize, 0, 0));
  points.push(new THREE.Vector3(crosshairSize, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, -crosshairSize, 0));
  points.push(new THREE.Vector3(0, crosshairSize, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const crosshair = new THREE.Line(geometry, material);

  crosshair.position.set(0, 0, -0.5);
  return crosshair;
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

export function teleportPlayer(teleport) {
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

      while (checkCollisionsWhenTeleport()) {
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

  // Kontrola, zda má hráč dostatečnou úroveň pro zvolené podlaží
  if (!canSelectFloor(selectedFloor)) {
    alert("Nemáte dostatečnou úroveň pro toto podlaží!");
    return;
  }

  getBestTime(inputText, selectedFloor);
  removeFreezeEffect();
  createMaze(inputText, selectedFloor);
  createPlayer();
  moveCount = 0;
  keyCount = 0;

  // Reset času
  cumulativeTime = 0;
  document.getElementById("timeCount").textContent = "0:00";


  // Zastavíme předchozí časovač, pokud běží
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  isMinimapVisible = false;
  canOpenMinimap = true;
  if (minimapCooldownTimer) {
    clearTimeout(minimapCooldownTimer);
  }
  document.getElementById("showMinimapText").classList.remove("disabled");
  document.getElementById("minimap").style.display = "none";
  updatePlayerHealthBar();

  startTimer(); // Spuštění nového časovače
}

async function getBestTime(levelName) {
  try {
    const { data, error } = await supabase
      .from("maze_score")
      .select("time_score")
      .eq("playername", playerName)
      .eq("levelname", levelName)
      .eq("floor", selectedFloor)
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
  lastUpdateTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000 / 60);
}

async function stopTimer() {
  clearInterval(timerInterval);
  const elapsedTime = Math.floor(cumulativeTime / 1000);

  // Kontrola, zda je to první dokončení tohoto bludiště
  if (bestTime === Infinity) {
    addExperienceForCompletion(selectedFloor);
  }

  if (elapsedTime < bestTime) {
    bestTime = elapsedTime;
    submitScore(document.getElementById("mazeInput").value, bestTime);
  }


}


function updateTimer() {
  const now = Date.now();
  const deltaTime = now - lastUpdateTime;
  cumulativeTime += deltaTime * minimapTimeMultiplier;
  lastUpdateTime = now;

  const totalSeconds = Math.floor(cumulativeTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  document.getElementById("timeCount").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

// Přidejte novou funkci pro přepínání minimapy
export function toggleMinimap() {
  if (!canOpenMinimap && !isMinimapVisible) return;

  isMinimapVisible = !isMinimapVisible;
  const minimap = document.getElementById("minimap");
  const timeCount = document.getElementById("timeCount");
  const showMinimapText = document.getElementById("showMinimapText");

  minimap.style.display = isMinimapVisible ? "block" : "none";
  timeCount.classList.toggle("minimap-open", isMinimapVisible);
  minimapTimeMultiplier = isMinimapVisible ? 3 : 1;

  if (!isMinimapVisible) {
    canOpenMinimap = false;
    showMinimapText.classList.add("disabled");
    minimapCooldownTimer = setTimeout(() => {
      canOpenMinimap = true;
      showMinimapText.classList.remove("disabled");
    }, 3000);
  }

  lastUpdateTime = Date.now();
  if (isMinimapVisible) {
    drawMinimap();
  }
}
function drawMinimap() {
  const minimap = document.getElementById("minimap");
  const ctx = minimap.getContext("2d");
  const scale = minimap.width / (MAZE_SIZE * CELL_SIZE);

  // Vymazání canvasu
  ctx.clearRect(0, 0, minimap.width, minimap.height);

  // Vykreslení pozadí
  ctx.fillStyle = "#55535e";
  ctx.fillRect(0, 0, minimap.width, minimap.height);

  // Vykreslení zdí
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === 1) {
        ctx.fillStyle = "#282633";
        ctx.fillRect(
          i * CELL_SIZE * scale,
          j * CELL_SIZE * scale,
          CELL_SIZE * scale,
          CELL_SIZE * scale
        );
      } else if (maze[i][j] === BLOCKING_WALL) {
        ctx.fillStyle = "#cc7e54";
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
      ctx.fillStyle = "#fffc4d";
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
      ctx.fillStyle = "#5fd0f5";
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
  ctx.fillStyle = "#9ec0ff";
  const playerX = (player.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerZ = (player.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerAngle = -player.rotation.y - Math.PI / 2; // Úprava úhlu rotace
  drawArrow(ctx, playerX, playerZ, playerAngle, CELL_SIZE * scale);
}

export function changeStaffColor(color) {
  targetStaffColor.setHex(color);
}

function updateStaffColor(deltaTime) {
  currentStaffColor.lerp(targetStaffColor, colorTransitionSpeed * deltaTime);
  if (staffModel) {
    staffModel.traverse((child) => {
      if (child.isMesh && child.name == "Staff_04_Circle011-Mesh_2") {
        child.material.emissive.copy(currentStaffColor);
      }
    });
  }
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
              color: currentStaffColor,
              emissive: currentStaffColor, // Emisivní oranžová barva
              emissiveIntensity: 1.5, // Intenzita emisivní barvy
              metalness: 0.5,
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





function createSkillbar() {
  const skillbar = document.getElementById('skillbar');
  spells.forEach(spell => {
    const spellElement = document.createElement('div');
    spellElement.className = 'spell-icon';
    spellElement.style.backgroundImage = `url(${spell.icon})`;
    spellElement.style.backgroundSize = 'cover';
    spellElement.innerHTML = `
      <div class="spell-key">${spell.key}</div>
      <div class="spell-cooldown" style="display: none;"></div>
    `;
    skillbar.appendChild(spellElement);
  });
}

export function updateSkillbar() {
  spells.forEach((spell, index) => {

    if (spell.name === 'Chain Lightning' && !isSpellUnlocked('chainLightning')) {
      const spellElement = document.querySelectorAll('.spell-icon')[index];
      spellElement.style.display = 'none';
    }
    else if (isSpellUnlocked('chainLightning')) {
      const spellElement = document.querySelectorAll('.spell-icon')[index];
      spellElement.style.display = 'block';
    }

    const spellElement = document.querySelectorAll('.spell-icon')[index];
    const cooldownElement = spellElement.querySelector('.spell-cooldown');
    if (!spell.isReady()) {
      const remainingCooldown = Math.ceil((spell.cooldown - (Date.now() - spell.lastCastTime)) / 1000);
      cooldownElement.textContent = remainingCooldown;
      cooldownElement.style.display = 'flex';
    } else {
      cooldownElement.style.display = 'none';
    }
  });
}

function resetStaffColor() {
  if (Date.now() - lastSpellCastTime > 500) {
    changeStaffColor(0xff4500); // Obnovení výchozí oranžové barvy
  }
}









function checkWallCollision(projectile) {
  for (let wall of walls) {
    if (projectile.position.distanceTo(wall.position) < CELL_SIZE / 2) {
      return true;
    }
  }
  return false;
}


function convertColorToCSS(hexColor) {
  // Převedeme číslo na řetězec a odstraníme prefix "0x" nebo "0X"
  let hexString = hexColor.toString(16).slice(2);

  // Zajistíme, že řetězec má 6 znaků (doplníme nulami zleva, pokud je potřeba)
  while (hexString.length < 6) {
    hexString = '0' + hexString;
  }

  // Přidáme na začátek znak #
  return `#${hexString}`;
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
    this.tolerance = tolerance;
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


function createTorches(walls, maze, CELL_SIZE, MAZE_SIZE, torchColor) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

  const rng = new seedrandom(getHash(document.getElementById("mazeInput").value));

  const selectedColor = torchColor;

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
                (WALL_HEIGHT / 2) - 0.2,
                (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dz * CELL_SIZE * 0.5
              );

              // Natočíme pochodeň směrem ke zdi
              torch.rotateZ(Math.PI / 1);

              scene.add(torch);

              const fire = createFireParticles(selectedColor.particles);
              fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
              scene.add(fire);

              const light = new THREE.PointLight(selectedColor.light, 1.5, CELL_SIZE * 4);
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
function createFireParticles(color) {
  const particleCount = 12;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const isDefaultColor = color === 0xff4500;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = Math.random() * 0.3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

    if (isDefaultColor) {
      colors[i * 3] = 1.5;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 2] = 0;
    } else {
      const particleColor = new THREE.Color(color);
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;
    }

    sizes[i] = 0.1 + Math.random() * 0.1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.1,
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
      positions[i] += (Math.random() - 0.5) * 0.01 * (deltaTime * 50);
      positions[i + 1] += 0.01 * (deltaTime * 50) + Math.random() * 0.02 * (deltaTime * 50);
      positions[i + 2] += (Math.random() - 0.5) * 0.01 * (deltaTime * 50);

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

export function isHighWallArea(x, z) {
  if (highWallAreas.length === 0) {
    return false;
  }
  const mazeX = Math.floor((x / CELL_SIZE) + (MAZE_SIZE / 2));
  const mazeZ = Math.floor((z / CELL_SIZE) + (MAZE_SIZE / 2));

  // Přidáme kontrolu platnosti indexů
  if (mazeX < 0 || mazeX >= MAZE_SIZE || mazeZ < 0 || mazeZ >= MAZE_SIZE) {
    return false;
  }

  return highWallAreas[mazeX][mazeZ];
}


// Přidejte tuto funkci
function updateVisibleObjects() {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(matrix);

  const visibilityDistance = 40; // Maximální vzdálenost viditelnosti

  // Aktualizace viditelnosti zdí
  walls.forEach(wall => {
    if (frustum.intersectsObject(wall) && wall.position.distanceTo(player.position) < visibilityDistance) {
      wall.visible = true;
    } else {
      wall.visible = false;
    }
  });

}


let previousTime = performance.now(); // Definice a inicializace previousTime
function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - previousTime) / 1000; // Delta time v sekundách
  previousTime = currentTime;

  requestAnimationFrame(animate);
  updateFreezeEffect();
  updatePlayerPosition(deltaTime);
  checkObjectInteractions();
  animateKeys(deltaTime);
  animateGoal(deltaTime);
  rotateTeleports(deltaTime);
  animateFire(deltaTime);
  updateFireballs(deltaTime);
  updateFrostbolts(deltaTime);
  updateArcaneMissiles(deltaTime);
  updateChainLightnings(deltaTime);
  updateBosses(deltaTime);
  updateMagicBalls(deltaTime);
  regenerateMana(deltaTime);
  regenerateHealth(deltaTime)


  if (isMinimapVisible) {
    drawMinimap();
  }

  updateSkillbar();
  updateFootstepsSound();

  resetStaffColor();
  updateStaffColor(deltaTime);

  // Animace létajících objektů
  floatingObjects.forEach(obj => {
    obj.rotation.x += obj.userData.rotationSpeed.x * (deltaTime * 30);
    obj.rotation.y += obj.userData.rotationSpeed.y * (deltaTime * 50);
    obj.rotation.z += obj.userData.rotationSpeed.z * (deltaTime * 30);

    obj.position.y += obj.userData.floatSpeed * (deltaTime * 30);

    // Pokud objekt vyletí příliš vysoko nebo nízko, obrátíme směr
    if (obj.position.y > MAZE_SIZE * CELL_SIZE || obj.position.y < 0) {
      obj.userData.floatSpeed *= -1;
    }
  });

  // Animace všech částicových efektů ve scéně
  scene.children.forEach(child => {
    if (child.userData.animate) {
      child.userData.animate(deltaTime * 30);
    }
  });

  if (nebulaMaterial) {
    nebulaMaterial.material.uniforms.time.value += deltaTime * 1;
  }

  lightManager.update(player.position, camera); // Aktualizace světel s hráčovou pozicí a kamerou

  updateVisibleObjects();

  if (showFPS) {
    updateFPS();
  }

  camera.children[camera.children.length - 1].renderOrder = 999;
  camera.children[camera.children.length - 1].material.depthTest = false;

  composer.render();
}

export function getCameraDirection() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  return direction;
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
        {
          playername: playerName,
          levelname: levelName,
          time_score: time,
          floor: selectedFloor,
        }
      ], {
        onConflict: ['playername', 'levelname', 'floor']
      });

    if (error) throw error;
    console.log("Skóre úspěšně uloženo");
  } catch (error) {
    console.error("Chyba při ukládání skóre:", error.message);
  }
}

function addExperienceForCompletion(floor) {
  const baseExperience = 2000;
  const exponent = 1.5;
  const totalExperience = Math.round(baseExperience * Math.pow(floor, exponent));
  addExperience(totalExperience);
}


async function displayScores(floor = null) {
  try {
    let query = supabase
      .from("maze_score")
      .select("*")
      .order("time_score", { ascending: true });

    if (floor !== null) {
      query = query.eq("floor", floor);
    }

    const { data: scores, error } = await query;

    if (error) throw error;

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";

    const groupedScores = groupAndSortScores(scores);

    Object.entries(groupedScores).forEach(([levelName, levelScores]) => {
      const groupRow = tbody.insertRow();
      const groupCell = groupRow.insertCell(0);
      groupCell.colSpan = 4;
      groupCell.textContent = levelName;
      groupCell.style.fontWeight = "bold";
      groupCell.style.backgroundColor = "#34495e";

      levelScores.forEach((score, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = "";
        row.insertCell(1).textContent = score.playername;
        row.insertCell(2).textContent = formatTime(score.time_score);
        row.insertCell(3).textContent = `Podlaží ${score.floor}`;
      });
    });
  } catch (error) {
    console.error("Chyba při načítání skóre:", error.message);
  }
}

function groupAndSortScores(scores) {
  const groupedScores = {};
  scores.forEach(score => {
    if (!groupedScores[score.levelname]) {
      groupedScores[score.levelname] = [];
    }
    groupedScores[score.levelname].push(score);
  });

  // Seřadíme skóre v každé skupině
  Object.values(groupedScores).forEach(group => {
    group.sort((a, b) => a.time_score - b.time_score);
  });

  return groupedScores;
}


function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function filterScores() {
  const searchTerm = document
    .getElementById("mazeSearchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#scoreTable tbody tr");

  let currentGroup = "";
  let isGroupVisible = false;

  rows.forEach((row) => {
    if (row.cells[0].colSpan === 4) {
      // Toto je řádek s názvem bludiště
      currentGroup = row.cells[0].textContent.toLowerCase();
      isGroupVisible = currentGroup.includes(searchTerm);
      row.style.display = isGroupVisible ? "" : "none";
    } else {
      // Toto je řádek s daty hráče
      if (isGroupVisible) {
        const playerName = row.cells[1].textContent.toLowerCase();
        row.style.display = playerName.includes(searchTerm) ? "" : "none";
      } else {
        row.style.display = "none";
      }
    }
  });
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function setUrlParameter(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url);
}

function showHintModal() {
  const hintModal = document.getElementById("hintModal");
  const hintContent = document.getElementById("hintContent");
  hintContent.innerHTML = generateHintContent();
  hintModal.style.display = "block";
}

function hideHintModal() {
  document.getElementById("hintModal").style.display = "none";
}

function generateHintContent() {
  let content = `
    <h3>Jak dokončit bludiště</h3>
    <p>Posbírejte ${totalKeys} klíčů a dostaňte se k cíli.</p>
    <p>Počet teleportů v bludišti: ${teleportPairsCount * 2}</p>
    <h3>Bossové (${bosses.length})</h3>
  `;

  bosses.forEach((boss) => {
    content += `
      <div class="boss-info">
        <h4>${boss.type.name}</h4>
        <p>Zdraví: ${boss.maxHealth}</p>
        <p>Speciální útoky: ${getReadableAttackNames(boss.type.specialAttacks).map(name => `<span class="attack-name">${name}</span>`).join(', ')}</p>
        <p class="tactic">Taktika: ${getBossTactics(boss.type.specialAttacks)}</p>
      </div>
    `;
  });

  content += `
    <h3>Tipy</h3>
    <ul>
      <li>Používejte minimapu pro lepší orientaci v bludišti.</li>
      <li>Sbírejte klíče průběžně, abyste mohli rychle dokončit level po poražení bossů.</li>
      <li>Využívejte teleporty pro rychlý přesun v bludišti.</li>
      <li>Sledujte své zdraví a manu, vyhýbejte se útokům bossů.</li>
      <li>Různé typy bossů mají různé speciální útoky a taktiky.</li>
    </ul>
  `;

  return content;
}

function getReadableAttackNames(attacks) {
  const attackNames = {
    'multiShot': 'Vícenásobná střela',
    'aoeBlast': 'Plošný výbuch',
    'teleport': 'Teleportace',
    'frostbolt': 'Ledová střela'
  };
  return attacks.map(attack => attackNames[attack] || attack);
}

function getBossTactics(specialAttacks) {
  let tactics = [];
  specialAttacks.forEach(attack => {
    switch (attack) {
      case 'multiShot':
        tactics.push("Vyhněte se vícenásobným střelám pohybem do stran. Útočte mezi salvami.");
        break;
      case 'aoeBlast':
        tactics.push("Udržujte si odstup od plošného výbuchu. Útočte ihned po explozi.");
        break;
      case 'teleport':
        tactics.push("Buďte připraveni na náhlou změnu pozice bosse. Rychle reagujte na jeho teleportaci.");
        break;
      case 'frostbolt':
        tactics.push("Vyhýbejte se ledovým střelám. Při zásahu vás zmrazí.");
        break;
      default:
        tactics.push("Pozorujte vzorec útoků a reagujte podle situace.");
    }
  });
  return tactics.join(' ');
}

let showFPS = false;
let fpsCounter;
let lastFrameTime = performance.now();
let frameCount = 0;

function initFPSCounter() {
  fpsCounter = document.createElement('div');
  fpsCounter.style.position = 'absolute';
  fpsCounter.style.bottom = '50px';
  fpsCounter.style.left = '10px';
  fpsCounter.style.color = 'white';
  fpsCounter.style.fontSize = '16px';
  fpsCounter.style.fontFamily = 'Arial, sans-serif';
  fpsCounter.style.display = 'none';
  document.body.appendChild(fpsCounter);
}

function updateFPS() {
  const currentTime = performance.now();
  frameCount++;
  if (currentTime - lastFrameTime >= 1000) {
    fpsCounter.textContent = `FPS: ${frameCount}`;
    frameCount = 0;
    lastFrameTime = currentTime;
  }
}

// Upravte funkci showSettingsModal
function showSettingsModal() {
  document.getElementById("lightSettings").value = MAX_VISIBLE_LIGHTS.toString();
  document.getElementById("qualitySettings").value = qualityFactor.toString();
  document.getElementById("settingsModal").style.display = "block";
}

function hideSettingsModal() {
  document.getElementById("settingsModal").style.display = "none";
}

// Upravte funkci saveSettings
function saveSettings() {
  MAX_VISIBLE_LIGHTS = parseInt(document.getElementById("lightSettings").value);
  localStorage.setItem('maxVisibleLights', MAX_VISIBLE_LIGHTS.toString());
  lightManager.maxVisibleLights = MAX_VISIBLE_LIGHTS;

  qualityFactor = parseFloat(document.getElementById("qualitySettings").value);
  localStorage.setItem('qualityFactor', qualityFactor.toString());
  setQuality(qualityFactor);

  hideSettingsModal();
}

// Upravte funkci setQuality
function setQuality(factor) {
  qualityFactor = factor;
  
  // Nastavení velikosti rendereru
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Nastavení rozlišení rendereru
  renderer.setPixelRatio(window.devicePixelRatio * qualityFactor);
  
  // Aktualizace poměru stran kamery
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  // Aktualizace efektů post-processingu, pokud jsou použity
  if (composer) {
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.setPixelRatio(window.devicePixelRatio * qualityFactor);
  }
}


function toggleConsole() {
  const consoleElement = document.getElementById("gameConsole");
  isConsoleOpen = !isConsoleOpen;

  if (isConsoleOpen) {
    consoleInput = '';
    consoleElement.value = "";
    consoleElement.style.display = "block";
    consoleElement.focus();
  } else {
    consoleElement.style.display = "none";
    consoleInput = ''; // Resetujeme vstup
    consoleElement.value = "";
  }
}

function generateNewMaze() {
  const inputText = document.getElementById("mazeInput").value;
  setUrlParameter('seed', inputText);
  setUrlParameter('floor', selectedFloor);
  startGame();
}

document.querySelector("#settingsModal .close").addEventListener("click", hideSettingsModal);
document.getElementById("saveSettings").addEventListener("click", saveSettings);

document.getElementById("floorFilter").addEventListener("change", function () {
  const selectedFloor = this.value ? parseInt(this.value) : null;
  displayScores(selectedFloor);
});

document.addEventListener('keydown', (event) => {
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

document.getElementById("generateMaze").addEventListener("click", () => {
  generateNewMaze();
});

showFloorSelectBtn.addEventListener('click', () => {
  floorSelectModal.style.display = 'block';
});

// Přidáme funkci pro zavření modálu
function closeFloorSelectModal() {
  floorSelectModal.style.display = 'none';
}

// Přidáme event listener pro zavření modálu křížkem
document.querySelector('#floorSelectModal .close').addEventListener('click', closeFloorSelectModal);

floorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const floor = parseInt(option.dataset.floor);
    if (canSelectFloor(floor)) {
      selectedFloor = floor;
      closeFloorSelectModal();
      showFloorSelectBtn.textContent = `Podlaží ${selectedFloor}`;
      generateNewMaze(); // Přidáme volání funkce pro generování nového bludiště
    }
  });
});
function canSelectFloor(floor) {
  if (floor === 1) return true;
  if (floor === 2 && playerLevel >= 7) return true;
  if (floor === 3 && playerLevel >= 12) return true;
  if (floor === 4 && playerLevel >= 15) return true;
  return false;
}

// Aktualizujte tuto funkci při změně úrovně hráče
export function updateFloorOptions() {
  floorOptions.forEach(option => {
    const floor = parseInt(option.dataset.floor);
    if (canSelectFloor(floor)) {
      option.classList.remove('locked');
    } else {
      option.classList.add('locked');
    }
  });
}


init();
