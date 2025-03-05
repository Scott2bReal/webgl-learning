export function createShader(
  /**
   * The webgl rendering context
   */
  gl: WebGL2RenderingContext,
  /**
   * The type of shader to create.
   */
  type: GLenum,
  /**
   * The source code of the shader.
   */
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("Error setting up shader in gl render context");
    throw new Error("Could not prepare shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    console.error("Could not compile shader:", gl.getShaderInfoLog(shader));
    throw new Error("Error compiling shader");
  }
  return shader;
}
