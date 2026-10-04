import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import "./Footer.css";

export default function Footer() {
  const { lang, t } = useLanguage();
  return (
    <footer className="footer">
      <Container className="footer__bar">
        <Logo lang={lang} light />
        <p>{t.footer.tagline}</p>
        <p className="footer__small">
          © {new Date().getFullYear()} {t.clinicName}. {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
