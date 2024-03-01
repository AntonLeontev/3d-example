import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(0, 3, 8);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.0));

var sizeBound = new THREE.Vector3(4, 4, 4);

// var b = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(sizeBound.x, sizeBound.y, sizeBound.z),
//     new THREE.MeshBasicMaterial()
// );
// var boxHelper = new THREE.BoxHelper(b);
// scene.add(boxHelper);

var loader = new GLTFLoader();
loader.load("http://127.0.0.1:8000/storage/purga.gltf", (gltf) => {
    scaleToFit(gltf.scene, sizeBound); // умещаем в заданные размеры

    let b = new THREE.Box3().setFromObject(gltf.scene);
    gltf.scene.position.sub(b.getCenter()); // центрируем
    gltf.scene.position.y -= (sizeBound.y - b.getSize().y) * 0.5; // опускаем к "полу"

    scene.add(gltf.scene); // добавляем в сцену
});

function scaleToFit(obj, bound) {
    let box = new THREE.Box3().setFromObject(obj);
    let size = new THREE.Vector3();
    box.getSize(size);
    let vScale = new THREE.Vector3().copy(bound).divide(size);
    let scale = Math.min(vScale.x, Math.min(vScale.y, vScale.z));
    obj.scale.setScalar(scale);
}

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
});
