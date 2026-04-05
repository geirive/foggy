# Design System Document

## 1. Overview & Creative North Star: "The Ethereal Observer"

This design system is a departure from the rigid, grid-locked structures of modern web design. Its "Creative North Star" is **The Ethereal Observer**. Inspired by the quiet stillness of a fog-covered forest, the system prioritizes atmospheric depth, soft transitions, and a sense of calm discovery.

Instead of defining space with hard lines, we define it through light and density. We break the "template" look by using intentional asymmetry, organic roundedness, and high-contrast typography scales that feel more like a premium editorial magazine than a software dashboard. The goal is to make the user feel as though they are navigating through a misty landscape where elements emerge naturally from the background.

---

## 2. Colors

The palette is rooted in nature's muted spectrum—deep forest greens, cool slate blues, and soft, misty greys.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to create a subtle change in "fog density" rather than a hard structural break.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Base:** `surface` (#f7faf7) for the widest areas.
- **Secondary Areas:** `surface-container` (#ecefeb) or `surface-container-high` (#e6e9e6) for grouping content.
- **Deepest Inset:** `surface-dim` (#d8dbd8) for footer or utility areas to ground the experience.

### The "Glass & Gradient" Rule
To simulate the atmospheric quality of tåke (fog), use **Glassmorphism**. Floating elements (modals, dropdowns, navigation bars) should use semi-transparent surface colors with a `backdrop-blur` effect (suggested 12px–20px blur). 

### Signature Textures
Avoid flat primary colors for large areas. Use subtle linear gradients, transitioning from `primary` (#173838) to `primary_container` (#2f4f4f) at a 135-degree angle. This adds "soul" and professional depth to main CTAs and hero sections.

---

## 3. Typography

The typography strategy pairs the intellectual authority of a serif with the modern clarity of a geometric sans-serif.

- **Display & Headline (Noto Serif):** Used for large, airy titles. These should have generous letter-spacing (tracking) and often use sentence case to feel more approachable and poetic.
- **Body & Labels (Manrope):** A clean, high-legibility sans-serif. Use the lighter weights (300/400) for body copy to maintain the "ethereal" feel, ensuring that the visual weight remains light even in dense information blocks.

The contrast between the elegant `display-lg` (3.5rem) and the functional `body-md` (0.875rem) creates a sophisticated editorial hierarchy that guides the eye with intentionality.

---

## 4. Elevation & Depth

Hierarchy is achieved through **Tonal Layering** rather than traditional drop shadows.

- **The Layering Principle:** Stack `surface-container` tiers. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f1f4f1) background. This creates a soft, natural lift that mimics fine paper or layered mist.
- **Ambient Shadows:** When a "floating" effect is mandatory, shadows must be extra-diffused. Use a blur of 32px or higher with an opacity of 4%–6%. The shadow color should be a tinted version of `on-surface` (#181c1b), never pure black.
- **The "Ghost Border" Fallback:** If accessibility requires a container definition, use a "Ghost Border." Apply the `outline-variant` token at **15% opacity**. 100% opaque borders are forbidden.
- **Depth through Blur:** Use the transparency of glass elements to allow the background forest-inspired tones to bleed through, making the layout feel integrated into an environment rather than "pasted on."

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `xl` roundedness (3rem). No border.
- **Secondary:** `surface-container-highest` background with `on-surface` text. Subtle and grounded.
- **Tertiary:** Text-only with an underline that appears on hover, utilizing the "ghost border" logic.

### Cards & Lists
**Forbid the use of divider lines.** Use vertical white space from the spacing scale (e.g., `8` or `10` units) to separate items. For lists, use a alternating background shift (`surface` to `surface-container-low`) for row distinction. Cards should use `lg` (2rem) roundedness to feel soft and organic.

### Chips
Small, pill-shaped elements using `surface-container-highest`. They should feel like smooth stones. Use `label-md` for the typography.

### Input Fields
Soft, `md` (1.5rem) rounded containers with a `surface-container-low` background. On focus, the background transitions to `surface-container-highest` with a subtle 1px "Ghost Border" of `primary` at 20% opacity.

### Atmospheric Elements (Custom)
- **Misty Overlays:** Use radial gradients that fade from `surface` at 0% to 0% opacity at 70% to "feather" the edges of images or large sections, simulating a disappearing treeline in fog.

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical layouts. Let an image bleed off one side of the screen while text sits in generous white space on the other.
- **Do** use the `xl` (3rem) roundedness for large containers to maintain a "soft edge" philosophy.
- **Do** prioritize readability by ensuring `on-surface` text has high contrast against the misty background.
- **Do** lean into the Spacing Scale’s larger values (`16`, `20`, `24`) to create "breathing room" that evokes a sense of peace.

### Don't:
- **Don't** use 1px solid black or grey borders. They break the atmospheric immersion.
- **Don't** use aggressive, fast animations. Transitions should be slow and fluid (e.g., 400ms-600ms ease-out).
- **Don't** crowd the interface. If a screen feels "busy," increase the padding using the `10` (3.5rem) or `12` (4rem) tokens.
- **Don't** use standard "drop shadows" with high opacity. They make the design feel "heavy" and dated.