import React from 'react';

// Simple test page to verify components are working
export const TestPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: '#f1f5f9',
      padding: '2rem',
      fontFamily: 'Outfit, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        App Test Page ✅
      </h1>
      
      <div style={{ 
        backgroundColor: '#1e293b', 
        padding: '1rem', 
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <h2>System Check:</h2>
        <ul>
          <li>✅ React is loading</li>
          <li>✅ CSS is working</li>
          <li>✅ Components can render</li>
          <li>✅ Background colors work</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <h3>Light Mode Test</h3>
        <p>This should show light background with dark text</p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        Reload Page
      </button>
    </div>
  );
};