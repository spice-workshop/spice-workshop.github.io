import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Participant, ParsedParticipant, ParticipantRole } from '../types/Participant';

export const useParticipants = () => {
  const [data, setData] = useState<ParsedParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/participants.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        const text = await response.text();
        
        Papa.parse<Participant>(text, {
          header: true,
          skipEmptyLines: 'greedy',
          transformHeader: (h) => h.trim(),
          transform: (v) => v.trim(),
          complete: (results) => {
            const parsedData: ParsedParticipant[] = results.data
              .sort((a, b) => (a.Lastname || '').localeCompare(b.Lastname || ''))
              .map((item) => {
                const roles: ParticipantRole[] = [];
                if (item.Participant?.toLowerCase() === 'true') roles.push('Participant');
                if (item.LOC?.toLowerCase() === 'true') roles.push('LOC');
                if (item.SOC?.toLowerCase() === 'true') roles.push('SOC');
                if (item.Chairs?.toLowerCase() === 'true') roles.push('Chair');

                const fullName = [item.Firstname, item.Lastname].filter(Boolean).join(' ');

                return {
                    name: fullName,
                    lastName: item.Lastname || '',
                    affiliation: item.Organisation,
                    country: item.Country,
                    talkTitle: item.Title,
                    sessionDate: item.SessionDate,
                    timeRange: item.TimeRange,
                    abstract: item.Abstract,
                    roles: roles,
                };
            });
            setData(parsedData);
            setLoading(false);
          },
          error: (err: Error) => {
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
