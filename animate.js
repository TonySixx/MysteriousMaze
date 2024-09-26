import { checkMerchantInteraction } from "./camp";

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