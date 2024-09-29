import { init } from "./main";
import { AudioLoader, Audio, AudioListener } from "three";
import { showGameGuide } from "./gameGuide.js";
import { getTranslation } from "./langUtils";


let mainTheme;

function playMainTheme() {
    const audioLoader = new AudioLoader();
    const listener = new AudioListener();
  
    audioLoader.load("music/msc_main_theme.mp3", function(buffer) {
      mainTheme = new Audio(listener);
      mainTheme.setBuffer(buffer);
      mainTheme.setLoop(true);
      mainTheme.setVolume(0.5);
      mainTheme.play();
    });
  }

// Funkce pro vytvoření a zobrazení hlavního menu
function createMainMenu() {
    const menuContainer = document.getElementById('main-menu');
    
    const title = document.createElement('h1');
    title.textContent = 'Mysterious Maze';
    
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', startNewGame);
    
    const loadGameBtn = document.createElement('button');
    loadGameBtn.textContent = 'Load Game';
    loadGameBtn.addEventListener('click', loadGame);
    
     // Kontrola existence záznamu playerName v localStorage
     if (localStorage.getItem('playerName')) {
        loadGameBtn.addEventListener('click', loadGame);
    } else {
        loadGameBtn.disabled = true;
        loadGameBtn.style.opacity = '0.5';
        loadGameBtn.style.cursor = 'not-allowed';
    }
    
    menuContainer.appendChild(title);
    menuContainer.appendChild(newGameBtn);
    menuContainer.appendChild(loadGameBtn);
    
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
    }
  }
  
  // Funkce pro skrytí hlavního menu
  function hideMainMenu() {
    const menu = document.getElementById('main-menu');
    if (menu) {
      menu.remove();
    }
  }
  
  // Exportujeme funkci pro vytvoření menu, abychom ji mohli použít v main.js
  export { createMainMenu };