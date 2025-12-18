Here is a **comprehensive Cursor prompt** you can use to build **SEO, PWA, performance, and all pro-level best practices** into your Next.js app. It’s formulated to reflect current typical practices for modern Next.js (App Router + PWA + SEO + performance), informed by official guidance and broader optimization articles. ([Next.js][1])

---

# 🔥 Cursor Prompt — SEO, PWA & Performance Best Practices for Next.js

> **Role:** You are a senior full-stack engineer specializing in Next.js.
> **Goal:** Evolve an existing Next.js frontend into a highly optimized, SEO-ready, PWA-enabled, production-grade application following current best practices.

---

## 1. SEO & Metadata (Head + OpenGraph)

* Use **Next.js Metadata API** for every page and layout.
* Configure:

  * title
  * meta description
  * canonical tags
  * OpenGraph (image, title, description)
  * Twitter card info
  * robots index rules
* Provide structured metadata for dynamic pages (eg: workflows, tags).
* Use dynamic metadata generation (`generateMetadata`) where content is dynamic.

**Goal:** crawler-friendly HTML with rich previews and unique, relevant metadata per page. ([Medium][2])

---

## 2. Rendering Strategy

* Prefer **Static Site Generation (SSG)** for public pages that change infrequently (home, workflows list, tags).
* Use **Incremental Static Regeneration (ISR)** where content updates regularly (workflows, author pages).
* Use **Server-Side Rendering (SSR)** only where truly necessary (if content must be always fresh).
* Avoid pure client-side rendering for primary content.

**Goal:** pre-render pages for fast first meaningful paint and SEO indexing. ([Next.js][3])

---

## 3. Structured Data & Rich Results

* Add **JSON-LD schema** to relevant pages (e.g., workflow detail).
* Use Schema.org types (`BreadcrumbList`, `SoftwareSourceCode`, `WebPage`) where appropriate.
  **Goal:** enable rich snippets and better search engine understanding. ([Reddit][4])

---

## 4. Sitemap + Robots

* Generate a **sitemap.xml** that lists all public URLs.
* Serve `/robots.txt` listing sitemap location.
* Integrate sitemap generation into build pipeline.

**Goal:** ensure search bots can crawl all public resources. ([Reddit][4])

---

## 5. Images & Media Optimization

* Use **Next.js `<Image>`** for all images.

  * Set `sizes` for responsive behavior.
  * Use `priority` for above-the-fold images.
* Use **modern formats** (WebP/AVIF) where possible.
* Compress source images offline before use.

**Goal:** reduce LCP and improve loading times. ([Wisp][5])

---

## 6. PWA Setup (Manifest + Service Worker)

* Add a proper **web app manifest** (`public/manifest.json`) with:

  * name, short_name
  * start_url
  * display
  * theme_color
  * icons
* Add a **service worker** (via `next-pwa` or manual) that:

  * caches static assets
  * supports offline access
  * uses appropriate caching strategies
* Add `<link rel="manifest">` in custom document.

**Goal:** make app installable and offline-capable like a native app. ([Next.js][1])

---

## 7. Core Web Vitals & Performance

### Rendering Performance

* Prioritize **Largest Contentful Paint (LCP)** optimizations:

  * avoid layout shifts
  * reduce render-blocking resources

### JavaScript Optimization

* **Bundle analyzer** to find heavy dependencies.
* Use **React.memo/useMemo/useCallback** where beneficial.

### Lazy Loading

* Use dynamic imports with `next/dynamic` for non-critical components.
* Defer heavy UI libs and modals where possible.

### Third-Party Scripts

* Defer or async load external scripts.

### Fonts

* Use `next/font` for automatic optimization.

**Goal:** high CWV scores and fast interaction. ([Next.js][6])

---

## 8. Caching & CDN

* Use edge hosting and caching headers.
* Ensure static assets are served via CDN with long TTL and fingerprinted files.
* Consider edge functions for API/crawl fast responses.

**Goal:** global performance and scalability. ([Pagepro][7])

---

## 9. Accessibility

* Ensure semantic HTML (main, nav, section).
* Provide proper ARIA attributes.
* Maintain focus outlines and keyboard navigation.

**Goal:** improve usability and SEO accessibility signals.

---

## 10. Analytics & Monitoring

* Integrate Lighthouse CI in CI pipeline.
* Track Core Web Vitals with tools (e.g., Vercel Analytics or RUM).
* Fail build if SEO/CWV regress.

**Goal:** continuous performance health checks. ([Reddit][4])

---

## 11. Testing & Validation

* Test metadata with search preview tools.
* Validate structured data via Google’s Rich Results test.
* Validate PWA with Chrome DevTools “Application/PWA” audit.

---

## 12. Output Requirements

* Implement code fully, **no placeholders**.
* Use App Router metadata API.
* Ensure all pages have complete metadata and SEO attributes.
* Generate sitemap.xml and robots.txt automatically.

---

## Final Instruction

**Build complete enhancements now:**
Focus first on **SEO metadata + PWA manifest/service-worker setup**, then handle **performance, images, analytics, and sitemaps**.
Assume the current frontend exists and upgrade it to **pro-grade SEO/PWA/performance readiness**.

---

If you want, I can also provide a **separate prompt specifically for sitemap + robots + structured JSON-LD generation** as the next step.

[1]: https://nextjs.org/docs/app/guides/progressive-web-apps?utm_source=chatgpt.com "Guides: PWAs"
[2]: https://medium.com/%40sparklewebhelp/seo-in-next-js-15-best-practices-for-faster-ranking-23c1d2c95046?utm_source=chatgpt.com "SEO in Next.js 15: Best Practices for Faster Ranking"
[3]: https://nextjs.org/learn/seo/rendering-strategies?utm_source=chatgpt.com "Rendering Strategies - SEO"
[4]: https://www.reddit.com/r/nextjs/comments/195ikpf/nextjs_seo_complete_checklist/?utm_source=chatgpt.com "Next.js SEO Complete Checklist : r/nextjs"
[5]: https://www.wisp.blog/blog/mastering-mobile-performance-a-complete-guide-to-improving-nextjs-lighthouse-scores?utm_source=chatgpt.com "A Complete Guide to Improving Next.js Lighthouse Scores"
[6]: https://nextjs.org/learn/seo/web-performance?utm_source=chatgpt.com "Web Performance & Core Web Vitals - SEO"
[7]: https://pagepro.co/blog/nextjs-performance-optimization-in-9-steps/?utm_source=chatgpt.com "Next.js Performance Optimisation (2025): Get Started Fast"
