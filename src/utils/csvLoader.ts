import { useMemo } from 'react';
import type { ParsedParticipant, ParticipantRole } from '../types/Participant';
import participantsData from '../data/participants.json';

interface SanitizedParticipant {
  firstName: string;
  lastName: string;
  sessionDate: string;
  timeRange: string;
  isParticipant: boolean;
  isLOC: boolean;
  isSOC: boolean;
  isChair: boolean;
  organisation: string;
  country: string;
  title: string;
}

export const useParticipants = () => {
  const data = useMemo<ParsedParticipant[]>(() => {
    return (participantsData as SanitizedParticipant[]).map((item) => {
      const roles: ParticipantRole[] = [];
      if (item.isParticipant) roles.push('Participant');
      if (item.isLOC) roles.push('LOC');
      if (item.isSOC) roles.push('SOC');
      if (item.isChair) roles.push('Chair');

      return {
        name: [item.firstName, item.lastName].filter(Boolean).join(' '),
        lastName: item.lastName,
        affiliation: item.organisation,
        country: item.country,
        talkTitle: item.title,
        sessionDate: item.sessionDate,
        timeRange: item.timeRange,
        roles,
      };
    });
  }, []);

  return { data, loading: false, error: null };
};
