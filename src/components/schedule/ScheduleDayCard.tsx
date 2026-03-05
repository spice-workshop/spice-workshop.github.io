import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import ScheduleEventRow from './ScheduleEventRow';
import type { EnrichedScheduleEvent } from '../../utils/useSchedule';

interface DayData {
  day: string;
  date: string;
  label: string;
  events: EnrichedScheduleEvent[];
}

interface Props {
  dayData: DayData;
  dayIdx: number;
  onPrev?: () => void;
  onNext?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

interface DayNavProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

/** Parse "HH:mm - HH:mm" and check if `now` falls within that range on `dayDate`. */
function isCurrentEvent(event: EnrichedScheduleEvent, dayDate: string, now: Date): boolean {
  if (!event.time || !event.time.includes('-')) return false;
  const [startStr, endStr] = event.time.split('-').map(s => s.trim());
  if (!startStr || !endStr) return false;

  const [sh, sm] = startStr.split(':').map(Number);
  const [eh, em] = endStr.split(':').map(Number);

  // Build Date objects in CET for comparison
  const start = new Date(`${dayDate}T${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}:00+01:00`);
  const end = new Date(`${dayDate}T${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}:00+01:00`);

  return now >= start && now < end;
}

const DayNav: FC<DayNavProps> = ({ onPrev, onNext, isFirst, isLast }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onPrev}
      disabled={isFirst}
      aria-label="Previous day"
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      <ChevronLeft className="w-4 h-4" /> Prev day
    </button>
    <button
      onClick={onNext}
      disabled={isLast}
      aria-label="Next day"
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      Next day <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const ScheduleDayCard: FC<Props> = ({ dayData, dayIdx, onPrev, onNext, isFirst, isLast }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const showNav = !!onPrev && !!onNext;

  // Enrich events with isCurrent
  const eventsWithCurrent = dayData.events.map(event => ({
    ...event,
    isCurrent: isCurrentEvent(event, dayData.date, now),
  }));

  return (
    <Card className="border-t-4 border-t-indigo-500 min-h-[400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-4 gap-4 sm:gap-0">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center w-full sm:w-1/3">
          <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> {dayData.day}
        </h3>
        {showNav && (
          <div className="flex justify-center w-full sm:w-1/3">
            <DayNav onPrev={onPrev!} onNext={onNext!} isFirst={isFirst} isLast={isLast} />
          </div>
        )}
        <div className="flex justify-end w-full sm:w-1/3">
          <span className="text-sm text-slate-400">Timezone: CET (UTC+1)</span>
        </div>
      </div>

      {/* Events */}
      <div className="space-y-4">
        {eventsWithCurrent.length > 0 ? (
          eventsWithCurrent.map((event, idx) => {
            const eventId = event.linkId || `event-${dayIdx}-${idx}`;
            return (
              <ScheduleEventRow
                key={eventId}
                event={event}
                eventId={eventId}
              />
            );
          })
        ) : (
          <p className="text-center text-slate-500 py-10">No events scheduled for this day.</p>
        )}
      </div>

      {/* Bottom nav */}
      {showNav && (
        <div className="flex justify-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <DayNav onPrev={onPrev!} onNext={onNext!} isFirst={isFirst} isLast={isLast} />
        </div>
      )}
    </Card>
  );
};

export default ScheduleDayCard;
