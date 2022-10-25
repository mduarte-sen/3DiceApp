import './style.css';

import * as THREE from 'three';
import { PointLight } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 30, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(40);
camera.position.setX(0);

const geometry = new THREE.IcosahedronGeometry(10, 0);

const material = new THREE.MeshStandardMaterial({ color: 0XFF6347 });

const edges = new THREE.EdgesGeometry(geometry);
const mat = new THREE.LineBasicMaterial( { color: 0xffffff } );

const icosaMesh = new THREE.Mesh(geometry, material);
//const icosaFrame = new THREE.LineSegments(edges, mat);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

scene.add(icosaMesh);
//scene.add(icosaFrame);
scene.add(pointLight, ambientLight);

let randomDice = [];
let randomDiceSpin = [];
for (let i = 0; i < 200; i++) {
  randomDice.push(addBgrDice());
  randomDiceSpin.push(new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(0.03)));
}
randomDice.forEach((die) => scene.add(die));

function animate(){
  requestAnimationFrame(animate);
  icosaMesh.rotation.x += 0.005;
  icosaMesh.rotation.y += 0.0025;
  icosaMesh.rotation.z += 0.002;
  for (let i = 0; i < randomDice.length; i++) {
    let die = randomDice[i];
    let spin = randomDiceSpin[i];
    die.rotation.x += spin[0];
    die.rotation.y += spin[1];
    die.rotation.z += spin[2];
    
  }
  renderer.render(scene, camera);
}

function addBgrDice(){
  const geoArr = [new THREE.BoxGeometry(0.75,0.75,0.75), new THREE.TetrahedronGeometry(0.75), new THREE.OctahedronGeometry(0.75)];
  const diceType = THREE.MathUtils.randInt(0,2);
  const geometry = geoArr.at(diceType);
  const material = new THREE.MeshStandardMaterial({color: 0XFF6347});
  const die = new THREE.Mesh(geometry,material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  die.position.set(x,y,z);
  return die;
}

animate();