import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSlideshow } from "./useSlideshow";

describe("useSlideshow", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("advances automatically and loops back to the first slide", () => {
    const { result } = renderHook(() => useSlideshow({ count: 3, interval: 1000 }));
    expect(result.current.active).toBe(0);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.active).toBe(1);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.active).toBe(0);
  });

  it("goTo wraps around in both directions", () => {
    const { result } = renderHook(() => useSlideshow({ count: 3, interval: 1000 }));
    act(() => result.current.goTo(-1));
    expect(result.current.active).toBe(2);
    act(() => result.current.goTo(3));
    expect(result.current.active).toBe(0);
  });

  it("pauses while hovered and resumes shortly after the pointer leaves", () => {
    const { result } = renderHook(() => useSlideshow({ count: 3, interval: 1000 }));
    act(() => result.current.pauseHandlers.onMouseEnter());
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.active).toBe(0);

    act(() => result.current.pauseHandlers.onMouseLeave());
    act(() => vi.advanceTimersByTime(1200 + 1000));
    expect(result.current.active).toBe(1);
  });

  it("pauses after manual navigation so the visitor is not interrupted", () => {
    const { result } = renderHook(() =>
      useSlideshow({ count: 3, interval: 1000, manualPause: 8000 }),
    );
    act(() => result.current.goTo(1));
    act(() => vi.advanceTimersByTime(7000));
    expect(result.current.active).toBe(1);
  });

  it("stays still for a single slide", () => {
    const { result } = renderHook(() => useSlideshow({ count: 1, interval: 1000 }));
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.active).toBe(0);
  });
});
