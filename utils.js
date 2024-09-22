import { Vector3 } from "three";
import { selectedFloor, supabase } from "./main";
import { addExperience, getPlayerLevel } from "./player";

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
      particleCountPerlevel= 10
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


  export  async function submitScore(levelName, time) {
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
  