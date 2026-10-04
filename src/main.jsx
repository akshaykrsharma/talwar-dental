import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/noto-sans-devanagari/wght.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <App />
      </ErrorBoundary>
    </LanguageProvider>
  </StrictMode>,
);
