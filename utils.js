import { Vector3 } from "three";
import { aoeBlastSoundBuffer, BLOCKING_WALL, CELL_SIZE, frostBoltHitSoundBuffer, hurtSoundBuffer, isMusicEnabled, MAZE_SIZE, playerDeath, playSound, selectedFloor, supabase } from "./main";
import { addExperience, getPlayerLevel, getPlayerMaxHealth, player, playerGroundLevel, playerHealth, setPlayerHealth, updatePlayerHealthBar } from "./player";
import * as THREE from 'three';
import { equipment } from "./inventory";
import { bosses } from "./boss";
import { floorMusic, floorsConfig, FOG_OF_WAR_RADIUS, RAY_COUNT } from "./globals";
import { updateQuestsOnEvent } from "./quests";
import { isProtectiveShieldActive } from './animate.js';
import { SPIKE_TRAP_CYCLE, SPIKE_TRAP_UP_TIME } from './globals.js';

export function destroyAllSideAnimations() {
  if (merchantAnimationId !== null) {
    cancelAnimationFrame(merchantAnimationId);
    merchantAnimationId = null;
  }
  if (armorMerchantAnimationId !== null) {
    cancelAnimationFrame(armorMerchantAnimationId);
    armorMerchantAnimationId = null;
  }
  if (bossChestAndPortalAnimationId !== null) {
    cancelAnimationFrame(bossChestAndPortalAnimationId);
    bossChestAndPortalAnimationId = null;
  }
}

export function createEnchantEffect(weapon, offsetY = 0, effectColor = 0x999999, options = {}) {
  if (!weapon || !weapon.enchantLevel || weapon.enchantLevel < 5) return null;

  const enchantLevel = weapon.enchantLevel;
  const {
    glowIntensity = 0.5,       // Zářivost efektu
    opacity = 1.0,             // Průhlednost
    spread = { x: 0.1, y: 0.1, z: 0.1 }, // Rozptyl pro osy X, Y, Z
    startColor = effectColor,  // Startovní barva
    endColor = effectColor,    // Cílová barva
    lifeTimeMin = 1.5,         // Minimální životnost částic
    lifeTimeMax = 2.5,         // Maximální životnost částic
    speedMin = 0.01,           // Minimální rychlost částic
    speedMax = 0.03,           // Maximální rychlost částic
    minSize = 5,               // Minimální velikost částic
    maxSize = 15,              // Maximální velikost částic
    horizontalDamping = 0.9,    // Tlumení horizontální rychlosti
    particleCountPerlevel = 10
  } = options;


  const maxParticleCount = 500;
  const particleCount = Math.min(maxParticleCount, enchantLevel * particleCountPerlevel);
  const group = new THREE.Group();

  const vertexShader = `
      uniform float time;
  
      attribute float size;
      attribute vec3 velocity;
      attribute float startTime;
      attribute float lifeTime;
  
      varying float vAlpha;
      varying vec3 vPosition;
      varying float vProgress;
  
      void main() {
        float age = mod(time - startTime, lifeTime);
        float progress = age / lifeTime;
        vProgress = progress;
  
        // Tlumení horizontálních rychlostí
        float damping = pow(${horizontalDamping}, age);
  
        vec3 disp = vec3(
          velocity.x * damping,
          velocity.y,
          velocity.z * damping
        ) * age;
  
        vec3 pos = position + disp;
        vPosition = pos;
  
        // Postupné zeslabení částic během jejich životního cyklu
        vAlpha = (1.0 - progress);
  
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (5.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

  const fragmentShader = `
      uniform vec3 startColor;
      uniform vec3 endColor;
      uniform float opacity;
      uniform float glowIntensity;
  
      varying float vAlpha;
      varying vec3 vPosition;
      varying float vProgress;
  
      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(gl_PointCoord, center);
  
        // Hladké okraje částic
        float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * opacity;
  
        // Interpolace mezi startovní a cílovou barvou
        vec3 color = mix(startColor, endColor, vProgress);
  
        // Přidání zářivosti do středu částic
        float glow = pow(1.0 - dist, 2.0) * glowIntensity;
  
        color += vec3(glow);
  
        gl_FragColor = vec4(color, alpha);
      }
    `;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      startColor: { value: new THREE.Color(startColor) },
      endColor: { value: new THREE.Color(endColor) },
      opacity: { value: opacity },
      glowIntensity: { value: glowIntensity },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    blending: THREE.NormalBlending,
    depthWrite: false,
    transparent: true,
  });

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const startTimes = new Float32Array(particleCount);
  const lifeTimes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Počáteční pozice u zbraně s rozptylem pro jednotlivé osy
    positions[i3] = (Math.random() - 0.5) * spread.x;
    positions[i3 + 1] = offsetY + (Math.random() - 0.5) * spread.y;
    positions[i3 + 2] = (Math.random() - 0.5) * spread.z;

    // Náhodná rychlost částic v daném rozmezí
    const speed = speedMin + Math.random() * (speedMax - speedMin);

    // Rychlosti pro pohyb částic nahoru
    velocities[i3] = (Math.random() - 0.5) * speed * 0.5; // Menší horizontální rychlost
    velocities[i3 + 1] = speed * (enchantLevel / 20); // y rychlost
    velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.5; // Menší horizontální rychlost

    // Velikost částic s použitím minSize a maxSize
    sizes[i] = minSize + Math.random() * (maxSize - minSize);

    // Náhodný počáteční čas pro každou částici
    startTimes[i] = Math.random() * lifeTimeMax;

    // Náhodná životnost pro každou částici
    lifeTimes[i] = lifeTimeMin + Math.random() * (lifeTimeMax - lifeTimeMin);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('startTime', new THREE.BufferAttribute(startTimes, 1));
  geometry.setAttribute('lifeTime', new THREE.BufferAttribute(lifeTimes, 1));

  const particles = new THREE.Points(geometry, shaderMaterial);
  group.add(particles);

  group.userData.update = (deltaTime) => {
    shaderMaterial.uniforms.time.value += deltaTime;
  };

  return group;
}


export async function submitScore(levelName, time) {
  try {
    var _playerName = localStorage.getItem("playerName");
    const { data, error } = await supabase.from("maze_score").upsert(
      [
        {
          playername: _playerName ? _playerName : "Unknown",
          levelname: levelName,
          time_score: time,
          floor: selectedFloor,
        },
      ],
      {
        onConflict: ["playername", "levelname", "floor"],
      }
    );

    if (error) throw error;
    console.log("Skóre úspěšně uloženo");
  } catch (error) {
    console.error("Chyba při ukládání skóre:", error.message);
  }
}

export async function getBestTime(levelName) {
  var _playerName = localStorage.getItem("playerName");
  try {
    const { data, error } = await supabase
      .from("maze_score")
      .select("time_score")
      .eq("playername", _playerName ? _playerName : "Unknown")
      .eq("levelname", levelName)
      .eq("floor", selectedFloor)
      .order("time_score", { ascending: true })
      .limit(1);

    if (error) throw error;

    if (data.length > 0) {
      bestTime = data[0].time_score;
    } else {
      bestTime = Infinity;
    }
  } catch (error) {
    console.error("Error fetching best time:", error.message);
    bestTime = Infinity;
  }
}

export function getCameraDirection() {
  const direction = new Vector3();
  camera.getWorldDirection(direction);
  return direction;
}


export function addExperienceForCompletion(floor) {
  const playerLevel = getPlayerLevel(); // Předpokládáme, že tato funkce existuje
  const dungeonLevel = floor * 5; // Každé podlaží odpovídá 5 úrovním

  // Základní zkušenosti za dokončení bludiště
  const baseExperience = 300 * floor; // Např. 300 zkušeností za každou úroveň bludiště

  // Modifikátor na základě rozdílu úrovní
  const levelDifference = dungeonLevel - playerLevel;
  let levelModifier = 1;

  if (levelDifference >= 5) {
    // Pokud je bludiště výrazně těžší než hráč
    levelModifier += (levelDifference * 0.05);
  } else if (levelDifference <= -5) {
    // Pokud je bludiště výrazně lehčí než hráč
    levelModifier += (levelDifference * 0.1); // levelDifference je záporné číslo
    levelModifier = Math.max(0.1, levelModifier); // Minimální modifikátor je 0.1
  }

  //Bonus za počet bossů v bludišti
  const bossBonus = (totalBossesInMaze * 200) * (floor);

  // Celkové zkušenosti
  const totalExperience = Math.round((baseExperience + bossBonus) * levelModifier);

  // Přidání zkušeností hráči
  addExperience(totalExperience);
  // Aktualizace úkolů po dokončení bludiště
  const seedText = actualSeedText ? actualSeedText.toString() : "";
  // Aktualizujte volání updateQuestsOnEvent
  updateQuestsOnEvent('mazeCompletion', {
    seed: seedText,
    floor: selectedFloor,
    usedMinimap: window.minimapUsed
  });
  updateQuestsOnEvent('completeMazes', { seed: seedText, floor: selectedFloor });
  return totalExperience;
}


export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function setUrlParameter(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, "", url);
}


export function createCastEffect(position, color = 0xffa500) {
  const castEffectGroup = new THREE.Group();

  const particleCount = 30;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: color,
      size: 0.02,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }

  particles.geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  castEffectGroup.add(particles);

  castEffectGroup.position.copy(position);
  const modelInfo = equipment.weapon.modelInfo;
  castEffectGroup.position.y += modelInfo.castEffectOffsetY || 0.3;
  scene.add(castEffectGroup);

  castEffectGroup.userData.animate = function () {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };

  setTimeout(() => {
    scene.remove(castEffectGroup);
  }, 500);

  return castEffectGroup;
}

export function createExplosion(position, color = 0xff8f45) {
  const explosionGroup = new THREE.Group();

  const particleCount = 100;
  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexColors: true,
    })
  );

  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

    velocities[i * 3] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

    const particleColor = new THREE.Color(color);
    colors[i * 3] = particleColor.r;
    colors[i * 3 + 1] = particleColor.g;
    colors[i * 3 + 2] = particleColor.b;

    sizes[i] = Math.random() * 0.2 + 0.05;
  }

  particles.geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particles.geometry.setAttribute(
    "velocity",
    new THREE.BufferAttribute(velocities, 3)
  );
  particles.geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );
  particles.geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  explosionGroup.position.copy(position);
  scene.add(explosionGroup);

  explosionGroup.add(particles);

  const startTime = performance.now();
  const duration = 1000; // Doba trvání exploze v milisekundách

  // Místo volání animateExplosion zde, přidáme explozi do pole
  explosions.push({
    group: explosionGroup,
    particles: particles,
    startTime: startTime,
    duration: duration
  });

  return explosionGroup;
}

let lastTeleportEffectTime = 0;
const teleportEffectCooldown = 500; // 500 ms cooldown

export function showTeleportEffect() {
  var teleportOverlay = document.getElementById('teleportOverlay');
  if (!teleportOverlay) {
    teleportOverlay = createTeleportOverlay();
  }

  const currentTime = Date.now();
  if (currentTime - lastTeleportEffectTime >= teleportEffectCooldown) {
    teleportOverlay.style.opacity = '0.7';
    setTimeout(() => {
      teleportOverlay.style.opacity = '0';
    }, 300);
    lastTeleportEffectTime = currentTime;
  }
}

function createTeleportOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'teleportOverlay';
  document.body.appendChild(overlay);
  return overlay;
}

export function showDamageEffect() {
  var damageOverlay = document.getElementById('damageOverlay');
  if (!damageOverlay) {
    damageOverlay = createDamageOverlay();
  }

  damageOverlay.style.opacity = '0.7';
  setTimeout(() => {
    damageOverlay.style.opacity = '0';
  }, 300);
}

let lastDamageEffectTime = 0;
const damageEffectCooldown = 500; // 500 ms cooldown

export function playerTakeDamage(damage) {
  if (isProtectiveShieldActive()) {
    const currentTime = Date.now();
    if (currentTime - lastDamageEffectTime >= damageEffectCooldown) {
      playSound(aoeBlastSoundBuffer, 0.7);
      playSound(hurtSoundBuffer, 0.7);
      lastDamageEffectTime = currentTime;
    }
    return; // Pokud je aktivní ochranný štít, neaplikujeme žádné poškození
  }

  setPlayerHealth(playerHealth - damage);
  updatePlayerHealthBar();

  const currentTime = Date.now();
  if (currentTime - lastDamageEffectTime >= damageEffectCooldown) {
    showDamageEffect();
    playSound(hurtSoundBuffer, 0.7);
    lastDamageEffectTime = currentTime;
  }

  if (playerHealth <= 0) {
    playerDeath();
  }
}

function createDamageOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'damageOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.boxShadow = 'inset 0 0 50px 20px rgba(255, 0, 0, 0.5)';
  overlay.style.pointerEvents = 'none';
  overlay.style.transition = 'opacity 0.3s ease-out';
  overlay.style.opacity = '0';
  overlay.style.zIndex = '1000';
  document.body.appendChild(overlay);
  return overlay;
}


function createTimeDilationOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'timeDilationOverlay';
  document.body.appendChild(overlay);
  return overlay;
}

export function showTimeDilationEffect() {
  const overlay = document.getElementById('timeDilationOverlay') || createTimeDilationOverlay();
  overlay.style.opacity = '1';
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 300);
}

export function updateMagicBalls(deltaTime) {
  for (let i = magicBalls.length - 1; i >= 0; i--) {
    const magicBall = magicBalls[i];
    magicBall.position.add(
      magicBall.velocity.clone().multiplyScalar(deltaTime * 40)
    );

    // Získáme poloměr magické střely
    const magicBallRadius = magicBall.geometry.parameters.radius;

    // Vytvoříme kouli reprezentující hráče
    const playerSphere = new THREE.Sphere(player.position.clone(), 0.5);
    playerSphere.center.y = player.position.y + 1; // Nastavíme Y pozici na 1, aby odpovídala výšce hráče

    // Kontrola kolize pomocí průniku koulí
    if (playerSphere.intersectsSphere(new THREE.Sphere(magicBall.position, magicBallRadius))) {
      if (magicBall.isFrostbolt) {
        freezePlayer();
      } else {
        playerTakeDamage(magicBall.attackDamage);
      }
      createExplosion(magicBall.position, magicBall.material.color.getHex());
      scene.remove(magicBall);
      magicBalls.splice(i, 1);
      continue; // Přeskočíme zbytek cyklu pro tuto střelu
    }

    for (let j = 0; j < walls.length; j++) {
      const wall = walls[j];
      if (magicBall.position.distanceTo(wall.position) < CELL_SIZE / 2) {
        createExplosion(magicBall.position, magicBall.material.color.getHex()); // Vytvoření exploze s barvou střely
        scene.remove(magicBall);
        magicBalls.splice(i, 1);
        break;
      }
    }

    // Časový limit - pokud střela existuje déle než 5 sekund, odstranit ji
    magicBall.userData.lifeTime =
      (magicBall.userData.lifeTime || 0) + deltaTime;
    if (magicBall.userData.lifeTime > 5) {
      scene.remove(magicBall);
      magicBalls.splice(i, 1);
    }
  }
}

let freezeEndTime = 0;
export function freezePlayer() {
  const currentTime = Date.now();
  const freezeDuration = 2000; // 2 sekundy

  // Aktualizujeme čas konce zmrazení
  freezeEndTime = Math.max(freezeEndTime, currentTime + freezeDuration);

  player.isFrozen = true;

  // Vytvoření nebo aktualizace ledového efektu
  if (!player.iceEffect) {
    const iceGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const iceMaterial = new THREE.MeshPhongMaterial({
      color: 0xadd8e6,
      transparent: true,
      opacity: 0.4,
      shininess: 100,
      side: THREE.DoubleSide,
    });
    player.iceEffect = new THREE.Mesh(iceGeometry, iceMaterial);
    player.iceEffect.position.set(0, 0, -0.5);
    camera.add(player.iceEffect);
  }

  // Přidání zvukového efektu zmrazení
  playSound(frostBoltHitSoundBuffer, 0.7);
}

export function removeFreezeEffect() {
  if (player.iceEffect) {
    camera.remove(player.iceEffect);
    player.iceEffect.geometry.dispose();
    player.iceEffect.material.dispose();
    player.iceEffect = null;
  }
  // Odstraňte vizuální efekt zamrznutí z ikon kouzel
  document.querySelectorAll(".spell-icon").forEach((icon) => {
    icon.classList.remove("frozen");
  });
  player.isFrozen = false;
  freezeEndTime = 0;
}

export function updateFreezeEffect() {
  const currentTime = Date.now();

  if (currentTime < freezeEndTime) {
    player.isFrozen = true;
    if (player.iceEffect) {
      player.iceEffect.visible = true;
    }
    // Přidejte vizuální efekt zamrznutí na ikony kouzel
    document.querySelectorAll(".spell-icon").forEach((icon) => {
      icon.classList.add("frozen");
    });
  } else {
    player.isFrozen = false;
    if (player.iceEffect) {
      player.iceEffect.visible = false;
    }
    // Odstraňte vizuální efekt zamrznutí z ikon kouzel
    document.querySelectorAll(".spell-icon").forEach((icon) => {
      icon.classList.remove("frozen");
    });
  }
}

function drawArrow(ctx, x, y, angle, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-size / 2, -size / 2);
  ctx.lineTo(size / 2, 0);
  ctx.lineTo(-size / 2, size / 2);
  ctx.lineTo(0, 0); // Dlouhá strana šipky směřující dopředu
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}



export function drawMinimap() {
  const minimap = document.getElementById("minimap");
  const ctx = minimap.getContext("2d");
  const scale = minimap.width / (MAZE_SIZE * CELL_SIZE);

  // Vymazání canvasu
  ctx.clearRect(0, 0, minimap.width, minimap.height);

  // Vykreslení pozadí (mlha války)
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, minimap.width, minimap.height);

  // Získání pozice hráče v souřadnicích bludiště
  const playerMazeX = Math.floor((player.position.x + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);
  const playerMazeZ = Math.floor((player.position.z + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);

  // Inicializace pole objevených buněk, pokud ještě neexistuje
  if (!window.discoveredCells || window.discoveredCells.length !== MAZE_SIZE) {
    window.discoveredCells = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(false));
  }

  // Ray casting pro zjištění viditelných buněk
  for (let angle = 0; angle < 360; angle += 360 / RAY_COUNT) {
    const radians = angle * (Math.PI / 180);
    let rayX = playerMazeX;
    let rayZ = playerMazeZ;
    let distance = 0;

    while (distance < FOG_OF_WAR_RADIUS) {
      const dx = Math.cos(radians) * 0.1;
      const dz = Math.sin(radians) * 0.1;
      rayX += dx;
      rayZ += dz;
      distance = Math.sqrt(Math.pow(rayX - playerMazeX, 2) + Math.pow(rayZ - playerMazeZ, 2));

      const cellX = Math.floor(rayX);
      const cellZ = Math.floor(rayZ);

      // Kontrola hranic bludiště
      if (cellX < 0 || cellX >= MAZE_SIZE || cellZ < 0 || cellZ >= MAZE_SIZE) {
        break;
      }

      // Označení buňky jako objevené
      window.discoveredCells[cellX][cellZ] = true;

      // Pokud narazíme na zeď, paprsek se zastaví
      if (maze[cellX][cellZ] === 1 || maze[cellX][cellZ] === BLOCKING_WALL) {
        window.discoveredCells[cellX][cellZ] = true;
        break;
      }
    }
  }

  // Vykreslení objevených buněk
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (window.discoveredCells[i][j]) {
        // Vykreslení zdí
        if (maze[i][j] === 1) {
          ctx.fillStyle = "#282633";
          ctx.fillRect(
            i * CELL_SIZE * scale,
            j * CELL_SIZE * scale,
            CELL_SIZE * scale,
            CELL_SIZE * scale
          );
        } else if (maze[i][j] === BLOCKING_WALL) {
          ctx.fillStyle = "#cc7e54";
          ctx.fillRect(
            i * CELL_SIZE * scale,
            j * CELL_SIZE * scale,
            CELL_SIZE * scale,
            CELL_SIZE * scale
          );
        } else {
          // Vykreslení podlahy pro objevené oblasti
          ctx.fillStyle = "#55535e";
          ctx.fillRect(
            i * CELL_SIZE * scale,
            j * CELL_SIZE * scale,
            CELL_SIZE * scale,
            CELL_SIZE * scale
          );
        }
      }
    }
  }

  // Vykreslení objevených objektů
  scene.children.forEach((child) => {
    if (child.userData.isTeleport || child.userData.isKey || child.userData.isGoal) {
      const objectX = Math.floor((child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);
      const objectZ = Math.floor((child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);

      if (window.discoveredCells[objectX][objectZ]) {
        if (child.userData.isTeleport) {
          ctx.fillStyle = child.material.color.getStyle();
          ctx.beginPath();
          ctx.arc(
            (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (CELL_SIZE * scale) / 3,
            0,
            2 * Math.PI
          );
          ctx.fill();
        } else if (child.userData.isKey) {
          ctx.fillStyle = "#fffc4d";
          ctx.beginPath();
          ctx.arc(
            (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (CELL_SIZE * scale) / 4,
            0,
            2 * Math.PI
          );
          ctx.fill();
        } else if (child.userData.isGoal) {
          ctx.fillStyle = "#5fd0f5";
          ctx.beginPath();
          ctx.arc(
            (child.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (child.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale,
            (CELL_SIZE * scale) / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }
    }
  });

  // Vykreslení bossů v objevených oblastech
  bosses.forEach((boss) => {
    const bossX = Math.floor((boss.position.x + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);
    const bossZ = Math.floor((boss.position.z + (MAZE_SIZE / 2) * CELL_SIZE) / CELL_SIZE);

    if (window.discoveredCells[bossX][bossZ]) {
      const bossScreenX = (boss.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
      const bossScreenZ = (boss.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;

      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(bossScreenX - 5, bossScreenZ - 5);
      ctx.lineTo(bossScreenX + 5, bossScreenZ + 5);
      ctx.moveTo(bossScreenX + 5, bossScreenZ - 5);
      ctx.lineTo(bossScreenX - 5, bossScreenZ + 5);
      ctx.stroke();
    }
  });

  // Vykreslení pozice hráče jako šipky
  ctx.fillStyle = "#9ec0ff";
  const playerX = (player.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerZ = (player.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerAngle = -player.rotation.y - Math.PI / 2;
  drawArrow(ctx, playerX, playerZ, playerAngle, CELL_SIZE * scale);
}


export function checkProjectileCollisionWithBosses(projectile, boss) {
  if (!boss.model || !boss.model.position) {
    return false; // Pokud boss nebo jeho model nemá pozici, nemůže dojít ke kolizi
  }

  const horizontalDistance = Math.sqrt(
    Math.pow(projectile.position.x - boss.model.position.x, 2) +
    Math.pow(projectile.position.z - boss.model.position.z, 2)
  );
  const verticalDistance = projectile.position.y - boss.model.position.y;

  if (horizontalDistance < boss.bossHitBoxMarginXZ && verticalDistance > 0 && verticalDistance < boss.bossHitBoxMarginY) {
    return true;
  }
  return false;
}
export function createBossCastEffect(position, color = 0xff0000, options = {}) {
  const {
    particleCount = 100,
    duration = 1.0,
    spread = { x: 0.5, y: 0.5, z: 0.5 },
    offset = { x: 0, y: 0, z: 0 },  // Přidáno
    startColor = color,
    endColor = 0xffffff,
    minSize = 0.05,
    maxSize = 0.15,
    speedFactor = 1.0,
    glowIntensity = 1.0,
    opacity = 1.0
  } = options;

  const group = new THREE.Group();

  const vertexShader = `
    uniform float time;
    attribute float size;
    attribute vec3 velocity;
    attribute float startTime;
    varying float vAlpha;
    varying float vProgress;

    void main() {
      float age = time - startTime;
      float progress = age / ${duration.toFixed(1)};
      vProgress = progress;

      vec3 pos = position + velocity * age;
      vAlpha = 1.0 - progress;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 startColor;
    uniform vec3 endColor;
    uniform float opacity;
    uniform float glowIntensity;

    varying float vAlpha;
    varying float vProgress;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(gl_PointCoord, center);

      float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * opacity;
      vec3 color = mix(startColor, endColor, vProgress);

      float glow = pow(1.0 - dist, 2.0) * glowIntensity;
      color += vec3(glow);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      startColor: { value: new THREE.Color(startColor) },
      endColor: { value: new THREE.Color(endColor) },
      opacity: { value: opacity },
      glowIntensity: { value: glowIntensity },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const startTimes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Upraveno pro použití offsetu
    positions[i3] = position.x + offset.x + (Math.random() - 0.5) * spread.x;
    positions[i3 + 1] = position.y + offset.y + (Math.random() - 0.5) * spread.y;
    positions[i3 + 2] = position.z + offset.z + (Math.random() - 0.5) * spread.z;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * speedFactor;
    velocities[i3] = Math.cos(angle) * speed;
    velocities[i3 + 1] = Math.sin(angle) * speed + speed * 0.5; // Mírně nahoru
    velocities[i3 + 2] = (Math.random() - 0.5) * speed;

    sizes[i] = minSize + Math.random() * (maxSize - minSize);
    startTimes[i] = Math.random() * duration * 0.5; // Rozložení startu částic
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('startTime', new THREE.BufferAttribute(startTimes, 1));

  const particles = new THREE.Points(geometry, shaderMaterial);
  group.add(particles);

  let elapsedTime = 0;

  group.userData.update = (deltaTime) => {
    elapsedTime += deltaTime;
    shaderMaterial.uniforms.time.value = elapsedTime;

    if (elapsedTime > duration) {
      return false; // Signalizuje, že efekt skončil
    }
    return true;
  };

  return group;
}

export function showMessage(message, breakLine = false, duration = 3000) {
  const messageContainer = document.getElementById('message-container');
  const messageElement = document.createElement('div');
  messageElement.className = breakLine ? 'game-message break-line' : 'game-message';
  messageElement.innerHTML = message;

  messageContainer.appendChild(messageElement);

  // Animace pro zobrazení zprávy
  setTimeout(() => {
    messageElement.style.opacity = '1';
  }, 10);

  // Animace pro skrytí zprávy
  setTimeout(() => {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.remove();
    }, 300);
  }, duration);
}

export function loadAndPlayMusic(floor, audioLoader) {
  if (currentBackgroundMusic) {
    currentBackgroundMusic.stop();
    currentBackgroundMusic.buffer = null;
  }

  const musicFile = floorMusic[floor] || "music/msc_lost.mp3";

  audioLoader.load(musicFile, function (buffer) {
    if (currentBackgroundMusic) {
      currentBackgroundMusic.disconnect();
    }
    currentBackgroundMusic = new THREE.Audio(new THREE.AudioListener());
    currentBackgroundMusic.setBuffer(buffer);
    currentBackgroundMusic.setLoop(true);
    currentBackgroundMusic.setVolume(0.35);

    // Přehrajeme hudbu pouze pokud je povolena
    if (isMusicEnabled) {
      currentBackgroundMusic.play();
    }
  });
}

export function getMazeSizeForFloor(floor) {
  const config = floorsConfig[floor];
  return { minSize: config.minSize, maxSize: config.maxSize };
}

export function getFloorTextureSet(floor) {
  return floorsConfig[floor].textureSets;
}


export function disposeObject(obj) {
  if (obj.geometry) {
    obj.geometry.dispose();
  }

  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach((material) => disposeMaterial(material));
    } else {
      disposeMaterial(obj.material);
    }
  }

  // Rekurzivně projdeme děti objektu
  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      disposeObject(obj.children[i]);
    }
  }
}

export function disposeMaterial(material) {
  // Uvolníme všechny textury materiálu
  for (const key in material) {
    if (material[key] && material[key].isTexture) {
      material[key].dispose();
    }
  }
  material.dispose();
}

const baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x505050 });

const spikeGeometry = new THREE.ConeGeometry(0.1, 0.5, 8);
const spikeMaterial = new THREE.MeshStandardMaterial({ color: 0xc2c6cf, emissiveIntensity: 0.4, emissive: 0xc2c6cf });

export function createSpikeTrap() {
  const trapGroup = new THREE.Group();

  // Base of the trap
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.05;
  base.visible = false; // Set to true if you want the base to be visible
  trapGroup.add(base);

  // Create InstancedMesh for spikes
  const spikeCount = 10; // 9 outer spikes + 1 central spike
  const spikesInstancedMesh = new THREE.InstancedMesh(spikeGeometry, spikeMaterial, spikeCount);
  trapGroup.add(spikesInstancedMesh);

  // Set up instance matrices for the spikes
  const dummy = new THREE.Object3D();

  // Outer spikes
  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;

    dummy.position.set(
      Math.cos(angle) * 1,          // x position
      0.15,                         // y position (half spike height)
      Math.sin(angle) * 1           // z position
    );

    dummy.rotation.set(0, -Math.PI / 2, 0);
    dummy.updateMatrix();
    spikesInstancedMesh.setMatrixAt(i, dummy.matrix);
  }

  // Central spike
  dummy.position.set(0, 0.2, 0);
  dummy.rotation.set(0, -Math.PI / 2, 0);
  dummy.updateMatrix();
  spikesInstancedMesh.setMatrixAt(9, dummy.matrix);

  spikesInstancedMesh.instanceMatrix.needsUpdate = true;

  // User data for trap state
  trapGroup.userData.isSpikeTrap = true;
  trapGroup.userData.state = 'down';
  trapGroup.userData.lastStateChange = Date.now();

  // Initial position below the floor
  trapGroup.position.y = -0.32;

  scene.add(trapGroup);
  return trapGroup;
}

export function updateSpikeTraps(deltaTime) {
  const currentTime = Date.now();

  scene.traverse((object) => {
    if (object.userData.isSpikeTrap) {
      const timeSinceLastChange = currentTime - object.userData.lastStateChange;

      if (object.userData.state === 'down' && timeSinceLastChange >= SPIKE_TRAP_CYCLE - SPIKE_TRAP_UP_TIME) {
        object.userData.state = 'up';
        object.userData.lastStateChange = currentTime;
        object.position.y = 0; // Raise the trap
      } else if (object.userData.state === 'up' && timeSinceLastChange >= SPIKE_TRAP_UP_TIME) {
        object.userData.state = 'down';
        object.userData.lastStateChange = currentTime;
        object.position.y = -0.32; // Lower the trap
      }

      // Collision detection
      if (object.userData.state === 'up' && player.position.distanceTo(object.position) < 0.9) {
        playerTakeDamage(getPlayerMaxHealth() * 0.5 * deltaTime);
      }
    }
  });
}

export function clearSpikeTraps() {
  // Remove traps from the scene
  const trapsToRemove = [];
  scene.traverse((object) => {
    if (object.userData.isSpikeTrap) {
      trapsToRemove.push(object);
    }
  });

  trapsToRemove.forEach((trap) => {
    // Dispose of the InstancedMesh
    const spikesInstancedMesh = trap.children.find(child => child instanceof THREE.InstancedMesh);
    if (spikesInstancedMesh) {
      spikesInstancedMesh.geometry.dispose();
      spikesInstancedMesh.material.dispose();
    }

    // Dispose of the base mesh
    const baseMesh = trap.children.find(child => child instanceof THREE.Mesh);
    if (baseMesh) {
      baseMesh.geometry.dispose();
      baseMesh.material.dispose();
    }

    scene.remove(trap);
  });
}