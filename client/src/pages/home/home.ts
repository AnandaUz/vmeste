import type { Page } from "../../types";
import "./home.scss";
import html from "./home.html?raw";

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
