import PropTypes from "prop-types";
import { SECTION_IDS } from "@/config/site";
import { doctorPortrait } from "@/assets/images";
import { useLanguage } from "@/hooks/useLanguage";
import { anchor } from "@/utils/scroll";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import "./Doctor.css";

function BulletList({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

BulletList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Doctor() {
  const { t } = useLanguage();
  const d = t.doctor;

  return (
    <Section id={SECTION_IDS.about}>
      <Container className="doctor">
        <div className="doctor__media">
          <div className="doctor__frame">
            <img
              src={doctorPortrait.src}
              alt={d.name}
              width={doctorPortrait.width}
              height={doctorPortrait.height}
              loading="lazy"
            />
          </div>
          <div className="doctor__card">
            <h3>{d.name}</h3>
            <p>{d.role}</p>
          </div>
        </div>

        <div className="doctor__copy">
          <p className="kicker">{d.kicker}</p>
          <h2>{d.title}</h2>
          <p className="lead">{d.bio}</p>

          <ul className="features">
            {d.features.map((feature) => (
              <li key={feature.title}>
                <span className="features__icon">
                  <Icon name="check" />
                </span>
                <span>
                  <strong>{feature.title}</strong>
                  <small>{feature.text}</small>
                </span>
              </li>
            ))}
          </ul>

          <div className="creds">
            <BulletList title={d.credTitle} items={d.creds} />
            <BulletList title={d.memTitle} items={d.mems} />
          </div>

          <Button href={anchor(SECTION_IDS.contact)}>{d.cta}</Button>
        </div>
      </Container>
    </Section>
  );
}
