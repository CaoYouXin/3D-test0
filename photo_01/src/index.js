import { add2Scene } from './slider';

const CONST = {
  FIELD_OF_VIEW: 45,
  NEAR_CLIPPING_PLANE: 1,
  FAR_CLIPPING_PLANE: 10
};

const container = document.querySelector("#main");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
  container.offsetWidth / - 2, container.offsetWidth / 2,
  container.offsetHeight / 2, container.offsetHeight / - 2, 1, 1000);
camera.position.set(0, 0, 3);
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 0, 1);
scene.add(light);

const loop = () => {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();

add2Scene(scene, container);