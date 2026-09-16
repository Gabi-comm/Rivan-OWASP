# Rivan Simulation

React front-end for **RivanCyber Training Institute Inc.**, built from the Figma
file [`Rivan Simulation`](https://www.figma.com/design/YPJDpQWgSMrkBnGtS1lH2g/Untitled?node-id=1-5).

> **Local teaching prop.** The Indirect Prompt Injection lab reproduces a
> fast-food brand (logos, photography under `src/assets/mcdo/`) to build a
> convincing replica for a security class. Those assets are third-party
> property, not covered by this repo's licence. Run it on `localhost` for
> teaching — do not deploy the replica to a public domain, and swap the brand
> assets for your own before distributing it. See `LICENSE`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## Screens

| Route | Notes |
| ----- | ----- |
| `/` | Splash (Figma `Transition Page` 2:2); holds 2.6s, then hands off to `/home`. Click or press any key to skip. |
| `/home` | Figma `Home Page` 6:27 — hero intro and promo slideshow. Renders its own `SiteHeader`. |
| `/about` | About the institute. |
| `/category` | Lists the three tracks. |
| `/category/prompt-hacking` | Lists the three attack types. |
| `/category/prompt-hacking/indirect-prompt-injection` | Redirects to `/victim`. |
| `.../indirect-prompt-injection/victim` | **The lab, customer's view.** See below. |
| `.../indirect-prompt-injection/attacker` | Same site + a console for planting a review. |
| `/category/prompt-hacking/direct-prompt-injection` | Stub. |
| `/category/prompt-hacking/memory-poisoning` | Stub. |
| `/category/guardrailing` | Stub. |
| `/category/machine-learning` | Stub. |
| `*` | 404, inside the site chrome. |

Everything except `/` and `/home` renders inside `SiteLayout` (`src/layouts/`),
which supplies the header and the page background. `/home` predates the layout
and still renders its own header.

The nav tree lives in `src/components/categories.js`. The header menu and the
category pages both read from it, so adding a topic in one place updates both.

## Structure

```
src/
  assets/            logo-rivan.png, rivan.jpg, image-1..3.jpg
  assets/mcdo/       artwork for the simulated site (14 files)
  components/
    categories.js       the nav tree: tracks, topics, paths, blurbs
    SiteHeader.jsx      logo, wordmark, nav tabs, Category menu + submenu
    PromoSlideshow.jsx  four-card promo carousel
  layouts/
    SiteLayout.jsx      header + <Outlet/> + page background
  pages/
    TransitionPage.jsx  HomePage.jsx  AboutPage.jsx
    CategoryIndexPage.jsx  ComingSoonPage.jsx
    IndirectPromptInjectionPage.jsx   briefing, sim, debrief
  sims/mcdo/         the simulated fast-food site
    McdoSite.jsx + McdoNav/Hero/Cards/Footer.jsx + mcdo.css
    injectionPayload.js  the planted attacker text and where it goes
    pageContext.js       the scraper the bot uses
  chat/              the popup assistant
    ChatWidget.jsx + .css   UI, lab controls, leak banner
    ollama.js               local model client
    systemPrompt.js         builds the system message
    leakDetector.js         spots secrets in a reply
  index.css          design tokens lifted from Figma
```

Every element carries its Figma node id as a `data-node-id` attribute, so a
component can be traced back to the exact layer it came from.

## Design tokens

Defined once in `src/index.css`:

| Token             | Value     | Used for                          |
| ----------------- | --------- | --------------------------------- |
| `--navy-600`      | `#0b2f51` | Core of both radial backgrounds   |
| `--navy-700/800`  | `#09213c` / `#071e37` | Mid gradient stops    |
| `--navy-900/1000` | `#061326` / `#040c1e` | Outer gradient stops  |
| `--panel`         | `#0d2744` | Category dropdown surface         |
| `--panel-border`  | `#1b4667` | Dropdown border                   |
| `--tab-idle`      | `#081a31` | Inactive nav tab                  |
| `--tab-active`    | `#123858` | Active / hovered nav tab          |
| `--cyan`          | `#39c7f2` | Eyebrow, accent line              |
| `--cyan-bright`   | `#00c8ff` | Splash divider core               |
| `--text-muted`    | `#7ec8e3` | Body copy, tagline                |

Type is **Inter** (400/500/700), matching the Figma text styles.

## Promo slideshow

`PromoSlideshow.jsx` rotates four square promo cards:

1. `rivan.jpg` — Start your I.T. career
2. `image-1.jpg` — Enterprise-grade equipment
3. `image-2.jpg` — Mentorship from professionals
4. `image-3.jpg` — Trusted across the industry

- Auto-advances every 5s (`INTERVAL_MS`), pausing on hover and on focus.
- Prev/next arrows, clickable dots, and left/right arrow keys when focused.
- Crossfades between slides; autoplay is disabled under
  `prefers-reduced-motion: reduce`.
- The frame is **1:1**, not the Figma's 280 x 320. All four cards are square
  artwork whose headline and contact bands sat outside a portrait crop.
- Card width went from 280px to 440px.

To add or reorder cards, edit the `SLIDES` array — drop the file in
`src/assets/`, import it, and add an entry with `alt` and `caption`.

## Responsive behaviour

The Figma frames are a fixed 800 x 600. The build keeps those exact colours,
type sizes and spacing while reflowing:

- **≥ 720px** — intro left, slideshow right, as designed.
- **< 720px** — single centred column, slideshow below the copy.

Both columns shrink proportionally below 940px, so nothing overflows.

## Indirect Prompt Injection lab

Two tabs over the same replica fast-food site:

- **Victim** — the site and its support bot, as an ordinary customer sees it.
- **Attacker** — the same site, except the reviews section offers its
  write-a-review form.

The bot answers by scraping the page it sits on, so a review anyone can post
reaches the model as though the developer had written it. Plant on one tab,
switch to the other, ask an innocent question, and the bot obeys the attacker.

**The site ships clean — there are no payloads in the source.** The only way the
bot misbehaves is if someone plants a review. That makes the untouched Victim tab
the built-in control: it refuses to give up its secrets until something is
planted. Planted reviews live in `localStorage`, so they persist across the two
tabs the way they would persist for the next real visitor.

**The replica is a training prop.** Not affiliated with, endorsed by, or
connected to McDonald's. Keep it local — do not deploy it to a public domain.

Neither view explains itself — students are meant to meet the site cold, and the
attacker performs the injection inside the page rather than from a side panel.
Roles are switched from a small floating pill at the left edge.

The presenter's script is in [`instruction.md`](./instruction.md); the payloads
to paste in are in
[`goal-in-indirect-injection.md`](./goal-in-indirect-injection.md).

### Running it

The bot talks to a local [Ollama](https://ollama.com) server:

```bash
ollama pull llama3.2        # ~2 GB
npm run dev
```

`vite.config.js` proxies `/ollama` to `http://localhost:11434`, so the browser
stays same-origin and the lab does not care which port Vite picks. **The proxy
is dev-only** — `npm run preview` and a static build will not reach the model.

Requests are sent at `temperature: 0`. At default temperature the injection
landed roughly half the time, which teaches the wrong lesson; greedy decoding
makes it reproducible.

### Which model

`llama3.2`, at `temperature: 0` so the demo repeats. Measured against the real
page context: with the payloads in place it leaks 5/5; with them stripped out it
keeps the secret 3/3 while inventing plausible promos. That gap is the lesson —
a leak alone proves nothing if the model was never keeping the secret.

`gemma3:270m` was tried and removed. At 270M parameters the injection never
landed (0/4 — it answers with a stray fragment instead of reading the page) and
it gave the secret up with no attack at all, so it could demonstrate neither
half. The model picker in the chat panel only renders when `MODELS` in
`src/chat/ollama.js` has more than one entry.

### Anatomy

- `goal-in-indirect-injection.md` — the three presets, each with the question it
  lands with. Deliberately not in the app: the attacker types or pastes a review
  rather than picking from a dropdown.
- `sims/mcdo/McdoReviewComposer.jsx` — the in-page review form. Site fields on
  top; the attacker's instruction and its conceal toggle below the divider.
- `sims/mcdo/presetMarkers.js` — just the marker strings, so the chat can
  recognise a documented preset firing. Keep in sync with the markdown.
- `sims/mcdo/plantedReviews.js` — `localStorage`-backed store read through
  `useSyncExternalStore`; what makes the plant survive the tab switch.
- `sims/mcdo/McdoReviews.jsx` — the attack surface. A planted review with
  `hidden: true` clips its payload so a scraper sees it and a reader does not.
- `sims/mcdo/pageContext.js` — `harvestPageContext(root)` takes all text plus
  every `alt` in the subtree. Deliberately naive; that naivety is the flaw.
- `chat/systemPrompt.js` — pastes the scrape straight under `PAGE CONTENT:` with
  nothing separating data from instructions.
- `chat/leakDetector.js` — `detectLeak()` finds the fabricated secrets;
  `detectPlantedEffects()` matches template markers. Each drives a banner.
- `sims/mcdo/injectionPayload.js` — now only the fabricated secrets
  (`MCD-CREW-88-OVERRIDE`, PIN `4417`). Nothing real is involved.

All three templates land 5/5 through the real chat UI; the clean Victim tab
leaks 0/3.

The **Reveal hidden payload** toggle (Lab controls, in the chat panel) shows
planted text using CSS generated content, so turning it on never changes what
the scraper collects.
