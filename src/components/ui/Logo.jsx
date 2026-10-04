import PropTypes from "prop-types";
import { logos } from "@/assets/logo";
import { cx } from "@/utils/classNames";
import "./Logo.css";

/**
 * Clinic logo.
 * English: the full horizontal logo. Hindi: the same tooth mark with the name set as real Hindi text.
 * `light` is the white version for dark backgrounds.
 */
export default function Logo({ lang, light = false }) {
  if (lang === "hi") {
    return (
      <span className={cx("logo", "logo--hi", light && "logo--light")}>
        <img src={light ? logos.markWhite : logos.mark} alt="" className="logo__mark" height="46" />
        <span className="logo__text">
          <span className="logo__name">तलवार</span>
          <span className="logo__sub">डेंटल केयर</span>
        </span>
      </span>
    );
  }
  return (
    <img
      className="logo logo--en"
      src={light ? logos.horizontalWhite : logos.horizontal}
      alt="Talwar Dental Care"
      height="46"
    />
  );
}

Logo.propTypes = {
  lang: PropTypes.oneOf(["en", "hi"]).isRequired,
  light: PropTypes.bool,
};
