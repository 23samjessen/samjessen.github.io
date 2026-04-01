
import { siteData } from "./data/site-data.js";
import { CVRenderer } from "./renderers/cv-renderer.js";
import { MotivationRenderer } from "./renderers/motivation-renderer.js";

function getLocale() {
  const locale = document.documentElement.lang || "en";
  return siteData[locale] ? locale : "en";
}

function setThemeToggleLabel(locale) {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  const label = isDark ? "☀" : "☾";
  toggle.setAttribute("aria-label", `${siteData[locale].buttons.theme}: ${isDark ? "light" : "dark"}`);
  toggle.textContent = label;
}

function initTheme(locale) {
  const saved = localStorage.getItem("cv-theme");
  if (saved === "dark") {
    document.documentElement.dataset.theme = "dark";
  }
  setThemeToggleLabel(locale);

  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    if (next === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    localStorage.setItem("cv-theme", next);
    setThemeToggleLabel(locale);
  });
}

function initActions(locale) {
  document.querySelectorAll(".print-btn").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        const original = btn.textContent;
        btn.textContent = locale === "da" ? "Kopieret" : locale === "sv" ? "Kopierad" : "Copied";
        setTimeout(() => { btn.textContent = original; }, 1400);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  document.querySelectorAll(".lang-link").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("cv-locale", link.dataset.lang);
    });
  });
}

function renderPage() {
  const locale = getLocale();
  const payload = siteData[locale];
  document.title = payload.meta_title;

  const app = document.getElementById("app");
  const pageType = app?.dataset.page || "cv";
  const letterHref = document.body.dataset.letterHref || "./motivation-letter.html";

  if (!app) return;

  if (pageType === "letter") {
    const renderer = new MotivationRenderer(payload);
    app.innerHTML = renderer.render();
  } else {
    const renderer = new CVRenderer(payload, locale);
    app.innerHTML = renderer.render(letterHref);
  }

  initActions(locale);
  initTheme(locale);
}

document.addEventListener("DOMContentLoaded", renderPage);
