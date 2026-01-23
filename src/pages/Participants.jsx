import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { PARTICIPANTS_DATA } from '../data/ParticipantsData';
import SectionTitle from '../components/ui/SectionTitle';

const ParticipantsView = () => {
  const [participantSearch, setParticipantSearch] = useState("");
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <SectionTitle>Participant List</SectionTitle>
        <div className="relative">
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400" value={participantSearch} onChange={(e) => setParticipantSearch(e.target.value)} />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
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
                  {PARTICIPANTS_DATA.filter(p => p.name.toLowerCase().includes(participantSearch.toLowerCase())).map((person, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">{person.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{person.affiliation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 flex items-center"><Globe className="w-4 h-4 mr-2 text-slate-400" /> {person.country}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default ParticipantsView;
