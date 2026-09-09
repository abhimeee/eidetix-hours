# Eidetix Time Bomb

A single-page clock for the Eidetix design-partner deadline. Also a Chrome/Edge/Brave New Tab extension.

The hero number is **hours remaining until 7 October 2026** (end of day, IST). Under it, days / hours / minutes / seconds keep ticking. The thin bar at the top is progress through the window that opened 9 September.

## New tab (Chrome, Edge, Brave)

Chrome will not let a website replace the New Tab page. This folder is the **Eidetix Time Bomb** extension that does that.

**On your machine**

1. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this folder (`eidetix-hours`).
4. Open a new tab. Chrome will say Eidetix Time Bomb changed your New Tab page. Keep it.

Do not move the folder after loading it. Chrome reads the files from that path.

**On a friend's machine**

Zip the extension (not the `.git` folder):

```bash
zip -r eidetix-time-bomb.zip manifest.json index.html styles.css app.js logo.svg icons
```

Send them `eidetix-time-bomb.zip`. They unzip it somewhere permanent (Desktop is fine), then do the same four steps above and pick the unzipped folder.

That is the whole install. No store, no account, no permissions beyond replacing New Tab.

If you want a one-click install later, publish this folder to the Chrome Web Store as **unlisted** and send the link. That needs a one-time $5 Google developer signup and a short review. For a handful of people, the zip is faster.

Arc and Safari do not honor this New Tab override. Pin https://abhimeee.github.io/eidetix-hours/ instead.

## Local

```bash
npx serve .
```

Or open `index.html` directly.

## Hosting

Live: https://abhimeee.github.io/eidetix-hours/

Static files. GitHub Pages is already on. You can also drop the folder on [Cloudflare Pages](https://pages.cloudflare.com), [Netlify](https://app.netlify.com/drop), or Vercel. No build step.

Deadline lives in `app.js` as `DEADLINE`.
