# Print101 LLC — Website

A from-scratch redesign for Print101 LLC, using the same plain HTML / CSS / JS stack as the reference site (no build step, no framework — open `index.html` directly or deploy as static files).

## Structure
```
print101-website/
├── index.html                  Homepage (all sections, anchor-based routing)
├── annual-report-2026.html     Annual Report 2026 page (/annual-report-2026)
├── css/styles.css              Full design system + all component styles
├── js/main.js                  Nav, scroll-reveal, lightbox, slider, form UX
├── assets/
│   └── print101-annual-report-2026.pdf   Your real 2026 Florida LLC filing (as uploaded)
├── robots.txt
└── sitemap.xml
```

## Before you launch — please confirm/update these placeholders
I didn't have real values for the items below, so I used sensible placeholders. Update them before going live (all appear in `index.html`, `annual-report-2026.html`, and the JSON-LD schema blocks):

- **Phone number**: `+1 (305) 555-0142` — placeholder, not a real line.
- **Email addresses**: `info@print101llc.com` / `admin@print101llc.com` — placeholders. If `print101llc.com` isn't your real domain, update the domain too (also used in canonical URLs, Open Graph tags, and schema.org markup).
- **Contact form endpoint**: uses [formsubmit.co](https://formsubmit.co), same as the reference site. The *first* submission to a new formsubmit email address requires a one-time confirmation click from that inbox — do this before relying on the form.
- **Social links** (Facebook/Instagram/LinkedIn/X in the footer): currently `href="#"` — add your real profile URLs.
- **`og:image` reference** (`assets/og-cover.jpg`): no image file included — add a 1200×630 share image at that path, or update the meta tag.
- **Google Map embed**: geocoded from the address you gave (4950 NW 183rd St, Miami Gardens, FL 33055) — double-check the pin.

## Annual Report page
`annual-report-2026.html` embeds the real PDF you uploaded (your 2026 Florida LLC Annual Report filing) via `<object>`, with Download, Print, and "Open in new tab" actions, plus a breadcrumb and a company fact panel pulled from that filing (Document #L17000191054, EIN 82-2792882, filed April 21, 2026).

## Design notes
- Palette, type (Space Grotesk / Inter / IBM Plex Mono), and layout were built fresh for this brief — different hero composition, nav, footer, card system, and section order than the reference site.
- Signature visual motif: offset-press registration marks + halftone dot texture, used sparingly across section backgrounds and card corners.
- All animation is IntersectionObserver-based scroll reveal + CSS transitions; respects `prefers-reduced-motion`.
- Gallery/service visuals are CSS/icon-based tiles (no stock photography included) — swap in real project photos whenever you have them by replacing the `.gal-visual` / `.svc-visual` divs with `<img>` tags.
