import "./c-ani-start.scss";
import template from "./c-ani-start.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAniStart extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    this.doAnimation({
      elClassName: ".str-down",
      start: 0,
      end: 0.2,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateY(${progress * 100}px)`;
      },
    });
    const s = 1000;
    this.doAnimation({
      elClassName: ".i01",
      start: 0,
      end: 1,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translate(-50%, ${(-progress * s) / 2}px)`;
      },
    });
    this.doAnimation({
      elClassName: ".i02",
      start: 0,
      end: 1,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translate(-50%, ${-progress * s}px)`;
      },
    });

    const t_s = 100;
    this.doAnimation({
      elClassName: ".t00",
      start: 0,
      duration: 0.15,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateY(${-progress * t_s}px)`;
        elem.style.opacity = `${1 - progress}`;
      },
    });
    this.doAnimation({
      elClassName: ".t01",
      start: 0.05,
      duration: 0.15,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateY(${-progress * t_s}px)`;
        elem.style.opacity = `${1 - progress}`;
      },
    });

    const d00 = 0.15;
    this.doAnimation({
      elClassName: ".block-02",
      start: 0.1,
      duration: d00 * 4,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateY(${-progress * 500}px)`;
      },
    });
    this.doAnimation({
      elClassName: ".bl-00",
      start: 0.1,
      duration: d00,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateX(${200 - progress * 200}px)`;
        elem.style.opacity = `${progress}`;
      },
    });
    this.doAnimation({
      elClassName: ".bl-01",
      start: 0.1 + d00,
      duration: d00,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateX(-${200 - progress * 200}px)`;
        elem.style.opacity = `${progress}`;
      },
    });
    this.doAnimation({
      elClassName: ".bl-02",
      start: 0.1 + d00 * 2,
      duration: d00,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateX(${200 - progress * 200}px)`;
        elem.style.opacity = `${progress}`;
      },
    });
    this.doAnimation({
      elClassName: ".bl-03",
      start: 0.1 + d00 * 3,
      duration: d00,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateX(-${200 - progress * 200}px)`;
        elem.style.opacity = `${progress}`;
      },
    });
  }
  // update(): void {
  //   super.update();

  //   const strDownEl = document.querySelector(".str-down") as HTMLElement;

  //   const v00 = this.getSubProgress(0, 0.2);

  //   const i01 = document.querySelector("") as HTMLElement;
  //   const i02 = document.querySelector(".i02") as HTMLElement;
  //   const v01 = this.getSubProgress(0, 1);

  //   i02.style.transform = `translate(-50%, ${-v01 * s}px)`;
  // }
}
customElements.define("c-ani-start", CAniStart);
