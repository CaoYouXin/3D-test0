import { globals, setBack } from './base';

let tick = 0;
let axis = new THREE.Vector3(0, 0, 1);
export function vertex() {
  let { params, particles } = globals;

  if ((tick % 2 === 0) && params && params.vortex !== 0) {
    for (let i = 0; i < particles.geometry.vertices.length; i++) {
      let vertex = particles.geometry.vertices[i];
      let angle = (-Math.PI / 180);
      if (params.vortex > 0) {
        angle *= (1 - vertex.length() / params.radius) * params.vortex;
      } else {
        angle *= (vertex.length() / params.radius) * Math.abs(params.vortex);
      }
      vertex.applyAxisAngle(axis, angle);
    }
    particles.geometry.verticesNeedUpdate = true;
  }
  tick++;

  setBack({ params, particles });
};