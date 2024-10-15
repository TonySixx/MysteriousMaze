import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { player, setPlayerGroundLevel, updatePlayerPosition } from "./player.js";
import { createSky, addStars } from "./others/environemntUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { audioLoader, CELL_SIZE, keys, manager, selectedFloor } from "./main.js";
import { LightManager } from "./rendering/lightManager.js";
import { createDock, createHouse, createGround, createMountains } from "./Coast.js";
import { getTranslation } from "./langUtils.js";

let water;
let boat, mysteriousIsland, coast;
let commonIslands = [];
var seaSound;

let islandSpeed = 0;
let coastSpeed = 0;
let isPaddling = false;
const maxSpeed = 5;

// Přidejte tyto proměnné na začátek souboru, kde jsou deklarovány ostatní proměnné
let currentSpeed = 0;
let currentWaveIntensity = 0.1;
const accelerationRate = 2; // Rychlost zrychlení/zpomalení
const waveIntensityChangeRate = 0.2; // Rychlost změny intenzity vln

// Přidejte tuto konstantu na začátek souboru, kde jsou deklarovány ostatní konstanty
const PADDLE_RETURN_SPEED = 5; // Rychlost návratu pádel do původní pozice

// Přidejte tyto konstanty na začátek souboru, kde jsou deklarovány ostatní konstanty
const MIN_WAVE_INTENSITY = 0.05; // Minimální intenzita vln při stání
const MAX_WAVE_INTENSITY = 0.2; // Maximální intenzita vln při pádlování
const IDLE_ROTATION_INTENSITY = 0.005; // Intenzita naklánění při stání

export function createSeaScene() {
    lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
    createSky();
    addStars();
    createWater();
    createBoat();
    createMysteriousIsland();
    createCommonIslands();
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
    });
}
function createMysteriousIsland() {
    const loader = new GLTFLoader();
    loader.load('models/mountains.glb', (gltf) => {
        mysteriousIsland = gltf.scene;
        mysteriousIsland.position.set(0, 0, -1000);  // Umístíme ostrov daleko před loďku
        scene.add(mysteriousIsland);
    });
}

function createCommonIslands() {
    const islandCount = 15;  // Počet běžných ostrovů
    const loader = new GLTFLoader();
    for (let i = 0; i < islandCount; i++) {
        loader.load('models/island_1.glb', (gltf) => {
            const island = gltf.scene;
            island.position.set(
                (Math.random() - 0.5) * 1000,  // Náhodná X pozice
                -0.5,
                -400 - Math.random() * 1000  // Náhodná Z pozice za mysterious island
            );
            island.scale.set(
                8 + Math.random() * 5,  // Náhodná velikost
                8 + Math.random() * 5,
                8 + Math.random() * 5
            );
            scene.add(island);
            commonIslands.push(island);
        });
    }
}



async function createCoast() {
    coast = new THREE.Group();

    const [dock, houseGroup] = await Promise.all([createDock(), createHouse(false)]);
    const ground = createGround();
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

    scene.fog = new THREE.Fog(0xcce0ff, 500, 3000);

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

    checkPaddling();

    // Plynulá změna rychlosti
    if (isPaddling) {
        currentSpeed = Math.min(currentSpeed + accelerationRate * deltaTime, maxSpeed);
        currentWaveIntensity = Math.min(currentWaveIntensity + waveIntensityChangeRate * deltaTime, MAX_WAVE_INTENSITY);
    } else {
        currentSpeed = Math.max(currentSpeed - accelerationRate * deltaTime, 0);
        currentWaveIntensity = Math.max(currentWaveIntensity - waveIntensityChangeRate * deltaTime, MIN_WAVE_INTENSITY);
    }

    // Pohyb mysterious island směrem k lodi
    if (mysteriousIsland) {
        mysteriousIsland.position.z += currentSpeed * deltaTime;
    }

    // Pohyb a recyklace běžných ostrovů
    commonIslands.forEach(island => {
        island.position.z += currentSpeed * deltaTime;
        if (island.position.z > 1000) {
            island.position.z = -5000 - Math.random() * 1000;
            island.position.x = (Math.random() - 0.5) * 2000;
        }
    });

    // Pohyb pobřeží od hráče
    if (coast) {
        coast.position.z += currentSpeed * deltaTime;
    }

    // Simulace pohybu lodi na vlnách a synchronizace s pádlováním
    if (boat) {
        const paddleSpeed = 1; // Rychlost pádlování
        const time = Date.now() * 0.005 * paddleSpeed;

        // Plynulý přechod mezi pádlováním a stáním
        const paddlingIntensity = currentSpeed / maxSpeed;
        
        // Upravené houpání lodi
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
    }

    // Aktualizace pozice hráče, aby zůstal na lodi
    if (player && boat) {
        player.position.x = Math.max(-boatWidth / 2 + 1, Math.min(boatWidth / 2 - 1, player.position.x));
        player.position.z = Math.max(-boatLength / 2 + 1, Math.min(boatLength / 2 - 1, player.position.z));
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

    water = null;
    boat = null;
    mysteriousIsland = null;
    coast = null;
    setPlayerGroundLevel(0);
}
