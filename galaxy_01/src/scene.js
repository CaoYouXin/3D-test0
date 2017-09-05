import { globals, setBack } from './base';
import { addListeners } from './listener';

export function createScene() {
  let { width, height, ratio, w2, h2, fov, near, far, scene, camera, renderer, container, controls } = globals;

  width = window.innerWidth;
  height = window.innerHeight;
  ratio = width / height;
  w2 = width / 2;
  h2 = height / 2;
  fov = 60;
  near = 1;
  far = 20000;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xC8B68E, -1, 3000);
  camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
  camera.position.z = 100;
  camera.position.y = -300;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('scene');
  container.appendChild(renderer.domElement);
  addListeners();
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  setBack({ width, height, ratio, w2, h2, fov, near, far, scene, camera, renderer, container, controls });
};