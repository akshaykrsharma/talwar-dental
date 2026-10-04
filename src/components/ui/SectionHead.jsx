import PropTypes from "prop-types";

/** Centred section heading with an intro line. */
export default function SectionHead({ title, text }) {
  return (
    <div className="section__head center">
      <h2>{title}</h2>
      <p className="lead">{text}</p>
    </div>
  );
}

SectionHead.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
