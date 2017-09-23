import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import pic1Url from '../pics/timg.jpg';
import pic2Url from '../pics/timg2.jpg';

const calcBound = (picWidth, picHeight, planeWidth, planeHeight) => {
  let ret = [];

  if (picWidth / picHeight > planeWidth / planeHeight) {
    ret[1] = .99999;
    ret[3] = 0.0001;

    let pic = picHeight / (picWidth / planeWidth * planeHeight);
    let blank = 1.0 - pic;
    ret[2] = blank / 2.0;
    ret[0] = 1.0 - ret[2];

  } else {
    ret[0] = .99999;
    ret[2] = 0.0001;

    let pic = picWidth / (picHeight / planeHeight * planeWidth);
    let blank = 1.0 - pic;
    ret[3] = blank / 2.0;
    ret[1] = 1.0 - ret[3];

  }

  // console.log(ret);
  // console.log(new THREE.Vector4(ret[0], ret[1], ret[2], ret[3]));
  return new THREE.Vector4(ret[0], ret[1], ret[2], ret[3]);
  // return ret;
}

export const add2Scene = (scene, container) => {
  var geometry = new THREE.PlaneGeometry(container.offsetWidth, container.offsetHeight, 1, 1);
  var pic1 = THREE.ImageUtils.loadTexture(pic1Url);
  var pic2 = THREE.ImageUtils.loadTexture(pic2Url);

  var bound1 = calcBound(pic1.image.width, pic1.image.height, container.offsetWidth, container.offsetHeight);
  var bound2 = calcBound(pic2.image.width, pic2.image.height, container.offsetWidth, container.offsetHeight);

  console.log(bound1, bound2);

  var material = new THREE.ShaderMaterial({
    uniforms: {
      "u_time": { value: 1.0 },
      "u_mode": { value: 0.0 },
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
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(function () {
      if (this.time <= 1.01) {
        plane.material.uniforms.u_time.value = this.time;
        plane.material.uniforms.u_time.needUpdate = true;
      }
    })
    .repeat(Infinity)
    // .yoyo(true)
    .start();
}