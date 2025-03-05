import "./style.css";
import { setup } from "./webgl";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="h-screen   w-screen">
    <canvas id="canvas" class="w-screen h-screen"></canvas>
  </div>
`;

setup();
