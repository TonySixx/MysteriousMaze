import { getTranslation } from './langUtils.js';
import { addExperience, addGold, getPlayerLevel } from './player.js';
import { addItemToInventory, createItem, createItemElement } from './inventory.js';
import { getItemName } from './itemDatabase.js';

let quests = [];
let selectedQuest = null;
let availableQuests = []; // Nové questy k vyzvednutí

export function initQuestSystem() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'u' || event.key === 'U') {
            toggleQuestWindow();
        }
    });
}

function toggleQuestWindow() {
    const questWindow = document.getElementById('questWindow');
    if (questWindow) {
        questWindow.style.display = questWindow.style.display === 'none' ? 'flex' : 'none';
    } else {
        createQuestWindow();
    }
}

function createQuestWindow() {
    const questWindow = document.createElement('div');
    questWindow.id = 'questWindow';
    questWindow.className = 'quest-window';

    const questList = document.createElement('div');
    questList.className = 'quest-list';

    const questDetails = document.createElement('div');
    questDetails.className = 'quest-details';

    questWindow.appendChild(questList);
    questWindow.appendChild(questDetails);

    document.body.appendChild(questWindow);

    updateQuestList();
}

function updateQuestList() {
    const questList = document.querySelector('.quest-list');
    if (!questList)
        return;

    questList.innerHTML = '';

    quests.forEach(quest => {
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
        <h2>${selectedQuest.name}</h2>
        <p>${selectedQuest.description}</p>
        <h3 style="margin-top: 50px;">${getTranslation('rewards')}:</h3>
        <ul>
            <li>${getTranslation('exp')}: ${selectedQuest.rewards.exp}</li>
            <li>${getTranslation('gold')}: ${selectedQuest.rewards.gold}</li>
        </ul>
        <div class="quest-items"></div>
        <h3 style="margin-top: 20px;">${getTranslation('progress')}:</h3>
        <p>${selectedQuest.progress}</p>
    `;

    const questItems = questDetails.querySelector('.quest-items');
    selectedQuest.rewards.items.forEach(item => {
        const itemElement = createItemElement(item,false,true);
        questItems.appendChild(itemElement);
    });
}

export function addQuest(quest) {
    quests.push(quest);
    updateQuestList();
}

export function updateQuestProgress(questId, updateCallback) {
    const questIndex = quests.findIndex(q => q.id === questId);
    if (questIndex !== -1) {
        quests[questIndex] = updateCallback(quests[questIndex]);
        if (quests[questIndex] === selectedQuest) {
            updateQuestDetails();
        }
        updateQuestList();
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
}

export function getAvailableQuests() {
    return availableQuests;
}

export function acceptQuest(questId) {
    const questIndex = availableQuests.findIndex(q => q.id === questId);
    if (questIndex !== -1) {
        const quest = availableQuests.splice(questIndex, 1)[0];
        addQuest(quest);
    }
}

export function getCompletedQuests() {
    return quests.filter(q => q.isCompleted);
}

export function claimQuestReward(questId) {
    const questIndex = quests.findIndex(q => q.id === questId && q.isCompleted);
    if (questIndex !== -1) {
        const quest = quests[questIndex];
        
        // Přidání odměn hráči
        addExperience(quest.rewards.exp);
        addGold(quest.rewards.gold);
        quest.rewards.items.forEach(item =>  addItemToInventory(createItem(getItemName(drop.item),item.count)));

        // Odstranění questu z aktivních questů
        quests.splice(questIndex, 1);

        // Aktualizace UI
        updateQuestList();
        if (selectedQuest && selectedQuest.id === questId) {
            selectedQuest = null;
            updateQuestDetails();
        }

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
    availableQuests.forEach(quest => {
        const questItem = createQuestListItem(quest, 'accept');
        availableQuestsList.appendChild(questItem);
    });

    // Aktualizace dokončených questů
    completedQuestsList.innerHTML = '<h2>' + getTranslation('completedQuests') + '</h2>';
    getCompletedQuests().forEach(quest => {
        const questItem = createQuestListItem(quest, 'claim');
        completedQuestsList.appendChild(questItem);
    });
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
    actionButton.onclick = () => {
        if (action === 'accept') {
            acceptQuest(quest.id);
        } else {
            claimQuestReward(quest.id);
        }
        updateQuestBoardUI();
    };
    questItem.appendChild(actionButton);

    questItem.onclick = () => showQuestDetails(quest);

    return questItem;
}

function showQuestDetails(quest) {
    const questDetails = document.querySelector('.quest-details');
    questDetails.innerHTML = `
        <h2>${quest.name}</h2>
        <p>${quest.description}</p>
        <h3>${getTranslation('rewards')}:</h3>
        <ul>
            <li>${getTranslation('exp')}: ${quest.rewards.exp}</li>
            <li>${getTranslation('gold')}: ${quest.rewards.gold}</li>
        </ul>
        <div class="quest-items"></div>
    `;

    const questItems = questDetails.querySelector('.quest-items');
    quest.rewards.items.forEach(item => {
        const itemElement = createItemElement(item, false, true);
        questItems.appendChild(itemElement);
    });
}

export function toggleQuestBoardUI() {
    const questBoardWindow = document.getElementById('questBoardWindow');
    if (questBoardWindow) {
        questBoardWindow.style.display = questBoardWindow.style.display === 'none' ? 'flex' : 'none';
        if (questBoardWindow.style.display === 'flex') {
            updateQuestBoardUI();
        }
    } else {
        createQuestBoardUI();
    }
}