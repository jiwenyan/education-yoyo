#!/usr/bin/env python3
"""
validate.py — Unified validation pipeline entry

Usage:
    python3 scripts/validate.py                     # Run all checks
    python3 scripts/validate.py --action create --file <path>   # Pre-action verification
    python3 scripts/validate.py --action modify --file <path>   # Pre-action verification
    python3 scripts/validate.py --action delete --file <path>   # Pre-action verification

Exit code 0 = all pass, 1 = failures found.
"""

import argparse
import os
import subprocess
import sys

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPTS_DIR)
SRC_DIR = os.path.join(ROOT_DIR, "src")


def parse_args():
    parser = argparse.ArgumentParser(description="Harness Engineering Validation Pipeline")
    parser.add_argument("--action", choices=["create", "modify", "delete"], help="Action being performed")
    parser.add_argument("--file", help="Path to the file being created/modified/deleted")
    return parser.parse_args()


def run_shell_script(script_path, *args):
    """Run a shell script and return (returncode, stdout+stderr)."""
    cmd = ["bash", script_path] + list(args)
    result = subprocess.run(cmd, capture_output=True, text=False)
    stdout = result.stdout.decode("utf-8", errors="replace") if result.stdout else ""
    stderr = result.stderr.decode("utf-8", errors="replace") if result.stderr else ""
    return result.returncode, stdout + stderr


def validate_file_path(file_path):
    """Check if the file path follows naming conventions based on its location."""
    rel_path = os.path.relpath(file_path, ROOT_DIR)
    basename = os.path.basename(file_path)
    parent_dir = os.path.basename(os.path.dirname(file_path))

    # Only validate .js and .jsx files
    if not (basename.endswith(".js") or basename.endswith(".jsx")):
        return True, []

    errors = []

    # Check if file is in a layer directory that requires subdirectories
    for layer in ["pages", "widgets", "components"]:
        layer_prefix = os.path.join("src", layer)
        if rel_path.startswith(layer_prefix) and os.path.dirname(rel_path) == layer_prefix:
            errors.append(f"Files in {layer}/ must be in a subdirectory")

    # Check PascalCase for component files
    name_without_ext = basename.rsplit(".", 1)[0]
    if basename.endswith(".jsx") and name_without_ext != "index":
        # Check if it's PascalCase (starts with capital letter)
        if not name_without_ext[0].isupper():
            errors.append(f"Component files should be PascalCase: '{basename}'")

    return len(errors) == 0, errors


def main():
    args = parse_args()

    all_passed = True
    output_lines = []

    # Phase 1: Pre-action file path validation
    if args.file:
        valid, path_errors = validate_file_path(args.file)
        if not valid:
            output_lines.append("--- File Path Validation ---")
            for err in path_errors:
                output_lines.append(f"  [FAIL] {err}")
            output_lines.append("")
            all_passed = False
        else:
            # Check if the file exists for modify/delete
            if args.action in ("modify", "delete") and not os.path.exists(args.file):
                output_lines.append(f"  [FAIL] File does not exist: {args.file}")
                all_passed = False
            elif args.action == "create" and os.path.exists(args.file):
                output_lines.append(f"  [WARN] File already exists: {args.file}")
            else:
                output_lines.append("  [PASS] File path validation")

    # Phase 2: Structure lint
    output_lines.append("--- Structure Checks ---")
    lint_structure_script = os.path.join(SCRIPTS_DIR, "lint-structure.sh")
    returncode, lint_output = run_shell_script(lint_structure_script)
    output_lines.append(lint_output.strip())
    if returncode != 0:
        all_passed = False
    output_lines.append("")

    # Phase 3: Quality lint
    output_lines.append("--- Quality Checks ---")
    lint_quality_script = os.path.join(SCRIPTS_DIR, "lint-quality.sh")
    returncode, lint_output = run_shell_script(lint_quality_script)
    output_lines.append(lint_output.strip())
    if returncode != 0:
        all_passed = False

    # Print output
    print("\n".join(output_lines))
    print()

    if all_passed:
        print("Validation pipeline: ALL PASSED")
        sys.exit(0)
    else:
        print("Validation pipeline: FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()
