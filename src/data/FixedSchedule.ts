
export interface FixedEvent {
  day: string; // "2026-03-16"
  time: string; // "09:00"
  endTime?: string; // "09:30" - optional for sorting/display
  title: string;
  status: 'upcoming' | 'completed' | 'active' | string;
  highlight?: boolean;
  type: 'fixed';
  speaker?: string;
  description?: string;
}

export const FIXED_SCHEDULE: FixedEvent[] = [
  // Day 1: March 16
  { day: "2026-03-16", time: "08:30", title: "Registration", status: "upcoming", type: "fixed" },
  { day: "2026-03-16", time: "09:00", title: "Welcome & Logistics", status: "upcoming", highlight: true, type: "fixed" },
  { day: "2026-03-16", time: "10:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-16", time: "12:30", title: "Lunch", status: "upcoming", type: "fixed" },
  { day: "2026-03-16", time: "15:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-16", time: "17:30", title: "Welcome Reception", status: "upcoming", highlight: true, type: "fixed" },

  // Day 2: March 17
  { day: "2026-03-17", time: "10:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-17", time: "12:30", title: "Lunch", status: "upcoming", type: "fixed" },
  { day: "2026-03-17", time: "15:30", title: "Coffee Break", status: "upcoming", type: "fixed" },

  // Day 3: March 18
  { day: "2026-03-18", time: "10:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-18", time: "12:30", title: "Lunch", status: "upcoming", type: "fixed" },
  { day: "2026-03-18", time: "15:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-18", time: "19:00", title: "Workshop Dinner", status: "upcoming", highlight: true, type: "fixed" },

  // Day 4: March 19
  { day: "2026-03-19", time: "10:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-19", time: "12:30", title: "Lunch", status: "upcoming", type: "fixed" },
  { day: "2026-03-19", time: "15:30", title: "Coffee Break", status: "upcoming", type: "fixed" },

  // Day 5: March 20
  { day: "2026-03-20", time: "10:30", title: "Coffee Break", status: "upcoming", type: "fixed" },
  { day: "2026-03-20", time: "12:30", title: "Lunch", status: "upcoming", type: "fixed" },
  { day: "2026-03-20", time: "14:00", title: "Closing Remarks", status: "upcoming", highlight: true, type: "fixed" },
];

export const CONFERENCE_DAYS = [
    { date: "2026-03-16", label: "Day 1", fullLabel: "Day 1 (Mar 16)" },
    { date: "2026-03-17", label: "Day 2", fullLabel: "Day 2 (Mar 17)" },
    { date: "2026-03-18", label: "Day 3", fullLabel: "Day 3 (Mar 18)" },
    { date: "2026-03-19", label: "Day 4", fullLabel: "Day 4 (Mar 19)" },
    { date: "2026-03-20", label: "Day 5", fullLabel: "Day 5 (Mar 20)" },
];
