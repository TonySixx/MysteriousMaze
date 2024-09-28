import { bosses } from "./boss";
import { addItemToInventory, checkSpaceInInventory, createItem, createItemElement, getRarityColor } from "./inventory";
import { getItemName, ITEM_RARITIES, ITEM_TYPES, itemDatabase } from "./itemDatabase";
import { currentLanguage, getTranslation, setLanguage, updateTranslations, updateUITexts } from "./langUtils";
import { chestSoundBuffer, exitPointerLock, itemSoundBuffer, playSound, requestPointerLock, selectedFloor, startGame, supabase, teleportPairsCount, totalKeys } from "./main";
import { getBestTime, showMessage } from "./utils";

export function showHintModal() {
  const hintModal = document.getElementById("hintModal");
  const hintContent = document.getElementById("hintContent");
  hintContent.innerHTML = generateHintContent();
  hintModal.style.display = "block";
}

export function hideHintModal() {
  document.getElementById("hintModal").style.display = "none";
}

function generateHintContent() {
  let content = `
      <h3>${getTranslation("hintTitle")}</h3>
      <p>${getTranslation("hintKeys", [totalKeys])}</p>
      <p>${getTranslation("hintTeleports", [teleportPairsCount * 2])}</p>
      <h3>${getTranslation("bosses", [bosses.length])}</h3>
    `;

  bosses.forEach((boss) => {
    content += `
        <div class="boss-info">
          <h4>${boss.type.name}</h4>
          <p>${getTranslation("bossHealth", [boss.maxHealth])}</p>
          <p>${getTranslation("specialAttacks")} ${getReadableAttackNames(
      boss.type.specialAttacks
    )
        .map((name) => `<span class="attack-name">${name}</span>`)
        .join(", ")}</p>
          <p class="tactic">${getTranslation("tactics")} ${getBossTactics(
          boss.type.specialAttacks
        )}</p>
        </div>
      `;
  });

  content += `
      <h3>${getTranslation("hintTips")}</h3>
      <ul>
        <li>${getTranslation("hintTip1")}</li>
        <li>${getTranslation("hintTip2")}</li>
        <li>${getTranslation("hintTip3")}</li>
        <li>${getTranslation("hintTip4")}</li>
        <li>${getTranslation("hintTip5")}</li>
      </ul>
    `;

  return content;
}

function getReadableAttackNames(attacks) {
  const attackNames = {
    multiShot: getTranslation("multiShot"),
    aoeBlast: getTranslation("aoeBlast"),
    teleport: getTranslation("teleport"),
    frostbolt: getTranslation("frostbolt"),
    magicArrow: getTranslation("magicArrow"),
  };
  return attacks.map((attack) => attackNames[attack] || attack);
}
function getBossTactics(specialAttacks) {
  let tactics = [];
  specialAttacks.forEach((attack) => {
    switch (attack) {
      case "multiShot":
        tactics.push(getTranslation("multiShotTactic"));
        break;
      case "aoeBlast":
        tactics.push(getTranslation("aoeBlastTactic"));
        break;
      case "teleport":
        tactics.push(getTranslation("teleportTactic"));
        break;
      case "frostbolt":
        tactics.push(getTranslation("frostboltTactic"));
        break;
      case "magicArrow":
        tactics.push(getTranslation("magicArrowTactic"));
        break;
      default:
        tactics.push(getTranslation("defaultTactic"));
    }
  });
  return tactics.join(" ");
}


export function showNameModal(playerName) {
  exitPointerLock();
  const nameModal = document.getElementById("nameModal");
  nameModal.innerHTML = `
      <div class="modal-content">
        <h2>${getTranslation("enterName")}</h2>
        <input type="text" id="playerNameInput" value="${playerName || ""
    }" placeholder="${getTranslation("playerName")}">
        <select id="languageSelect">
          <option value="en">English</option>
          <option value="cs">Čeština</option>
        </select>
        <button id="submitName" disabled>${getTranslation("confirm")}</button>
      </div>
    `;
  nameModal.style.display = "block";

  const input = document.getElementById("playerNameInput");
  const submitButton = document.getElementById("submitName");

  input.addEventListener("input", function () {
    submitButton.disabled = this.value.trim() === "";
  });

  document.getElementById("languageSelect").value = currentLanguage;
  document.getElementById("languageSelect").addEventListener("change", (e) => {
    setLanguage(e.target.value);
    const playerName = document.getElementById("playerNameInput").value;
    showNameModal(playerName); // Refresh modal with new language
  });

  submitButton.addEventListener("click", () => {
    const name = input.value.trim();
    if (name !== "") {
      playerName = name;
      localStorage.setItem("playerName", playerName);
      document.getElementById("playerName").textContent = playerName;
      getBestTime();
      hideNameModal();
      updateTranslations();
      updateUITexts();
    }
  });

  // Inicializace stavu tlačítka
  submitButton.disabled = input.value.trim() === "";
}

export function hideNameModal() {
  exitPointerLock();
  document.getElementById("nameModal").style.display = "none";
}

export function showScoreModal() {
  exitPointerLock();
  document.getElementById("scoreModal").style.display = "block";
}

export function hideScoreModal() {
  requestPointerLock();
  document.getElementById("scoreModal").style.display = "none";
}



export function filterScores() {
  const searchTerm = document
    .getElementById("mazeSearchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#scoreTable tbody tr");

  let currentGroup = "";
  let isGroupVisible = false;

  rows.forEach((row) => {
    if (row.cells[0].colSpan === 4) {
      // Toto je řádek s názvem bludiště
      currentGroup = row.cells[0].textContent.toLowerCase();
      isGroupVisible = currentGroup.includes(searchTerm);
      row.style.display = isGroupVisible ? "" : "none";
    } else {
      // Toto je řádek s daty hráče
      if (isGroupVisible) {
        const playerName = row.cells[1].textContent.toLowerCase();
        row.style.display = playerName.includes(searchTerm) ? "" : "none";
      } else {
        row.style.display = "none";
      }
    }
  });
}


export async function displayScores(floor = null) {
  try {
    let query = supabase
      .from("maze_score")
      .select("*")
      .order("time_score", { ascending: true });

    if (floor !== null) {
      query = query.eq("floor", floor);
    }

    const { data: scores, error } = await query;

    if (error) throw error;

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";

    const groupedScores = groupAndSortScores(scores);

    Object.entries(groupedScores).forEach(([levelName, levelScores]) => {
      const groupRow = tbody.insertRow();
      const groupCell = groupRow.insertCell(0);
      groupCell.colSpan = 4;
      groupCell.textContent = levelName;
      groupCell.style.fontWeight = "bold";
      groupCell.style.backgroundColor = "#34495e";

      levelScores.forEach((score, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = "";
        row.insertCell(1).textContent = score.playername;
        row.insertCell(2).textContent = formatTime(score.time_score);
        row.insertCell(3).textContent = `Podlaží ${score.floor}`;
      });
    });
  } catch (error) {
    console.error("Chyba při načítání skóre:", error.message);
  }
}

function groupAndSortScores(scores) {
  const groupedScores = {};
  scores.forEach((score) => {
    if (!groupedScores[score.levelname]) {
      groupedScores[score.levelname] = [];
    }
    groupedScores[score.levelname].push(score);
  });

  // Seřadíme skóre v každé skupině
  Object.values(groupedScores).forEach((group) => {
    group.sort((a, b) => a.time_score - b.time_score);
  });

  return groupedScores;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}


export function showSettingsModal() {
  exitPointerLock();
  document.getElementById("lightSettings").value =
    MAX_VISIBLE_LIGHTS.toString();
  document.getElementById("qualitySettings").value = qualityFactor.toString();
  document.getElementById("settingsModal").style.display = "block";
}

export function hideSettingsModal() {
  requestPointerLock();
  document.getElementById("settingsModal").style.display = "none";
}

export function saveSettings() {
  MAX_VISIBLE_LIGHTS = parseInt(document.getElementById("lightSettings").value);
  localStorage.setItem("maxVisibleLights", MAX_VISIBLE_LIGHTS.toString());
  lightManager.maxVisibleLights = MAX_VISIBLE_LIGHTS;

  qualityFactor = parseFloat(document.getElementById("qualitySettings").value);
  localStorage.setItem("qualityFactor", qualityFactor.toString());
  setQuality(qualityFactor);

  hideSettingsModal();
}

// Upravte funkci setQuality
export function setQuality(factor) {
  qualityFactor = factor;

  // Nastavení velikosti rendereru
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Nastavení rozlišení rendereru
  renderer.setPixelRatio(window.devicePixelRatio * qualityFactor);

  // Aktualizace poměru stran kamery
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Aktualizace efektů post-processingu, pokud jsou použity
  if (composer) {
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.setPixelRatio(window.devicePixelRatio * qualityFactor);
  }
}

export function showCompletionModal(elapsedTime, goldGained, expGained, previousBestTime, newBestTime) {
  debugger;
  const modal = document.createElement('div');
  modal.id = 'completionModal';
  modal.className = 'modal';
  modal.style.display = 'block';

  const content = document.createElement('div');
  content.className = 'modal-content';

  let timeDisplay = `<p>${getTranslation('currentTime')}: ${formatTime(elapsedTime)}</p>`;

  if (previousBestTime !== null) {
    if (newBestTime) {
      timeDisplay += `<p>${getTranslation('newBestTime')}: ${formatTime(elapsedTime)}</p>`;
      timeDisplay += `<p>${getTranslation('previousBestTime')}: ${formatTime(previousBestTime)}</p>`;
    } else {
      timeDisplay += `<p>${getTranslation('bestTime')}: ${formatTime(previousBestTime)}</p>`;
    }
  } else if (newBestTime) {
    timeDisplay += `<p>${getTranslation('firstBestTime')}: ${formatTime(elapsedTime)}</p>`;
  }

  content.innerHTML = `
      <h2>${getTranslation('mazeCompleted')}</h2>
      ${timeDisplay}
      <p>${getTranslation('goldGained')}: ${goldGained}</p>
      <p>${getTranslation('expGained')}: ${expGained}</p>
      <div id="chestContainer">
        <div class="chest" data-index="0"></div>
        <div class="chest" data-index="1"></div>
        <div class="chest" data-index="2"></div>
      </div>
      <button id="continueButton" disabled>${getTranslation('continue')}</button>
    `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  const chests = content.querySelectorAll('.chest');
  chests.forEach(chest => {
    chest.openChestHandler = () => openChest(chest, selectedFloor);
    chest.addEventListener('click', chest.openChestHandler);
  });

  document.getElementById('continueButton').addEventListener('click', () => {
    document.body.removeChild(modal);
    goalReached = false;
    requestPointerLock();
    startGame();
  });
}


function openChest(chestElement, floor) {
  if (!checkSpaceInInventory(1)) {
    showMessage(getTranslation('inventoryFull'), true);
    return;
  }

  const item = generateRandomItem(floor);
  playSound(chestSoundBuffer);
  if (item === null) {
    // Pokud je item null, hráč nic nedostane
    debugger;
    chestElement.outerHTML = `<div class="emptyChest">${getTranslation('emptyChest')}</div>`;
    showMessage(getTranslation('chestEmpty'), true);
  } else {
    // Vytvoříme element pro předmět
    const itemElement = createItemElement(item, false, true);
    itemElement.style.width = '64px';
    itemElement.style.height = '64px';

    // Vyprázdníme obsah truhly a přidáme do ní element předmětu
    chestElement.innerHTML = '';
    chestElement.appendChild(itemElement);

    showMessage(`${getTranslation('youObtained')}:<span style='color: ${getRarityColor(item.rarity)}'> ${item.name}</span>`, true);
    addItemToInventory(item);
    playSound(itemSoundBuffer);
    // Povolíme mouseenter a mouseleave pro truhlu s předmětem
    chestElement.style.pointerEvents = 'auto';
  }

   // Znemožníme klikání na ostatní truhly
   document.querySelectorAll('.chest').forEach(chest => {
    if (chest !== chestElement) {
      chest.style.pointerEvents = 'none';    
    }
     // Odstraníme event listener i z ostatních truhel
     chest.removeEventListener('click', chest.openChestHandler);
  });

  // Povolíme tlačítko pro pokračování
  document.getElementById('continueButton').disabled = false;
}

function generateRandomItem(floor) {
  // Určíme úroveň předmětu na základě podlaží
  const itemLevel = floor * 5;

  // Definujeme možné vzácnosti a jejich šance
  const rarities = [
    ITEM_RARITIES.COMMON,
    ITEM_RARITIES.UNCOMMON,
    ITEM_RARITIES.RARE,
    ITEM_RARITIES.EPIC,
    ITEM_RARITIES.LEGENDARY,
    ITEM_RARITIES.MYTHIC
  ];
  const rarityChances = [0.5, 0.25, 0.15, 0.07, 0.02, 0.01]; // Musí odpovídat pořadí rarities

  // Vypočítáme vzácnost na základě náhodného hodu
  let roll = Math.random();
  let accumulatedChance = 0;
  let rarity = ITEM_RARITIES.COMMON; // Výchozí hodnota

  for (let i = 0; i < rarityChances.length; i++) {
    accumulatedChance += rarityChances[i];
    if (roll < accumulatedChance) {
      rarity = rarities[i];
      break;
    }
  }

  // Filtrujeme předměty z databáze na základě úrovně a vzácnosti
  const possibleItems = Object.values(itemDatabase).filter(item => {
    return (
      item.requiredLevel <= itemLevel &&
      item.rarity === rarity &&
      item.type !== ITEM_TYPES.WEAPON
    );
  });

  // Pokud nejsou žádné předměty s danými parametry, vrátíme null nebo defaultní předmět
  if (possibleItems.length === 0) {
    return null; // Nebo můžete vrátit nějaký defaultní předmět
  }

  // Vybereme náhodný předmět z možných předmětů
  const randomIndex = Math.floor(Math.random() * possibleItems.length);
  const selectedItem = possibleItems[randomIndex];

  return createItem(getItemName(selectedItem), 1);
}