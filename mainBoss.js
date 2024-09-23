import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Boss, canSeePlayer, BOSS_TYPES, setBossCounter, bossCounter, bosses } from "./boss.js";
import { player } from "./player.js";
import { bossSoundBuffer, CELL_SIZE, manager, MAZE_SIZE, playSound, selectedFloor, setMazeSize, teleportSoundBuffer, WALL_HEIGHT } from "./main.js";
import { createTorchOnCenterTower, createTorchOnWall } from "./camp.js";
import { textureSets } from "./globals.js";

export const MAIN_BOSS_TYPES = [
    {
        name: "Stinový démon",
        translationKey: "bossFloor1",
        specialAttacks: ['multiShot', "spawnDragons"],
        mainMaterial: new THREE.MeshStandardMaterial({ color: 0x200f38, metalness: 0.4, roughness: 0.1 }),
        secondaryMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.4, roughness: 0.1 }),
        attackColor: new THREE.Color(0xff5252),
        attackCooldown: 0.8,
        emissiveIntensity: 3,
        maxHealth: 20000,
        bossHitBoxMarginY: 2.5,
        attackSpeed: 0.5,
        attackSize: 0.5
    }
]

export class MainBoss extends Boss {
    constructor(position, id, rng, floor, type) {
        super(position, id, rng, floor, true, type);
        this.maxHealth = type.maxHealth;
        this.health = type.maxHealth;
        this.isMainBoss = true;
        this.chaseDistance = 15;
        this.lastSpecialAttackTime = Date.now() + 10000; // Přidáno 60 sekund zpoždění pro první útok
        this.specialAttackInterval = 20000; // 20 sekund
        this.multiShotCount = 0;
        this.maxMultiShots = 10;
        this.dragonsSpawned = false;
        this.isMovingToCenter = false;
        this.centerPosition = new THREE.Vector3(0, 0.5, 0);
        this.multiShotInterval = 500; // 500 ms mezi výstřely
        this.lastMultiShotTime = 0;
        this.loadMainBossModel();
        this.changeDirection();
        this.createHealthUI();
    }

    loadMainBossModel() {
        const loader = new GLTFLoader(manager);
        loader.load('models/GhostSkull.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(1, 1, 1);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    console.log(child.name)
                    if (child.name === "Ghost_Skull_1") {
                        child.material = this.type.mainMaterial;
                    } else if (child.name === "Ghost_Skull_2") {
                        child.material = this.type.secondaryMaterial;

                    }
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

    update(deltaTime) {
        this.updateSlowParticles(deltaTime);
        if (this.isFrozen) return;

        if (Date.now() > this.slowEndTime) {
            this.slowEffect = 1;
            this.removeSlowParticles();
        } else if (this.slowParticles) {
            this.updateSlowParticles(deltaTime);
        }

        this.updateBurning(deltaTime);

        if (this.mixer) {
            this.mixer.update(deltaTime * this.slowEffect);
        }

        if (this.model) {
            this.model.lookAt(player.position);
        }

        const currentTime = Date.now();
        if (currentTime - this.lastSpecialAttackTime >= this.specialAttackInterval) {
            if (!this.isMovingToCenter) {
                this.isMovingToCenter = true;
            }
        }

        if (this.isMovingToCenter) {
            this.moveToCenter(deltaTime);
        } else if (this.multiShotCount > 0) {
            if (currentTime - this.lastMultiShotTime >= this.multiShotInterval) {
                this.multiShot();
                this.lastMultiShotTime = currentTime;
            }
        } else {
            if (canSeePlayer(this.position, player.position)) {
                this.attack();
            } else {
                this.move(deltaTime, 2);
            }
        }

        if (this.health <= this.maxHealth / 2 && !this.dragonsSpawned) {
            this.spawnDragons();
        }
    }

    moveToCenter(deltaTime) {
        const direction = new THREE.Vector3().subVectors(this.centerPosition, this.position);
        const distance = direction.length();
        
        if (distance > 0.1) {
            direction.normalize();
            const moveStep = direction.multiplyScalar(5 * deltaTime); // Upravte rychlost podle potřeby
            this.position.add(moveStep);
            if (this.model) {
                this.model.position.copy(this.position);
            }
        } else {
            this.isMovingToCenter = false;
            this.performSpecialAttack();
        }
    }

    performSpecialAttack() {
        this.multiShotCount = this.maxMultiShots;
        this.lastSpecialAttackTime = Date.now();
    }

    multiShot() {
        playSound(bossSoundBuffer);
        const playerDirection = new THREE.Vector3().subVectors(player.position, this.position).normalize();
        const numberOfShots = 25; // Celkový počet střel
        const angleStep = (2 * Math.PI) / numberOfShots;
    
        for (let i = 0; i < numberOfShots; i++) {
            const angle = i * angleStep;
            const direction = new THREE.Vector3(
                Math.cos(angle),
                0,
                Math.sin(angle)
            );
    
            // Přidáme náhodný offset
            const randomOffset = new THREE.Vector3(
                (Math.random() - 0.5) * 1,
                0,
                (Math.random() - 0.5) * 1
            );
            direction.add(randomOffset).normalize();
    
            // Nastavíme Y komponentu směru tak, aby mířila na hráče
            direction.y = playerDirection.y;
    
            const magicBall = this.createMagicBall(this.position, this.position.clone().add(direction), 0.5);
            scene.add(magicBall);
            magicBalls.push(magicBall);
        }
    
        this.multiShotCount--;
    }

    spawnDragons() {
        playSound(teleportSoundBuffer);
        const centerPosition = new THREE.Vector3(0, 0.5, 0);
        const spacing = 2; // Rozestup 2 metry
        const dragonPositions = [
            new THREE.Vector3(centerPosition.x - spacing, centerPosition.y, centerPosition.z - spacing),
            new THREE.Vector3(centerPosition.x + spacing, centerPosition.y, centerPosition.z - spacing),
            new THREE.Vector3(centerPosition.x - spacing, centerPosition.y, centerPosition.z + spacing),
            new THREE.Vector3(centerPosition.x + spacing, centerPosition.y, centerPosition.z + spacing)
        ];
    
        dragonPositions.forEach(position => {
          
                setBossCounter(bossCounter + 1)
                const dragon = new Boss(position, bossCounter, this.rng, 1,false);
                dragon.health = dragon.maxHealth;
                bosses.push(dragon);          
        });
    
        this.dragonsSpawned = true;
    }

    attack() {
        const currentTime = performance.now();
        const attackCooldown = this.type.attackCooldown / this.slowEffect;
        if (currentTime - this.lastAttackTime >= attackCooldown * 1000) {
            this.performStandardAttack();
            this.lastAttackTime = currentTime;
        }
    }
}

export function createMainBossRoom(rng) {
    const roomSize = 10;
    setMazeSize(roomSize);
    const cornerWallSize = 1; // Zmenšeno na polovinu
    const cornerWallDistance = 2.5; // Posunuto o 2 metry dále od zdi

    const room = new THREE.Group();
    const loader = new THREE.TextureLoader(manager);
    const floorTexture = loader.load(textureSets[0].floorTexture);
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    const wallTexture = loader.load(textureSets[0].wallTexture);
    wallTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.repeat.set(roomSize, roomSize);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;


    // Vytvoření podlahy
    const floorGeometry = new THREE.PlaneGeometry(roomSize * CELL_SIZE, roomSize * CELL_SIZE);
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    room.add(floor);

    // Vytvoření zdí
    const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

    const createWall = (x, y, z, isMerlon = false) => {
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(x, y, z);
        room.add(wall);
        walls.push(wall);

        if (isMerlon) {
            const merlonBlock = new THREE.Mesh(wallGeometry, wallMaterial);
            merlonBlock.position.set(x, y + WALL_HEIGHT, z);
            room.add(merlonBlock);
            walls.push(merlonBlock);
        }
    };

    // Vytvoření hraničních zdí s hradbami
    for (let i = -roomSize / 2; i <= roomSize / 2; i += 1) {
        const isMerlon = i % 2 === 0; // Každý druhý blok bude mít hradbu
        createWall(i * CELL_SIZE, WALL_HEIGHT/2, -roomSize * CELL_SIZE / 2, isMerlon);
        createWall(i * CELL_SIZE, WALL_HEIGHT/2, roomSize * CELL_SIZE / 2, isMerlon);
        createWall(-roomSize * CELL_SIZE / 2, WALL_HEIGHT/2, i * CELL_SIZE, isMerlon);
        createWall(roomSize * CELL_SIZE / 2, WALL_HEIGHT/2, i * CELL_SIZE, isMerlon);
    }

    
    // Vytvoření rohových zdí s pochodněmi
    const cornerWallGeometry = new THREE.BoxGeometry(cornerWallSize * CELL_SIZE, WALL_HEIGHT, cornerWallSize * CELL_SIZE);
    const cornerPositions = [
        [-1, -1], [1, -1], [-1, 1], [1, 1]
    ];

    cornerPositions.forEach(([x, z]) => {
        const cornerX = x * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;
        const cornerZ = z * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;

        // Vytvoření dvou bloků zdí postavených na sobě
        for (let i = 0; i < 2; i++) {
            const cornerWall = new THREE.Mesh(cornerWallGeometry, wallMaterial);
            cornerWall.position.set(cornerX, WALL_HEIGHT / 2 + i * WALL_HEIGHT, cornerZ);
              WALL_HEIGHT / 2 + i * WALL_HEIGHT,
            room.add(cornerWall);
            walls.push(cornerWall);
        }

        // Přidání pochodní ke každé straně rohového sloupu
        const directions = [
            { dx: 1, dz: 0 },
            { dx: -1, dz: 0 },
            { dx: 0, dz: 1 },
            { dx: 0, dz: -1 }
        ];

        directions.forEach(dir => {
            createTorchOnCenterTower(cornerX, cornerZ, 1, dir);
        });
    });


       // Přidáme časovač pro spawn bosse
       setTimeout(() => {
        const mainBossPosition = new THREE.Vector3(0, 0.5, 0);
        setBossCounter(bossCounter + 1);
        const mainBoss = new MainBoss(mainBossPosition, bossCounter, rng, selectedFloor, MAIN_BOSS_TYPES[selectedFloor - 100]);
        bosses.push(mainBoss);
 
    }, 5000);

    // Spustíme odpočet
    showCountdown(5);

    return room;
}

function showCountdown(duration) {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'boss-countdown';
    countdownElement.style.position = 'fixed';
    countdownElement.style.top = '50%';
    countdownElement.style.left = '50%';
    countdownElement.style.transform = 'translate(-50%, -50%)';
    countdownElement.style.fontSize = '100px';
    countdownElement.style.fontWeight = 'bold';
    countdownElement.style.color = '#ff0000';
    countdownElement.style.textShadow = '2px 2px 4px #000000';
    countdownElement.style.zIndex = '1000';
    document.body.appendChild(countdownElement);

    let timeLeft = duration;
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.remove();
        }
        timeLeft--;
    }, 1000);
}