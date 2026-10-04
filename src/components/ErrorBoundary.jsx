import { Component } from "react";
import PropTypes from "prop-types";

/** Catches rendering errors so visitors see a helpful message instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Hook point for an error-reporting service (Sentry, etc.).
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
