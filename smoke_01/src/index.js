import { add2Scene } from './slider';
import { addSmoke2Scene, evolveSmoke, toCamera } from './smoke';

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

const camera = new THREE.PerspectiveCamera(
  CONST.FIELD_OF_VIEW,
  container.offsetWidth / container.offsetHeight,
  CONST.NEAR_CLIPPING_PLANE,
  CONST.FAR_CLIPPING_PLANE
);
// const camera = new THREE.OrthographicCamera(
//   container.offsetWidth / - 2, container.offsetWidth / 2,
//   container.offsetHeight / 2, container.offsetHeight / - 2, 1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const controls = new THREE.OrbitControls(camera, container);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 0, 1);
scene.add(light);

const clock = new THREE.Clock();

const loop = () => {
  TWEEN.update();

  toCamera(camera);
  evolveSmoke(clock.getDelta());

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();

addSmoke2Scene(scene, camera, container);