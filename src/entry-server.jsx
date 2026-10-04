import { renderToString } from "react-dom/server";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import { LanguageProvider } from "./context/LanguageContext";

/** English or Hindi HTML for the first response, before JavaScript runs. */
export function render(lang = "en") {
  return renderToString(
    <LanguageProvider initialLang={lang}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <App />
      </ErrorBoundary>
    </LanguageProvider>,
  );
}
