import { playerLevel, useSkillPoint } from './player.js';
import frostboltIcon from './public/spells/frostbolt-icon.png';
import arcaneMissileIcon from './public/spells/arcane-missile-icon.png';
import iceExplosionIcon from './public/spells/ice-explosion-icon.png';
import multiShotIcon from './public/spells/multi-shot-icon.png';
import fireballIcon from './public/spells/fireball-icon.png';
import infernoTouchIcon from './public/spells/inferno-touch-icon.png';
import chainLightningIcon from './public/spells/chain-lightning-icon.png';
import chainExplosionIcon from './public/spells/chain-explosion-icon.png';
import { spells, updateSpellUpgrades } from './spells.js';
import { getSkillPoints } from './player.js';

let skillTreeModal = null;

const skillTree = {
    fireball: {
        name: 'Fireball',
        level: 1,
        maxLevel: 2,
        description: 'Základní ohnivý útok',
        icon: fireballIcon,
        upgrades: [
            {
                name: 'Inferno Touch',
                description: 'Zasažený nepřítel hoří 2 sekundy, každých 0.5s ztrácí 20 životů',
                requiredLevel: 3,
                unlocked: false,
                icon: infernoTouchIcon
            }
        ]
    },
    frostbolt: {
        name: 'Frostbolt',
        level: 1,
        maxLevel: 2,
        description: 'Mrazivý útok, který zmrazí nepřítele na 2 sekundy',
        icon: frostboltIcon,
        upgrades: [
            {
                name: 'Ice Explosion',
                description: 'Při zásahu cíle frostbolt exploduje a vytvoří ledovou vlnu, která zmrazí všechny nepřátele v okruhu 3 metrů na 1 sekundu a způsobí jim 50 poškození',
                requiredLevel: 5,
                unlocked: false,
                icon: iceExplosionIcon // Zde by měla být nová ikona pro vylepšení
            }
        ]
    },
    arcaneMissile: {
        name: 'Arcane Missile',
        level: 1,
        maxLevel: 2,
        description: 'Rychlý magický projektil',
        icon: arcaneMissileIcon,
        upgrades: [
            {
                name: 'Multi-shot',
                description: 'Při seslání kouzla se vytvoří 3 magické střely místo jedné. Každá střela má 70% síly původního kouzla a může zasáhnout různé cíle',
                requiredLevel: 7,
                unlocked: false,
                icon: multiShotIcon // Zde by měla být nová ikona pro vylepšení
            }
        ]
    },
    chainLightning: {
        name: 'Chain Lightning',
        level: 0,
        maxLevel: 2,
        description: 'Blesk, který přeskakuje mezi nepřáteli',
        icon: chainLightningIcon,
        requiredLevel: 10,
        cost: 1, // Cena v dovednostních bodech
        upgrades: [
            {
                name: 'Chain Explosion',
                description: 'Poslední zasažený nepřítel exploduje a způsobí 100 poškození všem nepřátelům v okruhu 5 metrů',
                requiredLevel: 15,
                unlocked: false,
                icon: chainExplosionIcon,
                cost: 2 // Cena vylepšení v dovednostních bodech
            }
        ]
    }
};

export function toggleSkillTree() {
    if (skillTreeModal && skillTreeModal.style.display === 'block') {
        closeSkillTree();
    } else {
        showSkillTree();
    }
}

function showSkillTree() {
    if (skillTreeModal) {
        skillTreeModal.remove();
    }

    skillTreeModal = document.createElement('div');
    skillTreeModal.id = 'skillTreeModal';
    skillTreeModal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content skill-tree';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeSkillTree;
    
    content.appendChild(closeBtn);
    
    const title = document.createElement('h2');
    title.textContent = 'Strom schopností';
    content.appendChild(title);
    
    const skillPointsDisplay = document.createElement('p');
    skillPointsDisplay.id = 'skillPoints';
    content.appendChild(skillPointsDisplay);
    
    const skillTreeContainer = document.createElement('div');
    skillTreeContainer.className = 'skill-tree-container';
    
    for (const [spellKey, spell] of Object.entries(skillTree)) {
        const spellElement = createSpellElement(spellKey, spell);
        skillTreeContainer.appendChild(spellElement);
    }
    
    content.appendChild(skillTreeContainer);
    skillTreeModal.appendChild(content);
    document.body.appendChild(skillTreeModal);
    
    skillTreeModal.style.display = 'block';
    updateSkillPointsDisplay();
}

function closeSkillTree() {
    if (skillTreeModal) {
        skillTreeModal.style.display = 'none';
        skillTreeModal.remove();
        skillTreeModal = null;
    }
}

function createSpellElement(spellKey, spell) {
    const spellElement = document.createElement('div');
    spellElement.className = 'spell';
    
    const spellIcon = document.createElement('img');
    spellIcon.src = spell.icon;
    spellIcon.alt = spell.name;
    spellIcon.className = 'spell-icon';
    if (spellKey === 'chainLightning' && spell.level === 0) {
        spellIcon.classList.add('locked');
    }
    spellElement.appendChild(spellIcon);
    
    const spellInfo = document.createElement('div');
    spellInfo.className = 'spell-info';
    
    const spellName = document.createElement('h3');
    spellName.textContent = spell.name;
    spellInfo.appendChild(spellName);
    
    const spellDescription = document.createElement('p');
    spellDescription.textContent = spell.description;
    spellInfo.appendChild(spellDescription);
    
    spellElement.appendChild(spellInfo);
    
    if (spell.upgrades) {
        const upgradesContainer = document.createElement('div');
        upgradesContainer.className = 'upgrades-container';
        
        spell.upgrades.forEach(upgrade => {
            const upgradeElement = createUpgradeElement(spellKey, upgrade);
            upgradesContainer.appendChild(upgradeElement);
        });
        
        spellElement.appendChild(upgradesContainer);
    }
    
    // Přidáme tlačítko pro odemčení kouzla Chain Lightning
    if (spellKey === 'chainLightning' && spell.level === 0) {
        const unlockButton = document.createElement('button');
        unlockButton.textContent = 'Odemknout';
        unlockButton.disabled = playerLevel < spell.requiredLevel || getSkillPoints() < spell.cost;
        unlockButton.onclick = () => unlockSpell(spellKey, unlockButton);
        
        const costBadge = document.createElement('span');
        costBadge.className = 'cost-badge';
        costBadge.textContent = spell.cost;
        unlockButton.appendChild(costBadge);
        
        const requiredLevel = document.createElement('p');
        requiredLevel.className = 'required-level';
        requiredLevel.textContent = `Požadovaný level: ${spell.requiredLevel}`;
        if (playerLevel < spell.requiredLevel) {
            requiredLevel.classList.add('not-met');
        }
        
        const unlockContainer = document.createElement('div');
        unlockContainer.className = 'unlock-container';
        unlockContainer.appendChild(requiredLevel);
        unlockContainer.appendChild(unlockButton);
        
        spellElement.insertBefore(unlockContainer, spellInfo.nextSibling);
    }
    
    return spellElement;
}

function createUpgradeElement(spellKey, upgrade) {
    const upgradeElement = document.createElement('div');
    upgradeElement.className = 'upgrade';
    
    const upgradeIcon = document.createElement('img');
    upgradeIcon.src = upgrade.icon;
    upgradeIcon.alt = upgrade.name;
    upgradeIcon.className = 'upgrade-icon';
    if (!upgrade.unlocked) {
        upgradeIcon.classList.add('locked');
    }
    upgradeElement.appendChild(upgradeIcon);
    
    const upgradeInfo = document.createElement('div');
    upgradeInfo.className = 'upgrade-info';
    
    const upgradeName = document.createElement('h4');
    upgradeName.textContent = upgrade.name;
    upgradeInfo.appendChild(upgradeName);
    
    const upgradeDescription = document.createElement('p');
    upgradeDescription.textContent = upgrade.description;
    upgradeInfo.appendChild(upgradeDescription);
    
    if (!upgrade.unlocked) {
        const requiredLevel = document.createElement('p');
        requiredLevel.textContent = `Požadovaný level: ${upgrade.requiredLevel}`;
        requiredLevel.className = 'required-level';
        if (playerLevel < upgrade.requiredLevel) {
            requiredLevel.classList.add('not-met');
        }
        upgradeInfo.appendChild(requiredLevel);
    }
    
    upgradeElement.appendChild(upgradeInfo);
    
    const unlockButton = document.createElement('button');
    unlockButton.textContent = upgrade.unlocked ? 'Odemčeno' : 'Odemknout';
    unlockButton.disabled = upgrade.unlocked || playerLevel < upgrade.requiredLevel;
    unlockButton.onclick = () => unlockUpgrade(spellKey, upgrade, unlockButton, upgradeIcon);
    
    const costBadge = document.createElement('span');
    costBadge.className = 'cost-badge';
    costBadge.textContent = upgrade.cost || 1; // Předpokládáme, že výchozí cena je 1, pokud není specifikováno jinak
    unlockButton.appendChild(costBadge);
    
    upgradeElement.appendChild(unlockButton);
    
    return upgradeElement;
}

function unlockUpgrade(spellKey, upgrade, button, icon) {
    if (useSkillPoint()) {
        upgrade.unlocked = true;
        button.textContent = 'Odemčeno';
        button.disabled = true;
        icon.classList.remove('locked');
        
        if (spellKey === 'fireball' && upgrade.name === 'Inferno Touch') {
            enableFireballBurningEffect();
        }
        
        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
    }
}

function unlockSpell(spellKey, button) {
    const spell = skillTree[spellKey];
    if (playerLevel >= spell.requiredLevel && useSkillPoint(spell.cost)) {
        spell.level = 1;
        button.textContent = 'Odemčeno';
        button.disabled = true;
        
        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
        updateSkillbar(); // Přidáme volání této funkce, abychom aktualizovali skillbar
    }
}

// Funkce pro kontrolu, zda je kouzlo odemčené
export function isSpellUnlocked(spellName) {
    return skillTree[spellName].level > 0;
}

function enableFireballBurningEffect() {
    const fireballSpell = spells.find(spell => spell.name === 'Fireball');
    if (fireballSpell) {
        fireballSpell.burningEffect = true;
    }
}

export function initSkillTree() {
    loadSkillTreeProgress();
    document.addEventListener('keydown', (event) => {
        const activeElement = document.activeElement;
        const isInput =
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA";
        if (event.key === 'k' || event.key === 'K') {
            if (!isInput) {
                toggleSkillTree();
            }
        }
    });
}

function saveSkillTreeProgress() {
    localStorage.setItem('skillTree', JSON.stringify(skillTree));
}

export function loadSkillTreeProgress() {
    const savedSkillTree = localStorage.getItem('skillTree');
    if (savedSkillTree) {
        const parsedSkillTree = JSON.parse(savedSkillTree);
        Object.assign(skillTree, parsedSkillTree);
        updateSpellUpgrades(skillTree);
    }
}

function updateSkillPointsDisplay() {
    const skillPointsElement = document.getElementById('skillPoints');
    if (skillPointsElement) {
        skillPointsElement.textContent = `Dovednostní body: ${getSkillPoints()}`;
    }
}