import { LANGUAGES } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { cx } from "@/utils/classNames";
import { languageHref } from "@/utils/languagePath";
import "./LanguageToggle.css";

/** EN / हिं switch. The href is a real page so crawlers can index both languages. */
export default function LanguageToggle() {
  const { lang, t, setLang } = useLanguage();
  const next = LANGUAGES.find((l) => l.code !== lang);
  const href = languageHref(next.code);

  return (
    <a
      href={href}
      className="lang"
      aria-label={t.a11y.toggleLang}
      lang={next.code}
      onClick={(event) => {
        event.preventDefault();
        window.history.pushState({ lang: next.code }, "", href);
        setLang(next.code);
      }}
    >
      {LANGUAGES.map((l) => (
        <span key={l.code} className={cx(l.code === lang && "is-on")}>
          {l.label}
        </span>
      ))}
    </a>
  );
}
