import { World } from './world.js';

(function () {
  var world = new World('#main');
  world.build();
  world.rotate();
  console.log(world);
})();