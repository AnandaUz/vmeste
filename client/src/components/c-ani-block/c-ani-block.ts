import "./c-ani-block.scss";
import template from "./c-ani-block.html?raw";
import { ScrollLinked } from "@/scroll-linked";

export class CAniBlock extends HTMLElement {
  private ticking = false;
  wrapEl?: HTMLElement;
  progress = 0;

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
  update() {
    if (!this.wrapEl) return;
    this.progress = ScrollLinked.getPinProgress(this.wrapEl);
    // Apply progress to CSS variable for styling
    this.style.setProperty("--pin-progress", this.progress.toString());
    this.ticking = false;
  }
}
customElements.define("c-ani-block", CAniBlock);
