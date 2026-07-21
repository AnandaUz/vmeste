import "./c-kartochka.scss";
import template from "./c-kartochka.html?raw";

export class CKartochka extends HTMLElement {
  async connectedCallback() {
    const avatarUrl = this.dataset.avatarUrl || "";

    this.innerHTML = template
      .replaceAll("{{text}}", this.innerHTML)
      .replaceAll("{{name}}", this.dataset.name || "")
      .replaceAll("{{avatarUrl}}", avatarUrl);
  }
}
customElements.define("c-kartochka", CKartochka);
