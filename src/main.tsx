import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import "./i18n";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render( // React.StrictMode render component twice in dev-mode, remember useEffect fire twice on call API is not a bug
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);