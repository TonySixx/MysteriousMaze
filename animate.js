import { bosses } from "./boss";
import { checkMerchantInteraction, updateQuestIndicator } from "./camp";
import { addItemToInventory, checkSpaceInInventory, createItem, getRarityColor } from "./inventory";
import { getItemName } from "./itemDatabase";
import { getTranslation } from "./langUtils";
import { chestSoundBuffer, generateNewMaze, itemSoundBuffer, keys, playSound, setSelectedFloor, showFloorSelectBtn, teleportSoundBuffer } from "./main";
import { player } from "./player";
import { getAvailableQuests, getCompletedQuests, toggleQuestBoardUI } from "./quests";
import { inspectionDuration, inspectionStartTime, isInspectingStaff, isSwingingStaff, originalStaffRotation, setIsInspectingStaff, setIsSwingingStaff } from "./spells";
import { showMessage } from "./utils";
import * as THREE from "three";

export function animateMerchants() {
    merchants.forEach((merchant) => {
        // Aktualizace animace obchodníka
        const delta = merchant.userData.clock.getDelta();
        merchant.userData.mixer.update(delta);

        const time = Date.now() * 0.001;

        // Animace ikonky nad obchodníkem
        if (merchant.userData.armorIcon) {
            const armorIcon = merchant.userData.armorIcon;
            armorIcon.position.y = 2.5 + Math.sin(time * 2) * 0.1;
            armorIcon.rotation.y = time * 0.5;
        }

        // Animace "pohupování" a rotace potionBottle
        const potionBottle = merchant.userData.potionBottle;
        if (potionBottle) {
            potionBottle.position.y = 2.5 + Math.sin(time * 2) * 0.1;
        }

        // Kontrola vzdálenosti hráče pro interakci
        checkMerchantInteraction(merchant);
    });
}


export function updateDamageTexts(currentTime) {
    damageTexts = damageTexts.filter((damageText) => {
        const elapsed = currentTime - damageText.startTime;
        if (elapsed < damageText.duration) {
            const bossScreenPosition = damageText.boss.getScreenPosition();
            damageText.element.style.left = `${bossScreenPosition.x}px`;
            damageText.element.style.top = `${bossScreenPosition.y - 50 - (elapsed / damageText.duration) * 50}px`;
            damageText.element.style.opacity = 1 - (elapsed / damageText.duration);
            return true;
        } else {
            document.body.removeChild(damageText.element);
            return false;
        }
    });
}

export function updateExpTexts(currentTime) {
    expTexts = expTexts.filter((expText) => {
        const elapsed = currentTime - expText.startTime;
        if (elapsed < expText.duration) {
            const bossScreenPosition = expText.boss.getScreenPosition();
            expText.element.style.left = `${bossScreenPosition.x}px`;
            expText.element.style.top = `${bossScreenPosition.y - 100 - (elapsed / expText.duration) * 100}px`;
            expText.element.style.opacity = 1 - (elapsed / expText.duration);
            return true;
        } else {
            document.body.removeChild(expText.element);
            return false;
        }
    });
}

export function updateGoldTexts(currentTime) {
    goldTexts = goldTexts.filter((goldText) => {
        const elapsed = currentTime - goldText.startTime;
        if (elapsed < goldText.duration) {
            const bossScreenPosition = goldText.boss.getScreenPosition();
            goldText.element.style.left = `${bossScreenPosition.x}px`;
            goldText.element.style.top = `${bossScreenPosition.y - 130 - (elapsed / goldText.duration) * 100}px`;
            goldText.element.style.opacity = 1 - (elapsed / goldText.duration);
            return true;
        } else {
            document.body.removeChild(goldText.element);
            return false;
        }
    });
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
    for (let i = teleportParticleSystems.length - 1; i >= 0; i--) {
        const particleSystem = teleportParticleSystems[i];

        particleSystem.rotation.x += 0.01 * deltaTime;
        particleSystem.rotation.y += 0.01 * deltaTime;

        const scale = 1 + 0.1 * Math.sin(currentTime * 0.005);
        particleSystem.scale.set(scale, scale, scale);

        // Zde můžete přidat logiku pro odstranění částic po určitém čase
        if (currentTime - particleSystem.creationTime > 2000) { // například po 2 sekundách
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
          positions[j] += velocities[j] * deltaTime*60;
          positions[j + 1] += velocities[j + 1] * deltaTime*60;
          positions[j + 2] += velocities[j + 2] * deltaTime*60;
  
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