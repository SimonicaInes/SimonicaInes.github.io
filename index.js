// import './index.css'

import * as THREE from 'three'





const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )



const gridHelper = new THREE.GridHelper(100, 10, 0xFFFFFF, 0xFFFFFF)
// scene.add(gridHelper)
camera.position.z = 130

camera.position.y = 10


//GEOMETRY ADDING
const geometry = new THREE.BoxGeometry(5,5,5,100)
const material = new THREE.MeshStandardMaterial({color:0x002050})
const cube = new THREE.Mesh(geometry,material)
cube.position.setX(20)
cube.position.setZ(101)
scene.add(cube);


// const geometryF = new THREE.BoxGeometry(5,5,5,100)
// const materialF = new THREE.MeshStandardMaterial({color:0x002050})
// const cubeF = new THREE.Mesh(geometryF,materialF)
// scene.add(cubeF)

//END GEOMETRY

const light = new THREE.AmbientLight(0xFFFFFF)
const pointlight = new THREE.PointLight(0xFFFFFF,10)
scene.add(pointlight,light);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha:true
});
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()