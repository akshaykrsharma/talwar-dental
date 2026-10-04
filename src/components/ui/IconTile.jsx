import PropTypes from "prop-types";
import { cx } from "@/utils/classNames";
import Icon from "./Icon";
import { ICON_NAMES } from "./iconData";
import "./IconTile.css";

/** Soft-coloured rounded square that holds an icon. */
export default function IconTile({ name, size = "md", className }) {
  return (
    <span className={cx("icon-tile", size === "sm" && "icon-tile--sm", className)}>
      <Icon name={name} />
    </span>
  );
}

IconTile.propTypes = {
  name: PropTypes.oneOf(ICON_NAMES).isRequired,
  size: PropTypes.oneOf(["md", "sm"]),
  className: PropTypes.string,
};
