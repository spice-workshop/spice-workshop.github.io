import type { FC } from 'react';
import { Utensils, Users, FileDown } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';
import type { EnrichedScheduleEvent } from '../../utils/useSchedule';

interface Props {
  event: EnrichedScheduleEvent;
  eventId: string;
}

const ScheduleEventRow: FC<Props> = ({ event, eventId }) => {
  // Map highlight colors to tailwind classes
  const getContainerClasses = (color: typeof event.highlight) => {
    switch (color) {
      case 'amber':   return 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 hover:border-amber-200 hover:shadow-soft';
      case 'emerald': return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-200 hover:shadow-soft';
      case 'indigo':  return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-200 hover:shadow-soft';
      case 'fuchsia': return 'bg-fuchsia-50 dark:bg-fuchsia-900/20 border-fuchsia-100 dark:border-fuchsia-900/30 hover:border-fuchsia-200 hover:shadow-soft';
      case 'purple':  return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 hover:shadow-soft';
      case 'rose':    return 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30 hover:border-rose-200 hover:shadow-soft';
      case 'cyan':    return 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-900/30 hover:border-cyan-200 hover:shadow-soft';
      case 'orange':  return 'bg-orange-50 dark:bg-orange-500/20 border-orange-100 dark:border-orange-900/30 hover:border-orange-200 hover:shadow-soft';
      case 'slate':   return 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-soft';
      default:        return 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 shadow-soft hover:shadow-lifted';
    }
  };

  const getTextClasses = (color: typeof event.highlight) => {
    switch (color) {
      case 'amber':   return 'text-amber-900 dark:text-amber-400';
      case 'emerald': return 'text-emerald-900 dark:text-emerald-400';
      case 'indigo':  return 'text-indigo-900 dark:text-indigo-400';
      case 'fuchsia': return 'text-fuchsia-900 dark:text-fuchsia-400';
      case 'purple':  return 'text-purple-900 dark:text-purple-400';
      case 'rose':    return 'text-rose-900 dark:text-rose-400';
      case 'cyan':    return 'text-cyan-900 dark:text-cyan-400';
      case 'orange':  return 'text-orange-900 dark:text-orange-300';
      case 'slate':   return 'text-slate-600 dark:text-slate-300';
      default:        return 'text-slate-800 dark:text-slate-100';
    }
  };

  return (
    <div
      id={event.linkId}
      className={`flex flex-col p-4 rounded-xl transition-all duration-200 border border-transparent group ${getContainerClasses(event.highlight)} ${event.isCurrent ? 'border-l-4 !border-l-green-500' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-32 flex-shrink-0 text-sm font-mono font-bold text-slate-500 dark:text-slate-400 mb-2 md:mb-0 flex items-center gap-2">
          {event.time}
          {event.isCurrent && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-sans font-bold">NOW</span>
          )}
        </div>
        <div className="flex-grow md:border-l-2 md:border-slate-200 dark:md:border-slate-700 md:pl-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h4 className={`font-bold text-lg ${getTextClasses(event.highlight)}`}>
                {event.title}
              </h4>
              {event.type === 'talk' && event.speaker && (
                <div className="mt-1">
                  <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center">
                    {event.type === 'fixed' ? <Utensils className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                    {event.speaker}
                  </p>
                  {event.type === 'talk' && (
                    <div className="mt-1">
                      {event.slidesUrl ? (
                        <a
                          href={event.slidesUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline inline-flex items-center"
                        >
                          <FileDown className="w-3 h-3 mr-1" /> Slides
                        </a>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-xs inline-flex items-center">
                          <FileDown className="w-3 h-3 mr-1" /> Slides (coming soon)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex items-center gap-2">
              <StatusIndicator status={event.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEventRow;
