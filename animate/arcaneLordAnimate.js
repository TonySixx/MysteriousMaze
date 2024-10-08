import * as THREE from 'three';
import { player } from "../player";
import { playerTakeDamage, createExplosion } from "../utils";
import { CELL_SIZE } from "../main";

export function updateArcaneProjectiles(deltaTime) {
    for (let i = arcaneProjectiles.length - 1; i >= 0; i--) {
        const projectile = arcaneProjectiles[i];
        projectile.mesh.position.add(projectile.velocity.clone().multiplyScalar(deltaTime * 60));
        
        projectile.mesh.material.uniforms.time.value += deltaTime;

        // Kontrola kolize se zdmi
        for (let j = 0; j < walls.length; j++) {
            const wall = walls[j];
            if (projectile.mesh.position.distanceTo(wall.position) < CELL_SIZE / 2) {
                createExplosion(projectile.mesh.position, projectile.mesh.material.uniforms.color1.value);
                scene.remove(projectile.mesh);
                arcaneProjectiles.splice(i, 1);
                return;
            }
        }

        // Kontrola kolize s hráčem
        const playerSphere = new THREE.Sphere(player.position.clone(), 0.5);
        playerSphere.center.y = 1;

        if (playerSphere.intersectsSphere(new THREE.Sphere(projectile.mesh.position, 0.3))) {
            playerTakeDamage(projectile.damage);
            createExplosion(projectile.mesh.position, projectile.mesh.material.uniforms.color1.value);
            scene.remove(projectile.mesh);
            arcaneProjectiles.splice(i, 1);
            continue;
        }

        // Časový limit
        const elapsedTime = Date.now() - projectile.startTime;
        if (elapsedTime > projectile.duration) {
            scene.remove(projectile.mesh);
            arcaneProjectiles.splice(i, 1);
        }
    }
}

export function updateDimensionalRifts(deltaTime) {
    for (let i = dimensionalRifts.length - 1; i >= 0; i--) {
        const rift = dimensionalRifts[i];
        const elapsedTime = Date.now() - rift.startTime;
        
        if (elapsedTime < rift.duration) {
            rift.mesh.material.uniforms.time.value = elapsedTime / 1000;

            // Kontrola, zda je hráč v dosahu riftu
            if (player.position.distanceTo(rift.mesh.position) <= 3) {
                playerTakeDamage(rift.damagePerSecond * deltaTime);
            }

            // Vytvoření portálového efektu
            if (Math.random() < 0.1) {
                const particleGeometry = new THREE.BufferGeometry();
                const particleCount = 10;
                const positions = new Float32Array(particleCount * 3);

                for (let j = 0; j < particleCount; j++) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = 2 + Math.random() * 0.5;
                    positions[j * 3] = Math.cos(angle) * radius;
                    positions[j * 3 + 1] = (Math.random() - 0.5) * 0.5;
                    positions[j * 3 + 2] = Math.sin(angle) * radius;
                }

                particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                const particleMaterial = new THREE.PointsMaterial({
                    color: 0x8A2BE2,
                    size: 0.1,
                    transparent: true,
                    opacity: 0.7
                });

                const particles = new THREE.Points(particleGeometry, particleMaterial);
                particles.position.copy(rift.mesh.position);
                scene.add(particles);

                setTimeout(() => {
                    scene.remove(particles);
                }, 1000);
            }
        } else {
            scene.remove(rift.mesh);
            dimensionalRifts.splice(i, 1);
        }
    }
}

export function updateArcaneShieldEffect(deltaTime) {
    if (arcaneShieldEffect && arcaneShieldEffect.mesh && arcaneShieldEffect.mesh.material && arcaneShieldEffect.mesh.material.uniforms) {
        const elapsedTime = Date.now() - arcaneShieldEffect.startTime;
        
        if (elapsedTime < arcaneShieldEffect.duration) {
            arcaneShieldEffect.mesh.material.uniforms.time.value = elapsedTime / 1000;
        } else {
            if (arcaneShieldEffect.mesh.parent) {
                arcaneShieldEffect.mesh.parent.remove(arcaneShieldEffect.mesh);
            }
            arcaneShieldEffect = null;
        }
    }
}
