import { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import Header from './components/Header';
import Home from './pages/Home';
import AnalysisModal from './components/AnalysisModal';
import { useAnalysisStore } from './store/useAnalysisStore';

export default function App() {
  const toast = useRef<Toast>(null);
  const setToastRef = useAnalysisStore((state) => state.setToastRef);

  useEffect(() => {
    if (toast.current) {
      setToastRef(toast);
    }
  }, [setToastRef]);

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
