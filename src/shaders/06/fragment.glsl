precision highp float;

uniform float uTime;
uniform float uCursorX;
uniform float uCursorY;

varying vec2 vUv;

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

    // float distort = ( sin(uTime + uv.y * uv.x) + smoothstep(0.1, 0.92, uv.x) ) * 0.5;
    // float distort = sin(uTime + uv.y * uv.x) + smoothstep(0.1, 0.92, uv.x);
    float distort = uv.x * 1. * sin(uv.x * 1.2 + uv.y * 2.0 + uTime ) + uTime * 0.1;

    // noise = step(sin(uTime), noise);
    // noise = step(myCircle, sin(uTime));

    vec3 brightness = vec3(0.5, 0.5, 0.5);
    vec3 contrast = vec3(0.5, 0.5, 0.5);
    vec3 oscilation = vec3(0.5, 0.5, 0.5);
    vec3 phase = vec3(0.0, 0.1, 0.2);

    // vec3 color = vec3(1.0);
    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

    // Add Noise to gradient
    color -= random(uTime * uv - 1.8) * 0.15;

    gl_FragColor = vec4(color, 1.0);
}