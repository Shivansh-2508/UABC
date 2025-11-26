import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items: { name: string; href: string }[];
  /** Optional: custom className for the trigger */
  className?: string;
}

/**
 * NavDropdown: Hover-enabled dropdown matching site aesthetics.
 * Desktop: Shows on hover with smooth fade/slide.
 * Mobile: Click to toggle (handled by parent Navbar for mobile menu).
 */
export const NavDropdown: React.FC<NavDropdownProps> = ({ label, items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-500 transition-colors uppercase tracking-wide ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="py-2">
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Underline effect (desktop) */}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full" />
    </div>
  );
};
