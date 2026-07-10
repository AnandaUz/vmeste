import "./c-ani-2-pochemu.scss";
import template from "./c-ani-2-pochemu.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAni2Pochemu extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    const dx = 450;
    const dd = 150;
    const d0 = 30;
    let t = -100;
    this.doAnimationByPixel({
      elClassName: ".block-01",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateX(${(1 - yProgress) * dx}px)`;
      },
    });
    t += dd - d0;

    this.doAnimationByPixel({
      elClassName: ".block-02",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateX(-${(1 - yProgress) * dx}px)`;
      },
    });
    const x1 = 700;
    t += dd - d0;
    this.doAnimationByPixel({
      elClassName: ".b-3-1",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateX( ${-(1 - yProgress) * x1}px)`;
      },
    });
    t += dd - d0;
    this.doAnimationByPixel({
      elClassName: ".b-3-2",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateX( ${-(1 - yProgress) * x1}px)`;
      },
    });
    t += dd - d0;
    this.doAnimationByPixel({
      elClassName: ".b-3-3",
      start: t,
      duration: dd,
      onStepPixel: ({ yProgress = 0, el }) => {
        el.style.transform = `translateX( ${-(1 - yProgress) * x1}px)`;
      },
    });
    t += dd - d0;
    this.doAnimationByPixel({
      elClassName: ".block-00",
      start: t,
      duration: 400,
      onStepPixel: ({ y = 0, el }) => {
        el.style.transform = `translateY(${-y}px)`;
      },
    });
    for (let i = 0; i < 5; i++) {
      t += dd;
      this.doAnimationByPixel({
        elClassName: ".block-0" + (i + 4),
        start: t,
        duration: dd,
        onStepPixel: ({ yProgress = 0, el }) => {
          el.style.transform = `scale(${1 + (1 - yProgress * yProgress)})`;
          el.style.opacity = (yProgress * yProgress).toString();
        },
      });
    }
  }
}
customElements.define("c-ani-2-pochemu", CAni2Pochemu);
