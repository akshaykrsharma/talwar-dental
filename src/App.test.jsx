import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import { content } from "./content";

const renderApp = () =>
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

describe("<App />", () => {
  beforeEach(() => {
    window.open = vi.fn();
    window.history.pushState(null, "", "/");
  });

  it("renders the English page with all main sections", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.en.hero.title);
    for (const heading of [
      content.en.doctor.title,
      content.en.services.title,
      content.en.oneRoof.title,
      content.en.reviews.title,
      content.en.contact.title,
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(document.documentElement.lang).toBe("en");
  });

  it.each([
    ["/", "en"],
    ["/hi/", "hi"],
    ["/dr-anish-talwar/", "en"],
    ["/hi/dr-anish-talwar/", "hi"],
  ])("links the menu to indexable pages on %s", (path, lang) => {
    window.history.pushState(null, "", path);
    renderApp();
    const nav = within(screen.getByRole("navigation", { name: content[lang].nav.label }));
    const root = lang === "hi" ? "/hi" : "";
    expect(nav.getByRole("link", { name: content[lang].nav.about })).toHaveAttribute(
      "href",
      `${root}/dr-anish-talwar/`,
    );
    expect(nav.getByRole("link", { name: content[lang].nav.rct })).toHaveAttribute(
      "href",
      `${root}/root-canal-treatment-mansarovar/`,
    );
    const onHome = path === "/" || path === "/hi/";
    const sectionPrefix = onHome ? "" : `${root}/`;
    expect(nav.getByRole("link", { name: content[lang].nav.reviews })).toHaveAttribute(
      "href",
      `${sectionPrefix}#reviews`,
    );
    expect(nav.getByRole("link", { name: content[lang].nav.contact })).toHaveAttribute(
      "href",
      `${sectionPrefix}#contact`,
    );
    expect(nav.getByRole("link", { name: content[lang].nav.play })).toHaveAttribute(
      "href",
      `${sectionPrefix}#play`,
    );
    if (onHome) {
      for (const id of ["about", "services", "oneroof", "reviews", "contact", "play"]) {
        expect(document.getElementById(id)).toBeInTheDocument();
      }
      expect(screen.getByRole("link", { name: content[lang].doctor.profile })).toHaveAttribute(
        "href",
        `${root}/dr-anish-talwar/`,
      );
    }
  });

  it("switches the whole page to Hindi and remembers the choice", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggle = screen.getByRole("link", { name: content.en.a11y.toggleLang });
    expect(toggle).toHaveAttribute("href", "/hi/");
    await user.click(toggle);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.hi.hero.title);
    expect(document.documentElement.lang).toBe("hi");
    expect(document.title).toBe(content.hi.seo.title);
    expect(window.localStorage.getItem("talwar-lang")).toBe("hi");
  });

  it.each([
    ["/", content.en.hero.title, content.en.seo.title],
    ["/dr-anish-talwar/", content.en.pages.doctor.title, content.en.pages.doctor.seo.title],
    [
      "/dental-implants-mansarovar-jaipur/",
      content.en.pages.implants.title,
      content.en.pages.implants.seo.title,
    ],
    [
      "/root-canal-treatment-mansarovar/",
      content.en.pages.rct.title,
      content.en.pages.rct.seo.title,
    ],
    [
      "/dental-crowns-mansarovar-jaipur/",
      content.en.pages.crowns.title,
      content.en.pages.crowns.seo.title,
    ],
    [
      "/teeth-cleaning-mansarovar-jaipur/",
      content.en.pages.cleaning.title,
      content.en.pages.cleaning.seo.title,
    ],
  ])("keeps %s in English even after a Hindi visit", (path, heading, title) => {
    window.localStorage.setItem("talwar-lang", "hi");
    window.history.pushState(null, "", path);
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(heading);
    expect(document.title).toBe(title);
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("talwar-lang")).toBe("en");
  });

  it("shows a not-found page for an unknown address", () => {
    window.history.pushState(null, "", "/not-a-real-page");
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.en.notFound.title);
    expect(screen.queryByRole("heading", { name: content.en.hero.title })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: content.en.notFound.home })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.title).toBe(content.en.notFound.seo.title);
  });

  it("shows the Hindi not-found page for a wrong Hindi address", () => {
    window.history.pushState(null, "", "/hi/not-a-real-page/");
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.hi.notFound.title);
    expect(document.documentElement.lang).toBe("hi");
    expect(screen.getByRole("link", { name: content.hi.notFound.home })).toHaveAttribute(
      "href",
      "/hi/",
    );
  });

  it("renders a treatment page from its URL and offers the Hindi version", () => {
    window.history.pushState(null, "", "/dental-implants-mansarovar-jaipur/");
    renderApp();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      content.en.pages.implants.title,
    );
    expect(screen.getByRole("link", { name: content.en.a11y.toggleLang })).toHaveAttribute(
      "href",
      "/hi/dental-implants-mansarovar-jaipur/",
    );
    expect(document.title).toBe(content.en.pages.implants.seo.title);
  });

  it("gives the doctor page scrolling reviews with a working pause control", async () => {
    window.history.pushState(null, "", "/dr-anish-talwar/");
    const user = userEvent.setup();
    renderApp();
    const region = screen.getByRole("region", { name: content.en.pages.doctor.reviewsTitle });
    const count = content.en.pages.doctor.reviewNames.length;
    expect(region.querySelectorAll(".review")).toHaveLength(count * 2);
    expect(region.querySelectorAll('.review[aria-hidden="true"]')).toHaveLength(count);
    await user.click(screen.getByRole("button", { name: content.en.reviews.pause }));
    expect(region).toHaveClass("is-paused");
    await user.click(screen.getByRole("button", { name: content.en.reviews.play }));
    expect(region).not.toHaveClass("is-paused");
  });

  it("shows the doctor portrait and books from the profile without leaving the page", async () => {
    window.history.pushState(null, "", "/dr-anish-talwar/");
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByRole("img", { name: content.en.doctor.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: content.en.pages.doctor.book })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(document.getElementById("contact")).toBeInTheDocument();
    await user.type(screen.getByLabelText(content.en.contact.form.name), "Ravi Sharma");
    await user.type(screen.getByLabelText(content.en.contact.form.phone), "9829076830");
    await user.selectOptions(screen.getByLabelText(content.en.contact.form.service), "rct");
    await user.click(screen.getByRole("button", { name: content.en.contact.form.submit }));
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(decodeURIComponent(window.open.mock.calls[0][0])).toContain(
      content.en.services.items.find((item) => item.id === "rct").title,
    );
  });

  it("renders the Hindi root canal page from its URL", () => {
    window.localStorage.setItem("talwar-lang", "en");
    window.history.pushState(null, "", "/hi/root-canal-treatment-mansarovar/");
    renderApp();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.hi.pages.rct.title);
    expect(document.documentElement.lang).toBe("hi");
    expect(document.title).toBe(content.hi.pages.rct.seo.title);
  });

  it("sets the page title and structured data for search engines", () => {
    renderApp();
    expect(document.title).toBe(content.en.seo.title);
    const ld = JSON.parse(document.getElementById("ld-json-clinic").textContent);
    expect(ld["@type"]).toBe("Dentist");
  });

  describe("booking form", () => {
    it("shows errors for an empty form and does not open WhatsApp", async () => {
      const user = userEvent.setup();
      renderApp();

      await user.click(screen.getByRole("button", { name: content.en.contact.form.submit }));

      expect(screen.getByText(content.en.contact.form.nameError)).toBeInTheDocument();
      expect(screen.getByText(content.en.contact.form.phoneError)).toBeInTheDocument();
      expect(window.open).not.toHaveBeenCalled();
    });

    it("opens WhatsApp with the entered details when the form is valid", async () => {
      const user = userEvent.setup();
      renderApp();
      const form = content.en.contact.form;

      await user.type(screen.getByLabelText(form.name), "Ravi Sharma");
      await user.type(screen.getByLabelText(form.phone), "98290 76830");
      await user.selectOptions(screen.getByLabelText(form.service), "implants");
      await user.click(screen.getByRole("button", { name: form.submit }));

      expect(window.open).toHaveBeenCalledTimes(1);
      const [url] = window.open.mock.calls[0];
      expect(url).toContain("https://wa.me/919829076830?text=");
      const message = decodeURIComponent(url.split("?text=")[1]);
      expect(message).toContain("Ravi Sharma");
      expect(message).toContain(content.en.services.items[0].title);
    });

    it("pre-selects the treatment when a service card is chosen", async () => {
      const user = userEvent.setup();
      renderApp();
      const rctTitle = content.en.services.items.find((s) => s.id === "rct").title;

      const card = screen.getByRole("heading", { name: rctTitle }).closest("article");
      await user.click(within(card).getByRole("button", { name: content.en.services.cta }));

      expect(screen.getByLabelText(content.en.contact.form.service)).toHaveValue("rct");
    });
  });

  describe("reviews", () => {
    it("can be paused and resumed", async () => {
      const user = userEvent.setup();
      renderApp();

      const pause = screen.getByRole("button", { name: content.en.reviews.pause });
      expect(pause).toHaveAttribute("aria-pressed", "false");
      await user.click(pause);

      const play = screen.getByRole("button", { name: content.en.reviews.play });
      expect(play).toHaveAttribute("aria-pressed", "true");
    });

    it("hides the duplicated loop copy from screen readers", () => {
      renderApp();
      const total = content.en.reviews.items.length * 2;
      const hidden = document.querySelectorAll('.review[aria-hidden="true"]');
      expect(document.querySelectorAll(".review")).toHaveLength(total);
      expect(hidden).toHaveLength(content.en.reviews.items.length);
    });

    it("shows the overall rating with its source", () => {
      renderApp();
      expect(screen.getByText("4.9")).toBeInTheDocument();
      expect(screen.getByText(/122 ratings on Justdial/)).toBeInTheDocument();
    });
  });

  describe("hero slideshow", () => {
    it("has previous / next controls and one dot per photo", async () => {
      const user = userEvent.setup();
      renderApp();
      const region = screen.getByRole("region", { name: content.en.hero.slideshow.label });

      const dots = within(region).getAllByRole("button", {
        name: new RegExp(content.en.hero.slideshow.goTo),
      });
      expect(dots).toHaveLength(content.en.hero.slideshow.slides.length);
      expect(dots[0]).toHaveAttribute("aria-current", "true");

      await user.click(
        within(region).getByRole("button", { name: content.en.hero.slideshow.next }),
      );
      expect(dots[1]).toHaveAttribute("aria-current", "true");
    });
  });

  describe("mobile menu", () => {
    it("opens, and closes with the Escape key", async () => {
      const user = userEvent.setup();
      renderApp();
      const burger = screen.getByRole("button", { name: content.en.nav.menu });

      await user.click(burger);
      expect(burger).toHaveAttribute("aria-expanded", "true");

      await user.keyboard("{Escape}");
      expect(burger).toHaveAttribute("aria-expanded", "false");
    });
  });
});
