import { SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { anchor } from "@/utils/scroll";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import "./Welcome.css";

export default function Welcome() {
  const { t } = useLanguage();
  return (
    <Section tone="sand" padded={false} className="welcome">
      <Container narrow className="center">
        <h2>{t.welcome.title}</h2>
        <span className="rule" aria-hidden="true" />
        <p className="lead">{t.welcome.text}</p>
        <Button href={anchor(SECTION_IDS.about)}>{t.welcome.cta}</Button>
      </Container>
    </Section>
  );
}
