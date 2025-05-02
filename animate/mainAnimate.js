import { animateBossEntry, animateMerchants, animateQuestIndicator, animateStaffInspection, updateAcidExplosions, updateAcidSprays, updateBossChestAndPortal, updateChainExplosions, updateChainLightningsVisuals, updateChronoNovaEffects, updateDeathParticles, updateEntanglementBeams, updateExplosions, updateFireballExplosions, updateFloatingTexts, updateFrostAuras, updateIceExplosions, updateMainBossDragons, updateObsidianBlast, updatePoisonClouds, updatePoisonParticles, updateQuestBoardInteraction, updateSeedBurst, updateStaffSwing, updateTeleportEffects, updateTeleportMove, updateTeleportParticles, updateTeleportParticleSystems, updateTemporalEchoes, updateTimeDilationEffects, updateTimeWarpEffects, updateVineGrab, updateVoidRifts } from "../animate";
import { updatePotionCooldowns } from "../inventory";
import { animateFire, animateGoal, animateKeys, checkObjectInteractions, isMinimapVisible, resetStaffColor, rotateObjects, showFPS, updateBosses, updateFootstepsSound, updateFPS, updateStaffColor, updateVisibleObjects } from "../main";
import { player, regenerateHealth, regenerateMana, updatePlayerPosition } from "../player";
import { updateArcaneMissiles, updateChainLightnings, updateFireballs, updateFrostbolts, updateSkillbar } from "../spells";
import { drawMinimap, updateFreezeEffect, updateMagicBalls } from "../utils";
import { updateFrostAuraEffects, updateGlacialNovaEffects, updateIceTrails, updateIcicleBullets } from "./frostlordAnimate";
import { updateMeteors, updateMeteorExplosions, updateInfernoWaves, updatePhoenixRebirthEffects } from "./flamelordAnimate";
import { update as tweenUpdate } from '@tweenjs/tween.js';  // Přidáno
import { updateArcaneProjectiles, updateDimensionalRifts, updateArcaneShieldEffect } from "./arcaneLordAnimate";
import { updateProtectiveShield } from '../animate.js';
import { updateBloodVortexes, updateBloodRitual, updateBloodLances } from "./bloodMageAnimate";
import { updateLightningStrikes, updateBallLightnings, updateElectromagneticPulse } from "./thunderlordAnimate";
import { updateDarkMistEffect, updateManaDrainEffect } from "./darklordAnimate";
import { updateSpikeTraps } from '../utils.js';
import { isGamePaused, setIsGamePaused } from '../globals.js'; // Import isGamePaused

export let previousTime = performance.now(); // Definice, inicializace a export previousTime
let frameCountForAnimation = 0;

export function setPreviousTime(time) { // Funkce pro nastavení previousTime z main.js
  previousTime = time;
}

export function animate() {
  requestAnimationFrame(animate);

  if (isGamePaused) { // Kontrola pauzy
    return; // Přeskočit zbytek funkce, pokud je hra pauznutá
  }

  const currentTime = performance.now();
  const deltaTime = (currentTime - previousTime) / 1000; // Delta time v sekundách
  previousTime = currentTime;

  tweenUpdate();  // Přidáno

  updateFreezeEffect();
  updatePlayerPosition(deltaTime);
  animateKeys(deltaTime);
  animateGoal(deltaTime);
  rotateObjects(deltaTime);
  animateFire(deltaTime);
  updateFireballs(deltaTime);
  updateFrostbolts(deltaTime);
  updateArcaneMissiles(deltaTime);
  updateChainLightnings(deltaTime);
  updateBosses(deltaTime);
  updateMagicBalls(deltaTime);
  updateDeathParticles(deltaTime, currentTime);
  regenerateMana(deltaTime);
  regenerateHealth(deltaTime);
  //animateStaffRotation(deltaTime);
  updatePotionCooldowns(deltaTime);
  updateFloatingTexts(damageTexts, currentTime);
  updateFloatingTexts(expTexts, currentTime);
  updateFloatingTexts(goldTexts, currentTime);
  updateTeleportParticles(deltaTime, currentTime);
  updateTeleportParticleSystems(deltaTime, currentTime);
  updateMainBossDragons(deltaTime, currentTime);
  animateBossEntry(deltaTime);
  updateExplosions(deltaTime, currentTime);
  updateIceExplosions(deltaTime);
  updateFrostAuras(deltaTime);
  updateChainExplosions(deltaTime);
  updateChainLightningsVisuals(deltaTime);
  updateFireballExplosions(deltaTime);
  updateStaffSwing(deltaTime);
  animateStaffInspection(currentTime);
  updateProtectiveShield(deltaTime);


  updateTeleportMove(deltaTime);
  updateTeleportEffects(deltaTime);

  updateSeedBurst(deltaTime);
  updateVineGrab(deltaTime);
  updateObsidianBlast(deltaTime);
  updateVoidRifts(deltaTime);
  updateTimeDilationEffects(deltaTime);
  updateEntanglementBeams(deltaTime);
  updateTimeWarpEffects(deltaTime);
  updateTemporalEchoes(deltaTime);
  updateChronoNovaEffects(deltaTime);
  updatePoisonClouds(deltaTime);
  updateAcidSprays(deltaTime);
  updateAcidExplosions(deltaTime);
  updatePoisonParticles(deltaTime);
  updateGlacialNovaEffects(deltaTime);
  updateIcicleBullets(deltaTime);
  updateIceTrails(deltaTime);
  updateFrostAuraEffects(deltaTime);
  updateMeteors(deltaTime);
  updateMeteorExplosions(deltaTime);
  updateInfernoWaves(deltaTime);
  updatePhoenixRebirthEffects(deltaTime);
  updateArcaneProjectiles(deltaTime);
  updateDimensionalRifts(deltaTime);
  updateArcaneShieldEffect(deltaTime);
  updateBloodVortexes(deltaTime);
  updateBloodRitual(deltaTime);
  updateBloodLances(deltaTime);
  updateLightningStrikes(deltaTime);
  updateBallLightnings(deltaTime);
  updateElectromagneticPulse(deltaTime);
  updateDarkMistEffect(deltaTime);
  updateManaDrainEffect(deltaTime);

  animateMerchants(deltaTime);
  updateQuestBoardInteraction(deltaTime);
  animateQuestIndicator(deltaTime);

  updateSpikeTraps(deltaTime);


  if (bossChestAndPortalData) {
    updateBossChestAndPortal(deltaTime);
  }

  if (staffModel && staffModel.userData.enchantParticles) {
    staffModel.userData.enchantParticles.userData.update(deltaTime);
  }

  if (isMinimapVisible) {
    drawMinimap();
  }

  updateSkillbar();
  updateFootstepsSound();

  resetStaffColor();
  updateStaffColor(deltaTime);

  // Animace všech částicových efektů ve scéně
  scene.children.forEach((child) => {
    if (child.userData.animate) {
      child.userData.animate(deltaTime * 30);
    }
  });

  if (nebulaMaterial && nebulaMaterial.material) {
    nebulaMaterial.material.uniforms.time.value += deltaTime;
  }

  if (frameCountForAnimation % 2 === 0) {
    checkObjectInteractions();
    lightManager.update(player.position, camera); // Aktualizace světel každý druhý snímek
  }
  frameCountForAnimation = (frameCountForAnimation + 1) % 2;

  updateVisibleObjects();

  if (showFPS) {
    updateFPS();
  }

  camera.children[camera.children.length - 1].renderOrder = 999;
  if (camera.children[camera.children.length - 1].material?.depthTest) {
    camera.children[camera.children.length - 1].material.depthTest = false;
  }

  composer.render();

}