import React, { useState, useEffect } from 'react';
import { CONSTANTS } from './data/constants';
import Navigation from './components/sections/Navigation';
import Footer from './components/sections/Footer';
import Modal from './components/ui/Modal';
import ScrollToTop from './components/ui/ScrollToTop';
import HomeView from './components/views/HomeView';
import ScheduleView from './components/views/ScheduleView';
import TalksView from './components/views/TalksView';
import ParticipantsView from './components/views/ParticipantsView';
import VenueView from './components/views/VenueView';
import SightseeingView from './components/views/SightseeingView';

export default function SpiceConferenceWebsite() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoCOpen, setIsCoCOpen] = useState(false);
  
  // Theme State: 'light' | 'dark' | 'system'
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (isDark === 'dark') {
        root.classList.add('dark');
      } else if (isDark === 'light') {
        root.classList.remove('dark');
      } else {
        // System mode
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();
    localStorage.setItem('theme', isDark);

    // Listen for system changes only in system mode
    if (isDark === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-200 flex flex-col transition-colors duration-300`}>
      
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      {/* Main Content Area: Swaps components based on activePage state */}
      <main className="flex-grow">
        {activePage === 'home' && <HomeView />}
        {activePage === 'schedule' && <ScheduleView />}
        {activePage === 'talks' && <TalksView />}
        {activePage === 'participants' && <ParticipantsView />}
        {activePage === 'venue' && <VenueView />}
        {activePage === 'sightseeing' && <SightseeingView />}
      </main>

      <Footer />

      <Modal isOpen={isCoCOpen} onClose={() => setIsCoCOpen(false)} title="Code of Conduct">
          <div className="prose prose-slate"><p>{CONSTANTS.details.cocText}</p></div>
      </Modal>

      <ScrollToTop />

    </div>
  );
}
