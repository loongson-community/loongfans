# Biweekly: Render Both Renditions in Every Locale — Roadmap

Goal: every locale's biweekly page renders both the Mandarin Chinese rendition
(zhBiweekly) and the English/Russian rendition (enBiweekly) side by side.

## Commit sequence (one logical change per commit)

### 1 — Calendar data model

1. **`EventCalendar.vue`**: change `eventByDateID` from `keyBy` (single event)
   to group-by (`Record<string, EventItem[]>`), keeping emit unchanged for now.
2. **`EventCalendar.vue`**: change emit type from `EventItem | null` to
   `EventItem[]`.
3. **`EventCalendar.vue`**: add kind-based bar/highlight colors — zhBiweekly
   stays `theme-red`, enBiweekly gets `theme-blue`.
4. **`EventCalendar.vue`**: change the initial auto-selection to emit both
   next-events (one per kind) so both renditions are visible on load.

### 2 — Container component

1. **`EventAnnouncementContainer.vue`**: remove the `includeKinds` prop;
   hardcode filtering to `["zhBiweekly", "enBiweekly"]`.
2. **`EventAnnouncementContainer.vue`**: change `thisEvent` from
   `Ref<EventItem | null>` to `Ref<EventItem[]>`, update the template to
   use `v-for`.

### 3 — Page wiring

1. **All 5 `biweekly.md` pages**: drop the `include-kinds` prop.

### 4 — Prose updates

1. **`pages/biweekly.md`**: add paragraph about EN/RU rendition.
2. **`pages/en/biweekly.md`**: restructure prose to describe both renditions.
3. **`pages/ru/biweekly.md`**: add paragraph about EN/RU rendition.
4. **`pages/fr/biweekly.md`**: add paragraph about EN/RU rendition.
5. **`pages/de/biweekly.md`**: add paragraph about EN/RU rendition.

## Files touched

- `src/client/components/events/EventCalendar.vue`
- `src/client/components/events/EventAnnouncementContainer.vue`
- `pages/biweekly.md`
- `pages/en/biweekly.md`
- `pages/ru/biweekly.md`
- `pages/fr/biweekly.md`
- `pages/de/biweekly.md`

No changes to data files, types, locale strings, or build plugins.

## Validation

Each phase should pass `pnpm run typecheck`, `pnpm run eslint`, and Phase 4
passes `pnpm run lintMarkdown`. Full `pnpm run build` after Phase 4.
