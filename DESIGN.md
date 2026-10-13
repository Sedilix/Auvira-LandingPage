# Design

<!-- impeccable:design-schema 1 -->

## Visual World

**Aura and Gold Divinity**
Warm light on a luminous champagne ground, with gold as the hero and a sunset glow around it. Calm, grown-up, trustworthy, never clinical or girly.

Mood words: luminous, warm, glowing, refined, calm, divine, editorial.

## Official Design Tokens

```css
:root {
  /* grounds */
  --champagne: #FBF4E6;
  --pearl: #FFFDF8;
  --pearl-text: #FBF7F0;
  --gleam: #FFF1C4;
  --parchment: #F3E3C3;
  --border: #EED9B8;

  /* text */
  --cocoa: #4A3B2C;      /* Headings and body (9.8:1 on champagne) */
  --taupe: #6E5E4E;      /* Captions, helper text (5.7:1) */
  --espresso: #2A1F14;   /* Text on yellow, amber, and honey fills */
  --rust: #A34F14;       /* Links, eyebrows, active tabs (5.2:1) */

  /* gold */
  --deep-gold: #7A4E17;        /* Primary buttons solid fill */
  --deep-gold-hover: #8A5A1C;  /* Hover and pressed state */
  --gold: #C8932E;             /* Focus rings, rules, chart lines */
  --honey: #E8BE5E;            /* Badges, chart fills, dark-mode buttons */

  /* aura */
  --sunlit: #FFD86B;           /* Start of aura gradient */
  --amber: #FD9E39;            /* Middle of aura gradient */
  --rust-orange: #D9661F;      /* Deep end of aura, charts */
  --blush: #EEA09C;            /* Faint outer edge of glow only */
  --berry: #9B3B52;            /* Urgent, destructive, menstrual phase only */
  --night: #1E1A16;            /* Dark page background */

  /* typography */
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: Manrope, system-ui, sans-serif;

  /* gradients */
  --grad-aura: linear-gradient(110deg, #FFD86B, #FD9E39 60%, #F08A4A);
  --glow-aura: radial-gradient(circle at 88% 0%, rgba(255,241,196,.95) 0%,
    rgba(255,216,107,.6) 14%, rgba(253,158,57,.28) 32%,
    rgba(238,160,156,.2) 50%, rgba(251,244,230,0) 70%);

  /* shadows & radii */
  --shadow-primary: 0 8px 20px -12px rgba(122,78,23,.55);
  --radius-pill: 999px;
  --radius-card: 24px;
  --radius-input: 14px;
}
```

## Typography Scale

- **Headings**: `'Cormorant Garamond', Georgia, serif`
  - Display / Hero: 40px $\to$ 72px / 1.05 line-height, weight 500. One accent word in italic 600 in rust or gold.
  - H1: 33px $\to$ 48px / 1.1, weight 600.
  - H2 / card title: 26px $\to$ 36px / 1.15, weight 600.
  - H3 / section: 21px $\to$ 24px / 1.2, weight 600.
  - Eyebrows: Manrope 11–12px, caps, 0.14em tracking, weight 600, Rust `#A34F14`.
- **Body & UI**: `'Manrope', sans-serif`
  - Body: 15px $\to$ 17px / 1.6, weight 400, Cocoa `#4A3B2C`.
  - Button / label: 14–15px, weight 600.
  - Caption: 12–13px / 1.5, weight 400, Taupe `#6E5E4E` (never below 12px).
  - Clean figures / statistics set in Manrope 600.

## Component Specifications

- **Primary Button**: Solid deep gold `#7A4E17`, pearl text `#FBF7F0`, Manrope 600, pill radius, height 48–52px, padding 0 28px, shadow `0 8px 20px -12px rgba(122,78,23,.55)`, hover `#8A5A1C`. No gradient or shimmer.
- **Secondary Button**: Aura gradient (`#FFD86B` $\to$ `#FD9E39` $\to$ `#F08A4A`), espresso `#2A1F14` text, pill.
- **Outline Button**: Pearl fill, 1px `#C8932E` border, cocoa text, pill.
- **Text Link**: Rust `#A34F14`, Manrope 600, optional arrow $\to$, hover `#7A4E17`.
- **Chip (default / selected)**: Default: pearl with 1px `#EED9B8` border. Selected: aura gradient with espresso text. Height 36–40px, pill.
- **Tag / Badge**: Gleam `#FFF1C4` fill, deep gold `#7A4E17` text, 11px, weight 600, pill.
- **Card**: Pearl `#FFFDF8`, 1px `#EED9B8` border, radius 22–24px, padding 20–24px, no shadow.
- **Insight / Hero Card**: Pearl with aura glow from top-right corner. One per section.
- **Input**: Pearl, 1px `#EED9B8` border, radius 12–16px, height 48px, focus ring 2px `#C8932E`.
- **Icons**: Line icons, 1.8px stroke, rounded caps; rust on gleam `#FFF1C4` tile with radius 10px.
- **App Screens**: Show phone screens on pearl cards with soft aura glow behind them, not in device frames with heavy shadows.
- **Footer**: Cocoa text on parchment `#F3E3C3`, with a short disclaimer that Auvira does not replace medical advice.

## Do / Don't Principles

- **Do**:
  - Champagne and cream grounds with plenty of air
  - Gold as the hero colour; sunset aura as soft glow
  - Blush only as faint edge in the aura
  - Berry in tiny doses (alerts, one chart series)
  - Soft, blended gradients like light through glass
  - Serif headlines with lots of space
- **Don't**:
  - Stark white or grey backgrounds
  - Navy, magenta, red or bright pink
  - Pink as a main colour
  - Berry fills or large berry areas
  - Hard-edged, patchy or neon gradients
  - Crowded layouts, heavy drop shadows
