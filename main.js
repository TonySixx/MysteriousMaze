import * as THREE from "three";
import seedrandom from "seedrandom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createClient } from "@supabase/supabase-js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { AudioLoader } from "three";

import {
  setBossCounter,
  setBosses,
  spawnBossInMaze,
  bosses,
  bossCounter,
  Boss,
} from "./boss.js";
import {
  spells,
  updateFireballs,
  updateFrostbolts,
  updateArcaneMissiles,
  lastSpellCastTime,
  updateChainLightnings,
  updateSpellUpgrades,
  resetSpells,
  createSkillbar,
  updateSkillbar,
  setOriginalStaffRotation,
  originalStaffRotation,
  isInspectingStaff,
  setIsInspectingStaff,
  setIsSwingingStaff,
} from "./spells.js";
import {
  createPlayer,
  updatePlayerPosition,
  updatePlayerHealthBar,
  updatePlayerManaBar,
  regenerateMana,
  regenerateHealth,
  setPlayerHealth,
  setPlayerMana,
  player,
  moveBackward,
  moveForward,
  moveLeft,
  moveRight,
  onMouseClick,
  onMouseMove,
  onKeyDown,
  onKeyUp,
  initPlayerUI,
  loadPlayerProgress,
  addExperience,
  isAnyModalOpen,
  addGold,
  getPlayerMaxHealth,
  getPlayerMaxMana,
  updatePlayerStats,
} from "./player.js";
import { initSkillTree, skillTree } from "./skillTree.js";
import {
  getTranslation,
  setLanguage,
  updateTranslations,
  updateUITexts,
} from "./langUtils.js";
import { createCamp } from "./camp.js";
import {
  addItemToInventory,
  closeInventory,
  createItem,
  equipment,
  initWeaponModel,
  openInventory,
  originalStaffColor,
  updatePotionCooldowns,
  updateStaffVisibility,
} from "./inventory.js";
import { createMainMenu } from "./mainMenu.js";
import { floorsConfig, textureSets } from "./globals.js";
import {
  displayScores,
  filterScores,
  hideHintModal,
  hideScoreModal,
  hideSettingsModal,
  saveSettings,
  setQuality,
  showCompletionModal,
  showHintModal,
  showNameModal,
  showScoreModal,
  showSettingsModal,
} from "./modals.js";
import {
  addExperienceForCompletion,
  destroyAllSideAnimations,
  disposeObject,
  drawMinimap,
  getBestTime,
  getFloorTextureSet,
  getMazeSizeForFloor,
  getUrlParameter,
  loadAndPlayMusic,
  removeFreezeEffect,
  setUrlParameter,
  submitScore,
  updateFreezeEffect,
  updateMagicBalls,
} from "./utils.js";
import { createMainBossRoom, MAIN_BOSS_TYPES, MainBoss } from "./mainBoss/mainBoss.js";
import { animateBossEntry, animateMerchants, animateQuestIndicator, animateStaffInspection, updateBossChestAndPortal, updateChainExplosions, updateChainLightningsVisuals, updateDamageTexts, updateExplosions, updateExpTexts, updateFireballExplosions, updateFrostAuras, updateGoldTexts, updateIceExplosions, updateMainBossDragons, updateQuestBoardInteraction, updateSeedBurst, updateStaffSwing, updateTeleportParticles, updateTeleportParticleSystems, updateVineGrab } from "./animate.js";
import { initQuestSystem } from "./quests.js";

export const version = "2.0.0";

// Initialize Supabase client
const supabaseUrl = "https://olhgutdozhdvniefmltx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saGd1dGRvemhkdm5pZWZtbHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NzYwNTgsImV4cCI6MjAzODQ1MjA1OH0.RmahBsbb4QnO0xpTH-Bpe8f9vJFypcq6z5--e4s0MJI";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const savedLanguage = localStorage.getItem("language");
if (savedLanguage) {
  setLanguage(savedLanguage);
}

// Add these variables
let playerName = "";

export const keys = {
  f: false,
};

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "f") {
    keys.f = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() === "f") {
    keys.f = false;
  }
});

let startTime, timerInterval;
let moveCount = 0,
  keyCount = 0;
export var MAZE_SIZE = 20;
export var totalKeys = 3; // Přidání deklarace proměnné totalKeys
export const WALL_HEIGHT = 3.1;
export const CELL_SIZE = 2.5;
export const OBJECT_HEIGHT = 1.6;

let lastTeleportTime = 0;
const teleportCooldown = 1000;
export var nearTeleport = null;

export var keyModel;
let treasureModel;
export const BLOCKING_WALL = 2;
export var staffTopPart;
export let magicBalls = [];

let isConsoleOpen = false;
let consoleInput = "";
export let canWalkThroughWalls = false;
export let isFlying = false;

let currentStaffColor = new THREE.Color();
let targetStaffColor = new THREE.Color();
const colorTransitionSpeed = 5;

let isMinimapVisible = false;
let minimapTimeMultiplier = 1;
let cumulativeTime = 0;
let lastUpdateTime;
let canOpenMinimap = true;
let minimapCooldownTimer = null;

export let teleportPairsCount = 0;

let nebula

export var fireballSoundBuffer;
export var frostBoltSoundBuffer;
export var magicMissileSoundBuffer;
export var frostBoltHitSoundBuffer;
export var teleportSoundBuffer;
export var killConfirmationSoundBuffer;
export var chainLightningSoundBuffer;
export var magicArrowSoundBuffer;
export var landSoundBuffer;
export var coinSoundBuffer;
export var itemSoundBuffer;
export var errorSoundBuffer;
export var breakSoundBuffer;
export var successSoundBuffer;
export var activateSoundBuffer;
export var chestSoundBuffer;
export var potionSoundBuffer;
export var levelUpSoundBuffer;
export var seedBurstSoundBuffer;
export var vineGrabSoundBuffer;


export var bossSoundBuffer;
export var aoeBlastSoundBuffer;

let isMusicPlaying = true;
let footstepsSound;

export const showFloorSelectBtn = document.getElementById("showFloorSelect");
const floorSelectModal = document.getElementById("floorSelectModal");
const floorOptions = document.querySelectorAll(".floor-option");
export let selectedFloor = 1;

var audioLoader = undefined;

export function setSelectedFloor(value) {
  selectedFloor = value;
}

export function setTotalKeys(value) {
  totalKeys = value;
}

export function setMazeSize(value) {
  MAZE_SIZE = value;
}

function getSelectedFloorText() {
  switch (selectedFloor) {
    case 999:
      return getTranslation("floorCamp");
    case 100:
      return getTranslation("bossFloor1");
    case 101:
      return getTranslation("bossFloor2");
    case 102:
      return getTranslation("bossFloor3");
    case 103:
      return getTranslation("bossFloor4");
    default:
      return `${getTranslation("selectFloor")} ${selectedFloor}`;
  }
}

function loadSettings() {
  MAX_VISIBLE_LIGHTS = parseInt(localStorage.getItem("maxVisibleLights")) || 10;
  qualityFactor = parseFloat(localStorage.getItem("qualityFactor")) || 1;
  setQuality(qualityFactor);
}
export var manager;
export async function init() {
  // Create LoadingManager
  manager = new THREE.LoadingManager();

  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
    );
    showLoadingScreen();
  };

  manager.onLoad = function () {
    console.log("Loading complete!");
    hideLoadingScreen();
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
    );
    updateLoadingProgress(itemsLoaded / itemsTotal);
  };

  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };

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
  // Load settings from local storage
  loadSettings();
  document.body.appendChild(renderer.domElement);

  // Check for seed in URL
  const seedFromUrl = getUrlParameter("seed");
  if (seedFromUrl) {
    document.getElementById("mazeInput").value = seedFromUrl;
  }

  // Create audioLoader with manager
  audioLoader = new THREE.AudioLoader(manager);

  audioLoader.load("footstep.mp3", function (buffer) {
    footstepsSound = new THREE.Audio(new THREE.AudioListener());
    footstepsSound.setBuffer(buffer);
    footstepsSound.setLoop(true);
    footstepsSound.setVolume(0.5); // Adjust volume as needed
  });


  audioLoader.load("snd_fireball.wav", function (buffer) {
    fireballSoundBuffer = buffer;
  });
  audioLoader.load("snd_frostbolt.wav", function (buffer) {
    frostBoltSoundBuffer = buffer;
  });
  audioLoader.load("snd_frostbolt_hit.wav", function (buffer) {
    frostBoltHitSoundBuffer = buffer;
  });
  audioLoader.load("snd_magicmissile.wav", function (buffer) {
    magicMissileSoundBuffer = buffer;
  });

  audioLoader.load("snd_teleport.mp3", function (buffer) {
    teleportSoundBuffer = buffer;
  });

  audioLoader.load("snd_kill_confirm.mp3", function (buffer) {
    killConfirmationSoundBuffer = buffer;
  });

  audioLoader.load("snd_boss_attack.wav", function (buffer) {
    bossSoundBuffer = buffer;
  });

  audioLoader.load("snd_magic_arrow.wav", function (buffer) {
    magicArrowSoundBuffer = buffer;
  });

  audioLoader.load("snd_aoe_blast.mp3", function (buffer) {
    aoeBlastSoundBuffer = buffer;
  });

  audioLoader.load("snd_chain_lightning.mp3", function (buffer) {
    chainLightningSoundBuffer = buffer;
  });

  audioLoader.load("snd_land.mp3", function (buffer) {
    landSoundBuffer = buffer;
  });

  audioLoader.load("snd_coin.mp3", function (buffer) {
    coinSoundBuffer = buffer;
  });
  audioLoader.load("snd_item.mp3", function (buffer) {
    itemSoundBuffer = buffer;
  });

  audioLoader.load("snd_error.mp3", function (buffer) {
    errorSoundBuffer = buffer;
  });

  audioLoader.load("snd_success.mp3", function (buffer) {
    successSoundBuffer = buffer;
  });

  audioLoader.load("snd_break.mp3", function (buffer) {
    breakSoundBuffer = buffer;
  });

  audioLoader.load("snd_activate.mp3", function (buffer) {
    activateSoundBuffer = buffer;
  });

  audioLoader.load("snd_chest.mp3", function (buffer) {
    chestSoundBuffer = buffer;
  });

  audioLoader.load("snd_potion.mp3", function (buffer) {
    potionSoundBuffer = buffer;
  });

  audioLoader.load("snd_level_up.mp3", function (buffer) {
    levelUpSoundBuffer = buffer;
  });

  audioLoader.load("snd_seed_burst.wav", function (buffer) {
    seedBurstSoundBuffer = buffer;
  });

  audioLoader.load("snd_vine_grab.wav", function (buffer) {
    vineGrabSoundBuffer = buffer;
  });

  loadPlayerProgress();
  initWeaponModel();
  const floorParam = getUrlParameter("floor");
  if (floorParam) {
    let selectedFloorInt = parseInt(floorParam);
    if (canSelectFloor(selectedFloorInt)) {
      selectedFloor = selectedFloorInt;
    } else {
      selectedFloor = 1;
      setUrlParameter("floor", selectedFloor);
    }
  } else {
    selectedFloor = 999;
    setUrlParameter("floor", selectedFloor);
  }

  loadAndPlayMusic(selectedFloor, audioLoader);

  try {
    await loadKeyModel(manager);
    await loadTreasureModel(manager);
    updateStaffVisibility();

    // Use the seed from URL or input to create the maze
    const _inputText = document.getElementById("mazeInput").value;
    await getBestTime(_inputText);
    createMaze(_inputText, selectedFloor, manager);
    createPlayer();
    createSkillbar();
    initSkillTree();
    updatePlayerStats(true);
    startTimer();
    const crosshair = createCrosshair();
    camera.add(crosshair);

    initPlayerUI();
    showFloorSelectBtn.textContent = getSelectedFloorText();
    updateFloorOptions();
    updateSpellUpgrades(skillTree);

    // Load player name from local storage
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
    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("resize", onWindowResize);

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
      } else if (event.key === "h" || event.key === "H") {
        if (!isInput) {
          if (document.getElementById("hintModal").style.display === "block") {
            hideHintModal();
          } else {
            showHintModal();
          }
        }
      } else if (event.key === "p" || event.key === "P") {
        if (!isInput) {
          showFPS = !showFPS;
          fpsCounter.style.display = showFPS ? "block" : "none";
        }
      } else if (event.key === "o" || event.key === "O") {
        if (!isInput) {
          showSettingsModal();
        }
      } else if (event.key === "b" || event.key === "B") {
        if (!isInput) {
          toggleBackgroundMusic();
        }
      } else if (event.key === "i" || event.key === "I") {
        if (!isInput) {
          if (
            document.getElementById("inventoryModal").style.display === "block"
          ) {
            closeInventory();
          } else {
            openInventory();
          }
        }
      }
    });

    document
      .querySelector("#hintModal .close")
      .addEventListener("click", hideHintModal);

    // Set up post-processing
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
    updateTranslations();
    updateUITexts();

    animate();
  } catch (error) {
    console.error("Failed to load key model:", error);
  }
}

function processConsoleCommand(command) {
  if (command.includes(".item")) {
    addItemToInventory(
      createItem(
        command.replaceAll("Shift", "").replaceAll("Alt", "").split(".item")[0]
      )
    );
    return;
  } else if (command.includes(".exp")) {
    addExperience(
      parseInt(
        command.replaceAll("Shift", "").replaceAll("Alt", "").split(".exp")[0]
      )
    );
    return;
  }

  switch (command.toLowerCase()) {
    case "ghost.cmd":
      enableGhostMode();
      break;
    case "walk.cmd":
      disableGhostMode();
      break;
    case "fly.cmd":
      toggleFlyMode();
      break;
    case "exp.cmd":
      addExperience(40000);
      break;
    case "exp2.cmd":
      addExperience(100000);
      break;
    case "gold.cmd":
      addGold(50);
      break;
    default:
      console.log("Neznámý příkaz:", command);
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

function onMouseDown(event) {
  if (player.isFrozen) return;
  if (isAnyModalOpen()) return;
  if (!equipment.weapon) return; // Přidáme kontrolu vybavené zbraně

  if (event.button === 0) {
    const fireballSpell = spells.find((spell) => spell.name === "Fireball");
    if (fireballSpell && fireballSpell.isReady()) {
      let fired = fireballSpell.cast();
      if (fired) {
        fireballSpell.lastCastTime = Date.now();
      }
    }
  } else if (event.button === 2) {
    const arcaneMissileSpell = spells.find(
      (spell) => spell.name === "Arcane Missile"
    );
    if (arcaneMissileSpell && arcaneMissileSpell.isReady()) {
      let fired = arcaneMissileSpell.cast();
      if (fired) {
        arcaneMissileSpell.lastCastTime = Date.now();
      }
    }
  }
}

function toggleBackgroundMusic() {
  if (currentBackgroundMusic) {
    if (isMusicPlaying) {
      currentBackgroundMusic.pause();
      document.getElementById("toggleMusicText").style.color = "red";
    } else {
      currentBackgroundMusic.play();
      document.getElementById("toggleMusicText").style.color = "white";
    }
    isMusicPlaying = !isMusicPlaying;
  }
}

function cleanupAudio() {
  if (currentBackgroundMusic) {
    currentBackgroundMusic.stop();
    currentBackgroundMusic.disconnect();
    currentBackgroundMusic.buffer = null;
    currentBackgroundMusic = null;
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

function clearScene() {
  cleanupAudio();

  // Odstraníme a uvolníme všechny objekty ze scény
  while (scene.children.length > 0) {
    const child = scene.children[0];
    disposeObject(child);
    scene.remove(child);
  }

  destroyAllSideAnimations();

  // Uvolníme a resetujeme globální proměnné
  walls.forEach((wall) => disposeObject(wall));
  walls = [];

  merchants.forEach((merchant) => disposeObject(merchant));
  merchants = [];

  highWallAreas.forEach((area) => disposeObject(area));
  highWallAreas = [];

  torches.forEach((torch) => disposeObject(torch));
  torches = [];

  floatingObjects.forEach((obj) => {
    disposeObject(obj);
    scene.remove(obj);
  });
  floatingObjects = [];

  // Zrušíme časovač pro spawn bosse a interval odpočtu
  if (window.bossSpawnTimeout) {
    clearTimeout(window.bossSpawnTimeout);
    window.bossSpawnTimeout = null;
  }
  if (window.bossCountdownInterval) {
    clearInterval(window.bossCountdownInterval);
    window.bossCountdownInterval = null;
  }
  const countdownElement = document.getElementById("boss-countdown");
  if (countdownElement) {
    countdownElement.remove();
  }

  // Odstraníme mlhovinu a mlhu
  if (nebula) {
    disposeObject(nebula);
    scene.remove(nebula);
    nebula = null;
  }
  scene.fog = null;

  // Resetujeme lightManager
  lightManager = null;

  // Resetujeme bossy
  setBosses([]);
  setBossCounter(0);

  // Resetujeme kouzla
  resetSpells();

  teleportParticles = [];
  damageTexts.forEach((damageText) => {
    document.body.removeChild(damageText.element);
  });
  damageTexts = [];
  expTexts.forEach((expText) => {
    document.body.removeChild(expText.element);
  });
  expTexts = [];
  goldTexts.forEach((goldText) => {
    document.body.removeChild(goldText.element);
  });
  goldTexts = [];
  explosions = [];
  bossChestAndPortalData = null;
  mainBossEntryData = null;
  chestMixer = null;
  frostAuras = [];
  chainLightningsVisual = [];
  iceExplosions = [];
  chainExplosions = [];
  fireballExplosions = [];
  staffSwing = null;
  setIsSwingingStaff(false);
  setIsInspectingStaff(false);
  staffModel.rotation.copy(originalStaffRotation)

  activeVines = [];
  seedBurstParticleSystems = [];


  // Vyčistíme kontejner pro zdraví bosse
  const bossHealthContainer = document.getElementById("bossHealthContainer");
  while (bossHealthContainer.firstChild) {
    bossHealthContainer.removeChild(bossHealthContainer.firstChild);
  }

  // Odstraníme elementy interakce s obchodníky
  const interactionTexts = document.querySelectorAll(".interaction-text");
  interactionTexts.forEach((text) => text.remove());

  // Zavřeme všechny otevřené obchody
  const shopModals = document.querySelectorAll('[id^="merchantModal"]');
  shopModals.forEach((modal) => modal.remove());

  // Resetujeme instance obchodníků (pokud jsou uloženy globálně)
  if (typeof potionMerchant !== "undefined") potionMerchant = null;
  if (typeof armorMerchantInstance !== "undefined")
    armorMerchantInstance = null;

  // Zastavíme všechny animace (pokud jsou spuštěny)
  if (typeof updateMerchantAnimation !== "undefined")
    cancelAnimationFrame(updateMerchantAnimation);
  if (typeof updateArmorMerchantAnimation !== "undefined")
    cancelAnimationFrame(updateArmorMerchantAnimation);

  // Odstraníme všechny event listenery přidané v táboře
  const campElements = document.querySelectorAll(".camp-element");
  campElements.forEach((element) => {
    element.replaceWith(element.cloneNode(true));
  });
}



function createMaze(inputText = "", selectedFloor = 1, manager) {
  loadAndPlayMusic(selectedFloor, audioLoader);

  if (selectedFloor === 999) {
    clearScene();
    createCamp(lightManager);
    return;
  }

  clearScene();

  lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);

  const seed = getHash(inputText);
  actualSeedText = inputText;
  let rng = new seedrandom(seed);

  if (selectedFloor >= 100 && selectedFloor <= 200) {
    const bossIndex = selectedFloor - 100;
    const bossType = MAIN_BOSS_TYPES[bossIndex];
    const bossRoomOptions = {
      roomSize: 10,
      textureSet: textureSets[bossIndex+ 1],
      torchColor: textureSets[bossIndex % textureSets.length].torchColor.light,
      bossType: bossType,
      spawnDelay: 5000,
      countdownDuration: 5,
      roomAmbientLightColor: new THREE.Color(bossType.ambientLightColor),
      roomAmbientLightIntensity: 0.5,
      nebulaColors: bossType.nebulaColors,
      fogDensity: 0.03
    };

    const { room, spawnTimeout, countdownInterval } = createMainBossRoom(rng, bossRoomOptions);
    scene.add(room);
    window.bossSpawnTimeout = spawnTimeout;
    window.bossCountdownInterval = countdownInterval;
  } else {
    // Adjust textureSets selection based on the floor
    let availableTextureSets;
    availableTextureSets = getFloorTextureSet(selectedFloor);
    const textureSetIndex = Math.floor(rng() * availableTextureSets.length);
    const selectedTextureSet = availableTextureSets[textureSetIndex];

    const loader = new THREE.TextureLoader(manager);
    const floorTexture = loader.load(selectedTextureSet.floorTexture);
    floorTexture.colorSpace = THREE.SRGBColorSpace;

    const brickTexture = loader.load(selectedTextureSet.wallTexture);
    const ceilingTexture = loader.load(selectedTextureSet.ceilingTexture);
    brickTexture.colorSpace = THREE.SRGBColorSpace;
    ceilingTexture.colorSpace = THREE.SRGBColorSpace;

    const specialTextures = selectedTextureSet.specialTextures.map(
      (textureName) => loader.load(textureName)
    );
    specialTextures.forEach((x) => (x.colorSpace = THREE.SRGBColorSpace));

    let { minSize, maxSize } = getMazeSizeForFloor(selectedFloor);
    MAZE_SIZE = Math.floor(rng() * (maxSize - minSize + 1)) + minSize;
    totalKeys = Math.max(3, Math.min(10, 3 + Math.floor(rng() * 8)));

    teleportPairsCount = Math.max(1, Math.min(3, 1 + Math.floor(rng() * 3)));

    const floorGeometry = new THREE.PlaneGeometry(
      MAZE_SIZE * CELL_SIZE,
      MAZE_SIZE * CELL_SIZE
    );
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
    });
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(MAZE_SIZE, MAZE_SIZE);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    maze = generateMaze(MAZE_SIZE, MAZE_SIZE, seed, selectedFloor);
    totalBossesInMaze = bosses.length;

    const wallGeometry = new THREE.BoxGeometry(
      CELL_SIZE,
      WALL_HEIGHT,
      CELL_SIZE
    );
    const wallMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });

    const ceilingGeometry = new THREE.BoxGeometry(
      CELL_SIZE,
      WALL_HEIGHT,
      CELL_SIZE
    );
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      map: ceilingTexture,
    });
    const ceilingMaterialHigh = new THREE.MeshStandardMaterial({
      map: ceilingTexture,
      color: 0x918b88,
    });

    // Determine high wall areas
    highWallAreas = Array(MAZE_SIZE)
      .fill()
      .map(() => Array(MAZE_SIZE).fill(false));
    for (let i = 0; i < MAZE_SIZE; i++) {
      for (let j = 0; j < MAZE_SIZE; j++) {
        if (maze[i][j] === 0 && rng() < 0.1) {
          highWallAreas[i][j] = true;
          // Zajistíme, že okolní buňky budou také vysoké
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (
                i + di >= 0 &&
                i + di < MAZE_SIZE &&
                j + dj >= 0 &&
                j + dj < MAZE_SIZE
              ) {
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
        const ceiling = new THREE.Mesh(
          ceilingGeometry,
          isHighWallArea ? ceilingMaterialHigh : ceilingMaterial
        );
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
      0xff8080, 0x99ff99, 0x8080ff, 0xff66ff, 0xffff80, 0xb3ffff,
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
    createTorches(
      walls,
      maze,
      CELL_SIZE,
      MAZE_SIZE,
      selectedTextureSet.torchColor
    );

    // Použijeme model truhly jako cíl
    const goal = treasureModel.clone();
    goal.userData.isGoal = true;
    placeObjectInFreeCell(goal, rng);
    scene.add(goal);

    // Přidejte mlhovinu
    nebulaMaterial = addNebula();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Přidejte mlhu
    scene.fog = new THREE.FogExp2(0x000000, 0.05); // Zvýšili jsme hustotu mlhy
  }

  addStarsToNebula();



  keyCount = 0;
  updateKeyCount();

  if (isMinimapVisible) {
    toggleMinimap();
  }

  // Resetování zdraví hráče při vytvoření nového bludiště
  setPlayerHealth(getPlayerMaxHealth());
  setPlayerMana(getPlayerMaxMana());
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
    console.error(
      "Počet klíčů přiřazených bossům přesahuje celkový počet klíčů."
    );
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
          roughness: 0.1,
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
  const floorConfig = floorsConfig[selectedFloor];

  const hallProbability = floorConfig.hallConfig.probability;
  const minHallSize = floorConfig.hallConfig.minSize;
  const maxHallSize = floorConfig.hallConfig.maxSize;
  const hallSize = minHallSize + Math.floor(rng() * (maxHallSize - minHallSize + 1));
  const bossProbability = floorConfig.bossProbability;

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
        if (rng() < bossProbability && bosses.length <= 15) {
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

  particles.geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  wall.add(particles);

  wall.userData.isBlockingWall = true;
  return wall;
}

// Funkce pro vytvoření nového 3D modelu teleportu s particle efekty
export function createTeleportModel(color) {
  const teleportGeometry = new THREE.TorusGeometry(0.8, 0.1, 32, 64);
  const teleportMaterial = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 1.5,
  });
  const teleport = new THREE.Mesh(teleportGeometry, teleportMaterial);

  // Přidání particle efektů
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 50;
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
    size: 0.05,
    transparent: true,
    opacity: 0.7,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  teleport.add(particleSystem);
  particleSystem.creationTime = performance.now();
  teleportParticleSystems.push(particleSystem);

  teleport.userData.isRotating = true;
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
        playSound(itemSoundBuffer);
        updateKeyCount();
        showKeyMessage(); // Zobrazí zprávu o sebrání klíče
      } else if (child.userData.isTeleport && distance < 1.5) {
        nearTeleport = child;
        showTeleportPrompt();
      } else if (child.userData.isGoal && distance < 1.5 && !goalReached) {
        if (keyCount === totalKeys) {
          console.log("Dosaženo cíle");
          showFinishMessage();
          stopTimer();
        } else {
          if (!keysAlertShown) {
            console.log(
              "Musíte nasbírat všechny kouzelné klíče, než dosáhnete cíle!"
            );
            showGoalMessage(keyCount, totalKeys);
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
  goalMessageElement.textContent = `${getTranslation(
    "collectKeys",
    `${keyCount}/${totalKeys}`
  )}`;
  goalMessageElement.style.display = "block";

  setTimeout(() => {
    goalMessageElement.style.display = "none";
  }, 4000);
}

export function teleportPlayer(teleport) {
  const currentTime = performance.now();
  if (currentTime - lastTeleportTime > teleportCooldown) {
    console.log("Teleportuji se");
    playSound(teleportSoundBuffer);
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
  promptElement.textContent = getTranslation("pressToUse", "F");
  promptElement.style.display = "block";
}

export async function startGame() {
  const inputText = document.getElementById("mazeInput").value;

  // Kontrola, zda má hráč dostatečnou úroveň pro zvolené podlaží
  if (!canSelectFloor(selectedFloor)) {
    alert("Nemáte dostatečnou úroveň pro toto podlaží!");
    return;
  }

  getBestTime(inputText, selectedFloor);
  removeFreezeEffect();
  createMaze(inputText, selectedFloor);
  console.log("torches", torches.length);
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

function updateKeyCount() {
  document.getElementById("keyCount").textContent = `${keyCount}/${totalKeys}`;
}

function startTimer() {
  lastUpdateTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000 / 60);
}

async function stopTimer() {
  goalReached = true;
  clearInterval(timerInterval);
  const elapsedTime = Math.floor(cumulativeTime / 1000);

  const goldGained = Math.round((selectedFloor * 2) + (totalBossesInMaze * selectedFloor));
  const expGained = addExperienceForCompletion(selectedFloor);
  addGold(goldGained);

  const newBestTime = elapsedTime < bestTime;
  const previousBestTime = bestTime === Infinity ? null : bestTime;
  if (newBestTime) {
    bestTime = elapsedTime;
    submitScore(document.getElementById("mazeInput").value, bestTime);
  }

  exitPointerLock();
  showCompletionModal(elapsedTime, goldGained, expGained, previousBestTime, newBestTime);
}

function updateTimer() {
  const now = Date.now();
  const deltaTime = now - lastUpdateTime;
  cumulativeTime += deltaTime * minimapTimeMultiplier;
  lastUpdateTime = now;

  const totalSeconds = Math.floor(cumulativeTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  document.getElementById("timeCount").textContent = `${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}`;
}

function hideTeleportPrompt() {
  const promptElement = document.getElementById("teleportPrompt");
  if (promptElement) {
    promptElement.style.display = "none";
  }
}

// Přidejte novou funkci pro přepínání minimapy
export function toggleMinimap() {
  if (selectedFloor === 999 || selectedFloor >= 100) { playSound(errorSoundBuffer); return; } // Nelze použít minimapu v táboře nebo boss room
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

export function changeStaffColor(color) {
  targetStaffColor.setHex(color);
}

function updateStaffColor(deltaTime) {
  currentStaffColor.lerp(targetStaffColor, colorTransitionSpeed * deltaTime);
  if (staffModel) {
    const modelInfo = equipment.weapon.modelInfo;
    if (modelInfo.emissivePartName) {
      staffModel
        .getObjectByName(modelInfo.emissivePartName)
        .material.emissive.copy(currentStaffColor);
    } else {
      staffModel.traverse((child) => {
        if (child.isMesh && child.material.emissive) {
          child.material.emissive.copy(currentStaffColor);
        }
      });
    }
  }
}

// Funkce pro načtení modelu klíče
function loadKeyModel(manager) {
  return new Promise((resolve, reject) => {
    console.log("Starting to load key model");
    const loader = new GLTFLoader(manager);
    loader.load(
      "models/Key.glb",
      (gltf) => {
        console.log("GLTF loaded successfully", gltf);
        keyModel = gltf.scene;
        keyModel.scale.set(0.3, 0.3, 0.3);
        console.log("Key model processed");
        resolve(keyModel);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        reject(error);
      }
    );
  });
}

function loadTreasureModel(manager) {
  return new Promise((resolve, reject) => {
    console.log("Starting to load treasure model");
    const loader = new GLTFLoader(manager);
    loader.load(
      "models/TreasureChest.glb",
      (gltf) => {
        console.log("Treasure model loaded successfully", gltf);
        treasureModel = gltf.scene;
        treasureModel.scale.set(0.5, 0.5, 0.5);
        console.log("Treasure model processed");
        resolve(treasureModel);
      },
      undefined,
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

function rotateObjects(deltaTime) {
  scene.children.forEach((child) => {
    if (child.userData.isRotating) {
      child.rotation.y += 1 * deltaTime; // Pomalá rotace kolem osy Y
    }
  });
}

function resetStaffColor() {
  if (Date.now() - lastSpellCastTime > 500) {
    if (originalStaffColor) {
      changeStaffColor(originalStaffColor.getHex());
    } else {
      // Pokud z nějakého důvodu nemáme originální barvu, použijeme výchozí
      changeStaffColor(0xd8fcfd);
    }
  }
}

function updateBosses(deltaTime) {
  bosses.forEach((boss) => boss.update(deltaTime));
}

// Třída pro správu světel
export class LightManager {
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
    cameraViewProjectionMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    this.lights.forEach((light) => {
      light.visible = false;
    });

    // Seřaďte světla podle vzdálenosti od hráče a zjistěte, zda jsou v záběru s tolerancí
    const sortedLights = this.lights
      .map((light) => ({
        light,
        distance: light.position.distanceTo(playerPosition),
        inView: frustum.intersectsSphere(
          new THREE.Sphere(light.position, this.tolerance)
        ),
      }))
      .filter((lightInfo) => lightInfo.inView) // Filtrujte pouze světla, která jsou v záběru nebo blízko záběru
      .sort((a, b) => a.distance - b.distance);

    // Zapněte pouze nejbližší světla
    for (
      let i = 0;
      i < Math.min(this.maxVisibleLights, sortedLights.length);
      i++
    ) {
      sortedLights[i].light.visible = true;
    }
  }
}

function createTorches(walls, maze, CELL_SIZE, MAZE_SIZE, torchColor) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

  const rng = new seedrandom(
    getHash(document.getElementById("mazeInput").value)
  );

  const selectedColor = torchColor;

  // Vytvoříme pomocné pole pro sledování, kde už jsou pochodně umístěny
  const torchPositions = Array(MAZE_SIZE)
    .fill()
    .map(() => Array(MAZE_SIZE).fill(false));

  for (let x = 0; x < MAZE_SIZE; x++) {
    for (let z = 0; z < MAZE_SIZE; z++) {
      if (maze[x][z] === 0) {
        // Jsme v chodbě
        // Zkontrolujeme sousední buňky
        const directions = [
          { dx: 1, dz: 0 },
          { dx: -1, dz: 0 },
          { dx: 0, dz: 1 },
          { dx: 0, dz: -1 },
        ];

        directions.forEach((dir) => {
          const nx = x + dir.dx;
          const nz = z + dir.dz;

          // Pokud je sousední buňka zeď a zde ještě není pochodeň
          if (
            nx >= 0 &&
            nx < MAZE_SIZE &&
            nz >= 0 &&
            nz < MAZE_SIZE &&
            maze[nx][nz] === 1 &&
            !torchPositions[x][z]
          ) {
            // S určitou pravděpodobností umístíme pochodeň
            if (rng() < 0.3) {
              // 30% šance na umístění pochodně
              const torch = new THREE.Mesh(torchGeometry, torchMaterial);

              torch.position.set(
                (x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE +
                dir.dx * CELL_SIZE * 0.5,
                WALL_HEIGHT / 2 - 0.2,
                (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE + dir.dz * CELL_SIZE * 0.5
              );

              // Natočíme pochodeň směrem ke zdi
              torch.rotateZ(Math.PI / 1);

              scene.add(torch);

              const fire = createFireParticles(selectedColor.particles);
              fire.position
                .copy(torch.position)
                .add(new THREE.Vector3(0, 0.25, 0));
              scene.add(fire);

              const light = new THREE.PointLight(
                selectedColor.light,
                1.5,
                CELL_SIZE * 4
              );
              light.position.set(
                (x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE +
                dir.dx * CELL_SIZE * 0.18,
                WALL_HEIGHT / 2 + 0.25,
                (z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE +
                dir.dz * CELL_SIZE * 0.18
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

export function createFireParticles(color) {
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

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

// Přidejte novou funkci pro animaci otáčení hůlky
function animateStaffRotation(deltaTime) {
  if (staffTopPart) {
    staffTopPart.rotation.y += deltaTime * 1; // Upravte rychlost otáčení podle potřeby
  }
}

// Přidejte tuto funkci pro animaci ohně
function animateFire(deltaTime) {
  torches.forEach(({ fire }) => {
    const positions = fire.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01 * (deltaTime * 50);
      positions[i + 1] +=
        0.01 * (deltaTime * 50) + Math.random() * 0.02 * (deltaTime * 50);
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

function addStarsToNebula() {
  // Nejprve odstraníme staré objekty, pokud existují
  floatingObjects.forEach((obj) => scene.remove(obj));
  floatingObjects = [];

  const starCount = 500;
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0x000000, // Změníme barvu na černou
    size: 0.4,
    sizeAttenuation: true,
  });

  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const radius = MAZE_SIZE * CELL_SIZE * 1.3 * (1 + Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  floatingObjects.push(stars);

  // Odstraníme animaci třpytu, protože hvězdy jsou nyní černé a nesvítí
  stars.userData.animate = () => { };
}

 export function addNebula(color1, color2) {
  const geometry = new THREE.SphereGeometry(1500, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: {
        value: color1 ? new THREE.Color(color1) : new THREE.Color(0x000000),
      },
      color2: {
        value: color2 ? new THREE.Color(color2) : new THREE.Color(0x000000),
      },
      useFixedColors: { value: color1 && color2 ? 1.0 : 0.0 },
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
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float useFixedColors;
      varying vec3 vNormal;
      void main() {
        vec3 animatedColor = 0.5 + 0.5 * cos(time * 0.2 + vNormal.xyx + vec3(0,2,4));
        vec3 gradientColor = mix(color1, color2, (vNormal.y + 1.0) * 0.5);
        vec3 finalColor = mix(animatedColor, gradientColor, useFixedColors);
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `,
    side: THREE.BackSide,
    transparent: true,
  });
  nebula = new THREE.Mesh(geometry, material);
  scene.add(nebula);

  return { material, object: nebula };
}

export function isHighWallArea(x, z) {
  if (highWallAreas.length === 0) {
    return false;
  }
  const mazeX = Math.floor(x / CELL_SIZE + MAZE_SIZE / 2);
  const mazeZ = Math.floor(z / CELL_SIZE + MAZE_SIZE / 2);

  // Přidáme kontrolu platnosti indexů
  if (mazeX < 0 || mazeX >= MAZE_SIZE || mazeZ < 0 || mazeZ >= MAZE_SIZE) {
    return false;
  }

  return highWallAreas[mazeX][mazeZ];
}

// Přidejte tuto funkci
function updateVisibleObjects() {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);

  const visibilityDistance = 50; // Maximální vzdálenost viditelnosti

  // Aktualizace viditelnosti zdí
  walls.forEach((wall) => {
    if (
      frustum.intersectsObject(wall) &&
      wall.position.distanceTo(player.position) < visibilityDistance
    ) {
      if (wall.visible === false) {
        wall.visible = true;
      }
    } else {
      if (wall.visible === true) {
        wall.visible = false;
      }
    }
  });

  torches.forEach((torches) => {
    if (
      frustum.intersectsObject(torches.torch) &&
      torches.torch.position.distanceTo(player.position) < visibilityDistance
    ) {
      if (torches.torch.visible === false && torches.fire.visible === false) {
        torches.torch.visible = true;
        torches.fire.visible = true;
      }
    } else {
      if (torches.torch.visible === true && torches.fire.visible === true) {
        torches.torch.visible = false;
        torches.fire.visible = false;
      }
    }
  });
}

let previousTime = performance.now(); // Definice a inicializace previousTime
let frameCountForAnimation = 0;
function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - previousTime) / 1000; // Delta time v sekundách
  previousTime = currentTime;

  requestAnimationFrame(animate);
  updateFreezeEffect();
  updatePlayerPosition(deltaTime);
  animateKeys(deltaTime);
  animateGoal(deltaTime);
  rotateObjects(deltaTime);
  animateFire(deltaTime);
  updateFireballs(deltaTime);
  updateFrostbolts(deltaTime);
  updateArcaneMissiles(deltaTime);
  updateChainLightnings(deltaTime);
  updateBosses(deltaTime);
  updateMagicBalls(deltaTime);
  regenerateMana(deltaTime);
  regenerateHealth(deltaTime);
  animateStaffRotation(deltaTime);
  updatePotionCooldowns(deltaTime);
  updateDamageTexts(currentTime);
  updateExpTexts(currentTime);
  updateGoldTexts(currentTime);
  updateTeleportParticles(deltaTime, currentTime);
  updateTeleportParticleSystems(deltaTime, currentTime);
  updateMainBossDragons(deltaTime, currentTime);
  animateBossEntry(deltaTime);
  updateExplosions(deltaTime, currentTime);
  updateIceExplosions(deltaTime);
  updateFrostAuras(deltaTime);
  updateChainExplosions(deltaTime);
  updateChainLightningsVisuals(deltaTime);
  updateFireballExplosions(deltaTime);
  updateStaffSwing(deltaTime);
  animateStaffInspection(currentTime);

  updateSeedBurst(deltaTime);
  updateVineGrab(deltaTime);

  animateMerchants();
  updateQuestBoardInteraction(deltaTime);
  animateQuestIndicator(deltaTime);

  if (bossChestAndPortalData) {
    updateBossChestAndPortal(deltaTime);
  }

  if (staffModel && staffModel.userData.enchantParticles) {
    staffModel.userData.enchantParticles.userData.update(deltaTime);
  }

  if (isMinimapVisible) {
    drawMinimap();
  }

  updateSkillbar();
  updateFootstepsSound();

  resetStaffColor();
  updateStaffColor(deltaTime);

  // Animace všech částicových efektů ve scéně
  scene.children.forEach((child) => {
    if (child.userData.animate) {
      child.userData.animate(deltaTime * 30);
    }
  });

  if (nebulaMaterial && nebulaMaterial.material) {
    nebulaMaterial.material.uniforms.time.value += deltaTime;
  }

  if (frameCountForAnimation % 2 === 0) {
    checkObjectInteractions();
    lightManager.update(player.position, camera); // Aktualizace světel každý druhý snímek
  }
  frameCountForAnimation = (frameCountForAnimation + 1) % 2;

  updateVisibleObjects();

  if (showFPS) {
    updateFPS();
  }

  camera.children[camera.children.length - 1].renderOrder = 999;
  if (camera.children[camera.children.length - 1].material?.depthTest) {
    camera.children[camera.children.length - 1].material.depthTest = false;
  }

  composer.render();
}

let showFPS = false;
let fpsCounter;
let lastFrameTime = performance.now();
let frameCount = 0;

function initFPSCounter() {
  fpsCounter = document.createElement("div");
  fpsCounter.style.position = "absolute";
  fpsCounter.style.bottom = "50px";
  fpsCounter.style.left = "10px";
  fpsCounter.style.color = "white";
  fpsCounter.style.fontSize = "16px";
  fpsCounter.style.fontFamily = "Arial, sans-serif";
  fpsCounter.style.display = "none";
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

export function requestPointerLock() {
  if (document.pointerLockElement !== document.body) {
    document.body.requestPointerLock();
  }
}
export function exitPointerLock() {
  document.exitPointerLock();
}

function toggleConsole() {
  const consoleElement = document.getElementById("gameConsole");
  isConsoleOpen = !isConsoleOpen;

  if (isConsoleOpen) {
    consoleInput = "";
    consoleElement.value = "";
    consoleElement.style.display = "block";
    consoleElement.focus();
  } else {
    consoleElement.style.display = "none";
    consoleInput = ""; // Resetujeme vstup
    consoleElement.value = "";
  }
}

export function generateNewMaze() {
  requestPointerLock();
  const inputText = document.getElementById("mazeInput").value;
  setUrlParameter("seed", inputText);
  setUrlParameter("floor", selectedFloor);
  startGame();
}

document
  .querySelector("#settingsModal .close")
  .addEventListener("click", hideSettingsModal);
document.getElementById("saveSettings").addEventListener("click", saveSettings);

document.getElementById("floorFilter").addEventListener("change", function () {
  const selectedFloor = this.value ? parseInt(this.value) : null;
  displayScores(selectedFloor);
});

document.addEventListener("keydown", (event) => {
  if (event.key === ";") {
    toggleConsole();
  } else if (isConsoleOpen) {
    if (event.key === "Enter") {
      processConsoleCommand(consoleInput);
      toggleConsole();
    } else if (event.key === "Backspace") {
      consoleInput = consoleInput.slice(0, -1);
    } else {
      consoleInput += event.key;
    }
  } else if (document.activeElement === document.getElementById("mazeInput")) {
    if (event.key === "Enter") {
      document.activeElement.blur();
      generateNewMaze();
    }
  }
});

document.getElementById("generateMaze").addEventListener("click", () => {
  document.activeElement.blur();
  generateNewMaze();
});

showFloorSelectBtn.addEventListener("click", () => {
  exitPointerLock();
  floorSelectModal.style.display = "block";
});

// Přidáme funkci pro zavření modálu
function closeFloorSelectModal() {
  exitPointerLock();
  floorSelectModal.style.display = "none";
}

// Přidáme event listener pro zavření modálu křížkem
document
  .querySelector("#floorSelectModal .close")
  .addEventListener("click", closeFloorSelectModal);

floorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const floor = parseInt(option.dataset.floor);
    if (canSelectFloor(floor)) {
      selectedFloor = floor;
      closeFloorSelectModal();
      showFloorSelectBtn.textContent =
        floor === 999
          ? getTranslation("floorCamp")
          : `${getTranslation("floor")} ${selectedFloor}`;
      generateNewMaze(); // Volání funkce pro generování nového bludiště nebo tábora
    }
  });
});

export function canSelectFloor(floor) {
  if (floor === 999) return true; // Tábor je vždy dostupný
  if (floor === 1) return true; // První podlaží je vždy dostupné
  if (floor === 2) return playerLevel >= 7;
  if (floor === 3) return playerLevel >= 12;
  if (floor === 4) return playerLevel >= 16;
  if (floor === 5) return playerLevel >= 21;
  if (floor === 6) return playerLevel >= 26;
  if (floor === 7) return playerLevel >= 31;
  if (floor === 8) return playerLevel >= 36;
  if (floor === 100) return playerLevel >= 7;
  if (floor === 101) return playerLevel >= 12;
  if (floor === 102) return playerLevel >= 16;
  if (floor === 103) return playerLevel >= 20;
  return false;
}

// Aktualizujte tuto funkci při změně úrovně hráče
export function updateFloorOptions() {
  const floorOptions = document.querySelectorAll(".floor-option");
  floorOptions.forEach((option) => {
    const floor = parseInt(option.dataset.floor);
    if (canSelectFloor(floor)) {
      option.classList.remove("locked");
    } else {
      option.classList.add("locked");
    }
  });

}

export function playSound(soundBuffer, volume = 1) {
  const sound = new THREE.Audio(new THREE.AudioListener());
  sound.setVolume(volume);
  sound.setBuffer(soundBuffer);
  sound.play();
  sound.onEnded = () => {
    sound.disconnect();
  };
}

function showLoadingScreen() {
  // Display the loading screen
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = "block";
  }
}

function hideLoadingScreen() {
  // Hide the loading screen
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
}

function updateLoadingProgress(progress) {
  // Update the progress bar
  const progressBar = document.getElementById("loadingProgressBar");
  if (progressBar) {
    progressBar.style.width = progress * 100 + "%";
  }
}

window.addEventListener("load", () => {
  createMainMenu();
});
