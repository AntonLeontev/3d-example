import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import init from "./init";

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.z = 3;

// const ground = new THREE.PlaneGeometry(3, 3, 32, 32);
// ground.rotateX(-Math.PI / 2);
// const groundMatherial = new THREE.MeshStandardMaterial({
//     color: 0x555555,
//     side: THREE.DoubleSide,
// });
// const groundMesh = new THREE.Mesh(ground, groundMatherial);
// scene.add(groundMesh);

const probe = new THREE.LightProbe();
scene.add(probe);

const loader = new GLTFLoader();
let model;
loader.load(
    "/storage/purga1.glb",
    function (gltf) {
        model = gltf.scene;
        console.log("Модель загружена");
        gltf.scene.children[0].scale.set(2, 2, 2);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// const geometry = new THREE.BoxGeometry(1, 2, 1);
// const material = new THREE.MeshBasicMaterial({
//     color: "gray",
//     wireframe: false,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener("resize", () => {
    // Обновляем размеры
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});

window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
