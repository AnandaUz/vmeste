import "./c-ani-4-podhodim.scss";
import template from "./c-ani-4-podhodim.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAni4Podhodim extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    // this.scrollToTop();

    const h0 = (window.innerHeight - 1022) / 2 - 150;
    const hTop = 120;
    const h1 = window.innerHeight / 2 - hTop;
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
    t += dd + d0;

    this.doAnimationByPixel({
      elClassName: ".block-01",
      start: t,
      duration: dd * 4,
      onStepPixel: ({ yProgress = 0, y = 0, el }) => {
        const v = yProgress;
        el.style.transform = `translateY(${-h0}px) rotate(${45 + -(270 + 45) * v}deg)`;
        el.style.opacity = (y / 100).toString();
      },
    });
    t += dd * 4;
    this.doAnimationByPixel({
      elClassName: ".block-01",
      start: t,
      duration: dd / 2,
      onStepPixel: ({ yProgress = 0, el }) => {
        if (yProgress === 0) return;
        el.style.opacity = (1 - yProgress).toString();
      },
    });
    t += dd / 2;

    this.doAnimationByPixel({
      elClassName: ".block-00",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        if (yProgress === 0) return;
        const yy = h0 - (h0 - h1) * yProgress;
        el.style.transform = `translateY(${-yy}px) scale(${1 + 1.3 * yProgress})`;
      },
    });
    t += dd;

    this.doAnimationByPixel({
      elClassName: "h2.m",
      start: t,
      duration: dd / 2,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `scale(${2 - yProgress})`;
        el.style.opacity = yProgress.toString();
      },
    });
    const el0 = this.querySelector(".block-02") as HTMLElement;
    const mEl0 = window.innerHeight / 2 - hTop;
    el0.style.marginTop = -mEl0 + "px";
    t += dd / 2;
    this.doAnimationByPixel({
      elClassName: ".block-02",
      start: t,
      duration: dd * 4,
      onStepPixel: ({ yProgress = 0, y = 0, el }) => {
        const v = yProgress;
        el.style.transform = `rotate(${45 + -(270 + 45) * v}deg)`;
        el.style.opacity = (y / 100).toString();
      },
    });
  }
}
customElements.define("c-ani-4-podhodim", CAni4Podhodim);
