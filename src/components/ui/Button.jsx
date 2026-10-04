import PropTypes from "prop-types";
import { cx } from "@/utils/classNames";
import "./Button.css";

/**
 * Link-styled-as-button (when `href` is given) or a real <button>.
 * Pass `type="submit"` for form submit buttons.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}) {
  const classes = cx("btn", `btn--${variant}`, size === "lg" && "btn--lg", className);

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "outline"]),
  size: PropTypes.oneOf(["md", "lg"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
