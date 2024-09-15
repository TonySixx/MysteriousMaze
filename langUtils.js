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
    document.getElementById("showScoreText").textContent = `${getTranslation('score')} [C]`;
    document.getElementById("showMinimapText").textContent = `${getTranslation('minimap')} [V]`;
    document.getElementById("showSkillTreeText").textContent = `${getTranslation('spells')} [K]`;
    document.getElementById("showHintText").textContent = `${getTranslation('hint')} [I]`;
    document.getElementById("showOptions").textContent = `${getTranslation('settings')} [O]`;
    document.getElementById("toggleMusicText").textContent = `${getTranslation('music')} [B]`;
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