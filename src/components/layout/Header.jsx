import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CLINIC, NAV_LINKS, SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { languageHref, sectionHref } from "@/utils/languagePath";
import { anchor } from "@/utils/scroll";
import { cx } from "@/utils/classNames";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import LanguageToggle from "./LanguageToggle";
import "./Header.css";

const NAV_ID = "primary-nav";

/** Sticky site header: logo, section links, language switch and call / book buttons. */
export default function Header({ pageId = "home" }) {
  const { lang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <Container className="header__bar">
        <a
          href={pageId === "home" ? anchor(SECTION_IDS.top) : languageHref(lang, "home")}
          aria-label={t.clinicName}
          onClick={closeMenu}
        >
          <Logo lang={lang} />
        </a>

        <nav id={NAV_ID} className={cx("nav", menuOpen && "nav--open")} aria-label={t.nav.label}>
          {NAV_LINKS.map(({ key, sectionId, pageId: linkPageId }) => (
            <a
              key={key}
              href={
                linkPageId ? languageHref(lang, linkPageId) : sectionHref(pageId, lang, sectionId)
              }
              aria-current={linkPageId && linkPageId === pageId ? "page" : undefined}
              onClick={closeMenu}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageToggle pageId={pageId} />
          <Button variant="outline" className="header__call" href={`tel:${CLINIC.phone.tel}`}>
            {t.nav.call}
          </Button>
          <Button className="header__book" href={sectionHref(pageId, lang, SECTION_IDS.contact)}>
            {t.nav.book}
          </Button>
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls={NAV_ID}
            aria-label={t.nav.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
    </header>
  );
}

Header.propTypes = {
  pageId: PropTypes.string,
};
