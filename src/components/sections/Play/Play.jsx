import { SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import ToothRun from "@/components/pages/ToothRun";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import "./Play.css";

/** Homepage game, reached from the Let's Play tab. */
export default function Play() {
  const { t } = useLanguage();

  return (
    <Section id={SECTION_IDS.play} tone="sand" className="play">
      <Container>
        <h2>{t.play.title}</h2>
        <p className="lead">{t.play.text}</p>
        <ToothRun copy={t.notFound} />
      </Container>
    </Section>
  );
}
