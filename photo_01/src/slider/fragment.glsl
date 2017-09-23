struct picture {
  bool using;
  vec4 bound;
  sampler2D tex;
};

uniform picture p1;
uniform picture p2;
uniform float time;
uniform float mode;

varying vec2 v_uv;

void main() {
  gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
}