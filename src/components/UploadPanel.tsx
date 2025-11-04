import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import type { FileUploadSelectEvent } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useAnalysisStore } from '../store/useAnalysisStore';
import { validateFile } from '../utils/fileValidation';
import type { SectionName } from '../types';

const SECTIONS: { name: SectionName; label: string }[] = [
  { name: 'summary', label: 'Summary' },
  { name: 'skills', label: 'Skills' },
  { name: 'experience', label: 'Experience' },
  { name: 'education', label: 'Education' },
  { name: 'projects', label: 'Projects' },
  { name: 'certifications', label: 'Certifications' },
  { name: 'publications', label: 'Publications' },
  { name: 'awards', label: 'Awards' },
  { name: 'volunteering', label: 'Volunteering' },
];

export default function UploadPanel() {
  const {
    uploadedFile,
    setUploadedFile,
    allowedSections,
    toggleSection,
    proceedWithoutSections,
    setProceedWithoutSections,
    toastRef,
    isAnalyzing,
  } = useAnalysisStore();

  const handleFileSelect = (e: FileUploadSelectEvent) => {
    const file = e.files[0];
    const validation = validateFile(file);

    if (!validation.isValid) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Invalid File',
        detail: validation.error,
        life: 5000,
      });
      return;
    }

    setUploadedFile(file);
    toastRef?.current?.show({
      severity: 'success',
      summary: 'File Uploaded',
      detail: `${file.name} uploaded successfully`,
      life: 3000,
    });
  };

  const handleFileClear = () => {
    setUploadedFile(null);
  };

  const getFileExtension = (filename: string) => {
    return filename.substring(filename.lastIndexOf('.')).toUpperCase().replace('.', '');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <Card title="Upload Resume">
      <div className="flex flex-column gap-4">
        {/* Empty State */}
        {!uploadedFile && (
          <div className="text-center p-4 bg-blue-50 border-round">
            <i className="pi pi-cloud-upload text-5xl text-blue-300 mb-3"></i>
            <p className="text-lg font-semibold m-0 mb-2">Upload your resume to get started</p>
            <p className="text-sm text-color-secondary m-0">
              We'll analyze your resume and provide actionable feedback
            </p>
          </div>
        )}

        {/* File Upload Section */}
        <div>
          <FileUpload
            mode="basic"
            name="resume"
            accept=".pdf,.docx"
            maxFileSize={8388608}
            chooseLabel="Upload Resume"
            auto={false}
            customUpload={false}
            onSelect={handleFileSelect}
            disabled={isAnalyzing}
            aria-describedby="upload-help"
          />
          <small id="upload-help" className="block mt-2 text-color-secondary">
            Accepted formats: PDF, DOCX. Max size: 8 MB.
          </small>
        </div>

        {/* File Preview */}
        {uploadedFile && (
          <Card className="bg-blue-50">
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-3">
                <i className="pi pi-file text-3xl text-blue-500"></i>
                <div>
                  <p className="font-semibold m-0">{uploadedFile.name}</p>
                  <p className="text-sm text-color-secondary m-0">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <Tag value={getFileExtension(uploadedFile.name)} severity="info" />
              </div>
              <Button
                icon="pi pi-times"
                rounded
                text
                severity="danger"
                onClick={handleFileClear}
                disabled={isAnalyzing}
                tooltip="Remove file"
              />
            </div>
          </Card>
        )}

        {/* Section Checkboxes */}
        <fieldset className="border-1 surface-border border-round p-3" disabled={!uploadedFile}>
          <legend className="text-lg font-semibold px-2">Select Resume Sections</legend>
          {!uploadedFile ? (
            <p className="text-sm text-color-secondary text-center m-0 p-3">
              Upload a resume first to select sections
            </p>
          ) : (
            <>
              <p className="text-sm text-color-secondary m-0 mb-3">
                Check the sections that appear in your resume:
              </p>
              <div className="grid">
                {SECTIONS.map((section) => (
                  <div key={section.name} className="col-12 md:col-6 lg:col-4">
                    <div className="flex align-items-center">
                      <Checkbox
                        inputId={section.name}
                        checked={allowedSections[section.name]}
                        onChange={() => toggleSection(section.name)}
                        disabled={isAnalyzing}
                      />
                      <label htmlFor={section.name} className="ml-2 cursor-pointer">
                        {section.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </fieldset>

        {/* Proceed Without Sections Checkbox */}
        <div className="flex align-items-center">
          <Checkbox
            inputId="proceed-without-sections"
            checked={proceedWithoutSections}
            onChange={(e) => setProceedWithoutSections(e.checked ?? false)}
            disabled={isAnalyzing}
          />
          <label htmlFor="proceed-without-sections" className="ml-2 text-sm cursor-pointer">
            I understand my resume has none of these sections (or I want to skip this step)
          </label>
        </div>
      </div>
    </Card>
  );
}
