<!-- cspell:disable -->
# Ordinal Number Refactoring — Implementation Plan

## Overview

1. Fix the calendar title `"Title #3rd"` bug (should be `"Title #3"`).
2. Extract per-locale `formatXXOrdinal` helpers with gender/case params.
3. Convert the 4 biweekly announcement/archive header keys from string
   templates to function messages that delegate to the helper.
4. Update Vue components to pass raw `{ n }` instead of nested
   `t("ordinalNumber", { n })`.

## Helper signatures

Each locale file gets a module-local helper. Every locale that has the
grammatical category includes the parameter, even if ordinal formatting
does not consume it.

| Locale | Helper name | Signature |
| ------ | ----------- | --------- |
| en | `formatEnOrdinal` | `(n: number): string` |
| zh | `formatZhOrdinal` | `(n: number): string` |
| de | `formatDeOrdinal` | `(n: number, gender?: string, gcase?: string): string` |
| fr | `formatFrOrdinal` | `(n: number, gender?: string): string` |
| ru | `formatRuOrdinal` | `(n: number, gender: string, gcase: string): string` |

The `ordinalNumber` message key in each locale delegates to the helper
and remains exported for API compatibility.

## Commit sequence

### Commit 1 – `fix(events): use cardinal numbers in calendar event titles`

**Problem:** `EventCalendar.vue` calls `t("ordinalNumber", { n })` and passes
the result into `{ number }` for `eventCalendarEvent`. In EN this produces
`"Title #3rd"` — wrong for a counter label.

**Fix:** Pass the raw `issueNumber` instead.

**Files touched:**

- `src/client/components/events/EventCalendar.vue:64`:
  `t("ordinalNumber", { n: be.issueNumber })` → `be.issueNumber`

**Why this is safe for all locales:**

All `eventCalendarEvent` templates already work with bare integers:

| Locale | Template | Before (via ordinal) | After (bare int) |
| ------ | -------- | -------------------- | ---------------- |
| en | `{title} #{number}` | `"Title #3rd"` ✗ | `"Title #3"` ✓ |
| de | `{title} Nr. {number}` | `"Title Nr. 3"` ✓ | `"Title Nr. 3"` ✓ |
| fr | `{title} no {number}` | `"Title no 3"` ✓ | `"Title no 3"` ✓ |
| ru | `{title} № {number}` | `"Title № 3"` ✓ | `"Title № 3"` ✓ |
| zh | `{title}（第 {number} 次）` | `"Title（第 3 次）"` ✓ | `"Title（第 3 次）"` ✓ |

No template changes needed.

---

### Commit 2 – `refactor(i18n): extract formatEnOrdinal helper`

**Files touched:**

- `src/common/locales/en.ts`:
  - Add `formatEnOrdinal(n)` — extract `Intl.PluralRules` ordinal logic
    from the body of `ordinalNumber`.
  - `ordinalNumber` delegates to `formatEnOrdinal` (unchanged external
    API).

No message key changes. No component changes.

---

### Commit 3 – `refactor(i18n): migrate EN announcement headers to formatEnOrdinal`

**Files touched:**

- `src/common/locales/en.ts`:
  - Convert 4 keys (`zhBiweeklyAnnouncementHeader`,
    `zhBiweeklyArchiveHeader`, `enBiweeklyAnnouncementHeader`,
    `enBiweeklyArchiveHeader`) from string templates to function
    messages calling `formatEnOrdinal(n)`.
- `src/client/components/events/EventAnnouncementZhBiweekly.vue`:
  Add `n: event.issueNumber` alongside existing
  `number: t("ordinalNumber", { n: event.issueNumber })`. (×2 call
  sites)
- `src/client/components/events/EventAnnouncementEnBiweekly.vue`:
  Same. (×2 call sites)

**Transitional dual-param strategy:**

Components now pass *both* `{ n, number }`:

- New EN function messages use `named("n")` and ignore `number`.
- Old DE/FR/RU/ZH string templates still use `{number}` from the
  existing `t("ordinalNumber", ...)` call.
- No runtime breakage during the per-locale migration window.

---

### Commit 4 – `refactor(i18n): extract formatZhOrdinal helper`

**Files touched:**

- `src/common/locales/zh.ts`:
  - Add `formatZhOrdinal(n)` (returns `n.toString()`).
  - `ordinalNumber` delegates to `formatZhOrdinal`.

No message key changes. No component changes.

---

### Commit 5 – `refactor(i18n): migrate ZH announcement headers to formatZhOrdinal`

**Files touched:**

- `src/common/locales/zh.ts`:
  - Convert 4 header keys to function messages calling
    `formatZhOrdinal(n)`.

No component changes (dual params already in place from commit 3).

---

### Commit 6 – `refactor(i18n): extract formatDeOrdinal helper`

**Files touched:**

- `src/common/locales/de.ts`:
  - Add `formatDeOrdinal(n, gender?, gcase?)` (returns `n + "."` —
    period IS the German ordinal marker; gender/case accepted but
    ignored).
  - `ordinalNumber` delegates to `formatDeOrdinal`.

No message key changes. No component changes.

---

### Commit 7 – `refactor(i18n): migrate DE announcement headers to formatDeOrdinal`

**Files touched:**

- `src/common/locales/de.ts`:
  - Convert 4 header keys to function messages calling
    `formatDeOrdinal(n, "n", "gen")` ("Treffens" is neuter genitive).
  - Strip the hardcoded `.` that was after `{number}` in the old string
    templates.

No component changes.

**Example transformation:**

Before:

```text
'Ankündigung des {number}. Treffens …'
```

After:

```ts
({ named }) => `Ankündigung des ${formatDeOrdinal(n, "n", "gen")} Treffens …`
```

---

### Commit 8 – `refactor(i18n): extract formatFrOrdinal helper`

**Files touched:**

- `src/common/locales/fr.ts`:
  - Add `formatFrOrdinal(n, gender?)`:
    n=1 + gender="m" → `"1er"`, n=1 + else → `"1re"`, n≥2 → `n + "e"`.
  - `ordinalNumber` delegates to `formatFrOrdinal`.

No message key changes. No component changes.

---

### Commit 9 – `refactor(i18n): migrate FR announcement headers to formatFrOrdinal`

**Files touched:**

- `src/common/locales/fr.ts`:
  - Convert 4 header keys to function messages calling
    `formatFrOrdinal(n, "f")` ("réunion" is feminine).
  - Strip the hardcoded `e` that was after `{number}` in the old string
    templates.

No component changes.

**Example transformation:**

Before:

```text
'Annonce de la {number}e réunion …'
```

After:

```ts
({ named }) => `Annonce de la ${formatFrOrdinal(n, "f")} réunion …`
```

---

### Commit 10 – `refactor(i18n): extract formatRuOrdinal helper`

**Files touched:**

- `src/common/locales/ru.ts`:
  - Add `formatRuOrdinal(n, gender, gcase)` with the full 6×3 suffix
    table.
  - `ordinalNumber` delegates to `formatRuOrdinal`.

No message key changes. No component changes.

---

### Commit 11 – `refactor(i18n): migrate RU announcement headers to formatRuOrdinal`

**Files touched:**

- `src/common/locales/ru.ts`:
  - Convert 4 header keys to function messages calling
    `formatRuOrdinal(n, "f", "gen")` ("встречи" is feminine genitive).
  - Strip the hardcoded `-й` that was after `{number}` in the old string
    templates.

No component changes.

**RU suffix table:**

| gender \ case | nom | gen | dat | acc | ins | pre |
| ------------- | --- | --- | --- | --- | --- | --- |
| m | -й | -го | -му | -й | -м | -м |
| f | -я | -й | -й | -ю | -й | -й |
| n | -е | -го | -му | -е | -м | -м |

**Example transformation:**

Before:

```text
'Анонс {number}-й встречи …'
```

After:

```ts
({ named }) => `Анонс ${formatRuOrdinal(n, "f", "gen")} встречи …`
```

---

### Commit 12 – `refactor(i18n): remove redundant ordinalNumber call from announcement components`

**Files touched:**

- `src/client/components/events/EventAnnouncementZhBiweekly.vue`:
  Remove `number: t("ordinalNumber", { n: event.issueNumber })` param.
  (×2)
- `src/client/components/events/EventAnnouncementEnBiweekly.vue`:
  Same. (×2)

All 5 locales now use `{ n }` exclusively. The transitional dual-param
cruft is cleaned up. `ordinalNumber` remains exported from each locale
file for any external consumers.

## Validation

Per commit: `pnpm run lintMarkdown && pnpm run eslint && pnpm run typecheck && pnpm run build`

## Post-refactor state

- Components pass only `{ n }` — gender/case knowledge lives in locale
  files.
- Adding a locale requiring different ordinal morphology only touches
  that one locale file.
- `eventCalendarEvent` uses cardinal numbers (correct).
- Announcement/archive headers use locale-native ordinal formatting
  with proper gender/case agreement.
