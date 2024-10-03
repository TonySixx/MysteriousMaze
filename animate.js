import { bosses } from "./boss";
import { checkMerchantInteraction, updateQuestIndicator } from "./camp";
import { playerDefaultSpeed } from "./globals";
import { addItemToInventory, checkSpaceInInventory, createItem, getRarityColor } from "./inventory";
import { getItemName } from "./itemDatabase";
import { getTranslation } from "./langUtils";
import { chestSoundBuffer, generateNewMaze, itemSoundBuffer, keys, playSound, setSelectedFloor, showFloorSelectBtn, teleportSoundBuffer } from "./main";
import { checkCollisions, player } from "./player";
import { getAvailableQuests, getCompletedQuests, toggleQuestBoardUI } from "./quests";
import { createTeleportEffect, inspectionDuration, inspectionStartTime, isInspectingStaff, isSwingingStaff, originalStaffRotation, setIsInspectingStaff, setIsSwingingStaff } from "./spells";
import { playerTakeDamage, showMessage, showTimeDilationEffect } from "./utils";
import * as THREE from "three";

export function animateMerchants(deltaTime) {
    const time = Date.now() * 0.001;
    const sinTime = Math.sin(time * 2) * 0.1;

    merchants.forEach((merchant) => {
        // Aktualizace animace obchodníka
        merchant.userData.mixer.update(deltaTime);

        // Animace ikonky nad obchodníkem
        if (merchant.userData.armorIcon) {
            const armorIcon = merchant.userData.armorIcon;
            armorIcon.position.y = 2.5 + sinTime;
            armorIcon.rotation.y = time * 0.5;
        }

        // Animace potionBottle
        const potionBottle = merchant.userData.potionBottle;
        if (potionBottle) {
            potionBottle.position.y = 2.5 + sinTime;
        }

        // Kontrola interakce
        checkMerchantInteraction(merchant);
    });
}


export function updateFloatingTexts(textArray, currentTime) {
    textArray = textArray.filter((textItem) => {
        const elapsed = currentTime - textItem.startTime;
        if (elapsed < textItem.duration) {
            const progress = elapsed / textItem.duration;
            const bossScreenPosition = textItem.boss.getScreenPosition();

            // Použití individuálních posunů
            const initialOffset = textItem.initialOffset || 0;
            const movementDistance = textItem.movementDistance || 0;

            textItem.element.style.left = `${bossScreenPosition.x}px`;
            textItem.element.style.top = `${bossScreenPosition.y - initialOffset - progress * movementDistance}px`;
            textItem.element.style.opacity = 1 - progress;
            return true;
        } else {
            // Zkontrolujeme, zda má prvek rodiče
            if (textItem.element.parentNode) {
                textItem.element.parentNode.removeChild(textItem.element);
            }
            return false;
        }
    });
    return textArray;
}

export function updateTeleportParticles(deltaTime, currentTime) {
    for (let i = teleportParticles.length - 1; i >= 0; i--) {
        const particleSystem = teleportParticles[i];
        const positions = particleSystem.particles.geometry.attributes.position.array;

        for (let j = 0; j < positions.length; j += 3) {
            positions[j] += (Math.random() - 0.5) * 0.1;
            positions[j + 1] += 0.1;
            positions[j + 2] += (Math.random() - 0.5) * 0.1;
        }

        particleSystem.particles.geometry.attributes.position.needsUpdate = true;
        particleSystem.material.opacity -= 0.02;

        if (particleSystem.material.opacity <= 0 || currentTime - particleSystem.creationTime > 2000) {
            scene.remove(particleSystem.particles);
            teleportParticles.splice(i, 1);
        }
    }
}

export function updateTeleportParticleSystems(deltaTime, currentTime) {
    const playerPosition = player.position;

    for (let i = teleportParticleSystems.length - 1; i >= 0; i--) {
        const particleSystem = teleportParticleSystems[i];

        // Kontrola vzdálenosti od hráče
        if (particleSystem.position.distanceTo(playerPosition) > 25) {
            scene.remove(particleSystem);
            teleportParticleSystems.splice(i, 1);
            continue;
        }

        // Aktualizace animace
        particleSystem.rotation.x += 0.01 * deltaTime;
        particleSystem.rotation.y += 0.01 * deltaTime;

        const scale = 1 + 0.1 * Math.sin(currentTime * 0.005);
        particleSystem.scale.set(scale, scale, scale);

        // Odstranění po určitém čase
        if (currentTime - particleSystem.creationTime > 2000) {
            scene.remove(particleSystem);
            teleportParticleSystems.splice(i, 1);
        }
    }
}

export function updateMainBossDragons(deltaTime, currentTime) {
    for (let i = mainBossDragons.length - 1; i >= 0; i--) {
        const dragonData = mainBossDragons[i];
        const elapsedTime = (currentTime - dragonData.startTime) / 1000;
        const flyDuration = 2; // 2 sekundy
        const progress = Math.min(elapsedTime / flyDuration, 1);

        dragonData.dragon.position.lerpVectors(dragonData.startPosition, dragonData.targetPosition, progress);
        if (dragonData.dragon.model) {
            dragonData.dragon.model.position.copy(dragonData.dragon.position);
        }

        if (progress >= 1) {
            mainBossDragons.splice(i, 1);
        }
    }
}

export function updateBossChestAndPortal(deltaTime) {
    const { chest, portal, interactionText, portalInteractionText, chestOpened, chestMixer } = bossChestAndPortalData;

    // Aktualizace mixeru truhly
    if (chestMixer) {
        chestMixer.update(deltaTime);
    }

    // Kontrola vzdálenosti hráče od truhly
    const chestDistance = player.position.distanceTo(chest.position);
    if (chestDistance < 2) {
        interactionText.style.display = "block";
        if (keys.f && !chestOpened && checkSpaceInInventory(3)) {
            bossChestAndPortalData.chestOpened = true;
            openChest(chest);
            keys.f = false;
        }
    } else {
        interactionText.style.display = "none";
    }

    // Kontrola vzdálenosti hráče od portálu
    const portalDistance = player.position.distanceTo(portal.position);
    if (portalDistance < 2) {
        portalInteractionText.style.display = "block";
        if (keys.f) {
            teleportToCamp();
            keys.f = false;
        }
    } else {
        portalInteractionText.style.display = "none";
    }
}

function openChest(chest) {
    playSound(chestSoundBuffer);

    // Použití uloženého mixeru a akce pro otevření truhly
    const { chestMixer, chestOpenAction } = bossChestAndPortalData;
    chestOpenAction.play();

    let gotItem = false;
    // Přidání předmětů do inventáře na základě pravděpodobnosti
    bossChestAndPortalData.items.forEach(drop => {
        if (Math.random() < drop.chance) {
            addItemToInventory(createItem(getItemName(drop.item)));
            gotItem = true;
            showMessage("You have obtained: " + "<span style='color: " + getRarityColor(drop.item.rarity) + "'>" + drop.item.name + "</span>", true);
        }
    });

    if (gotItem) {
        playSound(itemSoundBuffer);
    }

    // Odebrání interakčního textu a zóny po otevření truhly
    bossChestAndPortalData.interactionText.remove();
    scene.remove(bossChestAndPortalData.interactionZone);

    // Označení truhly jako otevřené
    bossChestAndPortalData.chestOpened = true;
}

export function teleportToCamp() {
    // Implementace teleportace do kempu
    setSelectedFloor(999);
    showFloorSelectBtn.textContent = getTranslation("floorCamp");
    playSound(teleportSoundBuffer);
    generateNewMaze();
}

export function animateBossEntry(deltaTime) {
    if (!mainBossEntryData) return;

    const { mainBoss, startPosition, targetPosition, startTime, flyDuration } = mainBossEntryData;
    const elapsedTime = (performance.now() - startTime) / 1000;
    const progress = Math.min(elapsedTime / flyDuration, 1);

    mainBoss.position.lerpVectors(startPosition, targetPosition, progress);
    if (mainBoss.model) {
        mainBoss.model.position.copy(mainBoss.position);
    }

    if (progress >= 1) {
        mainBossEntryData = null;
    }
}

export function updateExplosions(deltaTime, currentTime) {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        const elapsedTime = currentTime - explosion.startTime;
        const progress = Math.min(elapsedTime / explosion.duration, 1);

        const positions = explosion.particles.geometry.attributes.position.array;
        const velocities = explosion.particles.geometry.attributes.velocity.array;
        const colors = explosion.particles.geometry.attributes.color.array;
        const sizes = explosion.particles.geometry.attributes.size.array;

        for (let j = 0; j < positions.length; j += 3) {
            positions[j] += velocities[j] * deltaTime * 50;
            positions[j + 1] += velocities[j + 1] * deltaTime * 50;
            positions[j + 2] += velocities[j + 2] * deltaTime * 50;

            colors[j + 3] = 1 - progress; // Plynulé mizení
            sizes[j / 3] *= 0.99; // Postupné zmenšování částic
        }

        explosion.particles.geometry.attributes.position.needsUpdate = true;
        explosion.particles.geometry.attributes.color.needsUpdate = true;
        explosion.particles.geometry.attributes.size.needsUpdate = true;

        if (progress >= 1) {
            scene.remove(explosion.group);
            explosions.splice(i, 1);
        }
    }
}


export function updateIceExplosions(deltaTime) {
    for (let i = iceExplosions.length - 1; i >= 0; i--) {
        const explosion = iceExplosions[i];
        explosion.scale.multiplyScalar(1.05);
        explosion.material.opacity -= 0.05 * deltaTime * 50;
        if (explosion.material.opacity <= 0) {
            scene.remove(explosion);
            iceExplosions.splice(i, 1);
        }
    }
}

export function updateFrostAuras(deltaTime) {
    for (let i = frostAuras.length - 1; i >= 0; i--) {
        const aura = frostAuras[i];
        aura.position.copy(player.position);
        aura.scale.multiplyScalar(1.01);
        aura.material.opacity -= 0.005 * deltaTime * 50;
        if (aura.material.opacity <= 0) {
            scene.remove(aura);
            frostAuras.splice(i, 1);
        } else {
            // Zpomalení nepřátel v dosahu aury
            bosses.forEach(boss => {
                if (boss.position.distanceTo(player.position) <= 7) {
                    boss.slow(0.7, 5000);
                }
            });
        }
    }
}

export function updateChainExplosions(deltaTime) {
    for (let i = chainExplosions.length - 1; i >= 0; i--) {
        const explosion = chainExplosions[i];
        explosion.scale.multiplyScalar(1.05);
        explosion.material.opacity -= 0.05 * deltaTime * 60;
        if (explosion.material.opacity <= 0) {
            scene.remove(explosion);
            explosion.geometry.dispose();
            explosion.material.dispose();
            chainExplosions.splice(i, 1);
        }
    }
}

export function updateChainLightningsVisuals(deltaTime) {
    for (let i = chainLightningsVisual.length - 1; i >= 0; i--) {
        const lightning = chainLightningsVisual[i];
        lightning.material.opacity -= 0.05 * deltaTime * 60;
        if (lightning.material.opacity <= 0) {
            scene.remove(lightning);
            lightning.geometry.dispose();
            lightning.material.dispose();
            chainLightningsVisual.splice(i, 1);
        }
    }
}


export function updateFireballExplosions(deltaTime) {
    for (let i = fireballExplosions.length - 1; i >= 0; i--) {
        const explosion = fireballExplosions[i];
        const positions = explosion.geometry.attributes.position.array;
        const colors = explosion.geometry.attributes.color.array;

        for (let j = 0; j < positions.length; j += 3) {
            positions[j] += (Math.random() - 0.5) * 0.1;
            positions[j + 1] += (Math.random() - 0.5) * 0.1;
            positions[j + 2] += (Math.random() - 0.5) * 0.1;

            colors[j + 1] *= 0.99;  // Postupné ztmavování částic
        }

        explosion.geometry.attributes.position.needsUpdate = true;
        explosion.geometry.attributes.color.needsUpdate = true;

        explosion.material.opacity -= 0.02 * deltaTime;

        if (explosion.material.opacity <= 0) {
            scene.remove(explosion);
            explosion.geometry.dispose();
            explosion.material.dispose();
            fireballExplosions.splice(i, 1);
        }
    }
}

export function updateStaffSwing(deltaTime) {
    if (!staffSwing) return;
    staffSwing.progress += 0.045 * deltaTime * 60;
    if (staffSwing.progress <= 1) {
        const currentAngle = Math.sin(staffSwing.progress * Math.PI) * staffSwing.swingAngle;
        staffModel.rotation.x = staffSwing.originalRotation.x + currentAngle;
    } else {
        staffModel.rotation.copy(originalStaffRotation);
        setIsSwingingStaff(false);
        staffSwing = null;
    }
}

export function animateStaffInspection(currentTime) {
    if (!isInspectingStaff || !staffModel) return;

    const progress = (currentTime - inspectionStartTime) / inspectionDuration;


    if (progress < 1) {
        const startRotation = originalStaffRotation.clone();
        const maxRotationY = Math.PI / 2;
        const maxRotationX = Math.PI / 24;

        const rotationOffsetY = Math.sin(progress * Math.PI * 2) * maxRotationY;
        const rotationOffsetX = Math.sin(progress * Math.PI) * maxRotationX;

        staffModel.rotation.set(
            startRotation.x - rotationOffsetX,
            startRotation.y + rotationOffsetY,
            startRotation.z
        );
    } else {
        staffModel.rotation.copy(originalStaffRotation);
        setIsInspectingStaff(false);
    }
}


export function checkQuestBoardInteraction(questBoard) {
    const distance = player.position.distanceTo(questBoard.position);
    const interactionText = questBoard.userData.interactionText;

    if (distance < 2) {
        // Vytvoříme vektor pro pozici textu nad nástěnkou
        const textPosition = questBoard.position.clone().add(new THREE.Vector3(0, 2, 0));

        // Projektujeme pozici textu do prostoru kamery
        const vector = textPosition.project(camera);

        // Zkontrolujeme, zda je nástěnka v záběru kamery
        const isInView = vector.x > -1 && vector.x < 1 && vector.z < 1;

        if (isInView) {
            interactionText.style.display = "block";
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

            interactionText.style.left = `${x}px`;
            interactionText.style.top = `${y}px`;

            if (keys.f) {
                toggleQuestBoardUI();
                keys.f = false; // Resetujeme stav klávesy
            }
        } else {
            interactionText.style.display = "none";
        }
    } else {
        interactionText.style.display = "none";
    }

    // Aktualizace indikátoru questů
    updateQuestIndicator(questBoard);
}


export function updateQuestBoardInteraction(deltaTime) {
    const questBoard = scene.getObjectByName("questBoard");
    if (!questBoard) return;

    const distance = player.position.distanceTo(questBoard.position);
    const interactionText = questBoard.userData.interactionText;
    const questBoardWindow = document.getElementById('questBoardWindow');

    if (distance < 2) {
        // Vytvoříme vektor pro pozici textu nad nástěnkou
        const textPosition = questBoard.position.clone().add(new THREE.Vector3(0, 2, 0));

        // Projektujeme pozici textu do prostoru kamery
        const vector = textPosition.project(camera);

        // Zkontrolujeme, zda je nástěnka v záběru kamery
        const isInView = vector.x > -1 && vector.x < 1 && vector.z < 1;

        if (isInView) {
            interactionText.style.display = "block";
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

            interactionText.style.left = `${x}px`;
            interactionText.style.top = `${y}px`;
            interactionText.style.bottom = "unset";
            interactionText.style.minWidth = "150px";

            if (keys.f) {
                toggleQuestBoardUI();
                keys.f = false; // Resetujeme stav klávesy
            }
        } else {
            interactionText.style.display = "none";
        }
    } else {
        interactionText.style.display = "none";
        // Zavřeme quest board, pokud je otevřený a hráč se vzdálil
        if (questBoardWindow && questBoardWindow?.style.display !== "none") {
            toggleQuestBoardUI();
        }
    }

    updateQuestIndicator(questBoard);
}

export function animateQuestIndicator(deltaTime) {
    const questBoard = scene.getObjectByName("questBoard");
    if (!questBoard || !questBoard.userData.questIndicator) return;

    const indicator = questBoard.userData.questIndicator;
    const time = performance.now() * 0.001;

    // Animace pohupování
    indicator.position.y = 2.5 + Math.sin(time * 2) * 0.1;

    // Animace rotace
    indicator.rotation.y += 0.01 * deltaTime;

    // Aktualizace efektu záře
    const glowSphere = indicator.children[2];
    const scale = 1 + 0.1 * Math.sin(time * 5);
    glowSphere.scale.set(scale, scale, scale);

    updateQuestIndicator(questBoard);
}


export function updateSeedBurst(deltaTime) {
    for (let i = seedBurstParticleSystems.length - 1; i >= 0; i--) {
        const particleSystem = seedBurstParticleSystems[i];
        const elapsedTime = Date.now() - particleSystem.startTime;

        if (elapsedTime < particleSystem.duration) {
            const positions = particleSystem.geometry.attributes.position.array;
            const velocities = particleSystem.geometry.attributes.velocity.array;

            for (let j = 0; j < positions.length; j += 3) {
                positions[j] += velocities[j] * deltaTime * 60;
                positions[j + 1] += velocities[j + 1] * deltaTime * 60;
                positions[j + 2] += velocities[j + 2] * deltaTime * 60;

                // Postupné zpomalování částic
                velocities[j] *= 0.98;
                velocities[j + 1] *= 0.98;
                velocities[j + 2] *= 0.98;
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
        } else {
            scene.remove(particleSystem);
            seedBurstParticleSystems.splice(i, 1);
        }
    }
}

export function updateVineGrab(deltaTime) {
    for (let i = activeVines.length - 1; i >= 0; i--) {
        const vine = activeVines[i];
        const elapsedTime = Date.now() - vine.startTime;
        const progress = Math.min(elapsedTime / vine.duration, 1);

        // Aktualizace pozice hráče
        player.position.lerpVectors(vine.startPosition, vine.endPosition, progress);

        if (progress >= 1) {
            scene.remove(vine.mesh);
            activeVines.splice(i, 1);
        }
    }
}

export function updateObsidianBlast(deltaTime) {
    obsidianBlastParticleSystems = obsidianBlastParticleSystems.filter((system) => {
        const elapsedTime = Date.now() - system.startTime;
        if (elapsedTime < system.duration) {
            const positions = system.geometry.attributes.position.array;
            const velocities = system.geometry.attributes.velocity.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
            }
            system.geometry.attributes.position.needsUpdate = true;
            return true;
        } else {
            scene.remove(system);
            return false;
        }
    });

}

export function updateVoidRifts(deltaTime) {
    if (!voidRifts || voidRifts.length === 0) return;

    const currentTime = Date.now();
    voidRifts = voidRifts.filter(({ rift, moveDirection, startTime, duration, roomCenter, roomSize, pullForce, radius, damagePerSecond }) => {
        // Kontrola, zda je rift stále ve scéně
        if (!scene.getObjectById(rift.id)) {
            return false;
        }

        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const scale = 2 + Math.sin(elapsedTime / 200) * 0.5;
            rift.scale.set(scale, scale, scale);
            rift.material.uniforms.time.value = elapsedTime / 1000;

            // Pohyb riftu s omezením na místnost
            const newPosition = rift.position.clone().add(moveDirection.clone().multiplyScalar(deltaTime * 60));
            const distanceFromCenter = newPosition.distanceTo(roomCenter);
            if (distanceFromCenter <= roomSize / 2) {
                rift.position.copy(newPosition);
            } else {
                // Pokud by se rift dostal mimo místnost, odrazíme ho
                moveDirection.negate();
            }

            const playerToRift = new THREE.Vector3().subVectors(rift.position, player.position);
            const distance = playerToRift.length();
            if (distance < radius) {
                const pullStrength = (1 - distance / radius) * pullForce;
                player.position.add(playerToRift.normalize().multiplyScalar(pullStrength * deltaTime));
                const damageThisFrame = damagePerSecond * deltaTime;
                playerTakeDamage(damageThisFrame);
            }
            return true;
        } else {
            scene.remove(rift);
            return false;
        }
    });
}


export function initiateTeleportMove(startPosition, destination) {
  activeTeleport = {
    startPosition,
    destination,
    totalDistance: startPosition.distanceTo(destination),
    distanceTraveled: 0,
    teleportSpeed: 40
  };
}

export function updateTeleportMove(deltaTime) {
    if (!activeTeleport) return;

    const step = Math.min(activeTeleport.teleportSpeed * deltaTime, activeTeleport.totalDistance - activeTeleport.distanceTraveled);
    const t = (activeTeleport.distanceTraveled + step) / activeTeleport.totalDistance;

    // Přímý výpočet pozice
    player.position.lerpVectors(activeTeleport.startPosition, activeTeleport.destination, t);

    // Kontrola kolizí
    const { collision } = checkCollisions(player.position);

    if (collision) {
        createTeleportEffect(player.position);
        activeTeleport = null;
        return;
    }

    activeTeleport.distanceTraveled += step;

    if (activeTeleport.distanceTraveled >= activeTeleport.totalDistance) {
        createTeleportEffect(player.position);
        activeTeleport = null;
    }
}

export function updateTeleportEffects(deltaTime) {
    const currentTime = Date.now();
    teleportEffects = teleportEffects.filter(effect => {
      const elapsedTime = currentTime - effect.startTime;
      if (elapsedTime < effect.duration) {
        const positions = effect.particles.geometry.attributes.position.array;
        const velocities = effect.velocities;
  
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i] * deltaTime * 60;
          positions[i + 1] += velocities[i + 1] * deltaTime * 60;
          positions[i + 2] += velocities[i + 2] * deltaTime * 60;
        }
  
        effect.particles.geometry.attributes.position.needsUpdate = true;
        effect.particles.material.opacity = 1 - (elapsedTime / effect.duration);
        return true;
      } else {
        scene.remove(effect.particles);
        return false;
      }
    });
  }

  export function updateTimeDilationEffects(deltaTime) {
    const currentTime = Date.now();
    for (let i = timeDilationEffects.length - 1; i >= 0; i--) {
      const effect = timeDilationEffects[i];
      const elapsedTime = currentTime - effect.startTime;
      
      if (elapsedTime < effect.duration) {
        // Zpomalení hráče
        window.playerSpeed = 4;
        showTimeDilationEffect();
        
        // Aktualizace vizuálního efektu
        if (effect.mesh) {
          effect.mesh.material.uniforms.time.value = elapsedTime / 1000;
          effect.mesh.scale.setScalar(1 + Math.sin(elapsedTime / 200) * 0.1);
        }
      } else {
        window.playerSpeed = playerDefaultSpeed; // Obnovení normální rychlosti
        if (effect.mesh) {
          scene.remove(effect.mesh);
        }
        timeDilationEffects.splice(i, 1);
      }
    }
  }

  export function updateEntanglementBeams(deltaTime) {
    const currentTime = Date.now();
    for (let i = entanglementBeams.length - 1; i >= 0; i--) {
      const beam = entanglementBeams[i];
      const elapsedTime = currentTime - beam.startTime;
      
      if (elapsedTime < beam.duration) {
        // Výpočet směru k hráči
        const directionToPlayer = new THREE.Vector3().subVectors(player.position, beam.mesh.position).normalize();
        
        // Omezení dosahu paprsku
        const targetPosition = new THREE.Vector3().addVectors(
          beam.mesh.position,
          directionToPlayer.multiplyScalar(Math.min(beam.maxRange, player.position.distanceTo(beam.mesh.position)))
        );
        
        // Pomalejší sledování hráče
        beam.mesh.position.lerp(targetPosition, 0.05);
        beam.mesh.lookAt(targetPosition);
        
        // Aplikace poškození
        const distance = player.position.distanceTo(beam.mesh.position);
        if (distance < 1) {
          playerTakeDamage(beam.damage * deltaTime);
        }
      } else {
        scene.remove(beam.mesh);
        entanglementBeams.splice(i, 1);
      }
    }
  }

  export function updateDeathParticles(deltaTime, currentTime) {
    for (let i = deathParticles.length - 1; i >= 0; i--) {
        const particleSystem = deathParticles[i];
        const positions = particleSystem.particles.geometry.attributes.position.array;

        for (let j = 0; j < positions.length; j += 3) {
            positions[j] += (Math.random() - 0.5) * 0.1;
            positions[j + 1] += 0.1;
            positions[j + 2] += (Math.random() - 0.5) * 0.1;
        }

        particleSystem.particles.geometry.attributes.position.needsUpdate = true;
        particleSystem.particles.material.opacity -= 0.02;

        if (particleSystem.particles.material.opacity <= 0 || currentTime - particleSystem.creationTime > 2000) {
            scene.remove(particleSystem.particles);
            deathParticles.splice(i, 1);
        }
    }
}