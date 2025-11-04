# MVP Plan: Resume Buddy

**Project**: `resume-buddy`  
**Version**: MVP (Milestone 0–3)  
**Date**: November 4, 2025  
**Stack**: React + Vite + TypeScript + PrimeReact + Zustand  
**Backend**: Deferred (future Node/Express + Dify integration)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Context & Problem Statement](#context--problem-statement)
3. [High-Level Goals](#high-level-goals)
4. [Technical Stack & Dependencies](#technical-stack--dependencies)
5. [Project Structure](#project-structure)
6. [Type Definitions](#type-definitions)
7. [State Management (Zustand)](#state-management-zustand)
8. [Component Specifications](#component-specifications)
9. [PrimeReact FileUpload Configuration](#primereact-fileupload-configuration)
10. [Validation Rules](#validation-rules)
11. [User Interaction Flows](#user-interaction-flows)
12. [LocalStorage Persistence Contract](#localstorage-persistence-contract)
13. [CSS & Theme Configuration](#css--theme-configuration)
14. [Accessibility & UX Considerations](#accessibility--ux-considerations)
15. [Milestones & Acceptance Criteria](#milestones--acceptance-criteria)
16. [Deferred Features](#deferred-features)
17. [Open Questions](#open-questions)

---

## Executive Summary

Resume Buddy is a front-end-only MVP that allows users to:
1. **Upload** a resume (`.pdf` or `.docx`)
2. **Select** which sections their resume contains (e.g., Summary, Skills, Experience)
3. **Analyze** the resume (mocked in MVP with simulated async delay)
4. **View** analysis results in a modal dialog
5. **Save** analysis history to browser localStorage

This MVP establishes the UI skeleton, state management patterns, validation flows, and **explicit insertion points** for future backend integration. No actual PDF/DOCX parsing or AI analysis occurs; we use a hard-coded mock object to simulate the complete user journey.

---

## Context & Problem Statement

**Problem**: Job seekers need feedback on their resumes but don't want to be nagged about sections they intentionally excluded (e.g., "Publications" or "Awards" for early-career candidates).

**Solution**: Resume Buddy analyzes **only the sections the user claims to include**, providing targeted feedback without false positives about "missing" content.

**MVP Scope**: Build a robust, testable UI with clear separation of concerns. Mock the analysis logic. Prepare explicit hooks (e.g., `apiClient.ts` placeholder) for future backend calls to Node/Express + Dify.

---

## High-Level Goals

- ✅ **Front-end only**: React + Vite + TypeScript scaffold
- ✅ **PrimeReact UI**: Header, main content area, **right-side actions sidebar**
- ✅ **PrimeReact FileUpload**: Single file, `.pdf` and `.docx` only (exclude `.doc` in MVP)
- ✅ **Section selection matrix**: Checkboxes shape the future analysis request payload
- ✅ **Three primary actions**:
  - **Analyze Resume** (mocked async call)
  - **View Analysis** (modal dialog)
  - **Save Analysis** (persist to localStorage)
- ✅ **Strict validation**: File type/size checks + section selection rule
- ✅ **Zustand state management**: Single source of truth for upload, sections, analysis
- ✅ **Clear separation of concerns**: `/components`, `/store`, `/utils`, `/pages`
- ✅ **Future-ready**: API client placeholder, typed interfaces for backend contract

---

## Technical Stack & Dependencies

### Runtime Dependencies

| Package | Version | Justification |
|---------|---------|---------------|
| `react` | `^18.3.0` | Core UI library |
| `react-dom` | `^18.3.0` | DOM rendering |
| `primereact` | `^10.8.0` | Production-ready component library (FileUpload, Dialog, Button, Toast, etc.) |
| `primeicons` | `^7.0.0` | Icon set for PrimeReact components |
| `primeflex` | `^3.3.1` | Flexbox/grid utilities for responsive layout |
| `zustand` | `^4.5.0` | Lightweight state management (simpler than Redux/Context for MVP) |
| `zod` | `^3.23.0` | Schema validation for file upload and form inputs |
| `react-hook-form` | `^7.53.0` | Form state management with built-in validation (integrates with Zod) |

### Development Dependencies

| Package | Version | Justification |
|---------|---------|---------------|
| `typescript` | `^5.5.0` | Type safety and IDE support |
| `vite` | `^5.4.0` | Fast dev server and build tool |
| `@types/react` | `^18.3.0` | React type definitions |
| `@types/react-dom` | `^18.3.0` | ReactDOM type definitions |
| `eslint` | `^9.0.0` | Code linting |
| `prettier` | `^3.3.0` | Code formatting |
| `eslint-config-prettier` | `^9.1.0` | Disable ESLint rules that conflict with Prettier |
| `eslint-plugin-react` | `^7.35.0` | React-specific linting rules |
| `eslint-plugin-react-hooks` | `^4.6.0` | Enforce Rules of Hooks |

### Installation Command (for future reference)

```bash
npm install react react-dom primereact primeicons primeflex zustand zod react-hook-form

npm install -D typescript vite @types/react @types/react-dom eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```

---

## Project Structure

Adopt this structure during implementation:

```
resume-buddy/
├── index.html                   # Vite entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # Base TS config
├── tsconfig.app.json            # App-specific TS config (if using Vite template)
├── tsconfig.node.json           # Node-specific TS config (Vite tooling)
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint flat config (or .eslintrc.cjs)
├── .prettierrc                  # Prettier config (or in package.json)
├── README.md                    # Basic project info
├── MVP_PLAN.md                  # This document
├── public/                      # Static assets (favicon, etc.)
├── src/
│   ├── main.tsx                 # React app entry point
│   ├── App.tsx                  # Root component (Toast provider, routing stub)
│   ├── index.css                # Global styles (after PrimeReact imports)
│   ├── components/
│   │   ├── Header.tsx           # Top app header
│   │   ├── UploadPanel.tsx      # File upload + section checkboxes
│   │   ├── ActionsSidebar.tsx   # Right sidebar with action buttons
│   │   └── AnalysisModal.tsx    # Dialog for viewing analysis results
│   ├── pages/
│   │   └── Home.tsx             # Main page layout (UploadPanel + ActionsSidebar)
│   ├── store/
│   │   └── useAnalysisStore.ts  # Zustand store for app state
│   ├── utils/
│   │   ├── fileValidation.ts    # File type/size validation logic
│   │   └── apiClient.ts         # Placeholder for future backend calls
│   └── types/
│       └── index.ts             # Shared TypeScript types
```

### Rationale

- **`/components`**: Reusable UI blocks
- **`/pages`**: Top-level page layouts (future: routing)
- **`/store`**: Centralized Zustand stores (may expand to multiple stores)
- **`/utils`**: Pure functions (validation, API client stub)
- **`/types`**: Shared TypeScript interfaces/types

---

## Type Definitions

Define these types in `src/types/index.ts`:

```typescript
/**
 * Section names that can appear in a resume.
 * User selects which sections their resume contains.
 */
export type SectionName =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "publications"
  | "awards"
  | "volunteering";

/**
 * Analysis result returned by the backend (mocked in MVP).
 */
export interface AnalysisResult {
  /** Brief summary of the analysis */
  summary: string;

  /** Skills detected in the resume */
  skillsDetected: string[];

  /** Inferred industries based on resume content */
  industriesInferred: string[];

  /** OCR misreads or parsing errors */
  misreads: string[];

  /** Actionable suggestions for improvement */
  suggestions: string[];

  /** AI readability score (0–100) */
  score: number;

  /** Sections that were considered in the analysis */
  sectionsConsidered: SectionName[];

  /** Original filename */
  sourceFilename: string;

  /** ISO 8601 timestamp of analysis creation */
  createdAtISO: string;
}

/**
 * Persisted analysis entry in localStorage.
 */
export interface SavedAnalysis {
  /** Unique identifier (UUID or timestamp-based) */
  id: string;

  /** ISO 8601 timestamp of when this was saved */
  createdAtISO: string;

  /** Original filename */
  filename: string;

  /** User-selected sections at time of analysis */
  sections: Record<SectionName, boolean>;

  /** Full analysis result */
  analysis: AnalysisResult;
}
```

### Mock Data

Create a mock analysis object in `src/utils/analysisMock.ts`:

```typescript
import type { AnalysisResult, SectionName } from "../types";

export const analysisMock: AnalysisResult = {
  summary:
    "Your resume demonstrates strong technical skills with 5+ years of experience. Consider adding quantifiable achievements to your Experience section.",
  skillsDetected: [
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "PostgreSQL",
  ],
  industriesInferred: ["Software Engineering", "SaaS", "Cloud Computing"],
  misreads: [
    "Company name 'Acme Corp.' may have been OCR'd as 'Acme Con.'",
    "Date range '2020-2023' appears as '2020-202S' in Skills section.",
  ],
  suggestions: [
    "Add specific metrics (e.g., 'Reduced load time by 40%') to Experience bullets.",
    "Include a brief Summary section (2-3 sentences) at the top.",
    "Spell out acronyms on first use (e.g., 'Amazon Web Services (AWS)').",
    "Consider adding a Projects section to showcase side work.",
  ],
  score: 78,
  sectionsConsidered: ["summary", "skills", "experience", "education"],
  sourceFilename: "john_doe_resume.pdf",
  createdAtISO: new Date().toISOString(),
};
```

---

## State Management (Zustand)

Create `src/store/useAnalysisStore.ts` with the following structure:

### Store Shape

```typescript
interface AnalysisStore {
  // -------------------
  // STATE
  // -------------------

  /** Currently uploaded file (null if none) */
  uploadedFile: File | null;

  /** Map of section names to boolean (true = user claims resume includes this section) */
  allowedSections: Record<SectionName, boolean>;

  /** Analysis result (null if no analysis has been run) */
  analysis: AnalysisResult | null;

  /** Whether the analysis modal is open */
  isModalOpen: boolean;

  /** Whether an analysis is currently in progress (loading state) */
  isAnalyzing: boolean;

  /** User acknowledgment that they want to proceed without selecting sections (edge case) */
  proceedWithoutSections: boolean;

  // -------------------
  // ACTIONS
  // -------------------

  /** Set or clear the uploaded file */
  setUploadedFile: (file: File | null) => void;

  /** Bulk-set the allowed sections map */
  setSections: (sections: Record<SectionName, boolean>) => void;

  /** Toggle a single section on/off */
  toggleSection: (name: SectionName, value?: boolean) => void;

  /** Set the analysis result */
  setAnalysis: (analysis: AnalysisResult | null) => void;

  /** Open the analysis modal */
  openModal: () => void;

  /** Close the analysis modal */
  closeModal: () => void;

  /** Simulate an async analyze call (mock in MVP) */
  simulateAnalyze: () => Promise<void>;

  /** Save current analysis to localStorage */
  saveToLocalStorage: () => void;

  /** Load analyses from localStorage on app init */
  loadFromLocalStorage: () => SavedAnalysis[];

  /** Set the "proceed without sections" acknowledgment */
  setProceedWithoutSections: (value: boolean) => void;

  /** Reset state (for future "New Analysis" feature) */
  reset: () => void;
}
```

### Key Behaviors

1. **`simulateAnalyze()`**:
   - Sets `isAnalyzing = true`
   - Waits ~700ms (simulates network call)
   - Loads `analysisMock` with `sectionsConsidered` set to the user's selected sections
   - Updates `sourceFilename` to match `uploadedFile.name`
   - Sets `createdAtISO` to current timestamp
   - Sets `isAnalyzing = false`
   - Sets `analysis` to the mocked result

2. **`saveToLocalStorage()`**:
   - Reads existing array from `localStorage.getItem("resume-buddy:analyses")`
   - Appends a new `SavedAnalysis` object with a unique ID (use `crypto.randomUUID()` or timestamp)
   - Writes back to localStorage
   - Shows a success Toast

3. **`loadFromLocalStorage()`**:
   - Reads and parses the array from localStorage
   - Returns it (or empty array if key doesn't exist)
   - Used for future "View History" feature (not in MVP UI, but store method exists)

4. **`reset()`**:
   - Clears `uploadedFile`, `allowedSections`, `analysis`
   - Closes modal
   - Resets `proceedWithoutSections` to false
   - Used for "New Analysis" button (future feature)

---

## Component Specifications

### 1. `Header.tsx`

**Purpose**: Top application header with branding.

**Props**: None (static in MVP).

**Visual**:
- Full-width bar (PrimeFlex: `flex align-items-center p-3`)
- App title: "Resume Buddy" (use PrimeReact `<span className="text-2xl font-bold">` or similar)
- Optional: small tagline ("AI-Powered Resume Feedback")
- Future: navigation links or user menu

**Accessibility**:
- Use semantic `<header>` element
- Logo/title should be an `<h1>` or have `aria-label="Resume Buddy application"`

---

### 2. `UploadPanel.tsx`

**Purpose**: Main content area for file upload and section selection.

**Props**: None (reads/writes directly to Zustand store).

**Layout**:
- Top section: **PrimeReact FileUpload** component
- Middle section: **Section Checkboxes** (9 checkboxes in a responsive grid)
- Bottom section: "Proceed without sections" checkbox (edge case handling)

#### FileUpload Configuration

See [PrimeReact FileUpload Configuration](#primereact-fileupload-configuration) section below.

#### Section Checkboxes

- Use `react-hook-form` to manage checkbox state (optional in MVP; can directly wire to Zustand)
- Layout: PrimeFlex grid (e.g., `grid` with `col-12 md:col-6 lg:col-4` for responsive columns)
- Each checkbox:
  - Label: Capitalized section name (e.g., "Summary", "Skills")
  - `checked={allowedSections[sectionName]}`
  - `onChange={() => toggleSection(sectionName)}`
- Group with `<fieldset>` and `<legend>Select Resume Sections</legend>` for accessibility

#### "Proceed Without Sections" Checkbox

- Small checkbox below the section grid
- Label: "I understand my resume has none of these sections (or I want to skip this step)"
- Only enable "Analyze Resume" if:
  - At least one section is selected, **OR**
  - This checkbox is checked
- Wire to `proceedWithoutSections` in Zustand

#### Validation Messages

- If user clicks "Analyze Resume" without a file: show Toast error
- If user clicks "Analyze Resume" without sections and without "proceed" checkbox: show Toast error

---

### 3. `ActionsSidebar.tsx`

**Purpose**: Right-side sidebar with action buttons and status display.

**Props**: None (reads from Zustand store).

**Layout** (PrimeFlex):
- Use `flex flex-column gap-3 p-3`
- Sticky positioning (optional): `style={{ position: 'sticky', top: '1rem' }}`

**Buttons** (PrimeReact `<Button>`):

1. **Analyze Resume**
   - Label: "Analyze Resume"
   - Icon: `pi pi-search` or `pi pi-chart-line`
   - Severity: `primary`
   - Disabled when:
     - `!uploadedFile`
     - `isAnalyzing === true`
     - No sections selected AND `proceedWithoutSections === false`
   - Click handler: `simulateAnalyze()`
   - Tooltip (when disabled): "Upload a resume and select at least one section"

2. **View Analysis**
   - Label: "View Analysis"
   - Icon: `pi pi-eye`
   - Severity: `info`
   - Disabled when: `!analysis`
   - Click handler: `openModal()`
   - Tooltip (when disabled): "No analysis available yet"

3. **Save Analysis**
   - Label: "Save Analysis"
   - Icon: `pi pi-save`
   - Severity: `success`
   - Disabled when: `!analysis`
   - Click handler: `saveToLocalStorage()`
   - Tooltip (when disabled): "Complete an analysis first"

**Status Block**:
- Small `<Panel>` or `<Card>` below buttons
- Content:
  - If `isAnalyzing`: "Analyzing…" with spinner (`<ProgressSpinner>`)
  - Else if `analysis`: "✅ Analysis ready" (green text)
  - Else: "No analysis yet" (gray text)

**Responsive Behavior**:
- On screens < 768px, sidebar stacks below UploadPanel (PrimeFlex: `col-12 md:col-4`)

---

### 4. `AnalysisModal.tsx`

**Purpose**: Display full analysis results in a modal dialog.

**Props**: None (reads `analysis` and `isModalOpen` from Zustand; calls `closeModal()`).

**Implementation**: PrimeReact `<Dialog>`

**Dialog Config**:
- `visible={isModalOpen}`
- `onHide={closeModal}`
- `header="Resume Analysis Results"`
- `modal={true}`
- `style={{ width: '90vw', maxWidth: '800px' }}`
- `draggable={false}`
- `resizable={false}`

**Content Sections** (render if `analysis` exists):

1. **Overview Summary**
   - `<p className="text-lg">{analysis.summary}</p>`

2. **AI Readability Score**
   - Display `analysis.score` out of 100
   - Visual: PrimeReact `<ProgressBar>` with `value={analysis.score}` and color based on score:
     - 0-50: red (`severity="danger"`)
     - 51-75: yellow (`severity="warning"`)
     - 76-100: green (`severity="success"`)
   - Or use `<Tag>` with score and appropriate color

3. **Skills Detected**
   - Render `analysis.skillsDetected` as PrimeReact `<Chip>` or `<Tag>` pills
   - Use `<div className="flex flex-wrap gap-2">`

4. **Industries Inferred**
   - Similar to Skills Detected; render `analysis.industriesInferred` as chips

5. **Misreads** (if any)
   - Heading: "Potential OCR Issues"
   - Render `analysis.misreads` as a `<ul>` list with `pi pi-exclamation-triangle` icons

6. **Suggestions**
   - Heading: "Suggestions for Improvement"
   - Render `analysis.suggestions` as a `<ul>` list with `pi pi-lightbulb` icons

7. **Metadata**
   - Small section at bottom:
     - "Sections Considered": comma-separated list of `analysis.sectionsConsidered`
     - "Source File": `analysis.sourceFilename`
     - "Analyzed On": formatted `analysis.createdAtISO` (e.g., `new Date(analysis.createdAtISO).toLocaleString()`)

**Footer**:
- "Close" button (PrimeReact `<Button label="Close" onClick={closeModal} />`)

**Accessibility**:
- Dialog has built-in focus trap and ESC key handler
- Ensure close button has `aria-label="Close analysis results"`

---

### 5. `Home.tsx` (Page)

**Purpose**: Main page layout combining UploadPanel and ActionsSidebar.

**Layout** (PrimeFlex grid):

```tsx
<div className="grid">
  <div className="col-12 md:col-8">
    <UploadPanel />
  </div>
  <div className="col-12 md:col-4">
    <ActionsSidebar />
  </div>
</div>
```

**Responsive Behavior**:
- Desktop (≥768px): 70/30 split (upload panel on left, sidebar on right)
- Mobile (<768px): Stacked (upload panel full-width, sidebar full-width below)

---

### 6. `App.tsx` (Root)

**Purpose**: Root component with global providers.

**Structure**:

```tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AnalysisModal from './components/AnalysisModal';

export default function App() {
  const toast = useRef<Toast>(null);

  // Optionally expose toast ref via context or Zustand for global access
  // For MVP: pass toast.current to components that need it, or use Zustand

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <main className="p-4">
        <Home />
      </main>
      <AnalysisModal />
    </>
  );
}
```

**Notes**:
- `<Toast>` is a global singleton for all notifications
- `<AnalysisModal>` is rendered at root level (controlled by Zustand `isModalOpen`)
- Future: Add React Router here for multi-page navigation

---

## PrimeReact FileUpload Configuration

Use **PrimeReact `<FileUpload>`** with the following configuration:

### Basic Setup

```tsx
<FileUpload
  mode="basic"
  name="resume"
  accept=".pdf,.docx"
  maxFileSize={8388608} // 8 MB in bytes
  chooseLabel="Upload Resume"
  auto={false}
  customUpload={false}
  onSelect={handleFileSelect}
  onClear={handleFileClear}
  disabled={isAnalyzing}
/>
```

### Props Explained

- **`mode="basic"`**: Simple button-only upload (no drag-and-drop or preview in MVP)
- **`accept=".pdf,.docx"`**: Only allow PDF and DOCX files
  - **Why exclude `.doc`?** Legacy `.doc` format requires server-side parsing with complex libraries (e.g., `antiword`, `catdoc`). Modern `.docx` (Office Open XML) is more structured and easier to parse in future backend. MVP focuses on common formats.
- **`maxFileSize`**: **8 MB** (8,388,608 bytes)
  - Rationale: Typical resumes are 50–500 KB. 8 MB provides headroom for image-heavy resumes or portfolios.
  - Alternative: 5 MB (5,242,880 bytes) if we want to be more restrictive. **Decision needed** (see [Open Questions](#open-questions)).
- **`chooseLabel`**: Button text
- **`auto={false}`**: Don't auto-upload (no backend in MVP)
- **`customUpload={false}`**: Use default upload behavior (set to `true` later when wiring to backend)
- **`onSelect`**: Fires when user selects a file; validate and store in Zustand
- **`onClear`**: Fires when user clears the file; set `uploadedFile` to `null`

### Validation in `onSelect`

In the `handleFileSelect` function:

1. Check file type (must be `.pdf` or `.docx`)
2. Check file size (must be ≤ `maxFileSize`)
3. If valid: `setUploadedFile(file)`
4. If invalid: show Toast error and prevent upload

### File Preview

After successful upload, display a compact preview below the FileUpload button:

- **Filename**: `uploadedFile.name`
- **Size**: `(uploadedFile.size / 1024).toFixed(2)} KB` or `(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`
- **Type badge**: PrimeReact `<Tag>` with value "PDF" or "DOCX" (infer from file extension)
- **Remove button**: Small icon button (`pi pi-times`) to clear the file

---

## Validation Rules

### File Validation

Implement in `src/utils/fileValidation.ts`:

```typescript
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: File): FileValidationResult {
  const allowedExtensions = [".pdf", ".docx"];
  const maxSizeBytes = 8 * 1024 * 1024; // 8 MB

  // Check extension
  const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return {
      isValid: false,
      error: "Only PDF and DOCX files are supported right now. Please try again with a different format.",
    };
  }

  // Check size
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: "File size must be less than 8 MB. Please try a smaller file.",
    };
  }

  return { isValid: true };
}
```

### Section Selection Validation

**Rule**: User must either:
- Select **at least one section**, OR
- Check the "Proceed without sections" acknowledgment checkbox

**Enforcement**: Disable "Analyze Resume" button until rule is satisfied.

**User-Friendly Error Message** (if button is clicked while disabled):
- "Please upload a resume and select at least one section, or acknowledge that you want to proceed without sections."

### Toast Error Messages

Use PrimeReact `<Toast>` with `severity="error"` for validation failures:

- **Invalid file type**: "Only PDF and DOCX files are supported right now. Please try again with a different format."
- **File too large**: "File size must be less than 8 MB. Please try a smaller file."
- **No sections selected**: "Please select at least one resume section or check 'Proceed without sections'."
- **No file uploaded**: "Please upload a resume before analyzing."

### Toast Success Messages

- **Analysis saved**: "Analysis saved to browser storage."
- **Analysis complete**: "Analysis complete! Click 'View Analysis' to see results."

---

## User Interaction Flows

### Flow 1: Upload and Analyze (Happy Path)

1. User lands on Home page
2. User clicks "Upload Resume" button (PrimeReact FileUpload)
3. User selects a `.pdf` or `.docx` file from their system
4. App validates file (type + size)
   - **If valid**: File preview appears; `uploadedFile` stored in Zustand
   - **If invalid**: Toast error; file is not stored
5. User checks sections their resume contains (e.g., "Summary", "Skills", "Experience")
6. User clicks "Analyze Resume" button
7. App shows loading state (button disabled, spinner in status block)
8. After ~700ms, mock analysis appears in Zustand store
9. Toast success: "Analysis complete!"
10. "View Analysis" and "Save Analysis" buttons become enabled
11. User clicks "View Analysis"
12. Modal opens with full analysis results
13. User reviews results, closes modal
14. User clicks "Save Analysis"
15. Analysis is saved to localStorage; Toast success

### Flow 2: Invalid File Handling

1. User uploads a `.doc` file
2. Validation fails: Toast error "Only PDF and DOCX files are supported right now. Please try again with a different format."
3. File is not stored; "Analyze Resume" remains disabled
4. User uploads a valid `.pdf` file
5. Validation passes; user proceeds with analysis

### Flow 3: No Sections Selected

1. User uploads a valid file
2. User does **not** check any section checkboxes
3. "Analyze Resume" button is disabled
4. User hovers over button; tooltip: "Select at least one section or check 'Proceed without sections'"
5. User checks "Proceed without sections" checkbox
6. "Analyze Resume" button becomes enabled
7. User clicks "Analyze Resume"
8. Analysis runs with `sectionsConsidered: []` (empty array in mock)

### Flow 4: View Saved Analyses (Future)

_(Deferred in MVP, but localStorage contract supports this)_

1. User clicks "View History" button (not in MVP UI)
2. Modal opens with list of saved analyses
3. User clicks on a past analysis
4. Analysis details are displayed (reuse AnalysisModal)

---

## LocalStorage Persistence Contract

### Storage Key

**`resume-buddy:analyses`**

Rationale: Namespaced to avoid collisions with other apps. The colon (`:`) is a common convention for namespace separation in localStorage keys.

**Alternative**: `resumeBuddy_analyses` (camelCase with underscore). Choose one and document it.

**Recommendation**: Use **`resume-buddy:analyses`** for consistency with repository name.

### Data Structure

```typescript
// Stored as JSON string in localStorage
const storageKey = "resume-buddy:analyses";

// Parsed value is an array of SavedAnalysis objects
type StoredData = SavedAnalysis[];
```

### Example Stored Object

```json
[
  {
    "id": "a3f2b9c1-4e5d-6f7a-8b9c-0d1e2f3a4b5c",
    "createdAtISO": "2025-11-04T14:32:15.123Z",
    "filename": "john_doe_resume.pdf",
    "sections": {
      "summary": true,
      "skills": true,
      "experience": true,
      "education": true,
      "projects": false,
      "certifications": false,
      "publications": false,
      "awards": false,
      "volunteering": false
    },
    "analysis": {
      "summary": "Your resume demonstrates...",
      "skillsDetected": ["React", "TypeScript", "Node.js"],
      "industriesInferred": ["Software Engineering"],
      "misreads": [],
      "suggestions": ["Add metrics to Experience section."],
      "score": 78,
      "sectionsConsidered": ["summary", "skills", "experience", "education"],
      "sourceFilename": "john_doe_resume.pdf",
      "createdAtISO": "2025-11-04T14:32:15.123Z"
    }
  }
]
```

### Save Operation

```typescript
// In Zustand store's saveToLocalStorage() action:
const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
const newEntry: SavedAnalysis = {
  id: crypto.randomUUID(), // Or use Date.now().toString()
  createdAtISO: new Date().toISOString(),
  filename: uploadedFile!.name,
  sections: { ...allowedSections },
  analysis: { ...analysis! },
};
existing.push(newEntry);
localStorage.setItem(storageKey, JSON.stringify(existing));
```

### Load Operation

```typescript
// In Zustand store's loadFromLocalStorage() action:
const raw = localStorage.getItem(storageKey);
if (!raw) return [];
return JSON.parse(raw) as SavedAnalysis[];
```

### Future: View History

When implementing "View History" (post-MVP):
1. Call `loadFromLocalStorage()` to get all saved analyses
2. Display in a list (table or cards)
3. Allow user to click on an entry to view details
4. Optional: Delete button for each entry

---

## CSS & Theme Configuration

### PrimeReact Theme

**Recommended Theme**: **Lara Light Blue** (modern, professional)

Alternative: Lara Light Indigo, Material Design theme, or Bootstrap theme.

### CSS Import Order (Critical)

In `src/main.tsx` or `src/App.tsx`, import stylesheets in this exact order:

```tsx
// 1. PrimeReact theme (must be first)
import "primereact/resources/themes/lara-light-blue/theme.css";

// 2. PrimeReact core CSS
import "primereact/resources/primereact.min.css";

// 3. PrimeIcons
import "primeicons/primeicons.css";

// 4. PrimeFlex (optional but recommended)
import "primeflex/primeflex.css";

// 5. Custom app styles (last, so they can override)
import "./index.css";
```

**Why this order?**
- Theme CSS must load before core CSS to apply colors correctly
- PrimeIcons must load before components use icon classes
- PrimeFlex provides utility classes for layout
- Custom `index.css` comes last to allow overrides

### Custom Styles (`src/index.css`)

```css
/* Global resets and custom styles */

body {
  margin: 0;
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure full-height layout */
#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Custom spacing for main content */
main {
  flex: 1;
}

/* Optional: Override PrimeReact button radius for sharper look */
.p-button {
  border-radius: 4px;
}

/* Optional: Consistent card shadows */
.p-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode (Future)

PrimeReact supports dark themes (e.g., `lara-dark-blue`). To implement:
1. Add theme toggle button to Header
2. Store theme preference in localStorage
3. Dynamically switch theme CSS import (requires custom loader or Vite plugin)

Deferred in MVP; use light theme only.

---

## Accessibility & UX Considerations

### Keyboard Navigation

- All interactive elements (buttons, checkboxes, file upload) must be keyboard-accessible
- Modal dialogs should trap focus and close on ESC key (PrimeReact Dialog handles this)
- Buttons should have clear focus indicators (PrimeReact provides default styles)

### Screen Reader Support

1. **File Upload**:
   - Ensure `<FileUpload>` has a visible label ("Upload Resume")
   - Add `aria-describedby` to describe allowed file types and size limit
   - Example: `<span id="upload-help">Accepted formats: PDF, DOCX. Max size: 8 MB.</span>`

2. **Section Checkboxes**:
   - Wrap in `<fieldset>` with `<legend>Select Resume Sections</legend>`
   - Each checkbox has a `<label>` with `htmlFor` attribute

3. **Buttons**:
   - Use descriptive labels ("Analyze Resume", not "Analyze")
   - Add tooltips (via `tooltip` prop on PrimeReact Button) for disabled states
   - Example: `tooltip="Upload a resume first" tooltipOptions={{ showOnDisabled: true }}`

4. **Modal**:
   - Dialog has `aria-labelledby` (header text) and `aria-describedby` (summary)
   - Close button has `aria-label="Close analysis results"`

### Visual Feedback

- **Loading states**: Show spinner or progress bar during `isAnalyzing`
- **Success states**: Green checkmark or success Toast after analysis completes
- **Error states**: Red Toast with clear, actionable error messages
- **Disabled buttons**: Grayed out with cursor: not-allowed; tooltip explains why

### Responsive Design

- Use PrimeFlex grid (`grid`, `col-12`, `md:col-8`, etc.) for responsive layout
- Test on:
  - Desktop (≥1024px): Sidebar on right
  - Tablet (768px–1023px): Sidebar on right (narrower)
  - Mobile (<768px): Sidebar stacks below upload panel
- Ensure text is readable at all sizes (minimum 16px base font)

### Color Contrast

- Ensure all text meets WCAG AA standards (4.5:1 contrast ratio for normal text)
- PrimeReact themes are generally WCAG compliant, but verify custom colors

### Empty States

- **No file uploaded**: Show a friendly message like "Upload your resume to get started"
- **No analysis yet**: Status block shows "No analysis yet" in gray text
- **No sections selected**: Button disabled with tooltip

---

## Milestones & Acceptance Criteria

### Milestone 0: Project Scaffold & Skeleton Components

**Goal**: Set up tooling, create component files, wire Zustand store.

**Tasks**:
1. Initialize Vite + React + TypeScript project (or use existing scaffold)
2. Install dependencies (PrimeReact, Zustand, Zod, react-hook-form, etc.)
3. Configure ESLint, Prettier, and `tsconfig.json`
4. Import PrimeReact CSS in correct order
5. Create empty component files: `Header.tsx`, `UploadPanel.tsx`, `ActionsSidebar.tsx`, `AnalysisModal.tsx`, `Home.tsx`
6. Create Zustand store skeleton in `src/store/useAnalysisStore.ts` with initial state and placeholder actions
7. Wire up `App.tsx` with `<Toast>` provider and render `Home` page
8. Verify app runs without errors (`npm run dev`)

**Acceptance Criteria**:
- ✅ App renders in browser at `http://localhost:5173`
- ✅ Header displays "Resume Buddy" title
- ✅ UploadPanel and ActionsSidebar render (even if empty)
- ✅ No console errors
- ✅ PrimeReact theme is applied (buttons/components look styled)

**QA Demo Script**:
1. Run `npm run dev`
2. Open browser to `http://localhost:5173`
3. Verify page loads with header and two empty panels
4. Open browser DevTools console; verify no errors

---

### Milestone 1: File Upload & Validation

**Goal**: Implement PrimeReact FileUpload with validation, section checkboxes, and disabled button states.

**Tasks**:
1. Implement `FileUpload` component in `UploadPanel.tsx` with `accept=".pdf,.docx"` and `maxFileSize`
2. Implement `validateFile()` in `src/utils/fileValidation.ts`
3. Wire `onSelect` handler to validate and store file in Zustand
4. Display file preview (name, size, type badge) after successful upload
5. Add 9 section checkboxes (Summary, Skills, Experience, etc.) below file upload
6. Wire checkboxes to `allowedSections` in Zustand
7. Add "Proceed without sections" checkbox
8. Implement button disabled logic in `ActionsSidebar.tsx`:
   - "Analyze Resume" disabled unless file is uploaded AND (sections selected OR proceedWithoutSections)
   - "View Analysis" and "Save Analysis" disabled unless `analysis` exists
9. Add tooltips to disabled buttons
10. Test file type/size validation with invalid files

**Acceptance Criteria**:
- ✅ User can upload `.pdf` and `.docx` files
- ✅ Uploading `.doc` or `.txt` shows error Toast
- ✅ Uploading file >8 MB shows error Toast
- ✅ File preview displays correctly after valid upload
- ✅ Checkboxes toggle section selection in Zustand store
- ✅ "Analyze Resume" button is disabled until validation rules pass
- ✅ Tooltips explain why buttons are disabled

**QA Demo Script**:
1. Click "Upload Resume" and select a `.pdf` file <5 MB
2. Verify file preview appears (name, size, "PDF" badge)
3. Check 3 sections (e.g., Summary, Skills, Experience)
4. Verify "Analyze Resume" button is now enabled
5. Clear all section checkboxes
6. Verify "Analyze Resume" button is disabled
7. Check "Proceed without sections"
8. Verify "Analyze Resume" button is enabled again
9. Try uploading a `.doc` file
10. Verify error Toast: "Only PDF and DOCX files are supported right now. Please try again with a different format."
11. Try uploading a 10 MB file
12. Verify error Toast: "File size must be less than 8 MB. Please try a smaller file."

---

### Milestone 2: Mock Analysis Flow & Modal

**Goal**: Implement `simulateAnalyze()` action, display loading state, render analysis in modal.

**Tasks**:
1. Create `src/utils/analysisMock.ts` with hard-coded `AnalysisResult` object
2. Implement `simulateAnalyze()` in Zustand store:
   - Set `isAnalyzing = true`
   - Wait 700ms (`await new Promise(resolve => setTimeout(resolve, 700))`)
   - Clone `analysisMock` and update `sectionsConsidered`, `sourceFilename`, `createdAtISO`
   - Set `analysis` in store
   - Set `isAnalyzing = false`
   - Show success Toast
3. Wire "Analyze Resume" button to call `simulateAnalyze()`
4. Display loading state in `ActionsSidebar` status block (spinner + "Analyzing…")
5. Implement `AnalysisModal.tsx`:
   - Render PrimeReact `<Dialog>` with `visible={isModalOpen}`
   - Display all sections: summary, score, skills, industries, misreads, suggestions, metadata
   - Use PrimeReact components: `<ProgressBar>`, `<Chip>`, `<Tag>`, lists with icons
6. Wire "View Analysis" button to call `openModal()`
7. Verify modal closes on ESC or close button

**Acceptance Criteria**:
- ✅ Clicking "Analyze Resume" shows loading spinner for ~700ms
- ✅ After loading, "View Analysis" and "Save Analysis" buttons are enabled
- ✅ Success Toast appears: "Analysis complete!"
- ✅ Clicking "View Analysis" opens modal with mock analysis data
- ✅ Modal displays score (e.g., 78/100) with color-coded progress bar
- ✅ Skills and industries render as chips
- ✅ Misreads and suggestions render as lists with icons
- ✅ Modal can be closed via ESC key or close button
- ✅ State persists after closing modal (re-opening shows same data)

**QA Demo Script**:
1. Upload a valid resume and select sections
2. Click "Analyze Resume"
3. Verify spinner appears in sidebar status block
4. Wait ~700ms; verify spinner disappears and status shows "✅ Analysis ready"
5. Verify success Toast: "Analysis complete!"
6. Click "View Analysis"
7. Verify modal opens with full analysis:
   - Summary text
   - Score bar (green, 78/100)
   - Skills chips (React, TypeScript, Node.js, etc.)
   - Industries chips (Software Engineering, SaaS, Cloud Computing)
   - Misreads list (if any)
   - Suggestions list
   - Metadata (sections considered, filename, timestamp)
8. Press ESC key; verify modal closes
9. Click "View Analysis" again; verify same data is displayed
10. Click close button; verify modal closes

---

### Milestone 3: Save to LocalStorage & Polish

**Goal**: Persist analysis to localStorage, add polish (tooltips, empty states, responsive layout).

**Tasks**:
1. Implement `saveToLocalStorage()` in Zustand store:
   - Read existing array from `localStorage.getItem("resume-buddy:analyses")`
   - Append new `SavedAnalysis` object with unique ID
   - Write back to localStorage
   - Show success Toast
2. Wire "Save Analysis" button to call `saveToLocalStorage()`
3. Test saving multiple analyses; verify localStorage array grows
4. Add tooltips to all buttons (use PrimeReact `tooltip` prop)
5. Add empty states:
   - UploadPanel: "Upload your resume to get started" message when no file
   - Status block: "No analysis yet" when `analysis === null`
6. Test responsive layout on desktop, tablet, and mobile
7. Run accessibility audit (Lighthouse or axe DevTools)
8. Fix any contrast or keyboard navigation issues
9. Add loading state to "Save Analysis" button (optional: brief spinner during save)

**Acceptance Criteria**:
- ✅ Clicking "Save Analysis" persists data to localStorage
- ✅ Success Toast: "Analysis saved to browser storage."
- ✅ Opening DevTools → Application → Local Storage shows `resume-buddy:analyses` key with JSON array
- ✅ Saving multiple analyses appends to array (no overwrites)
- ✅ All buttons have tooltips when disabled
- ✅ Empty states render correctly when no file or analysis
- ✅ Layout is responsive on mobile (<768px)
- ✅ Lighthouse Accessibility score ≥90
- ✅ No console errors or warnings

**QA Demo Script**:
1. Complete an analysis (upload + select sections + analyze)
2. Click "Save Analysis"
3. Verify success Toast: "Analysis saved to browser storage."
4. Open DevTools → Application → Local Storage → `http://localhost:5173`
5. Verify `resume-buddy:analyses` key exists with an array containing one object
6. Complete another analysis (different file or sections)
7. Click "Save Analysis" again
8. Verify localStorage array now has two objects
9. Refresh the page; verify localStorage persists
10. Resize browser window to mobile width (<768px)
11. Verify sidebar stacks below upload panel
12. Verify all buttons are still accessible and functional
13. Run Lighthouse accessibility audit; verify score ≥90

---

## Deferred Features

The following features are **out of scope for MVP** and will be implemented in future milestones:

### Client-Side File Parsing
- Extracting text from PDF/DOCX on the client
- Requires libraries like `pdf.js` (PDF) or `mammoth.js` (DOCX)
- MVP sends raw file to backend (simulated); backend handles parsing

### Backend Integration
- Node.js + Express API server
- Dify AI agent integration for resume analysis
- File upload endpoint (`POST /api/upload`)
- Analysis endpoint (`POST /api/analyze`)
- Database for storing analyses (PostgreSQL, MongoDB)
- User authentication (Firebase, Auth0, or custom JWT)

### Legacy `.doc` Support
- Old Microsoft Word binary format (pre-2007)
- Requires server-side conversion (e.g., `libreoffice --headless --convert-to docx`)
- Low priority; most users have migrated to `.docx`

### Multi-Model Selection
- Allow user to choose AI model (e.g., GPT-4, Claude, Llama)
- Requires backend support for multiple Dify agents or API integrations

### Job Description Comparison
- User uploads both a resume and a JD
- AI compares and highlights gaps or matches
- Requires dual-file upload UI and new backend endpoint

### Dual Resume Comparison
- User uploads two resumes (e.g., different versions)
- AI compares and suggests which is stronger
- Requires multi-file state management and new analysis endpoint

### View History (Full UI)
- List all saved analyses from localStorage
- Click to view past analysis details
- Delete or export functionality
- Requires new `<HistoryPanel>` component and route

### Export Analysis
- Download analysis as PDF, DOCX, or JSON
- Requires PDF generation library (e.g., `jsPDF`, `pdfmake`)

### Theming & Customization
- Dark mode toggle
- Custom color schemes
- User preference persistence

### Advanced Validation
- Real-time OCR preview (show what AI "sees" in the resume)
- Duplicate file detection (hash-based)

---

## Open Questions

**Status**: ✅ **ALL RESOLVED** (November 4, 2025)

All implementation decisions have been finalized. See resolutions below:

### 1. File Size Limit ✅ RESOLVED

**Decision**: **8 MB** max file size

**Rationale**: Provides sufficient headroom for image-heavy resumes or portfolios while keeping uploads manageable. Typical resumes are 50-500 KB, so 8 MB is a comfortable upper bound.

---

### 2. PrimeReact Theme ✅ RESOLVED

**Decision**: **Lara Light Blue**

**Rationale**: Modern, professional appearance with good contrast. Default theme in PrimeReact 10+ and looks polished out of the box.

---

### 3. LocalStorage Key Naming ✅ RESOLVED

**Decision**: **`resume-buddy:analyses`**

**Rationale**: Matches repository name and uses the colon (`:`) namespace separator convention common in localStorage keys.

---

### 4. Validation Error Copy Tone ✅ RESOLVED

**Decision**: **Slightly friendly tone**

**Examples**:
- File type error: "Only PDF and DOCX files are supported right now. Please try again with a different format."
- File size error: "File size must be less than 8 MB. Please try a smaller file."
- No sections selected: "Please select at least one resume section or check 'Proceed without sections'."
- No file uploaded: "Please upload a resume before analyzing."

**Rationale**: Friendly but clear. Guides users toward the solution without being overly casual or verbose.

---

### 5. "Proceed Without Sections" Confirmation UX ✅ RESOLVED

**Decision**: **Checkbox implementation**

**Rationale**: Simple, inline, and less disruptive than a modal. Keeps the user flow smooth. Can be upgraded to a modal in future versions if needed based on user behavior.

---

### 6. Future Backend Endpoint Structure ✅ RESOLVED

**Decision**: Implement the following API contract (subject to revision during backend development)

**API Contract**:

```typescript
// POST /api/analyze
// Request: multipart/form-data
{
  file: File,                    // Resume file (.pdf or .docx)
  sections: SectionName[],       // User-selected sections
  options?: {
    model?: string,              // AI model (e.g., "gpt-4", "claude-3")
    compareJD?: string,          // Job description text (future feature)
  }
}

// Response: application/json
{
  analysis: AnalysisResult,      // Full analysis object
  requestId: string,             // Unique ID for tracking/debugging
  processingTime: number,        // Milliseconds taken to analyze
}

// Error Response: application/json
{
  error: string,                 // Error message
  code: string,                  // Error code (e.g., "INVALID_FILE", "ANALYSIS_FAILED")
  details?: any,                 // Additional error context
}
```

**Implementation Notes**:
- Create `src/utils/apiClient.ts` with placeholder functions
- Add TypeScript interfaces for request/response types
- Use `fetch` or `axios` for HTTP calls
- Handle errors with appropriate Toast messages
- This contract may be revised during backend implementation

**Placeholder Implementation**:

```typescript
// src/utils/apiClient.ts
import type { AnalysisResult, SectionName } from '../types';

export interface AnalyzeRequest {
  file: File;
  sections: SectionName[];
  options?: {
    model?: string;
    compareJD?: string;
  };
}

export interface AnalyzeResponse {
  analysis: AnalysisResult;
  requestId: string;
  processingTime: number;
}

export interface ApiError {
  error: string;
  code: string;
  details?: any;
}

/**
 * Placeholder for future backend call.
 * In MVP, this is not used (simulateAnalyze() handles mocking).
 * When backend is ready, implement this function.
 */
export async function analyzeResume(
  request: AnalyzeRequest
): Promise<AnalyzeResponse> {
  // TODO: Replace with actual fetch call
  const formData = new FormData();
  formData.append('file', request.file);
  formData.append('sections', JSON.stringify(request.sections));
  if (request.options) {
    formData.append('options', JSON.stringify(request.options));
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}
```

---

### 7. Should We Load Saved Analyses on App Init? ✅ RESOLVED

**Decision**: **No** - Start fresh on app init

**Rationale**: Keeps MVP simple. LocalStorage is write-only for now. The `loadFromLocalStorage()` method will exist in the Zustand store but won't be called on initialization. This will be implemented later with the "View History" feature in a future milestone.

---

## Summary & Next Steps

This plan provides a complete blueprint for implementing the Resume Buddy MVP. Key highlights:

- ✅ **Front-end only** with clear separation of concerns
- ✅ **PrimeReact UI** with professional theme and accessibility baked in
- ✅ **Zustand state management** for predictable, testable state
- ✅ **Strict validation** with user-friendly error messages
- ✅ **Mocked analysis** to simulate full user journey without backend
- ✅ **LocalStorage persistence** for saving analysis history
- ✅ **Explicit API hooks** (`apiClient.ts`) for future backend integration

### Recommended Implementation Order

1. **Milestone 0** → Set up project scaffold and tooling
2. **Milestone 1** → Build file upload and validation
3. **Milestone 2** → Implement mock analysis flow and modal
4. **Milestone 3** → Add localStorage persistence and polish

### Estimated Timeline

- **Milestone 0**: 2–4 hours (setup, configuration, skeleton)
- **Milestone 1**: 4–6 hours (file upload, validation, checkboxes)
- **Milestone 2**: 4–6 hours (analysis flow, modal, loading states)
- **Milestone 3**: 3–5 hours (localStorage, tooltips, responsive design)

**Total**: ~13–21 hours (varies based on experience with React/PrimeReact)

### Post-MVP Priorities

After completing Milestone 3, prioritize:
1. **Backend integration** (Node/Express + Dify)
2. **View History** feature (read from localStorage)
3. **Export Analysis** (download as PDF/JSON)
4. **Dark mode** (theme toggle)
5. **Job Description Comparison** (dual-upload flow)

---

**End of MVP Plan**

For questions or clarifications, refer to the [Open Questions](#open-questions) section or discuss with the team.
