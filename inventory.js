import { addGold, getGold } from './player.js';
import { getTranslation } from './langUtils.js';
import { setPlayerHealth, setPlayerMana, getPlayerHealth, getPlayerMana, getPlayerMaxHealth, getPlayerMaxMana } from './player.js';
import { exitPointerLock, requestPointerLock, staffModel } from './main.js';

let inventory = [];
let equipment = {
  weapon: null,
  armor: null,
  hpPotion: null,
  mpPotion: null
};

const INVENTORY_SIZE = 8 * 6;

export let hpPotionCooldown = 0;
export let mpPotionCooldown = 0;

const POTION_COOLDOWN = 10000; // 10 sekund v milisekundách

export function initInventory() {
  const savedInventory = localStorage.getItem('inventory');
  const savedEquipment = localStorage.getItem('equipment');

  if (savedInventory && savedEquipment) {
    inventory = JSON.parse(savedInventory);
    equipment = JSON.parse(savedEquipment);
  } else {
    inventory = new Array(INVENTORY_SIZE).fill(null);
    const mageStaff = {
      name: "Mage's Staff",
      type: "weapon",
      rarity: "common",
      requiredLevel: 1,
      sellable: false,
      sellPrice: 0,
      stackable: false,
      icon: 'inventory/mage-staff.jpg'
    };
    addItemToInventory(mageStaff);
    equipItem("Mage's Staff", "weapon");

    const healthPotion = {
      name: "Health Potion",
      type: "hpPotion",
      rarity: "common",
      requiredLevel: 1,
      sellable: true,
      sellPrice: 5,
      stackable: true,
      count: 1,
      icon: 'inventory/hp-slot.jpg'
    };
    const manaPotion = {
      name: "Mana Potion",
      type: "mpPotion",
      rarity: "common",
      requiredLevel: 1,
      sellable: true,
      sellPrice: 5,
      stackable: true,
      count: 10,
      icon: 'inventory/mp-slot.jpg'
    };
    addItemToInventory(healthPotion);
    addItemToInventory(manaPotion);
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
  exitPointerLock();
  const inventoryModal = document.getElementById('inventoryModal');
  inventoryModal.style.display = 'block';
  renderInventory();
  updateGoldDisplay();
  console.log("Inventory opened and rendered");
}

export function closeInventory() {
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
  itemElement.dataset.name = item.name;

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


function showTooltip(event) {
  const itemName = event.target.dataset.name;
  const item = findItemByName(itemName) || findEquippedItem(itemName);
  if (!item) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerHTML = `
    <h3 style="color: ${getRarityColor(item.rarity)}">${item.name}</h3>
    <p>${getItemTypeText(item.type)}</p>
    <p>${getTranslation('requiredLevel', item.requiredLevel)}</p>
    ${item.stackable ? `<p>${getTranslation('count')}: ${item.count}</p>` : ''}
    ${item.sellable ? `<p>${getTranslation('sellPrice')}: ${item.sellPrice} ${getTranslation('gold')}</p>` : ''}
    ${findEquippedItem(itemName) ? `<p>${getTranslation('equipped')}</p>` : ''}
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
    legendary: '#ff8000'
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
  event.dataTransfer.setData('text/plain', event.target.dataset.name);
  hideTooltip(); // Skryjeme tooltip při zahájení přetahování
  hideContextMenu();
}

function drop(event) {
  event.preventDefault();
  const itemName = event.dataTransfer.getData('text');
  const targetSlot = event.target.closest('.inventory-slot, .equipment-slot');

  if (targetSlot) {
    if (targetSlot.classList.contains('inventory-slot')) {
      const equippedSlot = Object.entries(equipment).find(([_, item]) => item && item.name === itemName);
      if (equippedSlot) {
        removeItemFromEquipment(equippedSlot[0]);
      }
    }
    moveItem(itemName, targetSlot);
  }
  
  hideTooltip();
}

function moveItem(itemName, targetSlot) {
  const item = findItemByName(itemName) || findEquippedItem(itemName);
  if (!item) return;

  if (targetSlot.classList.contains('equipment-slot')) {
    if (canEquipItem(item, targetSlot.id)) {
      equipItem(itemName, targetSlot.id.replace('Slot', ''));
    }
  } else {
    const targetIndex = parseInt(targetSlot.dataset.index);
    if (isNaN(targetIndex)) return;

    const sourceIndex = inventory.findIndex(i => i && i.name === itemName);
    if (sourceIndex !== -1) {
      [inventory[sourceIndex], inventory[targetIndex]] = [inventory[targetIndex], inventory[sourceIndex]];
    } else {
      const equippedSlot = Object.entries(equipment).find(([_, equippedItem]) => equippedItem && equippedItem.name === itemName);
      if (equippedSlot) {
        equipment[equippedSlot[0]] = null;
        inventory[targetIndex] = item;
      }
    }
  }

  saveInventoryToLocalStorage();
  renderInventory();
  renderEquipment();
}

function findEquippedItem(name) {
  return Object.values(equipment).find(item => item && item.name === name);
}

function canEquipItem(item, slotId) {
  const slotType = slotId.replace('Slot', '');
  return item.type === slotType && playerLevel >= item.requiredLevel;
}

function equipItem(itemName, slot) {
  const item = findItemByName(itemName);
  if (!item) {
    console.error(`Item ${itemName} not found`);
    return;
  }

  if (equipment[slot]) {
    addItemToInventory(equipment[slot]);
  }

  equipment[slot] = item;
  removeItemFromInventory(itemName, item.count);
  console.log(`Equipped ${itemName} in ${slot} slot`);
  console.log("Updated equipment:", equipment);

  updateStaffVisibility();
  saveInventoryToLocalStorage();
}

function findItemByName(name) {
  return inventory.find(item => item && item.name === name);
}

function addItemToInventory(item) {
  if (item.stackable) {
    const existingItem = inventory.find(i => i && i.name === item.name);
    if (existingItem) {
      existingItem.count += item.count || 1;
      if (existingItem.count > 255) {
        const overflow = existingItem.count - 255;
        existingItem.count = 255;
        const newItem = { ...item, count: overflow };
        saveInventoryToLocalStorage();
        return addItemToInventory(newItem);
      }
      saveInventoryToLocalStorage();
      return true;
    }
  }

  const emptySlot = inventory.findIndex(slot => slot === null);
  if (emptySlot !== -1) {
    inventory[emptySlot] = item.stackable ? { ...item, count: item.count || 1 } : item;
    saveInventoryToLocalStorage();
    return true;
  }
  return false;
}

function removeItemFromInventory(itemName, count = 1) {
  const index = inventory.findIndex(item => item && item.name === itemName);
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
      
      // Přidáme volání updateStaffVisibility
      updateStaffVisibility();
      
      renderInventory();
      renderEquipment();
      saveInventoryToLocalStorage();
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

  const itemName = itemElement.dataset.name;
  const item = findItemByName(itemName);

  if (!item || !item.sellable || isItemEquipped(item)) return;

  contextMenu.innerHTML = `
    <ul>
      <li data-action="sell" data-item="${item.name}">${getTranslation('sellItem')} (${item.sellPrice} ${getTranslation('gold')})</li>
    </ul>
  `;

  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.top = `${event.clientY}px`;

  const sellOption = contextMenu.querySelector('[data-action="sell"]');
  sellOption.addEventListener('click', () => sellItem(item.name));

  document.addEventListener('click', hideContextMenu);
}

function isItemEquipped(item) {
  return Object.values(equipment).some(equippedItem => equippedItem && equippedItem.name === item.name);
}


function hideContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.display = 'none';
  document.removeEventListener('click', hideContextMenu);
}

function sellItem(itemName) {
  const item = findItemByName(itemName);
  if (!item || !item.sellable || isItemEquipped(item)) return;

  const equippedSlot = Object.entries(equipment).find(([_, equippedItem]) => equippedItem && equippedItem.name === itemName);
  
  if (equippedSlot) {
    removeItemFromEquipment(equippedSlot[0]);
  } else {
    removeItemFromInventory(itemName, item.count);
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

export function usePotion(type) {
  if (type === 'hp' && equipment.hpPotion && equipment.hpPotion.count > 0 && hpPotionCooldown <= 0) {
    const healAmount = 50;
    const newHealth = Math.min(getPlayerHealth() + healAmount, getPlayerMaxHealth());
    setPlayerHealth(newHealth);
    equipment.hpPotion.count--;
    hpPotionCooldown = POTION_COOLDOWN;
    if (equipment.hpPotion.count === 0) {
      equipment.hpPotion = null;
    }
    renderPotionBar();
    saveInventoryToLocalStorage();
  } else if (type === 'mp' && equipment.mpPotion && equipment.mpPotion.count > 0 && mpPotionCooldown <= 0) {
    const manaAmount = 50;
    const newMana = Math.min(getPlayerMana() + manaAmount, getPlayerMaxMana());
    setPlayerMana(newMana);
    equipment.mpPotion.count--;
    mpPotionCooldown = POTION_COOLDOWN;
    if (equipment.mpPotion.count === 0) {
      equipment.mpPotion = null;
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