import { CLINIC } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { interpolate } from "@/utils/format";
import Stars from "@/components/ui/Stars";

/** Big overall rating (e.g. 4.9 out of 5) with the source it came from. */
export default function RatingSummary() {
  const { t } = useLanguage();
  const { rating, maps } = CLINIC;

  return (
    <div className="rating">
      <div className="rating__score">
        <strong>{rating.value}</strong>
        <span>{t.reviews.outOf}</span>
      </div>
      <div className="rating__meta">
        <Stars label={t.reviews.stars} size={22} />
        <p>{interpolate(t.reviews.basis, { count: rating.count, source: rating.source })}</p>
        <a href={maps.link} target="_blank" rel="noreferrer" className="rating__link">
          {t.reviews.cta}
        </a>
      </div>
    </div>
  );
}
