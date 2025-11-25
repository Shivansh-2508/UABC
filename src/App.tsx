import React, { useState, useEffect } from 'react';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Stats } from './components/sections/Stats';
import { Contact } from './components/sections/Contact';
// import { MobileDebugPanel } from './utils/mobileDebug';

/**
 * Main App Component with Error Boundary
 */
const App = () => {
  useEffect(() => {
    console.log('[App] mounted');
    return () => console.log('[App] unmounted');
  }, []);
  const [theme, setTheme] = useState(() => {
    // Default to dark mode to match reference, but respect saved preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="antialiased min-h-screen w-full font-sans selection:bg-accent-500/30 selection:text-accent-900 dark:selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ScrollProgress />
      <Navbar isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      <main className="w-full">
        <Hero />
        <About />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
      {/* <MobileDebugPanel /> */}
    </div>
  );
};

export default App;
