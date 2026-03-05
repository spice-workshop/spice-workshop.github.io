export type ParticipantRole = 'Participant' | 'LOC' | 'SOC' | 'Chair';

export interface ParsedParticipant {
  name: string;
  lastName: string;
  affiliation: string;
  country: string;
  talkTitle: string;
  sessionDate: string;
  timeRange: string;
  roles: ParticipantRole[];
}
