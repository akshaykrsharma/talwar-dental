import { CLINIC, SECTION_IDS } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { languageHref, sectionHref } from "@/utils/languagePath";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import ToothRun from "./ToothRun";
import "./NotFound.css";

/** The clinic tooth, used as the middle figure of the big 404. */
function ToothMark() {
  return (
    <svg
      viewBox="4 8 40 38"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="not-found-tooth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#034787" />
          <stop offset="1" stopColor="#0e8cbb" />
        </linearGradient>
      </defs>
      <path
        d="M24 11c-3.5-2.6-10-2-11.5 4-1.2 4.8.8 8 1.6 12.6.8 4.8 1.2 10.4 4 10.4 2.8 0 2.2-7.4 5.9-7.4s3.1 7.4 5.9 7.4c2.8 0 3.2-5.6 4-10.4.8-4.6 2.8-7.8 1.6-12.6C34 9 27.5 8.4 24 11Z"
        fill="url(#not-found-tooth)"
      />
      <path
        d="M17 14.5c1.6-1.2 3.8-1 5.2-.2"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Shown when the address does not match a page. */
export default function NotFound() {
  const { lang, t } = useLanguage();
  const page = t.notFound;
  const jump = (sectionId) => sectionHref("notFound", lang, sectionId);

  return (
    <Section className="not-found" padded={false}>
      <div className="not-found__hero">
        <p className="not-found__code" aria-hidden="true">
          <span>4</span>
          <ToothMark />
          <span>4</span>
        </p>
        <h1>{page.title}</h1>
        <p className="lead">{page.text}</p>
        <div className="not-found__actions">
          <Button href={languageHref(lang, "home")}>{page.home}</Button>
          <Button variant="outline" href={`tel:${CLINIC.phone.tel}`}>
            {page.call}
          </Button>
        </div>
      </div>
      <div className="not-found__game">
        <ToothRun copy={page} />
      </div>
      <nav className="not-found__links" aria-label={page.also}>
        <span>{page.also}</span>
        <ul>
          <li>
            <a href={jump(SECTION_IDS.services)}>{page.treatments}</a>
          </li>
          <li>
            <a href={jump(SECTION_IDS.reviews)}>{page.reviews}</a>
          </li>
          <li>
            <a href={jump(SECTION_IDS.contact)}>{page.book}</a>
          </li>
        </ul>
      </nav>
    </Section>
  );
}
