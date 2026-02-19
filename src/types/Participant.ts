export interface Participant {
  Firstname: string;
  Lastname: string;
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
  lastName: string;
  affiliation: string;
  country: string;
  talkTitle: string;
  talkTime: string;
  roles: ParticipantRole[];
}
