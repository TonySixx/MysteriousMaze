import * as THREE from "three";
import { CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, getHash, isFlying, canWalkThroughWalls, checkObjectInteractions, toggleMinimap, nearTeleport, teleportPlayer, version, updateFloorOptions, isHighWallArea, landSoundBuffer, playSound, selectedFloor, levelUpSoundBuffer } from './main.js';
import { getActiveSpells, inspectStaff, isInspectingStaff, isSwingingStaff, spells } from "./spells.js";
import seedrandom from "seedrandom";
import { equipment, initInventory, usePotion } from "./inventory.js";
import { calculateSpellDamage, skillTree } from "./skillTree.js";
import { checkQuestAvailability, initQuestSystem } from "./quests.js";
import { initializeQuests } from "./questDatabase.js";


var player;
var playerHealth = 100;
var playerMana = 100;

export let baseMaxHealth = 100;
export let baseMaxMana = 100;
export let baseAttackBonus = 0;

export let playerExp = 0;
export let expToNextLevel = 100;
export let skillPoints = 0;



var maxMana = 100;
var maxHealth = 100;
const manaRegenRate = 0.5;


var moveForward = false,
    moveBackward = false,
    moveLeft = false,
    moveRight = false;
var playerRotation = 0;
var playerVelocity = new THREE.Vector3();

var isJumping = false;
var playSoundOnLand = false;
var jumpVelocity = 0;
const JUMP_FORCE = 0.18;
const GRAVITY = -0.014;
const FALL_MULTIPLIER = 4.5; // Násobitel pro rychlejší pád
const MAX_JUMP_HEIGHT = 2;


const EXP_SEGMENTS = 20; // Počet segmentů v EXP baru

export function getPlayerHealth() {
    return playerHealth;
}

export function getPlayerMana() {
    return playerMana;
}

export function getPlayerMaxHealth() {
    return maxHealth;
}

export function getPlayerMaxMana() {
    return maxMana;
}

export function setPlayerHealth(health) {
    playerHealth = health;
    updatePlayerHealthBar();
}

export function setPlayerMana(mana) {
    playerMana = mana;
    updatePlayerManaBar();
}


export function getPlayerLevel() {
    return playerLevel;
}

export function getPlayerName() {
    return localStorage.getItem('playerName') || 'Unnamed';
}

export function setSkillPoints(points) {
    skillPoints = points;
    savePlayerProgress();
  }

export function calculatePlayerDamage() {
    const baseDamage = 0;
    const weaponDamage = equipment.weapon ? equipment.weapon.attackBonus || 0 : 0;
    return baseDamage + weaponDamage;
}

export function updatePlayerStats(initialCall = false) {
    let totalHpBonus = 0;
    let totalMpBonus = 0;
    let totalAttackBonus = 0;

    // Procházíme vybavení a sčítáme bonusy
    for (const [slot, item] of Object.entries(equipment)) {
        if (item) {
            totalHpBonus += item.hpBonus || 0;
            totalMpBonus += item.mpBonus || 0;
            totalAttackBonus += item.attackBonus || 0;
        }
    }

    // Aktualizujeme maximální zdraví a manu
    maxHealth = baseMaxHealth + totalHpBonus;
    maxMana = baseMaxMana + totalMpBonus;

    // Aktualizujeme aktuální zdraví a manu, aby nepřesáhly nové maximum
    playerHealth = Math.min(playerHealth, maxHealth);
    playerMana = Math.min(playerMana, maxMana);

    if (initialCall) {
        setPlayerHealth(maxHealth);
        setPlayerMana(maxMana);
    }

    // Aktualizujeme útočný bonus
    baseAttackBonus = totalAttackBonus;

    // Aktualizujeme uživatelské rozhraní
    updatePlayerHealthBar();
    updatePlayerManaBar();

    // Aktualizujeme poškození kouzel
    updateSpellDamage();
}

function updateSpellDamage() {
    spells.forEach(spell => {
        const spellInfo = skillTree[spell.id];
        spell.damage = calculateSpellDamage(spellInfo);
    });
}



export function savePlayerProgress() {
    localStorage.setItem('playerLevel', playerLevel);
    localStorage.setItem('playerExp', playerExp);
    localStorage.setItem('expToNextLevel', expToNextLevel);
    localStorage.setItem('skillPoints', skillPoints);
    localStorage.setItem('playerGold', playerGold.toString());
    localStorage.setItem('version', version);
}

export function loadPlayerProgress() {
    const savedVersion = localStorage.getItem('version');
    const savedLevel = localStorage.getItem('playerLevel');
    const savedExp = localStorage.getItem('playerExp');
    const savedGold = localStorage.getItem('playerGold') || 0;
    const savedExpToNextLevel = localStorage.getItem('expToNextLevel');
    const playerName = localStorage.getItem('playerName');
    MAX_VISIBLE_LIGHTS = parseInt(localStorage.getItem("maxVisibleLights")) || 10;
    qualityFactor = parseFloat(localStorage.getItem("qualityFactor")) || 1;

    // Funkce pro extrakci major a minor verze z řetězce verze
    function getVersionParts(versionString) {
        if (!versionString) return [null, null];
        const parts = versionString.split('.');
        return [parts[0], parts[1]]; // Předpokládáme formát verze 'major.minor.patch'
    }

    const [savedMajorVersion, savedMinorVersion] = getVersionParts(savedVersion);
    const [currentMajorVersion, currentMinorVersion] = getVersionParts(version);

    if (savedMajorVersion !== currentMajorVersion) {
        // Hlavní verze se změnila, resetujeme vše kromě grafických nastavení
        const savedGraphicsSettings = {
            maxVisibleLights: localStorage.getItem("maxVisibleLights"),
            qualityFactor: localStorage.getItem("qualityFactor")
        };

        localStorage.clear();

        localStorage.setItem("maxVisibleLights", savedGraphicsSettings.maxVisibleLights);
        localStorage.setItem("qualityFactor", savedGraphicsSettings.qualityFactor);

        playerLevel = 1;
        playerExp = 0;
        expToNextLevel = 1000;
        playerGold = 0;
        skillPoints = 0;

        localStorage.setItem('version', version);
        localStorage.setItem('skillPoints', skillPoints);
        localStorage.setItem('playerLevel', playerLevel);
        localStorage.setItem('playerExp', playerExp);
        localStorage.setItem('expToNextLevel', expToNextLevel);
        localStorage.setItem('playerGold', playerGold);
        if (playerName) {
            localStorage.setItem('playerName', playerName);
        }
    } else if (savedMinorVersion !== currentMinorVersion) {
        // Minoritní verze se změnila, resetujeme skillTree a skillPoints
        localStorage.removeItem('skillTree');
        playerLevel = parseInt(savedLevel) || 1;
        playerExp = parseInt(savedExp) || 0;
        expToNextLevel = parseInt(savedExpToNextLevel) || 1000;
        playerGold = parseInt(savedGold) || 0;
        skillPoints = calculateTotalSkillPoints(playerLevel);

        localStorage.setItem('version', version);
        localStorage.setItem('skillPoints', skillPoints);
        localStorage.setItem('playerLevel', playerLevel);
        localStorage.setItem('playerExp', playerExp);
        localStorage.setItem('expToNextLevel', expToNextLevel);
        localStorage.setItem('playerGold', playerGold);
    } else {
        // Verze se nezměnila, načteme všechna data
        const savedSkillPoints = localStorage.getItem('skillPoints');
        if (savedLevel && savedExp && savedExpToNextLevel && savedSkillPoints) {
            playerLevel = parseInt(savedLevel);
            playerExp = parseInt(savedExp);
            expToNextLevel = parseInt(savedExpToNextLevel);
            skillPoints = parseInt(savedSkillPoints);
            playerGold = parseInt(savedGold);
        } else {
            // Pokud nejsou uložená data, nastavíme výchozí hodnoty
            playerLevel = 1;
            playerExp = 0;
            expToNextLevel = 1000;
            skillPoints = 0;
            playerGold = 0;
        }
    }

    // Aktualizujeme verzi v localStorage
    localStorage.setItem('version', version);

    // Always set graphics settings
    localStorage.setItem("maxVisibleLights", MAX_VISIBLE_LIGHTS.toString());
    localStorage.setItem("qualityFactor", qualityFactor.toString());

    updatePlayerLevelStats();
    updateGoldDisplay();
    updateExpBar();
    initInventory();
    initQuestSystem();
    initializeQuests();

}

// Pomocná funkce pro výpočet celkového počtu skillPoints na základě úrovně hráče
 export function calculateTotalSkillPoints(level) {
    return level - 1;
}


export function addExperience(exp) {
    playerExp += exp;
    while (playerExp >= expToNextLevel) {
        levelUp();
    }
    updateExpBar();
    savePlayerProgress();
}

export function addGold(amount) {
    playerGold += amount;
    updateGoldDisplay();
    savePlayerProgress();
}

export function getGold() {
    return playerGold;
}

function levelUp() {
    playSound(levelUpSoundBuffer);
    playerLevel++;
    playerExp -= expToNextLevel;
    expToNextLevel = Math.floor(expToNextLevel * 1.2);
    addSkillPoint();
    updatePlayerLevelStats();
    updateFloorOptions();
    checkQuestAvailability();
}




function createExpSegments() {
    const expSegments = document.getElementById('expSegments');
    expSegments.innerHTML = ''; // Vyčistíme existující segmenty
    for (let i = 0; i < EXP_SEGMENTS; i++) {
        const segment = document.createElement('div');
        segment.className = 'expSegment';
        expSegments.appendChild(segment);
    }
}

function updateExpBar() {
    const expPercentage = (playerExp / expToNextLevel) * 100;
    document.getElementById('expFill').style.width = `${expPercentage}%`;
    document.getElementById('expText').textContent = `${playerExp} / ${expToNextLevel}`;
}

function updateGoldDisplay() {
    const goldCountElement = document.getElementById('goldCount');
    if (goldCountElement) {
        goldCountElement.textContent = playerGold.toLocaleString();
    }
}

function updatePlayerLevelStats() {
    document.getElementById('playerLevel').textContent = `Level ${playerLevel}`;
    updateSkillPointsDisplay();
}


export function getSkillPoints() {
    return skillPoints;
}

export function addSkillPoint() {
    skillPoints++;
    updateSkillPointsDisplay();
}

function updateSkillPointsDisplay() {
    const skillPointsElement = document.getElementById('skillPoints');
    if (skillPointsElement) {
        skillPointsElement.textContent = `Dovednostní body: ${skillPoints}`;
    }
}

export function useSkillPoint(cost = 1) {
    if (skillPoints >= cost) {
        skillPoints -= cost;
        savePlayerProgress();
        return true;
    }
    return false;
}

export function initPlayerUI() {
    updatePlayerHealthBar();
    updatePlayerManaBar();
    createExpSegments();
    updateExpBar();
    document.getElementById('playerLevel').textContent = `Level ${playerLevel}`;
}


function createPlayer() {
    if (player) {
        scene.remove(player);
        camera.parent.remove(camera);
    }
    player = new THREE.Group();
    camera.position.set(0, 1.6, 0);
    player.add(camera);
    scene.add(player);

    if (selectedFloor === 999) { //Tábor
        player.position.set(0, 0, 15 - (CELL_SIZE / 2));
        return;
    }

    if (selectedFloor >= 100 && selectedFloor <= 200) { //Boss floor
        player.position.set(0, 0, 10 - (CELL_SIZE / 2));
        return;
    }

    const seed = getHash(document.getElementById("mazeInput").value);
    let rng = new seedrandom(seed);
    // Najděme volnou buňku v bludišti pro umístění hráče
    let freeCells = [];
    for (let i = 0; i < MAZE_SIZE; i++) {
        for (let j = 0; j < MAZE_SIZE; j++) {
            if (maze[i][j] === 0) {
                freeCells.push({ x: i, z: j });
            }
        }
    }

    if (freeCells.length > 0) {
        // Vybereme náhodnou volnou buňku a umístíme na ni hráče
        let cell = freeCells[Math.floor(rng() * freeCells.length)];
        player.position.set(
            (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
            0,
            (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );
    } else {
        console.error("Nepodařilo se najít volnou buňku pro umístění hráče.");
    }
}

export function checkCollisionX(newX, currentZ) {
    const playerRadius = 0.4;

    for (let wall of walls) {
        // Výpočty hranic stěny
        const wallMinX = wall.position.x - CELL_SIZE / 2;
        const wallMaxX = wall.position.x + CELL_SIZE / 2;
        const wallMinZ = wall.position.z - CELL_SIZE / 2;
        const wallMaxZ = wall.position.z + CELL_SIZE / 2;

        // Kontrola překrytí podél osy Z
        if (currentZ + playerRadius > wallMinZ && currentZ - playerRadius < wallMaxZ) {
            // Kontrola kolize podél osy X
            if (newX + playerRadius > wallMinX && newX - playerRadius < wallMaxX) {
                // Detekována kolize podél osy X
                if (newX > wall.position.x) {
                    // Hráč je napravo od stěny, posuňte ho doprava
                    newX = wallMaxX + playerRadius;
                } else {
                    // Hráč je nalevo od stěny, posuňte ho doleva
                    newX = wallMinX - playerRadius;
                }
            }
        }
    }

    return newX;
}

export function checkCollisionZ(currentX, newZ) {
    const playerRadius = 0.4;

    for (let wall of walls) {
        // Výpočty hranic stěny
        const wallMinX = wall.position.x - CELL_SIZE / 2;
        const wallMaxX = wall.position.x + CELL_SIZE / 2;
        const wallMinZ = wall.position.z - CELL_SIZE / 2;
        const wallMaxZ = wall.position.z + CELL_SIZE / 2;

        // Kontrola překrytí podél osy X
        if (currentX + playerRadius > wallMinX && currentX - playerRadius < wallMaxX) {
            // Kontrola kolize podél osy Z
            if (newZ + playerRadius > wallMinZ && newZ - playerRadius < wallMaxZ) {
                // Detekována kolize podél osy Z
                if (newZ > wall.position.z) {
                    // Hráč je před stěnou, posuňte ho dopředu
                    newZ = wallMaxZ + playerRadius;
                } else {
                    // Hráč je za stěnou, posuňte ho dozadu
                    newZ = wallMinZ - playerRadius;
                }
            }
        }
    }

    return newZ;
}

function updatePlayerPosition(deltaTime) {
    if (player.isFrozen) {
        // Pokud je hráč zmražený, neaktualizujeme jeho pozici
        return;
    }

    playerVelocity.set(0, 0, 0);

    const speed = window.playerSpeed; // Základní rychlost hráče
    const flySpeed = 6.5; // Rychlost při letu

    if (isFlying) {
        // Při letu se pohybujeme ve směru kamery, pokud jsou stisknuty klávesy
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        if (moveForward) playerVelocity.add(direction.clone().multiplyScalar(flySpeed * deltaTime));
        if (moveBackward) playerVelocity.add(direction.clone().multiplyScalar(-flySpeed * deltaTime));
        if (moveLeft) {
            const leftDirection = new THREE.Vector3(direction.z, 0, -direction.x).normalize();
            playerVelocity.add(leftDirection.clone().multiplyScalar(flySpeed * deltaTime));
        }
        if (moveRight) {
            const rightDirection = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
            playerVelocity.add(rightDirection.clone().multiplyScalar(flySpeed * deltaTime));
        }
    } else {

        // Aplikujte gravitaci a skok
        if (isJumping) {
            jumpVelocity += GRAVITY * deltaTime * 60;
            const newY = player.position.y + jumpVelocity * deltaTime * 60;

            // Kontrola kolize se stropem před aplikací nové pozice
            if (checkCeilingCollision()) {
                isJumping = false;
                jumpVelocity = GRAVITY * FALL_MULTIPLIER; // Okamžitě začneme padat rychleji
            } else {
                player.position.y = newY;
            }
        }

        // Vždy aplikujte gravitaci, i když hráč neskáče
        if (!isJumping && player.position.y > 0) {
            player.position.y += GRAVITY * FALL_MULTIPLIER * deltaTime * 60;
        }

        // Zajistěte, že hráč nespadne pod podlahu
        if (player.position.y <= 0) {
            player.position.y = 0;
            isJumping = false;
            jumpVelocity = 0;
            if (playSoundOnLand) {
                playSoundOnLand = false;
                playSound(landSoundBuffer, 0.35);
            }
        }

        // Upravená část pro normalizaci pohybu
        let moveVector = new THREE.Vector3(0, 0, 0);
        if (moveForward) moveVector.z -= 1;
        if (moveBackward) moveVector.z += 1;
        if (moveLeft) moveVector.x -= 1;
        if (moveRight) moveVector.x += 1;

        // Normalizujeme vektor pohybu, pokud se hráč pohybuje
        if (moveVector.length() > 0) {
            moveVector.normalize();
            playerVelocity.x = moveVector.x * speed * deltaTime;
            playerVelocity.z = moveVector.z * speed * deltaTime;
        }

        playerVelocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation);
    }

    const oldPosition = player.position.clone();
    let newPosition = oldPosition.clone();

    // Aplikujeme rychlost na novou pozici
    newPosition.add(playerVelocity);

    if (!canWalkThroughWalls) {
        // Vyřešíme kolize podél osy X
        newPosition.x = checkCollisionX(newPosition.x, oldPosition.z);

        // Vyřešíme kolize podél osy Z
        newPosition.z = checkCollisionZ(newPosition.x, newPosition.z);
    }

    player.position.copy(newPosition);

    // Omezení pohybu hráče na oblast bludiště
    player.position.x = Math.max(
        Math.min(player.position.x, (MAZE_SIZE * CELL_SIZE) / 2),
        (-MAZE_SIZE * CELL_SIZE) / 2
    );
    player.position.z = Math.max(
        Math.min(player.position.z, (MAZE_SIZE * CELL_SIZE) / 2),
        (-MAZE_SIZE * CELL_SIZE) / 2
    );

    if (!isFlying) {
        player.position.y = Math.max(0, player.position.y); // Neumožní pád pod podlahu
    }

    checkObjectInteractions();
}

export function checkCeilingCollision() {
    const ceilingBuffer = 0.5; // Buffer pro začátek pádu před dosažením stropu

    if (isHighWallArea(player.position.x, player.position.z)) {
        // V oblasti s vysokými stěnami
        if (player.position.y >= WALL_HEIGHT - ceilingBuffer) {
            player.position.y = WALL_HEIGHT - ceilingBuffer;
            return true;
        }
    } else {
        // V normální oblasti
        if (player.position.y >= MAX_JUMP_HEIGHT - ceilingBuffer) {
            player.position.y = MAX_JUMP_HEIGHT - ceilingBuffer;
            return true;
        }
    }
    return false;
}

function checkCollisions(newPosition) {
    const playerRadius = 0.4;
    const wallMargin = 0.3;

    let collisionNormal = new THREE.Vector3();
    let hasCollision = false;

    for (let wall of walls) {
        const dx = newPosition.x - wall.position.x;
        const dz = newPosition.z - wall.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < CELL_SIZE / 2 + playerRadius + wallMargin) {
            const normal = new THREE.Vector3(dx, 0, dz).normalize();
            const penetrationDepth = CELL_SIZE / 2 + playerRadius + wallMargin - distance;
            collisionNormal.add(normal.multiplyScalar(penetrationDepth));
            hasCollision = true;
        }
    }

    return { normal: collisionNormal, collision: hasCollision };
}

function updatePlayerHealthBar() {
    const healthBarFill = document.getElementById('playerHealthFill');
    const healthText = document.getElementById('playerHealthText');
    const maxHealth = getPlayerMaxHealth();
    const healthPercentage = Math.min(Math.max((playerHealth / maxHealth) * 100, 0), 100) + '%';
    healthBarFill.style.width = healthPercentage;
    healthText.textContent = `${Math.round(playerHealth)} / ${maxHealth}`;
}

function updatePlayerManaBar() {
    const manaBarFill = document.getElementById('playerManaFill');
    const manaText = document.getElementById('playerManaText');
    const maxMana = getPlayerMaxMana();
    const manaPercentage = Math.min(Math.max((playerMana / maxMana) * 100, 0), 100) + '%';
    manaBarFill.style.width = manaPercentage;
    manaText.textContent = `${Math.round(playerMana)} / ${maxMana}`;
}

function regenerateMana(deltaTime) {
    if (playerMana < getPlayerMaxMana()) {
        playerMana = Math.min(playerMana + (manaRegenRate * (deltaTime * 40)), getPlayerMaxMana());
        updatePlayerManaBar();
    }
}

function regenerateHealth(deltaTime) {
    if (playerHealth < getPlayerMaxHealth()) {
        playerHealth = Math.min(playerHealth + (0.05 * (deltaTime * 40)), getPlayerMaxHealth());
        updatePlayerHealthBar();
    }
}

export function onMouseMove(event) {
    if (document.pointerLockElement === document.body) {
        const movementX =
            event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY =
            event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        playerRotation -= movementX * 0.002;
        player.rotation.y = playerRotation;

        const verticalRotation = camera.rotation.x - movementY * 0.002;
        camera.rotation.x = Math.max(
            Math.min(verticalRotation, Math.PI / 2),
            -Math.PI / 2
        );
    }
}

export function onMouseClick(event) {
    //TODO: 
    if (event.target.tagName !== "CANVAS") {
        return;
    }

    if (document.pointerLockElement !== document.body) {
        document.body.requestPointerLock();
    }
}

export function onKeyDown(event) {

    switch (event.code) {
        case "KeyW":
            moveForward = true;
            break;
        case "KeyS":
            moveBackward = true;
            break;
        case "KeyA":
            moveLeft = true;
            break;
        case "KeyD":
            moveRight = true;
            break;
        case "KeyF": // Přidáno: reakce na stisknutí klávesy F
            if (nearTeleport) {
                teleportPlayer(nearTeleport);
            }
            break;
        case "KeyV":
            window.minimapUsed = true;
            toggleMinimap();
            break;
        case "KeyG":
            if (!isInspectingStaff && !isSwingingStaff) {
                inspectStaff();
            }
            break;
        case "Space":
            if (!isJumping && !isFlying) {
                isJumping = true;
                playSoundOnLand = true;
                jumpVelocity = JUMP_FORCE;
            }
            break;

    }

    // Přidáme kontrolu, zda je nějaký modál otevřený
    if (isAnyModalOpen()) return;

    if (player.isFrozen) return;
    if (!equipment.weapon) return; // Přidáme kontrolu vybavené zbraně

    if (event.key === 'e' || event.key === 'E') {
        const frostboltSpell = spells.find(spell => spell.name === 'Frostbolt');
        if (frostboltSpell && frostboltSpell.isReady()) {
            let fired = frostboltSpell.cast();
            if (fired) {
                frostboltSpell.lastCastTime = Date.now();
            }
        }
    }
    else if (event.key === 'r' || event.key === 'R') {
        const chainLightningSpell = getActiveSpells().find(spell => spell.name === 'Chain Lightning');
        if (chainLightningSpell && chainLightningSpell.isReady()) {
            let fired = chainLightningSpell.cast();
            if (fired) {
                chainLightningSpell.lastCastTime = Date.now();
            }
        }
    }
    else if (event.key === 'q' || event.key === 'Q') {
        const teleportSpell = getActiveSpells().find(spell => spell.name === 'Teleport');
        if (teleportSpell && teleportSpell.isReady()) {
            let fired = teleportSpell.cast();
            if (fired) {
                teleportSpell.lastCastTime = Date.now();
            }
        }
    }

    else if (event.code === 'Digit1') {
        usePotion('hp');
    } else if (event.code === 'Digit2') {
        usePotion('mp');
    }
}

export function onKeyUp(event) {
    switch (event.code) {
        case "KeyW":
            moveForward = false;
            break;
        case "KeyS":
            moveBackward = false;
            break;
        case "KeyA":
            moveLeft = false;
            break;
        case "KeyD":
            moveRight = false;
            break;
    }
}

// Přidáme novou funkci pro kontrolu otevřených modálů
export function isAnyModalOpen() {
    return document.getElementById("scoreModal")?.style.display === "block" ||
        document.getElementById("hintModal")?.style.display === "block" ||
        document.getElementById("settingsModal")?.style.display === "block" ||
        document.getElementById("inventoryModal")?.style.display === "block" ||
        document.getElementById("skillTreeModal")?.style.display === "block" ||
        document.getElementById("questWindow")?.style.display === "flex" ||
        document.getElementById("floorSelectModal")?.style.display === "block" ||
        document.getElementById("completionModal")?.style.display === "block" ||
        document.getElementById("nameModal")?.style.display === "block" ||
        (document.getElementById("questBoardWindow") && document.getElementById("questBoardWindow")?.style.display !== "none") ||
        document.getElementsByClassName("shop-modal")?.length > 0;
}

export {
    player,
    playerHealth,
    playerMana,
    maxMana,
    manaRegenRate,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    playerRotation,
    playerVelocity,
    createPlayer,
    updatePlayerPosition,
    checkCollisions,
    updatePlayerHealthBar,
    updatePlayerManaBar,
    regenerateMana,
    regenerateHealth
};