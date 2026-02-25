import { useState, useEffect } from 'react';
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
  const [data, setData] = useState<ParsedParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed: ParsedParticipant[] = (participantsData as SanitizedParticipant[])
        .map((item) => {
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
            abstract: '',
            roles,
          };
        });

      setData(parsed);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
