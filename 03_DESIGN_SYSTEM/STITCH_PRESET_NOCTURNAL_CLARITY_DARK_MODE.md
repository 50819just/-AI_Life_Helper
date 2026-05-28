---
name: Nocturnal Clarity
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bacac5'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#859490'
  outline-variant: '#3c4a46'
  surface-tint: '#3cddc7'
  primary: '#57f1db'
  on-primary: '#003731'
  primary-container: '#2dd4bf'
  on-primary-container: '#00574d'
  inverse-primary: '#006b5f'
  secondary: '#a1cde3'
  on-secondary: '#003546'
  secondary-container: '#1e4c5f'
  on-secondary-container: '#90bbd1'
  tertiary: '#d7d6ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#b6b8ff'
  on-tertiary-container: '#3636c4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#62fae3'
  primary-fixed-dim: '#3cddc7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#bee9ff'
  secondary-fixed-dim: '#a1cde3'
  on-secondary-fixed: '#001f2a'
  on-secondary-fixed-variant: '#1e4c5f'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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
  container-padding-mobile: 1.5rem
  container-padding-desktop: 4rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style
This design system is engineered for deep immersion and visual comfort during extended night-time usage. The brand personality is serene, sophisticated, and technologically advanced, evoking the feeling of a high-end observatory or a quiet, moonlit workspace.

The design style utilizes **Atmospheric Glassmorphism**. UI elements appear as translucent panes of frosted glass suspended in a deep, three-dimensional space. By prioritizing soft glows and subtle light refraction over harsh borders, the interface minimizes eye strain while maintaining a distinct sense of depth and hierarchy. The emotional response is one of focused calm and premium reliability.

## Colors
The palette is rooted in a "Deep Space" foundation. The base background uses a charcoal-navy (#0F172A) to provide a high-comfort, low-light anchor. 

- **Primary (Mint Glow):** A soft, luminous mint green used for primary actions and critical focus states. It provides high legibility against dark backgrounds without the vibration of pure white.
- **Secondary (Pale Frost):** A desaturated light blue used for supportive elements, secondary icons, and subtle highlights.
- **Surface Strategy:** Layers are built using semi-transparent "Glass" fills. Each layer uses a backdrop-blur (12px to 20px) to maintain legibility of the content beneath while simulating physical thickness.
- **Definition:** Instead of solid dividers, use thin (1px) borders in a light blue-white at low opacity to catch "specular" light on the edges of glass panes.

## Typography
The typography system balances modern accessibility with a slight technical edge. 

- **Headlines:** Set in **Plus Jakarta Sans**, utilizing its soft curves to contrast against the sharp precision of the glass containers.
- **Body:** **Inter** is used for its exceptional legibility in low-light, high-contrast environments. 
- **Labels/Data:** **JetBrains Mono** is introduced for small labels, metadata, and system status indicators to reinforce the "technical/obsidian" aesthetic.
- **Rendering:** All text should utilize `antialiased` rendering. Large display text uses a tighter letter spacing to create a more cohesive visual block.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous inner padding to allow the glass backgrounds to "breathe."

- **Desktop:** A 12-column grid with a maximum content width of 1440px. Gutters are kept wide (24px) to ensure that the glass-edge highlights of adjacent components do not clutter the visual field.
- **Mobile:** A 4-column grid with 16px gutters and 24px side margins. 
- **Rhythm:** An 8px linear scale governs all spacing. Vertical "stack" spacing should be aggressive (32px+) between major sections to emphasize the floating nature of the UI panes.

## Elevation & Depth
Depth is communicated through **Backdrop Blur** and **Opacity Progression** rather than traditional drop shadows.

- **Level 1 (Base):** The deep navy background.
- **Level 2 (Panels):** Surfaces with `rgba(30, 41, 59, 0.7)` and `backdrop-filter: blur(16px)`.
- **Level 3 (Modals/Popups):** Higher opacity `rgba(45, 55, 72, 0.8)` with a 1px border of `rgba(255, 255, 255, 0.2)` to simulate light catching the very top edge.
- **Glows:** Instead of black shadows, use subtle "Ambient Glows" behind primary buttons. A 40px blur of the primary mint color at 15% opacity creates a soft radiance that suggests the button is a light source.

## Shapes
The shape language is "Rounded" to maintain the friendly yet professional tone. 

- **Containers:** Use `rounded-lg` (1rem) for most glass panels to soften the interface.
- **Small Elements:** Buttons and input fields use `rounded-md` (0.5rem).
- **Interactive States:** On hover, shapes do not change size, but the border-opacity should increase to simulate "polishing" the glass.

## Components
- **Buttons:** Primary buttons are filled with a solid-to-gradient mint green. Secondary buttons are "Ghost Glass" with a thin white-blue border and no fill until hovered.
- **Inputs:** Fields are dark, semi-transparent wells with an inner glow on focus. The cursor and selection highlight use the primary mint green.
- **Chips/Tags:** Small, pill-shaped glass elements with `JetBrains Mono` text. Use a different tint (e.g., pale blue) to categorize information.
- **Lists:** Horizontal dividers are avoided. Use subtle vertical spacing and a slight background tint change on hover to indicate row selection.
- **Cards:** Glass cards should include a subtle gradient overlay (top-left to bottom-right) from 5% white to 0% white to simulate a glass surface's natural light falloff.
- **Status Indicators:** Use "Glowing Pips"—small circular indicators with a 4px outer glow in the color of the status (Mint for success, Red-Orange for errors).