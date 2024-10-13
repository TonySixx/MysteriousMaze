import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { player } from "./player.js";
import { showMessage } from "./utils.js";
import { getTranslation } from "./langUtils.js";
import { loadSeaScene } from "./Sea.js";
import { LightManager } from "./main.js";

let water, sky;
let dock, boat;
let interactionMessage;

export function createCoastScene() {
    lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
    createSky();
    createWater();
    createDock();
    createBoat();
    createLighting();

    camera.position.set(0, 5, 10);
    camera.lookAt(scene.position);
}

function createSky() {
    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);

    const sun = new THREE.Vector3();
    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = 10;
    uniforms['rayleigh'].value = 2;
    uniforms['mieCoefficient'].value = 0.005;
    uniforms['mieDirectionalG'].value = 0.8;

    const phi = THREE.MathUtils.degToRad(90 - 2);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    uniforms['sunPosition'].value.copy(sun);
}

function createWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {
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
    scene.add(water);
}

function createDock() {
    const loader = new GLTFLoader();
    loader.load('models/Dock.glb', (gltf) => {
        dock = gltf.scene;
        dock.position.set(0, 0, -5);
        scene.add(dock);
    });
}

function createBoat() {
    const loader = new GLTFLoader();
    loader.load('models/Boat.glb', (gltf) => {
        boat = gltf.scene;
        boat.scale.set(4, 4, 4);
        boat.position.set(8, 0.9, -4);
        scene.add(boat);
    });
}

function createLighting() {
   
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
}

export function animateCoast() {
    if (water) {
        water.material.uniforms['time'].value += 1.0 / 60.0;
    }
    checkBoatInteraction();
}

function checkBoatInteraction() {
    if (boat && player) {
        const distance = player.position.distanceTo(boat.position);
        if (distance < 2) {
            if (!interactionMessage) {
                interactionMessage = showMessage(getTranslation('enterBoat'), true);
            }
            if (keys.f) {
                //hideMessage(interactionMessage);
                loadSeaScene();
            }
        } else if (interactionMessage) {
            //hideMessage(interactionMessage);
            interactionMessage = null;
        }
    }
}

export function clearCoastScene() {
    if (water) scene.remove(water);
    if (sky) scene.remove(sky);
    if (dock) scene.remove(dock);
    if (boat) scene.remove(boat);
    
    water = null;
    sky = null;
    dock = null;
    boat = null;
    
}
