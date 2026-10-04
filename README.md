# Talwar Dental Care website

Bilingual (English / Hindi), responsive website for Talwar Dental Care, Mansarovar, Jaipur.
Built with React 18 and Vite.

## Quick start

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run check      # lint + format check + tests + production build (run before every release)
npm run build      # production files in /dist
npm run build:preview   # ONE self-contained HTML file in /dist-single (for sharing a preview)
```

Requires Node 18.18 or newer.

## Where to change things

| I want to change…                                 | Edit this file                                     |
| ------------------------------------------------- | -------------------------------------------------- |
| Phone, WhatsApp number, address, map link, rating | `src/config/site.js`                               |
| Any wording on the page (English)                 | `src/content/en.js`                                |
| Any wording on the page (Hindi)                   | `src/content/hi.js`                                |
| Reviews, treatments, doctor details               | `src/content/en.js` and `src/content/hi.js`        |
| Photos                                            | replace files in `src/assets/images/` (same names) |
| Hero slideshow order and photo cropping           | `src/components/sections/Hero/heroSlideData.js`    |
| Colours, spacing, fonts                           | `src/styles/tokens.css`                            |
| Site address used for SEO and sharing             | `.env.production` (`VITE_SITE_URL`)                |

**Keep both language files identical in structure.** A test fails if a key exists in one language but not the other.

## Project structure

```
src/
  config/        site.js: clinic facts, nav links, section ids
  content/       en.js, hi.js: all visitor-facing text (plain data)
  context/       language state, remembered between visits
  hooks/         useLanguage, useSlideshow, useBookingForm, usePrefersReducedMotion
  utils/         validation, whatsapp, format, storage, scroll, structuredData
  components/
    ui/          reusable pieces: Button, Icon, IconTile, Logo, Stars, Section…
    layout/      Header, Footer, QuickBar, LanguageToggle, SkipLink
    sections/    one folder per page section (Hero, Doctor, Services, OneRoof, Reviews, Contact)
    Seo.jsx      title, meta tags and structured data per language
  styles/        tokens, base, layout, typography (component CSS lives beside each component)
  assets/        images/ and logo/ (imported only through index.js files)
  test/          test setup (tests sit next to the code they cover: *.test.js / *.test.jsx)
public/          favicon, app icons, og-image.jpg, robots.txt, manifest
scripts/         inline-preview.mjs (builds the single-file preview)
```

Conventions:

- Components never contain clinic facts or text. They read `CLINIC` from `config/site.js` and copy from `useLanguage()`.
- One component per file, CSS beside it, `@/` is an alias for `src/`.
- Shared state lives as high as needed and no higher (the chosen treatment is held in `App` because a service card sets it and the booking form shows it).

## Quality checks

| Command                | What it does                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `npm run lint`         | ESLint with React, hooks and accessibility (jsx-a11y) rules                             |
| `npm run format:check` | Prettier formatting                                                                     |
| `npm test`             | Vitest + Testing Library (content parity, validation, booking flow, slideshow, reviews) |
| `npm run check`        | all of the above plus the production build                                              |

GitHub Actions (`.github/workflows/ci.yml`) runs the same checks on every push and pull request.

## Deploying

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, ordinary web hosting).

1. Set `VITE_SITE_URL` in `.env.production` to the real address (no trailing slash).
2. `npm run build`
3. Upload `dist/`.

## Things to confirm with the clinic

- **Opening hours** in `content/*.js` (`contact.hours`, `hero.badgeSub`) and `config/site.js` (`openingHours`). They must all say the same thing.
- **Overall rating** in `config/site.js`: currently the Justdial figure. Use the Google Business Profile rating once confirmed, and change `source` to `"Google"`.
- **Doctor memberships and qualifications** in `content/*.js`.
- **Hindi wording**: have a Hindi speaker proofread `content/hi.js`.

## Notes

- Fonts (Plus Jakarta Sans, Noto Sans Devanagari) are bundled, so no request goes to Google Fonts.
- The booking form opens WhatsApp with the details pre-filled. There is no server, so nothing is stored.
- The hero slideshow and the reviews row respect the visitor's "reduce motion" setting, and both can be paused.
