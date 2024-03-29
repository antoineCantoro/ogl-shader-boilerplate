precision highp float;

uniform float uTime;

varying vec2 vUv;

void main() {
    gl_FragColor.rgb = vec3(0.8, 0.7, 1.0) + 0.3 * cos(vUv.xyx + uTime);
    gl_FragColor.a = 1.0;
}