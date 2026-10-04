import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cx } from "@/utils/classNames";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import ReviewCard from "./ReviewCard";

/** Seconds each card takes to scroll past. Keeps the speed steady however many reviews there are. */
const SECONDS_PER_CARD = 12;

/**
 * Endlessly scrolling row of review cards.
 * The list is rendered twice so the CSS animation can loop seamlessly; the copy is aria-hidden.
 * Visitors can pause it with the button (WCAG: moving content needs a pause control).
 */
export default function ReviewsMarquee() {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const { items, stars, source, title, pause, play } = t.reviews;

  return (
    <>
      <div className={cx("marquee", paused && "is-paused")} role="region" aria-label={title}>
        <div
          className="marquee__track"
          style={{ "--marquee-duration": `${items.length * SECONDS_PER_CARD}s` }}
        >
          {[...items, ...items].map((review, i) => (
            <ReviewCard
              key={`${review.name}-${i}`}
              review={review}
              starsLabel={stars}
              sourceLabel={source}
              hidden={i >= items.length}
            />
          ))}
        </div>
      </div>

      <Container className="reviews__bar">
        <button
          type="button"
          className="marquee__toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          <Icon name={paused ? "play" : "pause"} />
          {paused ? play : pause}
        </button>
      </Container>
    </>
  );
}
