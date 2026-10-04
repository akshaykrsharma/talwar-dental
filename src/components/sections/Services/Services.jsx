import PropTypes from "prop-types";
import { SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/ui/Container";
import IconTile from "@/components/ui/IconTile";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import "./Services.css";

/** Treatment cards. Choosing one pre-selects it in the booking form (state is owned by <App>). */
export default function Services({ onSelectService }) {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <Section id={SECTION_IDS.services} tone="sand">
      <Container>
        <SectionHead title={s.title} text={s.text} />
        <div className="cards">
          {s.items.map((item) => (
            <article className="card" key={item.id}>
              <IconTile name={item.id} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <button type="button" className="link" onClick={() => onSelectService(item.id)}>
                {s.cta}
              </button>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

Services.propTypes = { onSelectService: PropTypes.func.isRequired };
