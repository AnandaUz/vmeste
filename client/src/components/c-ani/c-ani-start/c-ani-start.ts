import "./c-ani-start.scss";
import template from "./c-ani-start.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAniStart extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();
  }
  update(): void {
    super.update();

    const strDownEl = document.querySelector(".str-down") as HTMLElement;

    const v00 = this.getSubProgress(0, 0.2);

    strDownEl.style.transform = `translateY(${v00 * 100}px)`;

    const i01 = document.querySelector(".i01") as HTMLElement;
    const i02 = document.querySelector(".i02") as HTMLElement;
    const v01 = this.getSubProgress(0, 1);
    const s = 100;
    i01.style.transform = `translate(-50%, ${(-v01 * s) / 2}px)`;
    i02.style.transform = `translate(-50%, ${-v01 * s}px)`;
  }
}
customElements.define("c-ani-start", CAniStart);
