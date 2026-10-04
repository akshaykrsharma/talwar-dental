import PropTypes from "prop-types";
import { useSlideshow } from "@/hooks/useSlideshow";
import { cx } from "@/utils/classNames";
import Icon from "@/components/ui/Icon";
import "./HeroSlides.css";

/**
 * Auto-changing photo slideshow (cross-fade) with arrows, dots and a caption.
 * Autoplay behaviour lives in the useSlideshow hook.
 */
export default function HeroSlides({ slides, labels, interval }) {
  const { active, goTo, pauseHandlers } = useSlideshow({ count: slides.length, interval });

  return (
    <div
      className="hslides"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      {...pauseHandlers}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          className={cx(i === active && "is-active")}
          src={slide.src}
          alt={slide.title}
          aria-hidden={i !== active}
          style={{ objectPosition: slide.position }}
          loading={i === 0 ? "eager" : "lazy"}
          draggable="false"
        />
      ))}

      <div className="hslides__ui">
        <button
          type="button"
          className="hslides__btn"
          onClick={() => goTo(active - 1)}
          aria-label={labels.prev}
        >
          <Icon name="chevronLeft" />
        </button>
        <div className="hslides__dots">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={cx(i === active && "is-on")}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hslides__btn"
          onClick={() => goTo(active + 1)}
          aria-label={labels.next}
        >
          <Icon name="chevronRight" />
        </button>
      </div>

      <p className="hslides__caption" key={slides[active].id}>
        {slides[active].title}
      </p>
    </div>
  );
}

HeroSlides.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      position: PropTypes.string,
    }),
  ).isRequired,
  labels: PropTypes.shape({
    region: PropTypes.string.isRequired,
    prev: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
    goTo: PropTypes.string.isRequired,
  }).isRequired,
  interval: PropTypes.number,
};
