import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { player, setPlayerGroundLevel, updatePlayerPosition } from "./player.js";
import { createSky, addStars, createCommonIslands } from "./others/environemntUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { audioLoader, CELL_SIZE, keys, manager, playSound, selectedFloor, setMazeSize, teleportSoundBuffer } from "./main.js";
import { LightManager } from "./rendering/lightManager.js";
import { createDock, createHouse, createGround, createMountains } from "./Coast.js";
import { getTranslation } from "./langUtils.js";
import { SkyBox } from './SkyBox.js';
import { BOSS_TYPES } from "./bossTypes.js";
import { Boss, bossCounter, bosses, setBossCounter } from "./boss.js";

let water;
let boat, mysteriousIsland, coast;
let commonIslands = [];
var seaSound;

let isPaddling = false;

// Přidejte tuto konstantu na začátek souboru, kde jsou deklarovány ostatní konstanty
const PADDLE_RETURN_SPEED = 5; // Rychlost návratu pádel do původní pozice

// Přidejte tyto konstanty na začátek souboru, kde jsou deklarovány ostatní konstanty
const MIN_WAVE_INTENSITY = 0.05; // Minimální intenzita vln při stání
const MAX_WAVE_INTENSITY = 0.2; // Maximální intenzita vln při pádlování
const IDLE_ROTATION_INTENSITY = 0.005; // Intenzita naklánění při stání

// Přidejte tyto proměnné na začátek souboru
let boatSpeed = 0;
const MAX_BOAT_SPEED = 3.5;
const BOAT_ACCELERATION = 2;
const BOAT_DECELERATION = 1;

// Přidejte tuto proměnnou na začátek souboru
let skybox;



let dragonSpawnDistance = 80; // Vzdálenost, po které se objeví draci
let lastDragonSpawnPosition = new THREE.Vector3();
let seaDragons = [];

export function createSeaScene() {
    lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
    // createSky();
    // addStars();
    skybox = new SkyBox(scene, camera);
    createWater();
    createBoat();
    createMysteriousIsland().then(mysteriousIsland => {
        // Zde můžete provést další operace s ostrovem, pokud je potřeba
    });
    createCommonIslands(commonIslands);
    createCoast();
    createLighting();
    setPlayerGroundLevel(1.4);


    audioLoader.load("sounds/snd_sea.mp3", function (buffer) {
        seaSound = new THREE.Audio(new THREE.AudioListener());
        seaSound.setBuffer(buffer);
        seaSound.setLoop(true);
        seaSound.setVolume(1.0); // Adjust volume as needed
        seaSound.play();
    });

}

// Přidejte tuto funkci na začátek souboru nebo do samostatného modulu
function createPaths() {
    const pathsGroup = new THREE.Group();

    // Vytvoření několika cest
    for (let i = 0; i < 5; i++) {
        const pathGeometry = new THREE.PlaneGeometry(5, 50 + Math.random() * 100);
        const pathMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.8,
            metalness: 0.2
        });
        const path = new THREE.Mesh(pathGeometry, pathMaterial);

        // Náhodné umístění a rotace cesty
        path.position.set(
            (Math.random() - 0.5) * 200,
            0.1, // Mírně nad terénem
            (Math.random() - 0.5) * 200
        );
        path.rotation.y = Math.random() * Math.PI * 2;
        path.rotation.x = -Math.PI / 2; // Položíme cestu na zem

        pathsGroup.add(path);
    }

    return pathsGroup;
}

function createWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('textures/waternormals2.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;  // Umístíme vodu do výšky 0
    scene.add(water);
}
const boatLength = 10;
const boatWidth = 4;
var paddles = null;
function createBoat() {
    const loader = new GLTFLoader(manager);
    loader.load('models/lowpoly_stylized_boat2.glb', (gltf) => {
        boat = gltf.scene;
        boat.scale.set(10, 10, 10);
        boat.rotation.y = Math.PI / 2;
        boat.position.set(0, 0, 0);

        // Získání obou pádel
        const paddle0 = boat.getObjectByName("Cube140_Paddle_0");
        const paddle1 = boat.getObjectByName("Cube140_Paddle_1");

        paddles = [paddle0, paddle1];

        paddles.forEach((paddle) => {
            if (paddle) {
                // Uložení počáteční rotace pro každé pádlo
                paddle.userData.initialRotation = paddle.rotation.clone();
            }
        });

        scene.add(boat);

        // Přidání interakčního textu pro pádlování
        const paddleText = document.createElement("div");
        paddleText.className = "interaction-text";
        paddleText.textContent = getTranslation("holdToPaddle");
        paddleText.style.display = "none";
        document.body.appendChild(paddleText);

        // Uložení interakčního textu do userData
        boat.userData.paddleText = paddleText;
        lastDragonSpawnPosition.copy(boat.position);
    });
}

async function createMysteriousIsland() {
    return;
    const island = new THREE.Group();

    // Vytvoření základního terénu
    const groundGeometry = new THREE.CircleGeometry(500, 64);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a5a40,
        roughness: 0.8,
        metalness: 0.2,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    island.add(ground);

    // Přidání hor
    const mountains = createMountains();
    mountains.scale.set(2, 2, 2); // Zvětšíme hory pro tajemný efekt
    island.add(mountains);

    // Přidání cestiček
    const paths = createPaths();
    island.add(paths);

    // Přidání vegetace
    const loader = new GLTFLoader(manager);
    try {
        const [treeGLTF, bushGLTF] = await Promise.all([
            loader.loadAsync('models/Tree.glb'),
            loader.loadAsync('models/Bush.glb')
        ]);

        const tree = treeGLTF.scene;
        const bush = bushGLTF.scene;

        // Rozmístění stromů a keřů
        for (let i = 0; i < 50; i++) {
            const vegetation = Math.random() > 0.3 ? tree.clone() : bush.clone();
            vegetation.position.set(
                (Math.random() - 0.5) * 450,
                0,
                (Math.random() - 0.5) * 450
            );
            vegetation.scale.setScalar(5 + Math.random() * 5);
            vegetation.rotation.y = Math.random() * Math.PI * 2;
            island.add(vegetation);
        }
    } catch (error) {
        console.error("Chyba při načítání modelů vegetace:", error);
    }

    // Umístění ostrova do scény
    island.position.set(0, -10, -1000);
    scene.add(island);

    return island;
}





async function createCoast() {
    coast = new THREE.Group();

    const [dock, houseGroup] = await Promise.all([createDock(), createHouse(false)]);
    const ground = createGround();
    setMazeSize(100000);
    const mountains = createMountains();

    coast.add(dock, houseGroup, ground, mountains);
    coast.position.set(0, 1.5, 40);  // Umístíme pobřeží za loď
    scene.add(coast);
}

function createLighting() {


    const ambientLight = new THREE.AmbientLight(0x443c57, 1);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffffff, 0.2);
    moonLight.position.set(0, 20, 0);
    scene.add(moonLight);

    scene.fog = new THREE.Fog(0x3b4047, 100, 5000);

}

function checkPaddling() {
    if (!boat) return;

    const paddleText = boat.userData.paddleText;
    paddleText.style.display = "block";

    // Projektujeme pozici textu do prostoru kamery
    const textPosition = boat.position.clone().add(new THREE.Vector3(0, 2, 0));
    const vector = textPosition.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

    paddleText.style.left = `${x}px`;
    paddleText.style.top = `${y}px`;
    paddleText.style.bottom = "unset";
    paddleText.style.minWidth = "150px";

    isPaddling = keys.f;
}

const MAX_PADDLE_ROTATION_X = Math.PI / 8; // Nastavte dle potřeby
const MAX_PADDLE_ROTATION_Z = Math.PI / 6; // 30 stupňů

export function animateSea(deltaTime) {
    if (selectedFloor !== 1001) return;
    if (water) {
        water.material.uniforms['time'].value += 0.3 / 60.0;
    }

    skybox.update(camera.position);

    checkPaddling();

    // Plynulá změna rychlosti loďky
    if (isPaddling) {
        boatSpeed = Math.min(boatSpeed + BOAT_ACCELERATION * deltaTime, MAX_BOAT_SPEED);
    } else {
        boatSpeed = Math.max(boatSpeed - BOAT_DECELERATION * deltaTime, 0);
    }

    // Pohyb loďky
    if (boat) {
        const oldBoatPosition = boat.position.clone();
        boat.position.z -= boatSpeed * deltaTime;

        // Simulace pohybu lodi na vlnách a synchronizace s pádlováním
        const paddleSpeed = 1;
        const time = Date.now() * 0.005 * paddleSpeed;
        const paddlingIntensity = boatSpeed / MAX_BOAT_SPEED;

        if (isPaddling) {
            boat.rotation.z = Math.sin(time) * 0.03 * paddlingIntensity;
            boat.rotation.x = Math.cos(time * 0.5) * 0.02 * paddlingIntensity;
        } else {
            boat.rotation.z = Math.sin(time * 0.5) * IDLE_ROTATION_INTENSITY;
            boat.rotation.x = Math.cos(time * 0.3) * IDLE_ROTATION_INTENSITY;
        }

        // Vertikální pohyb lodi
        const waveIntensity = THREE.MathUtils.lerp(MIN_WAVE_INTENSITY, MAX_WAVE_INTENSITY, paddlingIntensity);
        boat.position.y = Math.sin(time * 0.8) * waveIntensity;

        // Animace pádel
        if (paddles && paddles.length === 2) {
            paddles.forEach((paddle, index) => {
                if (paddle) {
                    if (isPaddling) {
                        const offsetTime = time + index * Math.PI;
                        paddle.rotation.x = Math.sin(offsetTime) * MAX_PADDLE_ROTATION_X * paddlingIntensity + paddle.userData.initialRotation.x;
                        paddle.rotation.z = Math.cos(offsetTime) * MAX_PADDLE_ROTATION_Z * paddlingIntensity + paddle.userData.initialRotation.z;
                    } else {
                        // Plynulý návrat pádel do původní pozice
                        paddle.rotation.x = THREE.MathUtils.lerp(paddle.rotation.x, paddle.userData.initialRotation.x, PADDLE_RETURN_SPEED * deltaTime);
                        paddle.rotation.y = THREE.MathUtils.lerp(paddle.rotation.y, paddle.userData.initialRotation.y, PADDLE_RETURN_SPEED * deltaTime);
                        paddle.rotation.z = THREE.MathUtils.lerp(paddle.rotation.z, paddle.userData.initialRotation.z, PADDLE_RETURN_SPEED * deltaTime);
                    }
                }
            });
        }

        // Vypočítáme posun loďky
        const boatMovement = boat.position.clone().sub(oldBoatPosition);

        // Aktualizace pozice hráče, aby zůstal na své relativní pozici na lodi
        if (player) {
            // Posuneme hráče o stejnou vzdálenost jako loďku
            player.position.add(boatMovement);

            // Získáme relativní pozici hráče vzhledem k lodi
            const relativeX = player.position.x - boat.position.x;
            const relativeZ = player.position.z - boat.position.z;

            // Omezíme pohyb hráče na rozměry loďky
            const clampedX = Math.max(-boatWidth / 2 + 1, Math.min(boatWidth / 2 - 1, relativeX));
            const clampedZ = Math.max(-boatLength / 2 + 1, Math.min(boatLength / 2 - 1, relativeZ));

            // Aktualizujeme pozici hráče
            player.position.x = boat.position.x + clampedX;
            //player.position.y = boat.position.y + 1.4; // Výška hráče nad loďkou
            player.position.z = boat.position.z + clampedZ;
        }
    }

    // Kontrola, zda je čas na spawn draků
    if (boat && boat.position.distanceTo(lastDragonSpawnPosition) >= dragonSpawnDistance) {
        spawnSeaDragons();
        lastDragonSpawnPosition.copy(boat.position);
    }



}

let dragonSpawnCount = 0;
function spawnSeaDragons() {
    const dragonTypes = BOSS_TYPES.slice(-3); // Poslední 3 typy draků (13. podlaží)
    // Zvýšíme počet spawnů a omezíme na maximum 4
    dragonSpawnCount = Math.min(dragonSpawnCount + 1, 4);
    const dragonCount = dragonSpawnCount; // Počet draků, které se objeví
    playSound(teleportSoundBuffer,0.4);

    for (let i = 0; i < dragonCount; i++) {
        const randomType = dragonTypes[Math.floor(Math.random() * dragonTypes.length)];

        // Funkce pro generování náhodné vzdálenosti mezi 30 a 50 s náhodným znaménkem
        function getRandomDistance() {
            const distance = 30 + Math.random() * 10; // Generuje hodnotu mezi 30 a 40
            return Math.random() < 0.5 ? -distance : distance; // Náhodně zvolí kladné nebo záporné znaménko
        }

        const xDistance = getRandomDistance();
        const zDistance = getRandomDistance();

        const position = new THREE.Vector3(
            boat.position.x + xDistance,
            Math.random() * 2 + 5, // Náhodná výška nad hladinou v rozmezí 5-7
            boat.position.z + zDistance
        );

        setBossCounter(bossCounter + 1);
        const dragon = new Boss(position, seaDragons.length, Math.random, 8, false, randomType, true, true);
        dragon.health = dragon.maxHealth;
        bosses.push(dragon);
        seaDragons.push(dragon);
    }
}



export function stopSeaSound() {
    if (seaSound) {
        seaSound.stop();
    }
}

export function clearSeaScene() {
    if (water) scene.remove(water);
    if (boat) scene.remove(boat);
    if (mysteriousIsland) scene.remove(mysteriousIsland);
    if (coast) scene.remove(coast);
    commonIslands.forEach(island => scene.remove(island));
    commonIslands = [];
    stopSeaSound();

    if (boat && boat.userData.paddleText) {
        document.body.removeChild(boat.userData.paddleText);
    }

    if (skybox) {
        skybox.dispose();
        skybox = null;
    }

    water = null;
    boat = null;
    mysteriousIsland = null;
    coast = null;
    dragonSpawnCount = 0;
    setPlayerGroundLevel(0);

    seaDragons.forEach(dragon => {
        if (dragon.model) {
            scene.remove(dragon.model);
        }
    });
    seaDragons = [];
}

// Nezapomeňte exportovat nové funkce, pokud je budete potřebovat použít v jiných souborech
