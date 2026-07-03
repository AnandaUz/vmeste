import "./c-ani-block.scss";
import template from "./c-ani-block.html?raw";

export class CAniBlock extends HTMLElement {
  connectedCallback() {
    this.classList.add("ani-block");
    // const dataClass = this.getAttribute("data-class") ?? "";
    // const content = this.innerHTML;

    this.innerHTML = template;
  }
}
customElements.define("c-ani-block", CAniBlock);
