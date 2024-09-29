import { getTranslation } from './langUtils.js';
import { init } from './main.js';
import { showNameModal } from './modals.js';

const guideSteps = [
    {
        title: 'welcome',
        content: 'welcomeContent',
        icon: '🏰'
    },
    {
        title: 'movement',
        content: 'movementContent',
        icon: '🏃'
    },
    {
        title: 'combat',
        content: 'combatContent',
        icon: '⚔️'
    },
    {
        title: 'inventory',
        content: 'inventoryContent',
        icon: '🎒'
    },
    {
        title: 'quests',
        content: 'questsContent',
        icon: '📜'
    }
];

let currentStep = 0;

export function showGameGuide() {
    const guideOverlay = document.createElement('div');
    guideOverlay.id = 'guideOverlay';
    guideOverlay.innerHTML = `
        <div id="guideContent">
            <h2 id="guideTitle"></h2>
            <div id="guideIcon"></div>
            <p id="guideText"></p>
            <div id="guideControls">
                <button id="prevButton">${getTranslation('previous')}</button>
                <button id="nextButton">${getTranslation('next')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(guideOverlay);

    document.getElementById('prevButton').addEventListener('click', prevStep);
    document.getElementById('nextButton').addEventListener('click', nextStep);

    updateGuideContent();
}

function updateGuideContent() {
    const step = guideSteps[currentStep];
    document.getElementById('guideTitle').textContent = getTranslation(step.title);
    document.getElementById('guideText').textContent = getTranslation(step.content);
    document.getElementById('guideIcon').textContent = step.icon;

    document.getElementById('prevButton').style.display = currentStep > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').textContent = currentStep < guideSteps.length - 1 ? getTranslation('next') : getTranslation('finish');
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateGuideContent();
    }
}

function nextStep() {
    if (currentStep < guideSteps.length - 1) {
        currentStep++;
        updateGuideContent();
    } else {
        closeGuide();
        showNameModal(); // Zobrazíme name modal po dokončení průvodce
    }
}

function closeGuide() {
    const guideOverlay = document.getElementById('guideOverlay');
    if (guideOverlay) {
        guideOverlay.remove();
    }
    currentStep = 0;
}