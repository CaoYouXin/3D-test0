/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var scene = void 0,
    camera = void 0,
    controls = void 0,
    fov = void 0,
    ratio = void 0,
    near = void 0,
    far = void 0,
    shadow = void 0,
    back = void 0,
    light = void 0,
    renderer = void 0,
    container = void 0,
    particles = void 0,
    width = void 0,
    height = void 0,
    w2 = void 0,
    h2 = void 0,
    mouse = { x: 0, y: 0 },
    params = void 0;

var globals = {
  scene: scene, camera: camera, controls: controls, fov: fov, ratio: ratio, near: near, far: far, shadow: shadow, back: back, light: light, renderer: renderer,
  container: container, particles: particles, width: width, height: height, w2: w2, h2: h2, mouse: mouse, params: params
};

exports.globals = globals;
var setBack = exports.setBack = function setBack(vs) {
  exports.globals = globals = Object.assign(globals, vs);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _base = __webpack_require__(0);

var _light = __webpack_require__(2);

var _scene = __webpack_require__(3);

var _vertex3 = __webpack_require__(5);

var _particle = __webpack_require__(6);

var scene = _base.globals.scene,
    camera = _base.globals.camera,
    controls = _base.globals.controls,
    fov = _base.globals.fov,
    ratio = _base.globals.ratio,
    near = _base.globals.near,
    far = _base.globals.far,
    shadow = _base.globals.shadow,
    back = _base.globals.back,
    light = _base.globals.light,
    renderer = _base.globals.renderer,
    container = _base.globals.container,
    particles = _base.globals.particles,
    width = _base.globals.width,
    height = _base.globals.height,
    w2 = _base.globals.w2,
    h2 = _base.globals.h2,
    mouse = _base.globals.mouse,
    params = _base.globals.params;


function loop(time) {
  var particles = _base.globals.particles;


  (0, _vertex3.vertex)();
  particles.rotation.z -= 0.0025;

  (0, _base.setBack)({ particles: particles });

  render();
  requestAnimationFrame(loop);
}

function render() {
  var controls = _base.globals.controls,
      renderer = _base.globals.renderer,
      scene = _base.globals.scene,
      camera = _base.globals.camera;


  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);

  (0, _base.setBack)({ controls: controls, renderer: renderer, scene: scene, camera: camera });
}

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


(0, _scene.createScene)();

console.log(_base.globals);

(0, _particle.createObjects)();
(0, _light.createLights)();
loop();

params = function GalaxyParameters() {
  function GalaxyParameters() {
    this.arms = 2, this.stops = 5000, this.revolutions = 1.7, this.radius = 400, this.sparse = 0.4, this.dispersion = 0.6, // more 0 - less 1
    this.bulge = 0.6, this.vortex = 0.0, this.randomize = function () {
      // console.log('gui', gui);
      for (var i = 0; i < gui.__controllers.length; i++) {
        var c = gui.__controllers[i];
        if (c.__min) {
          var value = c.__min + (c.__max - c.__min) * Math.random();
          // console.log(value, c);
          this[c.property] = value;
          c.updateDisplay();
        }
      }
      onChange(this);
    }, this.exportPCD = function () {
      var geometry = particles.geometry;
      var results = PCDExporter(geometry.vertices);
      downloadFile(results, 'galaxy.pcd');
    }, this.exportXYZ = function () {
      var geometry = particles.geometry;
      var results = XYZExporter(geometry.vertices);
      downloadFile(results, 'galaxy.xyz');
    };
    this.exportPLY = function () {
      var geometry = particles.geometry;
      var results = PLYExporter(geometry.vertices);
      downloadFile(results, 'galaxy.ply');
    }, this.exportOBJ = function () {
      var exporter = new THREE.OBJExporter();
      var results = exporter.parse(scene);
      downloadFile(results, 'galaxy.obj');
    }, this.exportSTL = function () {
      var exporter = new THREE.STLExporter(); // new THREE.OBJExporter();
      var results = exporter.parse(scene);
      downloadFile(results, 'galaxy.stl');
    };
    this.armTheta = function () {
      return Math.PI * 2 / this.arms;
    };
    this.modulus = function () {
      return Math.pow(2, 31);
    };
  }
  return new GalaxyParameters();
}();
var GPoint = function () {
  var unit = {
    x: 0.09,
    y: 0.09,
    z: 0.3
  };
  function GPoint(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  GPoint.prototype = {
    randomize: function randomize() {
      this.x = Math.random() * 1000;
      this.y = Math.random() * 1000;
      this.z = Math.random() * 1000;
      return this;
    },
    toGrid: function toGrid() {
      this.x = Math.round(this.x / unit.x) * unit.x;
      this.y = Math.round(this.y / unit.y) * unit.y;
      this.z = Math.round(this.z / unit.z) * unit.z;
      return this;
    },
    toFixed: function toFixed() {
      this.x = +this.x.toFixed(2);
      this.y = +this.y.toFixed(2);
      this.z = +this.z.toFixed(2);
      return this;
    }
  };
  GPoint.grid = function (points) {
    for (var i = 0; i < points.length; i++) {
      points[i].toGrid().toFixed();
    }
    GPoint.sort(points);
  };
  GPoint.sort = function (points) {
    points.sort(function (a, b) {
      if (a.z === b.z) {
        if (a.x === b.x) {
          if (a.y === b.y) {
            return 0;
          } else {
            return a.y > b.y ? 1 : -1;
          }
        } else {
          return a.x > b.x ? 1 : -1;
        }
      } else {
        return a.z > b.z ? 1 : -1;
      }
    });
  };
  return GPoint;
}();
function spiral(params) {
  function lcg(value) {
    var modulus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.pow(2, 31);
    var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1103515245;
    var increment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 12345;

    return (value * multiplier + increment) % modulus;
  }
  return {
    toArray: function toArray() {
      var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var time = now / -60000,
          modulus = params.modulus(),
          theta = params.armTheta();
      var points = [];
      var value = 0;
      for (var arm = 0; arm < params.arms; arm++) {
        for (var stop = 0; stop < params.stops; stop++) {
          value = lcg(value, modulus);
          var pow = stop / params.stops,
              c = 1 - pow + 1 - params.dispersion,
              r = value / modulus,
              cr = (r - .5) * 2,
              angle = pow * Math.PI * 2 * params.revolutions + theta * arm,
              radians = time + angle + Math.PI * c * cr * params.sparse,
              distance = Math.sqrt(pow) * params.radius,
              x = Math.cos(radians) * distance,
              y = Math.sin(radians) * distance,
              z = 0,
              size = (r - .5) * 2 + Math.pow(1.125, (1 - pow) * 8),
              alpha = (Math.sin((r + time + pow) * Math.PI * 2) + 1) * 0.5;
          points.push({
            x: x, y: y, z: z,
            size: size, alpha: alpha
          });
        }
      }
      return points;
    }
  };
}
function onChange(params) {
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
  var dx = 10 - 10 * params.dispersion * (1 - params.bulge);
  var dy = 10 - 10 * params.dispersion * (1 - params.bulge);
  var dz = 40 - 40 * params.dispersion * (1 - params.bulge);
  // let geometry = particles.geometry;
  var geometry = new THREE.Geometry();
  // geometry.vertices.splice(0, geometry.vertices.length);
  var points = spiral(params).toArray();
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var distance = Math.pow(Math.pow(point.x, 2) + Math.pow(point.y, 2), 0.5);
    var pow = Math.max(0, (params.radius * .8 - distance) / (params.radius * .8));
    pow = (1 - Math.cos(pow * Math.PI)) * params.bulge;
    // console.log(distance);
    var _vertex = new THREE.Vector3();
    _vertex.x = point.x;
    _vertex.y = point.y;
    _vertex.z = (-dz + dz * 2 * Math.random()) * pow; // (Math.random() * 180 - 90) * (pow * pow * pow);
    geometry.vertices.push(_vertex);
    geometry.colors.push(new THREE.Color(pow, pow, 1));
    var t = Math.round(pow * 5),
        n = 0;
    while (n < t) {
      var _vertex2 = new THREE.Vector3();
      _vertex2.x = point.x - dx + Math.random() * (dx * 2);
      _vertex2.y = point.y - dy + Math.random() * (dy * 2);
      _vertex2.z = (-dz + dz * 2 * Math.random()) * pow;
      geometry.vertices.push(_vertex2);
      geometry.colors.push(new THREE.Color(pow, pow, 1));
      n++;
    }
  }
  geometry.mergeVertices();
  geometry.verticesNeedUpdate = true;

  var particles = _base.globals.particles;


  particles.geometry = geometry;

  (0, _base.setBack)({ particles: particles });
}

var gui = function datgui() {
  var gui = new dat.GUI();
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

onChange(params);

var downloadFile = function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName, json) {
    data = json ? JSON.stringify(data) : data;
    var blob = new Blob([data], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}();
function string2ArrayBuffer(string, callback) {
  var blob = new Blob([string]);
  var fr = new FileReader();
  fr.onload = function (e) {
    callback(e.target.result);
  };
  fr.readAsArrayBuffer(blob);
}
function PCDExporter(vertices) {
  var data = '# .PCD v.7 - Point Cloud Data file format' + '\r\n';
  data += 'VERSION .7' + '\r\n';
  data += 'FIELDS x y z rgb' + '\r\n';
  data += 'SIZE 4 4 4 4' + '\r\n';
  data += 'TYPE F F F F' + '\r\n';
  data += 'COUNT 1 1 1 1' + '\r\n';
  data += 'WIDTH ' + vertices.length + '\r\n';
  data += 'HEIGHT 1' + '\r\n';
  data += 'VIEWPOINT 0 0 0 1 0 0 0' + '\r\n';
  data += 'POINTS ' + vertices.length + '\r\n';
  data += 'DATA ascii' + '\r\n';
  for (var i = 0; i < vertices.length; i++) {
    var v = vertices[i];
    var x = v.x.toFixed(5);
    var y = v.y.toFixed(5);
    var z = v.z.toFixed(5);
    data += x + ' ' + y + ' ' + z + ' 4.2108e+06';
    if (i < vertices.length - 1) {
      data += '\r\n';
    }
  }
  /*
  console.log('data', data);
  var loader = new THREE.PCDLoader();
  string2ArrayBuffer(data, function(arrayBuffer) {
    var check = loader.parse(arrayBuffer);
    console.log('check', check);
  });
  */
  return data;
}
// https://cdn.rawgit.com/mikolalysenko/write-ply/master/write-ply.js
function PLYExporter(vertices) {
  var model = {
    vertex: {
      x: [],
      y: [],
      z: []
    },
    face: {
      vertex_index: []
    }
  };
  for (var i = 0; i < vertices.length; i++) {
    var v = vertices[i];
    model.vertex.x.push(v.x);
    model.vertex.y.push(v.y);
    model.vertex.z.push(v.z);
  }
  var data = writePLY(model);
  return data;
}
function XYZExporter(vertices) {
  var data = '';
  for (var i = 0; i < vertices.length; i++) {
    var v = vertices[i];
    var x = v.x.toFixed(6);
    var y = v.y.toFixed(6);
    var z = v.z.toFixed(6);
    data += x + ' ' + y + ' ' + z + '\r\n';
  }
  return data;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLights = createLights;

var _base = __webpack_require__(0);

function createLights() {
  var light = _base.globals.light,
      shadow = _base.globals.shadow,
      back = _base.globals.back,
      scene = _base.globals.scene;


  light = new THREE.HemisphereLight(0xC8B68E, 0xC8B68E, 50);
  shadow = new THREE.DirectionalLight(0xC8B68E, 11.8);
  shadow.position.set(100, 100, 100);
  shadow.castShadow = true;
  // shadow.shadowDarkness = .2;
  back = new THREE.DirectionalLight(0xC8B68E, 11.4);
  back.position.set(-80, 100, 50);
  // back.shadowDarkness = .2;
  back.castShadow = true;
  scene.add(light);
  scene.add(shadow);
  scene.add(back);

  (0, _base.setBack)({ light: light, shadow: shadow, back: back, scene: scene });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScene = createScene;

var _base = __webpack_require__(0);

var _listener = __webpack_require__(4);

function createScene() {
  var width = _base.globals.width,
      height = _base.globals.height,
      ratio = _base.globals.ratio,
      w2 = _base.globals.w2,
      h2 = _base.globals.h2,
      fov = _base.globals.fov,
      near = _base.globals.near,
      far = _base.globals.far,
      scene = _base.globals.scene,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer,
      container = _base.globals.container,
      controls = _base.globals.controls;


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
  (0, _listener.addListeners)();
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  (0, _base.setBack)({ width: width, height: height, ratio: ratio, w2: w2, h2: h2, fov: fov, near: near, far: far, scene: scene, camera: camera, renderer: renderer, container: container, controls: controls });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListeners = addListeners;

var _base = __webpack_require__(0);

function handleMouseMove(event) {
  var mouse = _base.globals.mouse,
      mousePos = _base.globals.mousePos,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer;


  mouse = { x: event.clientX, y: event.clientY };

  (0, _base.setBack)({ mouse: mouse, mousePos: mousePos, camera: camera, renderer: renderer });
}

function handleMouseDown(event) {
  //
}

function handleMouseUp(event) {
  //
}

function handleTouchStart(event) {
  var mouse = _base.globals.mouse,
      mousePos = _base.globals.mousePos,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer;


  if (event.touches.length > 1) {
    event.preventDefault();
    mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }

  (0, _base.setBack)({ mouse: mouse, mousePos: mousePos, camera: camera, renderer: renderer });
}

function handleTouchEnd(event) {
  var mouse = _base.globals.mouse,
      mousePos = _base.globals.mousePos,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer;


  mousePos = { x: windowHalfX, y: windowHalfY };

  (0, _base.setBack)({ mouse: mouse, mousePos: mousePos, camera: camera, renderer: renderer });
}

function handleTouchMove(event) {
  var mouse = _base.globals.mouse,
      mousePos = _base.globals.mousePos,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer;


  if (event.touches.length == 1) {
    event.preventDefault();
    mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
  }

  (0, _base.setBack)({ mouse: mouse, mousePos: mousePos, camera: camera, renderer: renderer });
}

function onWindowResize() {
  var mouse = _base.globals.mouse,
      mousePos = _base.globals.mousePos,
      camera = _base.globals.camera,
      renderer = _base.globals.renderer;


  width = window.innerWidth;
  height = window.innerHeight;
  w2 = width / 2;
  h2 = height / 2;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  (0, _base.setBack)({ mouse: mouse, mousePos: mousePos, camera: camera, renderer: renderer });
}

function addListeners() {
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  document.addEventListener('touchmove', handleTouchMove, false);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vertex = vertex;

var _base = __webpack_require__(0);

var tick = 0;
var axis = new THREE.Vector3(0, 0, 1);
function vertex() {
  var params = _base.globals.params,
      particles = _base.globals.particles;


  if (tick % 2 === 0 && params && params.vortex !== 0) {
    for (var i = 0; i < particles.geometry.vertices.length; i++) {
      var _vertex = particles.geometry.vertices[i];
      var angle = -Math.PI / 180;
      if (params.vortex > 0) {
        angle *= (1 - _vertex.length() / params.radius) * params.vortex;
      } else {
        angle *= _vertex.length() / params.radius * Math.abs(params.vortex);
      }
      _vertex.applyAxisAngle(axis, angle);
    }
    particles.geometry.verticesNeedUpdate = true;
  }
  tick++;

  (0, _base.setBack)({ params: params, particles: particles });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createObjects = createObjects;

var _base = __webpack_require__(0);

var _sprite = __webpack_require__(7);

function createObjects() {
  var particles = _base.globals.particles,
      scene = _base.globals.scene;


  var texture = new THREE.CanvasTexture((0, _sprite.sprite)());
  var geometry = new THREE.Geometry();
  var material = new THREE.PointsMaterial({
    size: 8,
    map: texture,
    vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
  });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  (0, _base.setBack)({ particles: particles, scene: scene });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sprite = sprite;
function sprite() {
  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var ctx = canvas.getContext('2d');
  var gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
  gradient.addColorStop(0, 'rgba(230,215,128,1)');
  gradient.addColorStop(0.2, 'rgba(220,200,110,1)');
  gradient.addColorStop(0.22, 'rgba(200,180,98,.2)');
  gradient.addColorStop(1, 'rgba(100,50,255,0)');
  ctx.fillStyle = gradient; // "#FFFFFF"; // gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
};

/***/ })
/******/ ]);