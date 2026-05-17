#!/usr/bin/env bash
# lint-structure.sh — Project structure convention checks
# Usage: bash scripts/lint-structure.sh [files...]
# If no files provided, checks src/ recursively.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/src"
FAILED=0

report_failure() {
    local file="$1"
    local rule="$2"
    local message="$3"
    echo "[FAIL] $file — $rule: $message"
    FAILED=1
}

# Rule 1: No files directly in src/pages/
if [ -d "$SRC_DIR/pages" ]; then
    while IFS= read -r FILE; do
        REL="${FILE#$ROOT_DIR/}"
        report_failure "$REL" "Rule-1" "Files in pages/ must be in subdirectories (e.g., pages/MyPage/MyPage.jsx)."
    done < <(find "$SRC_DIR/pages" -maxdepth 1 -type f 2>/dev/null)
fi

# Rule 2: No files directly in src/widgets/
if [ -d "$SRC_DIR/widgets" ]; then
    while IFS= read -r FILE; do
        REL="${FILE#$ROOT_DIR/}"
        report_failure "$REL" "Rule-2" "Files in widgets/ must be in subdirectories (e.g., widgets/MyWidget/MyWidget.jsx)."
    done < <(find "$SRC_DIR/widgets" -maxdepth 1 -type f 2>/dev/null)
fi

# Rule 3: No files directly in src/components/
if [ -d "$SRC_DIR/components" ]; then
    while IFS= read -r FILE; do
        REL="${FILE#$ROOT_DIR/}"
        report_failure "$REL" "Rule-3" "Files in components/ must be in subdirectories (e.g., components/Button/Button.jsx)."
    done < <(find "$SRC_DIR/components" -maxdepth 1 -type f 2>/dev/null)
fi

# Rule 4: .jsx files in pages/widgets/components must have a matching folder (skip test files)
for LAYER in pages widgets components; do
    LAYER_DIR="$SRC_DIR/$LAYER"
    [ -d "$LAYER_DIR" ] || continue
    while IFS= read -r JSX_FILE; do
        REL="${JSX_FILE#$ROOT_DIR/}"
        BASENAME=$(basename "$JSX_FILE" .jsx)
        PARENT_DIR=$(dirname "$JSX_FILE")
        FOLDER_NAME=$(basename "$PARENT_DIR")
        # Allow index.jsx inside its own folder
        if [ "$BASENAME" = "index" ]; then
            continue
        fi
        # Skip test files (co-located *.test.jsx)
        if [[ "$BASENAME" == *.test ]]; then
            continue
        fi
        # The .jsx file should be inside a folder with the same name
        if [ "$FOLDER_NAME" != "$BASENAME" ]; then
            # Check if there's a folder with the component name
            EXPECTED_DIR="$PARENT_DIR/$BASENAME"
            if [ ! -d "$EXPECTED_DIR" ]; then
                report_failure "$REL" "Rule-4" "Component '$BASENAME' should be in a folder '$BASENAME/' (e.g., $LAYER/$BASENAME/$BASENAME.jsx)."
            fi
        fi
    done < <(find "$LAYER_DIR" -name "*.jsx" -type f 2>/dev/null)
done

# Rule 5: Check that import paths respect layer rules
if [ -d "$SRC_DIR" ]; then
    while IFS= read -r FILE; do
        REL="${FILE#$ROOT_DIR/}"
        # Determine layer from file path
        FILE_LAYER=""
        if [[ "$REL" == src/pages/* ]]; then
            FILE_LAYER="pages"
        elif [[ "$REL" == src/widgets/* ]]; then
            FILE_LAYER="widgets"
        elif [[ "$REL" == src/components/* ]]; then
            FILE_LAYER="components"
        elif [[ "$REL" == src/hooks/* ]]; then
            FILE_LAYER="hooks"
        elif [[ "$REL" == src/services/* ]]; then
            FILE_LAYER="services"
        elif [[ "$REL" == src/utils/* ]]; then
            FILE_LAYER="utils"
        fi

        if [ -n "$FILE_LAYER" ]; then
            # Check imports from higher layers
            while IFS= read -r IMPORT_LINE; do
                case "$FILE_LAYER" in
                    components)
                        if echo "$IMPORT_LINE" | grep -qE "from ['\"](\.\.\/)*pages|from ['\"]\.\.\/widgets|from ['\"]\.\.\/hooks|from ['\"]\.\.\/services"; then
                            report_failure "$REL" "Rule-5" "Components must not import from pages, widgets, hooks, or services."
                        fi
                        ;;
                    hooks)
                        if echo "$IMPORT_LINE" | grep -qE "from ['\"](\.\.\/)*pages|from ['\"]\.\.\/widgets|from ['\"]\.\.\/components"; then
                            report_failure "$REL" "Rule-5" "Hooks must not import from pages, widgets, or components."
                        fi
                        ;;
                    services)
                        if echo "$IMPORT_LINE" | grep -qE "from ['\"](\.\.\/)*pages|from ['\"]\.\.\/widgets|from ['\"]\.\.\/components|from ['\"]\.\.\/hooks"; then
                            report_failure "$REL" "Rule-5" "Services must not import from pages, widgets, components, or hooks."
                        fi
                        ;;
                    utils)
                        if echo "$IMPORT_LINE" | grep -qE "from ['\"]\.\.\/(pages|widgets|components|hooks|services)"; then
                            report_failure "$REL" "Rule-5" "Utils must not import from any project layer."
                        fi
                        ;;
                esac
            done < <(grep -E "import .* from" "$FILE" 2>/dev/null || true)
        fi
    done < <(find "$SRC_DIR" -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null)
fi

if [ "$FAILED" -ne 0 ]; then
    echo "lint-structure: FAILED (some rules violated)"
    exit 1
fi

echo "lint-structure: PASSED"
exit 0
