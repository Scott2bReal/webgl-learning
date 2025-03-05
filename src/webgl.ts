import { fragmentSource } from "./shaders/fragmentSource";
import { vertexSource } from "./shaders/vertexSource";
import { createProgram } from "./utils/createProgram";
import { createShader } from "./utils/createShader";
import { getGL } from "./utils/getGL";

export function setup() {
  try {
    const gl = getGL("canvas");
    const vShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = createProgram(gl, vShader, fShader);

    gl.useProgram(program);

    // Get attribute locations
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );

    // Get uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      "iResolution"
    );
    const timeUniformLocation = gl.getUniformLocation(program, "iTime");

    // Full-screen triangle
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions: number[] = [
      -1,
      -1, // Bottom-left
      3,
      -1, // Bottom-right (extends beyond)
      -1,
      3, // Top-left
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create and bind VAO
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Enable position attribute
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const primitiveType = gl.TRIANGLES;
    const pOffset = 0;
    const pCount = 3;

    function drawScene() {
      const currentTime = performance.now() / 1000; // Convert to seconds

      // Set uniforms
      gl.uniform2f(
        resolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height
      );
      gl.uniform1f(timeUniformLocation, currentTime);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(primitiveType, pOffset, pCount);

      requestAnimationFrame(drawScene);
    }

    drawScene();
  } catch (e) {
    console.error(e);
  }
}
