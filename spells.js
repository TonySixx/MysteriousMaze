import * as THREE from "three";
import { scene, walls, CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, staffModel,createCastEffect,getCameraDirection,isHighWallArea,maze } from './main.js';
import { player } from "./player.js"
import { createExplosion,changeStaffColor,fireballSoundBuffer,frostBoltSoundBuffer,magicMissileSoundBuffer } from "./main.js"
import frostboltIcon from './public/frostbolt-icon.png';
import arcaneMissileIcon from './public/arcane-missile-icon.png';
import fireballIcon from './public/fireball-icon.png';
import { setPlayerMana, updatePlayerManaBar, playerMana } from "./player.js"
import { bosses } from "./boss.js";

export let fireBalls = [];
export let frostBalls = [];
export let arcaneMissiles = [];
export let lastSpellCastTime = 0;


class Spell {
    constructor(name, icon, key, cooldown, castFunction) {
        this.name = name;
        this.icon = icon;
        this.key = key;
        this.cooldown = cooldown;
        this.lastCastTime = 0;
        this.cast = castFunction;
    }

    isReady() {
        return Date.now() - this.lastCastTime > this.cooldown;
    }
}

// Definice kouzel
const spells = [
    new Spell('Fireball', fireballIcon, 'LMB', 500, castFireball),
    new Spell('Arcane Missile', arcaneMissileIcon, 'RMB', 200, castArcaneMissile),
    new Spell('Frostbolt', frostboltIcon, 'E', 5000, castFrostbolt)
];

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
        changeStaffColor(0xff4500); // Oranžová pro ohnivou kouli

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

        scene.add(fireball);
        fireBalls.push(fireball);
        return true;
    }
    return false;
}

function castFrostbolt() {
    if (playerMana >= 30) {
        setPlayerMana(playerMana - 30);
        updatePlayerManaBar();
        lastSpellCastTime = Date.now();
        changeStaffColor(0x8feaff); // Azurová pro mrazivý šíp

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
        changeStaffColor(0xff00ff); // Fialová pro arkánovou střelu

        if (magicMissileSoundBuffer) {
            const sound = new THREE.Audio(new THREE.AudioListener());
            sound.setBuffer(magicMissileSoundBuffer);
            sound.play();
            sound.onEnded = () => {
                sound.disconnect();
            };
        }

        const arcaneMissile = createArcaneMissile();
        const staffWorldPosition = new THREE.Vector3();
        staffModel.getWorldPosition(staffWorldPosition);
        arcaneMissile.position.copy(staffWorldPosition);
        arcaneMissile.position.y += 0.3;

        createCastEffect(staffWorldPosition, 0xff00ff);

        const direction = getCameraDirection();
        arcaneMissile.velocity = direction.multiplyScalar(0.25);
        scene.add(arcaneMissile);
        arcaneMissiles.push(arcaneMissile);
        return true;
    }
    return false
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
                boss.takeDamage(100);
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
            if (fireball.position.distanceTo(wall.position) < CELL_SIZE / 2) {
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
                createExplosion(frostbolt.position, 0x00ffff);
                boss.freeze();
                scene.remove(frostbolt);
                frostBalls.splice(i, 1);
                break;
            }
        }

        const ceilingHeight = isHighWallArea(frostbolt.position.x, frostbolt.position.z) ? WALL_HEIGHT * 2 : WALL_HEIGHT;
        if (frostbolt.position.y <= 0 || frostbolt.position.y >= ceilingHeight) {
            createExplosion(frostbolt.position, 0x00ffff);
            scene.remove(frostbolt);
            frostBalls.splice(i, 1);
            continue;
        }

        for (let j = walls.length - 1; j >= 0; j--) {
            const wall = walls[j];
            if (frostbolt.position.distanceTo(wall.position) < CELL_SIZE / 2) {
                createExplosion(frostbolt.position, 0x00ffff);
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
                boss.takeDamage(50);
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
            if (arcaneMissile.position.distanceTo(wall.position) < CELL_SIZE / 2) {
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

export { spells, Spell, castFireball, castFrostbolt, castArcaneMissile, updateFireballs, updateFrostbolts, updateArcaneMissiles };