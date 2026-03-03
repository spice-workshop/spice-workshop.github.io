import { useState } from 'react';
import type { FC } from 'react';
import { Calendar, Utensils, Search, Download, MapPin } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import { useSchedule } from '../utils/useSchedule';
import lunchPlaces from '../data/lunchPlaces.json';

import SEO from '../components/layout/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import ScheduleDayCard from '../components/schedule/ScheduleDayCard';
import SpecialEventCard from '../components/schedule/SpecialEventCard';

const ScheduleView: FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'schedule' | 'events'>('schedule');
  const { schedule, loading, error } = useSchedule();

  if (loading) return <div className="text-center py-20 text-slate-500">Loading schedule...</div>;
  if (error)   return <div className="text-center py-20 text-red-500">Error loading schedule: {error}</div>;

  const isSearching = searchTerm.trim() !== '';

  const filteredSchedule = schedule
    .map(day => ({
      ...day,
      events: day.events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.speaker  && e.speaker.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.abstract && e.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    }))
    .filter(day => day.events.length > 0);

  const currentDayData = schedule[activeDay] ?? { day: 'TBD', date: '', label: 'TBD', events: [] };
  const displaySchedule = isSearching ? filteredSchedule : [currentDayData];

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
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'SPiCE 2 Conference',
            startDate: '2026-03-16',
            endDate: '2026-03-20',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: 'ENS de Lyon (Monod Site)',
              address: {
                '@type': 'PostalAddress',
                streetAddress: "1 Place de l'École",
                addressLocality: 'Lyon',
                postalCode: '69007',
                addressCountry: 'FR',
              },
            },
            description: 'View the full workshop schedule for SPiCE 2, including talks, special events, and social activities.',
            organizer: {
              '@type': 'Organization',
              name: 'CRAL / ENS de Lyon',
              url: 'https://cral.univ-lyon1.fr/?lang=en',
            },
          })}
        </script>
      </SEO>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <SectionTitle>Workshop Schedule</SectionTitle>
        <div className="flex items-center gap-4">
          <button
            onClick={async () => {
              const { generateSchedulePDF } = await import('../utils/generateSchedulePDF');
              generateSchedulePDF(schedule);
            }}
            className="flex items-center text-indigo-600 font-medium hover:underline px-4 py-2 transition-colors"
            aria-label="Download schedule as PDF"
          >
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </button>
          <a
            href={CONSTANTS.links.googleCalendar}
            download="SPiCE2_Conference.ics"
            className="flex items-center text-indigo-600 font-medium hover:underline px-4 py-2"
          >
            <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
          </a>
        </div>
      </div>

      {/* Top Level View Switcher */}
      <div className="flex justify-center mb-10 border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveView('schedule')}
            className={`pb-4 px-1 text-lg font-bold border-b-2 transition-colors flex items-center ${
              activeView === 'schedule'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-5 h-5 mr-2" /> Main Schedule
          </button>
          <button
            onClick={() => setActiveView('events')}
            className={`pb-4 px-1 text-lg font-bold border-b-2 transition-colors flex items-center ${
              activeView === 'events'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 dark:border-amber-500'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Utensils className="w-5 h-5 mr-2" /> Special Events
          </button>
        </div>
      </div>

      {activeView === 'schedule' && (
        <div className="animate-fade-in">
          {/* Day tabs */}
          {!isSearching && (
            <div className="flex overflow-x-auto py-4 px-2 mb-6 gap-2 hide-scrollbar">
              {schedule.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => { setActiveDay(index); setSearchTerm(''); }}
                  variant={activeDay === index ? 'primary' : 'outline'}
                  className="rounded-full flex-shrink-0 whitespace-nowrap"
                >
                  {data.day}
                </Button>
              ))}
            </div>
          )}

          {/* Search bar */}
          <div className="relative mb-8 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search talks or speakers"
              className="pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>

          {/* Schedule cards */}
          <div className="space-y-8">
            {displaySchedule.length > 0 ? (
              displaySchedule.map((dayData, dayIdx) => (
                <ScheduleDayCard
                  key={dayIdx}
                  dayData={dayData}
                  dayIdx={dayIdx}
                  {...(!isSearching && {
                    onPrev: () => setActiveDay(d => Math.max(0, d - 1)),
                    onNext: () => setActiveDay(d => Math.min(schedule.length - 1, d + 1)),
                    isFirst: activeDay === 0,
                    isLast:  activeDay === schedule.length - 1,
                  })}
                />
              ))
            ) : (
              <p className="text-center text-slate-500 py-10">No events found matching your search.</p>
            )}
          </div>
        </div>
      )}

      {activeView === 'events' && (
        <div className="animate-fade-in relative max-w-5xl mx-auto space-y-8">
          <SpecialEventCard
          id="lunch-info"
          badge="Daily Lunch"
          badgeColor="indigo"
          title="Lunch Options"
          description="We do not have a reserved conference restaurant for lunch. However, we have compiled a list of 18 highly-rated lunch spots in the Gerland district near the ENS de Lyon venue."
          details={[
            { icon: 'calendar', label: 'Schedule', value: 'Check daily schedule' },
            { icon: 'mappin',   label: 'Location',  value: 'Various locations in Gerland (7th Arr.)' },
          ]}
          customMapSide={
            <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-800/50">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center">
                <h4 className="font-bold text-lg text-slate-800 dark:text-white">Curated Lunch Spots</h4>
                <a
                  href={CONSTANTS.links.lunchMapList}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-sm flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-1" /> View on Map
                </a>
              </div>
              <div className="overflow-y-auto flex-1 p-6 space-y-3" style={{ maxHeight: '400px' }}>
                {lunchPlaces.map(place => (
                  <div key={place.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-100">{place.name}</h5>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-2">
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{place.type}</span>
                        <span>•</span>
                        <span>{place.priceRange}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-amber-500 font-bold text-sm">
                        {place.rating} <span className="text-amber-400 ml-1">★</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5">({place.reviews})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          className="mb-8"
        />  <SpecialEventCard
            id="dinner"
            badge="Workshop Dinner"
            badgeColor="amber"
            title="Le Bouchon des Filles"
            description="Join us for the workshop dinner at Le Bouchon des Filles, a cosy Lyon bouchon in the heart of the city."
            details={[
              { icon: 'calendar', label: 'Date & Time', value: 'Wednesday, 7:00 PM' },
              { icon: 'mappin',   label: 'Address',     value: '20, rue Sergent-Blandan, 69001 Lyon' },
              { icon: 'utensils', label: 'Fee',         value: '44 euros per person' },
            ]}
            mapSrc={CONSTANTS.links.restaurantMap}
            mapTitle="Le Bouchon des Filles Location"
            directionsHref={CONSTANTS.links.restaurantDirections}
            registrationHref={CONSTANTS.links.socialEventRegistration}
            menuHref="/dinner-menu.pdf"
          />

          <SpecialEventCard
            id="social-event"
            badge="Social Event"
            badgeColor="purple"
            title="La Commune"
            description="Kick off the week with a social evening at La Commune — a lively venue in the 7th arrondissement, perfect for meeting fellow participants."
            details={[
              { icon: 'calendar', label: 'Date & Time', value: 'Monday, 6:30 PM' },
              { icon: 'mappin',   label: 'Address',     value: '3 Rue Pré-Gaudry, 69007 Lyon' },
              { icon: 'utensils', label: 'Fee',         value: '20 euros per person' },
            ]}
            mapSrc={CONSTANTS.links.socialEventMap}
            mapTitle="La Commune Location"
            directionsHref={CONSTANTS.links.socialEventDirections}
            directionsColor="purple"
            registrationHref={CONSTANTS.links.socialEventRegistration}
            websiteHref="https://lacommune.co/lyon/"
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
