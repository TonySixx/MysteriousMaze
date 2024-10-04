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
        id: 'completeMazes',
        name: 'completeMazesQuest',
        description: 'completeMazesQuestDescription',
        level: 1,
        rewards: {
            exp: 1000,
            gold: 30,
            items: [
                { item: 'powerLapisia', count: 2 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true
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
            count: 1,
            floor: 1,
        }
    },
    {
        id: 'defeatShadowDemon',
        name: 'defeatShadowDemonQuest',
        description: 'defeatShadowDemonQuestDescription',
        level: 7,
        rewards: {
            exp: 3000,
            gold: 100,
            items: [
                { item: 'powerLapisia', count: 3 },
                { item: 'protectorsLapisia', count: 3 },
                { item: 'greaterHealthPotion', count: 5 },
                { item: 'greaterManaPotion', count: 5 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Stinový démon',
            count: 1
        }
    },
    {
        id: 'completeMaze444WithoutMinimap',
        name: 'completeMaze444WithoutMinimapQuest',
        description: 'completeMaze444WithoutMinimapQuestDescription',
        level: 8,
        rewards: {
            exp: 3500,
            gold: 100,
            items: [
                { item: 'protectorsLapisia', count: 3 },
                { item: 'powerLapisia', count: 3 }
            ]
        },
        objective: {
            type: 'completeMazeWithoutMinimap',
            target: '444',
            floor: 2,
            count: 1
        }
    },
    {
        id: 'defeatEliteDragons',
        name: 'defeatEliteDragonsQuest',
        description: 'defeatEliteDragonsQuestDescription',
        level: 8,
        rewards: {
            exp: 3000,
            gold: 80,
            items: [
                { item: 'powerLapisia', count: 4 }
            ]
        },
        objective: {
            type: 'killMultiple',
            hasMultipleObjectives: true,
            targets: [
                { translationKey: 'stormDragon', count: 2 },
                { translationKey: 'shadowDragon', count: 2 },
                { translationKey: 'crystalDragon', count: 2 }
            ]
        }
    },
    {
        id: 'defeatJungleGuardian',
        name: 'defeatJungleGuardianQuest',
        description: 'defeatJungleGuardianQuestDescription',
        level: 12,
        rewards: {
            exp: 8000,
            gold: 150,
            items: [
                { item: 'emeraldVineStaff', count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Strážce Džungle',
            count: 1
        }
    },
    {
        id: 'completeMazeBlackWithoutMinimap',
        name: 'completeMazeBlackWithoutMinimapQuest',
        description: 'completeMazeBlackWithoutMinimapQuestDescription',
        level: 12,
        rewards: {
            exp: 6000,
            gold: 100,
            items: [
                { item: 'protectorsLapisia', count: 4 },
                { item: 'powerLapisia', count: 4 },
                { item: 'greaterHealthPotion', count: 5 },
                { item: 'greaterManaPotion', count: 5 }
            ]
        },
        objective: {
            type: 'completeMazeWithoutMinimap',
            target: 'Black',
            floor: 3,
            count: 1
        }
    },
    {
        id: 'completeMazesFloor3',
        name: 'completeMazesFloor3Quest',
        description: 'completeMazesFloor3QuestDescription',
        level: 13,
        rewards: {
            exp: 8000,
            gold: 100,
            items: [
                { item: 'powerLapisia', count: 5 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 3
        }
    },
    {
        id: 'defeatObsidaroth',
        name: 'defeatObsidarothQuest',
        description: 'defeatObsidarothQuestDescription',
        level: 16,
        rewards: {
            exp: 20000,
            gold: 150,
            items: [
                { item: 'protectorsLapisia', count: 5 },
                { item: 'powerLapisia', count: 5 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Obsidaroth',
            count: 1
        }
    },
    {
        id: 'defeatQuantumGuardian',
        name: 'defeatQuantumGuardianQuest',
        description: 'defeatQuantumGuardianQuestDescription',
        level: 21,
        rewards: {
            exp: 35000,
            gold: 200,
            items: [
                { item: 'powerLapisia', count: 5 },
                { item: 'protectorsLapisia', count: 5 },
                { item: 'arcaneRunecloak', count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Kvantový strážce',
            count: 1
        }
    },
    {
        id: 'completeMazesFloor4',
        name: 'completeMazesFloor4Quest',
        description: 'completeMazesFloor4QuestDescription',
        level: 21,
        rewards: {
            exp: 30000,
            gold: 150,
            items: [
                { item: 'ultimateHealthPotion', count: 2 },
                { item: 'ultimateManaPotion', count: 2 },
                { item: 'protectorsLapisia', count: 3 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 4
        }
    },
    {
        id: 'defeatChronos',
        name: 'defeatChronosQuest',
        description: 'defeatChronosQuestDescription',
        level: 21,
        rewards: {
            exp: 100000,
            gold: 150,
            items: [
                { item: 'powerLapisia', count: 5 },
                { item: 'protectorsLapisia', count: 5 },
                { item: 'ultimateHealthPotion', count: 2 },
                { item: 'ultimateManaPotion', count: 2 },
                { item: 'goldenDawnRobe', count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Chronos, Pán času',
            count: 1
        }
    },
    {
        id: 'defeatToxicus',
        name: 'defeatToxicusQuest',
        description: 'defeatToxicusQuestDescription',
        level: 26,
        rewards: {
            exp: 200000,
            gold: 200,
            items: [
                { item: 'powerLapisia', count: 3 },
                { item: 'protectorsLapisia', count: 3 },
                { item: 'ultimateHealthPotion', count: 2 },
                { item: 'darkshadeStaff', count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Toxicus, Pán Moru',
            count: 1
        }
    },
];

export function getAllQuests() {
    return questDefinitions.map(questDef => ({
        ...questDef,
        name: getTranslation(questDef.name),
        description: getTranslation(questDef.description),
        isCompleted: false,
        progress: getInitialProgress(questDef.objective),
        rewards: {
            ...questDef.rewards,
            items: questDef.rewards.items.map(item => ({
                ...itemDatabase[item.item],
                count: item.count
            }))
        },
        objective: getInitialObjective(questDef.objective)
    }));
}

export function addQuestFromDefiniton(questDef) {
    const quest = {
        ...questDef,
        name: getTranslation(questDef.name),
        description: getTranslation(questDef.description),
        isCompleted: false,
        progress: getInitialProgress(questDef.objective),
        rewards: {
            ...questDef.rewards,
            items: questDef.rewards.items.map(item => ({
                ...itemDatabase[item.item],
                count: item.count
            }))
        },
        objective: getInitialObjective(questDef.objective)
    };
    addAvailableQuest(quest);
}

function getInitialProgress(objective) {
    if (objective.hasMultipleObjectives) {
        return objective.targets.map(target =>
            `${getTranslation(target.translationKey)}: 0/${target.count}`
        ).join(', ');
    } else {
        return `0/${objective.count}`;
    }
}

function getInitialObjective(objective) {
    if (objective.hasMultipleObjectives) {
        return {
            ...objective,
            targets: objective.targets.map(target => ({
                ...target,
                current: 0
            }))
        };
    } else {
        return {
            ...objective,
            current: 0
        };
    }
}