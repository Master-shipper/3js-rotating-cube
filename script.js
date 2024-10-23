import * as THREE from 'three';

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


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  metalness: 0.8,
  roughness: 0.3,
  emissive: 0x002222,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);


const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);



const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  const scale = Math.sin(Date.now() * 0.003) * 0.3 + 1.2;
  cube.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
