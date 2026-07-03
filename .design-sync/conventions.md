# Scarlett Website — Design Conventions

## Theme and wrapping

No provider required. Components are self-contained. The dark "Void" theme is the default (`:root`). To switch to the light "Threshold" theme, add `data-theme="light"` on the closest container (or `<html>`). Dark is presumed unless overridden.

```jsx
// Dark (default — no attribute needed)
<Hero />

// Light
<div data-theme="light">
  <Contact />
</div>
```

**Reveal animation**: components that use the global `.reveal` class (About, Work, AskWidget) start at `opacity: 0` until `RevealObserver` adds `.reveal.in`. In new layouts, either mount `<RevealObserver />` at the page root, or add `.reveal { opacity: 1 }` to skip the animation.

## Styling idiom: CSS custom properties

This is a CSS-custom-property design system. Style with `var(--token)`, not utility classes.

**Color tokens** (defined on `:root`; `[data-theme="light"]` overrides):
| Token | Purpose |
|---|---|
| `--bg` | Page/canvas background |
| `--surface` | Elevated surface (cards, inputs) |
| `--surface-2` | Doubly elevated (bot messages, chips) |
| `--text` | Primary text |
| `--text-muted` | Secondary/meta text |
| `--accent` | Brand signal orange (#e8541a on dark) |
| `--accent-ink` | Accent as readable text |
| `--secondary` | Depth blue |
| `--border` | Subtle border (rgba) |

**Type tokens:**
| Token | Family |
|---|---|
| `--display` | Syne (headings) |
| `--body` | Inter (body text) |
| `--mono` | JetBrains Mono (eyebrows, labels) |

**Type scale:** `--step--1` through `--step-5` (modular ~1.25×, in `rem`).

**Spacing:** `--space-1` (0.25rem) through `--space-24` (6rem).

**Radius:** `--radius` (6px), `--radius-sm` (3px). **Content width:** `--content` (1080px).

## Global utility classes

These come from `styles.css` (loaded by every design):

- `.wrap` — max-width `var(--content)`, centered, `padding: 0 28px`
- `.eyebrow` — monospace, uppercase, letter-spaced, `var(--accent-ink)` color; used for section labels like "01 — WHO"
- `.sec-head` — section heading row: flex row with baseline alignment between `.eyebrow` and `<h2>`
- `.reveal` / `.reveal.in` — scroll-reveal: start `opacity: 0`, animate to `1` when `.in` is added

## Where the truth lives

- `styles.css` and `_ds_bundle.css` — all tokens, resets, and component CSS
- `components/<group>/<Name>/<Name>.prompt.md` — per-component API docs

## Idiomatic snippet

```jsx
// A new page section using this DS's layout and tokens
function MySection() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="sec-head reveal">
        <span className="eyebrow">04 — label</span>
        <h2 style={{ fontFamily: "var(--display)", fontWeight: 700 }}>
          Section heading
        </h2>
      </div>
      <p style={{ color: "var(--text-muted)", fontFamily: "var(--body)" }}>
        Body content here.
      </p>
    </section>
  );
}
```
