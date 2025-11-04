import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// PrimeReact CSS imports (order matters!)
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// Custom styles (last to allow overrides)
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
