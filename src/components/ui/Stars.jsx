import PropTypes from "prop-types";
import Icon from "./Icon";
import "./Stars.css";

const FIVE = [0, 1, 2, 3, 4];

/** Five filled stars, announced to screen readers as one label (e.g. "5 out of 5 stars"). */
export default function Stars({ label, size = 18 }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {FIVE.map((i) => (
        <Icon key={i} name="star" size={size} />
      ))}
    </span>
  );
}

Stars.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
};
