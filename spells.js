import * as THREE from "three";
import { CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, isHighWallArea, chainLightningSoundBuffer, playSound, selectedFloor, teleportSoundBuffer } from './main.js';
import { calculatePlayerDamage, checkCollisions, player } from "./player.js"
import { changeStaffColor, fireballSoundBuffer, frostBoltSoundBuffer, magicMissileSoundBuffer } from "./main.js"
import frostboltIcon from './public/spells/frostbolt-icon.png';
import arcaneMissileIcon from './public/spells/arcane-missile-icon.png';
import fireballIcon from './public/spells/fireball-icon.png';
import chainLightningIcon from './public/spells/chain-lightning-icon.png';
import teleportIcon from './public/spells/teleport-icon.png';
import { setPlayerMana, updatePlayerManaBar, playerMana } from "./player.js"
import { bosses } from "./boss.js";
import { calculateSpellDamage, isSpellUnlocked } from "./skillTree.js";
import { checkProjectileCollisionWithBosses, createCastEffect, createExplosion, getCameraDirection } from "./utils.js";
import { initiateTeleportMove } from "./animate.js";

export let fireBalls = [];
export let frostBalls = [];
export let arcaneMissiles = [];
export let chainLightnings = [];

export let lastSpellCastTime = 0;

export function resetSpells() {
  fireBalls = [];
  frostBalls = [];
  arcaneMissiles = [];
  chainLightnings = [];
}


class Spell {
  constructor(name, icon, key, cooldown, id, castFunction, damage) {
    this.name = name;
    this.icon = icon;
    this.key = key;
    this.cooldown = cooldown;
    this.lastCastTime = 0;
    this.id = id;
    this.cast = castFunction;
    this.damage = 0;
  }

  isReady() {
    return Date.now() - this.lastCastTime > this.cooldown;
  }
}

// Definice kouzel
var spells = [
  new Spell('Fireball', fireballIcon, 'LMB', 500, "fireball", castFireball, 100),
  new Spell('Arcane Missile', arcaneMissileIcon, 'RMB', 200, "arcaneMissile", castArcaneMissile, 50),
  new Spell('Frostbolt', frostboltIcon, 'E', 5000, "frostbolt", castFrostbolt, 0),
  new Spell('Chain Lightning', chainLightningIcon, 'R', 8000, "chainLightning", castChainLightning, 300),
  new Spell('Teleport', teleportIcon, 'Q', 7000, "teleport", castTeleport, 0),
];

// Funkce pro získání aktivních kouzel
export function getActiveSpells() {
  return spells.filter(spell =>
    spell.name === 'Fireball' ||
    spell.name === 'Arcane Missile' ||
    spell.name === 'Frostbolt' ||
    (spell.name === 'Chain Lightning' && isSpellUnlocked('chainLightning')) ||
    (spell.name === 'Teleport' && isSpellUnlocked('teleport'))
  );
}


// V funkci updateSpellUpgrades přidejte nové podmínky pro nové upgrady
export function updateSpellUpgrades(skillTree) {
  spells.forEach(spell => {
    const spellInfo = skillTree[spell.id];
    if (spellInfo) {
      // Aktualizace poškození kouzla
      spell.damage = calculateSpellDamage(spellInfo);

      // Aktualizace dalších vlastností kouzla
      if (spellInfo.upgrades) {
        spellInfo.upgrades.forEach(upgrade => {
          if (upgrade.unlocked) {
            if (upgrade.name === 'Inferno Touch') {
              spell.burningEffect = true;
            } else if (upgrade.name === 'Ice Explosion') {
              spell.iceExplosion = true;
            } else if (upgrade.name === 'Multi-shot') {
              spell.multiShot = true;
            } else if (upgrade.name === 'Chain Explosion') {
              spell.chainExplosion = true;
            } else if (upgrade.name === 'Explozivní jádro') {
              spell.explosiveCore = true;
            } else if (upgrade.name === 'Mrazivá aura') {
              spell.frostAura = true;
            }
          }
        });
      }
    }
  });
}



// Funkce pro vytvoření ohnivé koule
function createFireball() {
  const fireball = new THREE.Group();

  // Vytvoření základní koule s emissive materiálem
  const geometry = new THREE.SphereGeometry(0.2, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6a32,
    emissive: 0xff6a32,
    emissiveIntensity: 3
  });
  const core = new THREE.Mesh(geometry, material);
  fireball.add(core);

  // Přidání částicového efektu
  const particleCount = 50;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.05,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.45;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.45;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  fireball.add(particles);

  // Animace částic
  fireball.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.02;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.04;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  return fireball;
}

function createFrostbolt() {
  const frostbolt = new THREE.Group();

  // Core ice sphere
  const geometry = new THREE.SphereGeometry(0.2, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x87CEFA,
    emissive: 0x87CEFA,
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 0.8
  });
  const core = new THREE.Mesh(geometry, material);
  frostbolt.add(core);

  // Ice trail
  const trailParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xADD8E6,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const trailPositions = new Float32Array(60 * 3);
  trailParticles.geometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  frostbolt.add(trailParticles);

  // Jemné ledové částice
  const iceParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.03,
      blending: THREE.AdditiveBlending,
      opacity: 1,
    })
  );

  const icePositions = new Float32Array(100 * 3);
  for (let i = 0; i < icePositions.length; i += 3) {
    icePositions[i] = (Math.random() - 0.5) * 0.4;
    icePositions[i + 1] = (Math.random() - 0.5) * 0.4;
    icePositions[i + 2] = (Math.random() - 0.5) * 0.4;
  }
  iceParticles.geometry.setAttribute('position', new THREE.BufferAttribute(icePositions, 3));
  frostbolt.add(iceParticles);

  frostbolt.userData.animate = function (deltaTime) {
    // Získání směru kamery
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Animate ice trail
    const trailPositions = trailParticles.geometry.attributes.position.array;
    for (let i = trailPositions.length - 1; i >= 3; i -= 3) {
      trailPositions[i] = trailPositions[i - 3];
      trailPositions[i - 1] = trailPositions[i - 4];
      trailPositions[i - 2] = trailPositions[i - 5];
    }

    // Nastavení nové pozice částice podle směru kamery
    trailPositions[0] = -cameraDirection.x * 0.2;
    trailPositions[1] = -cameraDirection.y * 0.2;
    trailPositions[2] = -cameraDirection.z * 0.2;

    trailParticles.geometry.attributes.position.needsUpdate = true;

    // Animate ice particles
    const icePositions = iceParticles.geometry.attributes.position.array;
    for (let i = 0; i < icePositions.length; i += 3) {
      icePositions[i] += (Math.random() - 0.5) * 0.01;
      icePositions[i + 1] += (Math.random() - 0.5) * 0.01;
      icePositions[i + 2] += (Math.random() - 0.5) * 0.01;
    }
    iceParticles.geometry.attributes.position.needsUpdate = true;
  };

  return frostbolt;
}

function createSquareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(8, 8, 16, 16);
  return new THREE.CanvasTexture(canvas);
}



function createArcaneMissile() {
  const arcaneMissile = new THREE.Group();

  // Core arcane sphere
  const geometry = new THREE.SphereGeometry(0.15, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x7c6bfa,
    emissive: 0x774aff,
    emissiveIntensity: 3
  });
  const core = new THREE.Mesh(geometry, material);
  arcaneMissile.add(core);

  // Arcane runes
  const runeParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.05,
      blending: THREE.AdditiveBlending,
      transparent: true,
      map: createRuneTexture()
    })
  );

  const runePositions = new Float32Array(20 * 3);
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 0.2;
    runePositions[i * 3] = Math.cos(angle) * radius;
    runePositions[i * 3 + 1] = Math.sin(angle) * radius;
    runePositions[i * 3 + 2] = 0;
  }
  runeParticles.geometry.setAttribute('position', new THREE.BufferAttribute(runePositions, 3));
  arcaneMissile.add(runeParticles);

  // Arcane trail
  const trailParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0x774aff,
      size: 0.03,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const trailPositions = new Float32Array(70 * 3);
  trailParticles.geometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  arcaneMissile.add(trailParticles);

  arcaneMissile.userData.animate = function (deltaTime) {
    // Rotate arcane runes
    runeParticles.rotation.z += deltaTime * 2;

    // Animate arcane trail
    const trailPositions = trailParticles.geometry.attributes.position.array;
    for (let i = trailPositions.length - 1; i >= 3; i -= 3) {
      trailPositions[i] = trailPositions[i - 3];
      trailPositions[i - 1] = trailPositions[i - 4];
      trailPositions[i - 2] = trailPositions[i - 5];
    }
    trailPositions[0] = 0;
    trailPositions[1] = 0;
    trailPositions[2] = -0.2;
    trailParticles.geometry.attributes.position.needsUpdate = true;
  };

  return arcaneMissile;
}

function createRuneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ᚠ', 16, 16);
  return new THREE.CanvasTexture(canvas);
}


// Přidáme novou funkci castFireball
function castFireball() {
  if (playerMana >= 20) {
    setPlayerMana(playerMana - 20);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0xff4500);

    playSound(fireballSoundBuffer);

    const fireball = createFireball();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    fireball.position.copy(staffWorldPosition);
    fireball.position.y += 0.3;

    const cameraDirection = getCameraDirection();
    const leftVector = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();
    fireball.position.addScaledVector(leftVector, -0.1);

    animateStaffSwing(); // Přidáno volání animace
    createCastEffect(staffWorldPosition, 0xff4500);

    const direction = getCameraDirection();
    fireball.velocity = direction.multiplyScalar(0.25);
    const fireballSpell = spells.find(spell => spell.name === 'Fireball');
    fireball.damage = fireballSpell ? fireballSpell.damage : 100;
    fireball.burningEffect = fireballSpell ? fireballSpell.burningEffect : false;
    fireball.explosiveCore = fireballSpell ? fireballSpell.explosiveCore : false;

    scene.add(fireball);
    fireBalls.push(fireball);
    return true;
  }
  return false;
}

export function createIceExplosion(position) {
  const explosionGeometry = new THREE.SphereGeometry(3, 32, 32);
  const explosionMaterial = new THREE.MeshBasicMaterial({
    color: 0x87CEFA,
    transparent: true,
    opacity: 0.5
  });
  const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
  explosion.position.copy(position);
  scene.add(explosion);
  iceExplosions.push(explosion);
}

function castFrostbolt() {
  if (playerMana >= 30) {
    setPlayerMana(playerMana - 30);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0x8feaff);

    playSound(frostBoltSoundBuffer, 0.7);

    const frostbolt = createFrostbolt();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    frostbolt.position.copy(staffWorldPosition);
    frostbolt.position.y += 0.3;

    const cameraDirection = getCameraDirection();
    const leftVector = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();
    frostbolt.position.addScaledVector(leftVector, -0.1);

    animateStaffSwing(); // Přidáno volání animace
    createCastEffect(staffWorldPosition, 0x00ffff);
    const direction = getCameraDirection();
    frostbolt.velocity = direction.multiplyScalar(0.25);

    // Přidáme informaci o vylepšení do frostboltu
    const frostboltSpell = spells.find(spell => spell.name === 'Frostbolt');
    frostbolt.iceExplosion = frostboltSpell ? frostboltSpell.iceExplosion : false;

    frostbolt.damage = frostboltSpell ? frostboltSpell.damage : 0;

    frostbolt.frostAura = frostboltSpell ? frostboltSpell.frostAura : false;

    if (frostbolt.frostAura) {
      createFrostAura();
    }

    scene.add(frostbolt);
    frostBalls.push(frostbolt);
    return true;
  }
  return false;
}

function castArcaneMissile() {
  if (playerMana >= 10) {
    setPlayerMana(playerMana - 10);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0x9661ff);

    playSound(magicMissileSoundBuffer);
    const arcaneMissileSpell = spells.find(spell => spell.name === 'Arcane Missile');
    const multiShot = arcaneMissileSpell ? arcaneMissileSpell.multiShot : false;
    const missileCount = multiShot ? 3 : 1;

    for (let i = 0; i < missileCount; i++) {
      const arcaneMissile = createArcaneMissile();
      const staffWorldPosition = new THREE.Vector3();
      staffModel.getWorldPosition(staffWorldPosition);
      arcaneMissile.position.copy(staffWorldPosition);
      arcaneMissile.position.y += 0.3;

      const cameraDirection = getCameraDirection();
      const leftVector = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();
      arcaneMissile.position.addScaledVector(leftVector, -0.1);

      animateStaffSwing(); // Přidáno volání animace
      createCastEffect(staffWorldPosition, 0x9661ff);

      const direction = getCameraDirection();
      if (multiShot) {
        // Přidáme mírnou odchylku pro každou střelu
        const spread = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        direction.add(spread).normalize();
      }
      arcaneMissile.velocity = direction.multiplyScalar(0.25);

      // Nastavíme sílu střely
      arcaneMissile.damage = arcaneMissileSpell ? arcaneMissileSpell.damage : 50;
      arcaneMissile.power = multiShot ? 0.7 : 1;

      scene.add(arcaneMissile);
      arcaneMissiles.push(arcaneMissile);
    }
    return true;
  }
  return false;
}

// Funkce pro aktualizaci pozic a animace ohnivých koulí
function updateFireballs(deltaTime) {
  for (let i = fireBalls.length - 1; i >= 0; i--) {
    const fireball = fireBalls[i];
    fireball.position.add(fireball.velocity.clone().multiplyScalar(deltaTime * 40));

    // Animace částic v ohnivé kouli
    fireball.userData.animate();

    // Kolize s bossy
    for (let boss of bosses) {
      if (boss.model) {
        if (checkProjectileCollisionWithBosses(fireball, boss)) {
          createExplosion(fireball.position);
          boss.takeDamage(fireball.damage, fireball.burningEffect);
          if (fireball.explosiveCore) {
            // Způsobí poškození všem bossům v okruhu 3 metrů
            createFireballExplosion(fireball.position);

            bosses.forEach(nearbyBoss => {
              if (nearbyBoss.model.position.distanceTo(fireball.position) <= 3) {
                nearbyBoss.takeDamage(fireball.damage * 0.5);
              }
            });
          }

          scene.remove(fireball);
          fireBalls.splice(i, 1);
          break;
        }
      }
    }

    // Detekce kolize s podlahou a stropem
    const noFloorCheck = getNoFloorCheck();
    const ceilingHeight = noFloorCheck ? WALL_HEIGHT * 5 : isHighWallArea(fireball.position.x, fireball.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
    if (fireball.position.y <= 0 || fireball.position.y >= ceilingHeight) {
      // Vytvoření výbuchu při kolizi
      createExplosion(fireball.position);

      scene.remove(fireball);
      fireBalls.splice(i, 1);
      continue;
    }

    // Detekce kolize s zdmi
    for (let j = walls.length - 1; j >= 0; j--) {
      const wall = walls[j];
      if (fireball.position.distanceTo(wall.position) < CELL_SIZE / 1.6) {

        // Vytvoření výbuchu při kolizi
        createExplosion(fireball.position);

        scene.remove(fireball);
        fireBalls.splice(i, 1);

        if (wall.userData.isBlockingWall) {
          scene.remove(wall);
          walls.splice(j, 1);
          // Aktualizujte matici bludiště
          const x = Math.round((wall.position.x / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          const z = Math.round((wall.position.z / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          maze[x][z] = 0;
        }

        break;
      }
    }

    // Odstraňte ohnivou kouli, pokud je příliš daleko
    if (fireball.position.distanceTo(player.position) > MAZE_SIZE * CELL_SIZE) {
      scene.remove(fireball);
      fireBalls.splice(i, 1);
    }
  }
}

function updateFrostbolts(deltaTime) {
  for (let i = frostBalls.length - 1; i >= 0; i--) {
    const frostbolt = frostBalls[i];
    frostbolt.position.add(frostbolt.velocity.clone().multiplyScalar(deltaTime * 40));
    frostbolt.userData.animate();

    for (let boss of bosses) {
      if (checkProjectileCollisionWithBosses(frostbolt, boss)) {
        createExplosion(frostbolt.position, 0xa6d9ff);
        boss.freeze();
        if (frostbolt.iceExplosion) {
          createIceExplosion(frostbolt.position);
        }
        scene.remove(frostbolt);
        frostBalls.splice(i, 1);
        if (frostbolt.damage > 0) boss.takeDamage(frostbolt.damage);
        break;
      }
    }

    const noFloorCheck = getNoFloorCheck();
    const ceilingHeight = noFloorCheck ? WALL_HEIGHT * 5 : isHighWallArea(frostbolt.position.x, frostbolt.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
    if (frostbolt.position.y <= 0 || frostbolt.position.y >= ceilingHeight) {
      createExplosion(frostbolt.position, 0xa6d9ff);
      scene.remove(frostbolt);
      frostBalls.splice(i, 1);
      continue;
    }

    for (let j = walls.length - 1; j >= 0; j--) {
      const wall = walls[j];
      if (frostbolt.position.distanceTo(wall.position) < CELL_SIZE / 1.6) {
        createExplosion(frostbolt.position, 0xa6d9ff);
        scene.remove(frostbolt);
        frostBalls.splice(i, 1);
        break;
      }
    }

    if (frostbolt.position.distanceTo(player.position) > MAZE_SIZE * CELL_SIZE) {
      scene.remove(frostbolt);
      frostBalls.splice(i, 1);
    }
  }
}

function updateArcaneMissiles(deltaTime) {
  for (let i = arcaneMissiles.length - 1; i >= 0; i--) {
    const arcaneMissile = arcaneMissiles[i];
    arcaneMissile.position.add(arcaneMissile.velocity.clone().multiplyScalar(deltaTime * 50));
    arcaneMissile.userData.animate();

    for (let boss of bosses) {
     if (checkProjectileCollisionWithBosses(arcaneMissile, boss)) {
        createExplosion(arcaneMissile.position, 0xf7c6bfa);
        scene.remove(arcaneMissile);
        arcaneMissiles.splice(i, 1);
        boss.takeDamage(arcaneMissile.damage * (arcaneMissile.power || 1));
        break;
      }
    }

    const noFloorCheck = getNoFloorCheck();
    const ceilingHeight = noFloorCheck ? WALL_HEIGHT * 5 : isHighWallArea(arcaneMissile.position.x, arcaneMissile.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
    if (arcaneMissile.position.y <= 0 || arcaneMissile.position.y >= ceilingHeight) {
      createExplosion(arcaneMissile.position, 0xf7c6bfa);
      scene.remove(arcaneMissile);
      arcaneMissiles.splice(i, 1);
      continue;
    }

    for (let j = walls.length - 1; j >= 0; j--) {
      const wall = walls[j];
      if (arcaneMissile.position.distanceTo(wall.position) < CELL_SIZE / 1.6) {
        createExplosion(arcaneMissile.position, 0xf7c6bfa);
        scene.remove(arcaneMissile);
        arcaneMissiles.splice(i, 1);
        break;
      }
    }

    if (arcaneMissile.position.distanceTo(player.position) > MAZE_SIZE * CELL_SIZE) {
      scene.remove(arcaneMissile);
      arcaneMissiles.splice(i, 1);
    }
  }
}

function castChainLightning() {
  if (!isSpellUnlocked('chainLightning')) {
    console.log("Chain Lightning není odemčeno.");
    return false;
  }

  if (playerMana >= 50) {
    setPlayerMana(playerMana - 50);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0xbac5ff);

    playSound(chainLightningSoundBuffer);
    const chainLightningSpell = spells.find(spell => spell.name === 'Chain Lightning');
    const lightning = createChainLightning();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    lightning.position.copy(staffWorldPosition);
    lightning.position.y += 0.3;

    const cameraDirection = getCameraDirection();
    const leftVector = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();
    lightning.position.addScaledVector(leftVector, -0.1);

    lightning.damage = chainLightningSpell ? chainLightningSpell.damage : 300;

    animateStaffSwing(); // Přidáno volání animace
    createCastEffect(staffWorldPosition, 0xbac5ff);

    const direction = getCameraDirection();
    lightning.velocity = direction.multiplyScalar(0.35);

    scene.add(lightning);
    chainLightnings.push(lightning);
    return true;
  }
  return false;
}

function createChainLightning() {
  const lightning = new THREE.Group();


  // Vytvoření základního "jádra" blesku
  const geometry = new THREE.CylinderGeometry(0.01, 0.05, 1, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0x637bff,
    emissive: 0x637bff,
    emissiveIntensity: 10
  });
  const core = new THREE.Mesh(geometry, material);
  const direction = getCameraDirection();
  core.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  lightning.add(core);



  // Přidání částicového efektu
  const particleCount = 10;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xbac5ff,
      size: 0.04,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }

  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  lightning.add(particles);

  // Animace částic
  lightning.userData.animate = function (deltaTime) {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.1;
      positions[i + 1] += (Math.random() - 0.5) * 0.1;
      positions[i + 2] += (Math.random() - 0.5) * 0.1;
    }
    particles.geometry.attributes.position.needsUpdate = true;

  };

  return lightning;
}

export function updateChainLightnings(deltaTime) {
  for (let i = chainLightnings.length - 1; i >= 0; i--) {
    const lightning = chainLightnings[i];
    lightning.position.add(lightning.velocity.clone().multiplyScalar(deltaTime * 40));

    // Kolize s bossy
    for (let boss of bosses) {
     if (checkProjectileCollisionWithBosses(lightning, boss)) {
        createExplosion(lightning.position, 0xbac5ff);
        boss.takeDamage(lightning.damage);
        scene.remove(lightning);
        chainLightnings.splice(i, 1);
        chainLightningEffect(lightning.position);
        break;
      }
    }

    // Detekce kolize s podlahou a stropem
    const noFloorCheck = getNoFloorCheck();
    const ceilingHeight = noFloorCheck ? WALL_HEIGHT * 5 : isHighWallArea(lightning.position.x, lightning.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
    if (lightning.position.y <= 0 || lightning.position.y >= ceilingHeight) {
      // Vytvoření výbuchu při kolizi
      createExplosion(lightning.position, 0xbac5ff);

      scene.remove(lightning);
      chainLightnings.splice(i, 1);
      continue;
    }

    // Detekce kolize s zdmi
    for (let j = walls.length - 1; j >= 0; j--) {
      const wall = walls[j];
      if (lightning.position.distanceTo(wall.position) < CELL_SIZE / 1.6) {

        // Vytvoření výbuchu při kolizi
        createExplosion(lightning.position, 0xbac5ff);

        scene.remove(lightning);
        chainLightnings.splice(i, 1);

        if (wall.userData.isBlockingWall) {
          console.log("Destroying blocking wall at", wall.position);
          scene.remove(wall);
          walls.splice(j, 1);
          // Aktualizujte matici bludiště
          const x = Math.round((wall.position.x / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          const z = Math.round((wall.position.z / CELL_SIZE) + (MAZE_SIZE / 2) - 0.5);
          maze[x][z] = 0;
        }

        break;
      }
    }

    // Odstraňte blesk, pokud je příliš daleko
    if (lightning.position.distanceTo(player.position) > MAZE_SIZE * CELL_SIZE) {
      scene.remove(lightning);
      chainLightnings.splice(i, 1);
    }
  }
}

function chainLightningEffect(position) {
  const maxJumps = 3;
  let currentJump = 0;
  let lastPosition = position.clone();
  let hitBosses = new Set();
  const chainLightningSpell = spells.find(spell => spell.name === 'Chain Lightning');

  const jump = () => {
    if (currentJump >= maxJumps) {
      // Pokud je aktivní Chain Explosion a došlo k poslednímu skoku
      if (chainLightningSpell && chainLightningSpell.chainExplosion) {
        createChainExplosion(lastPosition);
      }
      return;
    }

    const nearestBoss = findNearestUnhitBoss(lastPosition, 10, hitBosses);
    if (nearestBoss) {
      createChainLightningVisual(lastPosition, nearestBoss.position);
      nearestBoss.takeDamage(100);
      hitBosses.add(nearestBoss);
      lastPosition = nearestBoss.position.clone();
      currentJump++;
      setTimeout(jump, 200);
    } else {
      // Pokud není nalezen další cíl a je aktivní Chain Explosion
      if (chainLightningSpell && chainLightningSpell.chainExplosion) {
        createChainExplosion(lastPosition);
      }
    }
  };

  jump();
}


// Přidejte novou funkci pro vytvoření mrazivé aury
export function createFrostAura() {
  const auraGeometry = new THREE.SphereGeometry(5, 32, 32);
  const auraMaterial = new THREE.MeshBasicMaterial({
    color: 0x87CEFA,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  const aura = new THREE.Mesh(auraGeometry, auraMaterial);
  aura.position.copy(player.position);
  scene.add(aura);
  frostAuras.push(aura);
}

// Přidejte novou funkci pro seslání teleportu
function castTeleport() {
  if (playerMana >= 20) {
    setPlayerMana(playerMana - 20);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0x6f03fc);

    playSound(teleportSoundBuffer);
    const teleportDistance = 7; // Vzdálenost teleportu v jednotkách
    const playerDirection = getCameraDirection();

    // Ignorujeme Y složku směru
    playerDirection.y = 0;
    playerDirection.normalize();

    const destination = new THREE.Vector3().addVectors(
      player.position,
      playerDirection.multiplyScalar(teleportDistance)
    );

    // Zachováme původní Y souřadnici hráče
    destination.y = player.position.y;

    // Inicializace teleportačního pohybu
    initiateTeleportMove(player.position.clone(), destination);

    return true;
  }
  return false;
}

// Přidejte funkci pro vytvoření efektu teleportu
export function createTeleportEffect(position) {
  const particleCount = 300;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * 1; // Zvětšili jsme počáteční rozptyl

    positions[i * 3] = position.x + r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = position.y + r * Math.sin(phi) * Math.sin(theta) + 0.5; // Posunuli jsme částice o 1 jednotku výše
    positions[i * 3 + 2] = position.z + r * Math.cos(phi);

    colors[i * 3] = 0.4 + Math.random() * 0.2;     // R (trochu červené pro fialový nádech)
    colors[i * 3 + 1] = 0.1 + Math.random() * 0.2; // G (méně zelené)
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B (hodně modré)

    // Zvětšili jsme rychlost částic pro větší rozptyl
    velocities[i * 3] = (Math.random() - 0.5) * 0.15;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 1
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Přidáme částice do seznamu pro aktualizaci
  teleportEffects.push({
    particles,
    velocities,
    startTime: Date.now(),
    duration: 1800
  });
}

function findNearestUnhitBoss(position, maxDistance, hitBosses) {
  let nearestBoss = null;
  let minDistance = maxDistance;

  for (const boss of bosses) {
    if (!hitBosses.has(boss)) { // Kontrola, zda boss již nebyl zasažen
      const distance = position.distanceTo(boss.position);
      if (distance < minDistance) {
        minDistance = distance;
        nearestBoss = boss;
      }
    }
  }

  return nearestBoss;
}

export function createSkillbar() {
  const skillbar = document.getElementById('skillbar');
  spells.forEach(spell => {
    const spellElement = document.createElement('div');
    spellElement.className = 'spell-icon';
    spellElement.id = `spell-${spell.id}`; // Přidáme ID pro snadnou identifikaci
    spellElement.style.backgroundImage = `url(${spell.icon})`;
    spellElement.style.backgroundSize = 'cover';
    spellElement.innerHTML = `
      <div class="spell-key">${spell.key}</div>
      <div class="spell-cooldown" style="display: none;"></div>
    `;
    spellElement.style.display = 'none'; // Začneme se skrytými kouzly
    skillbar.appendChild(spellElement);
  });
}

export function updateSkillbar() {
  spells.forEach(spell => {
    const spellElement = document.getElementById(`spell-${spell.id}`);
    if (!spellElement) return; // Pokud element neexistuje, přeskočíme

    // Zobrazíme kouzlo pouze pokud je odemčené
    if (isSpellUnlocked(spell.id)) {
      spellElement.style.display = 'block';
      
      // Aktualizace cooldownu
      const cooldownElement = spellElement.querySelector('.spell-cooldown');
      if (!spell.isReady()) {
        const remainingCooldown = Math.ceil((spell.cooldown - (Date.now() - spell.lastCastTime)) / 1000);
        cooldownElement.textContent = remainingCooldown;
        cooldownElement.style.display = 'flex';
      } else {
        cooldownElement.style.display = 'none';
      }
    } else {
      spellElement.style.display = 'none';
    }
  });
}



export function createChainExplosion(position) {
  const explosionRadius = 5;
  const explosionGeometry = new THREE.SphereGeometry(explosionRadius, 32, 32);
  const explosionMaterial = new THREE.MeshBasicMaterial({
    color: 0xbac5ff,
    transparent: true,
    opacity: 0.5
  });
  const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
  explosion.position.copy(position);
  scene.add(explosion);
  chainExplosions.push(explosion);

  // Poškození nepřátel v dosahu
  bosses.forEach(boss => {
    if (boss.position.distanceTo(position) <= explosionRadius) {
      boss.takeDamage(100 + (calculatePlayerDamage() * 0.2));
    }
  });
}

export function createChainLightningVisual(startPosition, endPosition) {
  const points = [];
  const segmentCount = 10;

  for (let i = 0; i <= segmentCount; i++) {
    const t = i / segmentCount;
    const point = new THREE.Vector3().lerpVectors(startPosition, endPosition, t);
    if (i !== 0 && i !== segmentCount) {
      point.x += (Math.random() - 0.5) * 0.5;
      point.y += (Math.random() - 0.5) * 0.5;
      point.z += (Math.random() - 0.5) * 0.5;
    }
    points.push(point);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xbac5ff, linewidth: 3, transparent: true });
  const chainLightning = new THREE.Line(geometry, material);

  scene.add(chainLightning);
  chainLightningsVisual.push(chainLightning);
}

export function createFireballExplosion(position) {
  const particleCount = 100;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positions[i * 3] = position.x + radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = position.y + radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = position.z + radius * Math.cos(phi);

    colors[i * 3] = 1;  // R
    colors[i * 3 + 1] = Math.random() * 0.5;  // G
    colors[i * 3 + 2] = 0;  // B
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 1
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  fireballExplosions.push(particles);
}

export let originalStaffRotation;
export let isInspectingStaff = false;
export let isSwingingStaff = false;
export let inspectionStartTime = 0;
export let inspectionDuration = 2500;

export function setIsSwingingStaff(value) {
  isSwingingStaff = value;
}

export function setIsInspectingStaff(value) {
  isInspectingStaff = value;
}

export function animateStaffSwing() {
  if (!staffModel) return;

  isSwingingStaff = true;

  staffModel.rotation.copy(originalStaffRotation);

  const swingAngle = -(Math.PI / 4); // 45 stupňů

  staffSwing = {
    progress: 0,
    swingAngle: swingAngle,
    originalRotation: originalStaffRotation.clone()
  };
}

export function inspectStaff() {
  if (!staffModel || isInspectingStaff || isSwingingStaff) return;

  originalStaffRotation = staffModel.rotation.clone();
  isInspectingStaff = true;
  inspectionStartTime = performance.now();
}



export function setOriginalStaffRotation() {
  originalStaffRotation = staffModel.rotation.clone();
}



function getNoFloorCheck(){
  return selectedFloor === 999 || (selectedFloor >= 100  && selectedFloor <= 200);
}

export { spells, Spell, castFireball, castFrostbolt, castArcaneMissile, updateFireballs, updateFrostbolts, updateArcaneMissiles };