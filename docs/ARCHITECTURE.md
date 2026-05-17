# Architecture

## Layered Component Structure

```
src/
├── pages/              # Top-level page components (routed)
│   ├── CatalogPage/    # Home page with subject widgets
│   ├── MathPage/       # Math subject page
│   └── EnglishPage/    # English subject page
├── widgets/            # Feature-specific reusable blocks
│   ├── SubjectCard/    # Catalog card widget
│   ├── MathSolver/     # Math problem interactive widget
│   └── AlphabetTracer/ # Alphabet handwriting widget
├── components/         # Shared/dumb reusable components
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   └── Icon/
├── hooks/              # Custom React hooks
├── services/           # API/business logic layer
├── utils/              # Pure utility functions
└── assets/             # Static assets (images, fonts)
```

## Layer Import Rules

| Layer       | Can import                                                     | Cannot import                            |
|-------------|----------------------------------------------------------------|------------------------------------------|
| Pages       | Widgets, Components, Hooks, Services, Utils, Assets            | Nothing from above (pages are top-level) |
| Widgets     | Components, Hooks, Services, Utils, Assets                     | Pages                                    |
| Components  | Utils, Assets                                                  | Pages, Widgets, Hooks, Services          |
| Hooks       | Utils, Services                                                | Pages, Widgets, Components               |
| Services    | Utils                                                          | Pages, Widgets, Components, Hooks        |
| Utils       | Nothing (zero internal imports)                                | Everything                               |

## Key Principles

- **Components are "dumb"** — they receive props and render UI. No side effects, no direct service calls.
- **Widgets compose components** — they combine shared components into feature blocks. May use hooks and services.
- **Pages compose widgets** — pages are route-level entry points that wire widgets together.
- **Hooks encapsulate stateful logic** — reusable logic extracted from components.
- **Services handle I/O** — API calls, localStorage, etc. Return promises or plain data.
- **Utils are pure functions** — no React, no side effects, no imports from other project layers.
