import type { AnalysisResult } from '../types';

/**
 * Mock analysis result used in MVP to simulate backend response.
 * In production, this will be replaced by actual AI analysis from Dify.
 */
export const analysisMock: AnalysisResult = {
  summary:
    "Your resume demonstrates strong technical skills with 5+ years of experience. Consider adding quantifiable achievements to your Experience section to showcase impact. Overall structure is clear, though expanding the Summary section would help recruiters quickly understand your value proposition.",
  skillsDetected: [
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "PostgreSQL",
    "REST APIs",
    "Git",
    "Agile",
    "Jest",
  ],
  industriesInferred: ["Software Engineering", "SaaS", "Cloud Computing", "Web Development"],
  misreads: [
    "Company name 'Acme Corp.' may have been OCR'd as 'Acme Con.' in the Experience section.",
    "Date range '2020-2023' appears as '2020-202S' in Skills section header.",
  ],
  suggestions: [
    "Add specific metrics (e.g., 'Reduced load time by 40%' or 'Increased user engagement by 25%') to Experience bullets.",
    "Include a brief Summary section (2-3 sentences) at the top of your resume.",
    "Spell out acronyms on first use (e.g., 'Amazon Web Services (AWS)' instead of just 'AWS').",
    "Consider adding a Projects section to showcase side work or open-source contributions.",
    "Ensure consistent date formatting throughout (currently mixing 'Jan 2020' and '01/2020').",
  ],
  score: 78,
  sectionsConsidered: [], // Will be updated by simulateAnalyze()
  sourceFilename: '', // Will be updated by simulateAnalyze()
  createdAtISO: '', // Will be updated by simulateAnalyze()
};
