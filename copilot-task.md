# MVP Plan for Resume Buddy
You are my engineering planner. Do not write any application code yet. Do NOT write tests.

Create a new markdown file in the repository root named `MVP_PLAN.md`. Populate it with a detailed, implementation-ready plan for the React + PrimeReact + Zustand MVP described below.

# Project Name
resume-buddy

# Context & Problem
We’re building an MVP called “Resume Buddy” (product hosted in the repo `resume-buddy`). Users upload their resume and select which sections their resume contains (e.g., Summary, Skills, Experience). We analyze ONLY the sections the user claims to include, to avoid nagging about intentionally omitted sections. For this MVP, there is **no backend** (Node/Express + Dify will be implemented later). We want a clean, testable UI skeleton with state hooks and **explicit insertion points** for the future API.

# High-Level Goals
- Front-end only scaffold with **React + Vite + TypeScript**.
- **PrimeReact** UI with a top header, primary content area, and a **right-side actions sidebar**.
- **Use PrimeReact `FileUpload`** for file input (single file). Allow extensions **`.pdf` and `.docx`** only. Exclude `.doc` in MVP.
- Section checkbox matrix that shapes the future analysis request.
- Buttons: **Analyze Resume**, **View Analysis** (modal), **Save Analysis** (localStorage; present even if initially a no-op).
- No real analysis call yet; use a **mocked analysis object stored in Zustand** after a simulated async delay.
- Strict validation: file type/size, and section selection rule (at least one or an explicit “none” acknowledgement).
- Clear separation of concerns (components, store, utils) and a future API client placeholder.

# Target Project Structure
Document and adopt the following structure in the plan. (Create stubs later during implementation; for now, just plan them.)

src/
  components/
    Header.tsx
    UploadPanel.tsx
    ActionsSidebar.tsx
    AnalysisModal.tsx
  pages/
    Home.tsx
  store/
    useAnalysisStore.ts
  utils/
    fileValidation.ts
  App.tsx
  main.tsx
  index.css

Also include top-level files expected by Vite/TS tooling (no code, just list them in the plan):
- `index.html`
- `tsconfig.json`
- `vite.config.ts`
- `.eslintrc.cjs` (or `.eslintrc.js`)
- `.prettierrc` (or package.json config)
- `README.md` (placeholder)
- `MVP_PLAN.md` (this document)

# Tooling & Dependencies
List and justify these packages in the plan (no installation yet):
- Runtime: `react`, `react-dom`, **`primereact`**, **`primeicons`**, **`primeflex`**, **`zustand`**, **`zod`**, **`react-hook-form`**
- Dev: `typescript`, `vite`, `@types/react`, `@types/react-dom`, `eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-react`, `eslint-plugin-react-hooks`
- PrimeReact theme: e.g., **Lara Light Blue**; specify exact CSS import order (theme → primereact.min.css → primeicons → primeflex → index.css)

# PrimeReact FileUpload Requirements
Plan to use **PrimeReact `FileUpload`** with:
- **mode**: `basic` (MVP), single file
- **chooseLabel**: “Upload Resume”
- **accept**: `.pdf,.docx` (document this explicitly)
- **maxFileSize**: choose a cap (e.g., 5–8 MB)
- **onSelect/onClear** handlers to set/clear `uploadedFile` in Zustand
- Disable “Analyze Resume” if no valid file is present.
- Optional future: `customUpload` (false in MVP; true later when wired to backend).

# State Management (Zustand)
Define the initial store shape and actions in the plan (TypeScript-style interfaces as comments in the plan only; do not create code files yet):
- **State**
  - `uploadedFile: File | null`
  - `allowedSections: Record<SectionName, boolean>`
  - `analysis: AnalysisResult | null`
  - `isModalOpen: boolean`
  - `isAnalyzing: boolean`
- **Actions**
  - `setUploadedFile(file: File | null)`
  - `setSections(map: Record<SectionName, boolean>)`
  - `toggleSection(name: SectionName, value?: boolean)`
  - `setAnalysis(analysis: AnalysisResult | null)`
  - `openModal()`, `closeModal()`
  - `simulateAnalyze()` → sets `isAnalyzing` true, waits ~700ms, then loads `analysisMock`
  - `saveToLocalStorage()`
  - `loadFromLocalStorage()`

Include a commented interface for `AnalysisResult` with these fields:
- `summary: string`
- `skillsDetected: string[]`
- `industriesInferred: string[]`
- `misreads: string[]`
- `suggestions: string[]`
- `score: number` (0–100)
- `sectionsConsidered: SectionName[]`
- `sourceFilename: string`
- `createdAtISO: string`

And define `SectionName` as a union of:
`"summary" | "skills" | "experience" | "education" | "projects" | "certifications" | "publications" | "awards" | "volunteering"`

# Validation Rules
- **File types**: allow `.pdf`, `.docx` only (justify excluding `.doc` in MVP; can be supported server-side later).
- **File size limit**: document a concrete cap (e.g., 8 MB).
- **Section rule**: at least one section must be selected **or** the user must explicitly “Proceed without sections” (include UX for this, e.g., a small confirm checkbox).
- Error handling via PrimeReact **Toast**; enumerate user-friendly messages.

# Component Specifications
Describe the visuals, props, and interactions (no code) for each:

**Header**
- App title (“Resume Buddy” or “Resume Buddy”) + placeholder for future nav.

**UploadPanel**
- Uses **PrimeReact `FileUpload`** with the constraints above.
- Shows a compact preview: filename, size, and file-type chip.
- Section checkboxes (via `react-hook-form` + `zod` schema planned, not implemented):
  - Summary, Skills, Experience, Education, Projects, Certifications, Publications, Awards, Volunteering.
- Disabled “Analyze Resume” until a valid file and section rule satisfied.

**ActionsSidebar**
- Buttons and disabled states:
  - **Analyze Resume**: disabled until valid file + section rule
  - **View Analysis**: disabled until `analysis` exists
  - **Save Analysis**: enabled only when `analysis` exists (persist to `localStorage`)
- Small status block (e.g., “No analysis yet” / “Analysis ready” / “Analyzing…”)

**AnalysisModal**
- PrimeReact **Dialog** with scrollable content
- Renders `analysis` nicely:
  - Overview summary
  - Skills (pills)
  - Misreads & Suggestions (lists)
  - “AI Readability Score” with a simple meter (PrimeReact `Tag`/`Rating`/`ProgressBar` later)
  - Sections considered & source filename

**Home Page Layout**
- PrimeFlex grid: Left (~70%) = UploadPanel; Right (~30%) = ActionsSidebar
- Responsive behavior notes (sidebar stacks under on small screens)

**Toasts**
- Centralized `<Toast>` provider (e.g., in `App.tsx`)
- Use for validation errors and “Saved to localStorage”

# Interactions & Flows
- **Upload flow**: user selects file → validation → `uploadedFile` stored.
- **Section selection**: toggles update `allowedSections`.
- **Analyze click**: call `simulateAnalyze()` → show loading state → populate `analysis` from `analysisMock`.
- **View Analysis**: `openModal()`; closing keeps state intact.
- **Save Analysis**: append to **localStorage** array with shape:
  `{ id, createdAtISO, filename, sections, analysis }`.
- **LocalStorage key**: `resume-buddy:analyses` (document why we keep this name for continuity; or propose `resume-buddy:analyses` and recommend a migration note).

# LocalStorage Contract
- Key (choose and document): **`resume-buddy:analyses`** (preferred) OR legacy-compatible `resume-buddy:analyses`
- Value: array of:

{
id: string,
createdAtISO: string,
filename: string,
sections: Record<SectionName, boolean>,
analysis: AnalysisResult
}

- Optional: load existing analyses on app init (defer if out of scope)

# Accessibility & UX Notes
- FileUpload: visible label, aria-describedby for constraints (types/size)
- Checkboxes: each with label; group with fieldset/legend
- Dialog: focus trap, ESC to close, close button labeled for screen readers
- Tooltips on disabled buttons explaining why

# Deferred (Not in MVP)
- Client-side parsing of PDF/DOCX to extract text
- Real backend call to Node/Express + Dify
- `.doc` legacy support
- Multi-model selection and JD comparison
- Dual-upload “Compare Resumes” flow (next milestone)
- Theming customization beyond base PrimeReact theme

# Milestones & Acceptance Criteria
- **M0**: Skeleton components render; Zustand store wired; FileUpload accepts `.pdf,.docx`; disabled states correct.
- **M1**: Validation + sections form; Analyze triggers mock analysis with loading state.
- **M2**: AnalysisModal renders full mocked analysis; Save → localStorage persists; Toasts for success/errors.
- **M3**: Polish: tooltips, empty states, accessible labels; basic responsiveness.

For each milestone, provide a short demo script QA can follow.

# Open Questions
- Finalize file size cap (5 MB vs 8 MB)
- Confirm theme (e.g., Lara Light Blue)
- LocalStorage key naming (`resume-buddy:analyses` vs legacy)
- Copy tone for validation (friendly vs terse)
- “Proceed without sections” confirmation UX (checkbox vs modal)

IMPORTANT:
- Do not write or modify any application source files yet.
- Do not scaffold routes or additional pages yet.
- Do not write tests.
- Your only output is the single `MVP_PLAN.md` file in the repo root.