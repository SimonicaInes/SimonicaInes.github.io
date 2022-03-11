import './style.css'

import * as THREE from '../SimonicaInes.github.io/node_modules/three';
import { GLTFLoader } from '../SimonicaInes.github.io/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../SimonicaInes.github.io/node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6647 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);




function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y -= 0.01;
    renderer.render(scene, camera);
    controls.update();
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    camera.position.x = t * -0.001
    camera.position.y = t * -0.001
    camera.position.z = t * -0.01
    console.log('POS: ' + camera.position.z)

}
document.body.onscroll = moveCamera;

Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('images/space.jpg')
    //scene.background = spaceTexture;

const loader = new GLTFLoader();

loader.load(
	// resource URL
	'models/boat/boat.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



animate();