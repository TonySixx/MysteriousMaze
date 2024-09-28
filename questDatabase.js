import { itemDatabase } from "./itemDatabase";
import { getTranslation } from "./langUtils";
import { addAvailableQuest, checkQuestAvailability } from "./quests";

export function initializeQuests() {
    const savedAvailableQuests = localStorage.getItem('availableQuests');
    if (!savedAvailableQuests) {
        const playerLevel = getPlayerLevel();
        questDefinitions.forEach(quest => {
            if (playerLevel >= quest.level) {
                addQuestFromDefiniton(quest);
            }
        });
    }
    checkQuestAvailability();
}

const questDefinitions = [
    {
        id: 'killFireDragons',
        name: 'killFireDragonsQuest',
        description: 'killFireDragonsQuestDescription',
        level: 1,
        rewards: {
            exp: 1000,
            gold: 20,
            items: [
                { item: 'healthPotion', count: 5 },
                { item: 'manaPotion', count: 5 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Ohnivý drak',
            count: 3
        }
    },
    {
        id: 'completeMaze158',
        name: 'completeMaze158Quest',
        description: 'completeMaze158QuestDescription',
        level: 5,
        rewards: {
            exp: 2000,
            gold: 50,
            items: [
                { item: 'powerLapisia', count: 1 },
                { item: 'protectorsLapisia', count: 1 }
            ]
        },
        objective: {
            type: 'completeMaze',
            target: '158',
            count: 1
        }
    }
    // Zde můžete přidat další questy
];

export function addQuestFromDefiniton(questDef) {
    const quest = {
        ...questDef,
        name: getTranslation(questDef.name),
        description: getTranslation(questDef.description),
        isCompleted: false,
        progress: `0/${questDef.objective.count}`,
        rewards: {
            ...questDef.rewards,
            items: questDef.rewards.items.map(item => ({
                ...itemDatabase[item.item],
                count: item.count
            }))
        },
        objective: {
            ...questDef.objective,
            current: 0
        }
    };
    addAvailableQuest(quest);
}

export function getAllQuests() {
    return questDefinitions.map(questDef => ({
        ...questDef,
        name: getTranslation(questDef.name),
        description: getTranslation(questDef.description),
        isCompleted: false,
        progress: `0/${questDef.objective.count}`,
        rewards: {
            ...questDef.rewards,
            items: questDef.rewards.items.map(item => ({
                ...itemDatabase[item.item],
                count: item.count
            }))
        },
        objective: {
            ...questDef.objective,
            current: 0
        }
    }));
}