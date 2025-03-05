export function getGL(canvasId: string): WebGL2RenderingContext {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.error("Canvas not found");
    throw new Error("Canvas not found");
  }
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.error("WebGL2 not supported");
    throw new Error("Could not get webgl render context");
  }
  return gl;
}
