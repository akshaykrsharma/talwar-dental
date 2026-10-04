import PropTypes from "prop-types";
import { ICONS, ICON_NAMES } from "./iconData";

/** Decorative inline SVG icon (hidden from screen readers). */
export default function Icon({ name, size, className }) {
  const icon = ICONS[name];
  if (!icon) return null;
  const px = size ?? icon.size;
  const lineProps = icon.filled
    ? { fill: "currentColor" }
    : {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: icon.strokeWidth ?? 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      };

  return (
    <svg
      viewBox={icon.viewBox}
      width={px}
      height={px}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...lineProps}
    >
      {icon.shapes}
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(ICON_NAMES).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};
