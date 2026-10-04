import { CLINIC } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";

/** Google Map of the clinic (lazy-loaded so it does not slow down the first view). */
export default function MapEmbed() {
  const { t } = useLanguage();
  return (
    <div className="map">
      <iframe
        title={t.contact.mapTitle}
        src={CLINIC.maps.embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
