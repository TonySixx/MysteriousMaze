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
        id: 'completeMazesFloor4',
        name: 'completeMazesFloor4Quest',
        description: 'completeMazesFloor4QuestDescription',
        level: 17,
        rewards: {
            exp: 15000,
            gold: 100,
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
        id: 'completeMazeQuantumWithoutMinimap',
        name: 'completeMazeQuantumWithoutMinimapQuest',
        description: 'completeMazeQuantumWithoutMinimapQuestDescription',
        level: 18,
        rewards: {
            exp: 20000,
            gold: 100,
            items: [
                { item: 'powerLapisia', count: 3 },
                { item: 'protectorsLapisia', count: 3 },
                { item: 'ultimateHealthPotion', count: 3 }
            ]
        },
        objective: {
            type: 'completeMazeWithoutMinimap',
            target: 'Quantum',
            floor: 4,
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
        id: 'completeMazeClockWithoutMinimap',
        name: 'completeMazeClockWithoutMinimapQuest',
        description: 'completeMazeClockWithoutMinimapQuestDescription',
        level: 21,
        rewards: {
            exp: 40000,
            gold: 150,
            items: [
                { item: 'ultimateHealthPotion', count: 3 },
                { item: 'ultimateManaPotion', count: 2 },
                { item: 'protectorsLapisia', count: 5 }
            ]
        },
        objective: {
            type: 'completeMazeWithoutMinimap',
            target: 'Clock',
            floor: 5,
            count: 1
        }
    },
    {
        id: 'completeMazesFloor5',
        name: 'completeMazesFloor5Quest',
        description: 'completeMazesFloor5QuestDescription',
        level: 21,
        rewards: {
            exp: 40000,
            gold: 150,
            items: [
                { item: 'ultimateHealthPotion', count: 3 },
                { item: 'ultimateManaPotion', count: 3 },
                { item: 'powerLapisia', count: 5 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 5
        }
    },
    {
        id: 'defeatChronos',
        name: 'defeatChronosQuest',
        description: 'defeatChronosQuestDescription',
        level: 26,
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
        id: 'completeMazesFloor6',
        name: 'completeMazesFloor6Quest',
        description: 'completeMazesFloor6QuestDescription',
        level: 27,
        rewards: {
            exp: 70000,
            gold: 100,
            items: [
                { item: 'ultimateHealthPotion', count: 4 },
                { item: 'ultimateManaPotion', count: 4 },
                { item: 'powerLapisia', count: 6 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 6
        }
    },
    {
        id: 'defeatToxicus',
        name: 'defeatToxicusQuest',
        description: 'defeatToxicusQuestDescription',
        level: 31,
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
    {
        id: 'completeMazesFloor7',
        name: 'completeMazesFloor7Quest',
        description: 'completeMazesFloor7QuestDescription',
        level: 32,
        rewards: {
            exp: 150000,
            gold: 200,
            items: [
                { item: 'ultimateHealthPotion', count: 5 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: 'powerLapisia', count: 7 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 7
        }
    },
    {
        id: 'defeatFrostlord',
        name: 'defeatFrostlordQuest',
        description: 'defeatFrostlordQuestDescription',
        level: 36,
        rewards: {
            exp: 400000,
            gold: 300,
            items: [
                { item: 'powerLapisia', count: 7 },
                { item: 'protectorsLapisia', count: 7 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Frostlord, Vládce ledu',
            count: 1
        }
    },
    {
        id: 'completeMazesFloor8',
        name: 'completeMazesFloor8Quest',
        description: 'completeMazesFloor8QuestDescription',
        level: 37,
        rewards: {
            exp: 350000,
            gold: 250,
            items: [
                { item: 'ultimateHealthPotion', count: 5 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: 'powerLapisia', count: 7 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 8
        }
    },
    {
        id: 'defeatFlamelord',
        name: 'defeatFlamelordQuest',
        description: 'defeatFlamelordQuestDescription',
        level: 41,
        rewards: {
            exp: 1000000,
            gold: 400,
            items: [
                { item: 'powerLapisia', count: 8 },
                { item: 'protectorsLapisia', count: 8 },
                { item: 'cloudweaversMantle', count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Flamelord, Vládce ohně',
            count: 1
        }
    },
    {
        id: 'completeMazesFloor9',
        name: 'completeMazesFloor9Quest',
        description: 'completeMazesFloor9QuestDescription',
        level: 42,
        rewards: {
            exp: 900000,
            gold: 350,
            items: [
                { item: 'ultimateHealthPotion', count: 6 },
                { item: 'ultimateManaPotion', count: 6 },
                { item: 'powerLapisia', count: 8 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 9
        }
    },
    {
        id: 'defeatArcaneLord',
        name: 'defeatArcaneLordQuest',
        description: 'defeatArcaneLordQuestDescription',
        level: 46,
        rewards: {
            exp: 3000000,
            gold: 500,
            items: [
                { item: 'powerLapisia', count: 8 },
                { item: 'protectorsLapisia', count: 8 },
                { item: 'ultimateHealthPotion', count: 5 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Arcane Lord',
            count: 1
        }
    },
    {
        id: 'completeMazesFloor10',
        name: 'completeMazesFloor10Quest',
        description: 'completeMazesFloor10QuestDescription',
        level: 47,
        rewards: {
            exp: 2000000,
            gold: 400,
            items: [
                { item: 'ultimateHealthPotion', count: 6 },
                { item: 'ultimateManaPotion', count: 6 },
                { item: 'powerLapisia', count: 8 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 10
        }
    },
    {
        id: 'defeatBloodMage',
        name: 'defeatBloodMageQuest',
        description: 'defeatBloodMageQuestDescription',
        level: 51,
        rewards: {
            exp: 9000000,
            gold: 550,
            items: [
                { item: 'powerLapisia', count: 8 },
                { item: 'protectorsLapisia', count: 8 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: "stormcallersAegis", count: 1 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Blood Mage',
            count: 1
        }
    },
    {
        id: 'completeMazesFloor11',
        name: 'completeMazesFloor11Quest',
        description: 'completeMazesFloor11QuestDescription',
        level: 52,
        rewards: {
            exp: 7000000,
            gold: 400,
            items: [
                { item: 'ultimateHealthPotion', count: 5 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: 'powerLapisia', count: 8 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 11
        }
    },
    {
        id: 'completeMazesFloor12',
        name: 'completeMazesFloor12Quest',
        description: 'completeMazesFloor12QuestDescription',
        level: 57,
        rewards: {
            exp: 10000000,
            gold: 500,
            items: [
                { item: 'ultimateHealthPotion', count: 5 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: 'powerLapisia', count: 10 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 12
        }
    },
    {
        id: 'completeMazesFloor13',
        name: 'completeMazesFloor13Quest',
        description: 'completeMazesFloor13QuestDescription',
        level: 60,
        rewards: {
            exp: 0,
            gold: 550,
            items: [
                { item: 'ultimateHealthPotion', count: 5 },
                { item: 'ultimateManaPotion', count: 5 },
                { item: 'powerLapisia', count: 10 }
            ]
        },
        objective: {
            type: 'completeMazes',
            count: 3,
            uniqueSeeds: true,
            floor: 13
        }
    }
];

export function getAllQuests() {
    return questDefinitions
        .map(questDef => ({
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
        }))
        .sort((a, b) => a.level - b.level); // Seřazení questů podle úrovně
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

export function sortQuestsByLevel(quests) {
    return quests.sort((a, b) => a.level - b.level);
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