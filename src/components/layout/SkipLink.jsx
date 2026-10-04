import { useLanguage } from "@/hooks/useLanguage";
import "./SkipLink.css";

/** First focusable element: lets keyboard users jump past the header. */
export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a className="skip" href="#main">
      {t.a11y.skip}
    </a>
  );
}
