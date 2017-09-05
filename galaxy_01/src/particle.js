import { globals, setBack } from './base';
import { sprite } from './sprite';

export function createObjects() {
  let { particles, scene } = globals;

  let texture = new THREE.CanvasTexture(sprite());
  let geometry = new THREE.Geometry();
  let material = new THREE.PointsMaterial({
    size: 8,
    map: texture,
    vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
  });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  setBack({ particles, scene });
};

export function spiral(params) {
  function lcg(value, modulus = Math.pow(2, 31), multiplier = 1103515245, increment = 12345) {
    return (value * multiplier + increment) % modulus;
  }
  return {
    toArray: function (now = 0) {
      const time = now / -60000,
        modulus = params.modulus(),
        theta = params.armTheta();
      let points = [];
      let value = 0;
      for (let arm = 0; arm < params.arms; arm++) {
        for (let stop = 0; stop < params.stops; stop++) {
          value = lcg(value, modulus);
          const pow = (stop / params.stops),
            c = 1 - pow + 1 - params.dispersion,
            r = value / modulus,
            cr = (r - .5) * 2,
            angle = (pow * Math.PI * 2 * params.revolutions) + (Math.PI * c * cr * params.sparse),
            radians = time + angle + (theta * arm),
            distance = Math.sqrt(pow) * params.radius,
            x = Math.cos(radians) * distance * (1 + Math.max(0, angle / Math.PI - 1.6)),
            y = Math.sin(radians) * distance * (1 + Math.max(0, angle / Math.PI - 1.6)),
            z = 0,
            size = (r - .5) * 2 + Math.pow(1.125, (1 - pow) * 8),
            alpha = (Math.sin((r + time + pow) * Math.PI * 2) + 1) * 0.5;
          points.push({
            x: x, y: y, z: z,
            size: size, alpha: alpha,
          });
        }
      }
      return points;
    },
  }
};