import * as THREE from "three";

export class LightManager {
    constructor(scene, maxVisibleLights, maxDistance = 50, clusterSize = 15, frustumOffset = 0.1) {
      this.scene = scene;
      this.maxVisibleLights = maxVisibleLights;
      this.maxDistance = maxDistance;
      this.clusterSize = clusterSize;
      this.frustumOffset = frustumOffset; // Nový parametr pro offset frustumu
      this.lights = [];
      this.lightClusters = new Map();
    }
  
    addLight(light) {
      this.lights.push(light);
      this.scene.add(light);
      light.visible = false;
    }
  
    assignLightsToClusters() {
      this.lightClusters.clear();
      for (let i = 0; i < this.lights.length; i++) {
        const clusterKey = this.getClusterKey(this.lights[i].position);
        if (!this.lightClusters.has(clusterKey)) {
          this.lightClusters.set(clusterKey, []);
        }
        this.lightClusters.get(clusterKey).push(this.lights[i]);
      }
    }
  
    getClusterKey(position) {
      const x = Math.floor(position.x / this.clusterSize);
      const y = Math.floor(position.y / this.clusterSize);
      const z = Math.floor(position.z / this.clusterSize);
      return `${x}_${y}_${z}`;
    }
  
    update(playerPosition, camera) {
      // Aktualizujeme clustery světel
      this.assignLightsToClusters();
  
      const playerCluster = this.getClusterKey(playerPosition);
      const nearbyClusters = this.getNearbyClusters(playerCluster);
  
      // Vypneme všechna světla
      this.lights.forEach((light) => (light.visible = false));
  
      // Připravíme frustum pro culling s offsetem
      const frustum = new THREE.Frustum();
      const cameraViewProjectionMatrix = new THREE.Matrix4();
      camera.updateMatrixWorld(); // Ujistíme se, že matice kamery je aktuální
      cameraViewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
  
      // Upravená matice projekce pro zahrnutí offsetu
      const offsetMatrix = new THREE.Matrix4();
      offsetMatrix.makeScale(
        1 + this.frustumOffset,
        1 + this.frustumOffset,
        1 + this.frustumOffset
      );
      cameraViewProjectionMatrix.multiply(offsetMatrix);
  
      frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);
  
      // Shromáždíme kandidátní světla z blízkých clusterů
      let candidateLights = [];
  
      for (const cluster of nearbyClusters) {
        const lightsInCluster = this.lightClusters.get(cluster) || [];
        candidateLights.push(...lightsInCluster);
      }
  
      // Rozdělíme světla na ta v (rozšířeném) frustumu a mimo něj
      let lightsInFrustum = [];
      let lightsOutOfFrustum = [];
  
      candidateLights.forEach((light) => {
        const distanceSquared = playerPosition.distanceToSquared(light.position);
        if (distanceSquared < this.maxDistance * this.maxDistance) {
          // Použijeme průnik sfér pro přesnější culling
          const sphere = new THREE.Sphere(light.position, light.distance || 1);
          if (frustum.intersectsSphere(sphere)) {
            lightsInFrustum.push({ light, distanceSquared });
          } else {
            lightsOutOfFrustum.push({ light, distanceSquared });
          }
        }
      });
  
      // Seřadíme světla v frustumu podle vzdálenosti
      lightsInFrustum.sort((a, b) => a.distanceSquared - b.distanceSquared);
  
      // Zapneme světla v frustumu
      let visibleLights = 0;
      for (
        let i = 0;
        i < lightsInFrustum.length && visibleLights < this.maxVisibleLights;
        i++
      ) {
        lightsInFrustum[i].light.visible = true;
        visibleLights++;
      }
  
      // Pokud máme volnou kapacitu, zapneme i některá blízká světla mimo frustum
      if (visibleLights < this.maxVisibleLights) {
        lightsOutOfFrustum.sort((a, b) => a.distanceSquared - b.distanceSquared);
        for (
          let i = 0;
          i < lightsOutOfFrustum.length && visibleLights < this.maxVisibleLights;
          i++
        ) {
          lightsOutOfFrustum[i].light.visible = true;
          visibleLights++;
        }
      }
    }
  
    getNearbyClusters(clusterKey) {
      const [x, y, z] = clusterKey.split('_').map(Number);
      const nearbyClusters = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            nearbyClusters.push(`${x + dx}_${y + dy}_${z + dz}`);
          }
        }
      }
      return nearbyClusters;
    }
  }