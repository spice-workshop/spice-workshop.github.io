export interface Participant {
  Name: string;
  Participant: string;
  LOC: string;
  SOC: string;
  Chairs: string;
  Organisation: string;
  Country: string;
  Title: string;
  talkTime: string;
}

export type ParticipantRole = 'Participant' | 'LOC' | 'SOC' | 'Chair';

export interface ParsedParticipant {
  name: string;
  affiliation: string;
  country: string;
  talkTitle: string;
  talkTime: string;
  roles: ParticipantRole[];
}
