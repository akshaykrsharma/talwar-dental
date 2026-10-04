import { CLINIC } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/** Address, phone and opening hours, plus a directions button. */
export default function ContactInfo() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <div className="contact__info">
      <h2>{c.title}</h2>
      <p className="lead">{c.text}</p>

      <ul className="info">
        <li>
          <span className="info__icon">
            <Icon name="pin" />
          </span>
          <span>
            <small>{c.addressLabel}</small>
            {c.address}
          </span>
        </li>
        <li>
          <span className="info__icon">
            <Icon name="phone" />
          </span>
          <span>
            <small>{c.phoneLabel}</small>
            <a href={`tel:${CLINIC.phone.tel}`}>{CLINIC.phone.display}</a>
          </span>
        </li>
        <li>
          <span className="info__icon">
            <Icon name="clock" />
          </span>
          <span>
            <small>{c.hoursLabel}</small>
            {c.hours}
          </span>
        </li>
      </ul>

      <Button variant="outline" href={CLINIC.maps.link} target="_blank" rel="noreferrer">
        {c.directions}
      </Button>
    </div>
  );
}
