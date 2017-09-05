import { globals, setBack } from './base';

export function createLights() {
  let { light, shadow, back, scene } = globals;

  light = new THREE.HemisphereLight(0xC8B68E, 0xC8B68E, 50)
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

  setBack({ light, shadow, back, scene });
};