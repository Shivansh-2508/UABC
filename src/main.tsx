import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Global error logging (keep these)
window.onerror = function(msg, src, line, col, err) {
  console.error('[Global onerror]', { msg, src, line, col, err });
};
window.onunhandledrejection = function(ev) {
  console.error('[Global unhandledrejection]', ev.reason);
};

console.log('[main.tsx] Bootstrapping React (direct import)');
const container = document.getElementById('root');
if (!container) {
  console.error('[main.tsx] Missing #root element');
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[main.tsx] Render call issued');
}
