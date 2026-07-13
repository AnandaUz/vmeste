import "./c-ani-3-vmeste.scss";
import template from "./c-ani-3-vmeste.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAni3VMeste extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    const dy = 800;
    const dd = 400;
    const d0 = 0;
    let t = 0;
    for (let i = 1; i < 4; i++) {
      this.doAnimationByPixel({
        elClassName: ".block-0" + i + " .in",
        start: t,
        duration: dd,
        onStepPixel: ({ yProgress = 0, el }) => {
          el.style.transform = `translateY(${Math.pow(1 - yProgress, 1.5) * dy}px)`;
          el.style.opacity = Math.pow(yProgress, 1.5).toString();
        },
      });
      t += dd + d0;
    }
  }
}
customElements.define("c-ani-3-vmeste", CAni3VMeste);
