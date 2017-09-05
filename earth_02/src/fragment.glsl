precision mediump float;

uniform sampler2D u_ball_tex;
uniform sampler2D u_particle_tex;

varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_ball_tex, v_uv);
  
  if (color.r == 0.0) {
    discard;
  } else {
    gl_FragColor = texture2D( u_particle_tex, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ));
  }
}