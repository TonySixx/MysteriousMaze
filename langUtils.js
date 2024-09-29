import translations from './translations.json';

export let currentLanguage = 'en';


export function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
  }
  
  export function getTranslation(key, ...args) {
    let text = translations[currentLanguage][key] || key;
    args.forEach((arg, index) => {
      text = text.replace(`{${index}}`, arg);
    });
    return text;
  }

  // Load language preference from localStorage



  export function updateUITexts() {
    const menuItems = [
      { id: "showScoreIcon", key: "C" },
      { id: "showMinimapIcon", key: "V" },
      { id: "showSkillTreeIcon", key: "K" },
      { id: "showInventoryIcon", key: "I" },
      { id: "showHintIcon", key: "H" },
      { id: "showOptionsIcon", key: "O" },
      { id: "toggleMusicIcon", key: "B" },
      { id: "showQuestsIcon", key: "U" }
    ];
  
    menuItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        const translationKey = element.getAttribute("data-translate");
        element.innerHTML = `${element.innerHTML.split(">")[0]}> [${item.key}]`;
        element.title = getTranslation(translationKey);
      }
    });
  }

 export function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (key === "selectFloor") {
        return;
    }
      if (element.tagName === 'INPUT') {
      element.placeholder = getTranslation(key);  
    }
      element.textContent = getTranslation(key);
    });
  }