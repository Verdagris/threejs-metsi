import "./style.css";
import * as THREE from "three";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "dat.gui";

//Textures

const loader = new THREE.TextureLoader();
const height = loader.load("height.png");
const texture = loader.load("/mountain-texture3.jpg");
const alpha = loader.load("/alpha.jpg");
// const flag = loader.load('/icons/location.png')

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 256, 256);
const pin = new THREE.PlaneBufferGeometry(1, 1.3, 64, 64);

// Materials


//icons
// for (let i = 0; i < 3; i++) {
//   const material2 = new THREE.MeshBasicMaterial({
//     map: loader.load(`/icons/${i}.png`),
//   });

//   const plane2 = new THREE.Mesh(pin, material2);

//   plane2.position.set(1, i*1.8)
  
//   scene.add(plane2);

// }


//mountain
const material = new THREE.MeshStandardMaterial({
  color: "gray",
  map: texture,
  displacementMap: height,
  displacementScale: 0.5,
  displacementBias: 0.2,
  alphaMap: alpha,
  premultipliedAlpha: 10,
  transparent: true,
  // depthTest: false,
});

// Mesh
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);
plane.rotation.x = 162;

// gui.add(plane.rotation, "x").min(0).max(200);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// gui.add(pointLight.position, "x");
// gui.add(pointLight.position, "y");
// gui.add(pointLight.position, "z");

//changing light colour
const col = { color: "#fff" };
gui.addColor(col, "color").onChange(() => {
  pointLight.color.set(col.color);
});
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0.5;
camera.position.z = 1.4;
camera.rotation.y = 6.4;
scene.add(camera);

gui.add(camera.rotation, "x");
gui.add(camera.rotation, "y");
gui.add(camera.rotation, "z");

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

//Mouse

window.addEventListener("wheel", onScroll)

let y=0
let position = 0

function onScroll(event){
    y= event.deltaY
}

document.addEventListener("mousemove", animateTerrain);

let mouseY = 0;
let mouseX = 0;

let targetY = 0;
let targetX = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function animateTerrain(event) {
  mouseY = event.clientY - windowHalfY;
  mouseX = event.clientX - windowHalfX;
}

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

//   plane.rotation.z = 0.1 * elapsedTime + mouseX * 0.0008;

    position += y;
    y*=0.9;
  plane.rotation.z = window.scrollY*0.0012 + mouseX * 0.0003;
  camera.position.z = 1.65 - window.scrollY*0.00012 ;
  plane.rotation.x = 162 + mouseY * 0.0003;

  console.log(window.scrollY)
  // plane.material.displacementScale = mouseY * 0.0003 + 0.4

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
