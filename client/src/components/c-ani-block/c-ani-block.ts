import "./c-ani-block.scss";
import template from "./c-ani-block.html?raw";
import { ScrollLinked } from "@/scroll-linked";

type TDoAnimation = {
  elClassName: string;
  start?: number;
  duration?: number;
  end?: number;
  onStep: (progress: number, el: HTMLElement) => void;
};

export class CAniBlock extends HTMLElement {
  private ticking = false;
  wrapEl?: HTMLElement;
  progress = 0;
  animations: (() => void)[] = [];

  connectedCallback() {
    this.classList.add("ani-block");

    this.innerHTML = template;

    window.addEventListener(
      "scroll",
      () => {
        {
          if (!this.ticking) {
            requestAnimationFrame(() => this.update());
            this.ticking = true;
          }
        }
      },
      { passive: true },
    );
  }
  init() {
    this.wrapEl = document.querySelector(".pin-wrap") as HTMLElement;
  }
  getSubProgress(start: number, end: number) {
    return ScrollLinked.getSubProgress(this.progress, start, end);
  }
  doAnimation({ elClassName, start, duration, end, onStep }: TDoAnimation) {
    const el = document.querySelector(elClassName) as HTMLElement;
    if (!el) return;

    const _start = start ?? 0;
    let _end;
    if (duration) _end = _start + duration;
    else _end = end ?? 1;

    this.animations.push(() => {
      const subProgress = ScrollLinked.getSubProgress(
        this.progress,
        _start,
        _end,
      );
      onStep(subProgress, el);
    });
  }
  update() {
    if (!this.wrapEl) return;
    this.progress = ScrollLinked.getPinProgress(this.wrapEl);
    // Apply progress to CSS variable for styling
    this.style.setProperty("--pin-progress", this.progress.toString());
    this.ticking = false;

    this.animations.forEach((fn) => fn());
  }
}
customElements.define("c-ani-block", CAniBlock);
