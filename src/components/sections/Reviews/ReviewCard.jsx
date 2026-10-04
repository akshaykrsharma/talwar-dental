import PropTypes from "prop-types";
import { initialOf } from "@/utils/format";
import Stars from "@/components/ui/Stars";

export default function ReviewCard({ review, starsLabel, sourceLabel, hidden }) {
  return (
    <article className="review" aria-hidden={hidden || undefined}>
      <Stars label={starsLabel} size={16} />
      <blockquote>{review.quote}</blockquote>
      <footer>
        <span className="review__avatar" aria-hidden="true">
          {initialOf(review.name)}
        </span>
        <span>
          <strong>{review.name}</strong>
          <small>
            {review.topic} · {sourceLabel}
          </small>
        </span>
      </footer>
    </article>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
  }).isRequired,
  starsLabel: PropTypes.string.isRequired,
  sourceLabel: PropTypes.string.isRequired,
  /** True for the duplicated cards that make the endless loop (hidden from screen readers). */
  hidden: PropTypes.bool,
};
