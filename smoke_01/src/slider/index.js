import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import pic1Url from '../pics/timg.jpg';
import pic2Url from '../pics/timg2.jpg';
import pic3Url from '../heart-clipart.png';

const calcBound = (picWidth, picHeight, planeWidth, planeHeight) => {

  // console.log(picWidth, picHeight, planeWidth, planeHeight);
  let ret = [];

  if (picWidth / picHeight > planeWidth / planeHeight) {
    ret[1] = 1.0;
    ret[3] = 0.0;

    let pic = picHeight / (picWidth / planeWidth * planeHeight);
    let blank = 1.0 - pic;
    ret[2] = blank / 2.0;
    ret[0] = 1.0 - ret[2];

  } else {
    ret[0] = 1.0;
    ret[2] = 0.0;

    let pic = picWidth / (picHeight / planeHeight * planeWidth);
    let blank = 1.0 - pic;
    ret[3] = blank / 2.0;
    ret[1] = 1.0 - ret[3];

  }

  // console.log(ret);
  return new THREE.Vector4(ret[0], ret[1], ret[2], ret[3]);
}

let pics = [];

const loadImage = (complete) => {
  var loader = new THREE.TextureLoader();
  var count = 0;

  [pic1Url, pic2Url, pic3Url].forEach((url, i) => {
    count++;
    loader.load(
      // resource URL
      url,
      // Function when resource is loaded
      function (texture) {
        // do something with the texture
        pics[i] = texture;
        count--;

        if (count <= 0) {
          complete();
        }
      },
      // Function called when download progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // Function called when download errors
      function (xhr) {
        console.log('An error happened');
      }
    );
  });
}

let _scene, _container;

export const add2Scene = (scene, container) => {
  _scene = scene;
  _container = container;

  loadImage(() => {
    var geometry = new THREE.PlaneGeometry(container.offsetWidth, container.offsetHeight, 1, 1);
    var pic1 = pics[0];
    var pic2 = pics[1];
    var clip = pics[2];
    clip.wrapS = THREE.ClampToEdgeWrapping;
    clip.wrapT = THREE.ClampToEdgeWrapping;

    var bound1 = calcBound(pic1.image.width, pic1.image.height, container.offsetWidth, container.offsetHeight);
    var bound2 = calcBound(pic2.image.width, pic2.image.height, container.offsetWidth, container.offsetHeight);

    console.log(bound1, bound2);

    var material = new THREE.ShaderMaterial({
      uniforms: {
        "u_width": { value: container.offsetWidth + 0.0 },
        "u_height": { value: container.offsetHeight + 0.0 },
        "u_clip": { type: 't', value: clip },
        "u_time": { value: 1.0 },
        "u_mode": { value: 2.0 },
        "u_pic_1": { type: 't', value: pic1 },
        "u_bound_1": { value: bound1 },
        "u_pic_2": { type: 't', value: pic2 },
        "u_bound_2": { value: bound2 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
      // transparent: true,
      // depthTest: false,
      // blending: THREE.AdditiveBlending,
      // side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    var tween = new TWEEN.Tween({ time: 0.0 })
      .to({ time: 1.2 }, 5120)
      .easing(TWEEN.Easing.Cubic.In)
      .onUpdate(function () {
        if (this.time <= 1.01) {
          plane.material.uniforms.u_time.value = this.time;
          plane.material.uniforms.u_time.needUpdate = true;
        }
      })
      .repeat(Infinity)
      // .yoyo(true)
      .start();
  });
}