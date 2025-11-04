import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';
import { useAnalysisStore } from '../store/useAnalysisStore';

export default function AnalysisModal() {
  const { isModalOpen, closeModal, analysis } = useAnalysisStore();

  if (!analysis) return null;

  const getScoreColor = (score: number): string => {
    if (score <= 50) return '#ef4444'; // red
    if (score <= 75) return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const footer = (
    <div className="flex justify-content-end">
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={closeModal}
        autoFocus
        aria-label="Close analysis results"
      />
    </div>
  );

  return (
    <Dialog
      visible={isModalOpen}
      onHide={closeModal}
      header="Resume Analysis Results"
      footer={footer}
      modal
      style={{ width: '90vw', maxWidth: '800px' }}
      draggable={false}
      resizable={false}
    >
      <div className="flex flex-column gap-4">
        {/* Overview Summary */}
        <section>
          <h3 className="mt-0 mb-2">Overview</h3>
          <p className="text-lg line-height-3 m-0">{analysis.summary}</p>
        </section>

        <Divider />

        {/* AI Readability Score */}
        <section>
          <h3 className="mt-0 mb-3">AI Readability Score</h3>
          <div className="flex align-items-center gap-3 mb-2">
            <span className="text-4xl font-bold" style={{ color: getScoreColor(analysis.score) }}>
              {analysis.score}
            </span>
            <span className="text-xl text-color-secondary">/ 100</span>
          </div>
          <ProgressBar
            value={analysis.score}
            showValue={false}
            color={getScoreColor(analysis.score)}
            style={{ height: '12px' }}
          />
        </section>

        <Divider />

        {/* Skills Detected */}
        <section>
          <h3 className="mt-0 mb-3">Skills Detected</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.skillsDetected.map((skill) => (
              <Chip key={skill} label={skill} className="bg-blue-100 text-blue-700" />
            ))}
          </div>
        </section>

        <Divider />

        {/* Industries Inferred */}
        <section>
          <h3 className="mt-0 mb-3">Industries Inferred</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.industriesInferred.map((industry) => (
              <Chip key={industry} label={industry} className="bg-purple-100 text-purple-700" />
            ))}
          </div>
        </section>

        {/* Misreads (if any) */}
        {analysis.misreads.length > 0 && (
          <>
            <Divider />
            <section>
              <h3 className="mt-0 mb-3">
                <i className="pi pi-exclamation-triangle text-orange-500 mr-2"></i>
                Potential OCR Issues
              </h3>
              <ul className="pl-3 line-height-3">
                {analysis.misreads.map((misread, index) => (
                  <li key={index} className="mb-2">
                    {misread}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        <Divider />

        {/* Suggestions */}
        <section>
          <h3 className="mt-0 mb-3">
            <i className="pi pi-lightbulb text-yellow-500 mr-2"></i>
            Suggestions for Improvement
          </h3>
          <ul className="pl-3 line-height-3">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="mb-2">
                {suggestion}
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* Metadata */}
        <section className="bg-gray-50 p-3 border-round">
          <h4 className="mt-0 mb-2 text-sm text-color-secondary font-normal">Analysis Details</h4>
          <div className="flex flex-column gap-1 text-sm">
            <div>
              <span className="font-semibold">Sections Considered: </span>
              <span>
                {analysis.sectionsConsidered.length > 0
                  ? analysis.sectionsConsidered.join(', ')
                  : 'None (analyzed without section filtering)'}
              </span>
            </div>
            <div>
              <span className="font-semibold">Source File: </span>
              <span>{analysis.sourceFilename}</span>
            </div>
            <div>
              <span className="font-semibold">Analyzed On: </span>
              <span>{formatDate(analysis.createdAtISO)}</span>
            </div>
          </div>
        </section>
      </div>
    </Dialog>
  );
}
