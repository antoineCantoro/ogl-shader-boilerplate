precision highp float;

uniform float uTime;
uniform float uCursorX;
uniform float uCursorY;

varying vec2 vUv;

#define PI 3.14159265
#define FC gl_FragCoord

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() {

    vec2 uv = vUv;
    // gl_FragColor = vec4(1.0,1.0, 1.0, 1.0);
    // gl_FragColor = vec4(1.0,1.0, 1.0, 1.0);

    float col = 0.0;
    float i = 5.0;

    // vec2 spec = vec2(0.1  + sin(uTime), 0.5);

    // uv.x -= 0.5;
    // uv.y *= sin(uTime * 0.1) * 5.5;

    // uv.x *= cos(uv.y * uTime) + uv.y;
    // col += abs(0.1 / uv.x) * spec.y;

    float perlin0 = cnoise(
        vec2(
          sin(uv.x), 
          sin(uv.y)
        ) 
        * 5.0
    );

    // perlin0 = smoothstep(0.1, 0.8, perlin0);
    float perlin = cnoise(
      vec2(
        sin(perlin0 + uTime * 0.1), 
        sin(perlin0 + uTime * 0.1)) 
        * 10.5
      );

    // float test = perlin;
    // float test = step(0.5, perlin);

    // perlin = abs(smoothstep(0.1, 0.8, perlin));
    perlin = smoothstep(0.2, 0.8, perlin);
    // perlin = perlin;
    float noise = random(uv * uTime) * 0.2;
    gl_FragColor = vec4(perlin + noise, perlin + noise, perlin + noise, 1.0);


    // // uv.x += sin(i * 20.0 + spec.x * 5.0 * uTime * 6.0 + uv.y * 1.5) * spec.y * 0.25;
    // uv.x -= 0.5;
    // uv.y *= sin(uTime * 0.1) * 5.5;

    // uv.x *= cos(uv.y * uTime) + uv.y;
    // col += abs(0.1 / uv.x) * spec.y;



    // col -= noise * 0.1;  
    // gl_FragColor = vec4(col + noise * 0.1, col + noise * 0.05, col, 1.0);

}