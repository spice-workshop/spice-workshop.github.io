import type { FC } from 'react';
import { Utensils, Users, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';
import type { EnrichedScheduleEvent } from '../../utils/useSchedule';

interface Props {
  event: EnrichedScheduleEvent;
  eventId: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const ScheduleEventRow: FC<Props> = ({ event, eventId, isExpanded, onToggle }) => {
  const hasAbstract = !!event.abstract;

  return (
    <div
      id={event.linkId}
      className={`flex flex-col p-4 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group ${
        event.highlight
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 hover:border-amber-200'
          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 shadow-sm'
      }`}
    >
      <div
        className={`flex flex-col md:flex-row md:items-center ${hasAbstract ? 'cursor-pointer' : ''}`}
        onClick={() => hasAbstract && onToggle(eventId)}
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
                  {event.type === 'fixed' ? <Utensils className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                  {event.speaker}
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

      {hasAbstract && isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 ml-0 md:ml-36 animate-fade-in">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            <FileText className="w-4 h-4 inline mr-1 text-slate-400" />
            {event.abstract}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleEventRow;
