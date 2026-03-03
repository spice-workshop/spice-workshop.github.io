import type { FC } from 'react';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
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
}

const ScheduleDayCard: FC<Props> = ({ dayData, dayIdx }) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const toggleExpand = (id: string) =>
    setExpandedEventId(expandedEventId === id ? null : id);

  return (
    <Card className="border-t-4 border-t-indigo-500 min-h-[400px]">
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
            return (
              <ScheduleEventRow
                key={eventId}
                event={event}
                eventId={eventId}
                isExpanded={expandedEventId === eventId}
                onToggle={toggleExpand}
              />
            );
          })
        ) : (
          <p className="text-center text-slate-500 py-10">No events scheduled for this day.</p>
        )}
      </div>
    </Card>
  );
};

export default ScheduleDayCard;
