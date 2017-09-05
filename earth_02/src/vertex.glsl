precision mediump float;

uniform float u_ps;
uniform float u_r;
uniform float u_pi;

varying vec2 v_uv;

void main() {
  
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = u_ps;

  v_uv.y = asin(position.y / u_r);

  float r = u_r * cos(v_uv.y);
  float asinV = asin(position.z / r);
  float acosV = acos(position.x / r);

  if (position.z > 0.0) {
    if (position.x > 0.0) {
      v_uv.x = asinV;
    } else {
      v_uv.x = acosV;
    }
  } else {
    if (position.x > 0.0) {
      v_uv.x = asinV + 2.0 * u_pi;
    } else {
      v_uv.x = 2.0 * u_pi - acosV;
    }
  }

  v_uv.x = v_uv.x / 2.0 / u_pi;
  v_uv.x = 1.0 - v_uv.x;
  v_uv.y = (v_uv.y + u_pi / 2.0) / u_pi;
}