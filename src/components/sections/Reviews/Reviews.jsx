import { SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import RatingSummary from "./RatingSummary";
import ReviewsMarquee from "./ReviewsMarquee";
import "./Reviews.css";

export default function Reviews() {
  const { t } = useLanguage();
  return (
    <Section id={SECTION_IDS.reviews} tone="ink" className="reviews">
      <Container className="reviews__top">
        <div>
          <h2>{t.reviews.title}</h2>
          <p className="lead">{t.reviews.text}</p>
        </div>
        <RatingSummary />
      </Container>
      <ReviewsMarquee />
    </Section>
  );
}
