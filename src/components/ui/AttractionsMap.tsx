import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { SIGHTSEEING_SPOTS, SightseeingSpot } from '../../data/SightseeingData';
import { Compass, MapPin } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px'
};

const center = {
  lat: 45.764043,
  lng: 4.835659 // Lyon Center
};

const AttractionsMap: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<SightseeingSpot | null>(null);

  // Note: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with process.env.REACT_APP_GOOGLE_MAPS_API_KEY or similar in production
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; 

  return (
    <div className="flex flex-col lg:flex-row h-[600px] overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      
      {/* Sidebar List */}
      <div className="w-full lg:w-1/3 h-64 lg:h-auto overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <div className="p-4 sticky top-0 bg-slate-50 dark:bg-slate-900/95 backdrop-blur-sm z-10 border-b border-slate-200 dark:border-slate-700">
           <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center">
             <MapPin className="w-5 h-5 mr-2 text-indigo-500" /> Attractions ({SIGHTSEEING_SPOTS.length})
           </h3>
        </div>
        <div className="p-2 space-y-2">
           {SIGHTSEEING_SPOTS.map((spot) => (
             <button
               key={spot.id}
               onClick={() => setSelectedSpot(spot)}
               className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start group ${
                 selectedSpot?.id === spot.id 
                   ? 'bg-indigo-600 text-white shadow-md' 
                   : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-700 dark:hover:text-white'
               }`}
             >
               <div className={`mt-0.5 mr-3 flex-shrink-0 ${selectedSpot?.id === spot.id ? 'text-indigo-200' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                 <MapPin className="w-4 h-4" />
               </div>
               <div>
                 <span className="font-semibold block text-sm">{spot.name}</span>
               </div>
             </button>
           ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full lg:w-2/3 h-full relative">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedSpot?.location || center}
            zoom={selectedSpot ? 15 : 13}
            options={{
               mapTypeControl: false,
               streetViewControl: false,
               fullscreenControl: true,
            }}
          >
            {SIGHTSEEING_SPOTS.map((spot) => (
              <Marker
                key={spot.id}
                position={spot.location}
                onClick={() => setSelectedSpot(spot)}
                animation={window.google && selectedSpot?.id === spot.id ? window.google.maps.Animation.BOUNCE : undefined}
              />
            ))}

            {selectedSpot && (
              <InfoWindow
                position={selectedSpot.location}
                onCloseClick={() => setSelectedSpot(null)}
              >
                <div className="max-w-xs p-1">
                  <h3 className="font-bold text-base mb-1 text-slate-900">{selectedSpot.name}</h3>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{selectedSpot.desc}</p>
                  <a 
                    href={selectedSpot.directions} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline text-xs font-bold"
                  >
                    <Compass className="w-3 h-3 mr-1" /> Get Directions
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};


export default AttractionsMap;
