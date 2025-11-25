import React from 'react';

// Simple mobile debug info that you can temporarily add to any component
export const SimpleMobileDebug = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  const height = typeof window !== 'undefined' ? window.innerHeight : 0;
  const isMobile = width < 768;
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '8px',
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      <div>Screen: {width}x{height}</div>
      <div>Device: {isMobile ? 'Mobile' : 'Desktop'}</div>
    </div>
  );
};