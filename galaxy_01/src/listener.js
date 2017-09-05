import { globals, setBack } from './base';

function handleMouseMove(event) {
  let { mouse } = globals;

  mouse = { x: event.clientX, y: event.clientY };

  setBack({ mouse });
}

function handleMouseDown(event) {
  //
}

function handleMouseUp(event) {
  //
}

function handleTouchStart(event) {
  let { mousePos } = globals;

  if (event.touches.length > 1) {
    event.preventDefault();
    mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }

  setBack({ mousePos });
}

function handleTouchEnd(event) {
  let { mousePos } = globals;

  mousePos = { x: windowHalfX, y: windowHalfY };

  setBack({ mousePos });
}

function handleTouchMove(event) {
  let { mousePos } = globals;

  if (event.touches.length == 1) {
    event.preventDefault();
    mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }

  setBack({ mousePos });
}

function onWindowResize() {
  let { width, height, w2, h2, camera, renderer } = globals;

  width = window.innerWidth;
  height = window.innerHeight;
  w2 = width / 2;
  h2 = height / 2;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  setBack({ width, height, w2, h2, camera, renderer });
}

export function addListeners() {
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  document.addEventListener('touchmove', handleTouchMove, false);
};