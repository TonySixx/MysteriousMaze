import { addGold, getGold, updatePlayerStats } from './player.js';
import { getTranslation } from './langUtils.js';
import { setPlayerHealth, setPlayerMana, getPlayerHealth, getPlayerMana, getPlayerMaxHealth, getPlayerMaxMana } from './player.js';
import { errorSoundBuffer, exitPointerLock, itemSoundBuffer, playSound, requestPointerLock, staffModel } from './main.js';
import { getItemName, itemDatabase } from './itemDatabase.js';

let inventory = [];
let equipment = {
  weapon: null,
  armor: null,
  hpPotion: null,
  mpPotion: null
};

export const INVENTORY_SIZE = 8 * 6;

export let hpPotionCooldown = 0;
export let mpPotionCooldown = 0;

const POTION_COOLDOWN = 10000; // 10 sekund v milisekundách

export function createItem(itemKey, count = 1) {
  const itemTemplate = itemDatabase[itemKey];
  if (!itemTemplate) {
    console.error(`Item with key ${itemKey} not found in the database.`);
    return null;
  }

  return {
    id: crypto.randomUUID(),
    ...itemTemplate,
    count: itemTemplate.stackable ? count : 1
  };
}


export function initInventory() {
  const savedInventory = localStorage.getItem('inventory');
  const savedEquipment = localStorage.getItem('equipment');

  if (savedInventory && savedEquipment) {
    inventory = JSON.parse(savedInventory);
    equipment = JSON.parse(savedEquipment);
  } else {
    inventory = new Array(INVENTORY_SIZE).fill(null);
    addItemsForTesting();
  }

  console.log("Inventory initialized:", inventory);
  console.log("Equipment initialized:", equipment);

  initPotionBar();
  renderPotionBar();
  updateStaffVisibility();
}

function initPotionBar() {
  const potionBar = document.getElementById('potionBar');
  potionBar.innerHTML = `
    <div class="potion-slot" id="hpPotionSlotInBar">
      <div class="potion-key">1</div>
    </div>
    <div class="potion-slot" id="mpPotionSlotInBar">
      <div class="potion-key">2</div>
    </div>
  `;
}

export function openInventory() {
  hideContextMenu();
  hideTooltip();
  exitPointerLock();
  const inventoryModal = document.getElementById('inventoryModal');
  inventoryModal.style.display = 'block';
  renderInventory();
  updateGoldDisplay();
  console.log("Inventory opened and rendered");
}

export function closeInventory() {
  hideContextMenu();
  hideTooltip();
  requestPointerLock();
  const inventoryModal = document.getElementById('inventoryModal');
  inventoryModal.style.display = 'none';
}

function renderInventory() {
  const inventoryGrid = document.getElementById('inventoryGrid');
  inventoryGrid.innerHTML = '';

  // Přidáme křížek pro zavření
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closeInventory;
  document.querySelector('.inventory-content').appendChild(closeButton);

  // Přidáme nebo aktualizujeme zobrazení goldů
  let goldDisplay = document.querySelector('.gold-display');
  if (!goldDisplay) {
    goldDisplay = document.createElement('div');
    goldDisplay.className = 'gold-display';
    goldDisplay.innerHTML = `
      <img src="gold-coin.png" alt="Gold" class="gold-icon">
      <span id="goldDisplay"></span>
    `;
    document.querySelector('.inventory-content').appendChild(goldDisplay);
  }
  updateGoldDisplay();

  for (let i = 0; i < INVENTORY_SIZE; i++) {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    slot.dataset.index = i;

    if (inventory[i]) {
      const item = createItemElement(inventory[i]);
      slot.appendChild(item);
    }

    slot.addEventListener('dragover', allowDrop);
    slot.addEventListener('drop', drop);

    inventoryGrid.appendChild(slot);
  }

  renderEquipment();
  renderPotionBar();
}

function renderEquipment() {
  console.log("Rendering equipment:", equipment);
  for (const [slot, item] of Object.entries(equipment)) {
    const equipmentSlot = document.getElementById(`${slot}Slot`);
    if (!equipmentSlot) {
      console.error(`Equipment slot ${slot} not found`);
      continue;
    }
    equipmentSlot.innerHTML = '';
    equipmentSlot.title = getSlotTypeText(slot);

    if (item) {
      const itemElement = createItemElement(item, true);
      equipmentSlot.appendChild(itemElement);
      console.log(`Rendered ${item.name} in ${slot} slot`);
    } else {
      console.log(`${slot} slot is empty`);
    }

    equipmentSlot.addEventListener('dragover', allowDrop);
    equipmentSlot.addEventListener('drop', drop);
  }
}

function renderPotionBar() {
  renderPotionSlot('hpPotionSlotInBar', equipment.hpPotion, 'hp-slot.jpg', hpPotionCooldown);
  renderPotionSlot('mpPotionSlotInBar', equipment.mpPotion, 'mp-slot.jpg', mpPotionCooldown);
}

function renderPotionSlot(slotId, potion, placeholderIcon, cooldown) {
  const slot = document.getElementById(slotId);
  if (!slot) return;

  slot.innerHTML = `<div class="potion-key">${slotId === 'hpPotionSlotInBar' ? '1' : '2'}</div>`;

  if (potion && potion.count > 0) {
    slot.innerHTML += `
      <div class="potion-icon" style="background-image: url('${potion.icon}')"></div>
      <div class="potion-count">${potion.count}</div>
    `;
  } else {
    slot.innerHTML += `<div class="potion-icon" style="background-image: url('inventory/${placeholderIcon}'); filter: grayscale(90%)"></div>`;
  }

  if (cooldown > 0) {
    const cooldownSeconds = Math.ceil(cooldown / 1000);
    slot.innerHTML += `<div class="potion-cooldown">${cooldownSeconds}</div>`;
  }
}

function getSlotTypeText(slot) {
  const slotTranslations = {
    weapon: getTranslation('weaponSlot'),
    armor: getTranslation('armorSlot'),
    hpPotion: getTranslation('hpPotionSlot'),
    mpPotion: getTranslation('mpPotionSlot')
  };
  return slotTranslations[slot] || slot;
}

function createItemElement(item, isEquipped = false) {
  const itemElement = document.createElement('div');
  itemElement.className = `item item-${item.rarity}`;
  itemElement.style.backgroundImage = `url(${item.icon})`;
  itemElement.draggable = true;
  itemElement.dataset.id = item.id;

  if (item.stackable && item.count > 1) {
    const itemCount = document.createElement('div');
    itemCount.className = 'item-count';
    itemCount.textContent = item.count;
    itemElement.appendChild(itemCount);
  }

  itemElement.addEventListener('dragstart', (event) => {
    drag(event);
    hideTooltip(); // Skryjeme tooltip při zahájení přetahování
  });
  itemElement.addEventListener('mouseenter', showTooltip);
  itemElement.addEventListener('mouseleave', hideTooltip);

  if (!isEquipped) {
    itemElement.addEventListener('contextmenu', showContextMenu);
  }

  return itemElement;
}


export function showTooltip(event, itemArg) {
  const itemId = event.target.dataset.id;
  const item = itemArg || findItemById(itemId) || findEquippedItemById(itemId) || this.items.find(i => i.id === itemId);
  if (!item) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';

  const requiredLevelColor = playerLevel >= item.requiredLevel ? 'inherit' : '#ff0000';
  const bonusColor = '#ffff99'; // Světle žlutá barva pro bonusy

  tooltip.innerHTML = `
    <h3 style="color: ${getRarityColor(item.rarity)}; margin-bottom: 10px;">${item.name}</h3>
    <p>${getTranslation("itemType")}: ${getItemTypeText(item.type)}</p>
    <p style="color: ${requiredLevelColor}">${getTranslation('requiredLevel', item.requiredLevel)}</p>
    ${item.attackBonus ? `<p style="color: ${bonusColor}">${getTranslation('attackBonus')}: +${item.attackBonus}</p>` : ''}
    ${item.hpBonus ? `<p style="color: ${bonusColor}">${getTranslation('hpBonus')}: +${item.hpBonus}</p>` : ''}
    ${item.mpBonus ? `<p style="color: ${bonusColor}">${getTranslation('mpBonus')}: +${item.mpBonus}</p>` : ''}
    ${item.sellable ? `<p style="margin-top: 10px;">${getTranslation(itemArg ? 'buyPrice' : 'sellPrice')}: ${itemArg ? item.buyPrice.toLocaleString() : item.sellPrice.toLocaleString()} ${getTranslation('gold')}${item.stackable && item.count > 1 ? ` (${(itemArg ? item.buyPrice.toLocaleString() : item.sellPrice.toLocaleString()) * item.count} ${getTranslation('gold')})` : ''}</p>` : ''}
    ${item.description ? `<p style="margin-top: 10px;">${item.description}</p>` : ''}
    ${findEquippedItemById(itemId) ? `<p style="font-style: italic; color:aqua; margin-top: 10px;">${getTranslation('equipped')}</p>` : ''}
  `;

  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = `${rect.right + 10}px`;
  tooltip.style.top = `${rect.top}px`;
}

export function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
  document.removeEventListener('mousemove', checkTooltipVisibility);
}

function checkTooltipVisibility(event) {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const isOverTooltip = (
      event.clientX >= tooltipRect.left &&
      event.clientX <= tooltipRect.right &&
      event.clientY >= tooltipRect.top &&
      event.clientY <= tooltipRect.bottom
    );

    const itemElements = document.querySelectorAll('.item');
    let isOverItem = false;
    itemElements.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (
        event.clientX >= itemRect.left &&
        event.clientX <= itemRect.right &&
        event.clientY >= itemRect.top &&
        event.clientY <= itemRect.bottom
      ) {
        isOverItem = true;
      }
    });

    if (!isOverTooltip && !isOverItem) {
      hideTooltip();
    }
  }
}

function getRarityColor(rarity) {
  const rarityColors = {
    common: '#ffffff',
    uncommon: '#1eff00',
    rare: '#0070dd',
    epic: '#a335ee',  // Přidáme barvu pro epické předměty
    legendary: '#ff8000',
    mythic: '#ff00ff'
  };
  return rarityColors[rarity] || '#ffffff';
}

function getItemTypeText(type) {
  const typeTranslations = {
    weapon: getTranslation('weapon'),
    armor: getTranslation('armor'),
    hpPotion: getTranslation('hpPotion'),
    mpPotion: getTranslation('mpPotion')
  };
  return typeTranslations[type] || type;
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.id);
  hideTooltip(); // Skryjeme tooltip při zahájení přetahování
  hideContextMenu();
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text');
  const targetSlot = event.target.closest('.inventory-slot, .equipment-slot');

  if (targetSlot) {
    if (targetSlot.classList.contains('inventory-slot')) {
      const equippedSlot = Object.entries(equipment).find(([_, item]) => item && item.id === itemId);
      if (equippedSlot) {
        removeItemFromEquipment(equippedSlot[0]);
      }
    }
    moveItem(itemId, targetSlot);
  }

  hideTooltip();
}

function moveItem(itemId, targetSlot) {
  const sourceItem = findItemById(itemId) || findEquippedItemById(itemId);
  if (!sourceItem) return;

  if (targetSlot.classList.contains('equipment-slot')) {
    if (canEquipItem(sourceItem, targetSlot.id)) {
      playSound(itemSoundBuffer);

      equipItem(itemId, targetSlot.id.replace('Slot', ''));
    }
    else {
      playSound(errorSoundBuffer);
    }
  } else {
    playSound(itemSoundBuffer);

    const targetIndex = parseInt(targetSlot.dataset.index);
    if (isNaN(targetIndex)) return;

    const targetItem = inventory[targetIndex];

    // Pokud je cílový slot stejný jako zdrojový, nic neděláme
    if (sourceItem === targetItem) {
      return;
    }

    if (targetItem && sourceItem.name === targetItem.name && sourceItem.stackable && targetItem.stackable) {
      // Sloučení stacků
      const totalCount = sourceItem.count + targetItem.count;
      if (totalCount <= 255) {
        targetItem.count = totalCount;
        removeItemFromInventory(sourceItem.id, sourceItem.count);
      } else {
        targetItem.count = 255;
        sourceItem.count = totalCount - 255;
      }
    } else {
      // Standardní přesun
      const sourceIndex = inventory.findIndex(i => i && i.id === itemId);
      if (sourceIndex !== -1) {
        [inventory[sourceIndex], inventory[targetIndex]] = [inventory[targetIndex], inventory[sourceIndex]];
      } else {
        const equippedSlot = Object.entries(equipment).find(([_, equippedItem]) => equippedItem && equippedItem.id === itemId);
        if (equippedSlot) {
          equipment[equippedSlot[0]] = null;
          inventory[targetIndex] = sourceItem;
        }
      }
    }
  }

  saveInventoryToLocalStorage();
  renderInventory();
  renderEquipment();
}

function findEquippedItemById(id) {
  return Object.values(equipment).find(item => item && item.id === id);
}

function canEquipItem(item, slotId) {
  const slotType = slotId.replace('Slot', '');
  return item.type === slotType && playerLevel >= item.requiredLevel;
}

function equipItem(itemId, slot) {
  const item = findItemById(itemId);
  if (!item) {
    console.error(`Item ${itemId} not found`);
    return;
  }

  if (equipment[slot]) {
    addItemToInventory(equipment[slot]);
  }

  equipment[slot] = item;
  removeItemFromInventory(itemId, item.count);
  console.log(`Equipped ${item.name} in ${slot} slot`);
  console.log("Updated equipment:", equipment);

  updateStaffVisibility();
  saveInventoryToLocalStorage();
  updatePlayerStats(); // Přidáme volání této funkce
}

function findItemById(id) {
  return inventory.find(item => item && item.id === id);
}

function addItemToInventory(item) {
  if (item.stackable) {
    const existingItem = inventory.find(i => i && i.name === item.name && i.count < 255);
    if (existingItem) {
      const spaceInStack = 255 - existingItem.count;
      const amountToAdd = Math.min(item.count, spaceInStack);
      existingItem.count += amountToAdd;
      item.count -= amountToAdd;

      if (item.count > 0) {
        return addItemToInventory(item); // Rekurzivně přidáme zbytek
      }
      saveInventoryToLocalStorage();
      return true;
    }
  }

  const emptySlot = inventory.findIndex(slot => slot === null);
  if (emptySlot !== -1) {
    inventory[emptySlot] = item.stackable ? { ...item, count: Math.min(item.count, 255) } : item;
    saveInventoryToLocalStorage();
    return true;
  }
  return false;
}

function removeItemFromInventory(itemId, count = 1) {
  const index = inventory.findIndex(item => item && item.id === itemId);
  if (index !== -1) {
    if (inventory[index].stackable) {
      if (count >= inventory[index].count) {
        inventory[index] = null;
      } else {
        inventory[index].count -= count;
      }
    } else {
      inventory[index] = null;
    }
    saveInventoryToLocalStorage();
    return true;
  }
  return false;
}

function removeItemFromEquipment(slot) {
  if (equipment[slot]) {
    const item = equipment[slot];
    if (addItemToInventory(item)) {
      equipment[slot] = null;
      console.log(`Removed ${item.name} from ${slot} slot`);
      console.log("Updated equipment:", equipment);

      updateStaffVisibility();
      renderInventory();
      renderEquipment();
      saveInventoryToLocalStorage();
      updatePlayerStats(); // Přidáme volání této funkce
      return true;
    } else {
      console.log(`Couldn't remove ${item.name} from ${slot} slot: inventory full`);
    }
  }
  return false;
}

function showContextMenu(event) {
  event.preventDefault();
  hideTooltip();
  const contextMenu = document.getElementById('contextMenu');
  const itemElement = event.target.closest('.item');
  if (!itemElement) return;

  const itemId = itemElement.dataset.id;
  const item = findItemById(itemId);

  if (!item || !item.sellable || isItemEquipped(item)) return;

  contextMenu.innerHTML = `
    <ul>
      <li data-action="sell" data-item-id="${item.id}">${getTranslation('sellItem')} (${item.sellPrice.toLocaleString()} ${getTranslation('gold')})</li>
    </ul>
  `;

  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.top = `${event.clientY}px`;

  const sellOption = contextMenu.querySelector('[data-action="sell"]');
  sellOption.addEventListener('click', () => sellItem(item.id));

  document.addEventListener('click', hideContextMenu);
}

function isItemEquipped(item) {
  return Object.values(equipment).some(equippedItem => equippedItem && equippedItem.id === item.id);
}


function hideContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.display = 'none';
  document.removeEventListener('click', hideContextMenu);
}

function sellItem(itemId) {
  const item = findItemById(itemId);
  if (!item || !item.sellable || isItemEquipped(item)) return;

  const equippedSlot = Object.entries(equipment).find(([_, equippedItem]) => equippedItem && equippedItem.id === itemId);

  if (equippedSlot) {
    removeItemFromEquipment(equippedSlot[0]);
  } else {
    removeItemFromInventory(itemId, item.count);
  }

  const sellCount = item.stackable ? item.count : 1;
  addGold(item.sellPrice * sellCount);
  renderInventory();
  renderEquipment();
  updateGoldDisplay();
  saveInventoryToLocalStorage();
}

// Přidejte tuto funkci pro aktualizaci zobrazení goldů
function updateGoldDisplay() {
  const goldDisplay = document.getElementById('goldDisplay');
  if (goldDisplay) {
    goldDisplay.textContent = getGold();
  }
}

// Přidejte tuto funkci pro debugování
export function debugInventory() {
  console.log("Current inventory:", inventory);
  console.log("Current equipment:", equipment);
}

function addItemsForTesting() {
  addItemToInventory(createItem(getItemName(itemDatabase.apprenticeShardStaff)));
  addItemToInventory(createItem(getItemName(itemDatabase.healthPotion)));
  addItemToInventory(createItem(getItemName(itemDatabase.manaPotion)));
  addItemToInventory(createItem(getItemName(itemDatabase.greaterManaPotion)));
  addItemToInventory(createItem(getItemName(itemDatabase.greaterHealthPotion)));
  addItemToInventory(createItem(getItemName(itemDatabase.ultimateHealthPotion)));
  addItemToInventory(createItem(getItemName(itemDatabase.ultimateManaPotion)));

  addItemToInventory(createItem(getItemName(itemDatabase.angelsGraceVestments)));
  addItemToInventory(createItem(getItemName(itemDatabase.angelsGraceVestments)));
  addItemToInventory(createItem(getItemName(itemDatabase.bloomShadeKimono)));
  addItemToInventory(createItem(getItemName(itemDatabase.infernalDragonhideRobe)));
  addItemToInventory(createItem(getItemName(itemDatabase.emeraldVineStaff)));
  addItemToInventory(createItem(getItemName(itemDatabase.frostbaneCorruption)));


}

export function usePotion(type) {
  const potionSlot = type === 'hp' ? 'hpPotion' : 'mpPotion';
  const potion = equipment[potionSlot];
  const cooldown = type === 'hp' ? hpPotionCooldown : mpPotionCooldown;

  if (potion && potion.count > 0 && cooldown <= 0) {
    let restoreAmount;

    if (typeof potion.restoreAmount === 'number') {
      restoreAmount = potion.restoreAmount;
    } else if (typeof potion.restoreAmount === 'string' && potion.restoreAmount.endsWith('%')) {
      const percentage = parseInt(potion.restoreAmount) / 100;
      restoreAmount = type === 'hp'
        ? Math.floor(getPlayerMaxHealth() * percentage)
        : Math.floor(getPlayerMaxMana() * percentage);
    } else {
      console.error(`Neplatná hodnota restoreAmount pro ${potion.name}`);
      return;
    }

    if (type === 'hp') {
      const newHealth = Math.min(getPlayerHealth() + restoreAmount, getPlayerMaxHealth());
      setPlayerHealth(newHealth);
      hpPotionCooldown = POTION_COOLDOWN;
    } else {
      const newMana = Math.min(getPlayerMana() + restoreAmount, getPlayerMaxMana());
      setPlayerMana(newMana);
      mpPotionCooldown = POTION_COOLDOWN;
    }

    potion.count--;
    if (potion.count === 0) {
      equipment[potionSlot] = null;
    }

    renderPotionBar();
    saveInventoryToLocalStorage();
  }
}

export function updatePotionCooldowns(deltaTime) {
  if (hpPotionCooldown > 0) {
    hpPotionCooldown = Math.max(0, hpPotionCooldown - deltaTime * 1000);
  }
  if (mpPotionCooldown > 0) {
    mpPotionCooldown = Math.max(0, mpPotionCooldown - deltaTime * 1000);
  }
  renderPotionBar();
}

// Přidáme novou funkci pro aktualizaci viditelnosti staffModel
function updateStaffVisibility() {
  if (equipment.weapon) {
    if (staffModel) staffModel.visible = true;
  } else {
    if (staffModel) staffModel.visible = false;
  }
}

function saveInventoryToLocalStorage() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
  localStorage.setItem('equipment', JSON.stringify(equipment));
}

export { inventory, equipment, addItemToInventory, updateStaffVisibility };