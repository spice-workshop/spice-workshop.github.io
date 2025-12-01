import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { SIGHTSEEING_SPOTS } from '../../data/SightseeingData';
import SectionTitle from '../ui/SectionTitle';

const SightseeingView = () => {
  const [activeSpot, setActiveSpot] = useState(SIGHTSEEING_SPOTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        <SectionTitle>Sightseeing in Lyon</SectionTitle>
        <p className="text-slate-600 dark:text-slate-300 mb-8 mt-[-1rem]">Explore the rich history and culture of Lyon during your stay.</p>

        <div className="grid md:grid-cols-2 gap-12">
            {/* Spot List */}
            <div className="space-y-6">
                {SIGHTSEEING_SPOTS.map((spot) => (
                    <div 
                        key={spot.id} 
                        onClick={() => setActiveSpot(spot)}
                        className={`flex cursor-pointer bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm transition-all duration-300 ${
                            activeSpot.id === spot.id 
                                ? 'border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/30 transform scale-[1.02]' 
                                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md'
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

            {/* Interactive Map Display */}
            <div className="h-full min-h-[500px] bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24 relative">
                 <iframe 
                    key={activeSpot.id} // Forces iframe reload on change
                    src={activeSpot.mapEmbed} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: '500px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    title={`Map of ${activeSpot.name}`}
                 ></iframe>
                 
                 <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Showing Map For</p>
                    <p className="font-bold text-indigo-700 dark:text-indigo-400">{activeSpot.name}</p>
                 </div>

                 <div className="absolute bottom-6 right-6">
                    <a 
                        href={activeSpot.directions} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-transform transform hover:scale-105"
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


// TODO: Add more spots
// 1. Musée de Confluences
