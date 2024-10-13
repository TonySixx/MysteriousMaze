import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { player, updatePlayerPosition } from "./player.js";

let scene, camera, renderer, water, sky;
let boat, island;

export function loadSeaScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createSky();
    createWater();
    createBoat();
    createIsland();
    createLighting();

    camera.position.set(0, 5, 10);
    camera.lookAt(scene.position);

    animate();
}

// Funkce createSky, createWater a createLighting jsou stejné jako v Coast.js

function createBoat() {
    const loader = new GLTFLoader();
    loader.load('models/boat.glb', (gltf) => {
        boat = gltf.scene;
        boat.position.set(0, 0, 0);
        scene.add(boat);
        
        // Přidáme neviditelné bariéry kolem loďky
        const barrierGeometry = new THREE.BoxGeometry(5, 2, 10);
        const barrierMaterial = new THREE.MeshBasicMaterial({ visible: false });
        const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
        boat.add(barrier);
    });
}

function createIsland() {
    const loader = new GLTFLoader();
    loader.load('models/island.glb', (gltf) => {
        island = gltf.scene;
        island.position.set(0, 0, -1000);  // Umístíme ostrov daleko před loďku
        scene.add(island);
    });
}

function animate() {
    requestAnimationFrame(animate);

    water.material.uniforms['time'].value += 1.0 / 60.0;

    updatePlayerPosition();
    moveBoatTowardsIsland();

    renderer.render(scene, camera);
}

function moveBoatTowardsIsland() {
    if (boat && island) {
        const speed = 0.1;
        boat.position.z -= speed;
        camera.position.z -= speed;
        
        // Pokud je loďka blízko ostrova, dokončíme quest
        if (boat.position.z <= -990) {
            completeQuest();
        }
    }
}

function completeQuest() {
    // Tady přidáme logiku pro dokončení questu
    // Například:
    // updateQuestProgress('mysteriousIsle', (quest) => {
    //     quest.progress = '1/1';
    //     quest.isCompleted = true;
    //     return quest;
    // });
    // showMessage(getTranslation('questCompleted', 'Mysterious Isle'));
}
