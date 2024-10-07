import { getTranslation } from './langUtils.js';
import { addExperience, addGold, getPlayerLevel } from './player.js';
import { addItemToInventory, checkSpaceInInventory, createItem, createItemElement, getRarityColor } from './inventory.js';
import { getItemName } from './itemDatabase.js';
import { getAllQuests, sortQuestsByLevel } from './questDatabase.js';
import { showMessage } from './utils.js';
import { activateSoundBuffer, exitPointerLock, generateSpecificMaze, itemSoundBuffer, playSound, requestPointerLock, successSoundBuffer } from './main.js';

let quests = [];
let selectedQuest = null;
let availableQuests = []; // Nové questy k vyzvednutí
let completedQuestIds = []; // Již dokončené questy

export function initQuestSystem() {
    loadQuestsFromLocalStorage();
    checkQuestAvailability();
}

function saveQuestsToLocalStorage() {
    localStorage.setItem('quests', JSON.stringify(quests));
    localStorage.setItem('availableQuests', JSON.stringify(availableQuests));
    localStorage.setItem('completedQuestIds', JSON.stringify(completedQuestIds));
}

function loadQuestsFromLocalStorage() {
    const savedQuests = localStorage.getItem('quests');
    const savedAvailableQuests = localStorage.getItem('availableQuests');
    const savedCompletedQuestIds = localStorage.getItem('completedQuestIds');

    if (savedQuests) {
        quests = JSON.parse(savedQuests);
    }

    if (savedAvailableQuests) {
        availableQuests = JSON.parse(savedAvailableQuests);
    }

    if (savedCompletedQuestIds) {
        completedQuestIds = JSON.parse(savedCompletedQuestIds);
    }

    updateQuestList();
}

export function toggleQuestWindow() {
    const questWindow = document.getElementById('questWindow');
    if (questWindow) {
        if (questWindow.style.display === 'none') {
            exitPointerLock();
            questWindow.style.display = 'flex';
        } else {
            closeQuestWindow();
        }
    } else {
        exitPointerLock();
        createQuestWindow();
    }
}

export function closeQuestWindow() {
    const questWindow = document.getElementById('questWindow');
    if (questWindow) {
        requestPointerLock();
        questWindow.style.display = 'none';
    }
}



function createQuestWindow() {
    const questWindow = document.createElement('div');
    questWindow.id = 'questWindow';
    questWindow.className = 'quest-window';

    const questHeader = document.createElement('h1');
    questHeader.textContent = getTranslation('quests');
    questHeader.className = 'quest-header';

    const questContent = document.createElement('div');
    questContent.className = 'quest-content';

    const questList = document.createElement('div');
    questList.className = 'quest-list';

    const questDetails = document.createElement('div');
    questDetails.className = 'quest-details';

    questContent.appendChild(questList);
    questContent.appendChild(questDetails);

    questWindow.appendChild(questHeader);
    questWindow.appendChild(questContent);

    document.body.appendChild(questWindow);

    updateQuestList();
}

function updateQuestList() {
    const questList = document.querySelector('.quest-list');
    if (!questList)
        return;

    questList.innerHTML = '';

    // Seřazení questů podle úrovně před jejich zobrazením
    const sortedQuests = sortQuestsByLevel(quests);

    sortedQuests.forEach(quest => {
        const questItem = document.createElement('div');
        questItem.className = 'quest-item';
        questItem.innerHTML = `
            <span class="quest-name">${quest.name}</span>
            <span class="quest-level">${getTranslation('level')} ${quest.level}</span>
            <span class="quest-status ${quest.isCompleted ? 'completed' : ''}">${quest.isCompleted ? getTranslation('readyToComplete') : getTranslation('inProgress')}</span>
        `;
        questItem.addEventListener('click', () => selectQuest(quest));
        questList.appendChild(questItem);
    });
}

function selectQuest(quest) {
    selectedQuest = quest;
    updateQuestDetails();
}

function updateQuestDetails() {
    const questDetails = document.querySelector('.quest-details');
    if (!selectedQuest) {
        questDetails.innerHTML = '<p>' + getTranslation('selectQuest') + '</p>';
        return;
    }

    questDetails.innerHTML = `
        <div class="quest-details-content">
            <h2>${selectedQuest.name}</h2>
            <p>${selectedQuest.description}</p>
            <h3 style="margin-top: 40px;">${getTranslation('rewards')}:</h3>
            <div class="quest-reward">
                <img src="gold-coin.png" alt="Gold" class="quest-reward-icon">
                <span class="quest-reward-gold">${selectedQuest.rewards.gold.toLocaleString() + " " + getTranslation('gold')}</span>
            </div>
            <div class="quest-reward">
                <img src="experience.png" alt="EXP" class="quest-reward-icon">
                <span class="quest-reward-exp">${selectedQuest.rewards.exp.toLocaleString() + " " + getTranslation('exp')}</span>
            </div>
            <div class="quest-items"></div>
            <h3 style="margin-top: 20px;">${getTranslation('progress')}:</h3>
            <p>${selectedQuest.progress}</p>
        </div>
        <div class="quest-details-footer"></div>
    `;

    const questItems = questDetails.querySelector('.quest-items');
    selectedQuest.rewards.items.forEach(item => {
        const itemElement = createItemElement(item, false, true);
        itemElement.style.width = '64px';
        itemElement.style.height = '64px';
        questItems.appendChild(itemElement);
    });

    // Přidáme tlačítko pro přesun do konkrétního bludiště, pokud je to relevantní
    if (selectedQuest.objective.type === 'completeMazeWithoutMinimap' || selectedQuest.objective.type === "completeMaze") {
        const goToMazeButton = document.createElement('button');
        goToMazeButton.textContent = getTranslation('goToMaze');
        goToMazeButton.className = 'go-to-maze-button';
        goToMazeButton.onclick = () => {
            generateSpecificMaze(selectedQuest.objective.target, selectedQuest.objective.floor);
            toggleQuestWindow(); // Zavřeme okno úkolů
        };
        questDetails.querySelector('.quest-details-footer').appendChild(goToMazeButton);
    }
}

export function updateQuestProgress(questId, updateCallback) {
    const questIndex = quests.findIndex(q => q.id === questId);
    if (questIndex !== -1) {
        const updatedQuest = updateCallback(quests[questIndex]);
        quests[questIndex] = updatedQuest;
        if (quests[questIndex] === selectedQuest) {
            updateQuestDetails();
        }
        updateQuestList();
        saveQuestsToLocalStorage();

        // Zobrazení zprávy o postupu v úkolu
        showMessage(getTranslation('questProgressUpdate', updatedQuest.name, updatedQuest.progress), true, 5000);
    }
}

export function addQuest(quest) {
    quests.push(quest);
    updateQuestList();
    saveQuestsToLocalStorage();
}

export function checkQuestAvailability() {
    const playerLevel = getPlayerLevel();
    const previousAvailableQuestsCount = availableQuests.length;
    availableQuests = availableQuests.filter(quest => quest.level <= playerLevel);

    // Přidáme nové questy, pokud jsou k dispozici
    const allQuests = getAllQuests();
    allQuests.forEach(quest => {
        if (quest.level <= playerLevel &&
            !availableQuests.some(q => q.id === quest.id) &&
            !quests.some(q => q.id === quest.id) &&
            !completedQuestIds.includes(quest.id)) {
            availableQuests.push(quest);
        }
    });

    saveQuestsToLocalStorage();
    const questBoardWindow = document.getElementById('questBoardWindow');
    if (questBoardWindow) {
        updateQuestBoardUI();
    }

    // Zobrazení zprávy o nových dostupných úkolech
    if (availableQuests.length > previousAvailableQuestsCount) {
        showMessage(getTranslation('newQuestsAvailable'), true, 5000);
    }
}

export function completeQuest(questId) {
    const questIndex = quests.findIndex(q => q.id === questId);
    if (questIndex !== -1) {
        quests[questIndex].isCompleted = true;
        updateQuestList();
        if (quests[questIndex] === selectedQuest) {
            updateQuestDetails();
        }
        saveQuestsToLocalStorage();
    }
}

export function removeCompletedQuest(questId) {
    quests = quests.filter(q => q.id !== questId);
    updateQuestList();
    if (selectedQuest && selectedQuest.id === questId) {
        selectedQuest = null;
        updateQuestDetails();
    }
}

export function addAvailableQuest(quest) {
    availableQuests.push(quest);
    saveQuestsToLocalStorage();
}


export function getAvailableQuests() {
    return availableQuests;
}

export function acceptQuest(questId) {
    const questIndex = availableQuests.findIndex(q => q.id === questId);
    if (questIndex !== -1) {
        const quest = availableQuests.splice(questIndex, 1)[0];
        playSound(activateSoundBuffer);
        addQuest(quest);
        saveQuestsToLocalStorage();
    }
}

export function getCompletedQuests() {
    return quests.filter(q => q.isCompleted);
}

export function claimQuestReward(questId) {
    const questIndex = quests.findIndex(q => q.id === questId && q.isCompleted);
    if (questIndex !== -1) {
        const quest = quests[questIndex];

        //kontrola zda má hráč dostatek místa v batohu
        if (!checkSpaceInInventory(quest.rewards.items.length)) {
            return;
        }

        // Přidání odměn hráči
        addExperience(quest.rewards.exp);
        addGold(quest.rewards.gold);
        quest.rewards.items.forEach(item => {
            addItemToInventory(createItem(getItemName(item), item.count));
            showMessage("You have obtained: " + "<span style='color: " + getRarityColor(item.rarity) + "'>" + item.name + "</span>", true);
        });
        playSound(itemSoundBuffer);
        playSound(activateSoundBuffer);

        // Přidání questu do seznamu dokončených
        completedQuestIds.push(quest.id);

        // Odstranění questu z aktivních questů
        quests.splice(questIndex, 1);

        // Aktualizace UI
        updateQuestList();
        if (selectedQuest && selectedQuest.id === questId) {
            selectedQuest = null;
            updateQuestDetails();
        }

        saveQuestsToLocalStorage();
        return true;
    }
    return false;
}

// Funkce pro vytvoření a zobrazení UI nástěnky
export function createQuestBoardUI() {
    const questBoardWindow = document.createElement('div');
    questBoardWindow.id = 'questBoardWindow';
    questBoardWindow.className = 'quest-board-window';

    const availableQuestsList = document.createElement('div');
    availableQuestsList.className = 'available-quests-list';
    availableQuestsList.innerHTML = '<h2>' + getTranslation('availableQuests') + '</h2>';

    const completedQuestsList = document.createElement('div');
    completedQuestsList.className = 'completed-quests-list';
    completedQuestsList.innerHTML = '<h2>' + getTranslation('completedQuests') + '</h2>';

    const questDetails = document.createElement('div');
    questDetails.className = 'quest-board-details';

    questBoardWindow.appendChild(availableQuestsList);
    questBoardWindow.appendChild(completedQuestsList);
    questBoardWindow.appendChild(questDetails);

    document.body.appendChild(questBoardWindow);

    updateQuestBoardUI();
}

function updateQuestBoardUI() {
    const availableQuestsList = document.querySelector('.available-quests-list');
    const completedQuestsList = document.querySelector('.completed-quests-list');

    // Aktualizace dostupných questů
    availableQuestsList.innerHTML = '<h2>' + getTranslation('availableQuests') + '</h2>';
    const sortedAvailableQuests = sortQuestsByLevel(availableQuests);
    sortedAvailableQuests.forEach(quest => {
        const questItem = createQuestListItem(quest, 'accept');
        availableQuestsList.appendChild(questItem);
    });

    // Aktualizace dokončených questů
    completedQuestsList.innerHTML = '<h2>' + getTranslation('completedQuests') + '</h2>';
    const sortedCompletedQuests = sortQuestsByLevel(getCompletedQuests());
    sortedCompletedQuests.forEach(quest => {
        const questItem = createQuestListItem(quest, 'claim');
        completedQuestsList.appendChild(questItem);
    });

    // Vyčistíme detail questu
    const questDetails = document.querySelector(".quest-board-details");
    if (questDetails) {
        questDetails.innerHTML = "";
    }
}

function createQuestListItem(quest, action) {
    const questItem = document.createElement('div');
    questItem.className = 'quest-item';
    questItem.innerHTML = `
        <span class="quest-name">${quest.name}</span>
        <span class="quest-level">${getTranslation('level')} ${quest.level}</span>
    `;

    const actionButton = document.createElement('button');
    actionButton.textContent = getTranslation(action === 'accept' ? 'acceptQuest' : 'claimReward');
    actionButton.onclick = (e) => {
        if (action === 'accept') {
            acceptQuest(quest.id);
            e.preventDefault();
            e.stopPropagation()
        } else {
            claimQuestReward(quest.id);
            e.preventDefault();
            e.stopPropagation()
        }
        updateQuestBoardUI();
    };
    questItem.appendChild(actionButton);

    questItem.onclick = () => showQuestDetails(quest);

    return questItem;
}

function showQuestDetails(quest) {
    const questDetails = document.querySelector('.quest-board-details');
    questDetails.innerHTML = `
        <h2>${quest.name}</h2>
        <p>${quest.description}</p>
        <h3 style="margin-top: 40px;">${getTranslation('rewards')}:</h3>
        <div class="quest-reward">
            <img src="gold-coin.png" alt="Gold" class="quest-reward-icon">
            <span class="quest-reward-gold">${quest.rewards.gold.toLocaleString() + " " + getTranslation('gold')}</span>
        </div>
        <div class="quest-reward">
            <img src="experience.png" alt="EXP" class="quest-reward-icon">
            <span class="quest-reward-exp">${quest.rewards.exp.toLocaleString() + " " + getTranslation('exp')}</span>
        </div>
        <div class="quest-items"></div>
    `;

    const questItems = questDetails.querySelector('.quest-items');
    quest.rewards.items.forEach(item => {
        const itemElement = createItemElement(item, false, true);
        itemElement.style.width = '72px';
        itemElement.style.height = '72px';
        questItems.appendChild(itemElement);
    });
}

export function toggleQuestBoardUI() {
    const questBoardWindow = document.getElementById('questBoardWindow');
    if (questBoardWindow) {
        questBoardWindow.style.display = questBoardWindow.style.display === 'none' ? 'flex' : 'none';
        if (questBoardWindow.style.display === 'flex') {
            exitPointerLock();
            updateQuestBoardUI();
        } else {
            requestPointerLock();
        }
    } else {
        exitPointerLock();
        createQuestBoardUI();
    }
}

export function updateQuestsOnEvent(eventType, eventData) {
    switch (eventType) {
        case 'bossDeath':
            if (eventData.bossType === "fireDragon") {
                updateQuestProgress('killFireDragons', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            quests.forEach(quest => {
                if (quest.objective.type === 'killMultiple') {
                    const target = quest.objective.targets.find(t => t.translationKey === eventData.bossType);
                    if (target) {
                        target.current = Math.min(target.current + 1, target.count);
                        quest.progress = quest.objective.targets.map(t =>
                            `${getTranslation(t.translationKey)}: ${t.current}/${t.count}`
                        ).join(', ');
                        quest.isCompleted = quest.objective.targets.every(t => t.current >= t.count);
                        updateQuestProgress(quest.id, () => quest);
                    }
                }
            });
            break;
        case 'completeMazes':
            quests.forEach(quest => {
                if (quest.objective.type === 'completeMazes') {
                    if (!quest.objective.completedSeeds) {
                        quest.objective.completedSeeds = [];
                    }
                    if (!quest.objective.completedSeeds.includes(eventData.seed) &&
                        (!quest.objective.floor || quest.objective.floor === eventData.floor)) {
                        quest.objective.completedSeeds.push(eventData.seed);
                        quest.objective.current = quest.objective.completedSeeds.length;
                        quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                        if (quest.objective.current >= quest.objective.count) {
                            quest.isCompleted = true;
                        }
                        updateQuestProgress(quest.id, () => quest);
                    }
                }
            });
            break;
        case 'mazeCompletion':
            if (eventData.seed === "158" && eventData.floor === 1) {
                updateQuestProgress('completeMaze158', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.seed === "444" && eventData.floor === 2 && !eventData.usedMinimap) {
                updateQuestProgress('completeMaze444WithoutMinimap', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.seed === "Black" && eventData.floor === 3 && !eventData.usedMinimap) {
                updateQuestProgress('completeMazeBlackWithoutMinimap', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.seed === "Quantum" && eventData.floor === 4 && !eventData.usedMinimap) {
                updateQuestProgress('completeMazeQuantumWithoutMinimap', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.seed === "Clock" && eventData.floor === 5 && !eventData.usedMinimap) {
                updateQuestProgress('completeMazeClockWithoutMinimap', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            break;
        case 'mainBossDeath':
            if (eventData.bossType === "bossFloor1") {
                updateQuestProgress('defeatShadowDemon', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            } else if (eventData.bossType === "bossFloor2") {
                updateQuestProgress('defeatJungleGuardian', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            } else if (eventData.bossType === "bossFloor3") {
                updateQuestProgress('defeatObsidaroth', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor4") {
                updateQuestProgress('defeatQuantumGuardian', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor5") {
                updateQuestProgress('defeatChronos', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor6") {
                updateQuestProgress('defeatToxicus', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor7") {
                updateQuestProgress('defeatFrostlord', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor8") {
                updateQuestProgress('defeatFlamelord', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor9") {
                updateQuestProgress('defeatArcaneLord', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor10") {
                updateQuestProgress('defeatBloodMage', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            else if (eventData.bossType === "bossFloor11") {
                updateQuestProgress('defeatThunderlord', (quest) => {
                    quest.objective.current++;
                    quest.progress = `${quest.objective.current}/${quest.objective.count}`;
                    if (quest.objective.current >= quest.objective.count) {
                        quest.isCompleted = true;
                    }
                    return quest;
                });
            }
            break;

    }
}