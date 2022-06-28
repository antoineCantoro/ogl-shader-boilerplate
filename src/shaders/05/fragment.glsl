precision highp float;

uniform float uTime;
uniform float uCursorX;
uniform float uCursorY;

varying vec2 vUv;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


void main() {

    vec2 uv = vUv;

    float myNoise = noise(vUv * 2.0);

    uv += myNoise * 1.0 * uTime * 0.4; 
    vec3 color = vec3(1.0);
    

    color = vec3(1.) * smoothstep(.18,.2,noise(uv)); // Big black drops
    color += smoothstep(.15,.2,noise(uv*10.)); // Black splatter
    color -= smoothstep(.35,.4,noise(uv*10.)); // Holes on splatter

    gl_FragColor = vec4(color, 1.0);
}