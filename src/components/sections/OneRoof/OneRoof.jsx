import { SECTION_IDS } from "@/config/site";
import { clinicPhotos } from "@/assets/images";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/ui/Container";
import IconTile from "@/components/ui/IconTile";
import Section from "@/components/ui/Section";
import "./OneRoof.css";

export default function OneRoof() {
  const { t } = useLanguage();
  const r = t.oneRoof;

  return (
    <Section id={SECTION_IDS.oneRoof} className="oneroof">
      <Container className="oneroof__grid">
        <div className="oneroof__media">
          <img
            src={clinicPhotos.xrayUnit}
            alt={r.imageAlt}
            width="1600"
            height="900"
            loading="lazy"
          />
        </div>
        <div className="oneroof__copy">
          <h2>{r.title}</h2>
          <p className="lead">{r.text}</p>
          <ul className="oneroof__list">
            {r.items.map((item) => (
              <li key={item.id}>
                <IconTile name={item.id} size="sm" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
