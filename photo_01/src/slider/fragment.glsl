

uniform sampler2D u_pic_1;
uniform sampler2D u_pic_2;
uniform vec4 u_bound_1;
uniform vec4 u_bound_2;
uniform float u_time;
uniform float u_mode;

varying vec2 v_uv;

vec4 getColor(vec2 uv, vec4 bound, sampler2D pic) {
  if (uv.x > bound[3] && uv.x < bound[1]
      && uv.y > bound[2] && uv.y < bound[0]) {
    vec2 finalUV = vec2((uv.x - bound[3]) / (bound[1] - bound[3]),
                        (uv.y - bound[2]) / (bound[0] - bound[2]));
    return texture2D(pic, finalUV);
  } else {
    return vec4(0.9, 0.9, 0.9, 1.0);
  }
}

void main() {
  if (u_mode == 0.0) {
    if (mod(v_uv.y * 10.0, 1.0) <= u_time) {
      gl_FragColor = getColor(v_uv, u_bound_1, u_pic_1);
    } else {
      gl_FragColor = getColor(v_uv, u_bound_2, u_pic_2);
    }
  }

  if (u_mode == 1.0) {
    vec2 uv_1 = vec2(v_uv.x - u_time, v_uv.y);
    if (uv_1.x >= 0.0 && uv_1.x <= 1.0 && uv_1.y >= 0.0 && uv_1.y <= 1.0) {
      if (uv_1.x > u_bound_1[3] && uv_1.x < u_bound_1[1]
        && uv_1.y > u_bound_1[2] && uv_1.y < u_bound_1[0]) {
          vec2 uv = vec2((uv_1.x - u_bound_1[3]) / (u_bound_1[1] - u_bound_1[3]),
                        (uv_1.y - u_bound_1[2]) / (u_bound_1[0] - u_bound_1[2]));
        gl_FragColor = texture2D(u_pic_1, uv);
      } else {
        gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
      }
    }

    vec2 uv_2 = vec2(1.0 + v_uv.x - u_time, v_uv.y);
    if (uv_2.x >= 0.0 && uv_2.x <= 1.0 && uv_2.y >= 0.0 && uv_2.y <= 1.0) {
      if (uv_2.x > u_bound_2[3] && uv_2.x < u_bound_2[1]
      && uv_2.y > u_bound_2[2] && uv_2.y < u_bound_2[0]) {
        vec2 uv = vec2((uv_2.x - u_bound_2[3]) / (u_bound_2[1] - u_bound_2[3]),
                      (uv_2.y - u_bound_2[2]) / (u_bound_2[0] - u_bound_2[2]));
        gl_FragColor = texture2D(u_pic_2, uv);
      } else {
        gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
      }
    }
  }
}