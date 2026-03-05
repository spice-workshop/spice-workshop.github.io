import { useState } from 'react';
import type { FC } from 'react';
import { Compass } from 'lucide-react';
import { SIGHTSEEING_SPOTS, SightseeingSpot } from '../data/SightseeingData';
import SectionTitle from '../components/ui/SectionTitle';
import SEO from '../components/layout/SEO';

const categoryColors: Record<string, string> = {
  UNESCO:       'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Museum:       'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Park:         'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Viewpoint:    'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
  Landmark:     'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  Neighborhood: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  Food:         'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
};

const SightseeingView: FC = () => {
  const [activeSpot, setActiveSpot] = useState<SightseeingSpot>(SIGHTSEEING_SPOTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        <SEO
          title="Sightseeing | SPiCE 2 Conference"
          description="Discover the best sightseeing spots in Lyon. Explore local history, culture, and attractions during the conference."
          url="https://spice-workshop.github.io/sightseeing"
          keywords="Lyon sightseeing, Vieux Lyon, Fourvière, Parc Tête d'Or, Lyon tourism, things to do Lyon"
        />
        <SectionTitle>Sightseeing in Lyon</SectionTitle>
        <p className="text-slate-600 dark:text-slate-300 mb-8 mt-[-1rem]">Explore the rich history and culture of Lyon during your stay.</p>

        <div className="grid md:grid-cols-[3fr_2fr] gap-8">
            {/* Spot List — scrollable */}
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto p-1">
                {SIGHTSEEING_SPOTS.map((spot) => (
                    <div
                        key={spot.id}
                        onClick={() => setActiveSpot(spot)}
                        className={`cursor-pointer bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                            activeSpot.id === spot.id
                                ? 'border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/30'
                                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-bold text-lg ${activeSpot.id === spot.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-100'}`}>
                                        {spot.name}
                                    </h4>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[spot.category] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
                                        {spot.category}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{spot.desc}</p>
                            </div>
                            <a
                                href={spot.directions}
                                target="_blank"
                                rel="noreferrer noopener"
                                onClick={e => e.stopPropagation()}
                                className="ml-3 flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center"
                            >
                                <Compass className="w-3.5 h-3.5 mr-1" /> Directions
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive Map Display */}
            <div className="h-full min-h-[500px] bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24 relative">
                 <iframe
                    key={activeSpot.id}
                    src={activeSpot.mapEmbed}
                    width="600"
                    height="500"
                    style={{ border: 0, width: '100%', height: '100%', minHeight: '500px' }}
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${activeSpot.name}`}
                 ></iframe>
            </div>
        </div>
    </div>
  );
};

export default SightseeingView;
