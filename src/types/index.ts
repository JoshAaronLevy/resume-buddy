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
