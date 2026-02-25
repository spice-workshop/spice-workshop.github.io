import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './utils/useTheme';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Loading from './components/ui/Loading';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Lazy load page components
import HomeView from './pages/Home';
const ScheduleView = lazy(() => import('./pages/Schedule'));
const ParticipantsView = lazy(() => import('./pages/Participants'));
const LogisticsView = lazy(() => import('./pages/Logistics'));
const SightseeingView = lazy(() => import('./pages/Sightseeing'));

export default function SpiceConferenceWebsite() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-200 flex flex-col transition-colors duration-300">
      
      {/* Skip to content link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
        Skip to content
      </a>

      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main id="main" className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/schedule" element={<ScheduleView />} />
            <Route path="/participants" element={<ParticipantsView />} />
            <Route path="/logistics" element={<LogisticsView />} />
            <Route path="/sightseeing" element={<SightseeingView />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
    </ErrorBoundary>
  );
}
