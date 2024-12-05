import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const rectangle = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 3),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 3, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

rectangle.position.set(-2, 0, 0);
cylinder.position.set(2, 0, 0);

scene.add(rectangle);
scene.add(cylinder);

camera.position.z = 10;

const box1 = new THREE.Box3().setFromObject(rectangle);
const box2 = new THREE.Box3().setFromObject(cylinder);

function checkCollision() {
  box1.setFromObject(rectangle);
  box2.setFromObject(cylinder);

  if (box1.intersectsBox(box2)) {
    rectangle.position.x - 0.01;
    console.log(box1)
  }
  else{
    rectangle.position.x += 0.01;
  }
}

function animate() {
  requestAnimationFrame(animate);

  checkCollision();
  renderer.render(scene, camera);
}

animate();