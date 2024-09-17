import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  CELL_SIZE,
  createFireParticles,
  LightManager,
  MAX_VISIBLE_LIGHTS,
  textureSets,
  WALL_HEIGHT,
} from "./main.js";


export function createCamp() {
  lightManager = new LightManager(scene,MAX_VISIBLE_LIGHTS);
  createGround();
  createSky();
  addStars();
  createTents();
  createMerchant();
  createWalls();
  createTowers();
  createCenterTower();
  createTrees();
  addLighting();
}

function createGround() {
  const loader = new THREE.TextureLoader();
  const floorTexture = loader.load(textureSets[2].floorTexture);
  floorTexture.colorSpace = THREE.SRGBColorSpace;
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(15, 15);

  const groundGeometry = new THREE.PlaneGeometry(30, 30);
  const groundMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
}

function createSky() {
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

function addStars() {
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

function createTents() {
  const loader = new THREE.TextureLoader();
  const tentTexture = loader.load("textures/tent.jpg");
  tentTexture.colorSpace = THREE.SRGBColorSpace;
  tentTexture.wrapS = THREE.RepeatWrapping;
  tentTexture.wrapT = THREE.RepeatWrapping;
  tentTexture.repeat.set(5.14, 2.5);

  const thetaLength = (5 * Math.PI) / 2.85; 
  const thetaStart = -thetaLength / 2; // Centrum otvoru

  const tentGeometry = new THREE.CylinderGeometry(
    0,
    3,
    5,
    8,
    1,
    true,
    thetaStart,
    thetaLength
  );

  const tentMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    map: tentTexture,
    side: THREE.DoubleSide,
  });

  const tentPositions = [
    { x: -7.5, z: -7.5 },
    { x: 7.5, z: -7.5 },
    { x: -7.5, z: 7.5 },
    { x: 7.5, z: 7.5 },
  ];

  tentPositions.forEach((pos) => {
    // Vytvoříme viditelný stan
    const tent = new THREE.Mesh(tentGeometry, tentMaterial);
    tent.position.set(pos.x, 2, pos.z);

    // Otočíme stan tak, aby otvor směřoval ke středu tábora
    const angle = Math.atan2(pos.x, pos.z);
    tent.rotation.y = angle;

    scene.add(tent);

    // Vytvoříme neviditelné zdi kolem stanu
    createTentWalls(tent, pos.x, pos.z, angle);
  });
}



function createMerchant() {
  const merchantPosition = { x: 0, y: 0, z: 2 };
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("merchant.glb", (gltf) => {
    const merchant = gltf.scene;
    merchant.position.set(
      merchantPosition.x,
      merchantPosition.y,
      merchantPosition.z
    );
    merchant.scale.set(1, 1, 1);
    merchant.rotation.y = 0;
    scene.add(merchant);

    const mixer = new THREE.AnimationMixer(merchant);
    const action = mixer.clipAction(gltf.animations[0]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    const clock = new THREE.Clock();
    function updateMerchantAnimation() {
      const delta = clock.getDelta();
      mixer.update(delta);
      requestAnimationFrame(updateMerchantAnimation);
    }
    updateMerchantAnimation();
  });
}

function createWalls() {
  const loader = new THREE.TextureLoader();
  const wallTexture = loader.load(textureSets[0].wallTexture);
  wallTexture.colorSpace = THREE.SRGBColorSpace;

  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

  for (let i = -15; i <= 15; i += CELL_SIZE) {
    createWall(i, WALL_HEIGHT / 2, -15, wallGeometry, wallMaterial);
    createWall(i, WALL_HEIGHT / 2, 15, wallGeometry, wallMaterial);
    createWall(-15, WALL_HEIGHT / 2, i, wallGeometry, wallMaterial);
    createWall(15, WALL_HEIGHT / 2, i, wallGeometry, wallMaterial);
  }
    // Přidáme pochodně na zdi
  createTorchOnWall(-5, -15, { dx: 0, dz: 1 });  // Severní zeď
  createTorchOnWall(5, -15, { dx: 0, dz: 1 });  // Severní zeď 
  createTorchOnWall(5, 15, { dx: 0, dz: -1 });  // Jižní zeď
  createTorchOnWall(-5, 15, { dx: 0, dz: -1 });  // Jižní zeď
  createTorchOnWall(-15, 5, { dx: 1, dz: 0 });  // Západní zeď
  createTorchOnWall(-15, -5, { dx: 1, dz: 0 });  // Západní zeď
  createTorchOnWall(15, 5, { dx: -1, dz: 0 });  // Východní zeď
  createTorchOnWall(15, -5, { dx: -1, dz: 0 });  // Východní zeď
  
}

function createWall(x, y, z, geometry, material) {
  const wall = new THREE.Mesh(geometry, material);
  wall.position.set(x, y, z);
  scene.add(wall);
  walls.push(wall);
}

function createTowers() {
  const towerHeight = 4;
  const towerPositions = [
    { x: -15, z: -15 },
    { x: -15, z: 15 },
    { x: 15, z: -15 },
    { x: 15, z: 15 },
  ];

  const loader = new THREE.TextureLoader();
  const wallTexture = loader.load(textureSets[0].wallTexture);
  wallTexture.colorSpace = THREE.SRGBColorSpace;

  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture
  });

  towerPositions.forEach((pos) => {
    createTower(pos.x, pos.z, towerHeight, wallGeometry, wallMaterial);
    createTorchOnTower(pos.x, pos.z, towerHeight);
  });
}

function createTower(x, z, height, geometry, material) {
  for (let i = 0; i < height; i++) {
    const towerBlock = new THREE.Mesh(geometry, material);
    towerBlock.position.set(x, WALL_HEIGHT / 2 + i * WALL_HEIGHT, z);
    scene.add(towerBlock);
    walls.push(towerBlock);
  }
}

function createTorchOnTower(x, z, towerHeight) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const torch = new THREE.Mesh(torchGeometry, torchMaterial);
  torch.position.set(x, WALL_HEIGHT * towerHeight + 0.5, z);
  scene.add(torch);

  const fire = createFireParticles(textureSets[1].torchColor.particles);
  fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
  scene.add(fire);

  const light = new THREE.PointLight(
    textureSets[1].torchColor.light,
    1.5,
    CELL_SIZE * 4
  );
  light.position.copy(torch.position);
  lightManager.addLight(light);
  torches.push({ torch, fire, light });
}

function createTorchOnWall(x, z, dir) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const torch = new THREE.Mesh(torchGeometry, torchMaterial);

  torch.position.set(
    x + dir.dx * CELL_SIZE * 0.5,
    WALL_HEIGHT - 1.2,
    z + dir.dz * CELL_SIZE * 0.5
  );

  const angle = Math.atan2(dir.dz, dir.dx);
  torch.rotation.y = angle;
  torch.rotation.z = Math.PI;

  scene.add(torch);

  const fire = createFireParticles(textureSets[1].torchColor.particles);
  fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
  scene.add(fire);

  const light = new THREE.PointLight(
    textureSets[1].torchColor.light,
    1.5,
    CELL_SIZE * 4
  );
  const lightOffsetFactor = CELL_SIZE * 0.6 + 0.3;

  light.position.set(
    x + dir.dx * lightOffsetFactor,
    WALL_HEIGHT - 0.7,
    z + dir.dz * lightOffsetFactor
  );

  lightManager.addLight(light);
  torches.push({ torch, fire, light });
}

function createCenterTower() {
  const centerTowerHeight = 2;
  const centerTowerPosition = { x: 0, z: 0 };

  const loader = new THREE.TextureLoader();
  const wallTexture = loader.load(textureSets[0].wallTexture);
  wallTexture.colorSpace = THREE.SRGBColorSpace;

  const wallGeometry = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture
  });

  for (let i = 0; i < centerTowerHeight; i++) {
    const towerBlock = new THREE.Mesh(wallGeometry, wallMaterial);
    towerBlock.position.set(
      centerTowerPosition.x,
      WALL_HEIGHT / 2 + i * WALL_HEIGHT,
      centerTowerPosition.z
    );
    scene.add(towerBlock);
    walls.push(towerBlock);
  }

  const centerTorchPositions = [
    { dx: 1, dz: 0 },
    { dx: -1, dz: 0 },
    { dx: 0, dz: 1 },
    { dx: 0, dz: -1 },
  ];

  centerTorchPositions.forEach((dir) => {
    createTorchOnCenterTower(
      centerTowerPosition.x,
      centerTowerPosition.z,
      centerTowerHeight / 1.4,
      dir
    );
  });
}

function createTorchOnCenterTower(x, z, towerHeight, dir) {
  const torchGeometry = new THREE.CylinderGeometry(0.04, 0.1, 0.65, 8);
  const torchMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const torch = new THREE.Mesh(torchGeometry, torchMaterial);
  torch.position.set(
    x + dir.dx * (CELL_SIZE / 2),
    WALL_HEIGHT * towerHeight - 1.2,
    z + dir.dz * (CELL_SIZE / 2)
  );

  const angle = Math.atan2(dir.dz, dir.dx);
  torch.rotation.y = angle;
  torch.rotation.z = Math.PI;

  scene.add(torch);

  const fire = createFireParticles(textureSets[1].torchColor.particles);
  fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
  scene.add(fire);

  const light = new THREE.PointLight(
    textureSets[1].torchColor.light,
    1.5,
    CELL_SIZE * 4
  );
  const lightOffsetFactor = 0.5;

  light.position.set(
    torch.position.x + dir.dx * lightOffsetFactor,
    torch.position.y + 0.5,
    torch.position.z + dir.dz * lightOffsetFactor
  );

  lightManager.addLight(light);
  torches.push({ torch, fire, light });
}

function createTrees() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("Tree.glb", (gltf) => {
    const treeModel = gltf.scene;
    const treePositions = generateTreePositions();

    treePositions.forEach((pos) => {
      const tree = treeModel.clone();
      tree.position.set(pos.x, 0, pos.z);
      const randomHeight = 0.8 + Math.random() * 0.2;
      tree.scale.set(1, randomHeight, 1);
      scene.add(tree);
    });
  });
}

function generateTreePositions() {
  const treePositions = [];
  const treeDistance = 5;
  const treeInterval = 5;

  for (let x = -15; x <= 15; x += treeInterval) {
    treePositions.push({ x: x, z: -15 - treeDistance });
    treePositions.push({ x: x, z: 15 + treeDistance });
  }

  for (let z = -15; z <= 15; z += treeInterval) {
    treePositions.push({ x: 15 + treeDistance, z: z });
    treePositions.push({ x: -15 - treeDistance, z: z });
  }

  return treePositions;
}

function addLighting() {
  const ambientLight = new THREE.AmbientLight(0x443c57, 1);
  scene.add(ambientLight);

  const moonLight = new THREE.DirectionalLight(0xffffff, 0.2);
  moonLight.position.set(20, 5, 20);
  scene.add(moonLight);
}

function createTentWalls(tent, x, z, angle) {
  const wallHeight = 5;
  const wallThickness = 0.2;
  const tentRadius = 3;

  // Úhly pro výpočet pozic zdí
  const thetaStart = tent.geometry.parameters.thetaStart;
  const thetaLength = tent.geometry.parameters.thetaLength;

  // Úhel středu otvoru
  const openingCenterAngle = angle;

  // Úhly okrajů otvoru
  const leftEdgeAngle = angle + thetaStart;
  const rightEdgeAngle = angle + thetaStart + thetaLength;

  // Vytvoříme dvě zdi pokrývající stěny stanu mimo otvor
  const wallGeometry = new THREE.BoxGeometry(
    tentRadius * 2,
    wallHeight,
    wallThickness
  );

  // První zeď (levá strana)
  const leftWall = new THREE.Mesh(wallGeometry, new THREE.MeshBasicMaterial({ visible: false }));
  leftWall.position.set(x, wallHeight / 2, z);
  leftWall.rotation.y = leftEdgeAngle + Math.PI / 2;
  scene.add(leftWall);
  walls.push(leftWall);

  // Druhá zeď (pravá strana)
  const rightWall = new THREE.Mesh(wallGeometry, new THREE.MeshBasicMaterial({ visible: false }));
  rightWall.position.set(x, wallHeight / 2, z);
  rightWall.rotation.y = rightEdgeAngle - Math.PI / 2;
  scene.add(rightWall);
  walls.push(rightWall);
}

