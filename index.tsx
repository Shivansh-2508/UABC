/**
 * Main Entry Point - Fixed to properly render the App
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { TestPage } from './src/TestPage';

// Toggle for isolated testing
const USE_TEST_PAGE = false;

console.log('[Entry] Mounting React root. Test page?', USE_TEST_PAGE);
const container = document.getElementById('root');
if (!container) {
	console.error('[Entry] #root not found in DOM');
} else {
	const root = createRoot(container);
	try {
		root.render(
			<React.StrictMode>
				{USE_TEST_PAGE ? <TestPage /> : <App />}
			</React.StrictMode>
		);
	} catch (e: any) {
		console.error('[Entry] Synchronous render error:', e);
		container.innerHTML = `<div style="padding:1.5rem;font-family:Outfit,sans-serif;color:#ef4444;background:#0f172a;min-height:100vh"><h1 style="font-size:1.25rem;margin-bottom:0.75rem">Render failed</h1><p style="font-size:0.875rem;line-height:1.4">Check console for details.</p><pre style="white-space:pre-wrap;font-size:0.7rem;margin-top:1rem;background:#1e293b;padding:0.75rem;border-radius:0.5rem;color:#f1f5f9">${e?.message || 'Unknown error'}</pre></div>`;
	}
}

