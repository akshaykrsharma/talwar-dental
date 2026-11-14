import { renderToString } from "react-dom/server";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import { LanguageProvider } from "./context/LanguageContext";

/** English or Hindi HTML for one page, before JavaScript runs. */
export function render(lang = "en", pageId = "home") {
  return renderToString(
    <LanguageProvider initialLang={lang}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <App initialPageId={pageId} />
      </ErrorBoundary>
    </LanguageProvider>,
  );
}
