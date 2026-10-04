import PropTypes from "prop-types";
import { cx } from "@/utils/classNames";

/**
 * Page section with consistent vertical spacing and an optional background tone.
 * `padded={false}` lets a section define its own spacing.
 */
export default function Section({ id, tone, padded = true, className, children }) {
  return (
    <section
      id={id}
      className={cx(tone && "band", tone && `band--${tone}`, padded && "section", className)}
    >
      {children}
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  tone: PropTypes.oneOf(["sand", "ink"]),
  padded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
