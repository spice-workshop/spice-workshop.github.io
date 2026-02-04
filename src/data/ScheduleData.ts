export interface ScheduleEvent {
  time: string;
  title: string;
  status: 'upcoming' | 'completed' | 'active' | string;
  highlight?: boolean;
  linkId?: string;
  speaker?: string;
}

export interface ScheduleDay {
  day: string;
  label: string;
  events: ScheduleEvent[];
}

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: "Day 1 (Mar 16)",
    label: "Mon",
    events: [
      { time: "TBD", title: "Schedule to be updated", status: "upcoming" }
    ]
  },
  {
    day: "Day 2 (Mar 17)",
    label: "Tue",
    events: [
      { time: "TBD", title: "Schedule to be updated", status: "upcoming" }
    ]
  },
  {
    day: "Day 3 (Mar 18)",
    label: "Wed",
    events: [
      { time: "TBD", title: "Schedule to be updated", status: "upcoming" }
    ]
  },
  {
    day: "Day 4 (Mar 19)",
    label: "Thu",
    events: [
      { time: "TBD", title: "Schedule to be updated", status: "upcoming" }
    ]
  },
  {
    day: "Day 5 (Mar 20)",
    label: "Fri",
    events: [
      { time: "TBD", title: "Schedule to be updated", status: "upcoming" }
    ]
  }
];

export interface Talk {
  id: number;
  time: string;
  title: string;
  speaker: string;
  affiliation: string;
  abstract: string;
  slidesLink: string;
  recordingLink: string;
}

export interface TalksData {
  [key: string]: Talk[];
}

export const TALKS_DATA: TalksData = {
  "Day 1": [
    { id: 101, time: "TBD", title: "Talks to be announced", speaker: "Coming soon", affiliation: "", abstract: "Abstract coming soon...", slidesLink: "#", recordingLink: "#" },
  ],
  "Day 2": [
    { id: 201, time: "TBD", title: "Talks to be announced", speaker: "Coming soon", affiliation: "", abstract: "Abstract coming soon...", slidesLink: "#", recordingLink: "#" },
  ],
  "Day 3": [
    { id: 301, time: "TBD", title: "Talks to be announced", speaker: "Coming soon", affiliation: "", abstract: "Abstract coming soon...", slidesLink: "#", recordingLink: "#" },
  ],
  "Day 4": [
    { id: 401, time: "TBD", title: "Talks to be announced", speaker: "Coming soon", affiliation: "", abstract: "Abstract coming soon...", slidesLink: "#", recordingLink: "#" },
  ],
  "Day 5": [
    { id: 501, time: "TBD", title: "Talks to be announced", speaker: "Coming soon", affiliation: "", abstract: "Abstract coming soon...", slidesLink: "#", recordingLink: "#" },
  ]
};
