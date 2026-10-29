# MY99 EXCH — Live Cricket Scores

A cricket live-score website with live scores, ball-by-ball commentary, scorecards, series, news and sports games. The page flow follows Cricbuzz, with MY99 EXCH branding.

The site runs on **Next.js (App Router) + TypeScript + React**. It was migrated from a static HTML / vanilla JS / Tailwind Play CDN site without changing the design. The old static files have been removed; they remain in the git history (before the migration commit) if you ever need them.

There is no backend, database or cricket API. All content comes from dummy data in [lib/data.ts](lib/data.ts).

---

## 1. Running the project

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit (strict)
npm run lint       # ESLint (eslint-config-next)
```

Node 20 or newer is required. The project was built and tested with Node 22 and npm 10.

---

## 2. Tech stack

| Layer | What we use | Where |
|---|---|---|
| Framework | **Next.js 16.4.2** (App Router), **React 19.2** | [app/](app/) |
| Language | **TypeScript 5.9**, `strict` mode | [tsconfig.json](tsconfig.json) |
| Styling | **Tailwind CSS 3.4**, compiled through PostCSS. It uses the same theme as the old Play CDN config. | [tailwind.config.ts](tailwind.config.ts), [app/globals.css](app/globals.css) |
| Sliders | **Swiper 11.1.14**, the same version and options as before | [components/Rotator.tsx](components/Rotator.tsx), [components/home/MatchCarousel.tsx](components/home/MatchCarousel.tsx) |
| Fonts | **Inter** 400–700 and **Rajdhani** 500–700, self-hosted by `next/font/google` | [app/layout.tsx](app/layout.tsx) |
| Flags | flagcdn.com PNGs, with a coloured initials badge for teams without an ISO code | `Flag` in [components/ui.tsx](components/ui.tsx) |
| Icons | Inline SVGs | [components/icons.tsx](components/icons.tsx) |

### Tailwind theme ([tailwind.config.ts](tailwind.config.ts))

The theme is the same one the original Play CDN config used:

| Token | Values |
|---|---|
| `brand` | 50 `#E6F7F5`, 500 `#0B7A6F`, 600 `#09685F`, 700 `#07564F`. Used for the header, footer and accents. |
| `strip` | `#1E2A2E`, the match strip under the header |
| `navy` | 700 `#1A2B6D`, 800 `#132057`, 900 `#0C1640`. Used for dark panels and game cards. |
| `gold` | 300 `#FFE27A`, 400 `#FFC933`, 500 `#FFB800`, 600 `#F59E0B`. Used for Play buttons and active states. |
| `live` | `#E53935`, for LIVE badges and wickets |
| `page` | `#EEF2F5`, the page background |
| Shadows | `shadow-card`, `shadow-lift`, `shadow-glow` |
| Animations | `animate-marquee` (games ticker), `animate-shimmer` (Play buttons), `animate-livepulse` (LIVE dot) |

**All styling lives in one file plus Tailwind classes.** [app/globals.css](app/globals.css) holds the few site-wide rules (scrollbar hiding, focus ring, news prose, reduced motion, Swiper dots, WhatsApp bubble animation) followed by the Tailwind layers. The only inline `style` attributes left are values computed from data: team badge colours, worm-chart legend colours and the win-probability bar widths.

**CSS order matters.** Swiper's CSS loads first ([app/layout.tsx](app/layout.tsx)), then the site rules, then Tailwind, so Tailwind utilities win over Swiper's defaults (for example the padding on the match carousel), exactly as in the original design.

---

## 3. Folder structure

```
MY99EXCH-SCORE/
├── app/                     Next.js routes
│   ├── layout.tsx           Shared shell: header, 3-column grid, sidebars, footer, WhatsApp button
│   ├── globals.css          The single global stylesheet: site rules + Tailwind layers
│   ├── page.tsx             /               Home
│   ├── matches/             /matches        Live / Recent / Upcoming
│   ├── match-detail/        /match-detail   Match centre (9 tabs)
│   ├── series/              /series         Series list and series page
│   ├── news/                /news           News list and article
│   ├── games/               /games          Games lobby
│   ├── game-detail/         /game-detail    One game
│   └── page-content/        /page-content   About, Contact, Terms, Privacy, Rankings
├── components/
│   ├── SiteHeader.tsx       Header, match strip, ALL panel, mobile drawer
│   ├── Sidebars.tsx         Left sidebar (tall rotator + Quick Links), right sidebar
│   ├── SiteFooter.tsx       Footer + mobile bottom nav
│   ├── WhatsApp.tsx         Floating WhatsApp button + pop-up bubble
│   ├── Rotator.tsx          Swiper promo rotator + MobilePromo
│   ├── Tabs.tsx             Accessible tab bar
│   ├── ui.tsx               Flag, badges, Card, SectionHead, PlayBtn, MatchRow, ScoreLine, Chip, Pills
│   ├── icons.tsx            Inline SVG icons
│   ├── home/  matches/  match/  series/  news/  games/  pages/   Page-specific client components
├── lib/
│   ├── data.ts              All dummy data (teams, squads, series, matches, news, games + game guides, ads, tables, rankings)
│   ├── cricket.ts           Deterministic ball-by-ball innings simulator
│   ├── types.ts             Data types
│   ├── nav.ts               Navigation menu + active-page mapping
│   ├── constants.ts         Tab and filter lists shared by server and client code
│   ├── params.ts            Search-param helpers, URL sync (history.replaceState)
│   └── toast.ts             Status toast
├── public/images/           Images served by the site (logo, ads/, games/, news/)
├── next.config.ts           Redirects from the old .html URLs
└── tailwind.config.ts  postcss.config.mjs  eslint.config.mjs  tsconfig.json  package.json
```

**Server and client components.** Pages are Server Components and read `searchParams` on the server. Anything interactive is a Client Component:
- the header, footer and WhatsApp button
- rotators and the match carousel
- the tabs and filters on each page
- the match centre
- the contact form and rankings

When a link changes the query string, the page's client component remounts with the new values (by `key`). This matches the old full-page-reload behaviour.

---

## 4. Routes

| Old page | Next.js route | Query parameters |
|---|---|---|
| `index.html` | `/` | – |
| `matches.html` | `/matches` | `tab` (Live, Recent, Upcoming), `cat`, `team`. `tab` and `cat` follow the selection. |
| `match-detail.html` | `/match-detail` | `id`, `tab` (`info`, `live`, `scorecard`, `squads`, `overs`, `graphs`, `highlights`, `full-commentary`, `news`). Both follow the selection. |
| `series.html` | `/series` | `id`, `tab` (Fixtures, Points Table, Stats) |
| `news.html` | `/news` | `id` (article), `cat` |
| `games.html` | `/games` | `cat`, which follows the selection |
| `game-detail.html` | `/game-detail` | `id` |
| `page.html` | `/page-content` | `p` (about, contact, terms, privacy, rankings). Rankings also uses the hash: `#Test`, `#ODI`, `#T20`. |

**Old links keep working.** Every `*.html` URL redirects (308) to its new route with the query string kept, for example `/matches.html?tab=Recent` → `/matches?tab=Recent` ([next.config.ts](next.config.ts)).

---

## 5. Data and the cricket simulator

[lib/data.ts](lib/data.ts) holds the same values as the original site. Only the image paths (`/images/...`) and link targets (the new routes) changed.

[lib/cricket.ts](lib/cricket.ts) is a line-for-line TypeScript port of the original simulator. Each match stores only a headline score (for example `{ t: 'IND', r: 238, w: 5, o: '83.1' }`). The simulator rebuilds that innings ball by ball:
- **Seeded:** `mulberry32` is seeded by the match id, so a match gives the same result on every load.
- **Consistent:** the scorecard, commentary, overs list, fall of wickets, graphs and series stats all add up to the headline score.
- **Self-checking:** if they don't, it logs a `simulation drift` warning.

**Verified identical.** During the migration, both simulators were run on all 14 matches: 18 innings and 5,456 deliveries. They produced byte-identical JSON, including the generated squads.

To add or change a match, edit its `inns` in `MATCHES`.

---

## 6. Images

All images live in `public/images/` and are referenced as `/images/...`.

| File | Size | Used in |
|---|---|---|
| `logo.webp` | 1354×271 | Header, drawer, footer, ad overlays, favicon |
| `ads/tall-1.png` – `tall-3.png` | 280×690 | Tall rotators: left sidebar and right sidebar bottom (`ADS.tall`, `ADS.tall2`) |
| `ads/box-1.png` – `box-3.png` | 220×300 | Right sidebar rotator, mobile promos, carousel promo cards, match-centre sponsor (`box-1`) (`ADS.box`) |
| `ads/strip-1.png` – `strip-3.png` | 1200×200 | Home strip slider (`ADS.strip`) |
| `ads/games-hero.jpg` | 1188×172 | Games page hero background |
| `games/cricket-clash.png`, `football-clash.png`, `basketball-clash.png`, `game-clash.png`, `india-clash.png` | 280×240 | Game artwork (`GAMES`) |
| `news/featured.jpg`, `news/n1.jpg` – `n8.jpg` | various | News photos; Cricket Quiz uses `news/featured.jpg` |
| `popup/mascot.webp`, `logo-crown.webp`, `corner-left.webp`, `corner-right.webp` | transparent | Game ID popup artwork (cut out of the popup design) |

**Plain `<img>`, not `next/image`.** Images use plain `<img>` with the original classes (`object-cover`, aspect boxes, `loading="lazy"`), so they render at exactly the designed sizes and crops. The flags are external images from flagcdn.com. The ESLint `no-img-element` rule is turned off for this reason.

---

## 7. Sliders and interactions

| Feature | Behaviour (unchanged) |
|---|---|
| Banner rotators | Swiper with `loop`, autoplay every 5 s that pauses on hover, 600 ms transition, gold pagination dots, keyboard and a11y. Created in `useEffect` and destroyed on unmount. |
| Match carousel | Shows 1.2, 1.5 or 2.5 cards (at ≥0, ≥768 and ≥1024px). Arrows, drag, keyboard and horizontal mouse-wheel. A promo card appears after every 3 matches. |
| Games marquee | CSS `animate-marquee`, pauses on hover |
| Tabs | `role=tablist/tab/tabpanel`, Arrow, Home and End keys, roving tabindex |
| Match centre | Tab panels render the first time they are opened. Includes Load more commentary, innings pills (Overs, Graphs, Full Commentary), the animated win-probability bar, and the toast on Highlights. |
| Header | Desktop dropdowns (hover and focus), ALL matches panel (closes on outside click or Escape), mobile drawer (locks body scroll, closes on Escape or a link) |
| WhatsApp | The bubble pops up after 2.5 s. Closing it keeps it hidden for the rest of the browser session. The number is a placeholder: `WHATSAPP` in [components/WhatsApp.tsx](components/WhatsApp.tsx). |

---

## 8. How the migration was verified

- **Screenshots:** 18 page states at 375, 768, 1280 and 1536px were compared with the original, 72 pairs in all. Animations were frozen and sliders reset to slide 1.
  - Every page has exactly the same height as the original.
  - At 768px and wider, pixel differences are below 0.05%. These are sub-pixel font anti-aliasing.
  - At 375px, the remaining differences are anti-aliasing plus lazy images that had not loaded yet at capture time. The images load normally when scrolled into view.
- **Computed styles:** colour, background, border, font, spacing, size, shadow, radius and so on were compared element by element on every page at every width. After the fixes in section 9, they match. The only differences are under 0.5px, from the self-hosted fonts.
- **Functional:** 63 scripted checks of tabs, filters, URL sync, Load more, innings pills, keyboard navigation, drawer, ALL panel, toasts, contact form, rankings hash, WhatsApp, autoplay, client navigation, the back button, legacy redirects, and bad query values. All passed.
- **Tooling:** `tsc --noEmit` (strict), `eslint .` and `next build` all pass. There are no hydration warnings in dev mode, and no page errors or 404s.

---

## 9. Differences from the original, and known issues

**Migration changes that keep the same look:**
- **Self-hosted fonts.** `next/font` serves Inter and Rajdhani instead of the Google Fonts `<link>`. Glyph widths differ by about 0.02px.
- **Quick Access pills.** The old markup put two text colours and two border colours on the Games and Series pills. The Play CDN happened to let violet and orange win, but compiled Tailwind orders those classes differently. The default slate colours now go only on the two India pills, so all four pills render as before.
- **Client-side navigation.** Internal links use `next/link`, so pages change without a full reload. Menus close, and dropdowns lose focus, when a link is followed, as they did after a reload. Rankings also follows `#Test`, `#ODI` and `#T20` when they change on the same page.
- **Safer lookups.** Query values such as `?id=__proto__` no longer match built-in object keys. The old site would have crashed on them.

**Pre-existing, unchanged:**
- **Rotators don't loop.** Swiper logs "not enough slides for loop mode" for the 3-slide rotators, so loop is disabled and autoplay stops at the last slide. The original site behaves the same.
- **Swiper security advisory.** `npm audit` reports a prototype-pollution advisory for Swiper ≤12.1.1. It was kept at 11.1.14 to avoid changing behaviour. The site passes only fixed options to Swiper, never user input.
- **Banner wording clash.** The home strip banners (`s1–s3`) advertise a sportsbook, while the Terms page says all games are free with no real money.
- **Small remount edge case.** On the match centre, if you switch tabs and then follow a link to the exact URL the page was first opened with, the page keeps the current tab.

---

## 10. The original static site

The old static files (`*.html`, `JS/`, `CSS/`, `IMG/` including the `IMG/zip/` backup) were removed after the migration was verified. They are still in the git history. Old `.html` links keep working through the redirects in [next.config.ts](next.config.ts).

---

## 11. Common edits

| Task | Where |
|---|---|
| Brand colours, fonts, shadows, animations | [tailwind.config.ts](tailwind.config.ts), fonts in [app/layout.tsx](app/layout.tsx) |
| Add or edit a match or score | `MATCHES` in [lib/data.ts](lib/data.ts) |
| Add a news story | `NEWS` in [lib/data.ts](lib/data.ts), plus an image in `public/images/news/` |
| Add a game | `GAMES` in [lib/data.ts](lib/data.ts), plus art in `public/images/games/`. Add About text for a new category in `GAME_ABOUT` in [lib/data.ts](lib/data.ts). |
| Change banner slides | `ADS` in [lib/data.ts](lib/data.ts) |
| Navigation menus | `NAV` in [lib/nav.ts](lib/nav.ts) |
| Footer links | [components/SiteFooter.tsx](components/SiteFooter.tsx) |
| About, Terms and Privacy text | `PAGES` in [app/page-content/page.tsx](app/page-content/page.tsx) |
| WhatsApp number | `WHATSAPP` in [components/WhatsApp.tsx](components/WhatsApp.tsx) |
