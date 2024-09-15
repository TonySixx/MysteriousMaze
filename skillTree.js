import { playerLevel, useSkillPoint } from './player.js';
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
import { spells, updateSpellUpgrades } from './spells.js';
import { getSkillPoints } from './player.js';
import { updateSkillbar } from './main.js';
import { getTranslation } from './langUtils.js';

let skillTreeModal = null;

export const skillTree = {
    fireball: {
        name: 'Fireball',
        systemName: 'fireball',
        level: 1,
        maxLevel: 8,
        description: 'Základní ohnivý útok',
        icon: fireballIcon,
        baseDamage: 100,
        damageIncreasePerLevel: [20, 30, 40, 60, 80, 100, 120],
        upgrades: [
            {
                name: 'Inferno Touch',
                systemName: 'infernoTouch',
                description: 'Zasažený nepřítel hoří 2 sekundy, každých 0.5s ztrácí 20 životů',
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
                icon: explosiveCoreIcon // Zde by měla být nová ikona pro vylepšení
            }
        ]
    },
    frostbolt: {
        name: 'Frostbolt',
        systemName: 'frostbolt',
        level: 1,
        maxLevel: 5,
        baseDamage: 0,
        damageIncreasePerLevel: [20, 30, 40, 50],
        description: 'Mrazivý útok, který zmrazí nepřítele na 2 sekundy',
        icon: frostboltIcon,
        upgrades: [
            {
                name: 'Ice Explosion',
                systemName: 'iceExplosion',
                description: 'Při zásahu cíle frostbolt exploduje a vytvoří ledovou vlnu, která zmrazí všechny nepřátele v okruhu 3 metrů na 1 sekundu a způsobí jim 50 poškození',
                requiredLevel: 5,
                cost: 1,
                unlocked: false,
                icon: iceExplosionIcon // Zde by měla být nová ikona pro vylepšení
            },
            {
                name: 'Mrazivá aura',
                systemName: 'frostAura',
                description: 'Vytvoří kolem hráče mrazivou auru o poloměru 5 metrů, která zpomaluje všechny nepřátele uvnitř o 30% po dobu 5 sekund',
                requiredLevel: 12,
                cost: 2,
                unlocked: false,
                icon: frostAuraIcon // Zde by měla být nová ikona pro vylepšení
            }
        ]
    },
    arcaneMissile: {
        name: 'Arcane Missile',
        systemName: 'arcaneMissile',
        level: 1,
        maxLevel: 6,
        description: 'Rychlý magický projektil',
        icon: arcaneMissileIcon,
        baseDamage: 50,
        damageIncreasePerLevel: [10, 20, 30, 40, 50],
        upgrades: [
            {
                name: 'Multi-shot',
                systemName: 'multiShot',
                description: 'Při seslání kouzla se vytvoří 3 magické střely místo jedné. Každá střela má 70% síly původního kouzla a může zasáhnout různé cíle',
                requiredLevel: 7,
                unlocked: false,
                cost: 2,
                icon: multiShotIcon // Zde by měla být nová ikona pro vylepšení
            }
        ]
    },
    chainLightning: {
        name: 'Chain Lightning',
        systemName: 'chainLightning',
        level: 0,
        maxLevel: 5,
        baseDamage: 300,
        damageIncreasePerLevel: [50, 100, 150, 200, 250],
        description: 'Blesk, který přeskakuje mezi nepřáteli',
        icon: chainLightningIcon,
        requiredLevel: 10,
        cost: 1, // Cena v dovednostních bodech
        upgrades: [
            {
                name: 'Chain Explosion',
                systemName: 'chainExplosion',
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

// Přidejte tuto funkci na začátek souboru
function updateSkillPointsDisplay() {
    const skillPointsElement = document.getElementById('skillPoints');
    if (skillPointsElement) {
        skillPointsElement.textContent = getTranslation('skillPoints', getSkillPoints());
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
    title.textContent = getTranslation('skillTree');
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
    spellElement.dataset.spellKey = spellKey;

    const spellIcon = document.createElement('img');
    spellIcon.src = spell.icon;
    spellIcon.alt = spell.name;
    spellIcon.className = 'spell-icon';
    if (spellKey === 'chainLightning' && spell.level === 0) {
        spellIcon.classList.add('locked');
    }
    spellElement.appendChild(spellIcon);

    // Přidáme tlačítko pro odemčení nebo vylepšení kouzla hned pod ikonu
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

    // Přidáme podmínku pro zobrazení požadovaného levelu
    if (spell.level === 0 && spell.requiredLevel) {
        const requiredLevel = document.createElement('p');
        requiredLevel.textContent = getTranslation('requiredLevel', spell.requiredLevel);
        requiredLevel.className = 'required-level';
        if (playerLevel < spell.requiredLevel) {
            requiredLevel.classList.add('not-met');
        }
        spellInfo.appendChild(requiredLevel);
    }

    const spellLevel = document.createElement('p');
    spellLevel.className = "spell-level"
    spellLevel.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
    spellInfo.appendChild(spellLevel);

    const spellDamage = document.createElement('p');
    spellDamage.className = "spell-damage"
    spellDamage.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));
    spellInfo.appendChild(spellDamage)

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

function createUnlockOrUpgradeButton(spellKey, spell) {
    const unlockOrUpgradeButton = document.createElement('button');
    const skillPoints = getSkillPoints();

    if (spell.level === 0) {
        unlockOrUpgradeButton.textContent = getTranslation('unlock');
        unlockOrUpgradeButton.disabled = skillPoints < spell.cost || !canUnlockSpell(spellKey);
        unlockOrUpgradeButton.onclick = () => unlockSpell(spellKey, unlockOrUpgradeButton);
    } else if (spell.level < spell.maxLevel) {
        unlockOrUpgradeButton.textContent = getTranslation('upgrade');
        unlockOrUpgradeButton.disabled = skillPoints < 1;
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
                spellButton.disabled = skillPoints < 1;
            }
        }

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

    if (!upgrade.unlocked) {
        const requiredLevel = document.createElement('p');
        requiredLevel.textContent = getTranslation('requiredLevel', upgrade.requiredLevel);
        requiredLevel.className = 'required-level';
        if (playerLevel < upgrade.requiredLevel) {
            requiredLevel.classList.add('not-met');
        }
        upgradeInfo.appendChild(requiredLevel);
    }

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
        upgrade.unlocked = true;
        button.textContent = getTranslation('unlocked');
        button.disabled = true;
        icon.classList.remove('locked');

        if (spellKey === 'fireball' && upgrade.name === 'Inferno Touch') {
            enableFireballBurningEffect();
        }

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
        if (spell.level < spell.maxLevel) {
            button.textContent = getTranslation('upgrade');
            button.disabled = getSkillPoints() < 1;
            button.onclick = () => upgradeSpell(spellKey, button);
        }
        else {
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
        const levelElement = spellElement.querySelector('.spell-info p:nth-child(3)');
        const damageElement = spellElement.querySelector('.spell-info p:nth-child(4)');

        if (levelElement) levelElement.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
        if (damageElement) damageElement.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));
    }
}

function upgradeSpell(spellKey, button) {
    const spell = skillTree[spellKey];
    if (spell.level < spell.maxLevel && useSkillPoint(spell.cost)) {
        spell.level++;

        if (spell.level === spell.maxLevel) {
            button.textContent = getTranslation('maxLevel');
            button.disabled = true;
        } else {
            button.disabled = getSkillPoints() < 1;
        }

        saveSkillTreeProgress();
        updateSpellUpgrades(skillTree);
        updateSkillPointsDisplay();
        updateAllButtons();

        // Aktualizace zobrazení úrovně a poškození kouzla
        const spellElement = button.closest('.spell');
        const levelElement = spellElement.querySelector('.spell-info p:nth-child(3)');
        const damageElement = spellElement.querySelector('.spell-info p:nth-child(4)');

        if (levelElement) levelElement.textContent = getTranslation('spellLevel', spell.level, spell.maxLevel);
        if (damageElement) damageElement.textContent = getTranslation('spellDamage', calculateSpellDamage(spell));
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



// Nová pomocná funkce pro kontrolu, zda lze odemknout kouzlo
function canUnlockSpell(spellKey) {
    const spell = skillTree[spellKey];
    return playerLevel >= spell.requiredLevel;
}

// Nová pomocná funkce pro kontrolu, zda lze odemknout vylepšení
function canUnlockUpgrade(spellKey, upgrade) {
    const spell = skillTree[spellKey];
    if (spell.level === 0) return false;
    const upgradeIndex = spell.upgrades.indexOf(upgrade);
    if (upgradeIndex === 0) return true;
    return spell.upgrades[upgradeIndex - 1].unlocked;
}


export function calculateSpellDamage(spell) {
    let totalDamage = spell.baseDamage;
    for (let i = 0; i < spell.level - 1; i++) {
        totalDamage += spell.damageIncreasePerLevel[i] || 0;
    }
    return totalDamage;
}