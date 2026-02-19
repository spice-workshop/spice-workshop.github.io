
import { useState, useEffect } from 'react';
import { useParticipants } from './csvLoader';
import { FIXED_SCHEDULE, CONFERENCE_DAYS } from '../data/FixedSchedule';
import { ScheduleEvent } from '../data/ScheduleData';

export interface EnrichedScheduleEvent extends ScheduleEvent {
    type?: 'talk' | 'fixed';
    sortTime?: string; // "HH:mm" for sorting
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

        // Add Fixed Events
        FIXED_SCHEDULE.forEach(event => {
            if (daysMap.has(event.day)) {
                daysMap.get(event.day)?.push({
                    time: event.time,
                    title: event.title,
                    status: event.status,
                    highlight: event.highlight,
                    type: 'fixed',
                    speaker: event.speaker,
                    sortTime: event.time
                });
            }
        });

        // Process Participants (Talks)
        participants.forEach(p => {
            if (p.sessionDate && p.timeRange) {
                // Normalize date (ensure it matches YYYY-MM-DD)
                // Assuming sessionDate in CSV is YYYY-MM-DD
                const date = p.sessionDate.trim();
                
                if (daysMap.has(date)) {
                    // Extract start time from timeRange (e.g. "14:00 - 14:30" -> "14:00")
                    const startTime = p.timeRange.split('-')[0].trim();
                    
                    daysMap.get(date)?.push({
                        time: p.timeRange,
                        title: p.talkTitle,
                        status: 'upcoming', // Default status
                        speaker: p.name, // Use full name
                        highlight: false,
                        type: 'talk',
                        sortTime: startTime,
                        linkId: `talk-${p.lastName}` // Anchor link
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
