import * as THREE from 'three';
import { player } from "../player";
import { playerTakeDamage } from "../utils";
import { CELL_SIZE } from "../main";

export function updateLightningStrikes(deltaTime) {
    for (let i = lightningStrikes.length - 1; i >= 0; i--) {
        const strike = lightningStrikes[i];
        const elapsedTime = Date.now() - strike.startTime;

        if (elapsedTime < strike.duration) {
            const progress = elapsedTime / strike.duration;
            strike.mesh.material.opacity = 1 - progress;

            if (!strike.hasDamagedPlayer && player.position.distanceTo(strike.position) <= strike.radius) {
                playerTakeDamage(strike.damage);
                strike.hasDamagedPlayer = true;
            }
        } else {
            scene.remove(strike.mesh);
            lightningStrikes.splice(i, 1);
        }
    }
}

export function updateBallLightnings(deltaTime) {
    for (let i = ballLightnings.length - 1; i >= 0; i--) {
        const ball = ballLightnings[i];
        const elapsedTime = Date.now() - ball.startTime;

        if (elapsedTime < ball.duration) {
            // Pohyb kulového blesku
            ball.mesh.position.add(ball.direction.clone().multiplyScalar(ball.speed * deltaTime));

            // Odraz od stěn
            const halfRoomSize = 4 * CELL_SIZE;
            if (Math.abs(ball.mesh.position.x) > halfRoomSize || Math.abs(ball.mesh.position.z) > halfRoomSize) {
                ball.direction.reflect(new THREE.Vector3(
                    Math.abs(ball.mesh.position.x) > halfRoomSize ? 1 : 0,
                    0,
                    Math.abs(ball.mesh.position.z) > halfRoomSize ? 1 : 0
                ).normalize());
            }

            // Kontrola kolize s hráčem
            if (player.position.distanceTo(ball.mesh.position) <= ball.radius + 0.5) {
                playerTakeDamage(ball.damage * deltaTime);
            }

            // Pulzující efekt
            const scale = 1 + 0.1 * Math.sin(elapsedTime * 0.01);
            ball.mesh.scale.setScalar(scale);

            // Aktualizace materiálu pro pulzující efekt
            if (ball.mesh.material.opacity !== undefined) {
                ball.mesh.material.opacity = 0.8 + 0.2 * Math.sin(elapsedTime * 0.01);
            }
        } else {
            scene.remove(ball.mesh);
            ballLightnings.splice(i, 1);
        }
    }
}

export function updateElectromagneticPulse(deltaTime) {
    if (electromagneticPulse) {
        const elapsedTime = Date.now() - electromagneticPulse.startTime;

        if (elapsedTime < electromagneticPulse.duration) {
            const progress = elapsedTime / electromagneticPulse.duration;
            const scale = 1 + progress * 0.5;
            electromagneticPulse.mesh.scale.setScalar(scale);

            // Aktualizace shaderu
            electromagneticPulse.mesh.material.uniforms.time.value = elapsedTime / 1000;

            // Přitahování a poškození hráče
            const distanceToPlayer = player.position.distanceTo(electromagneticPulse.boss.position);
            if (distanceToPlayer <= electromagneticPulse.radius * scale) {
                const pullDirection = new THREE.Vector3().subVectors(electromagneticPulse.boss.position, player.position).normalize();
                const pullStrength = Math.min((1 - distanceToPlayer / (electromagneticPulse.radius * scale)) * electromagneticPulse.pullForce * deltaTime, distanceToPlayer - 1);
                player.position.add(pullDirection.multiplyScalar(pullStrength));

                playerTakeDamage(electromagneticPulse.damagePerSecond * deltaTime);
            }
        } else {
            scene.remove(electromagneticPulse.mesh);
            electromagneticPulse = null;
        }
    }
}
