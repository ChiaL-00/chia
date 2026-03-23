# CSS Architecture Conventions

## Layer order

Every page loads CSS in this exact order:

```html
<link rel="stylesheet" href="../../assets/css/style.css">       <!-- 1. Global base -->
<link rel="stylesheet" href="../../assets/css/case-study.css">  <!-- 2. Case study components -->
<link rel="stylesheet" href="[project-name].css">               <!-- 3. Project-specific overrides -->
```

## What goes where

### `assets/css/style.css` — site-wide base
- CSS custom properties (`:root` tokens: colors, fonts, spacing)
- Reset / base element styles
- Nav, footer, shared layout utilities (`.container`, `.section`, `.section-sm`)
- Shared typography classes (`.section-title`, `.body-text`, `.divider`)
- Reveal animation (`.reveal`, `.reveal-delay-*`)
- Project navigation (`.project-nav`)

### `assets/css/case-study.css` — shared case study components
- All `cs-` prefixed component classes
- Hero, persona, pain grid, strategy, design principles, before/after panels
- Field quotes timeline, testimonial, outcomes, media grid
- Section variant modifiers (`.cs-section--dark`, `.cs-section--white`)
- Text utilities (`.cs-text-on-dark`, `.cs-text-white`, `.cs-strong-white`)
- Responsive overrides for all `cs-` components

### `work/[project]/[project].css` — project-specific styles
- One-off layout classes unique to this case study
- Project-specific image containers or grid overrides
- Any animation setup that only applies to this page
- Prefix all classes with the project name (e.g. `driver-` for driver app)

## Rules

1. **Always check `style.css` and `case-study.css` before writing new CSS.** If a class already exists, use it.

2. **If a pattern appears in more than one case study, move it to `case-study.css`.** Don't duplicate across project files.

3. **Project-specific one-off styles go in the local CSS file only.** Never put project-specific styles in the global files.

4. **All `cs-` classes are reserved for `case-study.css`.** Project files use a project-name prefix (e.g. `driver-`, `brand-`, `product-`).

5. **No inline `style=""` for anything that could be a class.** Inline styles are only acceptable for JS-driven dynamic values (e.g. scroll-animated backgrounds, calculated gradients).

6. **Design tokens live in `style.css` `:root` only.** Never hard-code `#1a1a18` or `#F5D125` — always use `var(--dark)`, `var(--yellow)` etc.

## Current tokens (style.css `:root`)

| Token                  | Value     | Usage                              |
|------------------------|-----------|------------------------------------|
| `--yellow`             | `#F5D125` | Primary accent, tags, dividers     |
| `--yellow-muted`       | `#fdf3a3` | Soft yellow backgrounds            |
| `--dark`               | `#1a1a18` | Dark backgrounds, primary text     |
| `--dark-surface`       | `#212119` | Elevated surface on dark bg        |
| `--dark-surface-hover` | `#252521` | Hover state for dark surface       |
| `--text-on-dark`       | `#a8a8a4` | Accessible body text on dark bg    |
| `--mid`                | `#4a4a44` | Secondary text, labels             |
| `--light`              | `#f7f6f2` | Page background, light sections    |
| `--white`              | `#ffffff` | Cards, panels, white sections      |
| `--serif`              | Playfair Display | Headings, titles, quotes    |
| `--sans`               | DM Sans   | Body text, labels, UI              |

## Component reference

See `/COMPONENTS.md` for every reusable `cs-` class with HTML examples.
