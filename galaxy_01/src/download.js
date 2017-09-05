const downloadFile = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName, json) {
    data = json ? JSON.stringify(data) : data;
    let blob = new Blob([data], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

export { downloadFile };

export function PCDExporter(vertices) {
  let data = '# .PCD v.7 - Point Cloud Data file format' + '\r\n';
  data += 'VERSION .7' + '\r\n';
  data += 'FIELDS x y z rgb' + '\r\n';
  data += 'SIZE 4 4 4 4' + '\r\n';
  data += 'TYPE F F F F' + '\r\n';
  data += 'COUNT 1 1 1 1' + '\r\n';
  data += 'WIDTH ' + vertices.length + '\r\n';
  data += 'HEIGHT 1' + '\r\n';
  data += 'VIEWPOINT 0 0 0 1 0 0 0' + '\r\n';
  data += 'POINTS ' + vertices.length + '\r\n';
  data += 'DATA ascii' + '\r\n';
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let x = v.x.toFixed(5);
    let y = v.y.toFixed(5);
    let z = v.z.toFixed(5);
    data += x + ' ' + y + ' ' + z + ' 4.2108e+06';
    if (i < vertices.length - 1) {
      data += '\r\n';
    }
  }
  /*
  console.log('data', data);
  var loader = new THREE.PCDLoader();
  string2ArrayBuffer(data, function(arrayBuffer) {
    var check = loader.parse(arrayBuffer);
    console.log('check', check);
  });
  */
  return data;
};

export function PLYExporter(vertices) {
  let model = {
    vertex: {
      x: [],
      y: [],
      z: []
    },
    face: {
      vertex_index: []
    }
  };
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    model.vertex.x.push(v.x);
    model.vertex.y.push(v.y);
    model.vertex.z.push(v.z);
  }
  let data = writePLY(model);
  return data;
};

export function XYZExporter(vertices) {
  let data = '';
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let x = v.x.toFixed(6);
    let y = v.y.toFixed(6);
    let z = v.z.toFixed(6);
    data += x + ' ' + y + ' ' + z + '\r\n';
  }
  return data;
};