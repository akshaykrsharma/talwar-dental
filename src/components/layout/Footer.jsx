import { PAGES } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { languageHref } from "@/utils/languagePath";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import "./Footer.css";

export default function Footer() {
  const { lang, t } = useLanguage();
  return (
    <footer className="footer">
      <Container className="footer__bar">
        <a href={languageHref(lang, "home")} aria-label={t.clinicName}>
          <Logo lang={lang} light />
        </a>
        <p>{t.footer.tagline}</p>
        <nav className="footer__links" aria-label={t.footer.pagesLabel}>
          {PAGES.filter((page) => page.id !== "home").map((page) => (
            <a key={page.id} href={languageHref(lang, page.id)}>
              {t.pages[page.id].nav}
            </a>
          ))}
        </nav>
        <p className="footer__small">
          © {new Date().getFullYear()} {t.clinicName}. {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
