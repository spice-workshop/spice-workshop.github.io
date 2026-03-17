# SPiCE Conference Website

A single-page application for the SPiCE Conference, built with React 19, TypeScript, Vite, and Tailwind CSS. Deployed to GitHub Pages.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Scripts

| Command             | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | Start Vite dev server                                              |
| `npm run build`     | Run prebuild scripts (sitemap + CSV sanitization), then Vite build |
| `npm run lint`      | Run ESLint                                                         |
| `npm run preview`   | Serve production build locally                                     |
| `npm run deploy`    | Build and push to GitHub Pages (`main` branch)                     |

## Branching & Deployment

- **`source`** — development branch (all source code lives here)
- **`main`** — deploy target (built output pushed by `npm run deploy` via `gh-pages`)

## Project Structure

```
src/
├── App.tsx                    # Router setup with lazy-loaded pages
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind directives
│
├── pages/                     # Route-level components
│   ├── Home.tsx               # Landing page
│   ├── Schedule.tsx           # Conference schedule (day/event views)
│   ├── Participants.tsx       # Speaker & participant directory
│   ├── Logistics.tsx          # Travel, accommodation, venue info
│   ├── Sightseeing.tsx        # Local sightseeing recommendations
│   └── NotFound.tsx           # 404 catch-all
│
├── components/
│   ├── home/                  # HeroCarousel, CommitteesSection, PartnersSection, DescriptionContent
│   ├── layout/                # Navigation, Footer, SEO (react-helmet-async)
│   ├── schedule/              # ScheduleDayCard, ScheduleEventRow, SpecialEventCard
│   └── ui/                    # Button, Card, Modal, ErrorBoundary, Loading, ScrollToTop, etc.
│
├── data/
│   ├── Constants.tsx          # Site-wide config: dates, venue, links, committees, partners
│   ├── participants.json      # Sanitized participant data (generated, committed)
│   ├── participants.csv       # Raw participant data (gitignored, sensitive)
│   ├── lunchPlaces.json       # Lunch venue recommendations
│   ├── PartnerData.ts         # Partner/sponsor definitions
│   └── SightseeingData.ts     # Sightseeing spots with categories
│
├── utils/
│   ├── csvLoader.ts           # useParticipants() — useMemo-based hook loading participants.json
│   ├── useSchedule.ts         # useSchedule() — transforms participants into DaySchedule[]
│   ├── useTheme.ts            # useTheme() — dark mode toggle (class strategy, localStorage)
│   └── generateSchedulePDF.ts # PDF export via jsPDF + autotable
│
├── types/
│   ├── Participant.ts         # Participant/speaker type definitions
│   └── Schedule.ts            # EnrichedScheduleEvent, DaySchedule, etc.
│
└── assets/                    # Images, logos, PDFs

scripts/
├── generate-sitemap.cjs       # Generates public/sitemap.xml (runs during prebuild)
└── sanitize-participants.cjs  # participants.csv → participants.json (runs during prebuild)

public/                        # Static files served at root
├── sitemap.xml
├── robots.txt
├── spice-logo.png
├── spice2-conference.ics      # iCalendar export
└── dinner-menu.pdf
```

## Data Pipeline

```
participants.csv (gitignored, sensitive)
  → scripts/sanitize-participants.cjs (prebuild)
    → src/data/participants.json (committed)
      → useParticipants() hook
        → useSchedule() hook → DaySchedule[] → Schedule UI
```

The CSV contains sensitive fields that are stripped during sanitization. Only the sanitized JSON is committed to the repo. Both prebuild scripts (sitemap generation and CSV sanitization) run automatically before every `npm run build`.

## How to Modify

- **Site config** (dates, venue, links, committees): `src/data/Constants.tsx`
- **Participant data**: Update `src/data/participants.csv` and rebuild
- **Schedule structure**: `src/utils/useSchedule.ts` (event classification, highlight colors)
- **Sightseeing / lunch places**: `src/data/SightseeingData.ts`, `src/data/lunchPlaces.json`
- **Styles**: Tailwind classes in JSX, or `src/index.css` for globals. Custom theme in `tailwind.config.js` (indigo/amber palette, custom shadows, animations).

## Linting

```bash
npm run lint
```

> **Note:** The ESLint config does not include a TypeScript parser, so `.ts`/`.tsx` files will show parse errors during linting. The Vite/TypeScript build (`npm run build`) passes cleanly regardless.

## Commit Messages

Format: `[Category] Description`

| Category     | Use for                                              |
| ------------ | ---------------------------------------------------- |
| `[Feature]`  | New feature (page, component, functionality)         |
| `[Fix]`      | Bug fix                                              |
| `[Style]`    | Formatting, whitespace — no logic changes            |
| `[Refactor]` | Code restructuring — no new features or bug fixes    |
| `[Docs]`     | Documentation only                                   |
| `[Chore]`    | Build process, tooling, dependencies                 |

Examples:
- `[Feature] Add speaker profile page`
- `[Fix] Correct navigation link on mobile`
- `[Chore] Update participant data and sanitize script`
