import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getGold, addGold, player } from "./player.js";
import { addItemToInventory, hideTooltip, inventory, INVENTORY_SIZE, showTooltip } from "./inventory.js";
import { getTranslation } from "./langUtils.js";
import {
  CELL_SIZE,
  createFireParticles,
  errorSoundBuffer,
  exitPointerLock,
  itemSoundBuffer,
  keys,
  LightManager,
  manager,
  playSound,
  requestPointerLock,
  WALL_HEIGHT,
} from "./main.js";
import { ITEM_RARITIES, ITEM_TYPES, itemDatabase } from "./itemDatabase.js";
import { textureSets } from "./globals.js";
import { getAvailableQuests, getCompletedQuests } from "./quests.js";

export function createCamp() {
  lightManager = new LightManager(scene, MAX_VISIBLE_LIGHTS);
  createGround();
  createSky();
  addStars();
  createTents();
  createMerchant();
  createArmorMerchant();
  createWalls();
  createTowers();
  createCenterTower();
  createTrees();
  createQuestBoard();
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
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load("models/merchant.glb", (gltf) => {
    const merchant = gltf.scene;
    merchant.position.set(
      merchantPosition.x,
      merchantPosition.y,
      merchantPosition.z
    );
    merchant.scale.set(1, 1, 1);
    merchant.rotation.y = 0;
    scene.add(merchant);

    // Uložíme mixer a clock do userData
    merchant.userData.mixer = new THREE.AnimationMixer(merchant);
    const action = merchant.userData.mixer.clipAction(gltf.animations[0]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    merchant.userData.clock = new THREE.Clock();

    const potionBottle = createPotionBottle();
    potionBottle.position.set(-0.1, 2.5, 0); // Umístění nad hlavou obchodníka
    merchant.add(potionBottle);

    // Uložíme potionBottle pro pozdější animaci
    merchant.userData.potionBottle = potionBottle;

    // Přidání zářivého efektu
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x8844aa) },
        offset: { value: 0.1 }, // Nastavte hodnotu posunu podle potřeby
      },
      vertexShader: `
        uniform float offset;
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 newPosition = position + vec3(0.0, offset, 0.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 0.9);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(1.0 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      glowMaterial
    );
    potionBottle.add(glowSphere);

    // Uložíme glowSphere pro případné další použití
    merchant.userData.glowSphere = glowSphere;

    // Vytvoření instance třídy Merchant
    const potionMerchant = new Merchant("Potion Merchant", createMerchantItems());
    merchant.userData.merchantInstance = potionMerchant;

    // Přidání interakční zóny
    const interactionZone = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 2, 32),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    interactionZone.position.copy(merchant.position);
    scene.add(interactionZone);

    // Přidání textu pro interakci
    const interactionText = document.createElement("div");
    interactionText.className = "interaction-text";
    interactionText.textContent = getTranslation("pressFToShop");
    interactionText.style.display = "none";
    document.body.appendChild(interactionText);

    // Uložíme interakční text do userData
    merchant.userData.interactionText = interactionText;

    // Přidáme obchodníka do pole merchants
    merchants.push(merchant);
  });
}

function createArmorMerchant() {
  const armorMerchantPosition = { x: 5.5, y: 0, z: -5.5 };
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load("models/armor_npc.glb", (gltf) => {
    const armorMerchant = gltf.scene;
    armorMerchant.position.set(
      armorMerchantPosition.x,
      armorMerchantPosition.y,
      armorMerchantPosition.z
    );
    armorMerchant.scale.set(1, 1, 1);
    armorMerchant.rotation.y = -(Math.PI / 4);
    scene.add(armorMerchant);

    // Uložíme mixer a hodiny do userData, abychom je mohli později aktualizovat
    armorMerchant.userData.mixer = new THREE.AnimationMixer(armorMerchant);
    const action = armorMerchant.userData.mixer.clipAction(gltf.animations[0]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    armorMerchant.userData.clock = new THREE.Clock();

    const armorIcon = createArmorIcon();
    armorIcon.position.set(0, 2.5, 0);
    armorMerchant.add(armorIcon);

    // Uložíme armorIcon pro pozdější aktualizaci
    armorMerchant.userData.armorIcon = armorIcon;

    // Vytvoření instance obchodníka
    const armorMerchantInstance = new Merchant(
      "Armor Merchant",
      createArmorMerchantItems()
    );
    armorMerchant.userData.merchantInstance = armorMerchantInstance;
    // Přidání interakční zóny
    const interactionZone = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 2, 32),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    interactionZone.position.copy(armorMerchant.position);
    scene.add(interactionZone);

    // Přidání interakční zóny a textu
    const interactionText = document.createElement("div");
    interactionText.className = "interaction-text";
    interactionText.textContent = getTranslation("pressFToShop");
    interactionText.style.display = "none";
    document.body.appendChild(interactionText);

    // Uložíme interakční text do userData
    armorMerchant.userData.interactionText = interactionText;

    // Přidáme obchodníka do pole merchants
    merchants.push(armorMerchant);

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
  createTorchOnWall(-5, -15, { dx: 0, dz: 1 }); // Severní zeď
  createTorchOnWall(5, -15, { dx: 0, dz: 1 }); // Severní zeď
  createTorchOnWall(5, 15, { dx: 0, dz: -1 }); // Jižní zeď
  createTorchOnWall(-5, 15, { dx: 0, dz: -1 }); // Jižní zeď
  createTorchOnWall(-15, 5, { dx: 1, dz: 0 }); // Západní zeď
  createTorchOnWall(-15, -5, { dx: 1, dz: 0 }); // Západní zeď
  createTorchOnWall(15, 5, { dx: -1, dz: 0 }); // Východní zeď
  createTorchOnWall(15, -5, { dx: -1, dz: 0 }); // Východní zeď
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
    map: wallTexture,
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

export function createTorchOnWall(x, z, dir) {
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
    map: wallTexture,
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

export function createTorchOnCenterTower(x, z, towerHeight, dir, torchColor) {
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

  const fire = createFireParticles(torchColor || textureSets[1].torchColor.particles);
  fire.position.copy(torch.position).add(new THREE.Vector3(0, 0.25, 0));
  scene.add(fire);

  const light = new THREE.PointLight(
    torchColor || textureSets[1].torchColor.light,
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
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load("models/Tree.glb", (gltf) => {
    const treeModel = gltf.scene;
    const treePositions = generateTreePositions();

    const meshes = [];

    // Shromáždění všech meshů z modelu stromu
    treeModel.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });

    meshes.forEach((mesh) => {
      // Klonování geometrie a aplikace původní transformace
      const geometry = mesh.geometry.clone();
      geometry.applyMatrix4(mesh.matrixWorld);
      const material = mesh.material;

      const instancedMesh = new THREE.InstancedMesh(geometry, material, treePositions.length);

      const dummy = new THREE.Object3D();
      treePositions.forEach((pos, i) => {
        const randomHeight = 0.8 + Math.random() * 0.2;
        dummy.position.set(pos.x, 0, pos.z);
        dummy.scale.set(1, randomHeight, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      scene.add(instancedMesh);
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
  const leftWall = new THREE.Mesh(
    wallGeometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
  leftWall.position.set(x, wallHeight / 2, z);
  leftWall.rotation.y = leftEdgeAngle + Math.PI / 2;
  scene.add(leftWall);
  walls.push(leftWall);

  // Druhá zeď (pravá strana)
  const rightWall = new THREE.Mesh(
    wallGeometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
  rightWall.position.set(x, wallHeight / 2, z);
  rightWall.rotation.y = rightEdgeAngle - Math.PI / 2;
  scene.add(rightWall);
  walls.push(rightWall);
}

export class Merchant {
  constructor(name, items) {
    this.name = name;
    this.items = items;
  }

  getModalId() {
    return 'shopModal' + "_" + this.name;
  }

  showShop() {
    hideTooltip();
    exitPointerLock();
    if (document.getElementById('shopModal')) {
      return; // Obchod je již otevřen, neotevírejte ho znovu
    }

    const shopModal = document.createElement('div');
    shopModal.id = this.getModalId();
    shopModal.className = 'shop-modal';
    shopModal.innerHTML = `
      <div class="shop-content">
        <span class="close-button">&times;</span>
        <div class="shop-header">
          <h2>${this.name}</h2>
          <div class="gold-display">
            <img src="gold-coin.png" alt="Gold" class="gold-icon">
            <span id="shopGoldDisplay"></span>
          </div>
        </div>
        <div id="shopGrid" class="shop-grid"></div>
      </div>
    `;
    document.body.appendChild(shopModal);

    const closeButton = shopModal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      this.closeShop();
    });

    const shopGrid = document.getElementById('shopGrid');
    this.items.forEach(item => {
      const itemElement = this.createShopItemElement(item);
      shopGrid.appendChild(itemElement);
    });

    this.updateShopGoldDisplay();

    document.addEventListener('keydown', this.handleEscapeKey);
  }

  updateShopGoldDisplay() {
    const goldDisplay = document.getElementById('shopGoldDisplay');
    if (goldDisplay) {
      goldDisplay.textContent = getGold().toLocaleString();
    }
  }

  closeShop() {
    hideTooltip();
    const shopModal = document.getElementById(this.getModalId());
    if (shopModal) {
      requestPointerLock();
      shopModal.remove();
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }

  createShopItemElement(item) {
    const itemElement = document.createElement("div");
    itemElement.className = `shop-item item-${item.rarity}`;
    itemElement.style.backgroundImage = `url(${item.icon})`;

    itemElement.addEventListener("mouseover", (event) =>
      showTooltip(event, item)
    );
    itemElement.addEventListener("mouseout", hideTooltip);
    itemElement.addEventListener("click", () => this.buyItem(item));

    if (item.stackable && item.count > 1) {
      const itemCount = document.createElement('div');
      itemCount.className = 'item-count';
      itemCount.textContent = item.count;
      itemElement.appendChild(itemCount);
    }

    return itemElement;
  }

  buyItem(item) {
    if (getGold() < (item.buyPrice * item.count)) {
      playSound(errorSoundBuffer);
      this.showMessage(getTranslation("notEnoughGold"));
      return;
    }

    if (inventory.filter((i) => i !== null).length >= INVENTORY_SIZE) {
      playSound(errorSoundBuffer);
      this.showMessage(getTranslation("inventoryFull"));
      return;
    }

    addGold(-item.buyPrice * item.count);
    playSound(itemSoundBuffer);
    addItemToInventory({ ...item, id: crypto.randomUUID() });
    this.updateShopGoldDisplay();
    this.showMessage(getTranslation("itemPurchased"));
  }

  showMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "shop-message";
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }

  handleEscapeKey(event) {
    if (event.key === "Escape") {
      //TODO: zavřít obchod 
      //this.closeShop();
    }
  }
}

function createMerchantItem(itemKey, count = 1) {
  const item = { ...itemDatabase[itemKey], count };
  item.id = crypto.randomUUID();
  return item;
}

export function createMerchantItems() {
  return [
    createMerchantItem("healthPotion", 1),
    createMerchantItem("healthPotion", 10),
    createMerchantItem("manaPotion", 1),
    createMerchantItem("manaPotion", 10),
    createMerchantItem("skillResetPotion", 1),
  ];
}

export function checkMerchantInteraction(merchant) {
  const distance = player.position.distanceTo(merchant.position);
  const interactionText = merchant.userData.interactionText;
  const merchantInstance = merchant.userData.merchantInstance;

  if (distance < 2) {
    // Vytvoříme vektor pro pozici textu nad obchodníkem
    const textPosition = merchant.position.clone().add(new THREE.Vector3(0, 2, 0));

    // Projektujeme pozici textu do prostoru kamery
    const vector = textPosition.project(camera);

    // Zkontrolujeme, zda je obchodník v záběru kamery
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
        if (document.getElementById(merchantInstance.getModalId())) {
          merchantInstance.closeShop();
        } else {
          merchantInstance.showShop();
        }
        keys.f = false; // Resetujeme stav klávesy
      }
    } else {
      interactionText.style.display = "none";
    }
  } else {
    if (document.getElementById(merchantInstance.getModalId())) {
      merchantInstance.closeShop();
    }
    interactionText.style.display = "none";
  }
}


export function createArmorMerchantItems() {
  const armorMerchantItems = [];

  for (const [itemKey, item] of Object.entries(itemDatabase)) {
    if (item.type === ITEM_TYPES.ARMOR && item.rarity === ITEM_RARITIES.COMMON) {
      armorMerchantItems.push(createMerchantItem(itemKey));
    }
  }

  armorMerchantItems.sort((a, b) => a.requiredLevel - b.requiredLevel);

  return armorMerchantItems;
}

function createPotionBottle() {
  const bottleGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.3, 16);
  const neckGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.1, 16);
  const corkGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);

  const bottleMaterial = new THREE.MeshPhongMaterial({ color: 0x8844aa, transparent: true, opacity: 0.8 });
  const corkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

  const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
  const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
  const cork = new THREE.Mesh(corkGeometry, corkMaterial);

  neck.position.y = 0.2;
  cork.position.y = 0.3;

  const potionBottle = new THREE.Group();
  potionBottle.add(bottle);
  potionBottle.add(neck);
  potionBottle.add(cork);

  return potionBottle;
}


function createArmorIcon() {
  // Vytvoříme skupinu pro celou ikonu
  const armorIconGroup = new THREE.Group();

  // Vytvoříme štít
  const shieldGeometry = new THREE.CircleGeometry(0.2, 32);
  const shieldMaterial = new THREE.MeshPhongMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide }); // Stříbrná barva
  const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);

  // Přidáme "lem" štítu
  const rimGeometry = new THREE.TorusGeometry(0.2, 0.02, 16, 100);
  const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700, side: THREE.DoubleSide }); // Zlatá barva
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);

  // Přidáme "emblém" na štít
  const emblemGeometry = new THREE.CircleGeometry(0.1, 32);
  const emblemMaterial = new THREE.MeshPhongMaterial({ color: 0x8B0000, side: THREE.DoubleSide }); // Tmavě červená
  const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial);
  emblem.position.z = 0.01; // Posuneme emblém mírně dopředu

  // Přidáme všechny části do skupiny
  armorIconGroup.add(shield);
  armorIconGroup.add(rim);
  armorIconGroup.add(emblem);

  // Přidáme zářivý efekt
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xFFFFFF) },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(color, 1.0) * intensity;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    glowMaterial
  );
  armorIconGroup.add(glowSphere);

  return armorIconGroup;
}


function createQuestBoard() {
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load("models/QuestBoard.glb", (gltf) => {
      const questBoard = gltf.scene;
      questBoard.position.set(
          -11,  // Upravte pozici podle potřeby
          0,
          2
      );
      questBoard.scale.set(2, 2, 2);  // Upravte měřítko podle potřeby
      questBoard.rotation.y = Math.PI / 2; // Otočení nástěnky podle potřeby
      questBoard.name = "questBoard";  // Důležité pro pozdější vyhledávání
      scene.add(questBoard);

        // Přidání neviditelné zdi
    const wallWidth = 1; // Šířka zdi
    const wallHeight = 3; // Výška zdi
    const wallDepth = 0.1; // Hloubka zdi

    const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
    const wallMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const invisibleWall = new THREE.Mesh(wallGeometry, wallMaterial);

    // Umístění zdi těsně za nástěnkou
    invisibleWall.position.set(
      questBoard.position.x - 0.1, // Mírně posunuto za nástěnku
      wallHeight / 2, // Střed výšky zdi
      questBoard.position.z
    );
    invisibleWall.rotation.y = questBoard.rotation.y;

    scene.add(invisibleWall);
    walls.push(invisibleWall); // Přidání do pole zdí pro detekci kolizí

      // Přidání interakční zóny
      const interactionZone = new THREE.Mesh(
          new THREE.CylinderGeometry(2, 2, 2, 32),
          new THREE.MeshBasicMaterial({ visible: false })
      );
      interactionZone.position.copy(questBoard.position);
      scene.add(interactionZone);

      // Přidání textu pro interakci
      const interactionText = document.createElement("div");
      interactionText.className = "interaction-text";
      interactionText.textContent = getTranslation("pressFToInteractWithQuestBoard");
      interactionText.style.display = "none";
      document.body.appendChild(interactionText);

      // Uložíme interakční text do userData
      questBoard.userData.interactionText = interactionText;

      // Vytvoření a přidání otazníku/vykřičníku
      const questIndicator = createQuestIndicator();
      questIndicator.position.set(0, 2.5, 0); // Umístění nad nástěnkou
      questBoard.add(questIndicator);

      // Uložíme questIndicator pro pozdější aktualizaci
      questBoard.userData.questIndicator = questIndicator;
  });
}

function createQuestIndicator() {
  const group = new THREE.Group();

  const loader = new FontLoader();


  const exclamationGeometry = new THREE.Group();

  loader.load('helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('!', {
      font: font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });

    // Centrování geometrie
    textGeometry.center();

    const exclamationMark = new THREE.Mesh(
      textGeometry,
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5,
      })
    );

    exclamationGeometry.add(exclamationMark);
  });

  // Vytvoření geometrie pro otazník pomocí TextGeometry
  const questionGeometry = new THREE.Group();

  loader.load('helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('?', {
      font: font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });

    // Centrování geometrie
    textGeometry.center();

    const questionMark = new THREE.Mesh(
      textGeometry,
      new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5,
      })
    );

    questionGeometry.add(questionMark);
  });


  // Přidání geometrií do skupiny
  group.add(exclamationGeometry);
  group.add(questionGeometry);

  // Nastavení viditelnosti (zpočátku jsou oba skryté)
  exclamationGeometry.visible = false;
  questionGeometry.visible = false;

  // Přidání zářivého efektu
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      offset: { value: 0.0 },
    },
    vertexShader: `
      uniform float offset;
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec3 newPosition = position + vec3(0.0, offset, 0.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 0.9);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(1.0 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(color, 1.0) * intensity;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    glowMaterial
  );
  group.add(glowSphere);

  return group;
}


export function updateQuestIndicator(questBoard) {
  const indicator = questBoard.userData.questIndicator;
  if (!indicator) return;

  const exclamationGeometry = indicator.children[0];
  const questionGeometry = indicator.children[1];
  const glowSphere = indicator.children[2];

  if (getCompletedQuests().length > 0) {
    exclamationGeometry.visible = false;
    questionGeometry.visible = true;
    glowSphere.material.uniforms.color.value.setHex(0x00ff00);
    indicator.visible = true;
  } else if (getAvailableQuests().length > 0) {
    exclamationGeometry.visible = true;
    questionGeometry.visible = false;
    glowSphere.material.uniforms.color.value.setHex(0xffff00);
    indicator.visible = true;
  } else {
    indicator.visible = false;
  }
}