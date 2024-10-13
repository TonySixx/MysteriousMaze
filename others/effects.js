import * as THREE from "three";

export function createFireParticles(color) {
    const particleCount = 12;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
  
    const isDefaultColor = color === 0xff4500;
  
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 1] = Math.random() * 0.3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  
      if (isDefaultColor) {
        colors[i * 3] = 1.5;
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
        colors[i * 3 + 2] = 0;
      } else {
        const particleColor = new THREE.Color(color);
        colors[i * 3] = particleColor.r;
        colors[i * 3 + 1] = particleColor.g;
        colors[i * 3 + 2] = particleColor.b;
      }
  
      sizes[i] = 0.1 + Math.random() * 0.1;
    }
  
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  
    return new THREE.Points(geometry, material);
  }