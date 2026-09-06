# AI & Python Training Institute Platform (pythonforai.in)

Official production-grade web platform for **AI and Python Training Institute**, Durgapur & Asansol, West Bengal.

---

## 📁 Production Directory Structure

```text
aipythontraining/
├── assets/
│   ├── css/
│   │   ├── main.css              # Extracted core design system & styles for index.html
│   │   └── shared.css            # Shared component & typography styles for subpages
│   ├── js/
│   │   ├── main.js               # Application logic, dynamic batch timer, lead handler
│   │   └── nav.js                # Navigation dropdowns & theme synchronization
│   ├── images/
│   │   ├── founder.webp          # Next-gen WebP instructor photo (EXIF-stripped)
│   │   ├── founder.jpeg          # High-quality fallback JPEG
│   │   ├── certificate.webp      # Next-gen WebP NIT Warangal credential
│   │   ├── certificate.jpeg      # High-quality fallback JPEG
│   │   ├── og-cover.jpg          # Standard 1200x630 OpenGraph social share card
│   │   └── blog/                 # Blog post image assets
│   ├── docs/
│   │   └── brochure.pdf          # Official downloadable course brochure
│   └── data/
│       └── blogs.json            # Dynamic articles & tutorials dataset
├── favicon-32x32.png             # Standard 32x32 browser tab icon
├── apple-touch-icon.png          # 180x180 iOS home screen touch icon
├── logo.png                      # 512x512 high-res Schema.org organization logo
├── site.webmanifest              # PWA compliance manifest
├── robots.txt                    # Search engine crawler instructions with sitemap reference
├── sitemap.xml                   # Strict Sitemaps.org XML protocol (11 valid indexable routes)
├── .htaccess                     # Apache/cPanel rules: HTTPS, 301 canonical, HSTS, 1yr caching
├── 404.html                      # Branded error page matching design system
├── index.html                    # Main landing page (clean, decoupled from CSS/JS)
├── blog.html                     # Searchable knowledge base & tutorials
├── post.html                     # Single post reader template
├── interview.html                # Python Interview Battle Arena (gamified practice)
├── sandbox.html                  # In-browser Pyodide Python 3.11 execution sandbox
├── roadmap.html                  # 7-level structured student curriculum journey
├── python-vs.html                # Language comparison guide (Python vs Java/C++)
├── cheatsheet.html               # Rapid reference sheet for Python & ML syntax
├── salary.html                   # AI/ML industry career & compensation breakdown
├── portfolio.html                # Student deployed project showcase
├── tools.html                    # AI & Data Science tool stack overview
├── demo.html                     # Free demo session reservation funnel
└── admin.html                    # Content & blog manager panel
```

---

## 🚀 Deployment to GoDaddy / cPanel

1. Clone or pull this repository:
   ```bash
   git clone https://github.com/Swastik1204/aipythontraining.git
   ```
2. In GoDaddy cPanel → **File Manager** → navigate into `public_html/`.
3. Upload all files and folders as structured above.
4. Ensure `.htaccess` is present in `public_html/` (enable *"Show Hidden Files"* in cPanel settings).
5. Verify in browser: [https://pythonforai.in/](https://pythonforai.in/).

---

## 📊 Audit Score & Refinement Status

* **Initial AI Prototype Score:** `73 / 100` (15 Failed Tests, 3 Warnings)
* **Current Score (Projected):** `~95 / 100` (13 Fails fixed, 3 Warnings resolved)

### ✅ What's Done
1. **Domain Standardization:** 100% of canonical URLs, OpenGraph tags, Schema JSON-LD, and WhatsApp templates unified to `https://pythonforai.in/`.
2. **Sitemap Compliance:** Removed illegal `#` fragment URLs; added all 11 real indexable subpages.
3. **Asset Generation:** Created `favicon-32x32.png`, `apple-touch-icon.png`, `logo.png`, `og-cover.jpg`, and `site.webmanifest`.
4. **Performance Decoupling:** Extracted 70+ KB of inline CSS and JS out of `index.html` into `assets/css/main.css` and `assets/js/main.js`.
5. **Modern Media Formats:** Generated WebP variants for images and stripped heavy EXIF metadata.
6. **Mobile Lead Protection:** Removed asynchronous `setTimeout` that triggered iOS/Android popup blockers; added fallback navigation and `localStorage` lead persistence.
7. **Dynamic Batch Countdown:** Replaced dead hardcoded `2026-01-15` date with auto-calculating next Saturday 10:00 AM batch schedule.
8. **Executive Light Theme:** Implemented complete `[data-theme="light"]` token system for flawless high-contrast readability.
9. **Server Configuration:** Added `.htaccess` enforcing 301 canonical redirects, HSTS security headers, and 1-year browser caching.
10. **Branded 404 Recovery:** Custom `404.html` error template.

### 📋 What's Left (Final 2-3% to reach 98-100/100)
- [ ] **DNS SPF Record:** Add `v=spf1 include:_spf.google.com ~all` (or hosting default) as a TXT record in GoDaddy DNS settings.
- [ ] **Google Analytics GA4:** Insert client's GA4 Measurement ID (`G-XXXXXXXXXX`) into `<head>`.
- [ ] **Google Search Console:** Submit `https://pythonforai.in/sitemap.xml` in Search Console dashboard.
