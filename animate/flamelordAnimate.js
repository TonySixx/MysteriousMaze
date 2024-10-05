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
        const elapsedTime = Date.now() - wave.startTime;
        const progress = elapsedTime / wave.duration;
        
        if (progress < 1) {
            const currentRadius = wave.maxRadius * progress;
            wave.mesh.material.uniforms.time.value = elapsedTime / 1000;
            wave.mesh.material.uniforms.waveRadius.value = currentRadius;
            
            // Kontrola kolize s hráčem
            const distanceToPlayer = player.position.distanceTo(wave.boss.position);
            if (distanceToPlayer <= currentRadius + 2 && distanceToPlayer >= currentRadius - 2) {
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
            effect.mesh.material.uniforms.time.value = elapsedTime / 1000;
            effect.mesh.scale.setScalar(1 + (elapsedTime / effect.duration) * 2);
        } else {
            scene.remove(effect.mesh);
            phoenixRebirthEffects.splice(i, 1);
        }
    }
}