# portfolio_with_sanity — Studio v3 (TypeScript)

Sanity Studio v3 for the `portfolio_with_sanity` project, written in
TypeScript.

Connects to the same Sanity project/dataset as before:
- projectId: `401mjdck`
- dataset: `production`

## Getting started

```
npm install
npm run dev
```

This starts the Studio locally (default: http://localhost:3333).

Other scripts:

```
npm run build            # production build
npm run typecheck        # run tsc without emitting files
npm run deploy            # deploy the Studio to sanity.studio
npm run deploy-graphql    # deploy a GraphQL API for this dataset
```

## TypeScript setup

- `tsconfig.json` — strict-mode config matching what the Sanity Studio v3
  Vite-based bundler expects (`moduleResolution: "Bundler"`, `jsx:
  "react-jsx"`, `noEmit: true` — the Studio's own build step compiles/bundles
  everything, `tsc` here is only used for type-checking via `npm run
  typecheck`).
- `@types/react` / `@types/react-dom` added as dev dependencies to match the
  installed React 19 version.
- `sanity.config.ts` / `sanity.cli.ts` — renamed from `.js`, typed via
  `defineConfig` / `defineCliConfig`.
- `schemaTypes/*.ts` — renamed from `.js`; `schemaTypes/index.ts` types the
  exported array as `SchemaTypeDefinition[]`.

## Known follow-up

`experiences.ts` embeds `workExperience` (a document type) directly inside
an array — carried over as-is from the original schema. If you hit schema
validation issues around this, switch it to a reference:
`{type: 'reference', to: [{type: 'workExperience'}]}`.
