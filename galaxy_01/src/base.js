let scene, camera, controls, fov, ratio, near, far, shadow, back, light, renderer,
  container, particles, width, height, w2, h2, mouse = { x: 0, y: 0 }, params;

let globals = {
  scene, camera, controls, fov, ratio, near, far, shadow, back, light, renderer,
  container, particles, width, height, w2, h2, mouse, params
};

export { globals };

export const setBack = (vs) => {
  globals = Object.assign(globals, vs);
}