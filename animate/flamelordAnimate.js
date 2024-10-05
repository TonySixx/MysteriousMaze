import { player } from "../player";
import { playerTakeDamage } from "../utils";
import * as THREE from "three";

export function updateMeteors(deltaTime) {
    for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];
        const isActive = meteor.update(deltaTime);
        
        if (!isActive) {
            meteors.splice(i, 1);
        } else {
            // Kontrola kolize s hráčem
            const playerSphere = new THREE.Sphere(player.position.clone(), 0.5);
            playerSphere.center.y = 1;

            if (playerSphere.intersectsSphere(new THREE.Sphere(meteor.group.position, 1))) {
                playerTakeDamage(meteor.damage);
                scene.remove(meteor.group);
                meteors.splice(i, 1);
            }
        }
    }
}

export function updateMeteorExplosions(deltaTime) {
    for (let i = meteorExplosions.length - 1; i >= 0; i--) {
        const explosion = meteorExplosions[i];
        explosion.tween.update();
        
        const elapsedTime = (Date.now() - explosion.mesh.startTime) / 1000;
        explosion.mesh.material.uniforms.time.value = elapsedTime;
        
        if (elapsedTime > 500) { 
            scene.remove(explosion.mesh);
            meteorExplosions.splice(i, 1);
        }
    }
}

export function updateInfernoWaves(deltaTime) {
    for (let i = infernoWaves.length - 1; i >= 0; i--) {
        const wave = infernoWaves[i];
        const elapsedTime = (Date.now() - wave.startTime) / 1000;
        const progress = elapsedTime / (wave.duration / 1000);

        if (progress < 1) {
            wave.mesh.material.uniforms.time.value = elapsedTime;

            const playerXZ = new THREE.Vector2(player.position.x, player.position.z);
            const waveCenterXZ = new THREE.Vector2(wave.mesh.position.x, wave.mesh.position.z);
            const relativePosition = playerXZ.clone().sub(waveCenterXZ);

            const uvX = (relativePosition.x / (wave.maxWaveRadius)) * 0.5 + 0.5;

            const stripes = Math.sin((uvX * 10.0) + elapsedTime * 5.0);
            const stripeThreshold = 0.1;

            if (Math.abs(stripes) > (1.0 - stripeThreshold)) {
                playerTakeDamage(wave.damagePerSecond * deltaTime);
            }
        } else {
            scene.remove(wave.mesh);
            infernoWaves.splice(i, 1);
        }
    }
}

export function updatePhoenixRebirthEffects(deltaTime) {
    for (let i = phoenixRebirthEffects.length - 1; i >= 0; i--) {
        const effect = phoenixRebirthEffects[i];
        const elapsedTime = Date.now() - effect.startTime;
        
        if (elapsedTime < effect.duration) {
            const progress = elapsedTime / effect.duration;
            effect.mesh.material.uniforms.time.value = progress;
            effect.mesh.scale.setScalar(1 + progress);

            // Aplikujeme poškození hráči, pokud je v dosahu
            const distanceToPlayer = player.position.distanceTo(effect.boss.position);
            if (distanceToPlayer <= effect.damageRadius) {
                const damageFactor = 1 - (distanceToPlayer / effect.damageRadius);
                const damage = effect.damageAmount * damageFactor * (deltaTime / (effect.duration / 1000));
                playerTakeDamage(damage);
            }
        } else {
            scene.remove(effect.mesh);
            phoenixRebirthEffects.splice(i, 1);
        }
    }
}