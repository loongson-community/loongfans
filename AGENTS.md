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

- `data/`: YAML data sources (chips, devices, downloads, OS, events).
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

### Download resources data

- Source of truth is YAML in `data/downloads/`.
- Use `data/downloads/changelogs/` for shared Markdown fragments referenced by
  `description` via `<!--@include: ... -->`.
- Devices reference download keys from their `data/devices/*/index.yml` entries.

### Documentation language

- Design documents in `docs/` should be written in Chinese.
- Code identifiers, TypeScript types, and commit messages remain in English per convention.
- Other internal documentation also currently in English:
  - `AGENTS.md`
  - YAML/code comments

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

Every commit must pass the relevant checks below **before** being finalized. Design documents and roadmaps intentionally omit per-step validation instructions because this checklist is the single source of truth.

- ✅ `pnpm run typecheck` for TS/Vue changes
- ✅ `pnpm run eslint` for code changes
- ✅ `pnpm run lintMarkdown` for Markdown edits
- ✅ `pnpm run build` for deeper refactors or data pipeline changes

## Notes on dev server behavior

VitePress HMR is enabled, but dynamic route metadata may not update when data files are added or removed. Restart the dev server if route titles or page lists do not refresh.

## 立意 (Intent Specs)

When writing or modifying code:

1. For each non-trivial item (function, struct, macro invocation, decorated endpoint, etc.), infer what it SHOULD do (not what it does). Write intent to a sidecar file named `<source_filename>.liyi.jsonc` (e.g., `money.rs` → `money.rs.liyi.jsonc`). Record `source_span` (start/end lines). Do not write `source_hash` or `source_anchor` — the tool fills them in. Do not write `"reviewed"` — that is set by the human via CLI or IDE. **If you change the `intent` text of a spec that has `"reviewed": true`, you must set `"reviewed"` to `false`** (or delete the field). The human reviewed the *old* intent; your rewrite has not been reviewed. Failing to unset it silently self-approves agent-written intent, bypassing human review. Use `"intent": "=doc"` only when the docstring contains behavioral requirements (constraints, error conditions, properties), not just a functional summary — a docstring that says "Returns the sum" is not adequate; one that says "Must reject mismatched currencies with an error" is. For trivial items (simple getters, one-line wrappers), annotate with `@liyi:trivial` instead of writing a spec. Alternatively, when working sidecar-first, use `"intent": "=trivial"` to mark items as trivial without requiring a source annotation. When `liyi init` emits `_hints` in a sidecar scaffold, use them to prioritize which items warrant deeper investigation (e.g., `git log`, reading tests) within your token/call budget; for unhinted items, infer from source alone.
2. When module-level invariants are apparent, write an `@liyi:module` block — in the directory's existing module doc (`README.md`, `doc.go`, `mod.rs` doc comment, etc.) or in a dedicated `LIYI.md`. Use the doc markup language's comment syntax for the marker.
3. If a source item has a `@liyi:related <name>` annotation, record the dependency in `.liyi.jsonc` as `"related": {"<name>": null}`. The tool fills in the requirement's current hash.
4. For each `@liyi:requirement <name>` block encountered, ensure it has a corresponding entry in the co-located `.liyi.jsonc` with `"requirement"` and `"source_span"`. (The tool fills in `"source_hash"`.)
5. If a spec has `"related"` edges referencing a requirement, do not overwrite the requirement text during inference. Update the spec (update `source_span`) but preserve the `"related"` edges. Do not write `source_hash` — the tool fills it in.
6. Only generate adversarial tests from items that have a `@liyi:intent` annotation in source or `"reviewed": true` in the sidecar (i.e., human-reviewed intent). When `@liyi:intent` is present in source, use its prose (or the docstring for `=doc`) as the authoritative intent for test generation.
7. Tests should target boundary conditions, error-handling gaps, property violations, and semantic mismatches. Prioritize tests a subtly wrong implementation would fail.
8. Skip items annotated with `@liyi:ignore` or `@liyi:trivial`, and files matched by `.liyiignore`. Respect `@liyi:nontrivial` — if present, always infer a spec for that item and never override with `@liyi:trivial`.
9. Use a different model for test generation than the one that wrote the code, when possible.
10. When `liyi check` reports stale items, choose one of two paths:
    - **Direct re-inference** (preferred during interactive editing with few stale items): re-read the source, update `source_span` and `intent` in the sidecar, leave `"reviewed"` unset. Appropriate when you are the agent that just made the change, the number of stale items is small, and the changes are straightforward.
    - **Triage** (preferred for batch workflows, CI, or when many items are stale): assess each item — is the change cosmetic, semantic, or an intent violation? Write the assessment to `.liyi/triage.json` following the triage report schema. For cosmetic changes, run `liyi triage --apply` to auto-fix. For semantic changes, propose updated intent in `suggested_intent`. For intent violations, flag for human review. Prefer triage when stale items have `"reviewed": true` or `@liyi:intent` in source — these carry human-vouched intent that deserves explicit assessment, not silent re-inference.

    In either path, **never compute `source_hash` manually** and **never leave `"reviewed": true` on a spec whose `intent` you changed** (see rule 1). When `liyi check --fix` cannot auto-rehash a stale item (e.g., because it has `"reviewed": true`), update `source_span` and `intent`, **set `"reviewed"` to `false`**, and **delete** the `source_hash` field (or set it to `null`). The human will run `liyi check --fix` or `liyi approve --rehash` after reviewing the updated intent. This rule exists because agents consistently produce wrong hashes (trailing-newline differences, encoding mismatches) — the tool reads the actual bytes and is the only authority.
11. Before committing, run `liyi check`. If it reports coverage gaps (missing requirement specs, missing related edges), resolve **all** gaps in the same commit. When running as an agent, prefer `liyi check --prompt` for structured JSON output with per-gap resolution instructions. Do not commit with unresolved coverage gaps — CI will reject it.

### `.liyi.jsonc` Schema (v0.1)

Sidecar files must conform to the following JSON Schema. The top-level object has three required fields: `"version"` (must be `"0.1"`), `"source"` (repo-relative path to the source file), and `"specs"` (array of item or requirement entries). Each spec entry is either an **item spec** or a **requirement spec**, distinguished by the presence of `"item"` vs `"requirement"`.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://liyi.run/schema/0.1/liyi.schema.json",
  "title": "立意 sidecar spec file",
  "type": "object",
  "required": ["version", "source", "specs"],
  "additionalProperties": false,
  "properties": {
    "version": {
      "type": "string",
      "const": "0.1",
      "description": "Schema version. The linter rejects unknown versions."
    },
    "source": {
      "type": "string",
      "description": "Path to the source file, relative to the repository root."
    },
    "specs": {
      "type": "array",
      "items": {
        "oneOf": [
          { "$ref": "#/$defs/itemSpec" },
          { "$ref": "#/$defs/requirementSpec" }
        ]
      }
    }
  },
  "$defs": {
    "sourceSpan": {
      "type": "array",
      "items": { "type": "integer", "minimum": 1 },
      "minItems": 2,
      "maxItems": 2,
      "description": "Closed interval of 1-indexed line numbers [start, end]. start must be <= end."
    },
    "sourceHash": {
      "type": "string",
      "pattern": "^sha256:[0-9a-f]+$",
      "description": "SHA-256 hex digest of the source lines in the span, prefixed with 'sha256:'."
    },
    "itemSpec": {
      "type": "object",
      "required": ["item", "intent", "source_span"],
      "additionalProperties": false,
      "properties": {
        "item": {
          "type": "string",
          "description": "Display name of the item (function, struct, macro, etc.). Not a unique key — identity is item + source_span."
        },
        "reviewed": {
          "type": "boolean",
          "default": false,
          "description": "Optional. Whether a human has reviewed and accepted this intent via sidecar approval. Defaults to false when absent. The linter also considers an item reviewed if \u0040liyi:intent is present in source."
        },
        "intent": {
          "type": "string",
          "description": "Natural-language description of what the item SHOULD do, or the sentinel value '=doc' meaning the source docstring captures intent, or '=trivial' meaning the item is trivial and needs no intent spec."
        },
        "source_span": { "$ref": "#/$defs/sourceSpan" },
        "tree_path": {
          "type": "string",
          "default": "",
          "description": "Optional. Structural AST path for tree-sitter-based span recovery (e.g., 'fn.add_money', 'impl.Money::fn.new'). When non-empty, the tool uses tree-sitter to locate the item by structural identity. When empty or absent, falls back to line-number-based span matching. Tool-managed — agents MAY write this but the tool overwrites with the canonical form."
        },
        "source_hash": {
          "$ref": "#/$defs/sourceHash",
          "description": "Tool-managed. SHA-256 hex digest of the source lines in the span. Computed by liyi check --fix — agents should not produce this."
        },
        "source_anchor": {
          "type": "string",
          "description": "Literal text of the first line of the span. Tool-managed — agents should not produce this."
        },
        "confidence": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Optional. Agent's self-assessed confidence in the inferred intent. May be removed after review."
        },
        "related": {
          "type": "object",
          "additionalProperties": {
            "oneOf": [
              { "$ref": "#/$defs/sourceHash" },
              { "type": "null" }
            ]
          },
          "description": "Optional. Maps requirement names to their source_hash at time of last review. Agents write null; the tool fills in hashes."
        },
        "_hints": {
          "type": "object",
          "description": "Transient inference aids emitted by liyi init for cold-start scenarios. LLM-readable, intentionally unstructured. Stripped by liyi check --fix after initial review. Tools MUST NOT rely on any specific shape."
        }
      }
    },
    "requirementSpec": {
      "type": "object",
      "required": ["requirement", "source_span"],
      "additionalProperties": false,
      "properties": {
        "requirement": {
          "type": "string",
          "description": "Name of the requirement. Unique per repository."
        },
        "source_span": { "$ref": "#/$defs/sourceSpan" },
        "tree_path": {
          "type": "string",
          "default": "",
          "description": "Optional. Structural AST path for tree-sitter-based span recovery. When non-empty, the tool uses tree-sitter to locate the requirement by structural identity. When empty or absent, falls back to line-number-based span matching. Tool-managed."
        },
        "source_hash": {
          "$ref": "#/$defs/sourceHash",
          "description": "Tool-managed. Computed by liyi check --fix."
        },
        "source_anchor": {
          "type": "string",
          "description": "Literal text of the first line of the span. Tool-managed."
        }
      }
    }
  }
}
```

### Triage Report Schema (v0.1)

When `liyi check` reports stale items, the agent assesses each and writes the result to `.liyi/triage.json`. The report must conform to the following JSON Schema (also available at `schema/triage.schema.json`):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://liyi.run/schema/0.1/triage.schema.json",
  "title": "立意 triage report",
  "description": "Agent-produced assessment of stale intent specs, validated and consumed by liyi triage subcommands.",
  "type": "object",
  "required": ["version", "generated", "model", "summary", "items"],
  "additionalProperties": false,
  "properties": {
    "version": {
      "type": "string",
      "const": "0.1",
      "description": "Schema version. Must match the version understood by the liyi binary."
    },
    "generated": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp of when the triage report was produced."
    },
    "model": {
      "type": "string",
      "description": "Identifier of the model that produced the assessments (e.g. 'claude-sonnet-4-20260514')."
    },
    "root": {
      "type": "string",
      "default": ".",
      "description": "Repository root relative to the working directory. Usually '.'."
    },
    "summary": { "$ref": "#/$defs/summary" },
    "items": {
      "type": "array",
      "items": { "$ref": "#/$defs/triageItem" }
    }
  },
  "$defs": {
    "sourceSpan": {
      "type": "array",
      "items": { "type": "integer", "minimum": 1 },
      "minItems": 2,
      "maxItems": 2,
      "description": "Closed interval of 1-indexed line numbers [start, end]. start must be <= end."
    },
    "verdict": {
      "type": "string",
      "enum": ["cosmetic", "semantic", "intent-violation", "unclear"],
      "description": "cosmetic: no behavioral change (rename, reformat). semantic: code evolved, intent is stale but code is correct. intent-violation: code contradicts declared intent. unclear: model cannot determine with sufficient confidence."
    },
    "action": {
      "type": "string",
      "enum": ["auto-fix", "update-intent", "fix-code-or-update-intent", "manual-review"],
      "description": "Recommended action. auto-fix for cosmetic, update-intent for semantic, fix-code-or-update-intent for intent-violation, manual-review for unclear."
    },
    "summary": {
      "type": "object",
      "required": ["total_stale", "cosmetic", "semantic", "intent_violation", "unassessed"],
      "additionalProperties": false,
      "properties": {
        "total_stale": {
          "type": "integer",
          "minimum": 0,
          "description": "Total number of stale items assessed."
        },
        "cosmetic": {
          "type": "integer",
          "minimum": 0,
          "description": "Items with verdict 'cosmetic'."
        },
        "semantic": {
          "type": "integer",
          "minimum": 0,
          "description": "Items with verdict 'semantic'."
        },
        "intent_violation": {
          "type": "integer",
          "minimum": 0,
          "description": "Items with verdict 'intent-violation'."
        },
        "unassessed": {
          "type": "integer",
          "minimum": 0,
          "description": "Stale items not yet assessed (should be 0 in a complete report)."
        },
        "impacted_transitively": {
          "type": "integer",
          "minimum": 0,
          "description": "Items affected transitively via the related graph."
        }
      }
    },
    "impactEntry": {
      "type": "object",
      "required": ["source", "item", "relationship", "impact_summary"],
      "additionalProperties": false,
      "properties": {
        "source": {
          "type": "string",
          "description": "Repo-relative path of the transitively affected source file."
        },
        "item": {
          "type": "string",
          "description": "Name of the transitively affected item."
        },
        "relationship": {
          "type": "string",
          "description": "The related edge that propagates the impact (e.g. 'related:multi-currency-addition')."
        },
        "impact_summary": {
          "type": "string",
          "description": "Why this item is affected (1–2 sentences)."
        }
      }
    },
    "triageItem": {
      "type": "object",
      "required": ["source", "item", "source_span", "verdict", "confidence", "change_summary", "invariant_summary", "reasoning", "action"],
      "additionalProperties": false,
      "properties": {
        "source": {
          "type": "string",
          "description": "Repo-relative source path."
        },
        "item": {
          "type": "string",
          "description": "Item name (matches the sidecar spec)."
        },
        "source_span": {
          "$ref": "#/$defs/sourceSpan",
          "description": "Current span from the sidecar."
        },
        "verdict": { "$ref": "#/$defs/verdict" },
        "confidence": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Model's self-assessed confidence in the verdict (0–1)."
        },
        "change_summary": {
          "type": "string",
          "description": "What changed in the code (1–2 sentences)."
        },
        "invariant_summary": {
          "type": "string",
          "description": "What stayed the same (1–2 sentences)."
        },
        "reasoning": {
          "type": "string",
          "description": "Why the verdict was assigned (2–3 sentences, citable in reviews)."
        },
        "action": { "$ref": "#/$defs/action" },
        "suggested_intent": {
          "type": ["string", "null"],
          "default": null,
          "description": "Proposed new intent text. Expected for 'semantic' verdicts; null otherwise."
        },
        "impact": {
          "type": "array",
          "items": { "$ref": "#/$defs/impactEntry" },
          "default": [],
          "description": "Transitively affected items via the related graph."
        }
      }
    }
  }
}
```