#!/usr/bin/env bash
# =============================================================================
# translate_md.sh — Translate user-readable text in a Markdown file via DeepL
#
# Usage:
#   ./translate_md.sh --lang <LANG_CODE> [--api-key <KEY>] <file.md>
#
# Options:
#   --lang      Target language code (e.g. DE, FR, ES, IT, JA, ZH, PT-BR …)
#   --api-key   DeepL API key (or set env var DEEPL_API_KEY)
#   --help      Show this help message
#
# Requirements:
#   bash 4+, curl, python3 (standard library only)
#
# Supported DeepL language codes as of April 2026:
#   Source: AR, BG, CS, DA, DE, EL, EN, ES, ET, FI, FR, HU, ID, IT, JA,
#           KO, LT, LV, NB, NL, PL, PT, RO, RU, SK, SL, SV, TR, UK, ZH
#   Target: same as above, plus region variants like EN-US, EN-GB, PT-BR, PT-PT, ZH-HANS, ZH-HANT
#
# The script preserves:
#   - Markdown syntax (headings, bold, italic, links, images, tables, etc.)
#   - Fenced code blocks (``` … ```) and indented code blocks
#   - Inline code (`…`)
#   - HTML <script> … </script> blocks
#   - HTML <style> … </style> blocks
#   - HTML comments <!-- … -->
#   - Front matter (--- … ---)
#   - URLs inside link/image syntax
#   - HTML tags (only their attributes are left untouched)
#   - Vue / Jinja2 template expressions ({{ … }})
#   - Markdown heading ID attributes ({#id})
#   - Markdown container markers (:::tip, :::warning, ::: etc.)
# =============================================================================

set -euo pipefail # Making sure common errors will cause the script to immediately fail - explicitly and loudly.

# ── Defaults ──────────────────────────────────────────────────────────────────
LANG_CODE=""
API_KEY="${DEEPL_API_KEY:-}"
INPUT_FILE=""
#DEEPL_URL="https://api-free.deepl.com/v2/translate"   # Free tier endpoint
DEEPL_URL="https://api.deepl.com/v2/translate"   # Commercial tier endpoint

# ── Helpers ───────────────────────────────────────────────────────────────────
usage() {
  grep '^#' "$0" | sed 's/^# \?//' | head -20
  exit 0
}

die() { echo "ERROR: $*" >&2; exit 1; }

require() {
  for cmd in "$@"; do
    command -v "$cmd" &>/dev/null || die "'$cmd' is required but not installed."
  done
}

# ── Argument parsing ───────────────────────────────────────────────────────────
[[ $# -eq 0 ]] && usage

while [[ $# -gt 0 ]]; do
  case "$1" in
    --lang)    LANG_CODE="${2:-}"; shift 2 ;;
    --api-key) API_KEY="${2:-}";   shift 2 ;;
    --help|-h) usage ;;
    -*)        die "Unknown option: $1" ;;
    *)         INPUT_FILE="$1"; shift ;;
  esac
done

[[ -z "$LANG_CODE" ]]   && die "--lang is required (e.g. --lang DE)"
[[ -z "$API_KEY" ]]     && die "DeepL API key missing. Use --api-key or set \$DEEPL_API_KEY"
[[ -z "$INPUT_FILE" ]]  && die "No input file specified."
[[ -f "$INPUT_FILE" ]]  || die "File not found: $INPUT_FILE"

require curl python3

# ── Export env vars BEFORE any Python sub-process uses them ──────────────────
export DEEPL_API_KEY_INTERNAL="$API_KEY"
export DEEPL_LANG="$LANG_CODE"
export DEEPL_URL="$DEEPL_URL"

# ── Create a temp directory for intermediate files ───────────────────────────
# Using temp files instead of bash variables avoids null-byte and quoting issues.
TMPDIR_WORK=$(mktemp -d)
export TMPDIR_WORK
trap 'rm -rf "$TMPDIR_WORK"' EXIT

# ── Python helper script (written to a temp file) ────────────────────────────
PYTHON_HELPER="$TMPDIR_WORK/md_translate_helper.py"
cat > "$PYTHON_HELPER" << 'PYTHON_SCRIPT_EOF'
import sys, re, json, os, html, urllib.request, urllib.parse

# ── Token marker ─────────────────────────────────────────────────────────────
# Use printable but extremely unlikely marker strings instead of null bytes.
# Null bytes (\x00) cannot survive in bash variables, breaking the original
# approach of passing tokenised data through shell variables.
TOKEN_PREFIX = "\x02\x02TK"
TOKEN_SUFFIX = "\x02\x02"

def tokenise(text):
    tokens = {}   # token_id -> original segment
    counter = [0]

    def new_token(segment):
        tid = f"{TOKEN_PREFIX}{counter[0]:05d}{TOKEN_SUFFIX}"
        counter[0] += 1
        tokens[tid] = segment
        return tid

    lines = text.split("\n")
    out = []
    i = 0
    in_front_matter = False
    front_matter_done = False

    while i < len(lines):
        line = lines[i]

        # ── Front matter (--- block at very top) ──────────────────────────
        if i == 0 and line.strip() == "---":
            in_front_matter = True
            out.append(line)
            i += 1
            continue
        if in_front_matter:
            # Rewrite returnLink to use the target language code
            rm = re.match(r'^(\s*returnLink\s*:\s*)/[A-Za-z-]+(.*)$', line)
            if rm:
                target_lang = os.environ.get("DEEPL_LANG", "").lower()
                # Handle codes like PT-BR → pt-br
                out.append(f"{rm.group(1)}/{target_lang}{rm.group(2)}")
            else:
                # Tokenise pageTitle / pageSubTitle values for translation
                tm = re.match(r'^(\s*(?:pageTitle|pageSubTitle)\s*:\s*)(.+)$', line)
                if tm and tm.group(2).strip():
                    out.append(tm.group(1) + new_token(tm.group(2)))
                else:
                    out.append(line)
            if line.strip() == "---":
                in_front_matter = False
                front_matter_done = True
            i += 1
            continue

        # ── Fenced code block (``` or ~~~) ────────────────────────────────
        fence_match = re.match(r"^(`{3,}|~{3,})", line)
        if fence_match:
            fence = fence_match.group(1)
            block = [line]
            i += 1
            while i < len(lines):
                block.append(lines[i])
                if lines[i].strip().startswith(fence):
                    i += 1
                    break
                i += 1
            out.append("\n".join(block))
            continue

        # ── HTML block: <script> … </script>  and  <style> … </style> ──
        block_m = re.match(r"<(script|style)[\s>]", line, re.IGNORECASE)
        if block_m:
            block_tag = block_m.group(1).lower()
            block = [line]
            i += 1
            while i < len(lines):
                block.append(lines[i])
                if re.search(rf"</{block_tag}>", lines[i], re.IGNORECASE):
                    i += 1
                    break
                i += 1
            out.append("\n".join(block))
            continue

        # ── HTML comment <!-- … --> (possibly multi-line) ─────────────────
        if line.lstrip().startswith("<!--"):
            block = [line]
            if "-->" not in line:
                i += 1
                while i < len(lines):
                    block.append(lines[i])
                    if "-->" in lines[i]:
                        i += 1
                        break
                    i += 1
            else:
                i += 1
            out.append("\n".join(block))
            continue

        # ── Indented code block (4 spaces / 1 tab) ────────────────────────
        if re.match(r"^(    |\t)", line):
            out.append(line)
            i += 1
            continue

        # ── Blank line ────────────────────────────────────────────────────
        if line.strip() == "":
            out.append(line)
            i += 1
            continue

        # ── Self-closing / void HTML component tags (e.g. <Component />) ──
        if re.match(r"^\s*<[A-Za-z][A-Za-z0-9._-]*\s*/>\s*$", line):
            out.append(line)
            i += 1
            continue

        # ── Markdown container markers  :::tip  :::warning  ::: etc. ──
        if re.match(r"^\s*:::", line):
            out.append(line)
            i += 1
            continue

        # ── Process inline content of the line ───────────────────────────
        processed = process_inline(line, tokens, new_token)
        out.append(processed)
        i += 1

    return "\n".join(out), tokens


def process_inline(line, tokens, new_token):
    """
    Tokenise translatable text inside a single line, protecting:
      - inline code `…`
      - link/image URLs  [text](URL)  — only URL is protected
      - reference links  [text][ref]  — ref protected
      - bare URLs
      - HTML tags
    """

    protected = []   # (start, end) ranges that must NOT be tokenised

    # ── inline code ──────────────────────────────────────────────────────
    for m in re.finditer(r"`[^`]+`", line):
        protected.append((m.start(), m.end()))

    # ── HTML tags <…> ────────────────────────────────────────────────────
    for m in re.finditer(r"<[^>]+>", line):
        protected.append((m.start(), m.end()))

    # ── Vue / Jinja2 template expressions {{ … }} ────────────────────────
    for m in re.finditer(r"\{\{.*?\}\}", line):
        protected.append((m.start(), m.end()))

    # ── Markdown heading ID attributes {#some-id} ────────────────────────
    for m in re.finditer(r"\{#[^}]+\}", line):
        protected.append((m.start(), m.end()))

    # ── link/image URLs  ![alt](url)  or  [text](url) ────────────────────
    for m in re.finditer(r"(!?\[)([^\]]*)(\]\()([^)]*)(\))", line):
        # protect: the opening "![" or "[", the "](", the URL, and the ")"
        # leave group 2 (the alt/link text) translatable
        protected.append((m.start(1), m.end(1)))   # "![" or "["
        protected.append((m.start(3), m.end(5)))    # "](url)"

    # ── reference-style [text][ref] ───────────────────────────────────────
    for m in re.finditer(r"(!?\[)([^\]]*)(\]\[)([^\]]*)(\])", line):
        protected.append((m.start(1), m.end(1)))    # "![" or "["
        protected.append((m.start(3), m.end(5)))    # "][ref]"

    # ── bare URLs ────────────────────────────────────────────────────────
    for m in re.finditer(r"https?://\S+", line):
        protected.append((m.start(), m.end()))

    # Merge & sort protected ranges
    protected.sort()
    merged = []
    for s, e in protected:
        if merged and s < merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append([s, e])

    # Build a new line: text segments outside protected ranges get tokenised
    result = []
    prev = 0
    for s, e in merged:
        if prev < s:
            segment = line[prev:s]
            if segment.strip():
                result.append(new_token(segment))
            else:
                result.append(segment)
        result.append(line[s:e])
        prev = e
    if prev < len(line):
        segment = line[prev:]
        if segment.strip():
            result.append(new_token(segment))
        else:
            result.append(segment)

    return "".join(result)


def detokenise(skeleton, translations):
    result = skeleton
    for tid, translated in translations.items():
        result = result.replace(tid, translated)
    return result


# ── Sub-commands ─────────────────────────────────────────────────────────────

def cmd_tokenise(input_file):
    """Tokenise a markdown file. Write skeleton + tokens to temp files."""
    with open(input_file, "r", encoding="utf-8") as f:
        source = f.read()
    skeleton, tokens = tokenise(source)

    tmpdir = os.environ["TMPDIR_WORK"]
    with open(os.path.join(tmpdir, "skeleton.txt"), "w", encoding="utf-8") as f:
        f.write(skeleton)
    with open(os.path.join(tmpdir, "tokens.json"), "w", encoding="utf-8") as f:
        json.dump(tokens, f, ensure_ascii=False)

    # Print segment count to stdout for the shell script to capture
    print(len(tokens))


def cmd_translate():
    """Read tokens.json, translate via DeepL, write translations.json."""
    tmpdir    = os.environ["TMPDIR_WORK"]
    api_key   = os.environ["DEEPL_API_KEY_INTERNAL"]
    lang_code = os.environ["DEEPL_LANG"]
    url       = os.environ["DEEPL_URL"]

    with open(os.path.join(tmpdir, "tokens.json"), "r", encoding="utf-8") as f:
        tokens = json.load(f)

    translations = {}
    items = list(tokens.items())

    # DeepL supports up to 50 texts per request — batch them.
    BATCH = 50
    for start in range(0, len(items), BATCH):
        batch = items[start:start+BATCH]
        tids  = [b[0] for b in batch]
        texts = [b[1] for b in batch]

        params = [("target_lang", lang_code), ("tag_handling", "xml"),
                  ("ignore_tags", "keep")]
        for t in texts:
            # XML-escape bare & < > so DeepL's XML parser won't choke
            params.append(("text", html.escape(t, quote=False)))

        data = urllib.parse.urlencode(params).encode()
        req  = urllib.request.Request(url, data=data,
               headers={"Authorization": f"DeepL-Auth-Key {api_key}",
                        "Content-Type": "application/x-www-form-urlencoded"})
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())

        for tid, trans in zip(tids, result["translations"]):
            # Unescape XML entities back to original characters
            translations[tid] = html.unescape(trans["text"])

    with open(os.path.join(tmpdir, "translations.json"), "w", encoding="utf-8") as f:
        json.dump(translations, f, ensure_ascii=False)


def cmd_detokenise(output_file):
    """Read skeleton + translations, rebuild and write the final file."""
    tmpdir = os.environ["TMPDIR_WORK"]

    with open(os.path.join(tmpdir, "skeleton.txt"), "r", encoding="utf-8") as f:
        skeleton = f.read()
    with open(os.path.join(tmpdir, "translations.json"), "r", encoding="utf-8") as f:
        translations = json.load(f)

    result = detokenise(skeleton, translations)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(result)


if __name__ == "__main__":
    command = sys.argv[1]

    if command == "tokenise":
        cmd_tokenise(sys.argv[2])
    elif command == "translate":
        cmd_translate()
    elif command == "detokenise":
        cmd_detokenise(sys.argv[2])
    else:
        print(f"Unknown command: {command}", file=sys.stderr)
        sys.exit(1)
PYTHON_SCRIPT_EOF

# ── Step 1: tokenise the file ──────────────────────────────────────────────────
echo "→ Parsing markdown and extracting translatable segments …"

SEGMENT_COUNT=$(python3 "$PYTHON_HELPER" tokenise "$INPUT_FILE")
echo "   Found $SEGMENT_COUNT translatable segment(s)."

if [[ "$SEGMENT_COUNT" -eq 0 ]]; then
  echo "Nothing to translate. Exiting."
  exit 0
fi

# ── Step 2: translate each segment via DeepL ──────────────────────────────────
echo "→ Translating to ${LANG_CODE} via DeepL …"

python3 "$PYTHON_HELPER" translate

# ── Step 3: rebuild the file ───────────────────────────────────────────────────
echo "→ Rebuilding markdown with translated text …"

python3 "$PYTHON_HELPER" detokenise "$INPUT_FILE"

# ── Done ──────────────────────────────────────────────────────────────────────
echo "✓ Done. '$INPUT_FILE' has been translated to ${LANG_CODE}."
