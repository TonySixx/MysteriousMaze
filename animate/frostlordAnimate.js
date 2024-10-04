import { playerDefaultSpeed } from "../globals";
import { player } from "../player";
import * as THREE from "three";
import { freezePlayer, playerTakeDamage } from "../utils";
import { CELL_SIZE } from "../main";
import { createIceExplosion } from "../spells";

// Přidáme nové funkce pro aktualizaci efektů
export function updateGlacialNovaEffects(deltaTime) {
    for (let i = glacialNovaEffects.length - 1; i >= 0; i--) {
      const effect = glacialNovaEffects[i];
      const elapsedTime = Date.now() - effect.startTime;
      const progress = elapsedTime / effect.duration;
  
      if (progress < 1) {
        effect.mesh.material.uniforms.time.value = elapsedTime / 1000;
        effect.mesh.material.uniforms.duration.value = effect.duration / 1000;
        effect.particles.material.uniforms.time.value = elapsedTime / 1000;
        effect.particles.material.uniforms.duration.value = effect.duration / 1000;
        
        const scale = 1 + progress * 0.5;
        effect.mesh.scale.setScalar(scale);
        effect.particles.scale.setScalar(scale);
  
        // Damage player if within nova radius
        if (player.position.distanceTo(effect.boss.position) <= effect.radius * scale) {
          playerTakeDamage(effect.damagePerSecond * deltaTime);
        }
      } else {
        scene.remove(effect.mesh);
        scene.remove(effect.particles);
        glacialNovaEffects.splice(i, 1);
      }
    }
  }
  
  export function updateIcicleBullets(deltaTime) {
    for (let i = icicleBullets.length - 1; i >= 0; i--) {
      const icicle = icicleBullets[i];
      icicle.mesh.position.add(icicle.velocity.clone().multiplyScalar(deltaTime * 60));
      
      // Získáme poloměr rampouchu (předpokládáme, že je to kužel)
      const icicleRadius = icicle.mesh.geometry.parameters.radius;

      // Kontrola kolize se zdmi
      for (let j = 0; j < walls.length; j++) {
        const wall = walls[j];
        if (icicle.mesh.position.distanceTo(wall.position) < CELL_SIZE / 2 + icicleRadius) {
          createIceExplosion(icicle.mesh.position);
          scene.remove(icicle.mesh);
          icicleBullets.splice(i, 1);
          return; // Přeskočíme zbytek cyklu pro tento rampouch
        }
      }

      // Kontrola kolize s hráčem
      const playerSphere = new THREE.Sphere(player.position.clone(), 0.5);
      playerSphere.center.y = 1; // Nastavíme Y pozici na 1, aby odpovídala výšce hráče

      if (playerSphere.intersectsSphere(new THREE.Sphere(icicle.mesh.position, icicleRadius))) {
        playerTakeDamage(icicle.damage);
        freezePlayer(); // Zmrazí hráče při zásahu
        createIceExplosion(icicle.mesh.position, 0x87cefa); // Vytvoření ledové exploze
        scene.remove(icicle.mesh);
        icicleBullets.splice(i, 1);
        continue;
      }

      // Časový limit
      const elapsedTime = Date.now() - icicle.startTime;
      if (elapsedTime > icicle.duration) {
        scene.remove(icicle.mesh);
        icicleBullets.splice(i, 1);
      }
    }
  }
  
  export function updateIceTrails(deltaTime) {
    for (let i = iceTrails.length - 1; i >= 0; i--) {
      const trail = iceTrails[i];
      const elapsedTime = Date.now() - trail.startTime;
      
      if (elapsedTime < trail.duration + trail.fadeOutDuration) {
        trail.mesh.material.uniforms.time.value = elapsedTime / 1000;

        // Kontrola, zda je hráč v ledové zóně
        if (player.position.distanceTo(trail.position) <= trail.radius) {
          window.playerSpeed = playerDefaultSpeed * 0.5; // Zpomalení hráče o 50%
        }

        // Postupné mizení
        if (elapsedTime > trail.duration) {
          const fadeOutProgress = (elapsedTime - trail.duration) / trail.fadeOutDuration;
          trail.mesh.material.opacity = 1 - fadeOutProgress;
        }
      } else {
        scene.remove(trail.mesh);
        iceTrails.splice(i, 1);
      }
    }
  
    // Obnovení normální rychlosti hráče, pokud není v žádné ledové zóně
    if (iceTrails.every(trail => player.position.distanceTo(trail.position) > trail.radius)) {
      window.playerSpeed = playerDefaultSpeed;
    }
  }
  
  export function updateFrostAuraEffects(deltaTime) {
    for (let i = frostAuraEffects.length - 1; i >= 0; i--) {
      const effect = frostAuraEffects[i];
      const elapsedTime = Date.now() - effect.startTime;
      if (elapsedTime < effect.duration) {
        effect.mesh.material.uniforms.time.value = elapsedTime / 1000;
      } else {
        effect.mesh.parent.remove(effect.mesh);
        frostAuraEffects.splice(i, 1);
      }
    }
  }

  export function updateChronoNovaEffects(deltaTime) {
    for (let i = chronoNovaEffects.length - 1; i >= 0; i--) {
      const effect = chronoNovaEffects[i];
      const elapsedTime = Date.now() - effect.startTime;
      const progress = elapsedTime / effect.duration;

      if (progress < 1) {
        if (effect.type === 'charge') {
          effect.mesh.material.uniforms.time.value = elapsedTime / 1000;
        } else if (effect.type === 'explosion') {
          effect.mesh.material.uniforms.time.value = elapsedTime;
          
          // Aplikace poškození hráči, pokud je v dosahu
          if (player.position.distanceTo(effect.boss.position) <= effect.radius) {
            playerTakeDamage(effect.boss.type.attackDamage * deltaTime);
          }
        }
      } else {
        scene.remove(effect.mesh);
        chronoNovaEffects.splice(i, 1);
      }
    }
  }
  
