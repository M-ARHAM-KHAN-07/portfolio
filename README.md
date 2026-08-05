# Muhammad Arham Khan — Portfolio

A dark-themed, fully responsive developer portfolio built with **React + Vite + Tailwind CSS v4**, deployed to **GitHub Pages**.

## Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | React 19 (Vite 7)                         |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)     |
| Icons      | Inline SVG (no icon dependency)           |
| Deployment | GitHub Actions → GitHub Pages             |

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run deploy   # build + push dist/ to the gh-pages branch
```

## Editing content

**All copy lives in [`src/data/resume.js`](src/data/resume.js)** — profile, stats, experience,
projects, skills and education. Change it there and every component updates. No component
edits needed for content changes.

To swap the downloadable resume, replace `public/resume.pdf`.

## Deploying to GitHub Pages

### Option A — GitHub Actions (recommended, auto-deploys on push)

1. Create a repo and push:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/M-ARHAM-KHAN-07/<repo-name>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.
3. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every
   push to `main`. It derives the Vite `base` path from the repo name automatically, so both
   `user.github.io` and `user.github.io/<repo>/` work without config changes.

Site URL: `https://M-ARHAM-KHAN-07.github.io/<repo-name>/`

### Option B — one command from your machine

```bash
VITE_BASE=/<repo-name>/ npm run deploy     # bash
$env:VITE_BASE='/<repo-name>/'; npm run deploy   # PowerShell
```

Then set **Settings → Pages → Source: `Deploy from a branch` → `gh-pages` / `root`**.

> `VITE_BASE` matters: GitHub Pages project sites are served from a subdirectory, so assets
> break if the base path is left at `/`. Option A handles this for you.

## Project structure

```
.
├── .github/workflows/deploy.yml   # Pages deployment
├── public/
│   ├── resume.pdf                 # downloadable resume
│   ├── favicon.svg
│   └── .nojekyll                  # stop Pages from running Jekyll
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # sticky nav + mobile sheet
│   │   ├── Hero.jsx               # headline, stack badges, quick links, stats
│   │   ├── Experience.jsx         # timeline + education
│   │   ├── Projects.jsx           # filterable project cards
│   │   ├── Skills.jsx             # grouped skill matrix
│   │   ├── Contact.jsx            # contact CTA + links
│   │   ├── Footer.jsx
│   │   ├── Section.jsx            # shared section wrapper
│   │   ├── Reveal.jsx             # IntersectionObserver scroll reveal
│   │   └── Icons.jsx              # inline SVG icon set
│   ├── data/resume.js             # ← all content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Tailwind theme + base styles
├── index.html
└── vite.config.js
```

## Notes

- Responsive across mobile / tablet / desktop; nav collapses to a full-screen sheet under `md`.
- Respects `prefers-reduced-motion` — scroll reveals and transitions are disabled.
- Includes a skip-to-content link, focus-visible outlines and labelled icon links for a11y.
