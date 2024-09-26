import { checkMerchantInteraction } from "./camp";
import { addItemToInventory, checkSpaceInInventory, createItem, getRarityColor } from "./inventory";
import { getItemName } from "./itemDatabase";
import { getTranslation } from "./langUtils";
import { chestSoundBuffer, generateNewMaze, itemSoundBuffer, keys, playSound, setSelectedFloor, showFloorSelectBtn, teleportSoundBuffer } from "./main";
import { MAIN_BOSS_TYPES } from "./mainBoss";
import { player } from "./player";
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
    MAIN_BOSS_TYPES[0].dropItems.forEach(drop => {
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