import { globals, setBack } from './base';
import { createLights } from './light';
import { createScene } from './scene';
import { vertex } from './vertex';
import { createObjects, spiral } from './particle';
import { GalaxyParameters } from './params';

function loop(time) {
  let { particles } = globals;

  vertex();
  particles.rotation.z -= 0.0025;

  setBack({ particles });

  render();
  requestAnimationFrame(loop);
}

function render() {
  let { controls, renderer, scene, camera } = globals;

  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);

  setBack({ controls, renderer, scene, camera });
}

createScene();
createObjects();
// createLights();
loop();

globals.params = new GalaxyParameters();
console.log(globals);

function onChange(params) {
  setBack({ params });
  /*
  var points = [
    new GPoint().randomize(),
    new GPoint().randomize(),
    new GPoint().randomize(),
    new GPoint().randomize(),
    new GPoint().randomize(),
  ];
  GPoint.grid(points);
  */
  // alert('onChange', data);
  let dx = 10 - 10 * params.dispersion * (1 - params.bulge);
  let dy = 10 - 10 * params.dispersion * (1 - params.bulge);
  let dz = 40 - 40 * params.dispersion * (1 - params.bulge);
  // let geometry = particles.geometry;
  let geometry = new THREE.Geometry();
  // geometry.vertices.splice(0, geometry.vertices.length);
  let points = spiral(params).toArray();
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let distance = Math.pow(Math.pow(point.x, 2) + Math.pow(point.y, 2), 0.5);
    let pow = Math.max(0, ((params.radius * .8) - distance) / (params.radius * .8));
    pow = (1 - Math.cos(pow * Math.PI)) * params.bulge;
    let depow = distance / params.radius;
    // console.log(distance);
    let vertex = new THREE.Vector3();
    vertex.x = point.x;
    vertex.y = point.y;
    vertex.z = (-dz + (dz * 2) * Math.random()) * pow; // (Math.random() * 180 - 90) * (pow * pow * pow);
    geometry.vertices.push(vertex);
    geometry.colors.push(new THREE.Color(Math.max(.5, pow), Math.max(.5, pow), 1));
    let t = Math.max(Math.round(depow * 5), Math.round(pow * 5)), n = 0;
    while (n < t) {
      let vertex = new THREE.Vector3();
      let factor = depow < 0.9 ? Math.max(pow, 0.3) : Math.max(1, depow * 5);
      // let factor = 1;

      vertex.x = point.x - dx * factor + Math.random() * (dx * 2 * factor);
      vertex.y = point.y - dy * factor + Math.random() * (dy * 2 * factor);
      vertex.z = (-dz + (dz * 2) * Math.random()) * pow;
      geometry.vertices.push(vertex);
      geometry.colors.push(new THREE.Color(Math.max(.5, pow), Math.max(.5, pow), 1));
      n++;
    }
  }
  geometry.mergeVertices();
  geometry.verticesNeedUpdate = true;

  let { particles } = globals;

  particles.geometry = geometry;

  setBack({ particles });
}

let gui = function datgui() {
  let { params } = globals;
  let gui = new dat.GUI();
  gui.closed = true;
  gui.add(params, 'arms', 1, 10).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'stops', 1000, 10000).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'revolutions', 1.1, 3.1).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'radius', 300, 1000).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'sparse', 0.1, 1).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'dispersion', 0.01, 1).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'bulge', 0.01, 1).onChange(function (newValue) {
    onChange(params);
  });
  gui.add(params, 'vortex', -1, 1, 0.01).onChange(function (newValue) {
    onChange(params);
  });
  // gui.add(text, 'displayOutline');
  gui.add(params, 'randomize');
  gui.add(params, 'exportXYZ').name('EXPORT *.XYZ');
  return gui;
}();

onChange(globals.params);

// function bufferGeometry() {
//   var geometry = new THREE.BufferGeometry();
//   // create a simple square shape. We duplicate the top left and bottom right
//   // vertices because each vertex needs to appear once per triangle.
//   var vertices = new Float32Array([
//     -1.0, -1.0, 1.0,
//     1.0, -1.0, 1.0,
//     1.0, 1.0, 1.0,
//     1.0, 1.0, 1.0,
//     -1.0, 1.0, 1.0,
//     -1.0, -1.0, 1.0
//   ]);
//   // itemSize = 3 because there are 3 values (components) per vertex
//   geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
// }



// let GPoint = function () {
//   var unit = {
//     x: 0.09,
//     y: 0.09,
//     z: 0.3
//   };
//   function GPoint(x, y, z) {
//     this.x = x || 0;
//     this.y = y || 0;
//     this.z = z || 0;
//   }
//   GPoint.prototype = {
//     randomize: function () {
//       this.x = Math.random() * 1000;
//       this.y = Math.random() * 1000;
//       this.z = Math.random() * 1000;
//       return this;
//     },
//     toGrid: function () {
//       this.x = (Math.round(this.x / unit.x) * unit.x);
//       this.y = (Math.round(this.y / unit.y) * unit.y);
//       this.z = (Math.round(this.z / unit.z) * unit.z);
//       return this;
//     },
//     toFixed: function () {
//       this.x = +(this.x.toFixed(2));
//       this.y = +(this.y.toFixed(2));
//       this.z = +(this.z.toFixed(2));
//       return this;
//     },
//   };
//   GPoint.grid = function (points) {
//     for (var i = 0; i < points.length; i++) {
//       points[i].toGrid().toFixed();
//     }
//     GPoint.sort(points);
//   };
//   GPoint.sort = function (points) {
//     points.sort(function (a, b) {
//       if (a.z === b.z) {
//         if (a.x === b.x) {
//           if (a.y === b.y) {
//             return 0;
//           } else {
//             return a.y > b.y ? 1 : -1;
//           }
//         } else {
//           return a.x > b.x ? 1 : -1;
//         }
//       } else {
//         return a.z > b.z ? 1 : -1;
//       }
//     });
//   };
//   return GPoint;
// }();



// function string2ArrayBuffer(string, callback) {
//   let blob = new Blob([string])
//   var fr = new FileReader();
//   fr.onload = function (e) {
//     callback(e.target.result);
//   }
//   fr.readAsArrayBuffer(blob);
// }

// https://cdn.rawgit.com/mikolalysenko/write-ply/master/write-ply.js

