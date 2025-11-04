import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAnalysisStore } from '../store/useAnalysisStore';

export default function ActionsSidebar() {
  const {
    uploadedFile,
    allowedSections,
    proceedWithoutSections,
    analysis,
    isAnalyzing,
    openModal,
    simulateAnalyze,
    saveToLocalStorage,
    toastRef,
  } = useAnalysisStore();

  // Check if at least one section is selected
  const hasSectionsSelected = Object.values(allowedSections).some((selected) => selected);

  // Analyze button is enabled when:
  // - File is uploaded AND
  // - (At least one section is selected OR proceed without sections is checked) AND
  // - Not currently analyzing
  const canAnalyze = uploadedFile && (hasSectionsSelected || proceedWithoutSections) && !isAnalyzing;

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'No File',
        detail: 'Please upload a resume before analyzing.',
        life: 3000,
      });
      return;
    }

    if (!hasSectionsSelected && !proceedWithoutSections) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'No Sections Selected',
        detail: "Please select at least one resume section or check 'Proceed without sections'.",
        life: 3000,
      });
      return;
    }

    await simulateAnalyze();
  };

  const handleSave = () => {
    saveToLocalStorage();
    toastRef?.current?.show({
      severity: 'success',
      summary: 'Analysis Saved',
      detail: 'Analysis saved to browser storage.',
      life: 3000,
    });
  };

  const getAnalyzeTooltip = () => {
    if (!uploadedFile) return 'Upload a resume first';
    if (!hasSectionsSelected && !proceedWithoutSections)
      return "Select at least one section or check 'Proceed without sections'";
    if (isAnalyzing) return 'Analysis in progress...';
    return '';
  };

  return (
    <Card>
      <div className="flex flex-column gap-3">
        <h3 className="mt-0 mb-2">Actions</h3>

        <Button
          label="Analyze Resume"
          icon="pi pi-search"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
          tooltip={getAnalyzeTooltip()}
          tooltipOptions={{ showOnDisabled: true, position: 'left' }}
        />

        <Button
          label="View Analysis"
          icon="pi pi-eye"
          severity="info"
          disabled={!analysis}
          onClick={openModal}
          tooltip={!analysis ? 'No analysis available yet' : ''}
          tooltipOptions={{ showOnDisabled: true, position: 'left' }}
        />

        <Button
          label="Save Analysis"
          icon="pi pi-save"
          severity="success"
          disabled={!analysis}
          onClick={handleSave}
          tooltip={!analysis ? 'Complete an analysis first' : ''}
          tooltipOptions={{ showOnDisabled: true, position: 'left' }}
        />

        {/* Status Block */}
        <Card className="mt-3">
          {isAnalyzing ? (
            <div className="flex align-items-center gap-2">
              <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4" />
              <span className="text-sm">Analyzing...</span>
            </div>
          ) : analysis ? (
            <p className="text-sm text-green-600 m-0">
              <i className="pi pi-check-circle mr-2"></i>
              Analysis ready
            </p>
          ) : (
            <p className="text-sm text-color-secondary m-0">No analysis yet</p>
          )}
        </Card>
      </div>
    </Card>
  );
}
