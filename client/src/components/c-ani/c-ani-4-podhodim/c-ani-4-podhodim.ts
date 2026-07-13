import "./c-ani-4-podhodim.scss";
import template from "./c-ani-4-podhodim.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAni4Podhodim extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    this.scrollToTop();

    const h0 = (window.innerHeight - 1022) / 2 - 150;
    // const dy = 800;
    const dd = 200;
    const d0 = 0;
    let t = 0;
    for (let i = 1; i < 4; i++) {
      this.doAnimationByPixel({
        elClassName: ".bg-" + i,
        start: t,
        duration: dd,
        onStepPixel: ({ yProgress = 0, el }) => {
          el.style.transform = `translate(-50%, -50%) scale(${yProgress})`;
        },
      });
      t += dd + d0;
    }
    this.doAnimationByPixel({
      elClassName: ".block-00",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateY(${-h0 * yProgress}px)`;
      },
    });
    this.doAnimationByPixel({
      elClassName: "h2",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateY(${h0 * (1 - yProgress)}px)`;
      },
    });
    // this.doAnimationByPixel({
    //   elClassName: ".block-01",
    //   start: t,
    //   duration: dd,
    //   onStepPixel: ({ yProgress = 0, el }) => {
    //     el.style.transform = `translateY(${-h0 * yProgress}px)`;

    //   },
    // });
    t += dd + d0;
    this.doAnimationByPixel({
      elClassName: ".block-01",
      start: t,
      duration: dd * 4,
      onStepPixel: ({ yProgress = 0, y = 0, el }) => {
        // const n = 4;
        // const amplitude = 1;
        // const v = Math.sin(2 * Math.PI * yProgress) * yProgress;
        el.style.transform = `translateY(${-h0}px) rotate(${45 + -(270 + 45) * yProgress}deg)`;
        el.style.opacity = (y / 100).toString();
      },
    });
  }
}
customElements.define("c-ani-4-podhodim", CAni4Podhodim);
