import { useMemo } from 'react';
import { useParticipants } from './csvLoader';
import type { EnrichedScheduleEvent, DaySchedule } from '../types/Schedule';
import slidesData from '../data/slides.json';

// Re-export for consumers that import from this module
export type { ScheduleEvent, EnrichedScheduleEvent, DaySchedule } from '../types/Schedule';

interface SlideEntry {
    lastName?: string;
    firstName?: string;
    sessionDate: string;
    url: string;
    type?: 'discussion';
}

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

        // Build slides lookups
        const slidesLookup = new Map<string, string>();
        const discussionSlidesLookup = new Map<string, string>();
        for (const slide of slidesData as SlideEntry[]) {
            if (slide.type === 'discussion') {
                discussionSlidesLookup.set(slide.sessionDate, slide.url);
            } else if (slide.lastName) {
                const key = `${slide.lastName.toLowerCase()}|${slide.sessionDate}`;
                slidesLookup.set(key, slide.url);
            }
        }

        // Group talks by day
        const daysMap = new Map<string, EnrichedScheduleEvent[]>();
        CONFERENCE_DAYS.forEach(dayInfo => daysMap.set(dayInfo.date, []));

        // Process all entries (talks + fixed events from CSV)
        participants.forEach(p => {
            if (!p.sessionDate || !p.timeRange) return;

            const date = p.sessionDate.trim();
            if (!daysMap.has(date)) return;

            const startTime = p.timeRange.split('-')[0].trim();
            const isFixed = p.roles.length === 0;

            let title = p.talkTitle;
            let speaker = p.name;

            // For social events, extract the place name as the venue
            if (isFixed && title.startsWith('Social Event:')) {
                speaker = title.replace('Social Event:', '').trim();
                title = 'Social Evening';
            }

            let highlight: EnrichedScheduleEvent['highlight'] = false;
            if (isFixed) {
                if (title === 'Opening') {
                    highlight = 'amber';
                } else if (title.includes('Dinner')) {
                    highlight = 'rose';
                } else if (title === 'Discussion') {
                    highlight = 'emerald';
                } else if (title.includes('Lunch')) {
                    highlight = 'indigo';
                } else if (title.includes('Coffee Break')) {
                    highlight = 'fuchsia';
                } else if (title === 'Social Evening') {
                    highlight = 'orange';
                } else if (title === 'End') {
                    highlight = 'slate';
                }
            }

            const linkId = isFixed
                ? `fixed-${date}-${startTime.replace(':', '')}-${title.replace(/\s+/g, '-').toLowerCase()}`
                : `talk-${p.lastName.toLowerCase()}-${startTime.replace(':', '')}`;

            // Look up slides URL for talks and discussions
            let slidesUrl: string | undefined;
            if (!isFixed && p.lastName) {
                slidesUrl = slidesLookup.get(`${p.lastName.toLowerCase()}|${date}`);
            } else if (title === 'Discussion') {
                slidesUrl = discussionSlidesLookup.get(date);
            }

            daysMap.get(date)!.push({
                time: p.timeRange,
                title,
                status: 'upcoming',
                speaker,
                highlight,
                type: isFixed ? 'fixed' : 'talk',
                sortTime: startTime,
                linkId,
                slidesUrl,
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
