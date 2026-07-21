import "./c-ani-6-svaz.scss";
import template from "./c-ani-6-svaz.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";
import "./c-kartochka/c-kartochka";

export class CAni6Svaz extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    this.scrollToTop();

    const bl0 = this.querySelector(".block-00") as HTMLElement;
    for (let j = 0; j < 8; j++) {
      for (let jj = 0; jj < 2; jj++) {
        const el = document.createElement("div");
        el.className = "bl-in b" + jj;
        el.style.setProperty("--r", `${(j * 360) / 8}deg`);
        bl0.appendChild(el);
      }
    }
    const dd = 150;
    // const d1 = 50;

    let t = 0;
    this.doAnimationByPixel({
      elClassName: `.block-00`,
      start: t,
      duration: 200,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.setProperty("--sc", `${yProgress * 100}%`);
      },
    });
    t += 200;

    this.doAnimationByPixel({
      elClassName: `.cards`,
      start: t,
      duration: dd * 2,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `scale(${Math.pow(yProgress, 4) * 100}%) translateX(-${(1 - Math.pow(yProgress, 4)) * 1000}px)`;
        if (yProgress > 0.99) el.style.overflowX = "auto";
        else el.style.overflowX = "";
      },
    });
    // t += dd * 2;
    this.doAnimationByPixel({
      elClassName: `.block-01`,
      start: t,
      duration: dd * 2,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.opacity = yProgress.toString();
      },
    });

    this.doAnimationByPixel({
      elClassName: `.block-00`,
      start: t,
      duration: dd * 2,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.opacity = (1 - 0.5 * yProgress).toString();
      },
    });
  }
}
customElements.define("c-ani-6-svaz", CAni6Svaz);
