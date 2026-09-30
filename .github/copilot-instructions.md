# Copilot instructions for Ali Asgar & Associates

## Project overview

This is the public website for Ali Asgar & Associates, built with Next.js 16, React 19, TypeScript, and the App Router. It is a statically rendered portfolio and company-information site whose dynamic content is read from Supabase.

## Commands

Run these from the repository root:

```bash
npm install
copy .env.example .env.local
npm run dev
```

The local development site is available at `http://localhost:3000`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create the production build; this reads project/company data from Supabase |
| `npm run start` | Serve a completed production build |
| `npm run lint` | Run ESLint with Next.js Core Web Vitals and TypeScript rules |
| `npm run typecheck` | Generate Next.js route types, then run `tsc --noEmit` |

There is currently no test script, test framework, or test-file suite in this repository, so there is no single-test command. For a focused validation of a page or component, use `npm run dev` and exercise the relevant route in the browser; run `npm run lint` and `npm run typecheck` for code changes.

Required local environment variables are documented in `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (use the production domain for canonical URLs, sitemap, and social metadata)

## Architecture

- `src/app/` contains App Router routes. The site exposes the home page, project index, dynamic project pages, services, practice, contact, sitemap, robots metadata, and error/not-found pages.
- Route pages are server components by default. Pages export `revalidate = 3600`, so Supabase-backed content is statically generated and refreshed at most once per hour. The dynamic project route uses `generateStaticParams()` and `generateMetadata()`.
- `src/lib/supabase.ts` creates the read-only public Supabase client from environment variables. Do not introduce writes through this client or expose privileged credentials.
- `src/lib/data.ts` is the data-access boundary. It selects only the fields needed by the UI, throws explicit errors for failed queries, caches repeated reads with React `cache`, and passes project data through normalization before rendering.
- `src/lib/types.ts` distinguishes raw Supabase row shapes (`*Row`) from normalized UI shapes (`Project`, category IDs, grouped clients/team).
- `src/lib/normalize.ts` is a core domain layer, not just formatting. It merges duplicate project rows, attaches image-only rows, assigns stable slugs, maps database categories/statuses, cleans recurring source-data typos, and filters private individual client names. Keep changes here aligned with the README's data-handling rules.
- `src/lib/services.ts` and `src/lib/content.ts` hold curated, non-database editorial content. Services are intentionally ordered A–E according to the firm's brief.
- `src/components/` contains shared UI. `SiteHeader`, `ProjectsBrowser`, and the error boundary are client components; most presentation components remain server-compatible.
- Styling is centralized in `src/app/globals.css`; the project does not use a component CSS framework.
- `supabase/` contains the applied public read-access migration and a suggested data-fix script. `Context/schema.sql` is reference-only schema context and is not an execution migration.

## Conventions and repository-specific rules

- Use the `@/*` import alias for modules under `src/*`.
- Prefer server-side data loading in route pages and `src/lib/data.ts`. Add `'use client'` only when browser state, event handlers, or browser APIs are required.
- Keep Supabase selects explicit. The public role has read-only access, and `company_profile.bank_account` must not be selected or published.
- Treat privacy filtering in `publicClientName()` and `getLicenses()` as a publication requirement: do not bypass it when adding client or registration displays.
- Project data is intentionally messy. Reuse `normaliseProjects()` and its helpers rather than deduplicating, slugifying, or cleaning rows independently in a page/component.
- Categories are represented by the `CategoryId` union and the `CATEGORIES` table in `normalize.ts`; database labels are mapped through that table. When adding a category, update the mapping and any related UI/service references together.
- Image URLs come from Supabase Storage and may contain spaces or ampersands. Continue to pass them through `safeImageUrl()` and keep remote-image configuration in `next.config.ts` synchronized with the storage host.
- Project filters are client-side in `ProjectsBrowser`. The `?category=` query parameter is read in the browser and updated with `history.replaceState`; preserve the server-rendered full list and the accessible filter/status controls.
- Use the existing `Project`, `ClientGroup`, and `TeamGroup` normalized types at component boundaries instead of passing raw Supabase rows into UI components.
- Route metadata, sitemap URLs, and social previews depend on `NEXT_PUBLIC_SITE_URL`; keep its fallback behavior in `src/lib/site.ts` in mind when changing deployment or SEO behavior.
- Content that comes from the firm's brief/profile belongs in the curated lib files, while database-backed company, team, client, project, and image records belong in Supabase.
- SQL under `supabase/migrations/` records applied database changes. `supabase/suggested-data-fixes.sql` is explicitly not applied; review its changes and statuses before running it.

## Validation expectations

For TypeScript, route, data, or component changes, run:

```bash
npm run lint
npm run typecheck
```

Run `npm run build` when changing route generation, metadata, Supabase queries, image configuration, or other production-rendering behavior. The build requires valid Supabase environment variables and reachable read access.
