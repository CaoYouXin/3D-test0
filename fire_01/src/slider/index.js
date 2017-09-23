import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import firePng from '../flame.png';

export const add2Scene = (scene, container) => {
  var geometry = new THREE.PlaneGeometry(container.offsetWidth, container.offsetHeight, 1, 1);
  var texture = THREE.ImageUtils.loadTexture(firePng);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      // "u_has_tex": { value: true },
      "u_tex": { type: 't', value: texture },
      "u_time": { value: 0.0 }
      // "u_height": { value: canvas.height + 0.0 },
      // "u_width": { value: canvas.width + 0.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
    // depthTest: false,
    // blending: THREE.AdditiveBlending,
    // side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  var tween = new TWEEN.Tween({ time: 0.0 })
    .to({ time: 1.0 }, 512)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      plane.material.uniforms.u_time.value = this.time;
      plane.material.uniforms.u_time.needUpdate = true;
    })
    .repeat(Infinity)
    // .yoyo(true)
    .start();
}