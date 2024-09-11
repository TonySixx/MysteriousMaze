import * as THREE from "three";
import { scene, camera, walls, CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, getHash, maze, isFlying, canWalkThroughWalls, checkObjectInteractions, toggleMinimap, nearTeleport, teleportPlayer, version } from './main.js';
import { spells } from "./spells.js";
import seedrandom from "seedrandom";


var player;
var playerHealth = 100;
var playerMana = 100;

export let playerLevel = 1;
export let playerExp = 0;
export let expToNextLevel = 100;
export let skillPoints = 0;


const maxMana = 100;
const manaRegenRate = 0.5;



var moveForward = false,
    moveBackward = false,
    moveLeft = false,
    moveRight = false;
var playerRotation = 0;
var playerVelocity = new THREE.Vector3();

const EXP_SEGMENTS = 20; // Počet segmentů v EXP baru

export function setPlayerHealth(health) {
    playerHealth = health;
    updatePlayerHealthBar();
}

export function setPlayerMana(mana) {
    playerMana = mana;
    updatePlayerManaBar();
}

export function savePlayerProgress() {
    localStorage.setItem('playerLevel', playerLevel);
    localStorage.setItem('playerExp', playerExp);
    localStorage.setItem('expToNextLevel', expToNextLevel);
    localStorage.setItem('skillPoints', skillPoints);
    localStorage.setItem('version', version);
}

export function loadPlayerProgress() {

    if (localStorage.getItem('version') !== version) {
        localStorage.clear();
        localStorage.setItem('version', version);
    }

    const savedLevel = localStorage.getItem('playerLevel');
    const savedExp = localStorage.getItem('playerExp');
    const savedExpToNextLevel = localStorage.getItem('expToNextLevel');
    const savedSkillPoints = localStorage.getItem('skillPoints');

    if (savedLevel && savedExp && savedExpToNextLevel && savedSkillPoints) {
        playerLevel = parseInt(savedLevel);
        playerExp = parseInt(savedExp);
        expToNextLevel = parseInt(savedExpToNextLevel);
        skillPoints = parseInt(savedSkillPoints);
    } else {
        // Pokud nemáme uložená data, nastavíme výchozí hodnoty
        playerLevel = 1;
        playerExp = 0;
        expToNextLevel = 1000;
        skillPoints = 0;
    }
    updatePlayerStats();
    updateExpBar();
}

export function addExperience(exp) {
    playerExp += exp;
    while (playerExp >= expToNextLevel) {
        levelUp();
    }
    updateExpBar();
    savePlayerProgress();
}

function levelUp() {
    playerLevel++;
    playerExp -= expToNextLevel;
    expToNextLevel = Math.floor(expToNextLevel * 1.5);
    addSkillPoint();
    updatePlayerStats();
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

function updatePlayerStats() {
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

export function useSkillPoint() {
    if (skillPoints > 0) {
        skillPoints--;
        savePlayerProgress();
        return true;
    }
    return false;
}

export function initPlayerUI() {
    loadPlayerProgress();
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

function updatePlayerPosition(deltaTime) {

    if (player.isFrozen) {
        // Pokud je hráč zmražený, neaktualizujeme jeho pozici
        return;
    }

    playerVelocity.set(0, 0, 0);

    const speed = 6.5; // Základní rychlost hráče
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
        if (moveForward) playerVelocity.z -= speed * deltaTime;
        if (moveBackward) playerVelocity.z += speed * deltaTime;
        if (moveLeft) playerVelocity.x -= speed * deltaTime;
        if (moveRight) playerVelocity.x += speed * deltaTime;

        playerVelocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotation);
    }

    const oldPosition = player.position.clone();
    const newPosition = oldPosition.clone().add(playerVelocity);

    if (!canWalkThroughWalls) {
        const { normal, collision } = checkCollisions(newPosition);
        if (collision) {
            normal.normalize();
            const dot = playerVelocity.dot(normal);

            // Only apply sliding if the player is not moving directly into the wall
            if (Math.abs(dot) < 0.9) {
                playerVelocity.sub(normal.multiplyScalar(dot));
                newPosition.copy(oldPosition).add(playerVelocity);
            } else {
                // If moving directly into the wall, stop the player
                newPosition.copy(oldPosition);
            }

            // Perform a final collision check
            const finalCollision = checkCollisions(newPosition);
            if (finalCollision.collision) {
                newPosition.add(finalCollision.normal);
            }
        }
    }

    player.position.copy(newPosition);
    // Limit player movement to the maze area
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
    const healthPercentage = Math.max(playerHealth, 0) + '%';
    healthBarFill.style.width = healthPercentage;
    healthText.textContent = `${Math.round(playerHealth)} / 100`;
}


function updatePlayerManaBar() {
    const manaBarFill = document.getElementById('playerManaFill');
    const manaText = document.getElementById('playerManaText');
    const manaPercentage = Math.max(playerMana, 0) + '%';
    manaBarFill.style.width = manaPercentage;
    manaText.textContent = `${Math.round(playerMana)} / ${maxMana}`;
}

function regenerateMana(deltaTime) {
    if (playerMana < maxMana) {
        playerMana = Math.min(playerMana + (manaRegenRate * (deltaTime * 40)), maxMana);
        updatePlayerManaBar();
    }
}

function regenerateHealth(deltaTime) {
    if (playerHealth < 100) {
        playerHealth = Math.min(playerHealth + (0.05 * (deltaTime * 40)), 100);
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

export function onMouseClick() {
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
            toggleMinimap();
            break;

    }

    if (player.isFrozen) return; // Přidáme tuto kontrolu

    if (event.key === 'e' || event.key === 'E') {
        const frostboltSpell = spells.find(spell => spell.name === 'Frostbolt');
        if (frostboltSpell && frostboltSpell.isReady()) {
            let fired = frostboltSpell.cast();
            if (fired) {
                frostboltSpell.lastCastTime = Date.now();
            }
        }
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