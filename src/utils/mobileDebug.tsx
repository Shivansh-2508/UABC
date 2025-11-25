import React, { useEffect, useState } from 'react';

export const useMobileDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    screenWidth: 0,
    screenHeight: 0,
    devicePixelRatio: 1,
    userAgent: '',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    colorScheme: 'light',
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      const ua = navigator.userAgent;
      
      // Device detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Color scheme detection
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      setDebugInfo({
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio: ratio,
        userAgent: ua,
        isMobile,
        isTablet,
        isDesktop,
        colorScheme,
      });
    };

    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('orientationchange', updateDebugInfo);
    
    return () => {
      window.removeEventListener('resize', updateDebugInfo);
      window.removeEventListener('orientationchange', updateDebugInfo);
    };
  }, []);

  return debugInfo;
};

// Mobile Debug Component (only renders in development)
export const MobileDebugPanel = () => {
  const debug = useMobileDebug();
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg z-[9999] font-mono max-w-xs">
      <div className="font-bold mb-2">Mobile Debug Info:</div>
      <div>Screen: {debug.screenWidth}x{debug.screenHeight}</div>
      <div>DPR: {debug.devicePixelRatio}</div>
      <div>Device: {debug.isMobile ? 'Mobile' : debug.isTablet ? 'Tablet' : 'Desktop'}</div>
      <div>Theme: {debug.colorScheme}</div>
      <div className="mt-2 text-xs opacity-75">
        UA: {debug.userAgent.slice(0, 30)}...
      </div>
    </div>
  );
};