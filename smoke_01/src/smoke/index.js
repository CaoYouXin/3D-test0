import smokePng from './Smoke-Element.png';

let smokeParticles = [], mesh, cubeSineDriver;

export const addSmoke2Scene = (scene, container) => {
  let light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  scene.add(light);

  let smokeTexture = THREE.ImageUtils.loadTexture(smokePng);
  let smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00dddd,
    map: smokeTexture,
    transparent: true
  });
  let smokeGeo = new THREE.PlaneGeometry(1, 1);

  for (let p = 0; p < 150; p++) {
    let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 10 - 1);
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }

  let geometry = new THREE.CubeGeometry(2, 2, 2);
  let material = new THREE.MeshLambertMaterial({
    color: 0xaa6666,
    wireframe: false
  });
  mesh = new THREE.Mesh(geometry, material);
  cubeSineDriver = 0;
}

export const evolveSmoke = (delta) => {
  if (mesh) {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    cubeSineDriver += .01;
    mesh.position.z = 1 + (Math.sin(cubeSineDriver) * 5);
  }

  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += (delta * 0.2);
  }
}