import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Boss, canSeePlayer } from "./boss.js";
import { player } from "./player.js";
import { CELL_SIZE, manager, setMazeSize, WALL_HEIGHT } from "./main.js";
import { createTorchOnCenterTower, createTorchOnWall } from "./camp.js";
import { textureSets } from "./globals.js";

const _type = {
    name: "Hlavní Boss",
    translationKey: "mainBoss",
    dragonMainMaterial: new THREE.MeshStandardMaterial({ color: 0xFF0000, roughness: 0.1, metalness: 0.5 }),
    eyeBlackMaterial: new THREE.MeshStandardMaterial({ color: 0x000000 }),
    eyeWhiteMaterial: new THREE.MeshStandardMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 2 }),
    attackColor: new THREE.Color(0xFF0000),
    attackCooldown: 1,
    minHealth: 20000,
    maxHealth: 25000
};

export class MainBoss extends Boss {
    constructor(position, id, rng, floor) {
        super(position, id, rng, floor, true, _type);
        this.health = this.maxHealth = 25000;
        this.isMainBoss = true;
        this.chaseDistance = 15;
        this.loadMainBossModel();
    }

    loadMainBossModel() {
        const loader = new GLTFLoader();
        loader.load('models/Dragon.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.position.copy(this.position);
            this.model.scale.set(0.5, 0.5, 0.5);
            this.model.traverse((child) => {
                if (child.isMesh) {
                    child.material = this.type.dragonMainMaterial;
                }
            });
            scene.add(this.model);

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

        if (canSeePlayer(this.position, player.position)) {
            this.attack();
        } else {
            this.move(deltaTime, 2);
        }
    }

    attack() {
        const currentTime = performance.now();
        const attackCooldown = this.type.attackCooldown / this.slowEffect;
        if (currentTime - this.lastAttackTime >= attackCooldown * 1000) {
            this.performStandardAttack();
            this.lastAttackTime = currentTime;
        }
    }

    chasePlayer(deltaTime) {
        const canSee = canSeePlayer(this.position, player.position);
        const direction = new THREE.Vector3().subVectors(player.position, this.position).normalize();
        direction.y = 0; // Zajistíme, že směr nemá vertikální komponentu
        const distanceToPlayer = this.position.distanceTo(player.position);
        const minDistance = 2; // Minimální vzdálenost od hráče
        const maxDistance = 15; // Maximální vzdálenost pronásledování

        if (distanceToPlayer > maxDistance) {
            return; // Boss se nepohybuje, pokud je hráč příliš daleko
        }

        let speed = canSee ? 4 * deltaTime : 2 * deltaTime;

        if (distanceToPlayer <= minDistance) {
            // Pokud je boss příliš blízko hráči, zůstane na místě
            return;
        } else if (distanceToPlayer <= minDistance + 1) {
            // Pokud je boss v blízkosti minimální vzdálenosti, zpomalí
            speed *= 0.5;
        }

        const newPosition = this.position.clone().add(direction.multiplyScalar(speed));
        newPosition.y = this.position.y; // Zachováme původní Y pozici

        if (!this.checkCollisionOnMove(newPosition, 2)) {
            this.position.copy(newPosition);
            if (this.model) {
                this.model.position.copy(this.position);
            }
        } else {
            // Pokud narazí na překážku, zkusí se pohnout do strany
            const sideDirection = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
            const leftPosition = this.position.clone().add(sideDirection.multiplyScalar(speed));
            const rightPosition = this.position.clone().add(sideDirection.multiplyScalar(-speed));

            if (!this.checkCollisionOnMove(leftPosition)) {
                this.position.copy(leftPosition);
            } else if (!this.checkCollisionOnMove(rightPosition)) {
                this.position.copy(rightPosition);
            }
            // Pokud nemůže jít ani do strany, zůstane na místě

            if (this.model) {
                this.model.position.copy(this.position);
            }
        }
    }
}

export function createMainBossRoom() {
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
    wallTexture.repeat.set(1, 2);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;

    // Vytvoření podlahy
    const floorGeometry = new THREE.PlaneGeometry(roomSize * CELL_SIZE, roomSize * CELL_SIZE);
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    room.add(floor);

    // Vytvoření zdí
    const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT * 2, CELL_SIZE);
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
        createWall(i * CELL_SIZE, WALL_HEIGHT, -roomSize * CELL_SIZE / 2, isMerlon);
        createWall(i * CELL_SIZE, WALL_HEIGHT, roomSize * CELL_SIZE / 2, isMerlon);
        createWall(-roomSize * CELL_SIZE / 2, WALL_HEIGHT, i * CELL_SIZE, isMerlon);
        createWall(roomSize * CELL_SIZE / 2, WALL_HEIGHT, i * CELL_SIZE, isMerlon);
    }

   // Vytvoření rohových zdí s pochodněmi
   const cornerWallGeometry = new THREE.BoxGeometry(cornerWallSize * CELL_SIZE, WALL_HEIGHT * 2, cornerWallSize * CELL_SIZE);
   const cornerPositions = [
       [-1, -1], [1, -1], [-1, 1], [1, 1]
   ];

   cornerPositions.forEach(([x, z]) => {
       const cornerWall = new THREE.Mesh(cornerWallGeometry, wallMaterial);
       const cornerX = x * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;
       const cornerZ = z * (roomSize / 2 - cornerWallDistance) * CELL_SIZE;
       cornerWall.position.set(cornerX, WALL_HEIGHT, cornerZ);
       room.add(cornerWall);
       walls.push(cornerWall);

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

   

    return room;
}