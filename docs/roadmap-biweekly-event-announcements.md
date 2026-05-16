# Roadmap: tagged biweekly event announcements

This is a throwaway implementation roadmap for adding the English/Russian
rendition of LoongArch Biweekly to the events page. The goal is to commit the
plan first, with the long prompt context attached here and in the commit
message, so later implementation commits can use short prompts and concise
commit messages.

## Direction

Refactor the current single-announcement biweekly page into a generic event
calendar plus tagged announcement rendering. `events.ics` remains the source of
truth for dates, but each relevant `SUMMARY` gains a stable tag such as
`[zhBiweekly]` or `[enBiweekly]`. The calendar strips the tag for display, while
`EventAnnouncementContainer` uses the tag of the active event to render the
right-pane component for that specific event kind.

Keep `zhBiweekly` intact as the name for the Chinese rendition of LoongArch
Biweekly. Introduce `enBiweekly` for the English/Russian rendition.

## Phase 0: roadmap commit

1. Commit this roadmap document before code or data changes.
2. Keep this commit limited to `docs/roadmap-biweekly-event-announcements.md`.
3. Include the long prompt context in the commit message footer for this
   roadmap commit.
4. For later implementation commits, reference this roadmap and use the short
   implementation prompt instead of repeating the long planning prompts.

Suggested commit summary:

```plain
docs(events): add biweekly events refactoring roadmap
```

## Phase 1: naming and calendar shell

1. Rename `src/client/components/events/BiweeklyCalendar.vue` to
   `EventCalendar.vue` and update imports in
   `src/client/components/events/EventAnnouncementContainer.vue`.
2. Genericize calendar-only names. Props should accept event items rather than
   `BiweeklyEventsResult`, and emits should become `eventSelected` instead of
   `biweeklySelected`.
3. Keep the v-calendar styling and interaction model unchanged.
4. Update locale/component comments in `src/common/locales/zh.ts`,
   `src/common/locales/en.ts`, and the events component code to document that
   `zhBiweekly` means the Chinese rendition of the biweekly, not a stale prefix
   to remove. Add matching `enBiweekly` naming for the English/Russian
   rendition.

## Phase 2: ICS tags and event discovery

1. Update `data/events/events.ics` so LoongArch Biweekly summaries carry
   explicit render tags, for example `[zhBiweekly] 龙架构双周会` and
   `[enBiweekly] LoongArch Biweekly (EN/RU)`. Preserve recurrence/date data.
2. Refactor `src/client/components/events/dataSource.ts` so
   `expandEventsFromICS` returns event items with `kind`, stripped display
   `title`, raw title, start date, issue/session number within that kind, and
   future/next flags.
3. Replace the current hardcoded Chinese title filter with a tag parser.
4. Ignore unknown or untagged events on the current biweekly page until a
   component is registered for them.
5. Keep issue/session numbering per tag so `zhBiweekly` issue 1 and
   `enBiweekly` session 1 do not collide.

## Phase 3: typed link and resource model

1. Extend `src/types/data.ts` with resource-oriented types instead of
   platform-specific flat fields.
2. Use typed resource entries for live/current links and archive links, with
   discriminated `type` values such as `wemeet`, `kdocs`, `googledocs`, `zoom`,
   `zoomChat`, `bilibili`, `youtube`, and `vk`.
3. Represent current links as arrays:

   ```yaml
   links:
     - { type: "wemeet", number: "xxx-xxxx-xxxx", link: "xxx" }
     - { type: "kdocs", id: "xxx" }
     - { type: "googledocs", link: "xxxx" }
   ```

4. Represent archive resources similarly under per-issue or per-session archive
   entries.
5. Include a way to represent WIP or unavailable resources, needed for the VK
   archive line.
6. Migrate `data/events/biweekly.yml` to keyed event-kind data. `zhBiweekly`
   retains current Tencent Meeting, KDocs, Bilibili live, and Bilibili archive
   data. `enBiweekly` receives Zoom, Zoom chat, Google Slides, Bilibili replay,
   YouTube replay, and VK/WIP data for session 1.
7. Update `src/node/plugins/loongfans-data/generateDatabase.ts` only as needed
   for the new TypeScript shape. Keep the existing Ajv schema validation
   pipeline.

## Phase 4: announcement components

1. Split the right pane of
   `src/client/components/events/EventAnnouncementContainer.vue` into
   event-kind-specific announcement components.
2. Add `EventAnnouncementZhBiweekly.vue` for `zhBiweekly`.
3. Add `EventAnnouncementEnBiweekly.vue` for `enBiweekly`.
4. Keep `EventAnnouncementContainer.vue` responsible for layout, loading
   ICS/YAML data, maintaining active selection, and switching the right-pane
   component based on the selected event's `kind`.
5. Build a small typed registry mapping event kind tags to right-pane
   components. The registry is the future extension point for other event kinds.
6. Let each announcement component own its event-specific copy and resource
   grouping.
7. Preserve existing wording and Tencent/KDocs/Bilibili presentation in
   `zhBiweekly`.
8. Let `enBiweekly` show Zoom participation, Google Slides,
   YouTube/Bilibili/VK archives, and multi-timezone participation rows.
9. Factor shared resource-list rendering into a tiny helper/component only if
   both announcement components would otherwise duplicate meaningful link
   formatting.

## Phase 5: page wiring and copy

1. Keep `pages/biweekly.md` and `pages/en/biweekly.md` using the same
   `EventAnnouncementContainer`.
2. If the Chinese page should show only `zhBiweekly` events and the English page
   only `enBiweekly` events, add an optional `include-kinds` prop to
   `EventAnnouncementContainer` and pass `include-kinds="zhBiweekly"` or
   `include-kinds="enBiweekly"` from the pages.
3. Prefer explicit `include-kinds` filtering over implicit locale filtering.
4. Update `pages/en/biweekly.md` so its prose describes the Wednesday EN/RU
   Zoom-based event rather than a translation of the Sunday Mandarin event.
5. Keep volatile per-session links in YAML.
6. Preserve `pages/biweekly.md` copy unless wording is needed to clarify it is
   the Chinese/Mandarin rendition.

## Phase 6: maintenance tooling and docs

1. Update `src/node/scripts/editBiweeklyEvents/index.ts` and
   `src/node/scripts/editBiweeklyEvents/editor.ts` to understand event kinds,
   defaulting to `zhBiweekly` for backward-compatible Chinese maintenance.
2. Update `.github/workflows/edit-biweekly-events.yml` to accept an optional
   kind/tag input and, if useful, resource-oriented inputs for common edits such
   as Bilibili, YouTube, Zoom, KDocs, Google Docs, and VK.
3. Update `data/events/README.md` to document the tag syntax in ICS summaries,
   the rule that tags are stripped before calendar rendering, and the meaning of
   `zhBiweekly` and `enBiweekly`.

## Relevant files

- `docs/roadmap-biweekly-event-announcements.md`: first committed artifact;
  English roadmap prose plus verbatim original prompts/AIGC footer context.
- `data/events/events.ics`: add `[zhBiweekly]` and `[enBiweekly]` summary tags
  while preserving recurrence data.
- `data/events/biweekly.yml`: migrate to keyed event-kind data with typed
  current/archive resource arrays.
- `src/types/data.ts`: define event kind/resource types and the new data shape.
- `src/client/components/events/dataSource.ts`: parse tags, strip display
  titles, number events per kind, and expose resource lookup helpers.
- `src/client/components/events/EventAnnouncementContainer.vue`: own layout and
  active event switching, not event-specific announcement markup.
- `src/client/components/events/BiweeklyCalendar.vue`: rename to
  `EventCalendar.vue` and genericize calendar-facing names.
- `src/client/components/events/EventAnnouncementZhBiweekly.vue`: new right-pane
  component for the Chinese rendition.
- `src/client/components/events/EventAnnouncementEnBiweekly.vue`: new right-pane
  component for the English/Russian rendition.
- `pages/biweekly.md`: optionally pass `include-kinds="zhBiweekly"`.
- `pages/en/biweekly.md`: optionally pass `include-kinds="enBiweekly"` and
  update EN/RU event prose.
- `src/common/locales/zh.ts` and `src/common/locales/en.ts`: keep
  `zhBiweekly*`, add `enBiweekly*`, and document the naming convention in
  comments.
- `src/node/scripts/editBiweeklyEvents/`: adapt YAML editing automation to
  tagged event kinds and resource arrays.
- `.github/workflows/edit-biweekly-events.yml`: keep the maintenance workflow
  usable after the schema migration.
- `data/events/README.md`: document the ICS tag contract and resource array
  model.

## Verification

For the roadmap-only commit:

1. Run `pnpm run lintMarkdown` after adding this document.
2. Inspect `git diff --cached` before committing to confirm only this roadmap
   document is staged.

For the later implementation work:

1. Run `pnpm run typecheck` after the type/data/component refactor.
2. Run `pnpm run eslint` after TS/Vue/script changes.
3. Run `pnpm run lintMarkdown` after page or README edits.
4. Run `pnpm run build` because this touches VitePress pages, virtual data
   generation, ICS parsing, and schema validation.
5. Manually check `/biweekly`: the calendar should show stripped Chinese
   titles, only `zhBiweekly` events if filtered by `include-kinds`, existing
   issue numbering, and Tencent/KDocs/Bilibili behavior intact.
6. Manually check `/en/biweekly`: the calendar should show stripped
   `LoongArch Biweekly (EN/RU)` titles, only `enBiweekly` events if filtered by
   `include-kinds`, session 1 as archived on 2026-05-16, and Bilibili, YouTube,
   and VK/WIP archive resources.
7. Manually select today and several event dates in both calendars to confirm
   `EventCalendar` still initializes the next event and responds correctly to
   day clicks.
8. Inspect the built calendar UI or generated DOM to confirm ICS tags are not
   rendered to users.

## Decisions

- Keep `zhBiweekly` intact; it means the Chinese rendition of LoongArch
  Biweekly.
- Refer to the English/Russian rendition as `enBiweekly`.
- Use explicit ICS summary tags to choose the announcement component, then strip
  those tags before display.
- Use separate right-pane announcement components per event kind, selected by
  `EventAnnouncementContainer`.
- Store current/live and archive links as typed resource arrays instead of flat
  platform-specific fields.
- Keep `events.ics` as the only date source.
- Keep issue/session numbering per event kind.
- Do not add a Russian locale/page in this refactor. The bilingual event can
  live on the existing English page unless a separate Russian site locale is
  requested later.

## Further considerations

1. Split implementation commits into calendar rename, ICS tagging/parser
   support, data model migration, announcement components/page copy, and
   tooling/docs.
2. For `enBiweekly`, derive multi-zone participation rows from the event start
   using configured time zones instead of hardcoding offsets, because DST shifts
   UTC-7/UTC-4 seasonally.
3. Keep resource type names stable and lowercase. User-facing labels should come
   from i18n or explicit resource labels so links can be rendered naturally in
   both announcement components.

## AIGC appendix

Every commit made by an LLM agent for this roadmap should include the
repository-required AIGC disclosure footer at the bottom of the commit message
body. Keep the normal Conventional Commit summary first, and add any explanatory
body above this footer as needed.

For this roadmap commit, use this footer with the full prompt context:

````plain
Original prompt:

```plain
insert original prompt turn by turn

this is the second turn if applicable
```

Co-authored-by: <model name e.g. "GPT-5.5" or "DeepSeek V4 Pro">
````
