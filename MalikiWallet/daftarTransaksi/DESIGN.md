---
name: Maliki Islamic Fintech
colors:
  surface: '#e8ffee'
  surface-dim: '#c7e0cf'
  surface-bright: '#e8ffee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e1fae8'
  surface-container: '#dbf4e2'
  surface-container-high: '#d5eedd'
  surface-container-highest: '#d0e9d7'
  on-surface: '#0a2015'
  on-surface-variant: '#404942'
  inverse-surface: '#203529'
  inverse-on-surface: '#def7e5'
  outline: '#707971'
  outline-variant: '#c0c9c0'
  surface-tint: '#2d6a48'
  primary: '#003820'
  on-primary: '#ffffff'
  primary-container: '#0f5132'
  on-primary-container: '#84c39b'
  inverse-primary: '#95d4ac'
  secondary: '#775a00'
  on-secondary: '#ffffff'
  secondary-container: '#fece57'
  on-secondary-container: '#735700'
  tertiary: '#003920'
  on-tertiary: '#ffffff'
  tertiary-container: '#005230'
  on-tertiary-container: '#79c597'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f1c7'
  primary-fixed-dim: '#95d4ac'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0f5132'
  secondary-fixed: '#ffdf98'
  secondary-fixed-dim: '#eec14b'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#a6f3c2'
  tertiary-fixed-dim: '#8ad7a7'
  on-tertiary-fixed: '#002110'
  on-tertiary-fixed-variant: '#005230'
  background: '#e8ffee'
  on-background: '#0a2015'
  surface-variant: '#d0e9d7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.0625rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies the confluence of noble Islamic scholastic tradition and progressive digital fintech. Designed purposefully for Indonesian university students navigating higher education, the system evokes discipline, barakah (ethical sufficiency), composure, and technological trust.

The design movement synthesizes **Modern Academic Fintech** with **Islamic Neo-Clean Minimalism**. It departs from cluttered banking portals by using airy, serene sage-tinted surfaces, rhythmic typographic hierarchy, subtle geometric arabesque cues in micro-accents, and confident jewel-toned emeralds paired with warm regal gold. The aesthetic is clean, respectful, intuitive, and reassuring—alleviating financial anxiety for students managing living stipends, boarding fees (ma'had/kos), semester tuition (UKT), and everyday scholastic expenses.

## Colors

The color palette is anchored in the deep, dignified green of UIN Maulana Malik Ibrahim Malang and enriched by gold accents reflecting excellence and intellectual heritage.

- **Primary (`#0F5132`) & Tertiary (`#13653F`)**: Deep academic emerald. Conveys institutional authority, financial peace of mind, and Islamic heritage. Used for primary CTAs, primary balance backdrops, and active navigational items.
- **Secondary (`#C59B27` / `#D4AF37`)**: Warm golden ochre. Functions as an accent for achievements, premium notifications, wallet badges, targets, and savings milestones.
- **Neutral & Text (`#11261B` & `#1C3829`)**: Dark green-slate replacing harsh carbon black. Delivers rich, organic contrast that harmonizes with emerald tones.
- **Backgrounds & Surfaces**: Crisp sage whites (`#F8FAF9` base canvas, `#FFFFFF` foreground cards, and `#EBF1EE` for dividers and borders).
- **Semantics**:
  - *Income & Growth*: `#107C41` (Vibrant Emerald Green)
  - *Expense & Outflow*: `#C93B3B` (Soft Crimson Rose)
  - *Warning & Pending*: `#D97706` (Warm Golden Amber)
  - *Information*: `#1E6B7B` (Deep Cyan Petrol)

## Typography

Typography relies on **Plus Jakarta Sans**, a typeface born from Indonesian modern design heritage. It provides friendly open counters, sturdy geometry, and high legibility across dense financial data, rupiah currency values, and bilingual interfaces (Indonesian & Arabic script transliterations).

Numbers and financial stats require tabular layout awareness (`font-variant-numeric: tabular-nums`) to preserve optical alignment in ledger items and balance cards. Financial values employ heavier weights (`700` and `800`) paired with tight negative letter tracking to maintain structural compactness.

## Layout & Spacing

The layout is built upon an 8pt dynamic fluid grid with soft containment boundaries:
- **Desktop (1024px and above)**: 12-column layout with 24px (`1.5rem`) gutters, max-width constrained to `1280px` for optimal viewing, 32px (`2rem`) outer margin.
- **Tablet (768px - 1023px)**: 8-column layout with 20px gutters and 24px margins.
- **Mobile (up to 767px)**: 4-column layout with 16px (`1rem`) gutters and margins, engineered for single-thumb navigation, bottom navigation bars, and swipeable financial summary carousels.

Component interiors maintain standard rhythmic padding increments: micro tags use `space-xs` and `space-sm`, standard interactive controls leverage `space-md`, and analytical data cards scale through `space-lg` to `space-xl`.

## Elevation & Depth

Visual depth is achieved through **ambient tint-layered elevation** rather than stark drop shadows:

1. **Base Tier (Flat / Background)**: `#F8FAF9`, completely devoid of shadow.
2. **Card Tier 1 (Standard Surface)**: Pure `#FFFFFF` resting over `#F8FAF9`, bound by a razor-thin border (`1px solid rgba(17, 38, 27, 0.06)`) and cast with a diffused ambient shadow: `0 2px 8px -2px rgba(15, 81, 50, 0.05), 0 1px 3px 0 rgba(17, 38, 27, 0.03)`.
3. **Card Tier 2 (Hover / Active / Highlight)**: Used for highlighted wallet cards and interactive quick-actions: `0 8px 24px -4px rgba(15, 81, 50, 0.08), 0 4px 8px -2px rgba(17, 38, 27, 0.04)`.
4. **Hero Wallet Surface**: Deep green gradient (`linear-gradient(135deg, #0F5132 0%, #13653F 60%, #0B3D25 100%)`) with an inner gold ambient glow (`inset 0 1px 0 rgba(197, 155, 39, 0.35)`) and external deep elevation: `0 12px 32px -6px rgba(15, 81, 50, 0.28)`.
5. **Modal & Drawer Overlays**: Backdrop filter `blur(8px)` with tint `rgba(17, 38, 27, 0.4)` and card shadow `0 24px 48px -12px rgba(15, 81, 50, 0.2)`.

## Shapes

The design system incorporates **Level 2 (Rounded)** shape geometry, pairing approachable softness with structural clarity:

- **Buttons & Form Fields**: Standard radius of `0.5rem` (8px) for balanced tactility.
- **Cards, Modals & Quick Action Containers**: `1rem` (16px) for inner content cards, scaling up to `1.5rem` (24px) for the main financial master balance card.
- **Pills & Status Badges**: Full-pill radius (`9999px`) to offset rectangular grid cards with organic soft tags.
- **Icons & Islamic Geometric Micro-Badges**: Enclosed in squircle containers with `0.75rem` (12px) curvature to mirror the balanced kufic angles of the logo.

## Components

### Buttons
- **Primary CTA**: Emerald background (`#0F5132`), crisp white text, 8px corner radius, padding `0.75rem 1.5rem`. Subtle hover transition to `#13653F` with `translateY(-1px)`.
- **Secondary / Accent CTA**: Gold ochre background (`#C59B27`), white or deep green text (`#11261B`). Used for top-ups, savings targets, and financial milestones.
- **Ghost / Outlined**: Transparent background with 1px border (`#0F5132` or `rgba(15, 81, 50, 0.2)`), text `#0F5132`.

### Cards & Financial Containers
- **Main Balance Card (Atmospheric)**: Dark emerald gradient background, gold accent badge indicating student ID/NIM and wallet tier, bold display balance with a toggle for visibility (`Rp ••••••••`).
- **Standard Ledger Cards**: White base, 1px border (`#E5ECE8`), soft rounded corners (`16px`). Displays transaction icon, merchant/allocation title, academic category tag, date, and colored delta amount.

### Transaction Items & Lists
- Divided rows with 1px divider (`#F0F4F2`). 
- Left side: 40px rounded squircle icon container tinted green (income) or crimson (expense).
- Middle: Transaction title in `headline-sm` with subtext `body-sm` (e.g., "Kantin Tarbiyah", "Bayar UKT").
- Right side: Monospaced numeric amount prefixed with `+` in `#107C41` or `-` in `#C93B3B`.

### Form Fields & Inputs
- **Inputs**: 48px height, background `#FFFFFF`, border `1.5px solid #D8E2DC`, rounded `8px`, font size `0.9375rem`. Focused state employs primary ring `#0F5132` with `0 0 0 3px rgba(15, 81, 50, 0.12)`.
- **Rupiah Currency Input**: Prefix locked to `Rp` in bold slate, with large numeral size (`1.5rem`) for effortless budget allocation.

### Chips & Filter Pills
- Full-pill shape (`9999px`), padding `0.375rem 0.875rem`. Unselected state uses neutral soft sage (`#EBF1EE`) with `#11261B` text. Selected state uses `#0F5132` with white text or subtle gold outline.

### Additional University-Fintech Components
- **Budget Meter / Barakah Gauge**: A linear progress bar with golden checkpoints showing the student's monthly allowance health.
- **UKT / Tuition Savings Pot**: Segmented visual card with percentage rings and target dates aligned with the academic calendar.