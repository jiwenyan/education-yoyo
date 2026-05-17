# MathApp Implementation Plan

## Phase Breakdown

The implementation is divided into 5 sequential phases. Each phase produces a working, testable increment.

---

## Phase 1: Foundation (Vite + Routing Shell)

**Goal:** Get a running React app with routing and empty page shells.

### Tasks

| # | Task | Files |
|---|------|-------|
| 1.1 | Initialize Vite + React project | `package.json`, `vite.config.js`, `index.html` |
| 1.2 | Configure React Router with lazy-loaded routes | `src/main.jsx`, `src/App.jsx` |
| 1.3 | Create empty page shells | `src/pages/CatalogPage/CatalogPage.jsx` |
| | | `src/pages/MathPage/MathPage.jsx` |
| | | `src/pages/EnglishPage/EnglishPage.jsx` |
| | | `src/pages/ProgressPage/ProgressPage.jsx` |
| | | `src/pages/SettingsPage/SettingsPage.jsx` |
| 1.4 | Create shared Header and Footer components | `src/components/Header/Header.jsx` |
| | | `src/components/Header/Header.module.css` |
| | | `src/components/Footer/Footer.jsx` |
| | | `src/components/Footer/Footer.module.css` |
| 1.5 | Wire navigation links in Header | Update `Header.jsx` with `<NavLink>` to all routes |
| 1.6 | Verify: `npm run dev` renders all 5 routes with Header/Footer | |

### Route Table

| Path | Page Component | Lazy Load |
|------|---------------|-----------|
| `/` | CatalogPage | `React.lazy()` |
| `/math` | MathPage | `React.lazy()` |
| `/english` | EnglishPage | `React.lazy()` |
| `/progress` | ProgressPage | `React.lazy()` |
| `/settings` | SettingsPage | `React.lazy()` |

### Acceptance Criteria

- `npm run dev` starts without errors
- Navigating to each path shows the correct page name
- Header and Footer appear on all routes
- Validation pipeline passes

---

## Phase 2: Shared Component Library

**Goal:** Build the reusable UI component kit used by all widgets and pages.

### Tasks

| # | Task | Files |
|---|------|-------|
| 2.1 | Button component | `src/components/Button/Button.jsx` |
| | (variants: primary, secondary, icon) | `src/components/Button/Button.module.css` |
| 2.2 | Card component | `src/components/Card/Card.jsx` |
| | (container with optional header/footer slots) | `src/components/Card/Card.module.css` |
| 2.3 | Icon component | `src/components/Icon/Icon.jsx` |
| | (renders SVG sprites by name) | `src/components/Icon/Icon.module.css` |
| 2.4 | ProgressRing component | `src/components/ProgressRing/ProgressRing.jsx` |
| | (circular progress indicator) | `src/components/ProgressRing/ProgressRing.module.css` |
| 2.5 | StarCounter component | `src/components/StarCounter/StarCounter.jsx` |
| | (displays star count with icon) | `src/components/StarCounter/StarCounter.module.css` |
| 2.6 | Navigation component | `src/components/Navigation/Navigation.jsx` |
| | (tab-style nav for Header) | `src/components/Navigation/Navigation.module.css` |
| 2.7 | Unit tests for all components | co-located `*.test.jsx` files |

### Component API Design

```jsx
// Button
<Button variant="primary|secondary|icon" onClick={fn} disabled={bool}>
  Label
</Button>

// Card
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Icon
<Icon name="star|math|abc|settings|progress" size={24} />

// ProgressRing
<ProgressRing value={75} max={100} size={80} strokeWidth={6} />

// StarCounter
<StarCounter count={42} />

// Navigation
<Navigation items={[{ label, path, icon }]} />
```

### Acceptance Criteria

- All components render correctly in a test harness
- CSS Modules provide scoped styles
- Button variants are visually distinct
- Validation pipeline passes
- `npm test` passes all component tests

---

## Phase 3: State Management + Services

**Goal:** Build the global state layer, localStorage persistence, and utility functions.

### Tasks

| # | Task | Files |
|---|------|-------|
| 3.1 | AppContext + AppProvider | `src/services/AppContext.jsx` |
| 3.2 | App reducer (user, progress, settings, session) | `src/services/appReducer.js` |
| 3.3 | Storage service (localStorage read/write) | `src/services/storage.js` |
| 3.4 | Utility: random number generation | `src/utils/random.js` |
| 3.5 | Utility: math problem generation | `src/utils/mathProblems.js` |
| 3.6 | Utility: answer validation | `src/utils/validateAnswer.js` |
| 3.7 | Utility: letter/word data (A–Z + simple words) | `src/utils/alphabetData.js` |
| 3.8 | Custom hook: useLocalStorage | `src/hooks/useLocalStorage.js` |
| 3.9 | Custom hook: useMathProblems | `src/hooks/useMathProblems.js` |
| 3.10 | Unit tests for reducers, utils, hooks | co-located `*.test.js` / `*.test.jsx` |

### Reducer Shape

```js
const initialState = {
  user: {
    name: '',
    avatar: null,
    createdAt: null,
  },
  progress: {
    math: { problemsSolved: 0, correct: 0, stars: 0, streak: 0 },
    english: { lettersTraced: 0, wordsSpelled: 0, stars: 0, streak: 0 },
  },
  settings: {
    difficulty: 'easy',       // easy | medium | hard
    soundEnabled: true,
    kidName: '',
  },
  session: {
    activePage: null,
    currentProblem: null,
    sessionStart: null,
  },
};
```

### Acceptance Criteria

- Context provides state + dispatch to all children
- State persists across page reloads via localStorage
- `useMathProblems` returns valid problems at each difficulty level
- `utils/mathProblems.js` generates unique problems each time
- All new files pass validation pipeline

---

## Phase 4: Widgets (Feature Implementation)

**Goal:** Implement all three feature widgets with full interactivity.

### 4a. SubjectCard Widget

| # | Task | Files |
|---|------|-------|
| 4a.1 | SubjectCard component | `src/widgets/SubjectCard/SubjectCard.jsx` |
| | (icon, subject name, completion, star rating) | `src/widgets/SubjectCard/SubjectCard.module.css` |
| 4a.2 | Hover/tap animation | CSS transitions in module |
| 4a.3 | Subject data config | `src/widgets/SubjectCard/subjects.js` |

### 4b. MathSolver Widget

| # | Task | Files |
|---|------|-------|
| 4b.1 | MathSolver container (state machine) | `src/widgets/MathSolver/MathSolver.jsx` |
| | | `src/widgets/MathSolver/MathSolver.module.css` |
| 4b.2 | ProblemDisplay sub-component | `src/widgets/MathSolver/ProblemDisplay.jsx` |
| | | `src/widgets/MathSolver/ProblemDisplay.module.css` |
| 4b.3 | AnswerInput sub-component | `src/widgets/MathSolver/AnswerInput.jsx` |
| | (number pad for kids) | `src/widgets/MathSolver/AnswerInput.module.css` |
| 4b.4 | FeedbackOverlay sub-component | `src/widgets/MathSolver/FeedbackOverlay.jsx` |
| | (correct/incorrect animations) | `src/widgets/MathSolver/FeedbackOverlay.module.css` |
| 4b.5 | ScoreBar sub-component | `src/widgets/MathSolver/ScoreBar.jsx` |
| | | `src/widgets/MathSolver/ScoreBar.module.css` |
| 4b.6 | MathSolver unit tests | co-located `*.test.jsx` |

### 4c. AlphabetTracer Widget

| # | Task | Files |
|---|------|-------|
| 4c.1 | AlphabetTracer container | `src/widgets/AlphabetTracer/AlphabetTracer.jsx` |
| | (state machine) | `src/widgets/AlphabetTracer/AlphabetTracer.module.css` |
| 4c.2 | TracingCanvas sub-component | `src/widgets/AlphabetTracer/TracingCanvas.jsx` |
| | (HTML5 Canvas + PointerEvents) | `src/widgets/AlphabetTracer/TracingCanvas.module.css` |
| 4c.3 | LetterPrompt sub-component | `src/widgets/AlphabetTracer/LetterPrompt.jsx` |
| | | `src/widgets/AlphabetTracer/LetterPrompt.module.css` |
| 4c.4 | AudioButton sub-component | `src/widgets/AlphabetTracer/AudioButton.jsx` |
| | (Web Speech API) | `src/widgets/AlphabetTracer/AudioButton.module.css` |
| 4c.5 | AlphabetTracer unit tests | co-located `*.test.jsx` |

### Widget State Machines

**MathSolver states:**
```
IDLE → PRESENTING → ANSWERING → CHECKING → FEEDBACK → PRESENTING (next)
                                                    → IDLE (session end)
```

**AlphabetTracer states:**
```
IDLE → SHOWING_LETTER → TRACING → CHECKING → FEEDBACK → SHOWING_LETTER (next)
                                                    → IDLE (session end)
```

### Acceptance Criteria

- SubjectCard renders with correct data for Math and English
- MathSolver: user can answer 5 problems, see correct/incorrect feedback, and score accumulates
- AlphabetTracer: user can trace a letter on canvas, hear pronunciation, advance to next letter
- All widgets work on touch devices
- Validation pipeline passes

---

## Phase 5: Pages (Integration + Polish)

**Goal:** Wire widgets into pages using global state, finalize remaining pages.

### Tasks

| # | Task | Files |
|---|------|-------|
| 5.1 | Wire CatalogPage with SubjectCards | `src/pages/CatalogPage/CatalogPage.jsx` |
| | Read progress from context, pass to cards | `src/pages/CatalogPage/CatalogPage.module.css` |
| 5.2 | Wire MathPage with MathSolver | `src/pages/MathPage/MathPage.jsx` |
| | Dispatch session events to context | `src/pages/MathPage/MathPage.module.css` |
| 5.3 | Wire EnglishPage with AlphabetTracer | `src/pages/EnglishPage/EnglishPage.jsx` |
| | Dispatch session events to context | `src/pages/EnglishPage/EnglishPage.module.css` |
| 5.4 | Build ProgressPage | `src/pages/ProgressPage/ProgressPage.jsx` |
| | Read progress from context, display stats | `src/pages/ProgressPage/ProgressPage.module.css` |
| 5.5 | Build SettingsPage | `src/pages/SettingsPage/SettingsPage.jsx` |
| | Difficulty selector, sound toggle, name field, reset | `src/pages/SettingsPage/SettingsPage.module.css` |
| 5.6 | Full integration test — flow through all routes | |
| 5.7 | Final validation pipeline run | |

### Page Layouts

**CatalogPage:**
```
+----------------------------------+
| Header (StarCounter + Nav)       |
+----------------------------------+
|                                  |
|  [Math Card]  [English Card]     |
|                                  |
|  [Progress]   [Settings]         |
|                                  |
+----------------------------------+
| Footer                           |
+----------------------------------+
```

**MathPage / EnglishPage:**
```
+----------------------------------+
| Header (Nav + score mini-bar)    |
+----------------------------------+
|                                  |
|        Widget Content            |
|        (full-width area)         |
|                                  |
+----------------------------------+
| Footer                           |
+----------------------------------+
```

### Acceptance Criteria

- All 5 pages render with real data from context
- Completing a math problem updates progress (visible on CatalogPage and ProgressPage)
- Changing settings persists across page reload
- ProgressPage shows meaningful stats
- SettingsPage allows profile name, difficulty, sound, reset
- `python3 scripts/validate.py` passes with exit code 0
- `npm run build` completes without errors

---

## File Creation Order (Sequential Dependencies)

```
Phase 1
  ├── vite.config.js, index.html, src/main.jsx, src/App.jsx
  ├── src/pages/{CatalogPage,MathPage,EnglishPage,ProgressPage,SettingsPage}/*.jsx
  └── src/components/{Header,Footer}/*.jsx + *.module.css

Phase 2
  └── src/components/{Button,Card,Icon,ProgressRing,StarCounter,Navigation}/*.jsx + *.module.css
      └── tests

Phase 3
  ├── src/utils/{random,mathProblems,validateAnswer,alphabetData}.js + tests
  ├── src/hooks/{useLocalStorage,useMathProblems}.js + tests
  └── src/services/{AppContext,appReducer,storage}.js + tests

Phase 4
  ├── src/widgets/SubjectCard/*.jsx + *.module.css + tests
  ├── src/widgets/MathSolver/*.jsx + *.module.css + tests
  └── src/widgets/AlphabetTracer/*.jsx + *.module.css + tests

Phase 5
  └── Update all page *.jsx + *.module.css
```

---

## Verification Checklist (Per Phase)

- [ ] `npm run dev` starts and pages render
- [ ] `npm run build` completes without errors
- [ ] `python3 scripts/validate.py` exits with code 0
- [ ] All new `.jsx` files follow PascalCase naming
- [ ] All new files are in correct layer subdirectories
- [ ] Import paths respect layer rules
- [ ] No inline styles, no dangerouslySetInnerHTML, no direct DOM queries
- [ ] No console.log in source files
- [ ] No component exceeds 300 lines

---

## Effort Notes

- **Phase 1** is the quickest (~5 files) — establishes the routing skeleton
- **Phase 2** is component design work (~12 files + tests) — get the visual language right
- **Phase 3** is logic-heavy (~10 files + tests) — no UI, pure JavaScript
- **Phase 4** is the largest (~15 files + tests) — most UI code lives here
- **Phase 5** is integration (~10 files + CSS) — wiring and polish phases

Each phase can be validated independently. If Phase N passes all checks, work can proceed to Phase N+1 with confidence that nothing is broken.
