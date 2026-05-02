#!/usr/bin/env bash
# =============================================================================
# translate_ts.sh — Translate TypeScript locale files via the DeepL API
#                    while preserving the full original TypeScript structure.
#
# Usage:
#   ./translate_ts.sh [--api-key <key>] <input.ts> <source_lang> <target_lang> [output.ts]
#
# The DeepL API key can be provided either via --api-key or the DEEPL_API_KEY
# environment variable. If both are given, --api-key takes precedence.
#
# Examples:
#   ./translate_ts.sh --api-key "your-key" chips.ts EN FR
#   DEEPL_API_KEY="your-key" ./translate_ts.sh chips.ts EN FR
#
# Requirements: bash 4+, python3
#
# Supported DeepL language codes as of April 2026:
#   Source: AR, BG, CS, DA, DE, EL, EN, ES, ET, FI, FR, HU, ID, IT, JA,
#           KO, LT, LV, NB, NL, PL, PT, RO, RU, SK, SL, SV, TR, UK, ZH
#   Target: same as above, plus region variants like EN-US, EN-GB, PT-BR, PT-PT, ZH-HANS, ZH-HANT
#
# =============================================================================

set -euo pipefail # Making sure common errors will cause the script to immediately fail - explicitly and loudly.

# ─── Argument parsing ───────────────────────────────────────────────────────

usage() {
  echo "Usage: $0 [--api-key <key>] <input.ts> <source_lang> <target_lang>"
  echo ""
  echo "Options:"
  echo "  --api-key <key>   DeepL API key (overrides DEEPL_API_KEY env var)"
  echo ""
  echo "The API key can also be set via the DEEPL_API_KEY environment variable."
  echo "If both are provided, --api-key takes precedence."
  echo ""
  echo "Examples:"
  echo "  $0 --api-key abc123 chips.ts EN FR chips_fr.ts"
  echo "  DEEPL_API_KEY=abc123 $0 chips.ts EN FR"
  exit 1
}

# Parse optional --api-key flag
CLI_API_KEY=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --api-key)
      if [[ $# -lt 2 ]]; then
        echo "Error: --api-key requires a value." >&2
        exit 1
      fi
      CLI_API_KEY="$2"
      shift 2
      ;;
    --help|-h)
      usage
      ;;
    --)
      shift
      break
      ;;
    --*)
      echo "Error: Unknown option '$1'" >&2
      usage
      ;;
    *)
      break
      ;;
  esac
done

if [[ $# -lt 3 ]]; then
  usage
fi

INPUT_FILE="$1"
SOURCE_LANG="${2^^}"  # uppercase
TARGET_LANG="${3^^}"
#OUTPUT_FILE="${4:-${INPUT_FILE%.ts}_${TARGET_LANG,,}.ts}"
OUTPUT_FILE="${4:-${INPUT_FILE%.ts}.ts}"

# Resolve API key: --api-key takes precedence over env var
if [[ -n "$CLI_API_KEY" ]]; then
  DEEPL_API_KEY="$CLI_API_KEY"
fi

if [[ -z "${DEEPL_API_KEY:-}" ]]; then
  echo "Error: No API key provided. Use --api-key <key> or set DEEPL_API_KEY." >&2
  exit 1
fi

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Error: Input file '$INPUT_FILE' not found." >&2
  exit 1
fi

# Detect DeepL API endpoint (free keys end with ":fx")
if [[ "$DEEPL_API_KEY" == *":fx" ]]; then
  DEEPL_URL="https://api-free.deepl.com/v2/translate"
else
  DEEPL_URL="https://api.deepl.com/v2/translate"
fi

# ─── Temporary files ────────────────────────────────────────────────────────

TMPDIR_WORK="$(mktemp -d)"
trap 'rm -rf "$TMPDIR_WORK"' EXIT

STRINGS_JSON="$TMPDIR_WORK/strings.json"
TRANSLATED_JSON="$TMPDIR_WORK/translated.json"

# ─── Step 1: Extract translatable strings ────────────────────────────────────
#
# We use a Python script to parse the TS file. It:
#   - Extracts all string values with their "path" (e.g. "cpu.title")
#   - Replaces template placeholders {var} with XML tags that DeepL preserves
#   - Outputs a JSON array of {path, original, forTranslation}
#

python3 - "$INPUT_FILE" "$STRINGS_JSON" << 'PYEXTRACT'
import sys, json, re

input_file = sys.argv[1]
output_json = sys.argv[2]

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# We parse the TS object structure manually to extract key-value pairs.
# This handles nested objects and string values (both single and double quoted).

entries = []  # list of {path, original, forTranslation, placeholder_map}

def protect_placeholders(text):
    """Replace {var} placeholders with numbered XML tags DeepL will preserve."""
    placeholders = {}
    counter = [0]
    def replacer(m):
        idx = counter[0]
        counter[0] += 1
        tag = f'<x id="{idx}"/>'
        placeholders[tag] = m.group(0)
        return tag
    protected = re.sub(r'\{[a-zA-Z_][a-zA-Z0-9_]*\}', replacer, text)
    return protected, placeholders

# Use a JS-aware approach: evaluate the structure with a simple recursive parser.
# Instead, we use regex to find all string assignments in the file.
# Strategy: find all lines with quoted string values and determine their path
# from the nesting context.

lines = content.split('\n')
path_stack = []   # tracks current nesting via brace depth
brace_depth = 0
# Track which braces are object-opening (after a key:) vs other

results = []

# More robust approach: use Python to parse the JS object.
# We strip the "export default" wrapper to get a JS object literal,
# then convert it to valid JSON and parse it, preserving key order.

# Extract the object body
obj_match = re.search(r'export\s+default\s*(\{.*\})\s*;?\s*$', content, re.DOTALL)
if not obj_match:
    # Try other patterns: module.exports, etc.
    obj_match = re.search(r'(?:module\.exports\s*=|export\s*=)\s*(\{.*\})\s*;?\s*$', content, re.DOTALL)

if not obj_match:
    print("Error: Could not find exported object in TS file.", file=sys.stderr)
    sys.exit(1)

obj_text = obj_match.group(1)

# Convert JS object literal to JSON:
# 1. Unquoted keys -> quoted keys
# 2. Single-quoted strings -> double-quoted strings (handle escapes)
# 3. Trailing commas -> removed

def js_obj_to_json(text):
    """Convert a JS object literal to valid JSON."""
    result = []
    i = 0
    length = len(text)

    while i < length:
        c = text[i]

        # Skip single-line comments
        if c == '/' and i + 1 < length and text[i+1] == '/':
            while i < length and text[i] != '\n':
                i += 1
            continue

        # Skip multi-line comments
        if c == '/' and i + 1 < length and text[i+1] == '*':
            i += 2
            while i + 1 < length and not (text[i] == '*' and text[i+1] == '/'):
                i += 1
            i += 2
            continue

        # Double-quoted string — pass through as-is
        if c == '"':
            result.append(c)
            i += 1
            while i < length:
                cc = text[i]
                result.append(cc)
                if cc == '\\':
                    i += 1
                    if i < length:
                        result.append(text[i])
                elif cc == '"':
                    break
                i += 1
            i += 1
            continue

        # Single-quoted string — convert to double-quoted
        if c == "'":
            i += 1
            s_chars = []
            while i < length:
                cc = text[i]
                if cc == '\\':
                    i += 1
                    if i < length:
                        nc = text[i]
                        if nc == "'":
                            s_chars.append("'")
                        elif nc == '"':
                            s_chars.append('\\"')
                        else:
                            s_chars.append('\\')
                            s_chars.append(nc)
                elif cc == "'":
                    break
                else:
                    if cc == '"':
                        s_chars.append('\\"')
                    else:
                        s_chars.append(cc)
                i += 1
            i += 1  # skip closing quote
            result.append('"')
            result.extend(s_chars)
            result.append('"')
            continue

        # Template literal (backtick) — convert to double-quoted
        if c == '`':
            i += 1
            s_chars = []
            while i < length:
                cc = text[i]
                if cc == '\\':
                    i += 1
                    if i < length:
                        s_chars.append('\\')
                        s_chars.append(text[i])
                elif cc == '`':
                    break
                else:
                    if cc == '"':
                        s_chars.append('\\"')
                    elif cc == '\n':
                        s_chars.append('\\n')
                    else:
                        s_chars.append(cc)
                i += 1
            i += 1
            result.append('"')
            result.extend(s_chars)
            result.append('"')
            continue

        # Unquoted key detection: identifier followed by ':'
        if c.isalpha() or c == '_' or c == '$':
            # Collect the identifier
            ident_start = i
            while i < length and (text[i].isalnum() or text[i] == '_' or text[i] == '$'):
                i += 1
            ident = text[ident_start:i]

            # Skip whitespace
            j = i
            while j < length and text[j] in ' \t\n\r':
                j += 1

            if j < length and text[j] == ':':
                # It's a key — quote it
                result.append('"')
                result.append(ident)
                result.append('"')
            else:
                # It's a value like true/false/null or something else
                if ident in ('true', 'false', 'null'):
                    result.append(ident)
                else:
                    result.append('"')
                    result.append(ident)
                    result.append('"')
            continue

        # Remove trailing commas before } or ]
        if c == ',':
            # Look ahead for } or ] (skip whitespace)
            j = i + 1
            while j < length and text[j] in ' \t\n\r':
                j += 1
            if j < length and text[j] in '}]':
                i += 1
                continue

        result.append(c)
        i += 1

    return ''.join(result)

json_text = js_obj_to_json(obj_text)

try:
    data = json.loads(json_text)
except json.JSONDecodeError as e:
    print(f"Error parsing converted JSON: {e}", file=sys.stderr)
    # Write debug
    with open(output_json + '.debug', 'w') as df:
        df.write(json_text)
    sys.exit(1)

# Recursively collect all string values with their paths
def collect_strings(obj, path_parts=None):
    if path_parts is None:
        path_parts = []
    results = []
    if isinstance(obj, dict):
        for key, value in obj.items():
            collect_strings(value, path_parts + [key])
            # results are appended via closure
        return
    elif isinstance(obj, str):
        path = '.'.join(path_parts)
        protected, pmap = protect_placeholders(obj)
        entries.append({
            'path': path,
            'original': obj,
            'forTranslation': protected,
            'placeholder_map': pmap,
        })
    # For lists, numbers, booleans — skip (not translatable)
    elif isinstance(obj, list):
        for idx_item, item in enumerate(obj):
            collect_strings(item, path_parts + [str(idx_item)])

collect_strings(data)

# Write out
serializable = []
for e in entries:
    serializable.append({
        'path': e['path'],
        'original': e['original'],
        'forTranslation': e['forTranslation'],
        'placeholder_map': e['placeholder_map'],
    })

with open(output_json, 'w', encoding='utf-8') as f:
    json.dump(serializable, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(serializable)} translatable strings.")
PYEXTRACT

TOTAL=$(python3 -c "import json; print(len(json.load(open('$STRINGS_JSON'))))")
echo "Found $TOTAL translatable strings."

# ─── Step 2: Translate via DeepL in batches ──────────────────────────────────
#
# DeepL accepts up to 50 texts per request. We batch accordingly.
# We use tag_handling=xml so that <x id="N"/> placeholders are preserved.
#

python3 - "$STRINGS_JSON" "$TRANSLATED_JSON" "$DEEPL_URL" "$DEEPL_API_KEY" "$SOURCE_LANG" "$TARGET_LANG" << 'PYTRANSLATE'
import sys, json, time, urllib.request, urllib.parse, urllib.error

strings_file = sys.argv[1]
output_file  = sys.argv[2]
deepl_url    = sys.argv[3]
api_key      = sys.argv[4]
source_lang  = sys.argv[5]
target_lang  = sys.argv[6]

BATCH_SIZE = 50

with open(strings_file, 'r', encoding='utf-8') as f:
    entries = json.load(f)

texts = [e['forTranslation'] for e in entries]
translated_texts = []

for batch_start in range(0, len(texts), BATCH_SIZE):
    batch = texts[batch_start:batch_start + BATCH_SIZE]
    batch_num = batch_start // BATCH_SIZE + 1
    total_batches = (len(texts) + BATCH_SIZE - 1) // BATCH_SIZE
    print(f"  Translating batch {batch_num}/{total_batches} ({len(batch)} strings)...")

    # Build form-encoded body (DeepL expects repeated 'text' params)
    params = []
    for t in batch:
        params.append(('text', t))
    params.append(('source_lang', source_lang))
    params.append(('target_lang', target_lang))
    params.append(('tag_handling', 'xml'))
    params.append(('preserve_formatting', '1'))

    data = urllib.parse.urlencode(params).encode('utf-8')

    req = urllib.request.Request(deepl_url, data=data, method='POST')
    req.add_header('Authorization', f'DeepL-Auth-Key {api_key}')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')

    retries = 3
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read().decode('utf-8'))
            break
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')
            if e.code == 429 or e.code >= 500:
                wait = 2 ** (attempt + 1)
                print(f"    Retrying in {wait}s (HTTP {e.code})...")
                time.sleep(wait)
                if attempt == retries - 1:
                    print(f"Error: DeepL API returned HTTP {e.code}: {body}", file=sys.stderr)
                    sys.exit(1)
            else:
                print(f"Error: DeepL API returned HTTP {e.code}: {body}", file=sys.stderr)
                sys.exit(1)
        except Exception as e:
            if attempt == retries - 1:
                print(f"Error: Request failed: {e}", file=sys.stderr)
                sys.exit(1)
            time.sleep(2 ** (attempt + 1))

    for tr in result.get('translations', []):
        translated_texts.append(tr['text'])

    # Small delay to respect rate limits
    if batch_start + BATCH_SIZE < len(texts):
        time.sleep(0.3)

# Restore placeholders in translated text
for i, entry in enumerate(entries):
    t = translated_texts[i]
    for xml_tag, original_placeholder in entry['placeholder_map'].items():
        t = t.replace(xml_tag, original_placeholder)
    entries[i]['translated'] = t

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Successfully translated {len(entries)} strings.")
PYTRANSLATE

# ─── Step 3: Rebuild the TypeScript file with translated strings ─────────────
#
# We take the original TS file and replace each string value with its
# translation, preserving all formatting, comments, and structure.
#

python3 - "$INPUT_FILE" "$TRANSLATED_JSON" "$OUTPUT_FILE" << 'PYREBUILD'
import sys, json, re

input_file    = sys.argv[1]
translated_file = sys.argv[2]
output_file   = sys.argv[3]

with open(input_file, 'r', encoding='utf-8') as f:
    original = f.read()

with open(translated_file, 'r', encoding='utf-8') as f:
    entries = json.load(f)

# Build a mapping: original_string -> translated_string
# Process in order of longest first to avoid partial replacements
trans_map = {}
for e in entries:
    trans_map[e['original']] = e['translated']

# Walk through the original file character by character.
# When we encounter a quoted string value, look it up in trans_map
# and replace it with the translation.

result = []
i = 0
length = len(original)

def read_string(text, start, quote_char):
    """Read a quoted string starting at position start (pointing to the opening quote).
    Returns (string_content, end_position) where end_position is after the closing quote."""
    i = start + 1  # skip opening quote
    chars = []
    while i < len(text):
        c = text[i]
        if c == '\\':
            chars.append(c)
            i += 1
            if i < len(text):
                chars.append(text[i])
        elif c == quote_char:
            return ''.join(chars), i + 1
        else:
            chars.append(c)
        i += 1
    return ''.join(chars), i

def read_template_literal(text, start):
    """Read a backtick string."""
    i = start + 1
    chars = []
    while i < len(text):
        c = text[i]
        if c == '\\':
            chars.append(c)
            i += 1
            if i < len(text):
                chars.append(text[i])
        elif c == '`':
            return ''.join(chars), i + 1
        else:
            chars.append(c)
        i += 1
    return ''.join(chars), i

def escape_for_quote(s, quote_char):
    """Escape a string for use inside quotes."""
    s = s.replace('\\', '\\\\')
    s = s.replace(quote_char, '\\' + quote_char)
    # Preserve newlines as literal \n
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '\\r')
    s = s.replace('\t', '\\t')
    return s

while i < length:
    c = original[i]

    # Skip single-line comments
    if c == '/' and i + 1 < length and original[i+1] == '/':
        start = i
        while i < length and original[i] != '\n':
            i += 1
        result.append(original[start:i])
        continue

    # Skip multi-line comments
    if c == '/' and i + 1 < length and original[i+1] == '*':
        start = i
        i += 2
        while i + 1 < length and not (original[i] == '*' and original[i+1] == '/'):
            i += 1
        i += 2
        result.append(original[start:i])
        continue

    # Handle quoted strings
    if c in ('"', "'"):
        content, end = read_string(original, i, c)
        # Unescape to get the actual string value for lookup
        actual = content.replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t')
        actual = actual.replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')

        if actual in trans_map:
            translated = trans_map[actual]
            escaped = escape_for_quote(translated, c)
            result.append(c)
            result.append(escaped)
            result.append(c)
        else:
            # Keep original
            result.append(original[i:end])
        i = end
        continue

    # Handle template literals
    if c == '`':
        content, end = read_template_literal(original, i)
        actual = content.replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t')
        actual = actual.replace('\\`', '`').replace('\\\\', '\\')

        if actual in trans_map:
            translated = trans_map[actual]
            escaped = translated.replace('\\', '\\\\').replace('`', '\\`')
            result.append('`')
            result.append(escaped)
            result.append('`')
        else:
            result.append(original[i:end])
        i = end
        continue

    result.append(c)
    i += 1

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(''.join(result))

print(f"Output written to: {output_file}")
PYREBUILD

echo ""
echo "✓ Translation complete: $OUTPUT_FILE"
echo "  Source: $SOURCE_LANG → Target: $TARGET_LANG"
echo "  Translated $TOTAL strings."
