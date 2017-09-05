import { downloadFile, PCDExporter, PLYExporter, XYZExporter } from './download';

export class GalaxyParameters {

  constructor() {
    this.arms = 9;
    this.stops = 1100;
    this.revolutions = 1.0;
    this.radius = 400;
    this.sparse = 0.4;
    this.dispersion = 0.6; // more 0 - less 1
    this.bulge = 0.6;
    this.vortex = 0.0;
  }

  randomize() {
    for (let i = 0; i < gui.__controllers.length; i++) {
      let c = gui.__controllers[i];
      if (c.__min) {
        let value = c.__min + (c.__max - c.__min) * Math.random();

        this[c.property] = value;
        c.updateDisplay();
      }
    }
    onChange(this);
  }

  exportPCD() {
    let geometry = particles.geometry;
    let results = PCDExporter(geometry.vertices);
    downloadFile(results, 'galaxy.pcd');
  }

  exportXYZ() {
    let geometry = particles.geometry;
    let results = XYZExporter(geometry.vertices);
    downloadFile(results, 'galaxy.xyz');
  }

  exportPLY() {
    let geometry = particles.geometry;
    let results = PLYExporter(geometry.vertices);
    downloadFile(results, 'galaxy.ply');
  }

  exportOBJ() {
    let exporter = new THREE.OBJExporter();
    let results = exporter.parse(scene);
    downloadFile(results, 'galaxy.obj');
  }

  exportSTL() {
    let exporter = new THREE.STLExporter(); // new THREE.OBJExporter();
    let results = exporter.parse(scene);
    downloadFile(results, 'galaxy.stl');
  }

  armTheta() {
    return Math.PI * 2 / this.arms;
  }

  modulus() {
    return Math.pow(2, 31);
  }

};