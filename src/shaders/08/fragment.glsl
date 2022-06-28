#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform float uCursorX;
uniform float uCursorY;

uniform sampler2D textureMap01;
uniform sampler2D textureMap02;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    vec3 tex01 = texture2D(textureMap01, vUv).rgb;
    vec3 tex02 = texture2D(textureMap02, vUv).rgb;
    

    float movement = 0.05 * sin(uv.y * 13.0 + uTime * 0.2) +
                     0.15 * sin(uv.y * 17.0 + uTime * 0.3);

    uv.x += 5.0 * movement * pow(uv.y, 3.0) + (uTime + uv.y) * 0.01;
    uv.x *= 2.0;
    uv.x = fract(uv.x);


    float t = uv.x;
        //   t = smoothstep(0.1, 0.4, uv.x)
        //    - smoothstep(0.60, 0.9, uv.x);
          t = step(0.1, uv.x)
            - step(0.5, uv.x);

    
    vec4 color1 = vec4(0.8, 0.9, 0.8, 1.0);
    vec4 color2 = vec4(0.8, 0.2, 0.2, 1.0);

    // vec4 finalColor = mix(color1, color2, t);
    // vec4 finalColor = vec4(1.0);

    // tex02.r += uv.x *  movement * uTime;

    vec4 finalColor = mix(vec4(tex01, 1.0), vec4(tex02, 1.0), t);

    gl_FragColor = vec4(finalColor);
}