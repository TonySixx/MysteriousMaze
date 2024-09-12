import * as THREE from "three";
import { scene, walls, CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, staffModel, createCastEffect, getCameraDirection, isHighWallArea, maze, chainLightningSoundBuffer } from './main.js';
import { player } from "./player.js"
import { createExplosion, changeStaffColor, fireballSoundBuffer, frostBoltSoundBuffer, magicMissileSoundBuffer } from "./main.js"
import frostboltIcon from './public/spells/frostbolt-icon.png';
import arcaneMissileIcon from './public/spells/arcane-missile-icon.png';
import fireballIcon from './public/spells/fireball-icon.png';
import chainLightningIcon from './public/spells/chain-lightning-icon.png';
import { setPlayerMana, updatePlayerManaBar, playerMana } from "./player.js"
import { bosses } from "./boss.js";
import { isSpellUnlocked } from "./skillTree.js";

export let fireBalls = [];
export let frostBalls = [];
export let arcaneMissiles = [];
export let chainLightnings = [];

export let lastSpellCastTime = 0;


class Spell {
  constructor(name, icon, key, cooldown, id, castFunction) {
    this.name = name;
    this.icon = icon;
    this.key = key;
    this.cooldown = cooldown;
    this.lastCastTime = 0;
    this.id = id;
    this.cast = castFunction;
  }

  isReady() {
    return Date.now() - this.lastCastTime > this.cooldown;
  }
}

// Definice kouzel
var spells = [
  new Spell('Fireball', fireballIcon, 'LMB', 500, "fireball", castFireball),
  new Spell('Arcane Missile', arcaneMissileIcon, 'RMB', 200, "arcaneMissile", castArcaneMissile),
  new Spell('Frostbolt', frostboltIcon, 'E', 5000, "frostbolt", castFrostbolt),
  new Spell('Chain Lightning', chainLightningIcon, 'R', 8000, "chainLightning", castChainLightning)
];

// Funkce pro získání aktivních kouzel
export function getActiveSpells() {
  return spells.filter(spell =>
    spell.name === 'Fireball' ||
    spell.name === 'Arcane Missile' ||
    spell.name === 'Frostbolt' ||
    (spell.name === 'Chain Lightning' && isSpellUnlocked('chainLightning'))
  );
}


export function updateSpellUpgrades(skillTree) {
  spells.forEach(spell => {
    const spellInfo = skillTree[spell.id];
    if (spellInfo && spellInfo.upgrades) {
      spellInfo.upgrades.forEach(upgrade => {
        if (upgrade.unlocked) {
          if (upgrade.name === 'Inferno Touch') {
            spell.burningEffect = true;
          } else if (upgrade.name === 'Ice Explosion') {
            spell.iceExplosion = true;
          } else if (upgrade.name === 'Multi-shot') {
            spell.multiShot = true;
          }
          else if (upgrade.name === 'Chain Explosion') {
            spell.chainExplosion = true;
          }

        }
      });
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

  // Snowflake particles
  const snowflakeParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      map: createSnowflakeTexture()
    })
  );

  const snowflakePositions = new Float32Array(150 * 3);
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.2 + Math.random() * 0.05;
    snowflakePositions[i * 3] = Math.cos(angle) * radius;
    snowflakePositions[i * 3 + 1] = Math.sin(angle) * radius;
    snowflakePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  snowflakeParticles.geometry.setAttribute('position', new THREE.BufferAttribute(snowflakePositions, 3));
  frostbolt.add(snowflakeParticles);

  // Ice trail
  const trailParticles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xADD8E6,
      size: 0.3,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const trailPositions = new Float32Array(60 * 3);
  trailParticles.geometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  frostbolt.add(trailParticles);

  frostbolt.userData.animate = function (deltaTime) {
    // Animate snowflakes
    const snowflakePositions = snowflakeParticles.geometry.attributes.position.array;
    for (let i = 0; i < snowflakePositions.length; i += 3) {
      snowflakePositions[i] += (Math.random() - 0.5) * 0.03;
      snowflakePositions[i + 1] += (Math.random() - 0.5) * 0.03;
      snowflakePositions[i + 2] += (Math.random() - 0.5) * 0.03;
    }
    snowflakeParticles.geometry.attributes.position.needsUpdate = true;

    // Animate ice trail
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

  return frostbolt;
}

function createSnowflakeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.moveTo(16, 16);
    ctx.lineTo(16, 0);
    ctx.lineTo(20, 4);
    ctx.moveTo(16, 0);
    ctx.lineTo(12, 4);
    ctx.rotate(Math.PI / 3);
  }
  ctx.fill();
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

    if (fireballSoundBuffer) {
      const sound = new THREE.Audio(new THREE.AudioListener());
      sound.setBuffer(fireballSoundBuffer);
      sound.play();
      sound.onEnded = () => {
        sound.disconnect();
      };
    }

    const fireball = createFireball();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    fireball.position.copy(staffWorldPosition);
    fireball.position.y += 0.3;

    createCastEffect(staffWorldPosition, 0xff4500);

    const direction = getCameraDirection();
    fireball.velocity = direction.multiplyScalar(0.25);

    // Přidáme informaci o hořícím efektu do ohnivé koule
    const fireballSpell = spells.find(spell => spell.name === 'Fireball');
    fireball.burningEffect = fireballSpell ? fireballSpell.burningEffect : false;

    scene.add(fireball);
    fireBalls.push(fireball);
    return true;
  }
  return false;
}

function createIceExplosion(position) {
  // Implementace ledové exploze
  const explosionGeometry = new THREE.SphereGeometry(3, 32, 32);
  const explosionMaterial = new THREE.MeshBasicMaterial({
    color: 0x87CEFA,
    transparent: true,
    opacity: 0.5
  });
  const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
  explosion.position.copy(position);
  scene.add(explosion);

  // Animace exploze
  const animate = () => {
    explosion.scale.multiplyScalar(1.05);
    explosion.material.opacity -= 0.05;
    if (explosion.material.opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      scene.remove(explosion);
    }
  };
  animate();

  // Efekt na nepřátele
  bosses.forEach(boss => {
    if (boss.position.distanceTo(position) <= 5) {
      if (boss.isFrozen == false) boss.freeze(1000); // Zmrazí bosse na 1 sekundu
      boss.takeDamage(50); // Způsobí 50 poškození
    }
  });
}

function castFrostbolt() {
  if (playerMana >= 30) {
    setPlayerMana(playerMana - 30);
    updatePlayerManaBar();
    lastSpellCastTime = Date.now();
    changeStaffColor(0x8feaff);

    if (frostBoltSoundBuffer) {
      const sound = new THREE.Audio(new THREE.AudioListener());
      sound.setVolume(0.7);
      sound.setBuffer(frostBoltSoundBuffer);
      sound.play();
      sound.onEnded = () => {
        sound.disconnect();
      };
    }

    const frostbolt = createFrostbolt();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    frostbolt.position.copy(staffWorldPosition);
    frostbolt.position.y += 0.3;

    createCastEffect(staffWorldPosition, 0x00ffff);
    const direction = getCameraDirection();
    frostbolt.velocity = direction.multiplyScalar(0.25);

    // Přidáme informaci o vylepšení do frostboltu
    const frostboltSpell = spells.find(spell => spell.name === 'Frostbolt');
    frostbolt.iceExplosion = frostboltSpell ? frostboltSpell.iceExplosion : false;

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

    if (magicMissileSoundBuffer) {
      const sound = new THREE.Audio(new THREE.AudioListener());
      sound.setBuffer(magicMissileSoundBuffer);
      sound.play();
      sound.onEnded = () => {
        sound.disconnect();
      };
    }

    const arcaneMissileSpell = spells.find(spell => spell.name === 'Arcane Missile');
    const multiShot = arcaneMissileSpell ? arcaneMissileSpell.multiShot : false;
    const missileCount = multiShot ? 3 : 1;

    for (let i = 0; i < missileCount; i++) {
      const arcaneMissile = createArcaneMissile();
      const staffWorldPosition = new THREE.Vector3();
      staffModel.getWorldPosition(staffWorldPosition);
      arcaneMissile.position.copy(staffWorldPosition);
      arcaneMissile.position.y += 0.3;

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
      if (boss.model && fireball.position.distanceTo(boss.model.position) < 1.4) {
        createExplosion(fireball.position);
        boss.takeDamage(100, fireball.burningEffect);
        scene.remove(fireball);
        fireBalls.splice(i, 1);
        break;
      }
    }

    // Detekce kolize s podlahou a stropem
    const ceilingHeight = isHighWallArea(fireball.position.x, fireball.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
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
        console.log("Collision detected with wall at", wall.position);

        // Vytvoření výbuchu při kolizi
        createExplosion(fireball.position);

        scene.remove(fireball);
        fireBalls.splice(i, 1);

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
      if (boss.model && frostbolt.position.distanceTo(boss.model.position) < 1.4) {
        createExplosion(frostbolt.position, 0xa6d9ff);
        boss.freeze();
        if (frostbolt.iceExplosion) {
          createIceExplosion(frostbolt.position);
        }
        scene.remove(frostbolt);
        frostBalls.splice(i, 1);
        break;
      }
    }

    const ceilingHeight = isHighWallArea(frostbolt.position.x, frostbolt.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
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
      if (boss.model && arcaneMissile.position.distanceTo(boss.model.position) < 1.4) {
        createExplosion(arcaneMissile.position, 0xf7c6bfa);
        boss.takeDamage(50 * arcaneMissile.power);
        scene.remove(arcaneMissile);
        arcaneMissiles.splice(i, 1);
        break;
      }
    }

    const ceilingHeight = isHighWallArea(arcaneMissile.position.x, arcaneMissile.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
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

    if (chainLightningSoundBuffer) {
      const sound = new THREE.Audio(new THREE.AudioListener());
      sound.setBuffer(chainLightningSoundBuffer);
      sound.play();
      sound.onEnded = () => {
        sound.disconnect();
      };
    }

    const lightning = createChainLightning();
    const staffWorldPosition = new THREE.Vector3();
    staffModel.getWorldPosition(staffWorldPosition);
    lightning.position.copy(staffWorldPosition);
    lightning.position.y += 0.3;

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
      if (boss.model && lightning.position.distanceTo(boss.model.position) < 1.4) {
        createExplosion(lightning.position, 0xbac5ff);
        boss.takeDamage(300);
        scene.remove(lightning);
        chainLightnings.splice(i, 1);
        chainLightningEffect(lightning.position);
        break;
      }
    }

    // Detekce kolize s podlahou a stropem
    const ceilingHeight = isHighWallArea(lightning.position.x, lightning.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
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

// Přidejte novou funkci pro vytvoření Chain Explosion
function createChainExplosion(position) {
  const explosionRadius = 5;
  const explosionDamage = 100;

  // Vizuální efekt exploze
  const explosionGeometry = new THREE.SphereGeometry(explosionRadius, 32, 32);
  const explosionMaterial = new THREE.MeshBasicMaterial({
    color: 0xbac5ff,
    transparent: true,
    opacity: 0.5
  });
  const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
  explosion.position.copy(position);
  scene.add(explosion);

  // Animace exploze
  const animate = () => {
    explosion.scale.multiplyScalar(1.05);
    explosion.material.opacity -= 0.05;
    if (explosion.material.opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      scene.remove(explosion);
      explosion.geometry.dispose();
      explosion.material.dispose();
    }
  };
  animate();

  // Poškození nepřátel v dosahu
  bosses.forEach(boss => {
    if (boss.position.distanceTo(position) <= explosionRadius) {
      boss.takeDamage(explosionDamage);
    }
  });
}

function createChainLightningVisual(startPosition, endPosition) {
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
  const material = new THREE.LineBasicMaterial({ color: 0xbac5ff, linewidth: 3 });
  const chainLightning = new THREE.Line(geometry, material);

  scene.add(chainLightning);

  // Animace a odstranění efektu
  let opacity = 1;
  const animate = () => {
    opacity -= 0.05;
    material.opacity = opacity;
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      scene.remove(chainLightning);
      geometry.dispose();
      material.dispose();
    }
  };
  animate();
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

export { spells, Spell, castFireball, castFrostbolt, castArcaneMissile, updateFireballs, updateFrostbolts, updateArcaneMissiles };