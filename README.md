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

The site is static, so the contents of `dist/` go to any web host (Hostinger, Netlify, Vercel, Cloudflare Pages, GitHub Pages).

1. Set `VITE_SITE_URL` in `.env.production` to the real address (no trailing slash).
2. `npm run check` — lint, formatting, tests and the production build.
3. Upload the **contents** of `dist/` (not the folder itself).

`public/.htaccess` is copied into `dist/` by the build. It forces HTTPS, redirects `www` to the
bare domain, enables compression and caches hashed assets for a year while keeping the HTML
always revalidated. Hostinger runs LiteSpeed, which reads it; hosts that ignore `.htaccess`
simply skip it.

### Hostinger (current host)

Pushing to `master` releases the site. `.github/workflows/ci.yml` runs lint, formatting and
tests, builds with the real `VITE_SITE_URL`, and uploads `dist/` to `public_html` over FTPS.
It only uploads files that changed, and it never deploys when the checks fail.

Three repository secrets are required (**Settings → Secrets and variables → Actions**). Take the
values from hPanel → **Files → FTP Accounts**:

| Secret         | Value                                                |
| -------------- | ---------------------------------------------------- |
| `FTP_SERVER`   | FTP hostname or IP, e.g. `ftp.talwardentalcare.com`  |
| `FTP_USERNAME` | FTP username, e.g. `u123456789.talwardentalcare.com` |
| `FTP_PASSWORD` | that FTP account's password                          |

You can also start a release by hand from the **Actions** tab (**Run workflow**), which offers a
**Delete everything in public_html before uploading** checkbox.

#### First release only: clearing the old WordPress site

The domain previously served a placeholder WordPress install. Before the first deploy:

1. hPanel → **Websites → Dashboard → Files → Backups**, take a files and database backup so the
   old install can be restored.
2. Run the workflow from the **Actions** tab with the **wipe public_html** box ticked. That
   empties the directory and uploads the new site in one go. Later pushes upload only what
   changed, so leave the box unticked from then on.
3. Drop the orphaned WordPress database in hPanel → **Databases → Management**.
4. Purge the server cache in hPanel → **Advanced → Cache Manager**, or old pages keep being
   served from LiteSpeed.

`.htaccess` already redirects the retired WordPress URLs (`/privacy-policy/`, `/hello-world/`,
`/customer-cabinet/`, `/wp-*`, `/sitemap_index.xml`) so nothing already indexed returns a 404.
Resubmit `https://talwardentalcare.com/sitemap.xml` in Google Search Console afterwards.

After a release, check `https://talwardentalcare.com`, `https://talwardentalcare.com/hi/`, the
WhatsApp booking button, and that `http://` and `www.` both redirect to the canonical address.

#### Releasing from your own machine

`scripts/deploy-hostinger.py` uploads `dist/` over FTPS using the Python standard library, so
there is nothing to install. Put the same three FTP values in a `.ftp-credentials` file in the
project root (git-ignored, one `KEY=value` per line), then:

```bash
npm run build
python3 scripts/deploy-hostinger.py --list     # what is on the server now
python3 scripts/deploy-hostinger.py            # dry run, changes nothing
python3 scripts/deploy-hostinger.py --apply    # upload
```

Add `--wipe` to empty `public_html` before uploading. Nothing is ever changed without `--apply`.

#### Releasing through the File Manager

```bash
npm run check
cd dist && zip -r -q ../talwar-dental-site.zip . -x "./.vite/*" && cd ..
```

In hPanel → **Files → File Manager**, open `public_html`, remove the old site files, upload
`talwar-dental-site.zip` and choose **Extract**, then delete the zip. `.htaccess` is hidden by
default — turn on hidden files in the File Manager settings to confirm it arrived. Do not upload
`dist/.vite/`; it is a build manifest used only by the prerender step.

## Things to confirm with the clinic

- **Opening hours** in `content/*.js` (`contact.hours`, `hero.badgeSub`) and `config/site.js` (`openingHours`). They must all say the same thing.
- **Overall rating** in `config/site.js`: currently the Justdial figure. Use the Google Business Profile rating once confirmed, and change `source` to `"Google"`.
- **Doctor memberships and qualifications** in `content/*.js`.
- **Hindi wording**: have a Hindi speaker proofread `content/hi.js`.

## Notes

- Fonts (Plus Jakarta Sans, Noto Sans Devanagari) are bundled, so no request goes to Google Fonts.
- The booking form opens WhatsApp with the details pre-filled. There is no server, so nothing is stored.
- The hero slideshow and the reviews row respect the visitor's "reduce motion" setting, and both can be paused.
