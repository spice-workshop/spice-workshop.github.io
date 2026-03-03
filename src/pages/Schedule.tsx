import { useState } from 'react';
import type { FC } from 'react';
import { Calendar, Utensils, Search, Download } from 'lucide-react';
import { CONSTANTS } from '../data/Constants';
import { useSchedule } from '../utils/useSchedule';

import SEO from '../components/layout/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import ScheduleDayCard from '../components/schedule/ScheduleDayCard';
import SpecialEventCard from '../components/schedule/SpecialEventCard';

const ScheduleView: FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
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
              {data.label} ({data.date.slice(5)})
            </Button>
          ))}
        </div>
      )}

      {/* Search bar */}
      <div className="relative mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search talks, speakers, or abstracts..."
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
            <ScheduleDayCard key={dayIdx} dayData={dayData} dayIdx={dayIdx} />
          ))
        ) : (
          <p className="text-center text-slate-500 py-10">No events found matching your search.</p>
        )}
      </div>

      {/* Special Events */}
      <div className="mt-20">
        <h3 className="font-bold text-2xl mb-6 flex items-center text-slate-800 dark:text-white">
          <Utensils className="w-6 h-6 mr-3 text-amber-500" /> Special Events
        </h3>

        <SpecialEventCard
          id="lunch-info"
          badge="Daily Lunch"
          badgeColor="indigo"
          title="Lunch Details"
          description="We don't have a restaurant reservation, but we can provide you with a list of recommended restaurants in the area."
          details={[
            { icon: 'calendar', label: 'Schedule', value: 'To be updated' },
            { icon: 'mappin',   label: 'Address',  value: 'To be updated' },
          ]}
          mapSrc={CONSTANTS.links.crousMap}
          mapTitle="CROUS Location"
          mapMinHeight="300px"
          directionsHref={CONSTANTS.links.crousDirections}
          className="mb-8"
        />

        <SpecialEventCard
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
          className="mb-8"
        />

        <SpecialEventCard
          id="social-event"
          badge="Social Event"
          badgeColor="purple"
          title="La Commune"
          description="Kick off the week with a social evening at La Commune — a lively venue in the 7th arrondissement, perfect for meeting fellow participants."
          details={[
            { icon: 'calendar', label: 'Date & Time', value: 'Monday, 7:00 PM' },
            { icon: 'mappin',   label: 'Address',     value: '3 Rue Pré-Gaudry, 69007 Lyon' },
            { icon: 'utensils', label: 'Fee',         value: '20 euros per person' },
          ]}
          mapSrc={CONSTANTS.links.socialEventMap}
          mapTitle="La Commune Location"
          directionsHref={CONSTANTS.links.socialEventDirections}
          directionsColor="purple"
        />
      </div>
    </div>
  );
};

export default ScheduleView;
