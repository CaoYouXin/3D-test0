import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

export const add2Scene = (scene, container) => {
  var geometry = new THREE.PlaneGeometry(container.offsetWidth, container.offsetHeight, 1, 1);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      // "u_has_tex": { value: true },
      // "u_tex": { type: 't', value: texture },
      // "u_height": { value: canvas.height + 0.0 },
      // "u_width": { value: canvas.width + 0.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    // transparent: true,
    // depthTest: false,
    // blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}