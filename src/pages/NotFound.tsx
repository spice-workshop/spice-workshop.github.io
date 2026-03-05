import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '../components/layout/SEO';

const NotFoundView: FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center animate-fade-in">
    <SEO
      title="Page Not Found | SPiCE 2 Conference"
      description="The page you are looking for does not exist."
      url="https://spice-workshop.github.io/404"
    />
    <h1 className="text-6xl font-extrabold text-slate-300 dark:text-slate-600 mb-4">404</h1>
    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
    >
      <Home className="w-5 h-5" /> Back to Home
    </Link>
  </div>
);

export default NotFoundView;
