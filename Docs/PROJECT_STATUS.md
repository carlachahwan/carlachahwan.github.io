# Portfolio Site — Project Status

**Owner:** Carla Chahwan — Strategic UX Architect
**Environment:** Figma Make (React + TypeScript, Vite, Tailwind, lucide-react)
**Last updated:** 15 July 2026

---

## 0.000000 Logo Cleanup + Interactive Case Studies — 16 July 2026

**Client logos — white backgrounds removed.** Azadea, SALIC, Knowledge Group and Quick Pay had opaque white/off-white backgrounds baked into their image (Knowledge Group was even a JPG), so on their cream tiles they showed as mismatched patches. Fixed with a PIL script (`Pillow` installed): keyed near-white → transparent (soft alpha ramp, d≤10 transparent → d≥40 opaque), re-encoded as transparent PNG, re-embedded as base64 in `clientLogoData.tsx`. All four are dark/coloured art on white, so keying was safe (no white *in* the art). Verified: art intact, no halos, blends into the cream tile.

**Case studies made interactive (not shorter).** Per Carla: don't reduce the information — the Super App is just too long to read as a wall of text; make it interactive and less boring while keeping the essence. Visuals kept, text presented progressively.
- **Super App → accordion.** The 6 chapters are now collapsible cards (`Chapter` component replaces `SectionHeader`). Collapsed shows number + title + one-line takeaway (the essence) + chevron; expanded reveals the full narrative + chapter visual. Smooth height via the `grid-template-rows: 0fr→1fr` trick (no JS measurement). Chapter 1 open by default; an "Expand all / Collapse all" toolbar sits above. All content and the animated arrows preserved. Verified: 6 accordion items, toggle + expand-all working.
- **All case-study & project visuals → click-to-zoom.** New `Zoomable.tsx` wraps any screen/diagram (image *or* rendered mockup): click (or Enter) opens a dimmed full-screen overlay with the content enlarged + caption; close via button, backdrop click, or Esc; body scroll locked while open; hover shows a maximise affordance. Wired into `CaseStudyPage` (architecture diagram + screens) and `ProjectDetailPage` (all galleries). Verified open/close + scroll-restore.

---

## 0.00000 Typography, Vibrant Accents & 20% Content Trim — 16 July 2026

**Typefaces → Roboto + Inter** (Fraunces dropped entirely; 0 references remain).
- **Roboto** = headings/titles/display. **Inter** = body, buttons, tags, labels, captions.
- `playbook.tsx` gained `display` / `body` keys; **`serif` / `sans` kept as back-compat aliases** now pointing at Roboto/Inter, so no mass call-site rename was needed.
- ⚠️ Note: this intentionally **breaks the visual match to the UX Audit Playbook presentation** (which uses Fraunces serif) — done on explicit request.

**Vibrant accents added** alongside the warm base — used as *meaning*, not decoration:
- New tokens: `mint #4AE5BD`, `cyan #22D3EE`, `violet #A78BFA`, plus `stone`/`gold` promoted into `T`. New `glow(color, strength)` helper.
- Core Expertise pillars now carry four distinct accents (amber → cyan → mint → gold) with a matching hover glow.
- **Mint = positive/outcome states**: availability badge, form success, and the Impact/Outcome markers + card borders on every detail page. Amber remains the primary action colour.

**All font sizes +2px.** Swept 12 site-chrome files (numeric `fontSize`, quoted `px`, and `clamp()` min/max). e.g. hero `clamp(48→50px, 8vw, 96→98px)`, body 17→19, nav 13→15.
- **Deliberately EXCLUDED the 5 mockup files** (`One2BuyMockups`, `WireframeMockups`, `TotersMockups`, `BaguetteMockups`, `HRResearchMockups`). They use 4–18px fonts to simulate scaled-down UI; +2px on a 4px label is +50% and would destroy the recreations. Site chrome runs 10–40px, so the two sets are cleanly separable.

**Case studies trimmed ~20%** (measured, not eyeballed) — every stat, tool name and proper noun preserved; only connective padding cut:
- SuperApp narrative (12 `<Body>` blocks): **681 → 568 words (17%)**
- `caseStudyData` overview/challenge/strategy/techAlignment (13 blocks): **608 → 499 words (18%)**

---

## 0.0000 Screens, Next-Project & Tab-Aware Back — 16 July 2026

**Screens added for the 4 projects that had empty galleries.** None of them shipped image exports — the sources are Figma "copy-as-code" — so the screens are **rendered components**, not pictures. `Shot` type extended: `{ caption, src? , element? }` — `src` for real captures (OctoThink/Azadea), `element` for recreated mockups. `ProjectDetailPage` renders either (elements get a white padded frame).
- **One2Buy** → reused the pre-existing but **previously unused** `One2BuyMockups.tsx` (Onboarding / Login / Product Detail).
- **Quick Pay, KSC, WASM** → new `WireframeMockups.tsx`, drawn as **true low-fidelity wireframes** (blueprint greys, amber reserved for the one thing that matters per screen). Deliberate: these *are* wireframe projects, so a blueprint treatment is the honest representation — structure, not visual design. All labels/steps/priorities taken from the actual sources. 9 screens: Quick Pay (landing + rate converter / NAFATH 3-step / services), KSC (home / news index + filters + newsletter / article + related), WASM (Nafath sign-in + waiting state / document queue with priorities / iPad page-by-page signing).

**"Next in {category}" prompt** — new `NextProject.tsx`, shown on **every** detail page (ProjectDetailPage, CaseStudyPage, SuperAppCaseStudy) directly above the Let's Collaborate callout. Suggests the next project in the same tab category and **wraps around** at the end.

**Tab-aware "Back to Projects"** — new `projectRegistry.ts` is the single source of truth for every project's `pageId → category`, ordering, and teaser copy. It drives both the next-project prompt and back-navigation. `App` keeps a `projectsTab` state and derives the tab from *the page being left*, so **no `onNavigate` signature change was needed anywhere**. `ProjectsPage` takes an optional `initialTab`.
- Verified: KSC → Back to Projects → lands on **Wireframe**; One2Buy → Back → lands on **Mobile App Design Logic**.

**Contact banner copy** → "Book a meeting or send a message — whichever suits you."

---

## 0.000 Copy Review + WASM + Logo Fix — 16 July 2026

**Copy review — Carla's verdicts on the drafted strategy copy** (all 5 reviewed together):
- **OctoThink** — approved, with one correction: the Wireframe → Old UI → New UI galleries are **not** a before/after redesign, they show **the app's progression over the years**. Copy + gallery labels reworded accordingly ("The app in its earlier years" / "The app today"); the "old UI buried progress" framing was removed.
- **One2Buy** — flag confirmed: "every user is a potential merchant" is correct.
- **Azadea** — confirmed: the Mobile/Web screenshots are the **post-audit redesign**. Gallery labels/captions now say so explicitly.
- **Quick Pay** — confirmed: the audience *is* expatriate workers.
- **KSC** — confirmed correct as drafted.

**WASM** — files arrived (`WASM Mobile Wireframe.rtf`, `WASM IPAD Wireframe.rtf`, both Figma code dumps). Added as the third Wireframe project (`p-wasm`). It's an **enterprise document-signing platform for KSA**: Nafath auth against Qiwa registration, multi-organisation, Pending/Completed queues with filtering, priority levels (Instant/Normal/Urgent/Very Urgent), page-by-page signature, reject-with-comment (500 char cap), Actions History, mobile + iPad layouts. No screens shipped (source is code, not images) — galleries empty.

**Client logos — fixed.** Root cause: the 16 logos are a mix of **8 PNG + 7 SVG** with inconsistent baked-in backgrounds (some transparent, some white, some dark), so on the dark bg they read as mismatched white boxes and dark marks vanished. Fix: each logo now sits in a **uniform cream (`#F4F1EA`) tile** (208×104, rounded, subtle hover lift). Neutralises the mixed backgrounds, keeps real brand colours, guarantees dark marks stay legible. Logos sized up (~52px → up to 62px); marquee eased 45s → 55s since tiles are wider.

**CalloutBanner** — the filled amber hex wedge behind the CTA was removed per request; only the faint hex outline remains.

---

## 0.00 Work Expansion — 16 July 2026 (3 work strands, tabs, 5 new project pages)

**Homepage**
- Client logos reverted to **full colour** (the monochrome `brightness(0) invert(1)` filter was removed per request).
- "Featured Work" replaced by **three category cards** — Case Studies / Mobile App Design Logic / Wireframe — each with a bespoke SVG illustration (`WorkIllustrations.tsx`, playbook line-art + animated flow arrows on the Mobile card) and an "Explore the work" CTA → Projects. The old 4-project `featuredProjects` array was removed.

**Projects page** — now **tabbed** (`case-studies` default | `mobile` | `wireframe`), sticky tab bar under the nav. Every card CTA reads **"Check more details"** and routes to that project's detail page.

**New data + pages**
- `projectsData.tsx` — data for 5 new projects. `ProjectDetailPage.tsx` — generic detail template: Overview → **The Business Strategy** → animated arrow → *"…and how it became structure"* → galleries → **The Outcome** → CalloutBanner.
- Routes added to `App.tsx`: `p-octothink`, `p-one2buy`, `p-azadea`, `p-quickpay`, `p-ksc` (all treated as case-study pages, so nav/footer hide).

**Assets** — direct `src/imports/` image imports work (no base64 needed; the CV/photo already do this). Curated + downscaled subset in `src/imports/projects/` — **22MB of raw source → 1.3MB shipped** (OctoThink 4 wireframes / 4 old UI / 4 new UI; Azadea 4 mobile / 3 web) via `sips`.

**Source material discovered** (in `../` Dev Folder — parent of this project):
- `KSC Project.rtf`, `Quick Pay web:app.rtf`, `Azadea Webisite Audit.rtf`, `One 2 Buy - Project.txt` are **Figma "copy-as-code" JSX dumps, not written documents**. The Azadea one contains Carla's real audit findings (Problems + Recommendations for PLP/PDP/Checkout/Homepage/Header/Footer) — used verbatim-in-spirit in the Azadea page.
- ⚠️ **WASM** — no files existed at time of writing; Carla was adding them. The Wireframe tab currently ships **Quick Pay + KSC only**; add `p-wasm` when assets land.
- ⚠️ **COPY REVIEW NEEDED:** the `strategy` / `translation` narrative in `projectsData.tsx` was **drafted by Claude from the design sources** (descriptive, no invented metrics) and must be reviewed/reworded by Carla before going public. See the header comment in that file.

**Contact page** — banner compressed (one-line headline, padding cut) so the Book a Meeting / Send a Message tabs sit above the fold (~381px on a 720px viewport).

---

## 0.0 Design Refactor — 16 July 2026 (dark editorial "UX Audit Playbook" system)

Full visual refactor of the whole site to match the **UX Audit Playbook** presentation (its source repo lives at `./UX Audit Playbook Presentation/`). All prior wording kept intact — this was purely visual + added illustrations.

**Design system** — new `src/app/components/playbook.tsx` exports tokens (`T`) + primitives (`HexMark`, `BgHex`, `Eyebrow`, `Display`, `Hairline`, `hexPoints`).
- Palette: bg `#0E0F13`, card `#14151A`, soft `#1A1B21`, cream text `#F4F1EA`, sage `#8A9B8E`, dim `#696969`, amber accent `#E8963C`, hairline `#2A2C33`.
- Fonts: **Fraunces** (serif display, weight 300, italic accents) + **Inter** (body). `src/styles/fonts.css` updated; `index.html` body bg set to `#0E0F13`.
- Motifs: hexagons (filled-hex bullets, faint outlined corner bleeds with amber wedge), eyebrow labels, hairline dividers, ghost numerals.

**Refactored:** Navigation, Footer, HomePage, ClientLogos (logos now monochrome-cream via `brightness(0) invert(1)`), ProjectsPage, CalloutBanner, CaseStudyPage, ContactPage (Calendly themed via `background_color`/`text_color` params), and SuperAppCaseStudy.
- Accent unified to amber (per-project reds/greens/etc. dropped for the editorial monochrome look).
- App root + `index.html` body set dark to prevent white flashes.

**Super App — added illustrations/animation (only this project, per request):** new `AnimatedArrow` component (amber line that draws itself + arrowhead nudge, `arrow-draw`/`arrow-head` keyframes, respects `prefers-reduced-motion`) placed on every chapter takeaway; hex-bullet chapter markers; hero + section headers + pull quote converted to Fraunces italic. All six chapters' bespoke visuals recoloured to the dark palette. Other case studies already have imagery, so none added there.

**Contact tabs:** "Book a Meeting" (renamed from "Book a Call") is now the FIRST tab and the default; "Send a Message" second.

**Other:** LinkedIn URL updated site-wide to `linkedin.com/in/carla-chahwan-142b3595/`. CV replaced with the new 2.8MB PDF (same filename in `src/imports/`).

---

## 0. Earlier Session — 15 July 2026 (Homepage / Projects / Detail / Contact pass)

A round of structural + content changes across four page types. All verified live in the local Vite dev server (`npm run dev`, `localhost:5173`) — Node.js was installed on the machine this session to enable local preview.

**Homepage (`HomePage.tsx`)**
- Hero stats (9 Years / 15+ Products / 5 Countries) given wider horizontal spacing (`gap-x-20 sm:gap-x-28`).
- Featured Work descriptions trimmed to a single brief sentence each.

**Projects page (`ProjectsPage.tsx`)** — rewritten
- Removed the project-name anchor chips from the dark banner.
- Case studies now render as a homepage-style card **grid** (`1 → 2 → 4` cols) instead of the stacked two-column `CaseStudyTemplate` blocks, with shorter descriptions.
- Bottom section now uses the shared callout banner.

**New shared component (`CalloutBanner.tsx`)**
- Highlighted "Have a project in mind?" call-out (dark gradient + amber accent, "Start a Conversation" → contact). Reused on the Projects page and every detail page.

**Detail pages (`CaseStudyPage.tsx` for baguette/toters/hr, `SuperAppCaseStudy.tsx`)**
- Removed the sticky left chapter navigation (and mobile chapter toggle) entirely.
- Widened the reading column (780/860 → 1120px) to kill the large left/right whitespace.
- Each page titled by the project name.
- `CaseStudyPage.tsx` restructured to **The Vision → The Approach (Challenge + How I Helped) → A Look Inside (architecture diagram + screens / research boards) → The Impact**. Higher-level and more visual than the original deep-dive; the dense Tech-to-UX methodology block was dropped. Visuals were re-added per follow-up request (visitors want to see the screens, and for HR the market-research boards). `SuperAppCaseStudy.tsx` **keeps its full 6-chapter deep-dive** — confirmed as the flagship in-depth piece.
- Replaced the "Work with me" CTA with the shared `CalloutBanner`.

**Contact page (`ContactPage.tsx`)**
- The right-hand card is now a **two-tab panel**: **Send a Message** (the contact form) and **Book a Call** (the Calendly scheduler). Both tab buttons are always visible at the top of the card; only the active panel renders (keeps the ~700px Calendly calendar from cramping a side-by-side form). Active tab = solid dark pill; icons via `MessageSquare` / `CalendarClock`.
- Calendly embed (`CalendlyEmbed`, loads `assets.calendly.com/.../widget.js`) lives inside the "Book a Call" tab. Old standalone bottom Calendly section removed.
- `CALENDLY_URL` set to the live link **`calendly.com/chahwancarla1/30min`** ("30 Minute Meeting"). Verified the booking page renders (Carla Chahwan · Select a Date & Time · Lebanon timezone).

---

## 1. Scope of Work

Two workstreams have run in parallel:

1. **Qatar Super App case study** — forensic audit of the case study page against six high-fidelity research artifacts (Miro-style boards), followed by a full rebuild to restore content parity with the source research.
2. **Homepage / global UI refresh** — a set of five structural and visual changes across the header, hero, homepage body, and footer.

---

## 2. Completed

### 2.1 Super App Case Study (`SuperAppCaseStudy.tsx`) — ✅ Delivered

Audited against all six artifact boards and rewritten. Restored content that the previous implementation had omitted or flattened:

| Area | Change |
|---|---|
| Chapter 1 | Rebuilt as the artifact's two boards: 5 market findings + 3 opportunity-sizing cards, each carrying its **UX Implication** footer (the finding → implication chain was previously lost) |
| Chapter 2 | Added the **indirect competitor tier** (banking, government/Hukoomi, telecom self-care, international platforms) and a **feature-coverage matrix** with highlighted white-space rows |
| Chapter 3 | Added missing 3× retention stat; replaced fabricated user "quotes" with the board's synthesized behavioral drivers; restored the **For the Business / For UX & Product** split |
| Chapter 4 | Added the four benchmark platforms (WeChat, Grab, Careem, Rappi) ahead of the extracted patterns |
| Chapter 5 | Added the **Phase 1 → 3 build sequence** (local marketplace correctly deferred to Phase 3) |
| Chapter 6 | Added positioning territory statement + brand personality attributes |
| Code health | Renamed mislabeled colour constants (`TEAL`/`BLUE` were reds → `ACCENT`/`ACCENT_DEEP`); replaced hardcoded `repeat(3, 1fr)` grids with responsive `auto-fit`; added `aria-current` / `aria-expanded` |

### 2.2 Projects Page (`ProjectsPage.tsx`) — ✅ Delivered

- Removed the **"More Projects"** section entirely.
- Cleaned up the fallout: deleted the `moreProjects` data array, the unused `ExternalLink` import, and the dead `#more` anchor chip in the header nav.

### 2.3 Homepage Refresh — ✅ Delivered (5 of 5 notes)

| # | Note | Status |
|---|---|---|
| 1 | LinkedIn logo in header next to "Download CV" | ✅ Icon button added (desktop + mobile menu), opens in new tab, `aria-label` present, URL held in a `LINKEDIN_URL` constant |
| 2 | Remove "3 Industries Mastered" from banner | ✅ Hero stats now read 9 Years / 15+ Products / 5 Countries |
| 3 | Client logos between banner and Core Expertise | ✅ New `ClientLogos` section with all 15 client logos |
| 4 | Four case studies side by side | ✅ Grid is now `1 → 2 → 4` columns (mobile → tablet → desktop); cards restructured vertically with CTAs bottom-aligned via `mt-auto` |
| 5 | Remove "Navigation" + "Connect" footer columns | ✅ Footer reduced to the copyright bar only |

### 2.4 Client Logos Component — ✅ Delivered

Went through three iterations to solve environment constraints:

1. Asset imports from `src/assets/` → failed (wrong path for this project).
2. `public/` URL paths → not viable; Figma Make exposes no `public/` directory.
3. **Final:** all 15 logos **base64-embedded** in `clientLogoData.ts` (~400KB, rasters downscaled to 3× display size). Zero external assets — works inside the sandbox.

**Final treatment (per latest request):**
- Single row, **auto-scrolling marquee** (seamless infinite loop via duplicated track sliding to `-50%`).
- Logos at **52px** tall, **full colour**, grayscale + hover-reveal removed.
- Speed controlled by the `SCROLL_SECONDS` constant (currently 45s/cycle).
- Soft white fade masks on both edges; `prefers-reduced-motion` disables the animation; duplicate logos are `aria-hidden`.

### 2.5 Footer — ✅ Delivered

- Navigation and Connect columns removed.
- Profile photo, name, and tagline block removed.
- Copyright bar retained, **year updated 2024 → 2026**; padding tightened.
- `onNavigate` prop kept (unused) so `App.tsx` compiles without modification.

---

## 3. Current File Inventory

All files live in `src/app/components/`:

| File | State |
|---|---|
| `ClientLogos.tsx` | New — marquee layout |
| `clientLogoData.ts` | New — base64 logo data (do not hand-edit) |
| `HomePage.tsx` | Updated |
| `Navigation.tsx` | Updated |
| `Footer.tsx` | Updated |
| `ProjectsPage.tsx` | Updated |
| `SuperAppCaseStudy.tsx` | Updated |
| `App.tsx` | Unchanged (no edits required) |

**Cleanup pending:** delete the leftover `clients/` folder in `src/imports/` if it hasn't been removed — it is now unreferenced.

---

## 4. Remaining Tasks

### 4.1 Verification (quick)
- [ ] Confirm all 15 logos render at full colour in the marquee across breakpoints.
- [ ] Confirm LinkedIn URL (`linkedin.com/in/carla-chahwan`) is correct — it was inherited from the old footer, not independently verified.
- [ ] Mobile QA on the 4-across case study grid (should collapse to 2×2, then stacked).
- [ ] Confirm `src/imports/clients/` has been deleted.

### 4.2 Open Design Decisions
- [ ] **Case study card density** — at four-across, the 40–60 word descriptions make the cards tall and text-heavy. Trimming each to ~25 words was offered and not yet actioned.
- [ ] **Marquee pause-on-hover** — currently the strip scrolls continuously and cannot be paused. A two-line addition if wanted.
- [ ] **Marquee speed** — 45s/cycle is a starting point; tune `SCROLL_SECONDS` to taste.

### 4.3 Content Accuracy (flagged, unresolved)
- [ ] **Super App case study — verify paraphrased content.** Competitor strengths/gaps, benchmark lessons, the Rafeeq niche wording, and the positioning statement were transcribed from the artifact images. A few sticky-level details are tightened paraphrases and should be checked against the original boards before the site goes public.

### 4.4 Not Yet Started
- [ ] `ContactPage.tsx` — never reviewed or touched in this engagement.
- [ ] Other case study pages (`CaseStudyPage.tsx`, `CaseStudyTemplate.tsx`, Baguette / Toters / HR Research) — not audited for the same content-parity or responsiveness issues found in the Super App page. **A similar audit is likely warranted.**
- [ ] Performance pass — the 400KB base64 logo payload is acceptable but is the single largest asset in the bundle. If the site is later exported out of Figma Make into a normal build, moving the logos back to real files in `public/` would be the cleaner long-term solution.
- [ ] Accessibility sweep across pages not yet covered (contrast, focus states, keyboard nav).
