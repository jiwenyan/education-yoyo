# Development Guide

## Prerequisites

- Node.js >= 18
- npm >= 9
- Python >= 3.8 (for validation scripts)

## Commands

| Command                        | Description                       |
|--------------------------------|-----------------------------------|
| `npm run dev`                  | Start Vite dev server             |
| `npm run build`                | Production build                  |
| `npm run lint`                 | Run ESLint                        |
| `npm run validate`             | Run all harness checks            |
| `npm run lint:quality`         | Run React code quality checks     |
| `npm run lint:structure`       | Run project structure checks      |
| `python3 scripts/validate.py`  | Full validation pipeline (direct) |
| `python3.12 scripts/validate.py` | Fallback if python3 not found |

## Validation Pipeline

Before creating or modifying any file, run:

```bash
python3 scripts/validate.py --action <create|modify|delete> --file <path>
```

This runs:
1. Structure convention checks
2. React quality checks

All checks must pass (exit code 0) before committing changes.

## Project Conventions

- **Component files**: PascalCase (e.g., `Button.jsx`, `MathSolver.jsx`)
- **Hook files**: camelCase prefixed with `use` (e.g., `useAuth.js`, `useFetch.js`)
- **Utility files**: camelCase (e.g., `formatDate.js`, `mathHelpers.js`)
- **Service files**: camelCase (e.g., `api.js`, `storage.js`)
- **Test files**: co-located with source (e.g., `Button.test.jsx` beside `Button.jsx`)
