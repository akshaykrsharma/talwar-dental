import { useCallback, useState } from "react";
import { SECTION_IDS } from "@/config/site";
import { scrollToId } from "@/utils/scroll";
import Seo from "@/components/Seo";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import QuickBar from "@/components/layout/QuickBar";
import SkipLink from "@/components/layout/SkipLink";
import Contact from "@/components/sections/Contact/Contact";
import Doctor from "@/components/sections/Doctor/Doctor";
import Hero from "@/components/sections/Hero/Hero";
import OneRoof from "@/components/sections/OneRoof/OneRoof";
import Reviews from "@/components/sections/Reviews/Reviews";
import Services from "@/components/sections/Services/Services";
import Welcome from "@/components/sections/Welcome/Welcome";

export default function App() {
  // The chosen treatment is shared: a service card sets it, the booking form shows it.
  const [service, setService] = useState("");

  const handleSelectService = useCallback((id) => {
    setService(id);
    scrollToId(SECTION_IDS.contact);
  }, []);

  return (
    <>
      <Seo />
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <Welcome />
        <Doctor />
        <Services onSelectService={handleSelectService} />
        <OneRoof />
        <Reviews />
        <Contact service={service} onServiceChange={setService} />
      </main>
      <Footer />
      <QuickBar />
    </>
  );
}
