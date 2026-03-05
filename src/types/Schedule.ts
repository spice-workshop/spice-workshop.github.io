export type ScheduleHighlight =
  | 'amber' | 'emerald' | 'indigo' | 'fuchsia' | 'purple'
  | 'rose' | 'cyan' | 'orange' | 'slate' | false;

export interface ScheduleEvent {
  time: string;
  title: string;
  status: 'upcoming' | 'completed' | 'active' | 'ended';
  speaker?: string;
  highlight?: ScheduleHighlight;
  linkId?: string;
  description?: string;
}

export interface EnrichedScheduleEvent extends ScheduleEvent {
  type?: 'talk' | 'fixed';
  sortTime?: string;
  slidesUrl?: string;
  isCurrent?: boolean;
}

export interface DaySchedule {
  day: string;
  date: string;
  label: string;
  events: EnrichedScheduleEvent[];
}
