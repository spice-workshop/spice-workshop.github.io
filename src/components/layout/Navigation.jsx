import React from 'react';
import { 
  Menu, X, Calendar, MapPin, Users, FileText, 
  Camera, Home, Globe, Moon, Sun, Monitor
} from 'lucide-react';

const Navigation = ({ activePage, setActivePage, isMenuOpen, setIsMenuOpen, isDark, toggleTheme }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 mr-1" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4 mr-1" /> },
    { id: 'talks', label: 'Talks', icon: <FileText className="w-4 h-4 mr-1" /> },
    { id: 'participants', label: 'Participants', icon: <Users className="w-4 h-4 mr-1" /> },
    { id: 'venue', label: 'Venue & Travel', icon: <MapPin className="w-4 h-4 mr-1" /> },
    { id: 'sightseeing', label: 'Sightseeing', icon: <Camera className="w-4 h-4 mr-1" /> },
  ];

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
               <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">SPiCE 2</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo(0, 0);
                }}
                className={`flex items-center px-3 py-2 font-medium transition-colors rounded-md ${
                  activePage === item.id 
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleTheme} 
                className="ml-2 p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
                title={`Current theme: ${isDark}`}
            >
                {isDark === 'light' && <Sun className="w-5 h-5" />}
                {isDark === 'dark' && <Moon className="w-5 h-5" />}
                {isDark === 'system' && <Monitor className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
                onClick={toggleTheme} 
                className="mr-4 p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
            >
                {isDark === 'light' && <Sun className="w-5 h-5" />}
                {isDark === 'dark' && <Moon className="w-5 h-5" />}
                {isDark === 'system' && <Monitor className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-2 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`flex items-center px-3 py-2 font-medium transition-colors rounded-md ${
                  activePage === item.id 
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
