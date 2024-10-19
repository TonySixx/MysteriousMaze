import { bosses, setBossCounter, setBosses } from "./boss";
import { clearCoastScene } from "./Coast";
import { playerDefaultSpeed } from "./globals";
import { clearSeaScene } from "./Sea";
import { originalStaffRotation, resetSpells, setIsInspectingStaff, setIsSwingingStaff } from "./spells";
import { clearSpikeTraps, destroyAllSideAnimations, disposeObject } from "./utils";

export function clearScene() {
    cleanupAudio();
    clearSpikeTraps();
    clearCoastScene();
    clearSeaScene();

    // Odstraníme a uvolníme všechny objekty ze scény
    while (scene.children.length > 0) {
      const child = scene.children[0];
      disposeObject(child);
      scene.remove(child);
    }
  
    destroyAllSideAnimations();
  
    window.minimapUsed = false;
  
    // Uvolníme a resetujeme globální proměnné
    walls.forEach((wall) => disposeObject(wall));
    walls = [];
  
    merchants.forEach((merchant) => disposeObject(merchant));
    merchants = [];
  
    highWallAreas.forEach((area) => disposeObject(area));
    highWallAreas = [];
  
    torches.forEach((torch) => disposeObject(torch));
    torches = [];
  
    floatingObjects.forEach((obj) => {
      disposeObject(obj);
      scene.remove(obj);
    });
    floatingObjects = [];
  
    // Zrušíme časovač pro spawn bosse a interval odpočtu
    if (window.bossSpawnTimeout) {
      clearTimeout(window.bossSpawnTimeout);
      window.bossSpawnTimeout = null;
    }
    if (window.bossCountdownInterval) {
      clearInterval(window.bossCountdownInterval);
      window.bossCountdownInterval = null;
    }
    const countdownElement = document.getElementById("boss-countdown");
    if (countdownElement) {
      countdownElement.remove();
    }
  
    // Odstraníme mlhovinu a mlhu
    if (nebula) {
      disposeObject(nebula);
      scene.remove(nebula);
      nebula = null;
    }
    scene.fog = null;
  
    // Resetujeme lightManager
    lightManager = null;
  
    // Resetujeme bossy a jejich efekty
    bosses.forEach(boss => {
      if (boss.abilities) {
        boss.abilities.forEach(ability => {
          if (ability.cancelAbility) {
            ability.cancelAbility();
          }
        });
      }
    });
  
      // Odstranění Frostlordových efektů
      glacialNovaEffects.forEach(effect => {
        scene.remove(effect.mesh);
        scene.remove(effect.particles);
      });
      glacialNovaEffects = [];
    
      icicleBullets.forEach(icicle => {
        scene.remove(icicle.mesh);
      });
      icicleBullets = [];
    
      iceTrails.forEach(trail => {
        scene.remove(trail.mesh);
      });
      iceTrails = [];
  
      // Čištění Frostlordových efektů
      if (window.icicleBullets) {
        window.icicleBullets.forEach(icicle => {
          if (icicle && icicle.mesh) {
            scene.remove(icicle.mesh);
            icicle.mesh.geometry.dispose();
            icicle.mesh.material.dispose();
          }
        });
        window.icicleBullets = [];
      }
  
    // Resetujeme bossy a jejich efekty
    setBosses([]);
    setBossCounter(0);
  
     // Čištění efektů Chronose a dalších bossů
     clearBossEffects();
  
    // Resetujeme kouzla
    resetSpells();
  
    // Čištění efektů Chronose a dalších bossů
    clearBossEffects();
  
    // Čištění dalších efektů
    clearOtherEffects();
  
    // Resetování rychlosti hráče na výchozí hodnotu
    window.playerSpeed = playerDefaultSpeed;
  
    // Odstranění vizuálních efektů z obrazovky
    removeVisualEffects();
  
    // Vyčistíme kontejner pro zdraví bosse
    clearBossHealthContainer();
  
    // Odstraníme elementy interakce s obchodníky
    removeInteractionElements();
  
    // Zavřeme všechny otevřené obchody
    closeAllShops();
  
    // Resetujeme instance obchodníků
    resetMerchantInstances();
  
    // Zastavíme všechny animace
    stopAllAnimations();
  
    // Odstraníme všechny event listenery přidané v táboře
    removeCampEventListeners();
  }

  function cleanupAudio() {
    if (currentBackgroundMusic) {
      currentBackgroundMusic.stop();
      currentBackgroundMusic.disconnect();
      currentBackgroundMusic.buffer = null;
      currentBackgroundMusic = null;
    }
  }
  
  function clearBossEffects() {
    [timeWarpEffects, temporalEchoes, chronoNovaEffects, poisonClouds, acidSprays].forEach(effectArray => {
      effectArray.forEach(effect => {
        if (effect.mesh) {
          scene.remove(effect.mesh);
          effect.mesh.geometry.dispose();
          effect.mesh.material.dispose();
        }
        if (effect.group) {
          scene.remove(effect.group);
          effect.group.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
          });
        }
      });
      effectArray.length = 0;
    });
  }
  
  function clearOtherEffects() {
    [
      teleportParticles, explosions, frostAuras, chainLightningsVisual,
      iceExplosions, chainExplosions, fireballExplosions, activeVines,
      seedBurstParticleSystems, voidRifts, timeDilationEffects, entanglementBeams,
      poisonParticles, acidExplosions
    ].forEach(effectArray => {
      effectArray.forEach(effect => {
        if (effect.mesh) {
          scene.remove(effect.mesh);
          if (effect.mesh.geometry) effect.mesh.geometry.dispose();
          if (effect.mesh.material) effect.mesh.material.dispose();
        }
      });
      effectArray.length = 0;
    });
  
    // Resetování specifických efektů
    bossChestAndPortalData = null;
    mainBossEntryData = null;
    chestMixer = null;
    staffSwing = null;
    setIsSwingingStaff(false);
    setIsInspectingStaff(false);
    if (staffModel) staffModel.rotation.copy(originalStaffRotation);
  }
  
  function removeVisualEffects() {
    const timeDilationOverlay = document.getElementById('timeDilationOverlay');
    if (timeDilationOverlay) {
      timeDilationOverlay.remove();
    }
  }
  
  function clearBossHealthContainer() {
    const bossHealthContainer = document.getElementById("bossHealthContainer");
    while (bossHealthContainer.firstChild) {
      bossHealthContainer.removeChild(bossHealthContainer.firstChild);
    }
  }
  
  function removeInteractionElements() {
    const interactionTexts = document.querySelectorAll(".interaction-text");
    interactionTexts.forEach((text) => text.remove());
  }
  
  function closeAllShops() {
    const shopModals = document.querySelectorAll('[id^="merchantModal"]');
    shopModals.forEach((modal) => modal.remove());
  }
  
  function resetMerchantInstances() {
    if (typeof potionMerchant !== "undefined") potionMerchant = null;
    if (typeof armorMerchantInstance !== "undefined") armorMerchantInstance = null;
  }
  
  function stopAllAnimations() {
    if (typeof updateMerchantAnimation !== "undefined")
      cancelAnimationFrame(updateMerchantAnimation);
    if (typeof updateArmorMerchantAnimation !== "undefined")
      cancelAnimationFrame(updateArmorMerchantAnimation);
  }
  
  function removeCampEventListeners() {
    const campElements = document.querySelectorAll(".camp-element");
    campElements.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
  }