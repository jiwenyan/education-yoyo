#!/usr/bin/env bash
# lint-quality.sh — React code quality checks
# Usage: bash scripts/lint-quality.sh [files...]
# If no files provided, checks src/ recursively.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/src"
FAILED=0

# Determine files to check
if [ $# -gt 0 ]; then
    FILES=("$@")
else
    mapfile -t FILES < <(find "$SRC_DIR" -type f \( -name "*.jsx" -o -name "*.js" \) ! -name "*.test.*" ! -path "*/node_modules/*")
fi

report_failure() {
    local file="$1"
    local rule="$2"
    local message="$3"
    echo "[FAIL] $file — $rule: $message"
    FAILED=1
}

report_warning() {
    local file="$1"
    local rule="$2"
    local message="$3"
    echo "[WARN] $file — $rule: $message"
}

for FILE in "${FILES[@]}"; do
    [ -f "$FILE" ] || continue
    REL="${FILE#$ROOT_DIR/}"
    BASENAME=$(basename "$FILE")

    # Rule 1: No inline style objects (style={{}}) — allow if variable used: style={someVar}
    if grep -nE 'style=\{ *\{' "$FILE" | grep -v 'style={{}}' > /dev/null 2>&1; then
        report_failure "$REL" "Rule-1" "No inline style objects. Use CSS Modules instead."
    fi

    # Rule 2: No dangerouslySetInnerHTML
    if grep -n 'dangerouslySetInnerHTML' "$FILE" > /dev/null 2>&1; then
        report_failure "$REL" "Rule-2" "No dangerouslySetInnerHTML allowed."
    fi

    # Rule 3: No direct DOM queries in components (only in hooks/utils) — skip main.jsx entry point
    if [[ "$FILE" == *.jsx && "$BASENAME" != "main.jsx" ]]; then
        if grep -nE '(document\.getElementById|document\.querySelector)' "$FILE" > /dev/null 2>&1; then
            report_failure "$REL" "Rule-3" "No direct DOM manipulation in component files."
        fi
    fi

    # Rule 4: No console.log in non-test files (warn only)
    if grep -nE 'console\.(log|debug|info|warn|error)' "$FILE" > /dev/null 2>&1; then
        report_warning "$REL" "Rule-4" "Avoid console.* in source files. Use a proper logger."
    fi

    # Rule 5: Component files must be PascalCase
    if [[ "$FILE" == *.jsx && ! "$BASENAME" =~ ^[A-Z] ]]; then
        # Skip index.jsx files inside PascalCase folders
        if [ "$BASENAME" != "index.jsx" ]; then
            report_warning "$REL" "Rule-5" "Component file should be PascalCase (e.g., MyComponent.jsx)."
        fi
    fi

    # Rule 6: Component files should be under 300 lines
    if [[ "$FILE" == *.jsx ]]; then
        LINE_COUNT=$(wc -l < "$FILE")
        if [ "$LINE_COUNT" -gt 300 ]; then
            report_warning "$REL" "Rule-6" "File is ${LINE_COUNT} lines (max 300). Consider splitting."
        fi
    fi
done

if [ "$FAILED" -ne 0 ]; then
    echo "lint-quality: FAILED (some rules violated)"
    exit 1
fi

echo "lint-quality: PASSED"
exit 0
