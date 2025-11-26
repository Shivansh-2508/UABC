import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NavDropdown } from '../ui/NavDropdown';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Mobile Dropdown Accordion
 */
const MobileDropdown: React.FC<{ title: string; items: { name: string; href: string }[]; onItemClick: () => void }> = ({ title, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 font-medium uppercase tracking-wide"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 mt-2 ml-4">
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onItemClick}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-500 py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Navigation Bar
 */
export const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation structure with dropdowns
  const navLinks = [
    { name: 'Home', href: '#home' },
  ];

  const aboutDropdownItems = [
    { name: 'Overview', href: '#about-overview' },
    { name: 'Our Approach', href: '#about-approach' },
    { name: 'Management', href: '#about-management' },
    { name: 'Success Stories', href: '#about-success' },
  ];

  const servicesDropdownItems = [
    { name: 'Employee Benefits', href: '#services-employee' },
    { name: 'Insurance Consulting', href: '#services-insurance' },
    { name: 'Retirement Consulting', href: '#services-retirement' },
    { name: 'Benefits Consulting', href: '#services-benefits' },
  ];

  const insightsDropdownItems = [
    { name: 'Research Reports', href: '#insights-research' },
    { name: 'Interest Rates', href: '#insights-rates' },
    { name: 'Regulatory Reports', href: '#insights-regulatory' },
  ];

  const navLinksAfterDropdowns = [
    { name: 'Careers', href: '#careers' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-bg/80 md:backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-lg shadow-brand-900/5 dark:shadow-brand-900/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Logo className="h-10" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home */}
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 transition-colors relative group uppercase tracking-wide"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full" />
            </a>
          ))}

          {/* About Us Dropdown */}
          <NavDropdown label="About Us" items={aboutDropdownItems} />

          {/* Services Dropdown */}
          <NavDropdown label="Services" items={servicesDropdownItems} />

          {/* Insights Dropdown */}
          <NavDropdown label="Insights" items={insightsDropdownItems} />

          {/* Careers & Contact */}
          {navLinksAfterDropdowns.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 transition-colors relative group uppercase tracking-wide"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full" />
            </a>
          ))}
          
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />

          <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5">
            Get in touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <button 
            className="text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ transformOrigin: 'top' }}
            className="md:hidden bg-white dark:bg-dark-card border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {/* Home */}
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 font-medium uppercase tracking-wide"
                >
                  {link.name}
                </a>
              ))}

              {/* About Us - Mobile Accordion */}
              <MobileDropdown title="About Us" items={aboutDropdownItems} onItemClick={() => setIsMobileMenuOpen(false)} />

              {/* Services - Mobile Accordion */}
              <MobileDropdown title="Services" items={servicesDropdownItems} onItemClick={() => setIsMobileMenuOpen(false)} />

              {/* Insights - Mobile Accordion */}
              <MobileDropdown title="Insights" items={insightsDropdownItems} onItemClick={() => setIsMobileMenuOpen(false)} />

              {/* Careers & Contact */}
              {navLinksAfterDropdowns.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 font-medium uppercase tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
