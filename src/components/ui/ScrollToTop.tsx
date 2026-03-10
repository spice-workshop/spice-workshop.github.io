import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[60] bg-gradient-indigo text-white p-3 rounded-full shadow-glow-indigo transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow-indigo-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-900"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;
