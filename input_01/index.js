var vertexShader = `
uniform float u_width;
uniform float u_height;

varying vec2 v_uv;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  v_uv = uv;
  v_uv.x = v_uv.x / u_width * 10.0 * u_height;
}
`;

var fragmentShader = `
uniform bool u_has_tex;
uniform sampler2D u_tex;

varying vec2 v_uv;

void main() {
  if (u_has_tex) {
    vec4 color = texture2D(u_tex, v_uv);
    
    if (color.a == 0.0) {
      gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
    } else {
      color.rgb = vec3(0.9, 0.9, 0.9) * (1.0 - color.a) + color.rgb * color.a;
    
      gl_FragColor = color;
    }
  } else {
    gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
  }
}
`;

function InputTester(el) {
  this.container = document.querySelector(el);

  this.constObj = {
    FIELD_OF_VIEW: 45,
    NEAR_CLIPPING_PLANE: 1,
    FAR_CLIPPING_PLANE: 10
  };
}

InputTester.prototype.initRenderer = function () {
  var container = this.container;
  var renderer = null;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);

  this.renderer = renderer;
  this.container.appendChild(this.renderer.domElement);
}

InputTester.prototype.initCamera = function () {
  var container = this.container;
  var CONST = this.constObj;
  var camera = null;

  camera = new THREE.PerspectiveCamera(
    CONST.FIELD_OF_VIEW,
    container.offsetWidth / container.offsetHeight,
    CONST.NEAR_CLIPPING_PLANE,
    CONST.FAR_CLIPPING_PLANE
  );
  //相机坐标
  camera.position.set(0, 0, 3);

  this.camera = camera;
}

InputTester.prototype.initScene = function () {
  this.scene = new THREE.Scene();
}

InputTester.prototype.initLight = function () {
  var light = null;

  light = new THREE.DirectionalLight(0xffffff, 1.5);

  light.position.set(0, 0, 1);

  this.light = light;

  this.scene.add(this.light);
}

InputTester.prototype.initControls = function (domElement) {
  this.controls = new THREE.OrbitControls(this.camera, domElement);
}

InputTester.prototype.loop = function () {
  var self = this;
  self.renderer.render(self.scene, self.camera);
  requestAnimationFrame(function () { self.loop(); });
}

InputTester.prototype.build = function () {
  this.initRenderer();
  this.initScene();
  this.initCamera();
  this.initLight();

  this.initInput();
}

InputTester.prototype.initInput = function () {
  var geometry = new THREE.PlaneGeometry(2, 0.2, 1, 1);
  var canvas = this.sprite("点击，然后输入...");
  var texture = new THREE.CanvasTexture(canvas,
    THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
    THREE.LinearFilter, THREE.LinearMipMapLinearFilter,
    THREE.RGBAFormat);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      "u_has_tex": { value: true },
      "u_tex": { type: 't', value: texture },
      "u_height": { value: canvas.height + 0.0 },
      "u_width": { value: canvas.width + 0.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    // transparent: true,
    // depthTest: false,
    // blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(geometry, material);
  this.scene.add(plane);
  this.plane = plane;
}

InputTester.prototype.sprite = function (value) {
  var canvas = document.createElement('canvas');

  canvas.width = 64;
  canvas.height = 64;

  if (!value) {
    return canvas;
  }

  var ctx = canvas.getContext('2d', { alpha: true });
  ctx.font = "56px serif";

  var ecllipse = false;
  var box = ctx.measureText(value);
  while (box.width > 640) {
    ecllipse = true;
    value = value.substring(0, value.length - 1);
    box = ctx.measureText(value + '...');
  }

  canvas.width = box.width + 5;

  ctx = canvas.getContext('2d', { alpha: true });
  ctx.font = "56px serif";
  ctx.fillStyle = "#000";
  ctx.fillText(ecllipse ? value + '...' : value, 0, 56);


  // canvas.style.position = 'absolute';
  // canvas.style.left = '0';
  // canvas.style.top = '0';
  // document.body.appendChild(canvas);


  return canvas;
}

InputTester.prototype.updateTexture = function (value) {
  // this.plane.material.uniforms.u_has_tex.value = true;
  // this.plane.material.uniforms.u_has_tex.needUpdate = true;

  var canvas = this.sprite(value || "点击，然后输入...");
  var texture = new THREE.CanvasTexture(canvas,
    THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
    THREE.LinearFilter, THREE.LinearMipMapLinearFilter,
    THREE.RGBAFormat);
  this.plane.material.uniforms.u_tex.value = texture;
  this.plane.material.uniforms.u_tex.needUpdate = true;
  this.plane.material.uniforms.u_width.value = canvas.width + 0.0;
  this.plane.material.uniforms.u_width.needUpdate = true;
}