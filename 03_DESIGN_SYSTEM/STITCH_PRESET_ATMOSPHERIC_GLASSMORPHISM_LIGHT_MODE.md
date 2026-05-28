---
name: Atmospheric Glassmorphism
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#1E293B'
  on-primary: '#ffffff'
  primary-container: '#CCFBF1'
  on-primary-container: '#1E293B'
  inverse-primary: '#bec6e0'
  secondary: '#2DD4BF'
  on-secondary: '#0F172A'
  secondary-container: '#DDFCF5'
  on-secondary-container: '#334155'
  tertiary: '#818CF8'
  on-tertiary: '#1E293B'
  tertiary-container: '#EDEBFF'
  on-tertiary-container: '#334155'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is centered around **Atmospheric Glassmorphism**, an aesthetic that prioritizes ethereal light, depth, and organic continuity. It is designed to evoke a sense of "Early Morning Clarity"—a state of calm, premium focus that feels both technologically advanced and naturally grounded.

The target audience consists of high-end professionals and creative enthusiasts who value tactile digital experiences. The UI should feel like a physical layer of frosted crystal suspended over a shifting, luminous environment. Key pillars include:
- **Luminosity:** Elements should appear to emit or refract light.
- **Translucency:** Depth is communicated through varying levels of frosted transparency rather than traditional shadows.
- **Organic Movement:** Backgrounds are not static; they are slow-moving, multi-colored gradients that mimic natural light cycles.

## Colors

The palette is anchored in a soft relationship between a multi-tonal atmospheric background, misty glass surfaces, and restrained slate typography.

- **Environment:** The background is a fluid, three-point radial gradient using **White**, **Pale Mint**, and **Soft Blue**. This creates an "early morning" glow that shifts subtly during interaction.
- **Glass Surfaces:** Cards use a semi-transparent white (`rgba(255, 255, 255, 0.4)`) to allow background colors to bleed through while maintaining a "frosted" texture.
- **Primary Contrast:** To ensure accessibility, all text uses a deep but softened slate / obsidian tone. This provides a "sharp" anchor against the soft, blurred surroundings.
- **Accents:** Use Mint and Indigo sparingly for success states or high-energy micro-interactions.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels to maintain a modern, friendly, yet highly legible appearance.

The typographic hierarchy is characterized by significant contrast in scale. Display headings are intentionally large and tightly tracked to feel like physical "objects" on the glass. Body copy is given generous line height to ensure readability against the translucent, high-blur backgrounds.

For mobile, headlines scale down slightly to prevent excessive wrapping, while maintaining the bold weight that defines the brand's premium character.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1280px central track on desktop, while margins and background gradients expand to fill the viewport, enhancing the immersive feel.

- **Grid:** A 12-column grid with 24px gutters.
- **Rhythm:** An 8px linear scale governs all padding and margins.
- **Density:** Use generous spacing (64px+) between major sections to allow the atmospheric background to "breathe." Glass cards should have internal padding of at least 32px to maintain a premium, spacious feel.

## Elevation & Depth

Depth is the primary driver of the user experience in this design system. Instead of traditional drop shadows, we use **refractive layering**:

1.  **Backdrop Blur:** All container surfaces must implement `backdrop-filter: blur(40px)` (3xl) as a minimum. This creates the "ethereal" frosted effect.
2.  **Border Glow:** Containers feature a 1px solid white border at 30% opacity. This "catches the light" and defines the edge of the glass against the background.
3.  **Inner Sheen:** A subtle top-to-bottom linear gradient (White at 10% to White at 0%) inside the card simulates a light source reflecting off the top edge.
4.  **Shadows:** Shadows are used only for the highest elevation (e.g., Modals). These are not black, but deep, ultra-diffused blue-tinted blurs with low opacity (10-15%).

## Shapes

The shape language is consistently **Rounded (Level 2)**.

Standard components (Cards, Inputs) use a **16px (1rem)** corner radius. Larger containers or hero cards scale up to **24px (1.5rem)**. This curvature mimics the organic flow of the background gradients and softens the high-contrast typography, contributing to the approachable, premium aesthetic. Buttons should remain consistent with the card radius to ensure a cohesive visual language.

## Components

### Buttons
Primary buttons prefer soft teal / pale mint glass treatment with slate text. Avoid heavy black blocks. Secondary buttons use the "Glass" style: semi-transparent white with a 1px border and high blur.

### Cards
Cards are the hero of the design system. They must use the `blur-3xl` value. To maintain text contrast, never use a card background opacity lower than 40%. Ensure cards have a subtle 1px white border.

### Input Fields
Inputs are "Glass" style but with a higher background opacity (60%) when focused. Use the Primary Obsidian color for the cursor and text. Placeholder text should be a medium-grey/blue to ensure it's visible but secondary.

### Chips & Badges
Small, pill-shaped elements that use the **Secondary Mint** or **Tertiary Indigo** at low opacities (15%) with high-saturation text of the same hue. This makes them look like "glowing gems" embedded in the glass.

### Lists
List items should be separated by thin, 1px lines at 10% opacity. Avoid heavy dividers. Use the Obsidian color for icons to ensure they pop against the soft background.


## Color Guardrails / 避免詭異黑色

Although the base preset may include pure black tokens, AI Life Assistant should use a softened Light Mode interpretation.

Required color direction:
- warm white background
- pale mint ambient glow
- soft teal accents
- soft blue translucent surfaces
- lavender / blue shadows
- misty glass cards
- obsidian / slate only for text, icons, or very small emphasis

Strict rules:
- Do not use pure black `#000000` in generated UI surfaces.
- Do not use large dead-black areas.
- Do not use black sidebar backgrounds.
- Do not use black module cards.
- Do not use high-saturation green.
- Primary CTAs should prefer soft teal / pale mint glass treatment with slate text, or restrained slate text buttons.
- If dark text is needed, prefer `#1E293B` or `#334155` instead of pure black.
- Obsidian is allowed only as readable typography / icon color / tiny emphasis, not as a large visual block.
