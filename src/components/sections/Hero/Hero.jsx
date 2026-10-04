import { useMemo } from "react";
import { SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { anchor } from "@/utils/scroll";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import HeroSlides from "./HeroSlides";
import { HERO_SLIDES } from "./heroSlideData";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();
  const { slideshow } = t.hero;

  // Attach the translated caption to each configured photo.
  const slides = useMemo(
    () =>
      HERO_SLIDES.map((slide) => ({
        ...slide,
        title: slideshow.slides.find((s) => s.id === slide.id)?.title ?? "",
      })),
    [slideshow],
  );

  return (
    <section className="hero" id={SECTION_IDS.top}>
      <Container className="hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.text}</p>

          <dl className="stats">
            {t.hero.stats.map((stat) => (
              <div key={stat.value} className="stats__item">
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__cta">
            <Button size="lg" href={anchor(SECTION_IDS.contact)}>
              {t.hero.primary}
            </Button>
            <Button size="lg" variant="outline" href={anchor(SECTION_IDS.services)}>
              {t.hero.secondary}
            </Button>
          </div>
        </div>

        <div className="hero__media">
          <HeroSlides
            slides={slides}
            labels={{
              region: slideshow.label,
              prev: slideshow.prev,
              next: slideshow.next,
              goTo: slideshow.goTo,
            }}
          />
          <div className="badge">
            <span className="badge__icon">
              <Icon name="clock" />
            </span>
            <span>
              <strong>{t.hero.badgeTitle}</strong>
              <small>{t.hero.badgeSub}</small>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
