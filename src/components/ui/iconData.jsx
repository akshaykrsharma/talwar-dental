/**
 * Icon artwork. Add a new icon by adding an entry here, then use it with <Icon name="..." />.
 * Line icons use currentColor, so they follow the text colour of their parent.
 */
export const ICONS = {
  implants: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M9 5c2-1.5 4.5-.5 7 0s5 -1.5 7 0c1.5 3-.5 6-1 8H10c-.5-2-2.5-5-1-8Z" />
        <path d="M12 15h8M12.5 18.5h7M13 22h6M14 25.5h4M16 27v1" />
      </>
    ),
  },
  smile: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <circle cx="16" cy="16" r="11" />
        <path d="M10.5 18.5c1.5 3 9.5 3 11 0" />
        <path d="M12 12.5v1M20 12.5v1" />
        <path d="M26 5l.8 1.8L28.6 7.6 26.8 8.4 26 10.2 25.2 8.4 23.4 7.6 25.2 6.8Z" />
      </>
    ),
  },
  rct: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M8 6c2.5-2 5.5-.5 8-.5s5.5-1.5 8 .5c1.5 4-1 7-1.5 11s-.5 9-2.5 9-1.5-6-4-6-2 6-4 6-2-5-2.5-9S6.5 10 8 6Z" />
        <path d="M13.5 10.5v8M18.5 10.5v8" />
      </>
    ),
  },
  surgery: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M5 11c0-4 4-6 11-6s11 2 11 6c0 3-2 4-4 4s-3-1-4-3c-1 .8-2 .8-3 .8s-2 0-3-.8c-1 2-2 3-4 3s-4-1-4-4Z" />
        <path d="M9 21c2 4 12 4 14 0M16 17v6" />
      </>
    ),
  },
  gums: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M4 14c3-6 21-6 24 0" />
        <path d="M7 16c0 5 1.5 9 3 9s1.5-4 3-4 1.5 4 3 4 1.5-4 3-4 1.5 4 3 4 3-4 3-9" />
        <path d="M16 8v3" />
      </>
    ),
  },
  fillings: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M8 5c2.5-1.5 5.5-.5 8-.5s5.5-1 8 .5c2 4-1 7-1.5 11.5S21 27 19 27s-1.5-6-3-6-1 6-3 6-2-6-2.5-10.5S6 9 8 5Z" />
        <circle cx="16" cy="11" r="2.5" />
      </>
    ),
  },
  xray: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M12 11c1.5-1 3-.3 4-.3s2.5-.7 4 .3c1 2.5-.5 4-.8 6.5S18 22 17 22s-.8-3-1-3-.2 3-1 3-1.4-2-1.7-4.5S11 13.5 12 11Z" />
      </>
    ),
  },
  exam: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l7 7" />
        <path d="M11 14.5l2.2 2.2L17.5 12" />
      </>
    ),
  },
  braces: {
    viewBox: "0 0 32 32",
    size: 28,
    shapes: (
      <>
        <path d="M3 16h26" />
        <rect x="5" y="11.5" width="5" height="9" rx="1.5" />
        <rect x="13.5" y="11.5" width="5" height="9" rx="1.5" />
        <rect x="22" y="11.5" width="5" height="9" rx="1.5" />
      </>
    ),
  },
  phone: {
    viewBox: "0 0 24 24",
    size: 18,
    shapes: (
      <>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </>
    ),
  },
  pin: {
    viewBox: "0 0 24 24",
    size: 20,
    shapes: (
      <>
        <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  clock: {
    viewBox: "0 0 24 24",
    size: 20,
    shapes: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  check: {
    viewBox: "0 0 24 24",
    size: 18,
    shapes: (
      <>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </>
    ),
  },
  chat: {
    viewBox: "0 0 24 24",
    size: 22,
    shapes: (
      <>
        <path d="M4 5h16v11H9l-5 4V5Z" />
      </>
    ),
  },
  chevronLeft: {
    viewBox: "0 0 24 24",
    size: 18,
    strokeWidth: 2.2,
    shapes: <path d="M15 5l-7 7 7 7" />,
  },
  chevronRight: {
    viewBox: "0 0 24 24",
    size: 18,
    strokeWidth: 2.2,
    shapes: <path d="M9 5l7 7-7 7" />,
  },
  play: {
    viewBox: "0 0 24 24",
    size: 16,
    filled: true,
    shapes: <path d="M8 5v14l11-7z" />,
  },
  pause: {
    viewBox: "0 0 24 24",
    size: 16,
    filled: true,
    shapes: <path d="M7 5h4v14H7zM13 5h4v14h-4z" />,
  },
  star: {
    viewBox: "0 0 24 24",
    size: 18,
    filled: true,
    shapes: (
      <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2 6.4 20.2l1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" />
    ),
  },
};

export const ICON_NAMES = Object.keys(ICONS);
