import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa5f29d);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 7);
camera.lookAt(0, 0, 0);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Define shades of green for each face of the cube
const materials = [
  new THREE.MeshStandardMaterial({ color: 0x4CAF50 }), // Green
  new THREE.MeshStandardMaterial({ color: 0x81C784 }), // Light Green
  new THREE.MeshStandardMaterial({ color: 0x388E3C }), // Dark Green
  new THREE.MeshStandardMaterial({ color: 0xA5D6A7 }), // Mint Green
  new THREE.MeshStandardMaterial({ color: 0x66BB6A }), // Medium Green
  new THREE.MeshStandardMaterial({ color: 0xC8E6C9 }), // Very Light Green
];

const cubeGeometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(cubeGeometry, materials);
cube.castShadow = true;
scene.add(cube);

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01; // Optional continuous rotation
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
