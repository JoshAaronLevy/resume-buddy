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
  details?: unknown;
}

/**
 * Placeholder for future backend call.
 * In MVP, this is not used (simulateAnalyze() in Zustand store handles mocking).
 * When backend is ready, implement this function.
 */
export async function analyzeResume(
  request: AnalyzeRequest
): Promise<AnalyzeResponse> {
  // TODO: Replace with actual fetch call when backend is implemented
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
