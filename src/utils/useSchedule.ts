import { useMemo } from 'react';
import { useParticipants } from './csvLoader';
import type { EnrichedScheduleEvent, DaySchedule } from '../types/Schedule';

// Re-export for consumers that import from this module
export type { ScheduleEvent, EnrichedScheduleEvent, DaySchedule } from '../types/Schedule';

const CONFERENCE_DAYS = [
    { date: "2026-03-16", label: "Day 1", fullLabel: "Day 1 (Mar 16)" },
    { date: "2026-03-17", label: "Day 2", fullLabel: "Day 2 (Mar 17)" },
    { date: "2026-03-18", label: "Day 3", fullLabel: "Day 3 (Mar 18)" },
    { date: "2026-03-19", label: "Day 4", fullLabel: "Day 4 (Mar 19)" },
    { date: "2026-03-20", label: "Day 5", fullLabel: "Day 5 (Mar 20)" },
];

export const useSchedule = () => {
    const { data: participants, loading, error } = useParticipants();

    const schedule = useMemo<DaySchedule[]>(() => {
        if (loading || error) return [];

        // Group talks by day
        const daysMap = new Map<string, EnrichedScheduleEvent[]>();
        CONFERENCE_DAYS.forEach(dayInfo => daysMap.set(dayInfo.date, []));

        // Process all entries (talks + fixed events from CSV)
        participants.forEach(p => {
            if (!p.sessionDate || !p.timeRange) return;

            const date = p.sessionDate.trim();
            if (!daysMap.has(date)) return;

            const startTime = p.timeRange.split('-')[0].trim();
            const isFixed = !p.name || p.name.trim() === '';

            let highlight: EnrichedScheduleEvent['highlight'] = false;
            if (isFixed) {
                if (p.talkTitle === 'Opening') {
                    highlight = 'amber';
                } else if (p.talkTitle.includes('Dinner')) {
                    highlight = 'rose';
                } else if (p.talkTitle === 'Discussion') {
                    highlight = 'emerald';
                } else if (p.talkTitle.includes('Lunch')) {
                    highlight = 'indigo';
                } else if (p.talkTitle.includes('Coffee Break')) {
                    highlight = 'fuchsia';
                } else if (p.talkTitle.includes('Social Evening')) {
                    highlight = 'orange';
                } else if (p.talkTitle === 'End') {
                    highlight = 'slate';
                }
            }

            const linkId = isFixed
                ? `fixed-${date}-${startTime.replace(':', '')}-${p.talkTitle.replace(/\s+/g, '-').toLowerCase()}`
                : `talk-${p.lastName.toLowerCase()}-${startTime.replace(':', '')}`;

            daysMap.get(date)!.push({
                time: p.timeRange,
                title: p.talkTitle,
                status: 'upcoming',
                speaker: p.name,
                highlight,
                type: isFixed ? 'fixed' : 'talk',
                sortTime: startTime,
                linkId,
            });
        });

        return CONFERENCE_DAYS.map(dayInfo => {
            const events = (daysMap.get(dayInfo.date) || []).sort((a, b) =>
                (a.sortTime || '00:00').localeCompare(b.sortTime || '00:00')
            );
            return { day: dayInfo.fullLabel, date: dayInfo.date, label: dayInfo.label, events };
        });
    }, [participants, loading, error]);

    return { schedule, loading, error };
};
