export function sprite() {
  let canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  let ctx = canvas.getContext('2d');
  let gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  gradient.addColorStop(0, 'rgba(230,215,128,1)');
  gradient.addColorStop(0.2, 'rgba(220,200,110,1)');
  gradient.addColorStop(0.22, 'rgba(200,180,98,.2)');
  gradient.addColorStop(1, 'rgba(220,250,255,0)');
  ctx.fillStyle = gradient;
  // ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
};