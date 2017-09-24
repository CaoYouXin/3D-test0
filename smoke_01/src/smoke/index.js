import smokePng from './Smoke-Element.png';

let smokeParticles = [], mesh, cubeSineDriver, group = new THREE.Group();

export const addSmoke2Scene = (scene, camera, container) => {
  let smokeTexture = THREE.ImageUtils.loadTexture(smokePng);
  let smokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00dddd,
    map: smokeTexture,
    transparent: true
  });
  let smokeGeo = new THREE.PlaneGeometry(2, 2);

  for (let p = 0; p < 150; p++) {
    let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 10 - 5);
    particle.rotation.z = Math.random() * Math.PI * 2;
    smokeParticles.push(particle);
    group.add(particle);
  }
  group.lookAt(camera.position);

  scene.add(group);

  var geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

export const evolveSmoke = (delta) => {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += (delta * 0.2);
  }
}

export const toCamera = (camera) => {
  group.lookAt(camera.position);
}