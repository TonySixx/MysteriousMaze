import { init, version } from "./main";
import { AudioLoader, Audio, AudioListener } from "three";
import { showGameGuide } from "./gameGuide.js";
import { getTranslation } from "./langUtils";
import { showMessage } from "./utils";

let mainTheme;

function playMainTheme() {
  const audioLoader = new AudioLoader();
  const listener = new AudioListener();

  audioLoader.load("music/msc_main_theme.mp3", function (buffer) {
    mainTheme = new Audio(listener);
    mainTheme.setBuffer(buffer);
    mainTheme.setLoop(true);
    mainTheme.setVolume(0.5);
    mainTheme.play();
  });
}

function checkVersion() {
  // Funkce pro extrakci major a minor verze z řetězce verze
  function getVersionParts(versionString) {
    if (!versionString) return [null, null];
    const parts = versionString.split('.');
    return [parts[0], parts[1]]; // Předpokládáme formát verze 'major.minor.patch'
  }
  const savedVersion = localStorage.getItem('version');
  const [savedMajorVersion, savedMinorVersion] = getVersionParts(savedVersion);
  const [currentMajorVersion, currentMinorVersion] = getVersionParts(version);
  var majorVersionMatch = true;

  if (savedMajorVersion !== currentMajorVersion) {
    majorVersionMatch = false
  }
  return majorVersionMatch
}

// Funkce pro vytvoření a zobrazení hlavního menu
function createMainMenu() {

  var majorVersionMatch = checkVersion();

  const menuContainer = document.getElementById('main-menu');

  const title = document.createElement('h1');
  title.id = 'game-title'; // Přidáme ID pro snadnější stylování
  title.textContent = 'Mysterious Maze';

  const newGameBtn = document.createElement('button');
  newGameBtn.textContent = getTranslation('newGame');
  newGameBtn.addEventListener('click', confirmNewGame);

  const loadGameBtn = document.createElement('button');
  loadGameBtn.textContent = getTranslation('loadGame');
  loadGameBtn.addEventListener('click', loadGame);

  // Vytvoříme nový element pro text celé obrazovky
  const fullscreenText = document.createElement('div');
  fullscreenText.id = 'fullscreen-text';
  fullscreenText.textContent = `${getTranslation('fullscreen')} [F11]`;
  fullscreenText.addEventListener('click', toggleFullscreen);

  // Kontrola existence záznamu playerName v localStorage
  if (localStorage.getItem('playerName') && majorVersionMatch) {
    loadGameBtn.addEventListener('click', loadGame);
  } else {
    loadGameBtn.disabled = true;
    loadGameBtn.style.opacity = '0.5';
    loadGameBtn.style.cursor = 'not-allowed';
  }

  menuContainer.appendChild(title);
  menuContainer.appendChild(newGameBtn);
  menuContainer.appendChild(loadGameBtn);
  menuContainer.appendChild(fullscreenText); // Přidáme text pro celou obrazovku

  document.body.appendChild(menuContainer);
  playMainTheme();
} 

// Funkce pro spuštění nové hry
function startNewGame() {
  localStorage.clear();
  hideMainMenu();
  showGameGuide();
}

function loadGame() {
  hideMainMenu();
  stopMainTheme();
  init();
}

export function stopMainTheme() {
  if (mainTheme) {
    mainTheme.stop();
    mainTheme.disconnect();
    mainTheme.buffer = null;
    mainTheme = null;
  }
}

// Funkce pro skrytí hlavního menu
function hideMainMenu() {
  const menu = document.getElementById('main-menu');
  if (menu) {
    menu.remove();
  }
}



// Přidejte tuto funkci pro přepnutí režimu celé obrazovky
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((e) => {
      console.error(`Chyba při přepnutí do režimu celé obrazovky: ${e.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Přidáme posluchač události pro klávesu F11
document.addEventListener('keydown', (event) => {
  if (event.key === 'F11') {
    event.preventDefault(); // Zabráníme výchozímu chování prohlížeče
    toggleFullscreen();
  }
});

function confirmNewGame() {
  if (localStorage.getItem('playerName') && checkVersion()) {
    showConfirmModal(
      getTranslation('confirmNewGame'),
      getTranslation('confirmNewGameMessage'),
      startNewGame,
      () => {} // Prázdná funkce pro zavření modálního okna bez akce
    );
  } else {
    startNewGame();
  }
}

function showConfirmModal(title, message, onConfirm, onCancel) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'main-menu-modal-overlay';

  const modalContent = document.createElement('div');
  modalContent.className = 'main-menu-modal-content';

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'main-menu-modal-title';
  modalTitle.textContent = title;

  const modalMessage = document.createElement('p');
  modalMessage.className = 'main-menu-modal-message';
  modalMessage.textContent = message;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'main-menu-modal-button-container';

  const confirmButton = document.createElement('button');
  confirmButton.className = 'main-menu-modal-button main-menu-modal-confirm';
  confirmButton.textContent = getTranslation('confirm');
  confirmButton.addEventListener('click', () => {
    onConfirm();
    document.body.removeChild(modalOverlay);
  });

  const cancelButton = document.createElement('button');
  cancelButton.className = 'main-menu-modal-button main-menu-modal-cancel';
  cancelButton.textContent = getTranslation('cancel');
  cancelButton.addEventListener('click', () => {
    onCancel();
    document.body.removeChild(modalOverlay);
  });

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(confirmButton);

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalMessage);
  modalContent.appendChild(buttonContainer);

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

export { createMainMenu, showConfirmModal };