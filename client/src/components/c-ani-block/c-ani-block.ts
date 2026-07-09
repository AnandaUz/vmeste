import "./c-ani-block.scss";
import template from "./c-ani-block.html?raw";
import { ScrollLinked } from "@/scroll-linked";

type TDoAnimation = {
  elClassName: string;
  start?: number;
  duration?: number;
  end?: number;
  onStep?: (progress: number, el: HTMLElement) => void;
  onStepPixel?: ({ y, yProgress, el }: TOnStepPixel) => void;
};
type TOnStepPixel = {
  y: number;
  yProgress: number;
  el: HTMLElement;
};

export class CAniBlock extends HTMLElement {
  private ticking = false;
  wrapEl!: HTMLElement;
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
    this.wrapEl = this.querySelector(".pin-wrap") as HTMLElement;
  }
  getSubProgress(start: number, end: number) {
    return ScrollLinked.getSubProgress(this.progress, start, end);
  }
  doAnimation({ elClassName, start, duration, end, onStep }: TDoAnimation) {
    const el = this.querySelector(elClassName) as HTMLElement;
    if (!el) return;

    const _start = start ?? 0;
    let _end;
    if (duration) _end = _start + duration;
    else _end = end ?? 1;

    let v = -Infinity;

    this.animations.push(() => {
      const subProgress = ScrollLinked.getSubProgress(
        this.progress,
        _start,
        _end,
      );
      if (v === subProgress) return;
      v = subProgress;

      onStep?.(subProgress, el);
    });
  }
  doAnimationByPixel({
    elClassName,
    start,
    duration,
    end,
    onStepPixel,
  }: TDoAnimation) {
    const el = this.querySelector(elClassName) as HTMLElement;
    if (!el) return;

    const _start = start ?? 0;
    let _end;
    if (duration) _end = _start + duration;
    else _end = end ?? 1;

    let v = -Infinity;

    this.animations.push(() => {
      const rect = this.wrapEl.getBoundingClientRect();
      let y = -rect.y;

      // if (y < _start || y > _end) return;

      y = Math.max(_start, y);
      y = Math.min(_end, y);

      const yProgress = (y - _start) / (_end - _start);

      // console.log(y, yProgress);

      if (v === yProgress) return;
      v = yProgress;

      onStepPixel?.({ y: y - _start, yProgress, el });
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
  /*
  getY() {
    const rect = this.wrapEl.getBoundingClientRect();

    console.log(rect);

    // const scrollableDistance = rect.height - window.innerHeight;
    // // сколько "запаса" всего
    // const progress = -rect.top / scrollableDistance;
    // return Math.min(1, Math.max(0, progress));
  }
  */
}
customElements.define("c-ani-block", CAniBlock);
