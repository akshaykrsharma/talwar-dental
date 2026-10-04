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

  it("starts in the language saved from the last visit", () => {
    window.localStorage.setItem("talwar-lang", "hi");
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.hi.hero.title);
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
