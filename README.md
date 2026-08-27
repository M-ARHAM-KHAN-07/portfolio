# Muhammad Arham Khan | Portfolio

A dark-first, fully responsive Data Engineering portfolio built with **React + Vite + Tailwind CSS v4**, deployed to **GitHub Pages**.

Live: **https://m-arham-khan-07.github.io/portfolio/**

## Stack

| Layer      | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | React 19 (Vite 7)                               |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`), no config file |
| Type       | Inter (sans) + IBM Plex Mono (technical labels) |
| Icons      | Inline SVG, no icon dependency                   |
| Motion     | CSS transitions + one lightweight canvas         |
| Deployment | GitHub Actions to GitHub Pages                   |

Runtime dependencies are React and React DOM only.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run deploy   # build + push dist/ to the gh-pages branch (fallback path)
```

## Editing content

**All copy lives in [`src/data/resume.js`](src/data/resume.js).** Components render from it, so
content changes never require touching a component:

| Export               | Drives                                                        |
| -------------------- | ------------------------------------------------------------- |
| `profile`            | Hero, nav, contact, footer                                     |
| `stats`              | Animated counters in About                                     |
| `about`              | About prose                                                    |
| `experience`         | Interactive role timeline                                      |
| `projects`           | Project cards + the full case-study modal                      |
| `architectureLayers` | Toolkit map, grouped by pipeline stage                         |
| `stackGroups`        | Stack section, each item with a usage note                     |
| `exploring`          | "Currently exploring" list                                     |
| `education`          | Education card                                                 |
| `navLinks`           | Nav + footer links                                             |

Each project supports `problem`, `architecture[]`, `results[]`, `learned` and `stack[]`, which
render as the case study. `results[0]` doubles as the headline on the card.

To swap the downloadable resume, replace `public/resume.pdf`.

### Content rule

Everything in `resume.js` should trace back to something real. The `results` fields in particular
are shown as measured outcomes, so do not add numbers that are not genuine.

## Sections

1. **Hero**: role eyebrow, name, tagline, CTAs, and a canvas node-field backdrop
2. **About**: prose, animated stat counters, education, currently exploring
3. **Experience**: tablist timeline; select a role to reveal its work and stack
4. **Projects**: filterable cards, each opening a Problem / Architecture / Results / Learned modal
5. **Toolkit map**: tools by pipeline stage, with a live detail rail on hover or tap
6. **Stack**: grouped technologies, each with a note on how it was used
7. **Contact**: CTA, direct channels, GitHub link

## Deploying

Pushing to `main` is the whole workflow:

```bash
git add -A
git commit -m "Update content"
git push
```

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes on every push.
It derives the Vite `base` path from the repo name, so renaming the repo (including to
`M-ARHAM-KHAN-07.github.io`) needs no config change.

Pages source is set to **GitHub Actions** under Settings → Pages.

## Accessibility and performance notes

- Semantic landmarks, skip-to-content link, and a visible focus ring on every interactive element
- The experience timeline is a real `tablist` with arrow-key roving focus
- The project modal traps Tab, closes on Escape, and restores focus to the trigger
- Stack notes are visible by default and only collapse behind hover where a fine pointer exists,
  so touch users are never locked out of the content
- All text tokens meet WCAG AA against the page background (verified: muted 5.29:1)
- `prefers-reduced-motion` disables reveals, transitions and the canvas animation loop
- The hero canvas caps DPR at 2, scales node count to viewport area, and stops its RAF loop when
  scrolled out of view or the tab is hidden
