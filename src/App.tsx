import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import Header from './components/Header';
import Home from './pages/Home';
import AnalysisModal from './components/AnalysisModal';

export default function App() {
  const toast = useRef<Toast>(null);

  // TODO: Expose toast ref via context or Zustand for global access in future milestones

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
