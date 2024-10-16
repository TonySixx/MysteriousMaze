import * as THREE from 'three';

export class SkyBox {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;

        this.createSky();
        this.addStars();
    }

    createSky() {
        const skyGeometry = new THREE.SphereGeometry(4000, 32, 32);
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
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(this.sky);
    }

    addStars() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const distance = 3000;

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
            size: 2,
            sizeAttenuation: false,
        });

        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }

    update(cameraPosition) {
        this.sky.position.copy(cameraPosition);
        this.stars.position.copy(cameraPosition);
    }

    dispose() {
        this.scene.remove(this.sky);
        this.scene.remove(this.stars);
        this.sky.geometry.dispose();
        this.sky.material.dispose();
        this.stars.geometry.dispose();
        this.stars.material.dispose();
    }
}
