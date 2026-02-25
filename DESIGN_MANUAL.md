# Greenland Arctic Xplorers — Design Manual

**Version 1.0**
**Last Updated: January 2026**

---

## 1. Brand Essence

### Vision
Create a digital experience that reflects the pristine, awe-inspiring nature of Greenland's Arctic wilderness—clean, powerful, and unforgettable.

### Design Philosophy
- **Functional Minimalism**: Every element serves a purpose. No decoration for decoration's sake.
- **Arctic Authenticity**: Colors, textures, and imagery drawn directly from Greenland's landscape.
- **Quiet Confidence**: Let the content breathe. The Arctic speaks through silence and scale.
- **Human-Centered**: Intuitive navigation that respects the user's time and attention.

### Brand Personality
| Attribute | Expression |
|-----------|------------|
| Adventurous | Bold typography, immersive imagery |
| Professional | Clean layouts, consistent spacing |
| Authentic | Real photography, honest communication |
| Approachable | Clear CTAs, accessible design |

---

## 2. Color System

### Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Arctic Navy** | `#0D1B2A` | 13, 27, 42 | Primary backgrounds, headers, footer |
| **Glacier Blue** | `#1B4965` | 27, 73, 101 | Secondary backgrounds, accents |
| **Ice Blue** | `#5FA8D3` | 95, 168, 211 | Interactive elements, links, highlights |
| **Frost** | `#CAE9FF` | 202, 233, 255 | Light backgrounds, cards, subtle accents |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Midnight** | `#0A0A0A` | 10, 10, 10 | Dark mode background |
| **Slate** | `#1E1E1E` | 30, 30, 30 | Dark mode surfaces |
| **Stone** | `#4A4A4A` | 74, 74, 74 | Secondary text, borders |
| **Granite** | `#6B7280` | 107, 114, 128 | Muted text, placeholders |
| **Mist** | `#E5E7EB` | 229, 231, 235 | Borders, dividers |
| **Snow** | `#F9FAFB` | 249, 250, 251 | Light backgrounds |
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Cards, content areas |

### Semantic Colors (Use Sparingly)

| Name | Hex | Usage |
|------|-----|-------|
| **Aurora Green** | `#10B981` | Success states, positive actions |
| **Alert Red** | `#EF4444` | Error states, urgent notices |
| **Warning** | `#F59E0B` | Warnings, special highlights |

### Color Application Rules

1. **60-30-10 Rule**: 60% neutral (whites/greys), 30% primary blues, 10% deep blue accents
2. **Contrast**: Maintain WCAG AA minimum (4.5:1 for text, 3:1 for UI elements)
3. **Blue Hierarchy**: Ice Blue for interactive elements, Glacier Blue for emphasis, Frost for subtle backgrounds
4. **Photography**: Let landscape images provide additional color richness

```css
/* CSS Custom Properties */
:root {
  /* Primary Blues */
  --color-ice-blue: #5FA8D3;
  --color-ice-blue-hover: #4A9BC7;
  --color-ice-blue-light: #7BBDE0;
  --color-glacier-blue: #1B4965;
  --color-glacier-blue-hover: #153A52;
  --color-frost: #CAE9FF;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-ice-gray: #F5F7F9;
  --color-charcoal: #333333;
  --color-charcoal-light: #666666;
  --color-border: #E0E4E8;
  --color-divider: #D1D5DB;

  /* Semantic */
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
}
```

---

## 3. Typography

### Font Stack

**Primary Font: Inter**
- Clean, highly legible sans-serif
- Excellent screen rendering
- Variable font support for performance

**Fallback Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|---------------|---------------|--------|-------------|----------------|
| Display | 72px / 4.5rem | 40px / 2.5rem | 700 | 1.1 | -0.02em |
| H1 | 48px / 3rem | 32px / 2rem | 700 | 1.2 | -0.02em |
| H2 | 36px / 2.25rem | 28px / 1.75rem | 600 | 1.25 | -0.01em |
| H3 | 28px / 1.75rem | 24px / 1.5rem | 600 | 1.3 | 0 |
| H4 | 22px / 1.375rem | 20px / 1.25rem | 600 | 1.35 | 0 |
| H5 | 18px / 1.125rem | 18px / 1.125rem | 600 | 1.4 | 0 |
| Body Large | 18px / 1.125rem | 16px / 1rem | 400 | 1.6 | 0 |
| Body | 16px / 1rem | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| Overline | 12px / 0.75rem | 12px / 0.75rem | 600 | 1.4 | 0.1em |

### Typography Rules

1. **Headlines**: Arctic Navy or White (depending on background). Never grey.
2. **Body Text**: Stone (#4A4A4A) on light backgrounds, Mist (#E5E7EB) on dark.
3. **Max Line Width**: 65-75 characters for optimal readability.
4. **Paragraph Spacing**: 1.5x the body line height between paragraphs.
5. **Uppercase**: Reserved for overlines, navigation labels, and CTAs only.

```css
/* Typography CSS */
.display { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 700; line-height: 1.1; }
.h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; line-height: 1.2; }
.h2 { font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 600; line-height: 1.25; }
.h3 { font-size: clamp(1.5rem, 2.5vw, 1.75rem); font-weight: 600; line-height: 1.3; }
.body-large { font-size: clamp(1rem, 1.5vw, 1.125rem); line-height: 1.6; }
.body { font-size: 1rem; line-height: 1.6; }
```

---

## 4. Spacing System

### Base Unit
**8px base unit** — All spacing derives from multiples of 8.

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight internal padding |
| `--space-2` | 8px | Icon gaps, small padding |
| `--space-3` | 12px | Compact component padding |
| `--space-4` | 16px | Standard component padding |
| `--space-5` | 24px | Card padding, list gaps |
| `--space-6` | 32px | Section internal spacing |
| `--space-7` | 48px | Between related sections |
| `--space-8` | 64px | Between distinct sections |
| `--space-9` | 96px | Major section breaks |
| `--space-10` | 128px | Hero/footer spacing |

### Layout Spacing

```css
:root {
  /* Container */
  --container-max: 1280px;
  --container-wide: 1440px;
  --container-padding: clamp(1rem, 5vw, 2rem);

  /* Grid */
  --grid-gap: clamp(1rem, 2vw, 1.5rem);
  --grid-columns: 12;

  /* Sections */
  --section-padding-y: clamp(4rem, 10vw, 8rem);
}
```

### Spacing Principles

1. **Consistent Rhythm**: Use the scale—don't invent arbitrary values.
2. **Relationship Through Proximity**: Related items closer together (16-24px), unrelated items further apart (48-64px).
3. **Breathing Room**: When in doubt, add more whitespace.
4. **Responsive Scaling**: Use `clamp()` for spacing that adapts gracefully.

---

## 5. Layout System

### Grid Structure

**12-column grid** with responsive behavior:

| Breakpoint | Columns | Gutter | Container |
|------------|---------|--------|-----------|
| Mobile (< 640px) | 4 | 16px | 100% - 32px |
| Tablet (640-1024px) | 8 | 24px | 100% - 48px |
| Desktop (1024px+) | 12 | 24px | 1280px max |
| Wide (1440px+) | 12 | 32px | 1440px max |

### Common Layouts

**Full-width Hero**
```
[---------------- 12 cols ----------------]
```

**Content + Sidebar**
```
[-------- 8 cols --------][-- 4 cols --]
```

**Three Cards**
```
[-- 4 cols --][-- 4 cols --][-- 4 cols --]
```

**Two-column Split**
```
[------ 6 cols ------][------ 6 cols ------]
```

**Centered Content**
```
[- 2 -][-------- 8 cols --------][- 2 -]
```

### Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Raised | 10 | Cards, dropdowns |
| Sticky | 100 | Sticky headers |
| Overlay | 200 | Modals backdrop |
| Modal | 300 | Modal content |
| Toast | 400 | Notifications |
| Tooltip | 500 | Tooltips |

---

## 6. Components

### Buttons

#### Primary Button
- Background: `--color-ice-blue`
- Text: `--color-arctic-navy`
- Padding: 14px 28px
- Border-radius: 8px
- Font: 16px, weight 600
- Hover: Darken background 10%
- Active: Darken 15%, slight scale (0.98)

#### Secondary Button
- Background: transparent
- Border: 2px solid `--color-ice-blue`
- Text: `--color-ice-blue`
- Hover: Fill with ice-blue at 10% opacity

#### Ghost Button
- Background: transparent
- Text: `--color-glacier-blue`
- Underline on hover

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-ice-blue);
  color: var(--color-arctic-navy);
}

.btn-primary:hover {
  background: #4A9BC7;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-ice-blue);
  color: var(--color-ice-blue);
}

.btn-secondary:hover {
  background: rgba(95, 168, 211, 0.1);
}
```

### Cards

#### Standard Card
- Background: White
- Border-radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)`
- Padding: 24px
- Hover: Lift with enhanced shadow

#### Image Card (Tours)
- Aspect ratio: 4:3 or 16:9
- Image with gradient overlay at bottom
- Text overlay: white on dark gradient
- Border-radius: 12px
- Hover: Slight scale (1.02) with shadow

```css
.card {
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.08);
}

.card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}
```

### Navigation

#### Header
- Height: 80px (desktop), 64px (mobile)
- Background: Transparent on hero, White/Arctic Navy when scrolled
- Position: Fixed
- Transition: Smooth background change on scroll

#### Nav Links
- Font: 14px, weight 500, uppercase, letter-spacing 0.05em
- Color: Inherit from header state
- Hover: Ice Blue underline (2px, animated from center)

#### Mobile Menu
- Full-screen overlay
- Background: Arctic Navy
- Staggered fade-in animation
- Large touch targets (48px minimum)

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--container-padding);
  z-index: 100;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.nav.scrolled {
  background: var(--color-white);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-ice-blue);
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
  left: 0;
}
```

### Form Elements

#### Input Fields
- Height: 48px
- Border: 1px solid `--color-mist`
- Border-radius: 8px
- Padding: 0 16px
- Focus: Border `--color-ice-blue`, subtle blue glow

#### Labels
- Font: 14px, weight 500
- Color: `--color-stone`
- Margin-bottom: 8px

```css
.input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--color-mist);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-ice-blue);
  box-shadow: 0 0 0 3px rgba(95, 168, 211, 0.15);
}

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-stone);
  margin-bottom: 8px;
}
```

---

## 7. Imagery

### Photography Style

1. **Authentic Landscapes**: Real Greenland scenery—fjords, glaciers, icebergs, Northern Lights
2. **Human Scale**: Include people to show the scale of nature and the experience
3. **Golden/Blue Hour**: Prioritize dramatic lighting conditions
4. **High Quality**: Minimum 2000px wide, properly compressed for web
5. **No Heavy Filters**: Natural color grading that enhances without distorting

### Image Treatment

- **Hero Images**: Full-bleed, slight dark overlay (20-40% black) for text legibility
- **Card Images**: Cropped to aspect ratio, subtle zoom on hover
- **Background Images**: Fixed attachment for subtle parallax, heavily blurred for texture

### Overlay Gradients

```css
/* Hero overlay - bottom text */
.hero-overlay {
  background: linear-gradient(
    to top,
    rgba(13, 27, 42, 0.8) 0%,
    rgba(13, 27, 42, 0.4) 40%,
    rgba(13, 27, 42, 0.1) 70%,
    transparent 100%
  );
}

/* Card overlay */
.card-overlay {
  background: linear-gradient(
    to top,
    rgba(13, 27, 42, 0.9) 0%,
    transparent 60%
  );
}
```

---

## 8. Motion & Animation

### Principles

1. **Purposeful**: Animation should guide attention, not distract
2. **Subtle**: Micro-interactions over dramatic transitions
3. **Fast**: Keep durations under 400ms for UI elements
4. **Natural**: Use ease-out for entering, ease-in for exiting

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| Micro (hover, focus) | 150-200ms | ease-out |
| Small (cards, buttons) | 200-300ms | ease-out |
| Medium (modals, menus) | 300-400ms | ease-out |
| Large (page transitions) | 400-600ms | ease-in-out |

### Standard Animations

```css
/* Fade in up - for scroll reveals */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Subtle scale - for cards */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* Image zoom - for image cards */
.image-zoom img {
  transition: transform 0.4s ease;
}

.image-zoom:hover img {
  transform: scale(1.05);
}
```

### Scroll Animations

Use sparingly. Elements should fade in as they enter the viewport:
- Trigger: When element is 20% visible
- Animation: Fade in + slight upward movement (20px)
- Stagger: 100ms delay between sequential elements

---

## 9. Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--bp-sm: 640px;   /* Small tablets */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Desktop */
--bp-xl: 1280px;  /* Large desktop */
--bp-2xl: 1536px; /* Extra large */
```

### Mobile Considerations

1. **Touch Targets**: Minimum 44px × 44px for all interactive elements
2. **Font Sizes**: Never below 14px for body text
3. **Thumb Zone**: Primary actions in bottom 2/3 of screen
4. **Reduced Motion**: Respect `prefers-reduced-motion`

### Responsive Typography

```css
html {
  font-size: 16px;
}

@media (min-width: 1024px) {
  html {
    font-size: 18px;
  }
}

/* Or use clamp for fluid scaling */
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
}
```

---

## 10. Accessibility

### Requirements

- **WCAG 2.1 AA Compliance** minimum
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus States**: Visible focus indicators on all interactive elements
- **Keyboard Navigation**: Full site navigable via keyboard
- **Screen Readers**: Semantic HTML, proper ARIA labels

### Focus Styles

```css
/* Custom focus ring */
:focus-visible {
  outline: 2px solid var(--color-ice-blue);
  outline-offset: 2px;
}

/* Remove default, add custom for buttons */
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(95, 168, 211, 0.4);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Page Templates

### Homepage Structure

```
┌─────────────────────────────────────────┐
│  Navigation (transparent, fixed)        │
├─────────────────────────────────────────┤
│                                         │
│  Hero Section                           │
│  - Full viewport height                 │
│  - Background image/video               │
│  - Headline + CTA                       │
│                                         │
├─────────────────────────────────────────┤
│  Introduction                           │
│  - Centered text                        │
│  - Brand statement                      │
├─────────────────────────────────────────┤
│  Featured Tours                         │
│  - 3-column card grid                   │
│  - Image cards with overlay text        │
├─────────────────────────────────────────┤
│  About / Why Us                         │
│  - 2-column: Image + Text               │
│  - Key differentiators                  │
├─────────────────────────────────────────┤
│  Upcoming Events                        │
│  - Horizontal scroll or grid            │
│  - Event cards with dates               │
├─────────────────────────────────────────┤
│  Testimonials                           │
│  - Single quote, large typography       │
│  - Customer photo + name                │
├─────────────────────────────────────────┤
│  CTA Section                            │
│  - Background image                     │
│  - Strong headline + button             │
├─────────────────────────────────────────┤
│  Footer                                 │
│  - Dark background                      │
│  - Navigation, contact, social          │
└─────────────────────────────────────────┘
```

### Tour Detail Page

```
┌─────────────────────────────────────────┐
│  Navigation (solid background)          │
├─────────────────────────────────────────┤
│  Hero Image Gallery                     │
│  - Main image + thumbnails              │
├─────────────────────────────────────────┤
│  Title + Quick Info          │ Booking  │
│  - Tour name, duration       │ Card     │
│  - Price, difficulty         │ (sticky) │
├──────────────────────────────┤          │
│  Description                 │          │
│  - Full tour details         │          │
├──────────────────────────────┤          │
│  Itinerary                   │          │
│  - Day-by-day breakdown      │          │
├──────────────────────────────┤          │
│  What's Included             │          │
│  - Checklist style           │          │
├─────────────────────────────────────────┤
│  Related Tours                          │
│  - 3 card grid                          │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

---

## 12. Do's and Don'ts

### Do

- Use generous whitespace
- Let photography tell the story
- Keep navigation simple and predictable
- Use animation to guide, not impress
- Maintain consistent spacing rhythm
- Test on real devices
- Prioritize content over decoration

### Don't

- Add decorative elements without purpose
- Use more than 2-3 colors per section
- Animate everything
- Use stock photos that feel generic
- Sacrifice readability for style
- Forget mobile users
- Ignore accessibility

---

## 13. Implementation Notes

### CSS Variables Setup

```css
:root {
  /* Primary Blues */
  --color-ice-blue: #5FA8D3;
  --color-ice-blue-hover: #4A9BC7;
  --color-ice-blue-light: #7BBDE0;
  --color-ice-blue-pale: rgba(95, 168, 211, 0.1);
  --color-glacier-blue: #1B4965;
  --color-glacier-blue-hover: #153A52;
  --color-glacier-blue-pale: rgba(27, 73, 101, 0.1);
  --color-frost: #CAE9FF;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-ice-gray: #F5F7F9;
  --color-charcoal: #333333;
  --color-charcoal-light: #666666;
  --color-border: #E0E4E8;
  --color-divider: #D1D5DB;

  /* Semantic */
  --primary: var(--color-ice-blue);
  --primary-dark: var(--color-ice-blue-hover);
  --primary-light: var(--color-ice-blue-light);

  /* Typography */
  --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --section-padding: clamp(3rem, 8vw, 6rem);
  --container-padding: clamp(1.25rem, 5vw, 3rem);
  --container-max: 1280px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-blue: 0 4px 16px rgba(95, 168, 211, 0.35);
  --shadow-deep-blue: 0 4px 16px rgba(27, 73, 101, 0.25);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Recommended Libraries

- **Animations**: Framer Motion (React) or GSAP
- **Icons**: Lucide Icons (clean, consistent)
- **Forms**: React Hook Form + Zod validation

---

## 14. Resources

### Fonts
- Inter: https://fonts.google.com/specimen/Inter

### Inspiration
- [Awwwards Clean Collection](https://www.awwwards.com/websites/clean/)
- [Stripe Homepage](https://stripe.com) - Minimalism with depth
- [Apple](https://apple.com) - Product-focused layouts
- [Linear](https://linear.app) - Modern SaaS aesthetic

### Color Tools
- [Coolors](https://coolors.co) - Palette generation
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

*This design manual is a living document. Update as the brand evolves.*
