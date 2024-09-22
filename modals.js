import { bosses } from "./boss";
import { currentLanguage, getTranslation, setLanguage, updateTranslations, updateUITexts } from "./langUtils";
import { exitPointerLock, requestPointerLock, supabase, teleportPairsCount, totalKeys } from "./main";
import { getBestTime } from "./utils";

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
  
export  function hideSettingsModal() {
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
  