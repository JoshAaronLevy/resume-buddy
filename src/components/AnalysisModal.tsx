import { Dialog } from 'primereact/dialog';
import { useAnalysisStore } from '../store/useAnalysisStore';

export default function AnalysisModal() {
  const { isModalOpen, closeModal } = useAnalysisStore();

  return (
    <Dialog
      visible={isModalOpen}
      onHide={closeModal}
      header="Resume Analysis Results"
      modal
      style={{ width: '90vw', maxWidth: '800px' }}
      draggable={false}
      resizable={false}
    >
      <p className="text-color-secondary">Analysis content will be implemented in Milestone 2</p>
    </Dialog>
  );
}
