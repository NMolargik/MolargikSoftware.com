# Molargik Software LLC

The product site for **[molargiksoftware.com](https://molargiksoftware.com)**: six independent apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, built by **Nick Molargik**. Private by design.

## Apps

| App | One line | Price | Platforms |
|-----|----------|-------|-----------|
| **[Maestro](https://molargiksoftware.com/maestro)** | Turn any song into a Tesla light show | Free to try, $12.99 one-time unlock | iPhone, iPad, Mac |
| **[Opalite](https://molargiksoftware.com/opalite)** | Pick, organize, check, and export colors | Free, Onyx $9.99 one-time | iPhone, iPad, Mac, Watch, TV, Vision Pro |
| **[SetDeck](https://molargiksoftware.com/setdeck)** | Plan the training week and log every set | Free | iPhone, iPad, Watch, Vision Pro |
| **[Mygra](https://molargiksoftware.com/mygra)** | Migraine journal with on-device insights | Free, Mygra Plus from $2.99/mo | iPhone, iPad, Mac, Watch, Vision Pro |
| **[Stork](https://molargiksoftware.com/stork)** | Delivery stats for L&D nurses | Free, Stork Pro $4.99 one-time | iPhone, iPad, Mac, Watch, Vision Pro |
| **[Waffle](https://molargiksoftware.com/waffle)** | Browse the web in a grid on iPad | Free, Syrup $4.99 one-time | iPad |

The facts above live in one place, [`src/data/catalog.mjs`](src/data/catalog.mjs), and feed the home grid, the app pages, the press kit, the support page, the OG images, and the prerendered `<head>` tags.

## Routes

| Route | Page |
|-------|------|
| `/` | Company-first home: hero, six-app grid, "Why Molargik" |
| `/maestro` `/opalite` `/setdeck` `/mygra` `/stork` `/waffle` | App pages (`AppShowcase` layout: hero, price and platforms, screenshots, about, testimonials, download CTA) |
| `/support` | Per-app FAQ, contact email, link to privacy |
| `/press` | Press kit: blurbs, icons, screenshots, descriptions |
| `/privacy` | One privacy policy covering every app and the site |
| `/about` | Nick: résumé, experience (links to StreetIQ and V1 Sports), skills, GitHub, LinkedIn |
| `/contact` | Support and press contact form (EmailJS) |
| `/opalite-web` | Opalite Web: sign in with Apple and browse your Opalite library (CloudKit JS) |
| `/go/<app>?ct=<channel>` | Short tracked redirect to the App Store, e.g. `/go/maestro?ct=x`; add `&platform=mac` for the Mac App Store |
| `/streetiq` `/v1sports` | Employment pages |

Legacy hash links (`/#/maestro`) are rewritten to the path on load.

## Tech stack

React 19 + TypeScript, Vite 7, React Router 7 (BrowserRouter), Tailwind CSS 3.4, Framer Motion, Embla Carousel, Lucide, EmailJS, sharp (build-time images).

## Development

```bash
npm ci
npm run dev       # Vite dev server on https://localhost:5173
npm run build     # tsc + vite build + scripts/postbuild-seo.mjs
npm run preview   # serve dist/
npm run lint
```

Build-time asset scripts (outputs are committed; re-run when sources change):

```bash
npm run assets    # app icons + screenshot carousels from ../../Apps -> src/assets/<app>/
npm run og        # 1200x630 Open Graph images -> public/og/
npm run press     # press-kit icons + 3 screenshots per app -> public/press/
npm run photos    # re-encode the portrait photos in src/assets as WebP + JPEG
```

### Configuration

`src/config/site.ts` holds the two "fill in later" constants:

- `APP_STORE_PT`: Apple campaign provider token. Every App Store link carries `?ct=site_<page>&mt=8`; `pt=` is added once this is set.
- `CF_BEACON_TOKEN`: Cloudflare Web Analytics token. The beacon is rendered into `index.html` only when set.

`.env` (gitignored) provides the EmailJS and CloudKit JS values for local builds:

```
VITE_EMAILJS_SERVICE=...
VITE_EMAILJS_TEMPLATE=...
VITE_EMAILJS_PUBLIC=...
VITE_CLOUDKIT_CONTAINER=iCloud.<container>
VITE_CLOUDKIT_ENVIRONMENT=production
VITE_CLOUDKIT_API_TOKEN=...
```

The same values must exist in the GitHub repository for the Pages build (Settings > Secrets and variables > Actions): secrets `EMAILJS_SERVICE`, `EMAILJS_TEMPLATE`, `EMAILJS_PUBLIC`, `VITE_CLOUDKIT_API_TOKEN` and variables `VITE_CLOUDKIT_CONTAINER`, `VITE_CLOUDKIT_ENVIRONMENT`. Without them the contact form cannot send and Opalite Web shows its "temporarily unavailable" state.

## SEO and sharing

`scripts/postbuild-seo.mjs` runs as part of `npm run build` and, from `src/seo/routes.mjs`:

- writes `dist/<route>.html` per route with title, description, canonical, Open Graph, and Twitter tags (GitHub Pages serves `maestro.html` at `/maestro`),
- writes `dist/404.html` as the SPA fallback for unknown paths such as `/go/...`,
- writes `dist/sitemap.xml` and `dist/robots.txt`.

The client keeps the tags current on navigation through `usePageMeta` / `useRouteMeta`.

## Deployment

GitHub Pages, deployed by `.github/workflows/pages.yml` on every push to `main`. The custom domain is set by `public/CNAME`. The Maestro export counter at `api.molargiksoftware.com` is a separate Cloudflare Worker in `workers/maestro-counter`.

## Links

- **Website:** [molargiksoftware.com](https://molargiksoftware.com)
- **GitHub:** [github.com/NMolargik](https://github.com/NMolargik)
- **LinkedIn:** [linkedin.com/in/nicholas-molargik](https://linkedin.com/in/nicholas-molargik)
- **Contact:** nick@molargiksoftware.com

## License

MIT. See [LICENSE](LICENSE).
