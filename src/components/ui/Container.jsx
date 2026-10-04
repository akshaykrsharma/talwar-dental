import PropTypes from "prop-types";
import { cx } from "@/utils/classNames";

/** Centres content and applies the site's page gutters. */
export default function Container({ narrow, className, children }) {
  return <div className={cx("wrap", narrow && "wrap--narrow", className)}>{children}</div>;
}

Container.propTypes = {
  narrow: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
