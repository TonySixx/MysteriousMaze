import { Vector3 } from "three";
import { BLOCKING_WALL, CELL_SIZE, frostBoltHitSoundBuffer, MAZE_SIZE, playerDeath, playSound, selectedFloor, supabase } from "./main";
import { addExperience, getPlayerLevel, player, playerHealth, setPlayerHealth, updatePlayerHealthBar } from "./player";
import * as THREE from 'three';
import { equipment } from "./inventory";
import { bosses } from "./boss";

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
  const baseExperience = 2000;
  const exponent = 1.5;
  let totalExperience = Math.round(baseExperience * Math.pow(floor, exponent));

  // Získáme úroveň hráče
  const playerLevel = getPlayerLevel();

  // Upravíme zkušenosti na základě úrovně hráče a podlaží
  let expMultiplier = 1;

  if (floor === 1 && playerLevel > 7) {
    expMultiplier = Math.max(0.1, 1 - (playerLevel - 7) * 0.15);
  } else if (floor === 2 && playerLevel > 12) {
    expMultiplier = Math.max(0.1, 1 - (playerLevel - 12) * 0.15);
  } else if (floor === 3 && playerLevel > 16) {
    expMultiplier = Math.max(0.1, 1 - (playerLevel - 16) * 0.15);
  } else if (floor === 4 && playerLevel > 20) {
    expMultiplier = Math.max(0.1, 1 - (playerLevel - 20) * 0.15);
  }

  totalExperience = Math.round(totalExperience * expMultiplier);
  addExperience(totalExperience);
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

  function animateExplosion() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;
    const colors = particles.geometry.attributes.color.array;
    const sizes = particles.geometry.attributes.size.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      colors[i * 3 + 3] = 1 - progress; // Plynulé mizení
      sizes[i] *= 0.99; // Postupné zmenšování částic
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;

    if (progress < 1) {
      requestAnimationFrame(animateExplosion);
    } else {
      scene.remove(explosionGroup);
    }
  }

  animateExplosion();

  return explosionGroup;
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
    playerSphere.center.y = 1; // Nastavíme Y pozici na 1, aby odpovídala výšce hráče

    // Kontrola kolize pomocí průniku koulí
    if (playerSphere.intersectsSphere(new THREE.Sphere(magicBall.position, magicBallRadius))) {
      if (magicBall.isFrostbolt) {
        freezePlayer();
      } else {
        setPlayerHealth(playerHealth - 20);
        updatePlayerHealthBar();
        if (playerHealth <= 0) {
          playerDeath();
        }
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
function freezePlayer() {
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

  // Vykreslení pozadí
  ctx.fillStyle = "#55535e";
  ctx.fillRect(0, 0, minimap.width, minimap.height);

  // Vykreslení zdí
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
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
      }
    }
  }

  // Vykreslení teleportů
  scene.children.forEach((child) => {
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
    }
  });

  // Vykreslení klíčů
  scene.children.forEach((child) => {
    if (child.userData.isKey) {
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
    }
  });

  // Vykreslení cíle
  scene.children.forEach((child) => {
    if (child.userData.isGoal) {
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
  });

  // Vykreslení bossů jako bílý křížek
  bosses.forEach((boss) => {
    const bossX = (boss.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
    const bossZ = (boss.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // Vykreslení křížku
    ctx.beginPath();
    ctx.moveTo(bossX - 5, bossZ - 5);
    ctx.lineTo(bossX + 5, bossZ + 5);
    ctx.moveTo(bossX + 5, bossZ - 5);
    ctx.lineTo(bossX - 5, bossZ + 5);
    ctx.stroke();
  });

  // Vykreslení pozice hráče jako šipky
  ctx.fillStyle = "#9ec0ff";
  const playerX = (player.position.x + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerZ = (player.position.z + (MAZE_SIZE / 2) * CELL_SIZE) * scale;
  const playerAngle = -player.rotation.y - Math.PI / 2; // Úprava úhlu rotace
  drawArrow(ctx, playerX, playerZ, playerAngle, CELL_SIZE * scale);
}


export function checkProjectileCollisionWithBosses(projectile, boss) {
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