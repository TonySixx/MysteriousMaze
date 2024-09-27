import { itemDatabase } from "./itemDatabase";
import { getTranslation } from "./langUtils";
import { addQuest } from "./quests";

export function addFireDragonQuest() {
    const quest = {
        id: 'killFireDragons',
        name: getTranslation('killFireDragonsQuest'),
        description: getTranslation('killFireDragonsQuestDescription'),
        level: 1,
        isCompleted: false,
        progress: '0/3',
        rewards: {
            exp: 2000,
            gold: 100,
            items: [
                { ...itemDatabase.healthPotion, count: 5 },
                { ...itemDatabase.manaPotion, count: 5 }
            ]
        },
        objective: {
            type: 'kill',
            target: 'Ohnivý drak',
            count: 3,
            current: 0
        }
    };
    addQuest(quest);
}