# AGENTS.md

This repository powers [the Loongson Hobbyists' Community portal](loongfans.cn). Use this document as the maintainer‑preferred guide for automated changes.

## Key expectations

- Keep changes minimal and scoped.
- One logical change per commit (no unrelated edits in the same commit).
- Prefer type‑safe and data‑driven edits.
- Avoid reformatting unrelated files.
- Review diffs for unrelated changes before finalizing.
- Update this AGENTS.md when architectural changes occur.

## Project overview

- Site framework: VitePress (Vue 3).
- Language: TypeScript (ESM).

High level project layout:

- `data/`: YAML data sources (chips, devices, OS, events).
- `pages/`: Chinese Markdown content.
- `pages/en/`: English Markdown translations.
- `pages/public/`: static assets (images, localized public files).
- `src/client/`: Vue components, stores, and client utilities.
- `src/node/`: build‑time plugins, scripts, and routes (including `loongfans-data`).
- `src/types/`: shared TypeScript types.

## Common commands (pnpm)

- Install: `pnpm i`
- Dev server: `pnpm run dev`
- Build: `pnpm run build`
- Typecheck: `pnpm run typecheck`
- Lint:
  - ESLint: `pnpm run eslint`
  - Markdown: `pnpm run lintMarkdown`
  - Prettier check: `pnpm run lintPrettier`
  - Prettier fix: `pnpm run prettier`

Run the minimal set needed for the touched area (e.g., Markdown lint for Markdown edits, typecheck for TS changes).

## Content and data workflows

### Chips / devices / OS data

- Source of truth is YAML in `data/`.
- Avoid editing generated artifacts; update the YAML and let the virtual module system regenerate.
- Chip pages are dynamic routes; do not manually mirror data into page files unless the existing patterns require it.

### Device pages refactor status

- Device pages are in the middle of a refactor to move page contents into device data.
- Status quo:
  - Device metadata lives in `data/devices/` which is data source for the `devices.md` page and `DeviceIndex` component.
  - Existing device pages still live in `pages/devices/` and `pages/en/devices/`.
- When updating device content, prefer editing the YAML data and follow the established patterns until the refactor completes.

### Event data (biweekly)

- `data/events/biweekly.yml` is typed and validated during build.
- `data/events/events.ics` is a hand‑managed data source. Use careful editing per the guidance in `data/events/README.md` and verify diffs for unexpected changes.
- If updating biweekly data programmatically, use the existing script: `pnpm run editBiweeklyEvents`.

### Translation workflow

- Follow [the translation guide](./docs/translation-guide.md) exactly for translating content into English.
- Refer to [the glossary](./docs/glossary.md) for jargons.

## Code style and conventions

- Keep type safety intact; avoid `any` unless unavoidable.
- Follow the existing patterns in `src/` and `types/`.
- Prefer explicit data transformations over complex lodash chains (tree‑shaking friendly patterns are used in this repo).
- Use Prettier and ESLint defaults; do not introduce new formatting rules without discussion.

## Commit message style

Commits in this repo follow the Conventional Commits format:

```plain
<type>(<scope>): <summary>
```

Guidelines:

- Use a single, imperative, present‑tense summary (no trailing period).
- Keep the summary concise and specific (about 50–72 characters when possible).
- Scope should match the primary area touched (e.g., `data`, `i18n`, `devices`, `biweekly`).
- Follow the "one logical change per commit" rule, like the Linux kernel.
  - Refactor first, features or fixes later. Do not combine unrelated changes in one commit.
  - Must not make multi‑item changes except if the change is absolutely monolithic.
  - Use bullet lists in the commit message body for enumerating the details of a change. Only use this format for documenting large refactors that cannot be further split.
- Include a body when needed to explain motivation, key changes, or follow‑ups.
- Separate body from summary with a blank line; wrap body lines around 72 characters.
- If a commit is made by an LLM agent, the agent must:
  - Reproduce the prompt in the end of commit message body:
    - `Original prompt:`
    - newline
    - Markdown fenced code block of type `plain` containing the prompt
  - Disclose its identity with a trailer line: `Co-authored-by: <agent model name>`

Observed body patterns in this repo:

- One or more short paragraphs explaining the motivation and what changed.
- Optional references on their own lines, e.g. `Fixes: <sha>` or `See: <url>`.
- Occasional `NOTE:` paragraphs to call out automation or review details.

Examples: `fix(i18n): handle undefined values`, `refactor(data): migrate device metadata to YAML format`.

## Validation checklist (choose what applies)

- ✅ `pnpm run typecheck` for TS/Vue changes
- ✅ `pnpm run eslint` for code changes
- ✅ `pnpm run lintMarkdown` for Markdown edits
- ✅ `pnpm run build` for deeper refactors or data pipeline changes

## Notes on dev server behavior

VitePress HMR is enabled, but dynamic route metadata may not update when data files are added or removed. Restart the dev server if route titles or page lists do not refresh.
