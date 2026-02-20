import { useState } from 'react';
import type { FC } from 'react';
import { Calendar, Utensils, Users, Bus, MapPin, Compass, Search, ChevronDown, ChevronUp, FileText, Download } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import { useSchedule, EnrichedScheduleEvent } from '../utils/useSchedule';
import { generateSchedulePDF } from '../utils/generateSchedulePDF';
import SEO from '../components/layout/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusIndicator from '../components/ui/StatusIndicator';

const ScheduleView: FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const { schedule, loading: loadingSchedule, error: scheduleError } = useSchedule();
  
  // Handle loading state
  if (loadingSchedule) return <div className="text-center py-20 text-slate-500">Loading schedule...</div>;
  if (scheduleError) return <div className="text-center py-20 text-red-500">Error loading schedule: {scheduleError}</div>;
  
  // Filter events based on search term (across all days)
  const isSearching = searchTerm.trim() !== "";
  
  const filteredSchedule = schedule.map(day => ({
      ...day,
      events: day.events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.speaker && event.speaker.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.abstract && event.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  })).filter(day => day.events.length > 0);

  // Determine what to display
  const currentDayData = schedule[activeDay] || { day: "TBD", date: "", label: "TBD", events: [] };
  const displaySchedule = isSearching ? filteredSchedule : [currentDayData];

  const toggleExpand = (eventId: string) => {
      setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <SEO
        title="Schedule | SPiCE 2 Conference"
        description="View the full workshop schedule for SPiCE 2, including talks, special events, and social activities. March 16-20, 2026."
        url="https://spice-workshop.github.io/schedule"
        keywords="SPiCE schedule, conference program, workshop talks, star formation talks, astrophysics presentations, Lyon conference 2026"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "SPiCE 2 Conference",
            "startDate": "2026-03-16",
            "endDate": "2026-03-20",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "ENS de Lyon (Monod Site)",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1 Place de l'École",
                "addressLocality": "Lyon",
                "postalCode": "69007",
                "addressCountry": "FR"
              }
            },
            "description": "View the full workshop schedule for SPiCE 2, including talks, special events, and social activities.",
            "organizer": {
              "@type": "Organization",
              "name": "CRAL / ENS de Lyon",
              "url": "https://cral.univ-lyon1.fr/?lang=en"
            }
          })}
        </script>
      </SEO>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle>Workshop Schedule</SectionTitle>
          <div className="flex items-center gap-4">
            <button
              onClick={() => generateSchedulePDF(schedule)}
              className="flex items-center text-indigo-600 font-medium hover:underline px-4 py-2 transition-colors"
              aria-label="Download schedule as PDF"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </button>
            <a href={CONSTANTS.links.googleCalendar} download="SPiCE2_Conference.ics" className="flex items-center text-indigo-600 font-medium hover:underline px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
            </a>
          </div>
      </div>

      {!isSearching && (
        <div className="flex overflow-x-auto py-4 px-2 mb-6 gap-2 hide-scrollbar">
          {schedule.map((data, index) => (
            <Button
              key={index}
              onClick={() => { setActiveDay(index); setSearchTerm(""); setExpandedEventId(null); }}
              variant={activeDay === index ? 'primary' : 'outline'}
              className="rounded-full flex-shrink-0 whitespace-nowrap"
            >
              {data.label} ({data.date.slice(5)})
            </Button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-8 max-w-lg mx-auto">
           <input 
              type="text" 
              placeholder="Search talks, speakers, or abstracts..." 
              className="pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
      </div>

      <div className="space-y-8">
          {displaySchedule.length > 0 ? (
              displaySchedule.map((dayData, dayIdx) => (
                <Card key={dayIdx} className="border-t-4 border-t-indigo-500 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> {dayData.day}
                        </h3>
                        <span className="text-sm text-slate-400">Timezone: CET (UTC+1)</span>
                    </div>
                    
                    <div className="space-y-4">
                        {dayData.events.length > 0 ? (
                            dayData.events.map((event: EnrichedScheduleEvent, idx: number) => {
                                const eventId = event.linkId || `event-${dayIdx}-${idx}`;
                                const isExpanded = expandedEventId === eventId;
                                const hasAbstract = !!event.abstract;
        
                                return (
                                <div key={eventId} id={event.linkId} className={`flex flex-col p-4 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group ${event.highlight ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 hover:border-amber-200' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 shadow-sm'}`}>
                                    <div 
                                        className={`flex flex-col md:flex-row md:items-center ${hasAbstract ? 'cursor-pointer' : ''}`}
                                        onClick={() => hasAbstract && toggleExpand(eventId)}
                                    >
                                        <div className="w-32 flex-shrink-0 text-sm font-mono font-bold text-slate-500 dark:text-slate-400 mb-2 md:mb-0">
                                            {event.time}
                                        </div>
                                        <div className="flex-grow md:border-l-2 md:border-slate-200 dark:md:border-slate-700 md:pl-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-grow">
                                                <h4 className={`font-bold text-lg ${event.highlight ? 'text-amber-900 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}>
                                                    {event.title}
                                                </h4>
                                                
                                                {event.speaker && (
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 flex items-center">
                                                    {event.type === 'fixed' ? <Utensils className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />} {event.speaker}
                                                    </p>
                                                )}
                                                </div>
                                                <div className="ml-4 flex-shrink-0 flex items-center gap-2">
                                                <StatusIndicator status={event.status} />
                                                {hasAbstract && (
                                                    <div className="text-indigo-500">
                                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Abstract Section */}
                                    {hasAbstract && isExpanded && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 ml-0 md:ml-36 animate-fade-in">
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                                <FileText className="w-4 h-4 inline mr-1 text-slate-400" />
                                                {event.abstract}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )})
                        ) : (
                            <p className="text-center text-slate-500 py-10">No events scheduled for this day.</p>
                        )}
                    </div>
                </Card>
              ))
          ) : (
             <p className="text-center text-slate-500 py-10">No events found matching your search.</p>
          )}
      </div>
      
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
                      width="600" 
                      height="300" 
                      style={{ border: 0, width: '100%', height: '100%', minHeight: '300px' }} 
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
                      width="600" 
                      height="400" 
                      style={{ border: 0, width: '100%', height: '100%', minHeight: '400px' }} 
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
