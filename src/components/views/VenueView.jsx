import React, { useState } from 'react';
import { 
  Plane, Train, Bus, MapPin, Moon, ArrowRight, Info, Compass
} from 'lucide-react';
import { CONSTANTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import mapENS from '../../assets/Fig_ENS_de_Lyon_Map.jpg';

const VenueView = () => {
  const [activeTravelTab, setActiveTravelTab] = useState("flight");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        
        {/* Section 1: Travel Information */}
        <div className="mb-20">
            <SectionTitle>Travel Information</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                     <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-1 overflow-x-auto">
                        {['flight', 'train', 'local', 'car', 'hotel'].map(tab => (
                          <button key={tab} onClick={() => setActiveTravelTab(tab)} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors flex items-center capitalize whitespace-nowrap ${activeTravelTab === tab ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                             {tab === 'flight' && <Plane className="w-4 h-4 mr-2" />}
                             {tab === 'train' && <Train className="w-4 h-4 mr-2" />}
                             {tab === 'local' && <Bus className="w-4 h-4 mr-2" />}
                             {tab === 'car' && <MapPin className="w-4 h-4 mr-2" />}
                             {tab === 'hotel' && <Moon className="w-4 h-4 mr-2" />}
                             {tab}
                          </button>
                        ))}
                     </div>

                     <Card className="min-h-[200px] bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                         {activeTravelTab === "flight" && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-slate-700 dark:text-slate-300 font-bold">From Lyon Saint-Exupéry International Airport (LYS):</p>
                                <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                    <li>Take the <strong>Rhônexpress Shuttle</strong> to Part-Dieu station.</li>
                                    <li>Connect to <strong>Metro line B</strong> towards Saint-Genis-Laval Hôpital Lyon Sud.</li>
                                    <li>Get off at <strong>Debourg</strong>.</li>
                                </ul>
                                <a href={CONSTANTS.links.rhonexpress} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center mt-2">Book Rhônexpress <ArrowRight className="w-4 h-4 ml-1" /></a>
                            </div>
                            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-slate-700 dark:text-slate-300 font-bold">From Paris Charles de Gaulle Airport (CDG):</p>
                                <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                    <li>Take the <strong>TGV train</strong> directly from the airport station (Aéroport Charles de Gaulle 2 TGV) to <strong>Lyon Part-Dieu</strong>.</li>
                                    <li>Journey time is approximately 2 hours.</li>
                                    <li>Then follow instructions from Part-Dieu.</li>
                                </ul>
                                <a href={CONSTANTS.links.sncf} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center mt-2">Book TGV on SNCF <ArrowRight className="w-4 h-4 ml-1" /></a>
                            </div>
                        </div>
                     )}
                         {activeTravelTab === "train" && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300 font-bold">From Part-Dieu Station:</p>
                                    <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>Take <strong>Metro line B</strong> towards Saint-Genis-Laval Hôpital Lyon Sud.</li>
                                        <li>Get off at <strong>Debourg</strong>.</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300 font-bold">From Perrache Station:</p>
                                    <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>Take <strong>Tramway T1</strong> towards Debourg.</li>
                                        <li>Get off at <strong>ENS Lyon</strong> (for Monod) or <strong>Debourg</strong>.</li>
                                    </ul>
                                </div>
                                <a href={CONSTANTS.links.sncf} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center mt-2">Book on SNCF <ArrowRight className="w-4 h-4 ml-1" /></a>
                            </div>
                         )}
                         {activeTravelTab === "local" && (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Lyon has an excellent public transport network (TCL) including metro, tram, and bus lines.</p>
                                <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                    <li><strong>Metro line B</strong>: Debourg Stop.</li>
                                    <li><strong>Tramway line T1 or T6</strong>: Debourg Stop for Descartes Campus, ENS Lyon Stop for Monod Campus.</li>
                                    <li><strong>Bus lines 34, 60 and 64</strong>: Debourg Stop for Descartes Campus, ENS Lyon Stop for Monod Campus.</li>
                                    <li><strong>Vélo'v</strong>: parking on the Descartes plaza and Place de l'École (Monod Campus).</li>
                                </ul>
                                <a href={CONSTANTS.links.tcl} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center mt-2">TCL Website <ArrowRight className="w-4 h-4 ml-1" /></a>
                            </div>
                         )}
                         {activeTravelTab === "car" && (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-bold mb-2">By Car</p>
                                <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                                    <li><strong>Arriving from the East</strong> (Grenoble, Geneva, Lyon Saint-Exupéry Airport, …): Southern Beltway, take the Gerland exit</li>
                                    <li><strong>Arriving from A6</strong> (North or South): take the Pont Pasteur Exit</li>
                                </ul>
                            </div>
                         )}
                         {activeTravelTab === "hotel" && (
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">To be updated.</p>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                                    <p className="text-indigo-800 dark:text-indigo-300 font-bold flex items-center"><Info className="w-4 h-4 mr-2" /> Note</p>
                                    <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">To be updated.</p>
                                </div>
                            </div>
                         )}
                      </Card>
                </div>
                
                {/* Section 2: Venue Map & Info */}
                <div>
                    <div className="h-full min-h-[400px] bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow-inner border border-slate-300 dark:border-slate-600 relative">
                         <iframe 
                            src={CONSTANTS.links.mapEmbed}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, minHeight: '100%' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            title="ENS de Lyon Map"
                            className="absolute inset-0"
                         ></iframe>
                         <div className="absolute bottom-6 right-6">
                            <a 
                                href={CONSTANTS.links.mapDirections} 
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
        </div>

        {/* Section 2: Venue Information */}
        <div>
            <SectionTitle>Venue Information</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2">ENS de Lyon</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                            ENS de Lyon is located in the Gerland area of the 7th district of Lyon, near the Pasteur bridge on the left bank of the Rhône.
                        </p>
                        
                        <div className="space-y-6 mt-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                            <div>
                                <h5 className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">Monod Campus</h5>
                                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Welcome Desk (MGN1)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs">46 allée d’Italie (halfway between Place de l'École and Halle Tony Garnier)</p>
                            </div>
                            <div>
                                <h5 className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">Descartes Campus</h5>
                                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Welcome Desk (D1)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs">15 parvis René Descartes, plaza at the corner of avenue Jean Jaurès and avenue Debourg</p>
                            </div>
                        </div>
                     </div>
                </div>
                <div className="h-full min-h-[400px] bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative group">
                     <a href={mapENS} target="_blank" rel="noreferrer" className="block h-full w-full cursor-zoom-in relative">
                         <img 
                            src={mapENS} 
                            alt="ENS de Lyon Map" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg flex items-center">
                                <MapPin className="w-4 h-4 mr-2" /> View Full Map
                            </span>
                         </div>
                     </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default VenueView;
