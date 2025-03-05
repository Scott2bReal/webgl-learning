export const vertexSource = `#version 300 es

in vec2 a_position;
out vec2 fragCoord;

void main() {
    fragCoord = a_position * 0.5 + 0.5; // Convert clip space (-1 to 1) to (0 to 1)
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
