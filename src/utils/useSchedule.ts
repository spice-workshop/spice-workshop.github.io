import { useState, useEffect } from 'react';
import { useParticipants } from './csvLoader';

const CONFERENCE_DAYS = [
    { date: "2026-03-16", label: "Day 1", fullLabel: "Day 1 (Mar 16)" },
    { date: "2026-03-17", label: "Day 2", fullLabel: "Day 2 (Mar 17)" },
    { date: "2026-03-18", label: "Day 3", fullLabel: "Day 3 (Mar 18)" },
    { date: "2026-03-19", label: "Day 4", fullLabel: "Day 4 (Mar 19)" },
    { date: "2026-03-20", label: "Day 5", fullLabel: "Day 5 (Mar 20)" },
];

export interface ScheduleEvent {
    time: string;
    title: string;
    status: 'upcoming' | 'completed' | 'active' | 'ended';
    speaker?: string;
    highlight?: boolean;
    linkId?: string;
    description?: string;
}

export interface EnrichedScheduleEvent extends ScheduleEvent {
    type?: 'talk' | 'fixed';
    sortTime?: string; // "HH:mm" for sorting
    abstract?: string;
}

export interface DaySchedule {
    day: string; // Display label "Day 1 (Mar 16)"
    date: string; // ISO date "2026-03-16"
    label: string; // "Mon" or "Day 1"
    events: EnrichedScheduleEvent[];
}

export const useSchedule = () => {
    const { data: participants, loading, error } = useParticipants();
    const [schedule, setSchedule] = useState<DaySchedule[]>([]);

    useEffect(() => {
        if (loading || error) return;

        // Group talks by day
        const daysMap = new Map<string, EnrichedScheduleEvent[]>();

        // Initialize days
        CONFERENCE_DAYS.forEach(dayInfo => {
            daysMap.set(dayInfo.date, []);
        });

        // Process all entries (talks + fixed events from CSV)
        participants.forEach(p => {
            if (p.sessionDate && p.timeRange) {
                // Normalize date (ensure it matches YYYY-MM-DD)
                const date = p.sessionDate.trim();
                
                if (daysMap.has(date)) {
                    // Extract start time for sorting (e.g. "14:00 - 14:30" -> "14:00")
                    const startTime = p.timeRange.split('-')[0].trim();
                    
                    // Infer type: if no name, it's a fixed event
                    const isFixed = !p.name || p.name.trim() === '';
                    
                    // Determine highlight
                    const highlight = isFixed && (p.talkTitle === 'Opening' || p.talkTitle === 'Discussion' || p.talkTitle.includes('Workshop Dinner'));
                    
                    // Generate ID
                    let linkId = '';
                    if (isFixed) {
                         // fixed-2026-03-16-1000-lunch
                         linkId = `fixed-${date}-${startTime.replace(':','')}-${p.talkTitle.replace(/\s+/g, '-').toLowerCase()}`;
                    } else {
                         // talk-lastname-1000
                         linkId = `talk-${p.lastName.toLowerCase()}-${startTime.replace(':','')}`;
                    }

                    daysMap.get(date)?.push({
                        time: p.timeRange,
                        title: p.talkTitle,
                        status: 'upcoming', // Default status
                        speaker: p.name, 
                        highlight: highlight,
                        type: isFixed ? 'fixed' : 'talk',
                        sortTime: startTime,
                        linkId: linkId, 
                        abstract: p.abstract
                    });
                }
            }
        });

        // Sort events within each day
        const sortedSchedule: DaySchedule[] = CONFERENCE_DAYS.map(dayInfo => {
            const events = daysMap.get(dayInfo.date) || [];
            
            // Sort by time
            events.sort((a, b) => {
                const timeA = a.sortTime || '00:00';
                const timeB = b.sortTime || '00:00';
                return timeA.localeCompare(timeB);
            });

            return {
                day: dayInfo.fullLabel,
                date: dayInfo.date,
                label: dayInfo.label,
                events: events
            };
        });

        setSchedule(sortedSchedule);

    }, [participants, loading, error]);

    return { schedule, loading, error };
};
