import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Utensils, Users, Bus, MapPin, Compass } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import { useSchedule, EnrichedScheduleEvent } from '../utils/useSchedule';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusIndicator from '../components/ui/StatusIndicator';

const ScheduleView: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const { schedule, loading: loadingSchedule, error: scheduleError } = useSchedule();
  
  // Handl loading state
  if (loadingSchedule) return <div className="text-center py-20 text-slate-500">Loading schedule...</div>;
  if (scheduleError) return <div className="text-center py-20 text-red-500">Error loading schedule: {scheduleError}</div>;
  
  // Fallback if schedule is empty
  const currentDayData = schedule[activeDay] || { day: "TBD", date: "", label: "TBD", events: [] };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <Helmet>
        <title>Schedule | SPiCE 2 Conference</title>
        <meta name="description" content="View the full workshop schedule for SPiCE 2, including talks, special events, and social activities." />
        <link rel="canonical" href="https://spice-workshop.github.io/schedule" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spice-workshop.github.io/schedule" />
        <meta property="og:title" content="Schedule | SPiCE 2 Conference" />
        <meta property="og:description" content="View the full workshop schedule for SPiCE 2, including talks, special events, and social activities." />
        <meta property="og:image" content="https://spice-workshop.github.io/assets/HeaderImage.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://spice-workshop.github.io/schedule" />
        <meta name="twitter:title" content="Schedule | SPiCE 2 Conference" />
        <meta name="twitter:description" content="View the full workshop schedule for SPiCE 2, including talks, special events, and social activities." />
        <meta name="twitter:image" content="https://spice-workshop.github.io/assets/HeaderImage.png" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle>Workshop Schedule</SectionTitle>
          <a href={CONSTANTS.links.googleCalendar} target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 font-medium hover:underline px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
          </a>
      </div>

      <div className="flex overflow-x-auto py-4 px-2 mb-6 gap-2 hide-scrollbar">
        {schedule.map((data, index) => (
          <Button
            key={index}
            onClick={() => setActiveDay(index)}
            variant={activeDay === index ? 'primary' : 'outline'}
            className="rounded-full flex-shrink-0 whitespace-nowrap"
          >
            {data.label} ({data.date.slice(5)})
          </Button>
        ))}
      </div>

      <Card className="border-t-4 border-t-indigo-500 min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> {currentDayData.day}
            </h3>
            <span className="text-sm text-slate-400">Timezone: CET (UTC+1)</span>
          </div>
          
          <div className="space-y-4">
              {currentDayData.events.length > 0 ? (
                  currentDayData.events.map((event: EnrichedScheduleEvent, idx: number) => (
                      <div key={idx} className={`flex flex-col md:flex-row md:items-center p-4 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group ${event.highlight ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 hover:border-amber-200' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                          <div className="w-32 flex-shrink-0 text-sm font-mono font-bold text-slate-500 dark:text-slate-400 mb-2 md:mb-0">
                              {event.time}
                          </div>
                          <div className="flex-grow md:border-l-2 md:border-slate-200 dark:md:border-slate-700 md:pl-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-grow">
                                  {event.linkId && event.type === 'talk' ? (
                                    <a 
                                      href={`#${event.linkId}`} 
                                      className={`font-bold text-lg hover:underline flex items-center ${event.highlight ? 'text-amber-900 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}
                                    >
                                      {event.title}
                                      {/* <ArrowRight className="w-4 h-4 ml-2 opacity-70" /> */}
                                    </a>
                                  ) : (
                                    <h4 className={`font-bold text-lg ${event.highlight ? 'text-amber-900 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}>{event.title}</h4>
                                  )}
                                  
                                  {event.speaker && (
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 flex items-center">
                                      {event.type === 'fixed' ? <Utensils className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />} {event.speaker}
                                    </p>
                                  )}
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <StatusIndicator status={event.status} />
                                </div>
                              </div>
                          </div>
                      </div>
                  ))
              ) : (
                  <p className="text-center text-slate-500 py-10">No events scheduled for this day yet.</p>
              )}
          </div>
      </Card>
      
      {/* Special Events Section */}
      <div className="mt-20">
        <h3 className="font-bold text-2xl mb-6 flex items-center text-slate-800 dark:text-white">
           <Utensils className="w-6 h-6 mr-3 text-amber-500" /> Special Events
        </h3>
        
        {/* Lunch Info Block */}
        <div id="lunch-info" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-12 scroll-mt-32">
            <div className="grid md:grid-cols-2">
                <div className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                        Daily Lunch
                      </div>
                        <h4 className="font-bold text-2xl text-slate-800 dark:text-white mb-2">Lunch Details</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        We don't have a restaurant reservation, but we can provide you with a list of recommended restaurants in the area.
                      </p>
                    </div>

                    <div className="space-y-4 mt-auto">
                      <div className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                         <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Schedule</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">To be updated</p>
                         </div>
                      </div>
                      
                      <div className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                         <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Address</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">To be updated</p>
                         </div>
                      </div>
                    </div>
                </div>
                <div className="h-full min-h-[300px] bg-slate-100 dark:bg-slate-700 border-l border-slate-200 dark:border-slate-700 relative">
                   <iframe 
                      src={CONSTANTS.links.crousMap}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, minHeight: '100%' }} 
                      allowFullScreen={undefined}
                      loading="lazy" 
                      title="CROUS Location"
                      className="absolute inset-0"
                   ></iframe>
                   <div className="absolute bottom-6 right-6">
                      <a 
                          href={CONSTANTS.links.crousDirections} 
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

        {/* Dinner Block */}
        <div id="dinner" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden scroll-mt-32">
            <div className="grid md:grid-cols-2">
                {/* Info Side */}
                <div className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                        Workshop Dinner
                      </div>

                      <h4 className="font-bold text-2xl text-slate-800 dark:text-white mb-2">Workshop Dinner</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Details for the Workshop Dinner will be announced soon.
                      </p>
                    </div>

                    <div className="space-y-6 mt-auto">
                      <div className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                         <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Date & Time</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">To be updated</p>
                         </div>
                      </div>
                      
                      <div className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                         <Bus className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Transport</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                               Information coming soon.
                            </p>
                         </div>
                      </div>
                      
                      <div className="flex items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
                         <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200">Address</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">To be updated</p>
                         </div>
                      </div>
                    </div>
                </div>

                {/* Map Side */}
                <div className="h-full min-h-[400px] bg-slate-100 dark:bg-slate-700 border-l border-slate-200 dark:border-slate-700 relative">
                   <iframe 
                      src={CONSTANTS.links.restaurantMap}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, minHeight: '100%' }} 
                      allowFullScreen={undefined}
                      loading="lazy" 
                      title="Restaurant Location"
                      className="absolute inset-0"
                   ></iframe>
                   <div className="absolute bottom-6 right-6">
                      <a 
                          href={CONSTANTS.links.restaurantDirections} 
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
    </div>
  );
};

export default ScheduleView;
