import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const init = () => {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    const scene = new THREE.Scene();
    const canvas = document.querySelector(".canvas");
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x333333);

    const environment = new RoomEnvironment(renderer);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    return { sizes, scene, canvas, camera, renderer, controls };
};

export default init;
