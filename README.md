# Rivan Simulation

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## Structure

```
src/
  assets/            logo-rivan.png, rivan.jpg, image-1..3.jpg
  assets/mcdo/       artwork for the simulated site (14 files)
  assets/bir/        artwork for the simulated tax-agency site
  components/
    categories.js       the nav tree: tracks, topics, paths, blurbs
    SiteHeader.jsx      logo, wordmark, nav tabs, Category menu + submenu
    PromoSlideshow.jsx  four-card promo carousel
  layouts/
    SiteLayout.jsx      header + <Outlet/> + page background
  pages/
    TransitionPage.jsx  HomePage.jsx  AboutPage.jsx
    CategoryIndexPage.jsx  ComingSoonPage.jsx
    ipi/               Indirect lab: role switcher, Victim and Attacker views
    dpi/               Direct lab: DirectPromptInjectionPage.jsx
  sims/mcdo/         the simulated fast-food site
    McdoSite.jsx + McdoNav/Hero/Cards/Footer.jsx + mcdo.css
    injectionPayload.js  the planted attacker text and where it goes
    pageContext.js       the scraper the bot uses
  sims/bir/          the simulated tax-agency site (Direct lab)
    BirSite.jsx + BirHeader/Sections/Footer.jsx + bir.css
    birContent.js        copy and artwork, apart from the markup
    birSecrets.js        the fabricated values the bot protects
    birSystemPrompt.js   the bot's system message
    birPersona.js        what ChatWidget needs to become this site's bot
  chat/              the popup assistant
    ChatWidget.jsx + .css   UI, lab controls, leak banner
    ollama.js               local model client
    systemPrompt.js         builds the system message
    leakDetector.js         spots secrets in a reply
  index.css          design tokens lifted from Figma
```

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


The **Reveal hidden payload** toggle (Lab controls, in the chat panel) shows
planted text using CSS generated content, so turning it on never changes what
the scraper collects.

## Direct Prompt Injection lab

`/category/prompt-hacking/direct-prompt-injection` — one view over a replica
tax-agency site with a support bot in the corner.

Where the Indirect lab hides the attack in content the bot reads, this one has
nothing to plant: the site is clean, the bot does not scrape it, and the only
way in is the chat box. The system prompt holds two fabricated values
(`BIR-EFPS-ADMIN-7731`, PIN `5082`) and a sentence forbidding the bot to share
them. That sentence is the entire defence.

The messages to type, with what each one teaches, are in
[`goal-in-direct-injection.md`](./goal-in-direct-injection.md). Measured against
`llama3.2` at `temperature: 0`, each as the first message of a fresh chat: the
four control messages (including the classic "ignore all previous
instructions") are refused, and the three documented attacks leak both values.

`ChatWidget` is shared between the two labs. It takes a `persona` — copy,
theme, system-prompt builder and the secrets that count as a leak — and
defaults to the fast-food site's, so the Indirect lab passes nothing.

**The replica is a training prop.** Not affiliated with, endorsed by, or
connected to the Bureau of Internal Revenue or any government agency. Keep it
local — do not deploy it to a public domain.
