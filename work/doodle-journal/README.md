# Handoff: Doodle Journal — archive section

## Overview
A single-page portfolio section for a personal side project, **Doodle Journal** — a 20-year
journal/drawing practice (1998–2026). The page is intentionally quiet and archival: a hero
intro at the top, followed by a vertical **timeline** of six "eras," each with a large year
label, a short caption, and one or more photographed notebook-spread images. A **table of
contents** lets the reader jump between eras. The tone target is "opening a drawer, not
walking into a gallery." The visual language matches an existing portfolio
(chiaspeaking.com): warm neutral palette, Source Serif 4 + Source Sans 3.

## About the Design Files
The file in this bundle (`Doodle Journal v1 - Archive.html`) is a **design reference created
in HTML/CSS/JS** — a working prototype that shows the intended look and behavior. It is **not
production code to ship directly**. The task is to **recreate this design in the target
codebase's environment** using its established patterns (React/Vue/Astro/plain static site,
etc.). If no codebase exists yet, this is a static, no-build, single-page site — a plain
static host (GitHub Pages) or a light framework (Astro/Eleventy) are all appropriate; pick
whatever is simplest to deploy. The prototype is self-contained (one HTML file, embedded CSS,
~70 lines of vanilla JS, Google Fonts via CDN) and could even be deployed close to as-is,
but the intent is a clean recreation with real content swapped in.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all
specified below and present in the file. Recreate pixel-for-pixel. The only placeholders are
**copy** (intro + captions are dummy text) and **images** (notebook spreads are striped CSS
placeholders) — these are meant to be replaced with the owner's real text and photos.

---

## Screens / Views
Single scrolling page. Top-to-bottom regions:

### 1. Top nav (sticky)
- **Purpose:** wayfinding back to the main portfolio index.
- **Layout:** `position: sticky; top: 0`, full width, flex space-between, baseline-aligned,
  padding `1.1rem 2.5rem`, `z-index: 60`. Background `color-mix(in srgb, #f4f1ea 90%, transparent)`
  with `backdrop-filter: blur(10px)`. Bottom hairline (`1px solid #d8d2c4`) **only after the
  page is scrolled > 8px** (`.scrolled` class toggled by JS).
- **Components:**
  - Left: logo link "Yun-Chia Lin" — Source Sans 3, 0.95rem, weight 500, letter-spacing 0.01em.
  - Center: "Doodle Journal" — Source Serif 4 *italic*, 0.95rem, color `#4a463f`.
  - Right: "Index ↗" — Source Sans 3, 0.72rem, weight 500, uppercase, letter-spacing 0.14em,
    color `#8a857b` → `#1a1814` on hover.

### 2. Hero / intro
- **Purpose:** set the tone; state what the archive is.
- **Layout:** centered column, `max-width: 820px`, padding `8rem 2.5rem 5rem`.
- **Components (top to bottom):**
  - **Eyebrow** ("Side project — A personal archive"): 0.72rem, uppercase, letter-spacing
    0.2em, weight 500, color `#8a857b`, with a `1px` rule (`#d8d2c4`) filling the row to the right.
  - **Title** ("Doodle *Journal*"): Source Serif 4, weight 300, `clamp(3rem, 7vw, 5.6rem)`,
    line-height 1.0, letter-spacing -0.02em. The word "Journal" is `<em>` — italic, color
    `#b85b3c` (accent).
  - **Dek** ("Twenty years of looking at the world, and writing it down in pictures."):
    Source Serif 4 *italic*, weight 300, `clamp(1.15rem, 1.8vw, 1.5rem)`, color `#4a463f`,
    max-width 30ch.
  - **Intro paragraph** (placeholder): Source Serif 4, weight 300, 1.18rem, line-height 1.75,
    color `#1a1814`, max-width 54ch. Inline `<em>` is italic, color `#4a463f`.
  - **Meta row:** 3 columns, `gap: 3.5rem`, top border `1px solid #d8d2c4`, padding-top 1.75rem.
    Each item: small uppercase label (0.68rem, letter-spacing 0.16em, color `#8a857b`) above a
    Source Serif 4 value (1rem, color `#1a1814`). Values: "1998" / "Twenty years" /
    "Ink · pencil · ballpoint".

### 3. Timeline ("eras")
- **Purpose:** the archive itself — one stop per era.
- **Layout:** centered column `max-width: 760px`, padding `0 2.5rem 6rem`. Inside, the eras
  list has `padding-left: 2.75rem` and a **vertical spine**: a `1px` line (`#d8d2c4`) at
  `left: 5px`, running from `top: 0.7rem` to `bottom: 2rem` (`.eras::before`).
- **Each era** (`<section class="era">`, anchor ids `y1998 y2003 y2006 y2008 y2010s y2024`):
  - **Node dot** on the spine (`.era::before`): 11×11px circle, background `#f4f1ea`, border
    `1px solid #8a857b`, at `left: calc(-2.75rem + 1px); top: 0.7rem`. When the era has been
    reached (`.seen`, set by scroll observer) the dot fills accent `#b85b3c`.
  - **Head:** large **year** — Source Serif 4, weight 300, `clamp(2.6rem, 5vw, 4rem)`,
    line-height 0.95, letter-spacing -0.02em — followed (baseline-aligned, gap 1.1rem) by an
    italic **subtitle** — Source Serif 4 italic, `clamp(1.05rem, 1.6vw, 1.3rem)`, color
    `#4a463f`. Any Chinese term inside the subtitle uses `<span class="cn">` (non-italic, color
    `#8a857b`), e.g. 联络簿.
  - **Caption:** Source Serif 4, weight 300, 1.1rem, line-height 1.65, color `#4a463f`,
    max-width 52ch. (Placeholder; replace with real note. The `.ph` span just styles dummy
    text italic/muted.)
  - **Media:** see "Notebook spread + thumbnails" below.
- **The six eras:**
  | id | Year label | Subtitle | # images |
  |----|-----------|----------|----------|
  | y1998 | 1998 | The beginning | 1 |
  | y2003 | 2003 | School notebooks 联络簿 | 2 |
  | y2006 | 2006 | Travel journals | 2 |
  | y2008 | 2008 | High school | 1 |
  | y2010s | 2010s | A quiet middle stretch | 1 |
  | y2024 | 2024–2026 | Still going | 2 |

### 4. Notebook spread + thumbnails (per era)
- **Main spread** (`figure.spread > .spread__frame`): landscape `aspect-ratio: 16/9`,
  background `#faf7ef`, border `1px solid #d8d2c4`, radius 2px, shadow
  `0 12px 28px -22px rgba(40,32,20,0.5)`. Decorations: faint ruled lines
  (`repeating-linear-gradient(transparent 0 27px, #e3ddd0 27px 28px)` at 0.55 opacity) and a
  centered **gutter** (a soft 34px-wide darkening gradient + a 1px center line) to read like an
  open notebook. A mono label sits bottom-left (`.spread__label`, 0.62rem, uppercase,
  letter-spacing 0.1em, color `#8a857b`). A `<figcaption>` below in mono 0.66rem `#8a857b`.
  - **Image-ready:** each frame contains `<img class="spread__img" hidden>` positioned
    `absolute; inset:0; object-fit:cover; z-index:2`. Set its `src` to show a real photo.
- **Thumbnail strip** (`.era__thumbs`, only when an era has >1 image): flex row, gap 0.6rem,
  margin-top 0.9rem. Each thumb is an 86×(16/9) button, border `1px solid #d8d2c4`, radius 2px,
  `opacity: 0.6` → 1 on hover; the **active** thumb is `opacity:1` with `border-color:#b85b3c`
  and `box-shadow: 0 0 0 1px #b85b3c`. Contains a faint center gutter line and a mono number
  (`.thumb__n`, 0.52rem). Clicking a thumb makes it the "currently showed" large spread.

### 5. Footer
- Top border `1px solid #d8d2c4`. Inner: `max-width:1180px`, flex space-between, padding
  `2rem 2.5rem`. Left "© 2026 Yun-Chia Lin" and right "Doodle Journal · v1" — 0.72rem,
  uppercase, letter-spacing 0.12em, weight 500, color `#8a857b`. Center colophon "A drawer,
  not a gallery" — Source Serif 4 italic, 0.85rem, color `#4a463f`.

---

## Table of Contents — responsive, two forms
The TOC tracks the active era (highlights it in accent) and **only appears once the top of the
timeline scrolls into view** (a `rail-visible` class is toggled on `<body>` by an
IntersectionObserver watching `.eras`; both forms fade in/out with it).

- **Desktop (> 900px) — margin tick-rail** (`nav.toc-rail`): `position: fixed; left: 2.5rem;
  top: 50%; transform: translateY(-50%)`, vertical stack of 6 links. Each link = a short
  **tick mark** (18px×2px bar, `#8a857b`, opacity 0.55) + a **mono year label** that is hidden
  (opacity 0) by default and appears on rail hover (opacity 0.7) or for the active stop.
  Hover a link → mark grows to 30px and darkens. **Active** stop → mark grows to 34px and turns
  accent `#b85b3c`, label opacity 1 and accent-colored. Costs zero content width (lives in the
  page margin).
- **Mobile (≤ 900px) — floating button** (`.toc-jump`): the rail is `display:none`; instead a
  pill **"Contents"** button is `position: fixed; right: 1.1rem; bottom: 1.1rem` (dark `#1a1814`
  bg, `#f4f1ea` text, radius 100px, with a 3-bar icon). Tapping it opens a panel above it
  (`.toc-jump__panel`, paper card, radius 12px) listing each year (Source Serif 4 1.1rem) with
  its subtitle (0.72rem `#8a857b`). The active year shows accent. Panel closes on outside-tap or
  after choosing a year.

---

## Interactions & Behavior
- **Sticky-nav hairline:** add `.scrolled` to the nav when `window.scrollY > 8`.
- **Scroll reveal:** elements with `.reveal` start at `opacity:0; translateY(20px)` and
  transition to visible (0.7s ease) when they enter the viewport (IntersectionObserver,
  threshold 0.12, `rootMargin: 0px 0px -40px 0px`). Respect `prefers-reduced-motion: reduce`
  (content shown immediately, no transition). NOTE: the hero is intentionally **not** `.reveal`
  so the top of the page is never blank on first paint.
- **Active-era tracking (scroll-spy):** IntersectionObserver on each `.era`
  (`rootMargin: -30% 0px -55% 0px`). On intersect, mark the era `.seen` (fills its spine dot)
  and toggle `.active` on the matching TOC anchors (`.toc-rail a` and `.toc-jump a`) by
  comparing `href` to `#<era id>`.
- **TOC gating:** IntersectionObserver on `.eras` (`rootMargin: 0px 0px -12% 0px`) toggles
  `body.rail-visible`; both TOC forms are `opacity/visibility` gated on it.
- **Thumbnail gallery:** for each `[data-gallery]`, clicking a `.thumb` sets it `.is-active`,
  updates the main `.spread__label` text and `<figcaption>` from the thumb's `data-label` /
  `data-caption`, and if the thumb has `data-src`, swaps it into the main `<img class="spread__img">`
  (and sets the thumb's own background-image). Strip is hidden for single-image eras.
- **Smooth scrolling:** `html { scroll-behavior: smooth }`; eras have
  `scroll-margin-top: calc(var(--bar) + 2rem)` so anchored jumps clear fixed chrome.
- **Anchor links:** all TOC links are in-page `#era-id` anchors — no JS required for basic jumps.

## State Management
Minimal; all UI state, no data fetching:
- `body.scrolled` (boolean) — nav hairline.
- `body.rail-visible` (boolean) — TOC visibility.
- per-era `.seen` (boolean) — spine dot fill, never removed once set.
- active era id — derived from scroll position, reflected as `.active` on TOC anchors.
- per-gallery active thumbnail index — reflected as `.is-active` and the main image/labels.
- `.toc-jump.open` (boolean, mobile) — jump panel open/closed.

## Design Tokens
```
Colors
  --bg          #f4f1ea   warm off-white (page)
  --bg-deep     #ece8df   one tone darker
  --paper       #faf7ef   notebook spreads
  --ink         #1a1814   near-black (warm)
  --ink-soft    #4a463f   secondary text
  --ink-muted   #8a857b   labels / muted
  --rule        #d8d2c4   hairlines / borders
  --rule-soft   #e3ddd0   faint ruled lines
  --accent      #b85b3c   muted terracotta / clay

Type
  --serif  'Source Serif 4', Georgia, serif        (display, captions, values)
  --sans   'Source Sans 3', system-ui, sans-serif  (UI, labels, body)
  --mono   ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace  (tags, spread labels)
  Base body: 16px / line-height 1.65 / weight 400.
  Google Fonts weights loaded: Source Sans 3 300/400/500/600; Source Serif 4 (incl. italic) 300/400/500/600.

Radii      2px (frames/thumbs), 10–12px (panels), 100px (pills)
Spine      1px line; node dot 11px
Shadows    spread: 0 12px 28px -22px rgba(40,32,20,0.5)
           panels: 0 18px 40px -18px rgba(40,32,20,0.5)
Breakpoint 900px (TOC + layout switch); 480px (hero meta reflow)
```

## Assets
- **Fonts:** Source Serif 4 + Source Sans 3 via Google Fonts CDN (`<link>` in `<head>`). In a
  real codebase, self-host or load through the project's font pipeline.
- **Images:** none yet. The notebook spreads are CSS placeholders. The owner will supply
  photographed physical-notebook spreads (landscape, shot ~16:9). Drop them in by setting
  `src` on each era's `.spread__img` and `data-src` on the matching thumbnails.
- **Icons:** the "↗" and "▾" are text glyphs; the mobile button icon is three CSS bars. No icon
  library needed.

## Files
- `Doodle Journal v1 - Archive.html` — the complete hifi prototype (HTML + embedded CSS +
  vanilla JS). Everything described above lives in this one file.

## Content still to replace (owner's real material)
1. Hero intro paragraph.
2. Each era's caption (6).
3. Real notebook-spread photos for every spread + thumbnail.
4. Footer year/credits if needed.
