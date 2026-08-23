# portfolio_with_sanity

This repo is Jaffer Sunny's personal portfolio site: a React frontend backed by a Sanity.io content studio. It's a two-package monorepo with no shared root `package.json` — each half is installed and run independently.

```
portfolio_with_sanity/
├── frontend_react/     # the public-facing site (Vite + React + TypeScript + Tailwind CSS)
└── backend_sanity/     # the Sanity Studio + schema (content management)
```

## backend_sanity — Sanity Studio

Sanity project ID: `401mjdck`. Dataset: `production`. Studio config lives in `sanity.config.ts` (studio title/plugins) and `sanity.cli.ts` (project id/dataset used by the CLI). Schema types are defined under `schemaTypes/`, one file per document type, aggregated in `schemaTypes/index.ts`.

Run the studio locally: `cd backend_sanity && yarn install && yarn dev` (or whatever script `package.json` defines — check there; the studio serves a local admin UI for editing content, separate from the frontend).

### Content model (document types)

- **`abouts`** — `title` (string), `description` (string), `imgUrl` (image). Powers the "I Know That Good Dev Means Good Business" section on the frontend.
- **`works`** — `title`, `description`, `projectLink`, `codeLink` (all string), `imgUrl` (image), `tags` (array of strings, e.g. `#Fullstack`). Powers the portfolio/work grid, including the tag-based filter buttons.
- **`certifications`** — same shape as `works` minus `codeLink`, plus `certificationLink` instead of `projectLink`. Powers the certifications grid.
- **`skills`** — `name`, `bgColor` (string, e.g. a hex color for the icon's circular background), `icon` (image).
- **`experiences`** — `year` (string), `works` (array of inline `workExperience` objects — see note below).
- **`workExperience`** — `name`, `company`, `desc` (all string). Used inline inside `experiences.works`, not as a standalone browsable document in normal use.
- **`testimonials`** — `name`, `company`, `imageurl` (image — note the field name is lowercase/no-camel, unlike every other image field which is `imgUrl`), `feedback` (string).
- **`brands`** — `imgUrl` (image), `name` (string). The logo strip shown under testimonials.
- **`contact`** — `name`, `email` (string), `message` (text). Written to, not read — the frontend's contact form creates one of these documents per submission via `client.create()`. There's no schema-level email notification; submissions just land in the dataset and must be checked manually in the Studio.

Known schema oddity: `experiences.works` embeds `workExperience` (a `document` type) directly in an array (`of: [{type: 'workExperience'}]`) rather than using `{type: 'reference', to: [{type: 'workExperience'}]}`. This was carried over as-is from the original v2 schema during a later cleanup pass — it works, but if Studio validation ever complains about embedding documents inline, that's the first thing to look at.

## frontend_react — the site

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS (migrated from Create React App + SCSS in August 2026 — see "Migration history" below for what changed and why).

### Structure

```
src/
├── main.tsx              # entry point (was index.js)
├── App.tsx                # top-level page, assembles every section in order
├── client.ts              # Sanity client + urlFor() image builder
├── vite-env.d.ts          # Vite env var types + asset module declarations
├── types/sanity.ts         # TS interfaces mirroring the Sanity schema (About, Work, Skill, etc.)
├── constants/
│   ├── images.ts           # all local image imports (logos, tech icons, backgrounds)
│   └── index.ts
├── components/
│   ├── Navbar/Navbar.tsx    # top nav bar + mobile slide-out menu
│   ├── NavigationDots.tsx   # right-hand side scroll-position dots
│   ├── SocialMedia.tsx      # left-hand side social icon column
│   └── index.ts
├── wrapper/
│   ├── AppWrap.tsx          # HOC: wraps a section with id, SocialMedia, NavigationDots, copyright footer
│   ├── MotionWrap.tsx       # HOC: wraps a section's content in a framer-motion fade/slide-in, and gives it flex-1 w-full flex-col layout
│   └── index.ts
└── container/               # one folder per page section, each default-exported already wrapped in AppWrap(MotionWrap(...))
    ├── Header/               # hero section — no MotionWrap (doesn't need the scroll-in animation), only AppWrap
    ├── About/
    ├── Work/                 # has the Fullstack/Web App/Mobile App/React JS/All tag filter
    ├── Skills/                # skills icons + experience timeline with react-tooltip
    ├── Testimonial/           # carousel + brand logo strip
    ├── Certifications/        # same shape as Work but the tag-filter buttons aren't rendered (dead state left over from the original code)
    └── Footer/                # contact cards + the contact form that writes to Sanity
```

Section order on the page (see `App.tsx`): Navbar → Header → About → Work → Skills → Testimonial → Certifications → Footer.

### Styling approach

There is no SCSS anywhere in this project anymore. Styling is Tailwind utility classes written inline in each component, plus a small set of shared classes defined via `@layer components` in `src/index.css`:

- `app__flex` — `flex justify-center items-center` (the old BEM-ish name was kept because it's used so pervasively; it's just a Tailwind `@apply` shortcut now, not real BEM/SCSS).
- `head-text`, `p-text`, `bold-text` — the three recurring text styles (section headings, body paragraphs, bold labels), including their responsive size variants.
- `app__container`, `app__wrapper`, `copyright`, `app__social`, `app__navigation`, `app__navigation-dot`, `app__whitebg`, `app__primarybg` — layout/background classes used by `AppWrap`.

Custom Tailwind theme (`tailwind.config.ts`): brand colors (`primary`, `secondary`, `light-purple`, `app-black`, `light-gray`, `app-gray`, `brown` — matching the site's original CSS custom properties), a `base` font family (DM Sans), and a custom `3xl` breakpoint at `2000px` (the original design had special-cased styles for very large/4K screens).

**Important gotcha:** section container classNames like `app__about`, `app__skills`, `app__works`, etc. (passed as the second argument to `MotionWrap(Component, "app__about")`) are **not** real Tailwind/CSS classes — they're inert strings now. The actual `flex-1 w-full flex-col` layout for every section comes from `MotionWrap.tsx` itself, which appends those utility classes unconditionally. If a section's content is ever laying out in a row when it should stack in a column, that HOC is the first place to check — don't try to "fix" it by defining a `.app__about { ... }` class, since `MotionWrap` already handles this for every section uniformly.

### Environment variables

Vite only exposes env vars prefixed `VITE_` to client code (via `import.meta.env`, not `process.env`). Required in `frontend_react/.env` (gitignored, not committed):

```
VITE_SANITY_PROJECT_ID=401mjdck
VITE_SANITY_TOKEN=<a Sanity API token>
```

Get/manage tokens at sanity.io/manage → the `401mjdck` project → API → Tokens. Use a **Viewer** token — the frontend only reads content aside from the contact form, which calls `client.create()` to write a `contact` document; a Viewer-only token will make that write silently fail (or throw), so if the contact form stops working the first thing to check is whether the token actually has write permission. Token values are shown by Sanity only once at creation time and can never be retrieved again — if it's lost, revoke and generate a new one. Never use an Administrator/Access-Manager-level token here; it ships inside the public JS bundle.

`.env` cannot be written through the Cowork remote-device bridge (blocked for security) — any future automated change to it needs to be applied by hand on the machine.

### Commands

```
yarn install     # first-time setup, or after dependency changes
yarn dev         # local dev server (Vite, default http://localhost:5173)
yarn build       # type-checks (tsc -b) then produces a production build in dist/
yarn preview     # serve the production build locally
```

## Migration history (CRA → Vite, JS → TS, SCSS → Tailwind)

As of August 2026 this frontend was migrated off Create React App onto Vite, off plain JS onto strict TypeScript, and off SCSS onto Tailwind CSS. Reasons and details worth knowing:

- The original CRA setup used `node-sass`, which is deprecated and fails to build on modern Node/Python toolchains (its native binding needs Python's `distutils`, removed in Python 3.12+). That was the original trigger for looking at the stack at all.
- The migration was done as a full rewrite of `frontend_react/src` rather than an incremental port. Sanity image URLs are built via `urlFor(...).url()` (explicit `.url()` call added for TypeScript's sake — the old JS code relied on the builder object's implicit `toString()`).
- `react-tooltip` was upgraded from v4 to v5 as part of the move (`Skills.tsx`), which changed its API from `data-tip`/`data-for` + `<ReactTooltip>` to `data-tooltip-id`/`data-tooltip-content` + `<Tooltip>`.
- A few genuinely dead/no-op pieces of the original code were dropped rather than faithfully ported, since TypeScript's `noUnusedLocals`/`noUnusedParameters` (both on in `tsconfig.app.json`) would otherwise fail the build on them: an unused `handleWorkFilter`/`activeFilter` pair in the old `Certifications.jsx` that had no corresponding UI.
- Old CRA-era files (`.jsx`, `.scss`, the old `client.js`, old `index.js`/`App.js`, old `yarn.lock`) were moved into `frontend_react/_to_delete/` rather than deleted outright, and that folder is `.gitignore`d. **This folder should be deleted by hand once the new stack is confirmed stable** — nothing in the active app references it.
- `public/index.html` (the CRA template) was replaced by a root-level `index.html` (the Vite convention — Vite serves from the project root, not from `public/`). The old one also got moved into `_to_delete/`.

## Known rough edges / things to watch

- `About`, `Certifications`, and `Testimonial` sections can render empty on the frontend if those document types have no published entries in the `production` dataset — that's a content gap in Sanity, not a frontend bug, if it comes up again.
- The Certifications section's UI never actually exposed a tag filter (unlike Work, which has one) — this matches the original design, not an oversight in the migration.
- `experiences.works` schema oddity (embedded `workExperience` documents instead of references) — see backend section above.
