# MathApp Design Document

## 1. Overview

MathApp is a React-based educational web application for kids (ages 5–10) to learn mathematics and English. The app delivers an interactive, gamified learning experience through subject-specific widgets, progress tracking, and a child-friendly UI.

### Goals

- Provide a safe, engaging environment for kids to practice math and English
- Offer interactive widgets (math problem solving, alphabet tracing, etc.)
- Track progress and adapt difficulty to the child's level
- Maintain a modular, testable codebase via strict layering

---

## 2. User Personas

### Primary: Kid Learner (age 5–10)
- Needs: Bright colors, large touch targets, minimal text, audio cues
- Goals: Complete activities, earn rewards/stars, build confidence
- Constraints: Limited reading ability, short attention span, may share device with siblings

### Secondary: Parent / Teacher
- Needs: View progress reports, adjust difficulty, manage content
- Goals: Monitor learning outcomes, assign specific subjects
- Constraints: Wants quick dashboard access without complex setup

### Tertiary: Developer (AI / human)
- Needs: Clear conventions, fast iteration, validation guardrails
- Goals: Add new subjects/widgets without breaking existing ones

---

## 3. User Stories

| ID | Story |
|----|-------|
| US-01 | As a kid, I want to see a colorful catalog of subjects so I can pick what to learn. |
| US-02 | As a kid, I want to solve math problems with visual feedback (correct/incorrect) so I learn through play. |
| US-03 | As a kid, I want to trace letters with my finger/mouse so I practice handwriting. |
| US-04 | As a parent, I want to see which subjects my child has completed so I can track progress. |
| US-05 | As a parent, I want to set the difficulty level so the content matches my child's ability. |
| US-06 | As a developer, I want clear import rules so I don't introduce circular dependencies. |

---

## 4. Information Architecture

```
App Root
├── CatalogPage (/)                # Subject selection dashboard
│   └── SubjectCard (× N)          # Cards for Math, English, etc.
├── MathPage (/math)               # Math activities
│   └── MathSolver                 # Interactive math problem widget
├── EnglishPage (/english)         # English activities
│   └── AlphabetTracer             # Letter tracing widget
├── ProgressPage (/progress)       # Parent/teacher progress view
└── SettingsPage (/settings)       # Difficulty & preferences
```

### Routing Table

| Path | Page Component | Description |
|------|---------------|-------------|
| `/` | CatalogPage | Subject selection grid |
| `/math` | MathPage | Math problem activities |
| `/english` | EnglishPage | English/alphabet activities |
| `/progress` | ProgressPage | Learning progress dashboard |
| `/settings` | SettingsPage | Parent settings panel |

---

## 5. Screens / Key Features

### 5.1 CatalogPage
- Grid of `SubjectCard` widgets (Math, English, etc.)
- Each card shows: icon, subject name, completion percentage, star rating
- Cards animate on hover/tap
- Header displays kid's name and total stars

### 5.2 MathPage
- Houses the `MathSolver` widget
- Problem types: addition, subtraction, multiplication, counting
- Adaptive difficulty based on past performance
- Visual feedback: green glow for correct, shake animation for incorrect
- Score counter and progress bar

### 5.3 EnglishPage
- Houses the `AlphabetTracer` widget
- Letter tracing with touch/mouse input
- Audio pronunciation (Web Speech API or pre-recorded)
- Letter recognition mini-game (pick the correct letter)
- Simple word spelling exercises

### 5.4 ProgressPage
- Charts showing completed activities per subject
- Time spent per session
- Accuracy percentage per problem type
- Printable report

### 5.5 SettingsPage
- Difficulty selector (Easy / Medium / Hard)
- Sound toggle
- Reset progress button
- Kid profile management (name, avatar)

---

## 6. Component Tree

```
<App>
├── <Header />                              # shared component
│   ├── <Logo />
│   ├── <Navigation />                      # links to subjects
│   └── <StarCounter />                     # total stars earned
│
├── <Routes>
│   ├── <CatalogPage>                       # page
│   │   └── <SubjectCard>                   # widget (× N)
│   │       ├── <Icon />
│   │       ├── <ProgressRing />
│   │       └── <Button variant="secondary" />
│   │
│   ├── <MathPage>                          # page
│   │   └── <MathSolver>                    # widget
│   │       ├── <ProblemDisplay />
│   │       ├── <AnswerInput />
│   │       ├── <FeedbackOverlay />
│   │       └── <ScoreBar />
│   │
│   ├── <EnglishPage>                       # page
│   │   └── <AlphabetTracer>               # widget
│   │       ├── <TracingCanvas />
│   │       ├── <LetterPrompt />
│   │       └── <AudioButton />
│   │
│   ├── <ProgressPage>                      # page
│   │   └── <ProgressChart />               # widget
│   │
│   └── <SettingsPage>                      # page
│       └── <SettingsPanel />               # widget
│
└── <Footer />                              # shared component
```

---

## 7. Data Flow

### 7.1 State Architecture

```
Global State (React Context / useReducer)
├── user          # profile, name, avatar
├── progress      # per-subject scores, completion %
├── settings      # difficulty, sound on/off
└── session       # current activity state
```

- **Pages** read from global context and pass props down to widgets/components
- **Widgets** contain their own local state for interaction (e.g., current math problem, tracing path)
- **Services** persist state to localStorage (Phase 1) or a backend API (Phase 2)

### 7.2 Data Flow Example: Solving a Math Problem

```
User taps "Start" on MathPage
  → MathPage dispatches SESSION_START to context
  → MathPage renders <MathSolver difficulty={settings.difficulty}>
    → MathSolver calls useMathProblems(difficulty) hook
      → Hook calls service.generateProblem(difficulty)
        → Service uses utils/random.js to generate operands
      → Hook returns { problem, answer, hints }
    → MathSolver renders ProblemDisplay with current problem
    → User types answer, submits
    → MathSolver validates answer via utils/validateAnswer.js
    → MathSolver dispatches ANSWER_SUBMITTED { correct, score }
    → Context updates progress totals
    → FeedbackOverlay shows correct/incorrect animation
    → Next problem loads automatically
```

### 7.3 Persistence Strategy (Phase 1)

- **localStorage** via `services/storage.js`
- Keys: `mathapp_user`, `mathapp_progress`, `mathapp_settings`
- Data serialized as JSON, versioned for migration

---

## 8. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | React 18 + Vite | Fast dev server, HMR, modern JSX transform |
| Routing | React Router v6 | Declarative nested routes |
| Styling | CSS Modules | Scoped styles, no runtime cost |
| State | React Context + useReducer | Simple enough; no need for Redux at this scale |
| Testing | Vitest + React Testing Library | Vite-native, fast, encourages good practices |
| Linting | ESLint + eslint-plugin-react | Catch bugs early |
| Validation | Python scripts (custom) | Enforce project conventions |
| Audio | Web Speech API | Built-in browser TTS for pronunciation |
| Canvas | HTML5 Canvas | Letter tracing (AlphabetTracer) |

---

## 9. Non-Functional Requirements

### Performance
- Lighthouse score target: >90 for all categories
- Bundle size: <200KB initial JS (code-split by route)
- Animation frame rate: 60fps for tracing canvas
- First Contentful Paint (FCP): <1.5s

### Accessibility
- WCAG 2.1 AA compliance
- All interactive elements keyboard-navigable
- Color contrast ratio >= 4.5:1
- `aria-label` on icon-only buttons
- Focus indicators visible on all elements

### Security
- No `dangerouslySetInnerHTML` (blocked by lint)
- No storage of PII beyond local device
- Input sanitization on any user-provided text
- CSP headers on production build

### Internationalization (future)
- i18n-ready: all user-facing strings extracted to locale files
- RTL layout support in CSS module structure
- Number formatting via `Intl.NumberFormat`

---

## 10. Constraints & Known Limitations

### Phase 1 Constraints
- No backend server — all data stored in localStorage
- No user authentication — single local profile
- No multiplayer or leaderboard
- Audio limited to browser's Web Speech API (no pre-recorded audio)
- No offline service worker (future enhancement)

### Technical Constraints
- Python 3.8+ required for validation scripts
- Modern browser only (Chrome, Firefox, Safari, Edge — latest 2 versions)
- Touch support required for tablet use
- Canvas-based tracing limits AlphabetTracer to devices with PointerEvents

---

## 11. Future Enhancements (Phase 2+)

- Backend API with PostgreSQL for cross-device progress sync
- User authentication (parent + child profiles)
- Admin dashboard for adding custom problem sets
- Multiplayer math challenges
- Printable worksheet generator
- Mobile app via Capacitor or React Native
- AI-powered adaptive learning path
