import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { manager } from "../main";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";


export function createTrees(generateTreePositionsFunc) {
    const gltfLoader = new GLTFLoader(manager);
    gltfLoader.load("models/Tree.glb", (gltf) => {
      const treeModel = gltf.scene;
      const treePositions = generateTreePositionsFunc();
  
      const geometries = [];
      const materials = [];
      const materialMap = new Map();
  
      // Collect all geometries and materials from the tree model
      treeModel.traverse((child) => {
        if (child.isMesh) {
          // Update the world matrix of the mesh
          child.updateWorldMatrix(true, false);
  
          // Clone the geometry and apply the mesh's world matrix
          const geometry = child.geometry.clone();
          geometry.applyMatrix4(child.matrixWorld);
  
          // Handle multiple materials
          let materialIndex;
          const materialKey = child.material.uuid;
  
          if (materialMap.has(materialKey)) {
            materialIndex = materialMap.get(materialKey);
          } else {
            materials.push(child.material);
            materialIndex = materials.length - 1;
            materialMap.set(materialKey, materialIndex);
          }
  
          geometry.userData = { materialIndex };
          geometries.push(geometry);
        }
      });
  
      // Merge all geometries into one, preserving material groups
      const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, true);
  
      // Create an InstancedMesh with the merged geometry and materials
      const instancedMesh = new THREE.InstancedMesh(mergedGeometry, materials, treePositions.length);
  
      const dummy = new THREE.Object3D();
      treePositions.forEach((pos, i) => {
        const randomHeight = 0.8 + Math.random() * 0.2;
        dummy.position.set(pos.x, pos.y || 0, pos.z);
        dummy.scale.set(1, randomHeight, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });
  
      instancedMesh.instanceMatrix.needsUpdate = true;
      scene.add(instancedMesh);
    });
  }

  export function createSky() {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x151a5c) },
        bottomColor: { value: new THREE.Color(0x000000) },
        offset: { value: 20 },
        exponent: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);
  }
  
  export function addStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
  
    for (let i = 0; i < starCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const distance = 400;
  
      positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = distance * Math.cos(theta);
    }
  
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true,
    });
  
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  }

  export function createCommonIslands(islandArray, yPosition=-0.5) {
    const islandCount = 15;  // Počet běžných ostrovů
    const loader = new GLTFLoader(manager);
    var seed = 12345;  // Pevný seed pro generování náhodných čísel
    
    function seededRandom() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    for (let i = 0; i < islandCount; i++) {
        loader.load('models/island_1.glb', (gltf) => {
            const island = gltf.scene;
            
            // Generování X pozice, která nikdy nebude mezi -10 a 10
            let xPosition;
            do {
                xPosition = (seededRandom() - 0.5) * 1000;
            } while (Math.abs(xPosition) < 10);
            
            island.position.set(
                xPosition,
                yPosition,
                -400 - seededRandom() * 1000  // Náhodná Z pozice za mysterious island
            );
            island.rotation.y = seededRandom() * Math.PI * 2;
            island.scale.set(
                8 + seededRandom() * 5,  // Náhodná velikost
                8 + seededRandom() * 5,
                8 + seededRandom() * 5
            );
            scene.add(island);
            islandArray.push(island);
        });
    }
}
