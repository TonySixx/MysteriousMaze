import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { player, setPlayerHealth, playerHealth, updatePlayerHealthBar, addExperience } from "./player.js"
import { scene, walls, CELL_SIZE, MAZE_SIZE, WALL_HEIGHT, magicBalls, setTotalKeys, totalKeys, bossSoundBuffer, keyModel, playerDeath, frostBoltHitSoundBuffer, camera } from './main.js';

export var bossCounter = 0; // Globální počítadlo pro ID bossů
export let bosses = [];

export function setBosses(value) {
    bosses = value;
}

export function setBossCounter(value) {
    bossCounter = value;
}


class Boss {
    constructor(position, id, rng) {
        this.id = id;
        this.maxHealth = this.generateHealth(rng);
        this.health = this.maxHealth;
        this.position = position;
        this.attackCooldown = rng() * 0.5 + 0.5; // Náhodný cooldown útoku v rozmezí 0.5 - 1 vteřina
        this.type = this.getBossType(rng);
        this.specialAttacks = this.getSpecialAttacks(rng);
        this.teleportCooldown = 2000; // 2 sekundy cooldown
        this.lastTeleportTime = 0;
        this.originalMaterial = null;
        this.frozenMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEFA, emissive: 0x4169E1 });


        // Definování dostupných barev střel
        const colors = [
            new THREE.Color(0x33adff), // Modrá
            new THREE.Color(0x66ff99), // Zelená
            new THREE.Color(0xffff66), // Žlutá
            new THREE.Color(0xff66ff)  // Růžová
        ];

        // Náhodně vybereme jednu barvu
        this.attackColor = colors[Math.floor(rng() * colors.length)];

        this.model = null;
        this.healthBar = null;
        this.healthBarContainer = null;
        this.mixer = null;
        this.idleAction = null;
        this.attackAction = null;
        this.clock = new THREE.Clock();
        this.lastAttackTime = 0;
        this.moveDirection = new THREE.Vector3();
        this.rng = rng; // Uložení rng pro pozdější použití
        this.loadModel();
        this.changeDirection();
        this.createHealthUI();
    }

    generateHealth(rng) {
        const minHealth = 1000;
        const maxHealth = 5000;
        const interval = 200;

        // Vypočítáme počet možných hodnot HP
        const possibleValues = Math.floor((maxHealth - minHealth) / interval) + 1;

        // Vygenerujeme náhodné číslo v rozsahu možných hodnot
        const randomIndex = Math.floor(rng() * possibleValues);

        // Vypočítáme výsledné HP
        let health = minHealth + (randomIndex * interval);

        // Zajistíme, že HP je v rozmezí 1000 - 5000
        return Math.max(minHealth, Math.min(maxHealth, health));
    }

    getBossType(rng) {
        const types = ['Dragon', 'Golem', 'Wizard', 'Shadow'];
        return types[Math.floor(rng() * types.length)];
    }

    getSpecialAttacks(rng) {
        const allAttacks = ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'];
        const maxAttacks = Math.min(3, Math.floor((this.maxHealth - 1000) / 1333) + 1);
        const attacks = [];

        while (attacks.length < maxAttacks) {
            const attack = allAttacks[Math.floor(rng() * allAttacks.length)];
            if (!attacks.includes(attack)) {
                attacks.push(attack);
            }
        }

        return attacks;
    }

    getSpecialAttackProbability(attackType) {
        switch (attackType) {
            case 'frostbolt':
                return 0.4; // 40% šance pro frostbolt
            case 'multiShot':
            case 'aoeBlast':
            case 'teleport':
                return 0.5; // 50% šance pro ostatní útoky
            default:
                return 0.5; // Výchozí hodnota pro případ, že by byl přidán nový typ útoku
        }
    }

    getBossColor(rng) {
        const colors = [
            new THREE.Color(0x33adff), // Modrá
            new THREE.Color(0x66ff99), // Zelená
            new THREE.Color(0xffff66), // Žlutá
            new THREE.Color(0xff66ff)  // Růžová
        ];
        return colors[Math.floor(rng() * colors.length)];
    }

    getSpecialAttackType(rng) {
        const attacks = ['multiShot', 'aoeBlast', 'teleport', 'frostbolt'];
        return attacks[Math.floor(rng() * attacks.length)];
    }

    getSpecialAttackProbability() {
        switch (this.specialAttackType) {
            case 'frostbolt':
                return 0.2;
            case 'multiShot':
                return 0.5;
            case 'aoeBlast':
                return 0.3;
            case 'teleport':
                return 0.5;
            default:
                return 0.5; // Výchozí hodnota pro případ, že by byl přidán nový typ útoku
        }
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('Dragon.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(0.5, 0.5, 0.5);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    this.originalMaterial = child.material;
                }
            });
            scene.add(this.model);

            this.animations = gltf.animations;
            this.mixer = new THREE.AnimationMixer(this.model);
            this.idleAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Flying_Idle'));
            this.attackAction = this.mixer.clipAction(this.animations.find(clip => clip.name === 'CharacterArmature|Punch'));
            this.idleAction.play();

            this.createHealthBar();
        });
    }

    createHealthBar() {
        const healthBarContainerGeometry = new THREE.PlaneGeometry(2, 0.2);
        const healthBarContainerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.healthBarContainer = new THREE.Mesh(healthBarContainerGeometry, healthBarContainerMaterial);
        this.healthBarContainer.position.set(0, 3, 0);
        this.model.add(this.healthBarContainer);

        const healthBarGeometry = new THREE.PlaneGeometry(2, 0.2);
        const healthBarMaterial = new THREE.MeshBasicMaterial({ color: this.attackColor });
        this.healthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
        this.healthBar.position.set(-1, 0, 0.01); // Posuneme healthbar do levého kraje kontejneru
        const healthRatio = this.health / this.maxHealth;
        this.healthBar.scale.x = healthRatio;
        this.healthBar.position.x = -1 + healthRatio;
        this.healthBarContainer.add(this.healthBar);
    }

    createHealthUI() {
        const bossHealthContainer = document.getElementById("bossHealthContainer");
        const bossHealthElement = document.createElement("div");
        bossHealthElement.id = `boss-${this.id}`;
        bossHealthElement.className = "boss-health";
        bossHealthElement.innerHTML = `
        <div class="boss-name">Boss ${this.id}</div>
        <div class="boss-health-bar">
          <div class="boss-health-fill" style="background-color: ${this.attackColor.getStyle()}"></div>
          <div class="boss-health-text"></div>
        </div>
      `;
        bossHealthContainer.appendChild(bossHealthElement);

        this.updateHealthUI();
    }


    updateHealthUI() {
        const bossHealthElement = document.getElementById(`boss-${this.id}`);
        if (bossHealthElement) {
            const healthFill = bossHealthElement.querySelector('.boss-health-fill');
            const healthText = bossHealthElement.querySelector('.boss-health-text');
            const healthPercentage = (this.health / this.maxHealth) * 100;
            healthFill.style.width = `${healthPercentage}%`;
            healthText.textContent = `${Math.round(this.health)} / ${this.maxHealth}`;
        }
    }

    updateHealthBar() {
        if (this.healthBar) {
            const healthRatio = this.health / this.maxHealth;
            this.healthBar.scale.x = healthRatio;
            this.healthBar.position.x = -1 + healthRatio;
        }

        this.updateHealthUI();
    }

    takeDamage(damage) {
        this.health -= damage;
        this.showDamageText(damage);
        if (this.health <= 0) {
            this.die();
        }
        this.updateHealthBar();
    }

    showDamageText(damage) {
        if (this.model) {
            const damageText = document.createElement('div');
            damageText.textContent = `-${damage}`;
            damageText.style.position = 'absolute';
            damageText.style.color = 'red';
            damageText.style.fontSize = '24px';
            damageText.style.fontWeight = 'bold';
            damageText.style.textShadow = '2px 2px 2px black';
            damageText.style.pointerEvents = 'none';

            document.body.appendChild(damageText);

            const startTime = performance.now();
            const duration = 2000; // 2 sekundy

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                if (elapsed < duration) {
                    const bossScreenPosition = this.getScreenPosition();
                    damageText.style.left = `${bossScreenPosition.x}px`;
                    damageText.style.top = `${bossScreenPosition.y - 50 - (elapsed / duration) * 50}px`;
                    damageText.style.opacity = 1 - (elapsed / duration);
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(damageText);
                }
            };

            requestAnimationFrame(animate);
        }
    }

    getScreenPosition() {
        const vector = new THREE.Vector3();
        this.model.getWorldPosition(vector);
        vector.project(camera);

        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        return {
            x: (vector.x * widthHalf) + widthHalf,
            y: -(vector.y * heightHalf) + heightHalf
        };
    }

    setFrozenAppearance(isFrozen) {
        if (this.model) {
            this.model.traverse((child) => {
                if (child.isMesh && child !== this.healthBar && child !== this.healthBarContainer) {
                    if (isFrozen) {
                        child.userData.originalMaterial = child.material;
                        child.material = this.frozenMaterial;
                    } else {
                        child.material = child.userData.originalMaterial || this.originalMaterial;
                    }
                }
            });
        }
    }

    freeze() {
        this.isFrozen = true;
        this.setFrozenAppearance(true);
        if (frostBoltHitSoundBuffer) {
            const sound = new THREE.Audio(new THREE.AudioListener());
            sound.setVolume(0.7);
            sound.setBuffer(frostBoltHitSoundBuffer);
            sound.play();
            sound.onEnded = () => {
                sound.disconnect();
            };
        }
        setTimeout(() => {
            this.isFrozen = false;
            this.setFrozenAppearance(false);
        }, 2000);
    }

    showExpText(exp) {
        if (this.model) {
            const expText = document.createElement('div');
            expText.textContent = `+${exp} EXP`;
            expText.style.position = 'absolute';
            expText.style.color = 'purple';
            expText.style.fontSize = '28px';
            expText.style.fontWeight = 'bold';
            expText.style.textShadow = '2px 2px 2px black';
            expText.style.pointerEvents = 'none';
    
            document.body.appendChild(expText);
    
            const startTime = performance.now();
            const duration = 3000; // 3 sekundy
    
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                if (elapsed < duration) {
                    const bossScreenPosition = this.getScreenPosition();
                    expText.style.left = `${bossScreenPosition.x}px`;
                    expText.style.top = `${bossScreenPosition.y - 100 - (elapsed / duration) * 100}px`;
                    expText.style.opacity = 1 - (elapsed / duration);
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(expText);
                }
            };
    
            requestAnimationFrame(animate);
        }
    }



    die() {
        if (this.model) {
            scene.remove(this.model);
        }

        const key = keyModel.clone();
        key.userData.isKey = true;
        key.position.copy(this.position);
        scene.add(key);

        bosses = bosses.filter(b => b !== this);

        const bossHealthElement = document.getElementById(`boss-${this.id}`);
        if (bossHealthElement) {
            bossHealthElement.remove();
        }

        // Přidání exp za zabití bosse
        const expGained = this.maxHealth;
        addExperience(expGained);
        this.showExpText(expGained);
    }

    attack() {
        const currentTime = performance.now();
        if (currentTime - this.lastAttackTime >= this.attackCooldown * 1000) {
            if (bossSoundBuffer) {
                const sound = new THREE.Audio(new THREE.AudioListener());
                sound.setBuffer(bossSoundBuffer);
                sound.play();
                sound.onEnded = () => {
                    sound.disconnect();
                };
            }

            if (this.health < this.maxHealth / 2 && this.specialAttacks.length > 0) {
                const attackType = this.specialAttacks[Math.floor(this.rng() * this.specialAttacks.length)];
                if (this.rng() < this.getSpecialAttackProbability(attackType)) {
                    this.specialAttack(attackType);
                } else {
                    this.performStandardAttack();
                }
            } else {
                this.performStandardAttack();
            }
            this.lastAttackTime = currentTime;
        }
    }

    performStandardAttack() {
        if (this.attackAction) {
            this.attackAction.reset().play();
            this.attackAction.clampWhenFinished = true;
            this.attackAction.setLoop(THREE.LoopOnce);
        }
        const magicBall = this.createMagicBall(this.position, player.position);
        scene.add(magicBall);
        magicBalls.push(magicBall);
    }


    specialAttack(attackType) {
        switch (attackType) {
            case 'multiShot':
                this.multiShotAttack();
                break;
            case 'aoeBlast':
                this.aoeBlastAttack();
                break;
            case 'teleport':
                this.teleportAttack();
                break;
            case 'frostbolt':
                this.frostboltAttack();
                break;
        }
    }

    frostboltAttack() {
        const frostbolt = this.createFrostbolt(this.position, player.position);
        scene.add(frostbolt);
        magicBalls.push(frostbolt);
    }

    createFrostbolt(startPosition, targetPosition) {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x87CEFA,
            emissive: 0x87CEFA,
            emissiveIntensity: 2
        });
        const frostbolt = new THREE.Mesh(geometry, material);
        frostbolt.position.copy(startPosition);
        frostbolt.position.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
        const speed = 0.3;
        frostbolt.velocity = direction.multiplyScalar(speed);
        frostbolt.isFrostbolt = true;

        return frostbolt;
    }

    multiShotAttack() {
        for (let i = 0; i < 5; i++) {
            const angle = (i - 2) * Math.PI / 10;
            const direction = new THREE.Vector3()
                .subVectors(player.position, this.position)
                .normalize()
                .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            const magicBall = this.createMagicBall(this.position, this.position.clone().add(direction));
            scene.add(magicBall);
            magicBalls.push(magicBall);
        }
    }

    aoeBlastAttack() {
        const blastRadius = 5;
        const blastGeometry = new THREE.SphereGeometry(blastRadius, 32, 32);
        const blastMaterial = new THREE.MeshBasicMaterial({
            color: this.attackColor,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const blast = new THREE.Mesh(blastGeometry, blastMaterial);
        blast.position.copy(this.position);
        scene.add(blast);



        // Damage player if within blast radius
        if (player.position.distanceTo(this.position) < blastRadius) {
            setPlayerHealth(playerHealth - 20);
            updatePlayerHealthBar();
            if (playerHealth <= 0) {
                playerDeath();
            }
        }

        // Remove blast effect after a short delay
        setTimeout(() => {
            scene.remove(blast);
        }, 1000);
    }

    teleportAttack() {
        const currentTime = performance.now();
        if (currentTime - this.lastTeleportTime < this.teleportCooldown) {
            return; // Pokud je teleport na cooldownu, neprovedeme ho
        }
    
        const teleportDistance = 5;
        let teleportDirection = new THREE.Vector3()
            .subVectors(player.position, this.position)
            .normalize()
            .multiplyScalar(teleportDistance);
        teleportDirection.y = 0; // Zachováme původní výšku
    
        // Vytvoříme particle efekt na původní pozici
        this.createTeleportParticles(this.position);
    
        const originalPosition = this.position.clone();
        let newPosition = this.position.clone().add(teleportDirection);
    
        // Hledání bezpečné pozice pro teleportaci
        newPosition = this.findSafeTeleportPosition(newPosition, originalPosition);
    
        if (newPosition) {
            this.position.copy(newPosition);
            this.model.position.copy(this.position);
    
            // Omezení pozice bosse na hranice bludiště
            const halfMazeSize = (MAZE_SIZE * CELL_SIZE) / 2;
            this.position.x = Math.max(Math.min(this.position.x, halfMazeSize), -halfMazeSize);
            this.position.z = Math.max(Math.min(this.position.z, halfMazeSize), -halfMazeSize);
    
            // Vytvoříme particle efekt na nové pozici
            this.createTeleportParticles(this.position);
    
            // Nastavíme čas posledního teleportu
            this.lastTeleportTime = currentTime;
    
            // Perform a quick attack after teleporting
            this.performStandardAttack();
        } else {
            console.log("Boss nemohl najít bezpečnou pozici pro teleportaci");
        }
    }
    
    findSafeTeleportPosition(targetPosition, originalPosition) {
        if (!this.checkCollisionOnMove(targetPosition)) {
            return targetPosition;
        }
    
        const directions = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
        ];
    
        for (let i = 1; i <= 10; i++) { // Zkusíme až 10 pozic
            for (const direction of directions) {
                const testPosition = targetPosition.clone().add(direction.clone().multiplyScalar(i * 0.5));
                if (!this.checkCollisionOnMove(testPosition)) {
                    return testPosition;
                }
            }
        }
    
        return null; // Pokud nebyla nalezena žádná bezpečná pozice
    }
    createTeleportParticles(position) {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = Math.random() * 2;
            const z = (Math.random() - 0.5) * 2;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: this.attackColor,
            size: 0.1,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        particles.position.copy(position);
        scene.add(particles);

        // Animace částic
        const animate = () => {
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += (Math.random() - 0.5) * 0.1;
                positions[i + 1] += 0.1;
                positions[i + 2] += (Math.random() - 0.5) * 0.1;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            material.opacity -= 0.02;

            if (material.opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                scene.remove(particles);
            }
        };

        animate();
    }





    createMagicBall(startPosition, targetPosition) {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: this.attackColor, emissive: this.attackColor,
            emissiveIntensity: 2
        });
        const magicBall = new THREE.Mesh(geometry, material);
        magicBall.position.copy(startPosition);
        magicBall.position.y += 1;

        const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();

        // Nastavení rychlosti na základě rng, v rozmezí 0.2 - 0.3
        const speed = 0.2 + this.rng() * 0.1;
        magicBall.velocity = direction.multiplyScalar(speed);

        return magicBall;
    }

    changeDirection() {
        const randomAngle = Math.random() * 2 * Math.PI;
        this.moveDirection.set(Math.cos(randomAngle), 0, Math.sin(randomAngle));
    }

    move(deltaTime) {
        if (!this.model || !this.position) {
            return;
        }

        if (this.moveDirection.length() === 0) {
            this.changeDirection();
        }

        const speed = 5.0; // Základní rychlost pohybu bosse
        const moveStep = this.moveDirection.clone().multiplyScalar(speed * deltaTime);
        const nextPosition = this.position.clone().add(moveStep);

        const halfMazeSize = (MAZE_SIZE * CELL_SIZE) / 2;
        if (
            nextPosition.x < -halfMazeSize || nextPosition.x > halfMazeSize ||
            nextPosition.z < -halfMazeSize || nextPosition.z > halfMazeSize
        ) {
            this.changeDirection(); // Pokud by boss opustil hranice bludiště, změní směr
        } else if (!this.checkCollisionOnMove(nextPosition)) {
            this.position.add(moveStep);
            this.model.position.copy(this.position);
        } else {
            this.changeDirection();
        }
    }

    // checkCollisionOnMove(position) {
    //   for (let wall of walls) {
    //     const distance = position.distanceTo(wall.position);
    //     if (distance < CELL_SIZE / 2 + 0.8) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }  

    checkCollisionOnMove(position) {
        for (let wall of walls) {
            const distance = position.distanceTo(wall.position);
            if (distance < CELL_SIZE / 2 + 1) { // Přidáme větší odstup pro bosse
                return true;
            }
        }
        return false;
    }

    update(deltaTime) {
        if (this.isFrozen) return;

        if (this.mixer) {
            this.mixer.update(deltaTime);
        }

        if (this.model) {
            this.model.lookAt(player.position);
        }

        if (canSeePlayer(this.position, player.position) && this.position.distanceTo(player.position) < 20) {
            this.attack();
        } else {
            this.move(deltaTime); // Předání deltaTime do funkce move
        }
    }
}

function spawnBossInMaze(maze, rng) {
    let freeCells = [];

    // Projdeme celé bludiště a najdeme volné buňky
    for (let i = 0; i < MAZE_SIZE; i++) {
        for (let j = 0; j < MAZE_SIZE; j++) {
            if (maze[i][j] === 0) {
                freeCells.push({ x: i, z: j });
            }
        }
    }

    if (freeCells.length > 0) {
        // Vybereme náhodnou volnou buňku
        let cell = freeCells[Math.floor(rng() * freeCells.length)];
        const bossPosition = new THREE.Vector3(
            (cell.x - MAZE_SIZE / 2 + 0.5) * CELL_SIZE,
            0.5,
            (cell.z - MAZE_SIZE / 2 + 0.5) * CELL_SIZE
        );

        // Vytvoříme bosse a přidáme ho do scény
        setBossCounter(bossCounter + 1)
        const boss = new Boss(bossPosition, bossCounter, rng);
        boss.health = boss.maxHealth;
        bosses.push(boss);
        setTotalKeys(totalKeys + 1);
    } else {
        console.error("Nepodařilo se najít volnou buňku pro umístění bosse.");
    }
}

function canSeePlayer(bossPosition, playerPosition) {
    const raycaster = new THREE.Raycaster(bossPosition, new THREE.Vector3().subVectors(playerPosition, bossPosition).normalize());
    const intersects = raycaster.intersectObjects(walls);
    return intersects.length === 0;
}

export { Boss, spawnBossInMaze };