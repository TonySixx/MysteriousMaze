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