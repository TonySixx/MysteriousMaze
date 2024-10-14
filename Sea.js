import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { player, setPlayerGroundLevel, updatePlayerPosition } from "./player.js";
import { createSky, addStars } from "./others/environemntUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { audioLoader, CELL_SIZE, manager } from "./main.js";
import { LightManager } from "./rendering/lightManager.js";
import { createDock, createHouse, createGround, createMountains } from "./Coast.js";

let water;
let boat, mysteriousIsland, coast;
let commonIslands = [];
const islandSpeed = 3;
const coastSpeed = 3;
var seaSound;

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
    setPlayerGroundLevel(1.5);

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

function createBoat() {
    const loader = new GLTFLoader(manager);
    loader.load('models/Boat.glb', (gltf) => {
        boat = gltf.scene;
        boat.scale.set(4, 4, 4);
        boat.position.set(0, 1, 0);  // Zvýšili jsme pozici loďky
        scene.add(boat);
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
const boatLength = 12.5;
const boatWidth = 5;


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

export function animateSea(deltaTime) {
    if (water) {
        water.material.uniforms['time'].value += 0.3 / 60.0;
    }

    // Pohyb mysterious island směrem k lodi
    if (mysteriousIsland) {
        mysteriousIsland.position.z += islandSpeed * deltaTime;
    }

    // Pohyb a recyklace běžných ostrovů
    commonIslands.forEach(island => {
        island.position.z += islandSpeed * deltaTime;
        if (island.position.z > 1000) {  // Pokud ostrov zmizí za lodí
            island.position.z = -5000 - Math.random() * 1000;  // Přesuneme ho zpět daleko před loď
            island.position.x = (Math.random() - 0.5) * 2000;  // Nová náhodná X pozice
        }
    });

    // Pohyb pobřeží od hráče
    if (coast) {
        coast.position.z += coastSpeed * deltaTime;
    }

    // Simulace pohybu lodi na vlnách
    if (boat) {
        boat.position.y = 1.1 + Math.sin(Date.now() * 0.001) * 0.2;  // Upravili jsme základní výšku
        boat.rotation.x = Math.sin(Date.now() * 0.001) * 0.02;
        boat.rotation.z = Math.sin(Date.now() * 0.002) * 0.02;
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

    water = null;
    boat = null;
    mysteriousIsland = null;
    coast = null;
}
