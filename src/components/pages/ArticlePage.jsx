import PropTypes from "prop-types";
import { CLINIC } from "@/config/site";
import { doctorPortrait } from "@/assets/images";
import { useLanguage } from "@/hooks/useLanguage";
import { languageHref } from "@/utils/languagePath";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import Contact from "@/components/sections/Contact/Contact";
import ReviewsMarquee from "@/components/sections/Reviews/ReviewsMarquee";
import "@/components/sections/Reviews/Reviews.css";
import "./ArticlePage.css";

function DoctorProfile() {
  const { lang, t } = useLanguage();
  const d = t.doctor;
  const page = t.pages.doctor;
  const c = t.contact;

  return (
    <Section tone="sand">
      <Container>
        <div className="profile">
          <div className="profile__about">
            <h2>{page.aboutTitle}</h2>
            {page.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="profile__facts">
            <div>
              <dt>{d.credTitle}</dt>
              <dd>{d.creds.join(", ")}</dd>
            </div>
            <div>
              <dt>{d.memTitle}</dt>
              <dd>{d.mems.join(", ")}</dd>
            </div>
            <div>
              <dt>{c.addressLabel}</dt>
              <dd>{c.address}</dd>
            </div>
            <div>
              <dt>{c.phoneLabel}</dt>
              <dd>
                <a href={`tel:${CLINIC.phone.tel}`}>{CLINIC.phone.display}</a>
              </dd>
            </div>
            <div>
              <dt>{c.hoursLabel}</dt>
              <dd>{c.hours}</dd>
            </div>
          </dl>
        </div>

        <h2 className="profile__heading">{d.title}</h2>
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

        <h2 className="profile__heading">{t.services.title}</h2>
        <ul className="profile__treatments">
          {t.services.items.map((item) => (
            <li key={item.id}>
              {item.pageId ? (
                <a href={languageHref(lang, item.pageId)}>{item.title}</a>
              ) : (
                <strong>{item.title}</strong>
              )}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Doctor and treatment pages. Copy, FAQs and review names come from content. */
export default function ArticlePage({ pageId, service, onServiceChange }) {
  const { lang, t } = useLanguage();
  const page = t.pages[pageId];
  const reviews = page.reviewNames
    .map((name) => t.reviews.items.find((review) => review.name === name))
    .filter(Boolean);

  return (
    <article className="article">
      <Section>
        <Container narrow={pageId !== "doctor"} className="article__intro">
          <div className="article__intro-copy">
            <p className="kicker">{page.kicker}</p>
            <h1>{page.title}</h1>
            {pageId === "doctor" ? <p className="article__role">{t.doctor.role}</p> : null}
            <p className="lead">{page.lead}</p>
            <p className="article__reviewed">{page.reviewed}</p>
            <div className="article__actions">
              <Button href="#contact">{page.book}</Button>
              <Button variant="outline" href={`tel:${CLINIC.phone.tel}`}>
                {t.nav.call}
              </Button>
            </div>
          </div>
          {pageId === "doctor" ? (
            <figure className="article__portrait">
              <img
                src={doctorPortrait.src}
                alt={t.doctor.name}
                width={doctorPortrait.width}
                height={doctorPortrait.height}
                loading="eager"
              />
            </figure>
          ) : null}
        </Container>
      </Section>

      {pageId === "doctor" ? (
        <DoctorProfile />
      ) : (
        <Section tone="sand">
          <Container narrow>
            {page.sections.map((section) => (
              <div className="article__block" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </div>
            ))}
            <div className="article__block">
              <h2>{page.pointsTitle}</h2>
              <ul>
                {page.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container narrow>
          <h2>{page.faqsTitle}</h2>
          <div className="faqs">
            {page.faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="reviews">
        <Container>
          <h2>{page.reviewsTitle}</h2>
        </Container>
        <div className="article__reviews">
          <ReviewsMarquee reviews={reviews} title={page.reviewsTitle} />
        </div>
      </Section>

      <Section>
        <Container narrow>
          <h2>{page.relatedTitle}</h2>
          <div className="article__related">
            {page.related.map((item) => (
              <a key={item.pageId} href={languageHref(lang, item.pageId)}>
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </Section>
      <Contact service={service} onServiceChange={onServiceChange} />
    </article>
  );
}

ArticlePage.propTypes = {
  pageId: PropTypes.oneOf(["doctor", "implants", "rct"]).isRequired,
  service: PropTypes.string.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};
