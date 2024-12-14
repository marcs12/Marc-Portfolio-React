// fragment.glsl

uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;
varying vec2 vUv;

void main() {
    vec2 uvR = vUv + uOffset * 0.05;
    vec2 uvG = vUv;
    vec2 uvB = vUv - uOffset * 0.05;

    float r = texture2D(uTexture, uvR).r;
    float g = texture2D(uTexture, uvG).g;
    float b = texture2D(uTexture, uvB).b;

    vec4 color = vec4(r, g, b, uAlpha);

    gl_FragColor = color;
}