import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { SIGHTSEEING_SPOTS } from '../../data/sightseeing';
import SectionTitle from '../ui/SectionTitle';

const SightseeingView = () => {
  const [activeSpot, setActiveSpot] = useState(SIGHTSEEING_SPOTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        <div className="text-center mb-12">
             <SectionTitle>Lyon Sightseeing</SectionTitle>
             <p className="text-slate-600 dark:text-slate-300 mt-[-1rem]">Discover the capital of Gaul.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {SIGHTSEEING_SPOTS.map((spot) => (
                    <div 
                        key={spot.id}
                        onClick={() => setActiveSpot(spot)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start ${
                            activeSpot.id === spot.id 
                            ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 ring-1 ring-indigo-100 dark:ring-indigo-900/30' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500'
                        }`}
                    >
                        <img src={spot.image} alt={spot.name} className="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
                        <div className="ml-4 flex flex-col justify-center">
                            <h4 className={`font-bold text-lg ${activeSpot.id === spot.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-100'}`}>
                                {spot.name}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{spot.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="md:col-span-2 h-[600px] bg-slate-100 dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-inner">
                 <iframe 
                     src={activeSpot.mapEmbed}
                     width="100%" 
                     height="100%" 
                     style={{ border: 0 }} 
                     allowFullScreen="" 
                     loading="lazy" 
                     title={activeSpot.name}
                     className="absolute inset-0"
                 ></iframe>
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <div>
                        <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{activeSpot.name}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{activeSpot.desc}</p>
                     </div>
                     <a 
                        href={activeSpot.directions} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-transform transform hover:scale-105 whitespace-nowrap flex-shrink-0"
                    >
                        <Compass className="w-5 h-5 mr-2" /> Get Directions
                    </a>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default SightseeingView;
