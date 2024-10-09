import { playerDefaultSpeed } from '../globals';

export function updateDarkMistEffect(deltaTime) {
    if (darkMistEffect) {
        const elapsedTime = Date.now() - darkMistEffect.startTime;
        
        if (elapsedTime < darkMistEffect.duration) {
            darkMistEffect.update(deltaTime);
            
            // Zpomalení hráče
            const fadeOutProgress = Math.max(0, Math.min(1, (elapsedTime - (darkMistEffect.duration - darkMistEffect.fadeOutDuration)) / darkMistEffect.fadeOutDuration));
            window.playerSpeed = playerDefaultSpeed * (1 - (1 - darkMistEffect.slowFactor) * (1 - fadeOutProgress));
            
            // Omezení viditelnosti
            scene.fog.density = 0.5 * (1 - fadeOutProgress);
        } else {
            scene.remove(darkMistEffect.particles);
            darkMistEffect = null;
            window.playerSpeed = playerDefaultSpeed;
            scene.fog.density = 0.03;
        }
    }
}

export function updateManaDrainEffect(deltaTime) {
    if (manaDrainEffect) {
        manaDrainEffect.update(deltaTime);
    }
}

