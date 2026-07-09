import "./c-ani-2-pochemu.scss";
import template from "./c-ani-2-pochemu.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAni2Pochemu extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    //-стрелка вниз
    this.doAnimation({
      elClassName: ".str-down",
      start: 0,
      duration: 0.2,
      onStep: (progress, elem: HTMLElement) => {
        elem.style.transform = `translateY(${progress * 150}px)`;
      },
    });
  }
}
customElements.define("c-ani-2-pochemu", CAni2Pochemu);
