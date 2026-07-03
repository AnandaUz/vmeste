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
