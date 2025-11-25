import React from 'react';

/**
 * SafeBoot renders a minimal shell immediately so we can detect if React mounted,
 * then the real App is lazy-loaded. If loading fails, we keep the diagnostic box.
 */
export const SafeBoot: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Outfit, sans-serif',
      background: '#020617',
      color: '#f1f5f9'
    }}>
      <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Bootstrapping UI…</div>
      <div id="app-mount-slot" style={{ width: '100%', marginTop: '1.25rem' }} />
    </div>
  );
};
