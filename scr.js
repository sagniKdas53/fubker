import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
var stop = true;
var touch = 0; // 0 means not touch 
var controls;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// set renderer

if ("ontouchstart" in document.documentElement) {
  touch = 1;
  //"your device is a touch screen device."
}

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

function rendIt() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  camera.position.setX(-3);
  renderer.render(scene, camera);
}
rendIt();

// objects
const fubukerT = new THREE.TextureLoader().load("fubuker.jpg");
const fubuker = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: fubukerT })
);
scene.add(fubuker);

// lights

//const pointLight = new THREE.PointLight(0xffffff);
//pointLight.position.set(5, 5, 5);
//scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(ambientLight); //pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
if (touch != 1) {
  controls = new OrbitControls(camera, renderer.domElement);
}

// animation loop
function animate() {
  requestAnimationFrame(animate);
  if (stop) {
    fubuker.rotation.x += 0.05;
    fubuker.rotation.y += 0.05;
    fubuker.rotation.z += 0.05;
  }
  if (touch != 1) {
    controls.update();
  }
  renderer.render(scene, camera);
}

animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

// document events

document.body.onscroll = moveCamera;
moveCamera();

document.body.onresize = rendIt;

window.onload = function () {
  document.getElementById("my_audio").play();
  window.scroll(0, window.innerHeight / 2);
};

function removeLights(){
  scene.remove(lightHelper, gridHelper);
}

function addLights(){
  scene.add(lightHelper, gridHelper);
}
function aniState() {
  stop=!stop;
}
document.getElementById("aniState").onclick = aniState;
document.getElementById("addLights").onclick = addLights;
document.getElementById("removeLights").onclick = removeLights;
