import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, Users, MapPin, Camera, 
  Globe, Sun, Moon, Monitor, Menu, X
} from 'lucide-react';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
}

const Navigation: FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen, theme, toggleTheme }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-1" /> },
    { id: 'schedule', label: 'Schedule', path: '/schedule', icon: <Calendar className="w-4 h-4 mr-1" /> },

    { id: 'participants', label: 'Participants', path: '/participants', icon: <Users className="w-4 h-4 mr-1" /> },
    { id: 'logistics', label: 'Logistics', path: '/logistics', icon: <MapPin className="w-4 h-4 mr-1" /> },
    { id: 'sightseeing', label: 'Sightseeing', path: '/sightseeing', icon: <Camera className="w-4 h-4 mr-1" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
               <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">SPiCE 2</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-3 py-2 font-medium transition-colors rounded-md ${
                  isActive(item.path)
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleTheme} 
                className="ml-2 p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
                title={`Current theme: ${theme}`}
            >
                {theme === 'light' && <Sun className="w-5 h-5" />}
                {theme === 'dark' && <Moon className="w-5 h-5" />}
                {theme === 'system' && <Monitor className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
                onClick={toggleTheme} 
                className="mr-4 p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
            >
                {theme === 'light' && <Sun className="w-5 h-5" />}
                {theme === 'dark' && <Moon className="w-5 h-5" />}
                {theme === 'system' && <Monitor className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-2 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-3 py-2 font-medium transition-colors rounded-md ${
                  isActive(item.path)
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
