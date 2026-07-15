import "./c-ani-5-menyaetsya.scss";
import template from "./c-ani-5-menyaetsya.html?raw";
import { CAniBlock } from "@/components/c-ani-block/c-ani-block";

interface Ball {
  x: number;
  y: number;
  r: number;
}

function getRandomBall(
  canvasW: number,
  canvasH: number,
  r: number,
  existing: Ball[],
  minGap: number,
  maxAttempts = 500,
): Ball | null {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = r + Math.random() * (canvasW - r * 2);
    const y = r + Math.random() * (canvasH - r * 2);

    const isFarEnough = existing.every((ball) => {
      const dx = ball.x - x;
      const dy = ball.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = ball.r + r + minGap; // r+rd из твоего условия
      return distance >= minDistance;
    });

    if (isFarEnough) {
      return { x, y, r };
    }
  }

  return null; // не нашли места за maxAttempts попыток — канва переполнена
}

export class CAni5Menyaetsya extends CAniBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this.innerHTML.replaceAll("{{content}}", template);
    this.update();
    this.init();

    this.scrollToTop();

    // const d0 = 0;
    let t = -window.innerHeight;
    const bl0 = this.querySelector(".block-00") as HTMLElement;
    const k = 7;
    const d: { count: number; w: number; h: number; k: number }[] = [
      {
        count: k * 1,
        w: 150,
        h: window.innerHeight * 2.5,
        k: 1,
      },
      {
        count: k * 2,
        w: 69,
        h: window.innerHeight * 2,
        k: 0.5,
      },
      {
        count: k * 3,
        w: 25,
        h: window.innerHeight * 1.5,
        k: 0.25,
      },

      {
        count: k * 2,
        w: 10,
        h: window.innerHeight * 1.5,
        k: 0.1,
      },
    ];
    d.forEach((i, idx) => {
      const el = document.createElement("div");
      el.className = "bg bg-" + idx;

      el.style.height = i.h + "px";
      bl0.appendChild(el);
      const r = bl0.getBoundingClientRect();

      const balls: Ball[] = [];
      const minGap = i.w * 4; // это твой "rd"

      for (let j = 0; j < i.count; j++) {
        const ball = getRandomBall(r.width, i.h, i.w, balls, minGap, 1000);
        if (ball) {
          balls.push(ball);
        } else {
          // console.warn("Не удалось разместить шар — слишком тесно");
          break;
        }
      }

      for (let j = 0; j < i.count; j++) {
        const c = document.createElement("div");
        c.className = `c`;

        c.style.left = -i.w + Math.random() * r.width + "px";
        c.style.top = -i.w + Math.random() * i.h + "px";

        el.appendChild(c);
      }

      this.doAnimationByPixel({
        elClassName: ".bg-" + idx,
        start: t,
        duration: window.innerHeight * 4,
        onStepPixel: ({ y = 0, el }) => {
          el.style.transform = `translateY(${-y * i.k}px)`;
        },
      });
    });

    t = -10;
    const els = this.querySelectorAll(".bl-in");
    const dd = 400;
    const d1 = 50;
    const p0 = 0.2;
    const p1 = 0.9;
    const func = ({
      yProgress = 0,
      el,
    }: {
      yProgress: number;
      el: HTMLElement;
    }) => {
      if (yProgress < p0) {
        const p = yProgress / p0;
        el.style.transform = `scale(${2 - p})`;
        el.style.opacity = p.toString();
      } else if (yProgress > p1) {
        const p = (yProgress - p1) / (1 - p1);
        el.style.transform = `scale(${1 - p})`;
        el.style.opacity = (1 - p).toString();
      } else {
        el.style.transform = `scale(1)`;
        el.style.opacity = "1";
      }
    };
    for (let j = 0; j < els.length; j++) {
      this.doAnimationByPixel({
        elClassName: `.bl-0${j} h3`,
        start: t,
        duration: dd,
        onStepPixel: func,
      });
      t += d1;
      this.doAnimationByPixel({
        elClassName: `.bl-0${j} .text`,
        start: t,
        duration: dd,
        onStepPixel: func,
      });
      t += dd;
    }
  }
}
customElements.define("c-ani-5-menyaetsya", CAni5Menyaetsya);
