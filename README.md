# Hours left

A single-page clock for the Eidetix design-partner deadline.

The hero number is **hours remaining until 7 October 2026** (end of day, IST). Under it, days / hours / minutes / seconds keep ticking. The thin bar at the top is progress through the window that opened 9 September.

## Local

```bash
npx serve .
```

Or open `index.html` directly.

## Hosting

This is static files. Push to GitHub Pages, or drop the folder on [Cloudflare Pages](https://pages.cloudflare.com), [Netlify](https://app.netlify.com/drop), or Vercel. No build step.

Deadline lives in `app.js` as `DEADLINE`.
