import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { player } from "./player.js";
import { showMessage } from "./utils.js";
import { getTranslation } from "./langUtils.js";
import { audioLoader, CELL_SIZE, keys, manager, setMazeSize, startGame } from "./main.js";
import { textureSets } from "./globals.js";
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { addStars, createSky, createTrees } from "./others/environemntUtils.js";
import { createFireParticles } from "./others/effects.js";
import { LightManager } from "./rendering/lightManager.js";

let water
let dock, boat, ground;
var seaSound;
export function createCoastScene() {
    lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
    createSky();
    addStars();
    createWater();
    createTrees(generateTreePositions);
    createDock().then(dock => scene.add(dock));
    createHouse().then(house => scene.add(house));
    const ground = createGround();
    scene.add(ground);
    const mountains = createMountains();
    scene.add(mountains);
    createBoat();
    createCoastWalls();
    createLighting();

    audioLoader.load("sounds/snd_sea.mp3", function (buffer) {
        seaSound = new THREE.Audio(new THREE.AudioListener());
        seaSound.setBuffer(buffer);
        seaSound.setLoop(true);
        seaSound.setVolume(1.0); // Adjust volume as needed
        seaSound.play();
    });

}


function deformMountainGeometry(geometry) {
    const positionAttribute = geometry.attributes.position;
    const noise = new ImprovedNoise();

    const scale = 0.05;
    const heightScale = 80;

    const playerAreaBoundary = 28;
    const mountainStartDistance = playerAreaBoundary + 10;
    const maxDistance = 200;

    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        const distance = Math.sqrt(x * x + y * y);

        // Určíme, zda je bod v oblasti bez hor (směr k moři)
        const isInNoMountainZone = y > 10;

        if (!isInNoMountainZone && distance > mountainStartDistance) {
            const distanceFactor = THREE.MathUtils.clamp(
                (distance - mountainStartDistance) / (maxDistance - mountainStartDistance),
                0,
                1
            );

            let noiseValue = 0;
            let amplitude = 1;
            let frequency = 1;
            for (let o = 0; o < 4; o++) {
                noiseValue += noise.noise(x * scale * frequency, y * scale * frequency, 0) * amplitude;
                amplitude *= 0.5;
                frequency *= 2;
            }

            noiseValue = (noiseValue + 1) / 2;

            const height = noiseValue * heightScale * distanceFactor;

            positionAttribute.setZ(i, height);
        } else {
            // V zóně bez hor a v hráčově oblasti nastavíme výšku pod úroveň podlahy
            positionAttribute.setZ(i, -10);
        }
    }

    geometry.computeVertexNormals();
}


export function createMountains() {
    const mountainTextureLoader = new THREE.TextureLoader();
    const mountainTexture = mountainTextureLoader.load('textures/floor-egypt.jpg');
    mountainTexture.colorSpace = THREE.SRGBColorSpace;
    mountainTexture.wrapS = THREE.RepeatWrapping;
    mountainTexture.wrapT = THREE.RepeatWrapping;
    mountainTexture.repeat.set(50, 100);

    const mountainWidth = 400;        // Zvýšení velikosti hor
    const mountainSegments = 200;     // Více segmentů pro detailnější hory

    const mountainGeometry = new THREE.PlaneGeometry(
        mountainWidth,
        mountainWidth,
        mountainSegments,
        mountainSegments
    );

    deformMountainGeometry(mountainGeometry);

    const mountainMaterial = new THREE.MeshLambertMaterial({
        color: 0x8B7765,
        side: THREE.DoubleSide,
        map: mountainTexture
    });

    const mountains = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountains.rotation.x = -Math.PI / 2;
    mountains.position.set(0, -0.5, 0);
    return mountains;
}


function createCoastWalls() {
    const wallHeight = CELL_SIZE;
    const coastLength = 200; // Délka pobřeží
    const dockWidth = 10; // Šířka mola

    const createWallSegment = (x, z, length, isVertical, thickness = 0.2, canShootThrough = true) => {
        const segmentGeometry = new THREE.BoxGeometry(
            isVertical ? thickness : CELL_SIZE,
            wallHeight,
            isVertical ? CELL_SIZE : thickness
        );
        const segment = new THREE.Mesh(
            segmentGeometry,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        segment.position.set(x, wallHeight / 2, z);
        segment.userData.canShootThrough = canShootThrough;
        scene.add(segment);
        walls.push(segment);
    };

    // Levá stěna
    for (let z = -10; z > -coastLength / 2 + dockWidth / 2; z -= CELL_SIZE) {
        createWallSegment(-dockWidth / 2, z - CELL_SIZE / 2, CELL_SIZE, true);
    }

    // Pravá stěna
    for (let z = -10; z > -coastLength / 2 + dockWidth / 2; z -= CELL_SIZE) {
        createWallSegment(dockWidth / 2, z - CELL_SIZE / 2, CELL_SIZE, true);
    }

    // stěna levé strany moře
    for (let x = -50 + CELL_SIZE; x < ((dockWidth / 2) - CELL_SIZE * 3); x += CELL_SIZE) {
        createWallSegment(x, -11, CELL_SIZE, false);
    }
    // stěna pravé strany moře
    for (let x = ((dockWidth / 2) + CELL_SIZE / 2); x < 100; x += CELL_SIZE) {
        createWallSegment(x, -11, CELL_SIZE, false);
    }

    const houseSize = 10; // Přibližná velikost domu
    // Nové stěny kolem domu
    for (let i = -2; i <= 2; i++) {
        // Přední stěny domu
        createWallSegment(i * CELL_SIZE, 5 + houseSize / 2, CELL_SIZE, false, CELL_SIZE, false);
        // Zadní stěny domu
        createWallSegment(i * CELL_SIZE, 5 - houseSize / 2, CELL_SIZE, false, CELL_SIZE, false);
        // Levé stěny domu
        createWallSegment(-houseSize / 2, 5 + i * CELL_SIZE, CELL_SIZE, true, CELL_SIZE, false);
        // Pravé stěny domu
        createWallSegment(houseSize / 2, 5 + i * CELL_SIZE, CELL_SIZE, true, CELL_SIZE, false);
    }
}


function createTorchOnHouse(x, z, height, dir,createLight = true) {
    const torchGroup = new THREE.Group();

    const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
    const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const torch = new THREE.Mesh(torchGeometry, torchMaterial);
    torch.position.set(
        x + dir.dx * (CELL_SIZE / 2),
        height,
        z + dir.dz * (CELL_SIZE / 2)
    );

    const angle = Math.atan2(dir.dz, dir.dx);
    torch.rotation.y = angle;
    torch.rotation.z = Math.PI;

    torchGroup.add(torch);

    const fire = createFireParticles(textureSets[1].torchColor.particles);
    fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
    torchGroup.add(fire);

    var light;
    if (createLight) {
    light = new THREE.PointLight(
        textureSets[1].torchColor.light,
        1.5,
        CELL_SIZE * 4
    );
    const lightOffsetFactor = 0.3;

    light.position.set(
        torch.position.x + dir.dx * lightOffsetFactor,
        torch.position.y + 0.5,
        torch.position.z + dir.dz * lightOffsetFactor
    );

    torchGroup.add(light);
        lightManager.addLight(light);
    }
    torches.push({ torch, fire, light });

    return torchGroup;
}



function createWater() {
    const waterTextureLoader = new THREE.TextureLoader();

    // Vytvoříme vodní plochu jako obdélník před hráčem
    const waterGeometry = new THREE.PlaneGeometry(2000, 2100);
    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterTextureLoader.load('textures/waternormals2.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0x555555, // Změněno na tmavší barvu
            waterColor: 0x02003b, // Změněno na tmavší odstín modré
            distortionScale: 2,
            fog: scene.fog !== undefined

        }
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -2, -1000); // Posuneme vodu před hráče
    scene.add(water);
}

function generateTreePositions() {
    const treePositions = [];
    const treeDistance = 30;
    const treeInterval = 5;
    const randomSeed = 44; // Zde nastavte pevný seed pro Math.random()

    for (let x = -100; x <= 100; x += treeInterval) {
        treePositions.push({ x: x + Math.random(randomSeed) * 20, y: 1 + Math.random(randomSeed) * 2, z: 30 + treeDistance + Math.random(randomSeed) * 50 });
    }

    for (let z = 0; z <= 150; z += treeInterval) {
        treePositions.push({ x: 50 + treeDistance + Math.random(randomSeed) * 20, y: 2 + Math.random(randomSeed) * 2, z: z + Math.random(randomSeed) * 50 });
        treePositions.push({ x: -50 - treeDistance + Math.random(randomSeed) * 20, y: 2 + Math.random(randomSeed) * 2, z: z + Math.random(randomSeed) * 50 });
    }

    return treePositions;
}



export function createGround() {
    const loader = new THREE.TextureLoader(manager);
    const floorTexture = loader.load(textureSets[2].floorTexture);
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(80, 80); // Increased repeat for larger ground area

    const floorTextureBackFront = loader.load(textureSets[2].floorTexture);
    floorTextureBackFront.colorSpace = THREE.SRGBColorSpace;
    floorTextureBackFront.wrapS = THREE.RepeatWrapping;
    floorTextureBackFront.wrapT = THREE.RepeatWrapping;
    floorTextureBackFront.repeat.set(30, 1);


    const groundSize = 200;
    setMazeSize(24);
    const groundSegments = 100;

    const groundGeometry = new THREE.BoxGeometry(groundSize, 5, groundSize); // Added thickness with BoxGeometry
    const materials = [
        new THREE.MeshStandardMaterial({ map: floorTexture }), // Right
        new THREE.MeshStandardMaterial({ map: floorTexture }), // Left
        new THREE.MeshStandardMaterial({ map: floorTexture }), // Top
        new THREE.MeshStandardMaterial({ map: floorTexture }), // Bottom
        new THREE.MeshStandardMaterial({ map: floorTextureBackFront }), // Front
        new THREE.MeshStandardMaterial({ map: floorTextureBackFront })  // Back
    ];
    const ground = new THREE.Mesh(groundGeometry, materials);
    ground.position.set(0, -2.5, 90);
    return ground;
}

export function createDock() {
    const loader = new GLTFLoader(manager);
    return new Promise((resolve) => {
        loader.load('models/Dock.glb', (gltf) => {
            const dock = gltf.scene;
            dock.scale.set(1, 0.8, 1);
            dock.position.set(0, -2.8, -20);
            resolve(dock);
        });
    });
}

export function createHouse(createLight = true) {
    const loader = new GLTFLoader(manager);
    return new Promise((resolve) => {
        loader.load('models/House.glb', (gltf) => {
            const house = gltf.scene;
            house.scale.set(4.5, 4.5, 4.5);
            house.position.set(0, 0, 5);

            // Vytvoříme skupinu pro dům a pochodně
            const houseGroup = new THREE.Group();
            houseGroup.add(house);

            // Přidáme pochodně na přední a zadní stranu domu
            const torchPositions = [
                { dx: -2, dz: 4.34 },  // Přední strana
                { dx: 2, dz: 4.34 },  // Přední strana
                { dx: -2, dz: -4.3 },  // Zadní strana
                { dx: 2, dz: -4.3 }  // Zadní strana
            ];

            torchPositions.forEach(dir => {
                const torch = createTorchOnHouse(
                    house.position.x,
                    house.position.z,
                    2.5,  // Výška pochodně (můžete upravit podle potřeby)
                    dir,
                    createLight
                );
                houseGroup.add(torch);
            });

            resolve(houseGroup);
        });
    });
}

function createBoat() {
    const loader = new GLTFLoader(manager);
    loader.load('models/Boat.glb', (gltf) => {
        boat = gltf.scene;
        boat.scale.set(4, 4, 4);
        boat.rotation.y = Math.PI / 2;
        boat.position.set(0, -1.1, -35);  // Posuneme loďku blíže k molu a vodě
        scene.add(boat);

        // Přidání interakčního textu
        const interactionText = document.createElement("div");
        interactionText.className = "interaction-text";
        interactionText.textContent = getTranslation("enterBoat");
        interactionText.style.display = "none";
        document.body.appendChild(interactionText);

        // Uložíme interakční text do userData
        boat.userData.interactionText = interactionText;
    });
}

function createLighting() {


    const ambientLight = new THREE.AmbientLight(0x443c57, 1);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffffff, 0.2);
    moonLight.position.set(0, 20, 0);
    scene.add(moonLight);

    scene.fog = new THREE.Fog(0xcce0ff, 500, 3000);

}

export function animateCoast() {
    if (water) {
        water.material.uniforms['time'].value += 0.3 / 60.0;
    }
    checkBoatInteraction();

}

function checkBoatInteraction() {
    if (!boat) return;

    const distance = player.position.distanceTo(boat.position);
    const interactionText = boat.userData.interactionText;

    if (distance < 6.5) {
        // Vytvoříme vektor pro pozici textu nad loďkou
        const textPosition = boat.position.clone().add(new THREE.Vector3(0, 2, 0));

        // Projektujeme pozici textu do prostoru kamery
        const vector = textPosition.project(camera);

        // Zkontrolujeme, zda je loďka v záběru kamery
        const isInView = vector.x > -1 && vector.x < 1 && vector.z < 1;

        if (isInView) {
            interactionText.style.display = "block";
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

            interactionText.style.left = `${x}px`;
            interactionText.style.top = `${y}px`;
            interactionText.style.bottom = "unset";
            interactionText.style.minWidth = "150px";

            if (keys.f) {
                startGame(1001);
                keys.f = false; // Resetujeme stav klávesy
            }
        } else {
            interactionText.style.display = "none";
        }
    } else {
        interactionText.style.display = "none";
    }
}

export function clearCoastScene() {
    if (water) scene.remove(water);
    if (dock) scene.remove(dock);
    if (boat) {
        scene.remove(boat);
        if (boat.userData.interactionText) {
            document.body.removeChild(boat.userData.interactionText);
        }
    }
    if (ground) scene.remove(ground);
    if (seaSound) seaSound.stop();
    water = null;
    dock = null;
    boat = null;
    ground = null;
}