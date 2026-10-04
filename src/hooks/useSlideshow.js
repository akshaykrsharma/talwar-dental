import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Auto-advancing slideshow state.
 * - advances every `interval` ms
 * - pauses on hover, keyboard focus and touch (and for a while after manual navigation)
 * - never advances while the browser tab is hidden or for reduced-motion visitors
 *
 * @param {{count: number, interval?: number, manualPause?: number}} options
 */
export function useSlideshow({ count, interval = 4000, manualPause = 8000 }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const resumeTimer = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const pauseFor = useCallback((ms) => {
    paused.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  }, []);

  useEffect(() => {
    if (reducedMotion || count < 2) return undefined;
    const id = setInterval(() => {
      if (paused.current || document.hidden) return;
      setActive((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval, reducedMotion]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const goTo = useCallback(
    (index) => {
      pauseFor(manualPause);
      setActive(((index % count) + count) % count);
    },
    [count, manualPause, pauseFor],
  );

  /** Spread onto the slideshow container so interaction pauses autoplay. */
  const pauseHandlers = useMemo(
    () => ({
      onMouseEnter: () => {
        paused.current = true;
      },
      onMouseLeave: () => pauseFor(1200),
      onFocus: () => {
        paused.current = true;
      },
      onBlur: () => pauseFor(1200),
      onTouchStart: () => pauseFor(manualPause),
    }),
    [manualPause, pauseFor],
  );

  return { active, goTo, pauseHandlers };
}
