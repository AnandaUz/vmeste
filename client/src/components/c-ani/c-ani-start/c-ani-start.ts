import "./c-ani-start.scss";
import template from "./c-ani-start.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

export class CAniStart extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
  }
}
customElements.define("c-ani-start", CAniStart);
