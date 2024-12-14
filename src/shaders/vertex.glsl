// vertex.glsl

uniform vec2 uOffset;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += uOffset.x;
    newPosition.y += uOffset.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}