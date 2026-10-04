import { CLINIC } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import "./ErrorFallback.css";

/** Shown by <ErrorBoundary> when something breaks. Always offers a way to reach the clinic. */
export default function ErrorFallback() {
  const { t } = useLanguage();
  return (
    <Container narrow className="center">
      <div role="alert" className="error-fallback">
        <h1>{t.error.title}</h1>
        <p className="lead">{t.error.text}</p>
        <div className="error-fallback__actions">
          <Button variant="outline" onClick={() => window.location.reload()}>
            {t.error.reload}
          </Button>
          <Button
            href={`tel:${CLINIC.phone.tel}`}
          >{`${t.nav.call}: ${CLINIC.phone.display}`}</Button>
        </div>
      </div>
    </Container>
  );
}
