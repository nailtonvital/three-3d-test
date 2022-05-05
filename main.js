import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render( scene, camera)

// Geometry

const geometry = new THREE.TorusGeometry(15,1,100,100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347})

const torus = new THREE.Mesh( geometry, material)

scene.add(torus)


// Light
const pointLight = new THREE.PointLight(0xfffffff)
pointLight.position.set(0,0,0)

scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper)

//controls

const controls = new OrbitControls(camera, renderer.domElement)

//stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 14,14)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// background

const space = new THREE.TextureLoader().load('space.jfif')
scene.background = space

// center object

const moonTexture = new THREE.TextureLoader().load('download.jfif')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 14, 14),
  new THREE.MeshBasicMaterial({map: moonTexture})
)

scene.add(moon)


function animate(){
  requestAnimationFrame( animate )

  torus.rotation.x += 0.5;
  torus.rotation.y += 199;
  
  controls.update();

  renderer.render(scene, camera)
}

animate()