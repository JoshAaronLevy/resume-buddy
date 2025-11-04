export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a file for resume upload.
 * Checks file type (.pdf, .docx) and size (max 8 MB).
 */
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
