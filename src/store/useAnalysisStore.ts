import { create } from 'zustand';
import type { Toast } from 'primereact/toast';
import type { AnalysisResult, SectionName, SavedAnalysis } from '../types';

interface AnalysisStore {
  // -------------------
  // STATE
  // -------------------

  /** Toast reference for global notifications */
  toastRef: React.RefObject<Toast | null> | null;

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

  /** Set the toast ref for global notifications */
  setToastRef: (ref: React.RefObject<Toast | null>) => void;

  /** Reset state (for future "New Analysis" feature) */
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  // Initial state
  toastRef: null,
  uploadedFile: null,
  allowedSections: {
    summary: false,
    skills: false,
    experience: false,
    education: false,
    projects: false,
    certifications: false,
    publications: false,
    awards: false,
    volunteering: false,
  },
  analysis: null,
  isModalOpen: false,
  isAnalyzing: false,
  proceedWithoutSections: false,

  // Actions
  setUploadedFile: (file) => set({ uploadedFile: file }),

  setSections: (sections) => set({ allowedSections: sections }),

  toggleSection: (name, value) =>
    set((state) => ({
      allowedSections: {
        ...state.allowedSections,
        [name]: value !== undefined ? value : !state.allowedSections[name],
      },
    })),

  setAnalysis: (analysis) => set({ analysis }),

  openModal: () => set({ isModalOpen: true }),

  closeModal: () => set({ isModalOpen: false }),

  simulateAnalyze: async () => {
    const { uploadedFile, allowedSections, toastRef } = get();
    
    if (!uploadedFile) return;

    set({ isAnalyzing: true });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Import mock data
    const { analysisMock } = await import('../utils/analysisMock');

    // Get selected sections
    const sectionsConsidered = Object.entries(allowedSections)
      .filter(([, selected]) => selected)
      .map(([name]) => name as SectionName);

    // Clone and customize mock analysis
    const analysis = {
      ...analysisMock,
      sectionsConsidered,
      sourceFilename: uploadedFile.name,
      createdAtISO: new Date().toISOString(),
    };

    set({ analysis, isAnalyzing: false });

    // Show success notification
    toastRef?.current?.show({
      severity: 'success',
      summary: 'Analysis Complete!',
      detail: "Click 'View Analysis' to see results.",
      life: 3000,
    });
  },

  saveToLocalStorage: () => {
    // TODO: Implement in Milestone 3
    const { analysis, uploadedFile, allowedSections } = get();
    if (!analysis || !uploadedFile) return;

    const storageKey = 'resume-buddy:analyses';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newEntry: SavedAnalysis = {
      id: crypto.randomUUID(),
      createdAtISO: new Date().toISOString(),
      filename: uploadedFile.name,
      sections: { ...allowedSections },
      analysis: { ...analysis },
    };
    existing.push(newEntry);
    localStorage.setItem(storageKey, JSON.stringify(existing));
  },

  loadFromLocalStorage: () => {
    const storageKey = 'resume-buddy:analyses';
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    return JSON.parse(raw) as SavedAnalysis[];
  },

  setProceedWithoutSections: (value) => set({ proceedWithoutSections: value }),

  setToastRef: (ref) => set({ toastRef: ref }),

  reset: () =>
    set({
      uploadedFile: null,
      allowedSections: {
        summary: false,
        skills: false,
        experience: false,
        education: false,
        projects: false,
        certifications: false,
        publications: false,
        awards: false,
        volunteering: false,
      },
      analysis: null,
      isModalOpen: false,
      proceedWithoutSections: false,
    }),
}));
