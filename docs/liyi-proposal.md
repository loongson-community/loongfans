# 立意 (Lìyì) Adoption Proposal

## Summary

This proposal adopts the [立意 (Lìyì)](https://github.com/liyi-run/liyi) convention for making code intent explicit, persistent, and reviewable in AI-assisted development.

## What is 立意?

立意 is a convention and tooling ecosystem that addresses a core problem in AI-assisted development: the gap between "what the human wanted" and "what the AI produced."

### The Problem

When AI agents (GitHub Copilot, Claude, etc.) write code:
1. Intent is implicit in prompts and context
2. Code can drift from original intent over multiple AI edits
3. Code review becomes difficult when intent isn't documented
4. AI-generated changes are hard to audit for correctness

### The Solution

立意 makes intent **explicit** (written down in sidecar files), **persistent** (version controlled), and **reviewable** (humans approve intent separately from implementation).

## How It Works

### Sidecar Files

For each source file with non-trivial logic, we create a `<filename>.liyi.jsonc` sidecar:

```jsonc
{
  "version": "0.1",
  "source": "src/node/plugins/loongfans-data/generateDatabase.ts",
  "specs": [
    {
      "item": "generateChipsDB",
      "intent": "Transform raw chip YAML data into ChipInfoDB. Validate CPU and chipset entries against schemas...",
      "source_span": [145, 210],
      "reviewed": false
    }
  ]
}
```

### Source Markers

Use markers in code for requirements and relationships:

```typescript
// @liyi:requirement(data-integrity)
// All data transformations must validate input against schemas...

// @liyi:related data-integrity
function validateChipData(data: unknown): ChipInfo {
  // ...
}
```

### The Linter

The `liyi` CLI tool:
- Checks that intent specs match current code (detects drift)
- Validates that `@liyi:requirement` markers have corresponding sidecar entries
- Ensures `@liyi:related` annotations have edges in sidecar specs
- Can auto-correct shifted line numbers

## Benefits for loongfans

### 1. Safer AI-Assisted Refactoring

The device pages are in the middle of a refactor (as noted in AGENTS.md). With 立意:
- Intent for data transformations is documented before changes
- AI agents can verify their changes against documented intent
- Drift is caught at CI time, not in production

### 2. Better Onboarding

New contributors can understand the "why" behind complex functions:
- `generateDevicesDB` intent explains the merge strategy for YAML + markdown
- `validate` intent clarifies schema validation requirements
- No need to reverse-engineer intent from implementation

### 3. Review Efficiency

Code reviews can focus on:
- Does the intent match the requirements? (human judgment)
- Does the implementation match the intent? (liyi checks this)

### 4. Long-term Maintenance

When the original authors are gone:
- Intent specs remain as documentation
- Future AI agents can work within documented constraints
- Requirements traceability (why does this function exist?)

## Adoption Path

### Phase 1: Pilot (This PR)

- Add 立意 documentation to AGENTS.md ✓
- Create example sidecars for critical data transformations ✓
- Add `.liyiignore` for project-specific exclusions ✓

### Phase 2: Critical Functions

Add sidecars for:
- `src/node/routes/chipsPages.ts` — chip page routing logic
- `src/node/routes/devicesPages.ts` — device page routing logic
- `src/client/components/devices/deviceTransform.ts` — device data transforms

### Phase 3: Full Adoption

- Add CI check: `liyi check --fail-on-stale` (optional, non-blocking initially)
- Gradually add sidecars for all non-trivial functions
- Train contributors to write intent specs for new code

## Tooling

### Installation

```bash
# liyi is a Rust tool; install via cargo
cargo install liyi

# Or download prebuilt binary from releases
```

### Development Workflow

```bash
# Check all specs
liyi check

# Fix shifted line numbers (after edits)
liyi check --fix

# Review and approve specs (interactive)
liyi approve src/node/plugins/loongfans-data/*.liyi.jsonc
```

### CI Integration

```yaml
# .github/workflows/ci.yml
- name: Check intent specs
  run: |
    cargo install liyi
    liyi check --fail-on-stale --fail-on-untracked
```

## Comparison with Existing Practices

| Practice | What it checks | What 立意 adds |
|----------|----------------|----------------|
| ESLint | Syntax, style | Intent semantics |
| TypeScript | Type safety | Behavioral contracts |
| Code review | Implementation | Separates intent from implementation |
| Tests | Runtime behavior | Design-time requirements |

立意 is **complementary** to existing practices — it fills the gap between "what the code does" and "what the code should do."

## Example: Data Pipeline Intent

Current state (from this PR):

```typescript
// src/node/plugins/loongfans-data/generateDatabase.ts

// @liyi:requirement(data-integrity)
// All data transformations must validate input against schemas,
// preserve type safety, and ensure foreign key references resolve correctly.

function validate<T>(
  data: object,
  validator: ValidateFunction,
  kind: string,
  fileName: string | null = null,
): T {
  // implementation
}
```

Sidecar:

```jsonc
{
  "item": "validate",
  "intent": "Validate parsed YAML data against JSON schema using Ajv. Throw ValidationError with descriptive message including file name and validation errors if schema check fails.",
  "source_span": [79, 99],
  "reviewed": false
}
```

If someone later modifies `validate` to return `null` instead of throwing, `liyi check` will flag:
- Intent says "Throw ValidationError"
- Implementation returns `null`
- Human review required: is this an intentional change or a mistake?

## Resources

- [立意 repository](https://github.com/liyi-run/liyi)
- [MVP Roadmap](https://github.com/liyi-run/liyi/blob/main/docs/liyi-mvp-roadmap.md)
- [Design Document](https://github.com/liyi-run/liyi/blob/main/docs/liyi-design.md)

## Questions?

- **Q: Does this add overhead?**
  A: Only for non-trivial functions. Simple getters/setters are marked `@liyi:trivial` and skipped.

- **Q: What if intent changes?**
  A: Update the sidecar intent, run `liyi reanchor` to update hashes, commit both changes.

- **Q: Do we need the Rust toolchain?**
  A: Only for CI. Contributors can skip local installation if CI catches issues.

- **Q: Is this ready for production?**
  A: 立意 v0.1 is stable and used by its own development. The MVP is feature-complete.

---

**Proposal:** Merge this PR as Phase 1 pilot, then gradually expand coverage based on maintainer feedback.
