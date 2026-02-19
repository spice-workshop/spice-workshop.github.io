import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Globe } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useParticipants } from '../utils/csvLoader';

const ParticipantsView: React.FC = () => {
  const [participantSearch, setParticipantSearch] = useState("");
  const { data, loading, error } = useParticipants();
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  
  // Reset letter filter when search changes
  React.useEffect(() => {
    if (participantSearch) {
        setSelectedLetter('All');
    }
  }, [participantSearch]);
  
  if (loading) return <div className="text-center py-10">Loading participants...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const filteredParticipants = data.filter(p => {
    const isParticipant = p.roles.includes('Participant');
    const matchesSearch = p.name.toLowerCase().includes(participantSearch.toLowerCase()) || 
                          p.affiliation.toLowerCase().includes(participantSearch.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || p.lastName.toUpperCase().startsWith(selectedLetter);
    
    return isParticipant && matchesSearch && matchesLetter;
  });

  const alphabet = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <Helmet>
        <title>Participants | SPiCE 2 Conference</title>
        <meta name="description" content="Meet the attendees of the SPiCE 2 conference. Search participants by name or affiliation." />
        <link rel="canonical" href="https://spice-workshop.github.io/participants" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spice-workshop.github.io/participants" />
        <meta property="og:title" content="Participants | SPiCE 2 Conference" />
        <meta property="og:description" content="Meet the attendees of the SPiCE 2 conference. Search participants by name or affiliation." />
        <meta property="og:image" content="https://spice-workshop.github.io/assets/HeaderImage.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://spice-workshop.github.io/participants" />
        <meta name="twitter:title" content="Participants | SPiCE 2 Conference" />
        <meta name="twitter:description" content="Meet the attendees of the SPiCE 2 conference. Search participants by name or affiliation." />
        <meta name="twitter:image" content="https://spice-workshop.github.io/assets/HeaderImage.png" />
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <SectionTitle>Participant List</SectionTitle>
        <div className="relative">
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400" value={participantSearch} onChange={(e) => setParticipantSearch(e.target.value)} />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
        {alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => {
                    setSelectedLetter(letter);
                    setParticipantSearch(""); // Optional: clear search on letter click? UX choice. Let's clear it for clarity.
                }}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    selectedLetter === letter
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
            >
                {letter}
            </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Number of registers : {filteredParticipants.length}
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Affiliation</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Country</th>
                  </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((person, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">{person.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{person.affiliation}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 flex items-center">
                                  {person.country && (
                                    <>
                                      <Globe className="w-4 h-4 mr-2 text-slate-400" /> {person.country}
                                    </>
                                  )}
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={3} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                              No participants found starting with "{selectedLetter !== 'All' ? selectedLetter : ''}" {participantSearch ? `matching "${participantSearch}"` : ''}
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default ParticipantsView;
