# Heaven Furniture Mart — Technical Documentation

A single-page, conversion-focused luxury landing experience for **Heaven Furniture Mart**
(bespoke furniture studio, Agrabad Access Road, Chattogram, Bangladesh).

- Live: https://heaven-crafted-journeys.lovable.app
- Brand line: *Designed. Crafted. Customized.*
- Core idea: *Furniture, Crafted Around You.*
- Primary conversion: **Request a Free Design Consultation** → WhatsApp handoff.

The original creative brief lives in `README.md`. This file documents **how the code
actually works**.

---

## 1. Stack

| Concern | Choice |
| --- | --- |
| Framework | TanStack Start v1 (React 19, SSR) |
| Router | TanStack Router (file-based, `src/routes`) |
| Build | Vite 8 via `@lovable.dev/vite-tanstack-config`, Nitro output (Cloudflare-style edge worker) |
| Styling | Tailwind CSS v4 (`src/styles.css`, `@theme` tokens — no `tailwind.config.js`) |
| UI primitives | Radix + shadcn-style components, `class-variance-authority`, `tailwind-merge` |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` (lazy, client-only) |
| AI | Vercel AI SDK (`ai`, `@ai-sdk/react`) with `@ai-sdk/google` (Google Gemini) |
| Icons | `lucide-react` |
| Language | TypeScript, strict paths via `@/*` |

Scripts: `dev`, `build`, `build:dev`, `preview`, `lint`, `format`.

---

## 2. Directory map

```
src/
  routes/
    __root.tsx          app shell: <head> links, fonts, JSON-LD, Outlet
    index.tsx           the ENTIRE landing page (single route)
    api/chat.ts         POST /api/chat — streaming AI concierge endpoint
  router.tsx            createRouter + QueryClient context
  start.ts              request middleware: SSR error page + CSRF for server fns
  server.ts             SSR entry wrapper that normalises catastrophic 500s
  styles.css            design tokens, dark mood, animations, cursor styles
  components/
    site/               every section + interactive component (see §4)
    ai-elements/        chat primitives (conversation, message, prompt-input, shimmer)
    ui/                 shadcn primitives
  lib/
    i18n.tsx            LanguageProvider / useT()
    translations.ts     EN→BN/ES/HI dictionary (~1.2k lines)
    theme.tsx           ThemeProvider (light/dark "mood")
    whatsapp.ts         single source of truth for the WhatsApp number/link
    ai-gateway.server.ts  server-only Gemini model resolution
    utils.ts            cn()
    error-capture.ts / error-page.ts / lovable-error-reporting.ts
  assets/
    real/photos.ts      authentic brand photography registry
    space/space-options.ts  ROOMS / STYLES / SCALES data + 54 curated images
    materials/          material close-ups (teak, velvet, marble, brass)
    process/            4 process step images
public/  favicon.png (brand mark), robots.txt, images/
```

`src/routeTree.gen.ts` is generated — never edit it.

---

## 3. Page composition

`src/routes/index.tsx` owns SEO metadata and nests three providers, then renders the
sections in order:

```
ThemeProvider → LanguageProvider → ConsultationProvider
  Navbar
  main: Hero · Statement · WhyHeaven · DesignYourSpace · Collections · Bespoke ·
        Studio · Materials · Process · Films · Proof · Showroom · Reach ·
        Timeline · FinalCta
  Footer · MobileCta · Concierge · BackToTop · LuxeCursor · ConsultationModal
```

There is intentionally **one route**. Navigation is hash-anchored
(`#collections`, `#bespoke`, `#process`, `#showroom`, `#top`) with smooth scroll.
Do not add extra routes for About/Products/Contact.

---

## 4. Components (`src/components/site/`)

### Shared kit — `ui-kit.tsx`
- `Cta` — the only button style. `tone: solid | outline | light`, `size: md | lg`.
  Uppercase, wide tracking, animated rule that extends on hover.
- `Section` — section shell with `tone: ivory | ink | muted` and translated `aria-label`.
- `Shell` — max-width 1400px container with responsive gutters.
- `SectionHeading` — index number, eyebrow, serif title, intro; supports `invert`.

### Motion helpers
- `reveal.tsx` — `useInView(threshold)` + `<Reveal as delay variant>`; toggles
  `data-shown` and the `.reveal` / `.img-reveal` CSS classes. All scroll animation
  goes through this (no animation library on the critical path).
- `interactive-image.tsx` — `InteractiveImage`: pointer parallax/tilt, optional brass
  `sheen`, optional slow `drift` for hero-scale art. rAF-throttled.
- `luxe-cursor.tsx` — custom brass cursor; elements opt in with `data-cursor="grow"`.
  Styling lives in `styles.css`.

### Sections
| Component | Notes |
| --- | --- |
| `navbar.tsx` | Transparent → compact glass on scroll. Logo + "HEAVEN Furniture Mart", 4 anchors, Request Consultation CTA, mood/language controls, animated mobile menu. |
| `hero.tsx` | Full-viewport cinematic image (eager/LCP), editorial headline, primary CTA + "Explore our work ↓". |
| `statement.tsx` | Editorial brand statement + Managing Director attribution. |
| `why-heaven.tsx` | Six numbered trust points, scroll-revealed. |
| `design-your-space.tsx` | **Wow #2.** Room → Style → Scale selector. Data from `assets/space/space-options.ts`; `Choice` cards carry their own thumbnail, `Facet` wraps each group in a `<fieldset>` with an eyebrow legend. The large preview cross-fades via the `image-swap` keyframe. Every room has its own style/scale thumbnails (54 images), so no combination contradicts the selection. CTA prefills the consultation modal. |
| `collections.tsx` | Four editorial cards (Living, Bedroom, Dining, Office & Study). Clicking opens an in-page drawer/modal, never a new route. |
| `bespoke.tsx` | **Wow #3.** Draggable before/after comparison slider (mouse + touch), labelled `STANDARD SPACE → BESPOKE SOLUTION`. |
| `studio.tsx` + `studio-scene.tsx` | Live 3D configurator. `studio.tsx` holds controls (piece, material, colour, size) and lazy-loads the scene inside `ClientOnly` + `Suspense`. `studio-scene.tsx` is a real WebGL scene: parametric sofa/bed/wardrobe/dining meshes, memoised geometry + materials, lighting, environment, contact shadows, OrbitControls with damping, one-finger rotate, two-finger pinch, clamped zoom/polar angles, `touch-none`. Finished configuration hands off to WhatsApp. |
| `materials.tsx` | Tabbed material explorer (teak, velvet, marble/lacquer, brass) with close-up photography and real spec properties. |
| `process.tsx` | 4-step timeline (You Share / We Design / We Craft / We Deliver), each with an interactive image from `assets/process/`. |
| `films.tsx` | Five YouTube films; lazy thumbnails, inline `youtube-nocookie.com` lightbox, direct video links + channel link. |
| `proof.tsx` | Awards & Recognition: three authentic event photos in consistent 4:3 frames (`object-contain` + padding for the portrait plaque), plus factual trust messaging — no invented reviews or stats. |
| `showroom.tsx` | Immersive full-width showroom section with address and phone. |
| `reach.tsx` | Animated real Bangladesh outline from `bd-map.ts`; only Agrabad/Chattogram is marked and links to the Google Maps pin. The stroke draw uses `getTotalLength()` rather than a hardcoded dash length. |
| `timeline.tsx` | Compact milestones: 2020 founded · 2021 showroom · 2024–2025 International Furniture Fair · 2025 Chamber of Commerce · 2026 BFIOA recognition. |
| `final-cta.tsx` | Closing conversion block + `Footer`. |
| `mobile-cta.tsx` | Fixed bottom Request Consultation bar on phones. |
| `back-to-top.tsx` | Scroll-progress brass ring; listens on window/document/body for Android WebView quirks, with a `window.scrollTo` fallback. |
| `concierge.tsx` | The **Rahi** chat panel (see §6). |
| `consultation-modal.tsx` / `consultation-context.tsx` | The conversion surface (see §5). |

---

## 5. Consultation flow (primary conversion)

`ConsultationProvider` (`consultation-context.tsx`) exposes:

```ts
{ open, prefill, openConsultation(prefill?), setOpen }
```

`ConsultationPrefill = { interest?, room?, space? }`. Any section can deep-link into
the modal with context — e.g. Design Your Space passes the chosen room and scale, and
sets `interest: "Fully Custom"` for the Custom room.

`ConsultationModal` collects name, phone, email, interest, room, approximate space and
a message, then composes those lines into a WhatsApp message and calls
`openWhatsApp()` from `src/lib/whatsapp.ts` (`+880 1960-481983`, wa.me deep link),
followed by an elegant success state. There is **no backend persistence** — the number
lives in exactly one module, so changing it is a one-line edit.

`useConsultation()` degrades to a no-op object outside the provider so hot reloads
never crash the page. `useI18n()` and `useMood()` do the same.

---

## 6. AI concierge "Rahi"

**Client** — `components/site/concierge.tsx` uses `@ai-sdk/react` against `/api/chat`,
renders with `ai-elements/*` (conversation, message, prompt-input, shimmer). Behaviour:
one automatic retry, a "Reconnecting…" state, a manual "Try again" control, and only
after retry failure the fallback message offering the phone number and the consultation
modal. It also contains a collapsible **materials enquiry form** (material, topic, room
detail) which composes a chat message for the visitor.

**Server** — `src/routes/api/chat.ts` is a TanStack server route:
`resolveChatProvider()` → 503 with a clear config error if unset → validate body →
`streamText({ model, system: SYSTEM, messages: await convertToModelMessages(messages), maxRetries: 3 })`
→ `toUIMessageStreamResponse()`.

The `SYSTEM` prompt encodes brand facts, materials with real specs, process, milestones,
timelines, contact details, tone rules and the instruction to answer in the visitor's
language (EN/BN/ES/HI). **Treat it as content, not boilerplate — do not rewrite it.**

**Provider** — `src/lib/ai-gateway.server.ts`:

```ts
process.env["GEMINI_API_KEY"]           // required, server-only
process.env["GEMINI_MODEL"]             // optional, defaults to "gemini-3.6-flash"
```

Rules: never a `VITE_` variable, never hardcoded, never called from the browser.
`.env.example` documents the key name with an empty value. Note `gemini-2.5-flash` is
refused for newly issued keys, hence the default above.

---

## 7. Design system

Tokens live in `src/styles.css` under `@theme inline` + `:root` / `.dark`, in OKLCH:

- Palette: `--ink` / `--ink-soft` (deep charcoal-teal), `--ivory`, `--brass`,
  `--brown`, `--tan`, plus the standard shadcn semantic set
  (`background`, `foreground`, `card`, `muted`, `accent`, `border`, `ring`, …).
- Radius: `--radius: 0.125rem` — near-square, architectural.
- Easing: `--ease-luxe: cubic-bezier(0.22, 1, 0.36, 1)` — used by every transition.
- Fonts: `--font-serif` Cormorant Garamond (headlines), `--font-sans` Jost (body/UI),
  each with Bengali + Devanagari Noto fallbacks so BN/HI never fall back to a
  mismatched face. Web fonts are loaded via `<link>` in `__root.tsx` — never
  `@import` a remote URL in `styles.css`.

**Never hardcode colour utilities** (`text-white`, `bg-[#…]`); always use tokens so
dark mood and theming hold.

### Light / dark "mood"
`ThemeProvider` stores the choice in `localStorage["hfm-mood"]`, toggles `.dark` on
`<html>` and sets `color-scheme`. It reads storage in `useEffect` so SSR markup stays
stable and hydration never mismatches.

---

## 8. Internationalisation

- Languages: English, বাংলা, Español, हिन्दी (`LANGUAGES` in `translations.ts`).
- Keys **are the English source strings**, so a missing entry falls back to English.
- `LanguageProvider` persists to `localStorage["hfm-lang"]` and sets
  `document.documentElement.lang`.
- Usage: `const t = useT(); … {t("See the craft in motion.")}`.
- Coverage includes body copy, selector labels, material specs, concierge fields, map
  labels, `aria-label`s and image `alt` text. SEO metadata and JSON-LD stay English by
  design.

To add copy: wrap it in `t("…")` and add the BN/ES/HI entries in `translations.ts`.

---

## 9. Assets

- `src/assets/real/photos.ts` — registry of the authentic supplied brand photography
  (living/bedroom/dining/office pieces, awards, logo mark). Prefer these over anything
  generic.
- `src/assets/space/space-options.ts` — `ROOMS`, `STYLES`, `SCALES` typed as
  `Option[] = { id, note, img }`, with ES6 image imports (rooms 1024×1280,
  styles/scales 1024×1024).
- `src/assets/materials/`, `src/assets/process/`, `before.jpg` / `after.jpg` for the
  bespoke slider.
- Conventions: ES6 imports (not string paths), `loading="lazy"` everywhere except the
  hero/LCP image, always explicit `width`/`height` to avoid layout shift,
  `object-cover` in cards, `object-contain` for portrait assets in fixed frames.

---

## 10. SEO, accessibility, performance

- Route-level `head()` in `index.tsx`: unique title (<60 chars), description (<160),
  `og:title`/`og:description`, `og:type`, `twitter:card`. `__root.tsx` carries fonts,
  favicon and LocalBusiness JSON-LD.
- Semantic landmarks (`<main>`, `<section aria-label>`, `<fieldset>`/`<legend>` in the
  selector), visible focus states, accessible modal, alt text on every image, and
  reduced-motion handling in CSS.
- Performance: no animation library in the critical path (IntersectionObserver +
  CSS), 3D scene lazy + client-only, YouTube embedded only after click, images lazy
  and sized.

---

## 11. Working on this project

1. `npm i` then `npm run dev` → http://localhost:8080.
2. Typecheck with `tsgo --noEmit` (or `npx tsgo --noEmit`); lint with `npm run lint`;
   format with `npm run format`.
3. Add UI to `src/components/site/` and render it from `src/routes/index.tsx`.
4. Any new visible string needs a `t()` call plus BN/ES/HI entries.
5. Keep server secrets in `process.env` inside handlers only.

### Deployment
Standard TanStack Start build (`npm run build`) — no custom server. Set
`GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) in the host's environment variables
and redeploy; everything else is static/SSR. On Lovable, publish via **Publish → Update**.

### Guardrails
- One page only — no new routes, no cart, no fake pricing, reviews or statistics.
- Do not invent testimonials, branches or awards; only the supplied authentic facts.
- Do not alter the Rahi system prompt or the WhatsApp number outside `whatsapp.ts`.
- No `react-router-dom`, no `src/pages`, no editing `routeTree.gen.ts`.
- Restraint over spectacle: quiet luxury, negative space, minimal line icons.
