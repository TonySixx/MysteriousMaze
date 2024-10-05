import { baseAttackBonus, calculateTotalSkillPoints, setSkillPoints, useSkillPoint } from './player.js';
import frostboltIcon from './public/spells/frostbolt-icon.png';
import arcaneMissileIcon from './public/spells/arcane-missile-icon.png';
import iceExplosionIcon from './public/spells/ice-explosion-icon.png';
import multiShotIcon from './public/spells/multi-shot-icon.png';
import fireballIcon from './public/spells/fireball-icon.png';
import infernoTouchIcon from './public/spells/inferno-touch-icon.png';
import chainLightningIcon from './public/spells/chain-lightning-icon.png';
import chainExplosionIcon from './public/spells/chain-explosion-icon.png';
import frostAuraIcon from './public/spells/frost-aura-icon.png';
import explosiveCoreIcon from './public/spells/explosive-core-icon.png';
import teleportIcon from './public/spells/teleport-icon.png';
import { updateSkillbar, updateSpellUpgrades } from './spells.js';
import { getSkillPoints } from './player.js';
import { activateSoundBuffer, exitPointerLock, playSound, requestPointerLock } from './main.js';
import { getTranslation } from './langUtils.js';

let skillTreeModal = null;

export var skillTree = {
    fireball: {
        name: 'Fireball',
        systemName: 'fireball',
        level: 1,
        maxLevel: 18,
        description: 'Základní ohnivý útok',
        icon: fireballIcon,
        baseDamage: 100,
        damageIncreasePerLevel: [20, 30, 40, 60, 80, 100, 120, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65],
        requiredPlayerLevelPerLevel: [1, 2, 5, 7, 9, 11, 13, 15, 17, 20, 24, 28, 33, 39, 45, 51, 57, 60],
        upgrades: [
            {
                name: 'Inferno Touch',
                systemName: 'infernoTouch',
                description: 'Zasažený nepřítel hoří 2 sekundy, každých 0.5s ztrácí 20 životů + 10% z poškození hráče',
                requiredLevel: 3,
                cost: 1,
                unlocked: false,
                icon: infernoTouchIcon
            },
            {
                name: 'Explosive Core',
                systemName: 'explosiveCore',
                description: 'Při zásahu cíle Fireball exploduje a způsobí 50% svého poškození všem nepřátelům v okruhu 3 metrů',
                requiredLevel: 10,
                cost: 2,
                unlocked: false,
                icon: explosiveCoreIcon
            }
        ]
    },
    frostbolt: {
        name: 'Frostbolt',
        systemName: 'frostbolt',
        level: 1,
        maxLevel: 16,
        baseDamage: 50,
        damageIncreasePerLevel: [20, 30, 40, 50, 35, 35, 35, 35, 35, 35, 35],
        description: 'Mrazivý útok, který zmrazí nepřítele na 2 sekundy',
        icon: frostboltIcon,
        requiredPlayerLevelPerLevel: [1, 4, 7, 10, 13, 16, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55],
        upgrades: [
            {
                name: 'Ice Explosion',
                systemName: 'iceExplosion',
                description: 'Při zásahu cíle frostbolt exploduje a vytvoří ledovou vlnu, která zmrazí všechny nepřátele v okruhu 3 metrů na 1 sekundu a způsobí jim 50 poškození',
                requiredLevel: 5,
                cost: 1,
                unlocked: false,
                icon: iceExplosionIcon
            },
            {
                name: 'Mrazivá aura',
                systemName: 'frostAura',
                description: 'Vytvoří kolem hráče mrazivou auru o poloměru 5 metrů, která zpomaluje všechny nepřátele uvnitř o 30% po dobu 5 sekund',
                requiredLevel: 12,
                cost: 2,
                unlocked: false,
                icon: frostAuraIcon
            }
        ]
    },
    arcaneMissile: {
        name: 'Arcane Missile',
        systemName: 'arcaneMissile',
        level: 1,
        maxLevel: 15,
        description: 'Rychlý magický projektil',
        icon: arcaneMissileIcon,
        baseDamage: 50,
        damageIncreasePerLevel: [10, 20, 30, 40, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25],
        requiredPlayerLevelPerLevel: [1, 3, 6, 9, 12, 15, 18, 22, 26, 30, 34, 38, 42, 46, 50],
        upgrades: [
            {
                name: 'Multi-shot',
                systemName: 'multiShot',
                description: 'Při seslání kouzla se vytvoří 3 magické střely místo jedné. Každá střela má 70% síly původního kouzla a může zasáhnout různé cíle',
                requiredLevel: 7,
                unlocked: false,
                cost: 3,
                icon: multiShotIcon
            }
        ]
    },
    chainLightning: {
        name: 'Chain Lightning',
        systemName: 'chainLightning',
        level: 0,
        maxLevel: 17,
        baseDamage: 300,
        damageIncreasePerLevel: [50, 100, 150, 200, 250, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
        description: 'Blesk, který přeskakuje mezi nepřáteli',
        icon: chainLightningIcon,
        requiredLevel: 10,
        cost: 1,
        requiredPlayerLevelPerLevel: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 60],
        upgrades: [
            {
                name: 'Chain Explosion',
                systemName: 'chainExplosion',
                description: 'Poslední zasažený nepřítel exploduje a způsobí 100 poškození všem nepřátelům v okruhu 5 metrů',
                requiredLevel: 15,
                unlocked: false,
                icon: chainExplosionIcon,
                cost: 2
            }
        ]
    },
    teleport: {
        name: 'Teleport',
        systemName: 'teleport',
        level: 0,
        maxLevel: 1,
        description: 'Teleportuje hráče na krátkou vzdálenost ve směru pohybu',
        icon: teleportIcon,
        requiredLevel: 21,
        cost: 3,
        damageIncreasePerLevel: [0],
        requiredPlayerLevelPerLevel: [21],
        upgrades: [],
        baseDamage: 0,
        hideDamage:true
    },
};
export const defaultSkillTree = structuredClone(skillTree);

export function toggleSkillTree() {
    if (skillTreeModal && skillTreeModal.style.display === 'block') {
        closeSkillTree();
    } else {
        showSkillTree();
    }
}

function updateSkillPointsDisplay() {
    const skillPointsElement = document.getElementById('skillPoints');
    if (skillPointsElement) {
        skillPointsElement.textContent = getTranslation('skillPoints', getSkillPoints());
    }
}

function showSkillTree() {
    exitPointerLock();
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
    title.textContent = getTranslation('skillTree');
    content.appendChild(title);

    const skillPointsDisplay = document.createElement('p');
    skillPointsDisplay.id = 'skillPoints';
    content.appendChild(skillPointsDisplay);

    const skillTreeContainer = document.createElement('div');
    skillTreeContainer.className = 'skill-tree-container';

    const leftArrow = document.createElement('button');
    leftArrow.className = 'scroll-arrow left';
    leftArrow.innerHTML = '&lt;';
    leftArrow.onclick = () => scrollSkillTree('left');

    const rightArrow = document.createElement('button');
    rightArrow.className = 'scroll-arrow right';
    rightArrow.innerHTML = '&gt;';
    rightArrow.onclick = () => scrollSkillTree('right');

    content.appendChild(leftArrow);
    content.appendChild(rightArrow);

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

function scrollSkillTree(direction) {
    const container = document.querySelector('.skill-tree-container');
    const scrollAmount = 250; // Můžete upravit podle potřeby
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}


function closeSkillTree() {
    requestPointerLock();
    if (skillTreeModal) {
        skillTreeModal.style.display = 'none';
        skillTreeModal.remove();
        skillTreeModal = null;
    }
}

function createSpellElement(spellKey, spell) {
    const spellElement = document.createElement('div');
    spellElement.className = 'spell';
    spellElement.dataset.spellKey = spellKey;

    const spellIcon = document.createElement('img');
    spellIcon.src = spell.icon;
    spellIcon.alt = spell.name;
    spellIcon.className = 'spell-icon';
    if (spell.level === 0) {
        spellIcon.classList.add('locked');
    }
    spellElement.appendChild(spellIcon);

    // Tlačítko pro odemčení nebo vylepšení
    const unlockOrUpgradeButtonDiv = document.createElement('div');
    unlockOrUpgradeButtonDiv.style.textAlign = 'center';
    spellElement.appendChild(unlockOrUpgradeButtonDiv);
    const unlockOrUpgradeButton = createUnlockOrUpgradeButton(spellKey, spell);
    unlockOrUpgradeButtonDiv.appendChild(unlockOrUpgradeButton);

    const spellInfo = document.createElement('div');
    spellInfo.className = 'spell-info';

    const spellName = document.createElement('h3');
    spellName.textContent = getTranslation(spell.systemName);
    spellInfo.appendChild(spellName);

    const spellDescription = document.createElement('p');
    spellDescription.textContent = getTranslation(spell.systemName + 'Description');
    spellInfo.appendChild(spellDescription);

    // Element pro požadovanou úroveň (použijeme existující)
    const requiredLevelElement = document.createElement('p');
    requiredLevelElement.className = 'required-level';
    spellInfo.appendChild(requiredLevelElement);

    updateRequiredLevelElement(spellKey, spell, requiredLevelElement);

    const spellLevel = document.createElement('p');
    spellLevel.className = "spell-level";
    spellLevel.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
    spellInfo.appendChild(spellLevel);

    if (!spell.hideDamage) {
        const spellDamage = document.createElement('p');
        spellDamage.className = "spell-damage";
        spellDamage.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));
        spellInfo.appendChild(spellDamage);
    }

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

    return spellElement;
}

function updateRequiredLevelElement(spellKey, spell, requiredLevelElement) {
    if (spell.level === 0 && spell.requiredLevel) {
        requiredLevelElement.textContent = getTranslation('requiredLevel', spell.requiredLevel);
        if (playerLevel < spell.requiredLevel) {
            requiredLevelElement.classList.add('not-met');
        } else {
            requiredLevelElement.classList.remove('not-met');
        }
    } else if (spell.level < spell.maxLevel) {
        const nextRequiredPlayerLevel = spell.requiredPlayerLevelPerLevel[spell.level];
        requiredLevelElement.textContent = getTranslation('requiredLevel', nextRequiredPlayerLevel);
        if (playerLevel < nextRequiredPlayerLevel) {
            requiredLevelElement.classList.add('not-met');
        } else {
            requiredLevelElement.classList.remove('not-met');
        }
    } else {
        requiredLevelElement.textContent = '';
    }
}

function createUnlockOrUpgradeButton(spellKey, spell) {
    const unlockOrUpgradeButton = document.createElement('button');
    const skillPoints = getSkillPoints();

    if (spell.level === 0) {
        unlockOrUpgradeButton.textContent = getTranslation('unlock');
        unlockOrUpgradeButton.disabled = skillPoints < spell.cost || !canUnlockSpell(spellKey);
        unlockOrUpgradeButton.onclick = () => unlockSpell(spellKey, unlockOrUpgradeButton);
    } else if (spell.level < spell.maxLevel) {
        const requiredPlayerLevel = spell.requiredPlayerLevelPerLevel[spell.level];
        unlockOrUpgradeButton.textContent = getTranslation('upgrade');
        unlockOrUpgradeButton.disabled = skillPoints < 1 || playerLevel < requiredPlayerLevel;
        unlockOrUpgradeButton.onclick = () => upgradeSpell(spellKey, unlockOrUpgradeButton);
    } else {
        unlockOrUpgradeButton.textContent = getTranslation('maxLevel');
        unlockOrUpgradeButton.disabled = true;
        return unlockOrUpgradeButton;
    }

    const costBadge = document.createElement('span');
    costBadge.className = 'cost-badge';
    costBadge.textContent = spell.cost || 1;
    unlockOrUpgradeButton.appendChild(costBadge);

    return unlockOrUpgradeButton;
}

function updateAllButtons() {
    const skillPoints = getSkillPoints();

    Object.entries(skillTree).forEach(([spellKey, spell]) => {
        const spellElement = skillTreeModal.querySelector(`.spell[data-spell-key="${spellKey}"]`);
        if (!spellElement) return;

        const spellButton = spellElement.querySelector('button');
        if (spellButton) {
            if (spell.level === 0) {
                spellButton.disabled = skillPoints < spell.cost || !canUnlockSpell(spellKey);
            } else if (spell.level < spell.maxLevel) {
                const requiredPlayerLevel = spell.requiredPlayerLevelPerLevel[spell.level];
                spellButton.disabled = skillPoints < 1 || playerLevel < requiredPlayerLevel;
            }
        }

        // Aktualizace požadované úrovně
        const requiredLevelElement = spellElement.querySelector('.required-level');
        if (requiredLevelElement) {
            updateRequiredLevelElement(spellKey, spell, requiredLevelElement);
        }

        // Aktualizace tlačítek pro vylepšení
        spell.upgrades.forEach(upgrade => {
            const upgradeElement = spellElement.querySelector(`.upgrade[data-upgrade-name="${upgrade.name}"]`);
            if (!upgradeElement) return;

            const upgradeButton = upgradeElement.querySelector('button');
            if (upgradeButton && !upgrade.unlocked) {
                upgradeButton.disabled = playerLevel < upgrade.requiredLevel || skillPoints < upgrade.cost || !canUnlockUpgrade(spellKey, upgrade);
            }
        });
    });
}

function createUpgradeElement(spellKey, upgrade) {
    const upgradeElement = document.createElement('div');
    upgradeElement.className = 'upgrade';
    upgradeElement.dataset.upgradeName = upgrade.name;

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
    upgradeName.textContent = getTranslation(upgrade.systemName);
    upgradeInfo.appendChild(upgradeName);

    const upgradeDescription = document.createElement('p');
    upgradeDescription.textContent = getTranslation(upgrade.systemName + 'Description');
    upgradeInfo.appendChild(upgradeDescription);

    const requiredLevel = document.createElement('p');
    requiredLevel.textContent = getTranslation('requiredLevel', upgrade.requiredLevel);
    requiredLevel.className = 'required-level';
    if (playerLevel < upgrade.requiredLevel) {
        requiredLevel.classList.add('not-met');
    }
    upgradeInfo.appendChild(requiredLevel);

    upgradeElement.appendChild(upgradeInfo);

    const skillPoints = getSkillPoints();
    const unlockButton = document.createElement('button');
    unlockButton.textContent = upgrade.unlocked ? getTranslation('unlocked') : getTranslation('unlock');
    unlockButton.disabled = upgrade.unlocked || playerLevel < upgrade.requiredLevel || skillPoints < upgrade.cost || !canUnlockUpgrade(spellKey, upgrade);
    unlockButton.onclick = () => unlockUpgrade(spellKey, upgrade, unlockButton, upgradeIcon);

    if (!upgrade.unlocked) {
        const costBadge = document.createElement('span');
        costBadge.className = 'cost-badge';
        costBadge.textContent = upgrade.cost || 1;
        unlockButton.appendChild(costBadge);
    }

    upgradeElement.appendChild(unlockButton);

    return upgradeElement;
}

function unlockUpgrade(spellKey, upgrade, button, icon) {
    if (useSkillPoint(upgrade.cost)) {
        playSound(activateSoundBuffer);
        upgrade.unlocked = true;
        button.textContent = getTranslation('unlocked');
        button.disabled = true;
        icon.classList.remove('locked');

        // Zde můžete přidat specifické efekty pro odemčené vylepšení

        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
        updateSkillPointsDisplay();
        updateAllButtons();
    }
}

function unlockSpell(spellKey, button) {
    const spell = skillTree[spellKey];
    if (playerLevel >= spell.requiredLevel && useSkillPoint(spell.cost)) {
        spell.level = 1;
        playSound(activateSoundBuffer);
        if (spell.level < spell.maxLevel) {
            button.innerHTML = getTranslation('upgrade') + "<span class='cost-badge'>1</span>";
            button.disabled = getSkillPoints() < 1 || playerLevel < spell.requiredPlayerLevelPerLevel[spell.level];
            button.onclick = () => upgradeSpell(spellKey, button);
        } else {
            button.textContent = getTranslation('maxLevel');
            button.disabled = true;
        }
        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
        updateSkillbar();
        updateSkillPointsDisplay();
        updateAllButtons();

        // Aktualizace zobrazení úrovně a poškození kouzla
        const spellElement = button.closest('.spell');
        const levelElement = spellElement.querySelector('.spell-info .spell-level');
        const damageElement = spellElement.querySelector('.spell-info .spell-damage');
        const spellIcon = spellElement.querySelector('.spell-icon');
        spellIcon.classList.remove('locked');   

        if (levelElement) levelElement.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
        if (damageElement) damageElement.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));

        // Aktualizace požadované úrovně
        const requiredLevelElement = spellElement.querySelector('.required-level');
        if (requiredLevelElement) {
            updateRequiredLevelElement(spellKey, spell, requiredLevelElement);
        }
    }
}

function upgradeSpell(spellKey, button) {
    const spell = skillTree[spellKey];
    const requiredPlayerLevel = spell.requiredPlayerLevelPerLevel[spell.level];

    if (playerLevel < requiredPlayerLevel) {
        alert(getTranslation('insufficientPlayerLevel', requiredPlayerLevel));
        return;
    }

    if (spell.level < spell.maxLevel && useSkillPoint(spell.cost)) {
        spell.level++;
        playSound(activateSoundBuffer);

        if (spell.level === spell.maxLevel) {
            button.textContent = getTranslation('maxLevel');
            button.disabled = true;
        } else {
            const nextRequiredLevel = spell.requiredPlayerLevelPerLevel[spell.level];
            button.disabled = getSkillPoints() < 1 || playerLevel < nextRequiredLevel;
        }

        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
        updateSkillPointsDisplay();
        updateAllButtons();

        // Aktualizace zobrazení úrovně a poškození kouzla
        const spellElement = button.closest('.spell');
        const levelElement = spellElement.querySelector('.spell-info .spell-level');
        const damageElement = spellElement.querySelector('.spell-info .spell-damage');

        if (levelElement) levelElement.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
        if (damageElement) damageElement.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));

        // Aktualizace požadované úrovně
        const requiredLevelElement = spellElement.querySelector('.required-level');
        if (requiredLevelElement) {
            updateRequiredLevelElement(spellKey, spell, requiredLevelElement);
        }
    }
}

export function isSpellUnlocked(spellName) {
    return skillTree[spellName].level > 0;
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

function canUnlockSpell(spellKey) {
    const spell = skillTree[spellKey];
    return playerLevel >= spell.requiredLevel;
}

function canUnlockUpgrade(spellKey, upgrade) {
    const spell = skillTree[spellKey];
    if (spell.level === 0) return false;
    const upgradeIndex = spell.upgrades.indexOf(upgrade);
    if (upgradeIndex === 0) return true;
    return spell.upgrades[upgradeIndex - 1].unlocked;
}

export function resetSkillTree() {
    skillTree = structuredClone(defaultSkillTree);
    saveSkillTreeProgress();
    updateSpellUpgrades(skillTree);
    updateSkillbar();
  }
  
  export function resetSkillPoints() {
    setSkillPoints(calculateTotalSkillPoints(playerLevel));
    updateSkillPointsDisplay();
  }

export function calculateSpellDamage(spell) {
    let totalDamage = spell.baseDamage + baseAttackBonus;
    for (let i = 0; i < spell.level - 1; i++) {
        totalDamage += spell.damageIncreasePerLevel[i] || 0;
    }
    return totalDamage;
}