import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SECTION_IDS } from "@/config/site";
import { pageFromLocation } from "@/utils/languagePath";
import { scrollToId } from "@/utils/scroll";
import Seo from "@/components/Seo";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import QuickBar from "@/components/layout/QuickBar";
import SkipLink from "@/components/layout/SkipLink";
import ArticlePage from "@/components/pages/ArticlePage";
import NotFound from "@/components/pages/NotFound";
import Contact from "@/components/sections/Contact/Contact";
import Doctor from "@/components/sections/Doctor/Doctor";
import Hero from "@/components/sections/Hero/Hero";
import OneRoof from "@/components/sections/OneRoof/OneRoof";
import Play from "@/components/sections/Play/Play";
import Reviews from "@/components/sections/Reviews/Reviews";
import Services from "@/components/sections/Services/Services";
import Welcome from "@/components/sections/Welcome/Welcome";

function readPageId(initialPageId) {
  if (initialPageId) return initialPageId;
  if (typeof window === "undefined") return "home";
  return pageFromLocation(window.location.pathname);
}

export default function App({ initialPageId }) {
  const [pageId, setPageId] = useState(() => readPageId(initialPageId));
  // The chosen treatment is shared: a service card sets it, the booking form shows it.
  const [service, setService] = useState("");

  useEffect(() => {
    const sync = () => setPageId(pageFromLocation(window.location.pathname));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const handleSelectService = useCallback((id) => {
    setService(id);
    scrollToId(SECTION_IDS.contact);
  }, []);

  return (
    <>
      <Seo pageId={pageId} />
      <SkipLink />
      <Header pageId={pageId} />
      <main id="main">
        {pageId === "notFound" ? (
          <NotFound />
        ) : pageId === "home" ? (
          <>
            <Hero />
            <Welcome />
            <Doctor />
            <Services onSelectService={handleSelectService} />
            <OneRoof />
            <Reviews />
            <Contact service={service} onServiceChange={setService} />
            <Play />
          </>
        ) : (
          <ArticlePage pageId={pageId} service={service} onServiceChange={setService} />
        )}
      </main>
      <Footer />
      <QuickBar pageId={pageId} />
    </>
  );
}

App.propTypes = {
  initialPageId: PropTypes.string,
};
