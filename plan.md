# Photo Portfolio Website Plan

## Goal
Build a static, dark-cinematic photo portfolio website in English with four sections: Home, Gallery, About, Contact. Host on GitHub Pages.

## What Needs To Be Done

### 1) Content And Structure
- Define a one-line positioning statement for the hero (e.g., style + location).
- Decide caption format for the gallery: short captions vs. expandable long descriptions.
- Confirm final order of sections and CTA text.

Decisions:
- Cinematic street and travel photography from Moscow and beyond.
- Caption format confirmed: short captions only.
- Section order confirmed: Home → Gallery → About → Contact.
- CTA text confirmed: Explore

### 2) Visual Direction (Dark Cinematic)
- Pick a palette (dark neutral background + subtle warm accent).
- Choose typography pairing (display serif for headings + clean sans for body).
- Set layout rhythm: generous spacing, large hero, tight but calm gallery grid.

Chosen direction:
- Palette: #0b0d10 (base), #151a21 (surface), #8a6b3f (accent), #c9b9a3 (warm text), #8892a6 (muted text).
- Typography: Cormorant Garamond for headings, IBM Plex Sans for body.
- Layout rhythm: large hero, generous vertical spacing, calm gallery grid (3/2/1 columns).
- Refs: `./design_ref`

### 3) Technology Choice
- Use plain HTML/CSS/JS for v1 (no build step).

Decision: 
- stick with a pure stack (HTML/CSS/JS) for this portfolio.

### 4) Image Strategy
- Load `photos_compressed_low/` compressed in webp at first (fast), then load `photos_raw/` compressed in webp for high-quality display.
- Generate AVIF/WebP for performance and keep JPEG as fallback.
- Add `alt` text for every image; decorative images use empty alt.
- Take care of aspect ratios, check aspect ratio of each image and whink how to display it (e.g., portrait vs. landscape).

### 5) Site Implementation
- Create static structure:
  - `index.html` (single page with sections)
  - `styles.css` (theme and layout)
  - `main.js` (small enhancements, if needed)
- Add anchor navigation to sections.
- Add a simple contact block with email + WhatsApp + Telegram.

### 6) Performance And Accessibility
- Add `loading="lazy"` for non-hero images.
- Add `width` and `height` to images to reduce layout shift.
- Add `decoding="async"` for non-critical images.

### 7) Deployment (GitHub Pages)
- Publish directly from `main` branch (root or `/docs`).
- Ensure relative paths work under `/<repo>` project URL.
- Optionally add a custom `404.html` page.

## Inputs Needed From You
- About copy (2 short paragraphs suggested).

> About coffee:

```
I’m a traveling photographer focused on portraits and landscapes, drawn to quiet beauty and honest presence. My work is shaped by street photography—watching light, movement, and small moments that reveal character and place.

Whether I’m framing a face or a horizon, I aim for images that feel timeless, calm, and precise. I photograph people and environments with an elegant, understated touch, creating photographs that are both intimate and enduring.
```

Contants:

```
Alex .sh
alex.svdk@gmail.com
whatsapp (+79164962100) и телеграм a1ex5
```

## Outputs We Will Produce
- A complete static site in the repo.
- A dark cinematic theme and a responsive gallery.
- A GitHub Pages-ready setup.
