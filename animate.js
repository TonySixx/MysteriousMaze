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