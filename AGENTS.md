# MathApp - Kids Educational Platform

## AI Agent Onboarding Manual

### Tech Stack

- **ReactJS** + **Vite** (build tool)
- **CSS Modules** (scoped styling)
- **React Router** (client-side routing)

### Architecture Overview

See `docs/ARCHITECTURE.md` for full details. The project follows a strict layered structure:

```
Pages → Widgets → Components → Hooks/Services → Utils
```

Each layer has well-defined import constraints. Violations will be caught by the validation pipeline.

### Code Conventions

- **Components**: PascalCase (e.g., `Button.jsx`, `MathSolver.jsx`)
- **Hooks**: camelCase prefixed with `use` (e.g., `useAuth.js`)
- **Utils/Services**: camelCase (e.g., `formatDate.js`, `api.js`)
- **Folders**: flat per domain — each component in its own folder named after it
- **Tests**: co-located `.test.jsx` files next to source

### Import Rules

| Layer       | Can Import                                    |
|-------------|-----------------------------------------------|
| Pages       | Widgets, Components, Hooks, Services, Utils   |
| Widgets     | Components, Hooks, Services, Utils            |
| Components  | Utils only                                    |
| Hooks       | Utils, Services                               |
| Services    | Utils only                                    |
| Utils       | Nothing                                       |

No layer may import from a higher layer. Components must not import hooks or services directly.

### Testing Rules

Every component file must have a co-located `.test.jsx` file with the same name.

### Validation Flow

**Before creating or modifying any file**, run:

```bash
python3 scripts/validate.py --action <create|modify|delete> --file <path>
```

The validation pipeline checks:
1. Project structure conventions
2. React code quality rules

Fix any failures before proceeding.

### Known Bad Patterns (NEVER do these)

- ❌ Inline styles (`style={{}}`) — use CSS Modules instead
- ❌ `dangerouslySetInnerHTML` — use proper React rendering
- ❌ Direct DOM manipulation (`document.getElementById`, `document.querySelector`) in components
- ❌ `console.log` in non-test files
- ❌ Components over 300 lines — split into smaller pieces
- ❌ Logic in render — extract into hooks or utils
- ❌ Copy-paste code duplication — extract shared logic

### Commands Reference

See `docs/DEVELOPMENT.md` for full reference.

| Command               | Description                   |
|-----------------------|-------------------------------|
| `npm run dev`         | Start dev server              |
| `npm run build`       | Production build              |
| `npm run validate`    | Run all harness checks        |
| `python3 scripts/validate.py` | Full validation pipeline |
| `python3.12 scripts/validate.py` | Fallback if python3 not found |
