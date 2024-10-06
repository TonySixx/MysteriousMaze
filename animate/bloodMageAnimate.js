import * as THREE from 'three';
import { player } from "../player";
import { createExplosion, playerTakeDamage } from "../utils";
import { CELL_SIZE } from '../main';

export function updateBloodVortexes(deltaTime) {
    for (let i = bloodVortexes.length - 1; i >= 0; i--) {
        const vortex = bloodVortexes[i];
        const elapsedTime = Date.now() - vortex.startTime;

        if (elapsedTime < vortex.duration) {
            vortex.mesh.material.uniforms.time.value = elapsedTime / 1000;

            // Aplikace poškození a přitažlivé síly na hráče
            const distanceToPlayer = player.position.distanceTo(vortex.mesh.position);
            if (distanceToPlayer <= vortex.radius) {
                playerTakeDamage(vortex.damagePerSecond * deltaTime);

                const pullDirection = new THREE.Vector3().subVectors(vortex.mesh.position, player.position).normalize();
                const pullStrength = (1 - distanceToPlayer / vortex.radius) * vortex.pullForce * deltaTime;
                player.position.add(pullDirection.multiplyScalar(pullStrength));
            }

            // Rotace vortexu
            vortex.mesh.rotation.y += deltaTime * 2;
        } else {
            scene.remove(vortex.mesh);
            bloodVortexes.splice(i, 1);
        }
    }
}

export function updateBloodRitual(deltaTime) {
    if (bloodRitualEffect) {
        const elapsedTime = Date.now() - bloodRitualEffect.startTime;

        if (elapsedTime < bloodRitualEffect.duration) {
            bloodRitualEffect.mesh.material.uniforms.time.value = elapsedTime / 1000;

            // Pohyb rituálu
            const movement = bloodRitualEffect.direction.clone().multiplyScalar(bloodRitualEffect.moveSpeed * deltaTime);
            bloodRitualEffect.position.add(movement);

            // Odraz od stěn místnosti
            const roomSize = 10 * CELL_SIZE;
            const halfRoomSize = roomSize / 2;
            if (Math.abs(bloodRitualEffect.position.x) > halfRoomSize - bloodRitualEffect.radius ||
                Math.abs(bloodRitualEffect.position.z) > halfRoomSize - bloodRitualEffect.radius) {
                bloodRitualEffect.direction.reflect(new THREE.Vector3(
                    Math.abs(bloodRitualEffect.position.x) > halfRoomSize - bloodRitualEffect.radius ? 1 : 0,
                    0,
                    Math.abs(bloodRitualEffect.position.z) > halfRoomSize - bloodRitualEffect.radius ? 1 : 0
                ).normalize());
            }

            bloodRitualEffect.mesh.position.copy(bloodRitualEffect.position);

            // Aplikace poškození na hráče a léčení bosse
            const distanceToPlayer = player.position.distanceTo(bloodRitualEffect.position);
            if (distanceToPlayer <= bloodRitualEffect.radius) {
                playerTakeDamage(bloodRitualEffect.damagePerSecond * deltaTime);
                bloodRitualEffect.mesh.userData.boss.health = Math.min(
                    bloodRitualEffect.mesh.userData.boss.health + bloodRitualEffect.healPerSecond * deltaTime,
                    bloodRitualEffect.mesh.userData.boss.maxHealth
                );
                bloodRitualEffect.mesh.userData.boss.updateHealthBar();
            }

            // Pulzující efekt
            const scale = 1 + Math.sin(elapsedTime / 500) * 0.1;
            bloodRitualEffect.mesh.scale.setScalar(scale);
        } else {
            scene.remove(bloodRitualEffect.mesh);
            bloodRitualEffect = null;
        }
    }
}

export function updateBloodLances(deltaTime) {
    for (let i = bloodLances.length - 1; i >= 0; i--) {
        const lance = bloodLances[i];
        lance.mesh.position.add(lance.velocity.clone().multiplyScalar(deltaTime * 60));

        lance.mesh.material.uniforms.time.value += deltaTime;

        // Kontrola kolize se zdmi
        for (let j = 0; j < walls.length; j++) {
            const wall = walls[j];
            if (lance.mesh.position.distanceTo(wall.position) < CELL_SIZE / 2) {
                createExplosion(lance.mesh.position, 0xe61919);
                scene.remove(lance.mesh);
                bloodLances.splice(i, 1);
                return;
            }
        }

        // Kontrola kolize s hráčem
        const playerSphere = new THREE.Sphere(player.position.clone(), 0.5);
        playerSphere.center.y = 1;

        if (playerSphere.intersectsSphere(new THREE.Sphere(lance.mesh.position, 0.3))) {
            playerTakeDamage(lance.damage);
            createExplosion(lance.mesh.position, 0xe61919);
            scene.remove(lance.mesh);
            bloodLances.splice(i, 1);
            continue;
        }

        // Časový limit
        const elapsedTime = Date.now() - lance.startTime;
        if (elapsedTime > lance.duration) {
            scene.remove(lance.mesh);
            bloodLances.splice(i, 1);
        }
    }
}