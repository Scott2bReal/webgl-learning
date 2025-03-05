export function createProgram(
  gl: WebGL2RenderingContext,
  vShader: WebGLShader,
  fShader: WebGLShader
) {
  const program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    const log = gl.getProgramInfoLog(program);
    throw new Error(
      `Encountered error linking shaders to program: ${log ?? ""}`
    );
  }
  return program;
}
