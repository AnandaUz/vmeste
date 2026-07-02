export const ScrollLinked = {
  getProgress(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // 0  — низ элемента только коснулся низа экрана (ещё не виден)
    // 1  — верх элемента дошёл до верха экрана (уже прошёл насквозь)
    const raw = (vh - rect.top) / (vh + rect.height);

    return Math.min(1, Math.max(0, raw)); // зажимаем в диапазон [0, 1]
  },
  getPinProgress(wrapEl: HTMLElement) {
    const rect = wrapEl.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    // сколько "запаса" всего
    const progress = -rect.top / scrollableDistance;
    return Math.min(1, Math.max(0, progress));
  },
  getSubProgress(globalProgress: number, start: number, end: number) {
    if (globalProgress < start) return 0;
    if (globalProgress > end) return 1;
    return (globalProgress - start) / (end - start);
  },
};

let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

export function update() {
  const wrapEl = document.querySelector(".pin-wrap") as HTMLElement;
  if (!wrapEl) return;
  const progress = ScrollLinked.getPinProgress(wrapEl);

  const textBl00 = document.querySelector(".block00") as HTMLElement;
  const textBl01 = document.querySelector(".block01") as HTMLElement;
  const textBl02 = document.querySelector(".block02") as HTMLElement;

  //   const textOpacity = ScrollLinked.getSubProgress(progress, 0.0, 0.3); // проявится в начале
  const block00 = ScrollLinked.getSubProgress(progress, 0.1, 0.2);
  const block01 = ScrollLinked.getSubProgress(progress, 0.2, 0.3);
  const block02 = ScrollLinked.getSubProgress(progress, 0.3, 0.4);

  const range = 500;
  const offset = (x: number) => range - x * range;

  //   const bl = document.querySelector(".block__side") as HTMLElement;
  //   bl.style.transform = `translateX(${offsetX}px)`;
  textBl00.style.transform = `translateX(${offset(block00)}px)`;
  textBl01.style.transform = `translateX(${offset(block01)}px)`;
  textBl02.style.transform = `translateX(${offset(block02)}px)`;

  ticking = false;
}

window.addEventListener("scroll", onScroll, { passive: true });
update(); // сразу посчитать стартовое состояние, не дожидаясь первого скролла
