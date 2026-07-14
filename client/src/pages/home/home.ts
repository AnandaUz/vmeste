import type { Page } from "../../types";
import "./home.scss";
import html from "./home.html?raw";

import "@/components/c-ani/c-ani-start/c-ani-start";
import "@/components/c-ani/c-ani-2-pochemu/c-ani-2-pochemu";
import "@/components/c-ani/c-ani-3-vmeste/c-ani-3-vmeste";
import "@/components/c-ani/c-ani-4-podhodim/c-ani-4-podhodim";
import "@/components/c-ani/c-ani-5-menyaetsya/c-ani-5-menyaetsya";

export const homePage: Page = () => {
  return {
    html: html.replaceAll(
      "{{VITE_TGBOT_MEDITATION_URL}}",
      import.meta.env.VITE_TGBOT_MEDITATION_URL,
    ),
    init() {},
    title: "Ташкент",
  };
};
