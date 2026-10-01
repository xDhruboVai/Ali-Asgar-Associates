# Ali Asgar & Associates — website

Portfolio site for Ali Asgar & Associates (Consulting · Engineering · Planning), Lalmatia, Dhaka.
Next.js 16 (App Router, TypeScript), plain CSS, data from Supabase.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server                    |
| `npm run build`     | Production build (fetches Supabase)   |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TS) |
| `npm run typecheck` | Route type generation + `tsc`         |

### Environment

| Variable                               | Notes                                                     |
| -------------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL                                      |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key — read-only access                 |
| `NEXT_PUBLIC_SITE_URL`                 | **Placeholder.** Production domain, for sitemap and SEO.  |

## Pages

- `/` — hero, statement, services, turnkey journey, selected projects, practice, clients, contact
- `/projects` — every project, filterable by sector and status (`/projects?category=industrial` links work)
- `/projects/[slug]` — images and technical data for one project (static, one page per project)
- `/services` — the five service lines in the firm's order of priority
- `/practice` — background, principal, team, clients, registrations
- `/contact` — telephone, email, office address

Pages are generated statically and refreshed from Supabase at most once an hour.

## Design and motion

"Drawn, then built": the site is laid out like a drawing sheet.

- Palette from the logo: warm drafting-paper surfaces, ink, one red accent (`--red` in `src/app/globals.css`).
- Type: Archivo (variable width, condensed for display), an Instrument Serif italic for one accent per
  headline, and Geist Mono for annotations (sheet numbers, labels, metadata). Each page has a sheet
  number (A-000 home, A-100 projects …) shown in the head and in the footer's title block.
- Imagery is only the firm's own project renders from Supabase. The home hero stands five of them on a
  ground line, like an elevation.
- Motion: GSAP with ScrollTrigger, and Lenis for smooth scrolling (the only smooth-scroll engine).
  `src/components/Motion.tsx` holds the whole system; markup opts in with data attributes
  (`data-words`, `data-reveal`, `data-line`, `data-clip`, `data-parallax`, `data-speed`, `data-expand`,
  `data-count`, `data-hscroll`, `data-marquee`). Headings are split into words on the server by
  `<Words>`, so screen readers get the unsplit text and nothing depends on JavaScript.
  `Hero.tsx` runs the opening sequence; `Cursor.tsx` adds the "View" label and magnetic buttons on fine
  pointers. Page transitions and the card-to-case-study image morph use React `<ViewTransition>`.
- Under `prefers-reduced-motion` no animation or smooth scrolling runs and everything renders in its
  final state; the pinned turnkey journey becomes a grid and the client marquee a wrapped list.
- Hidden starting states only apply under the `motion` class, which the head script removes again if
  the motion script has not started within three seconds.
- No Three.js: shader distortion would warp the building renders, which need to read accurately.

## Where content comes from

| Content                                   | Source                                                      |
| ----------------------------------------- | ----------------------------------------------------------- |
| Company, contact, projects, images, team, clients, registrations | Supabase tables                      |
| Services and the turnkey journey          | `src/lib/services.ts`, from the firm's handwritten brief    |
| About text, principal's earlier experience | `src/lib/content.ts`, from the 2016 corporate profile      |

### Data handling (`src/lib/normalize.ts`)

The `projects` table has duplicate rows for the same building and 20 image-only rows with
category `General`. The site:

- merges rows with the same name (ignoring case, punctuation, "Ltd" and the "Fashon" misspelling);
- combines categories, so a building listed as both industrial and assessment shows both;
- attaches `General` images to the matching project, or to the client gallery on `/practice`;
- shows remaining `General` rows as **Other work**, marked "further details not yet published";
- corrects recurring typos in stored text ("Bldgding", "Share Wall", "Suficient", "Syatem").

For privacy the site does not publish private individuals' names as clients, the proprietor's
personal TIN, or the bank account (the database does not expose `bank_account` to the public role).

## Database

`supabase/migrations/20261001000000_public_read_access_for_website.sql` — **applied**. Enables RLS
and grants read-only access to the public role.

`supabase/suggested-data-fixes.sql` — **not applied**. Fills in the 20 `General` rows from the 2016
profile so they appear under the right sector. Review, set statuses, then run.
