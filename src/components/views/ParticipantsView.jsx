import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PARTICIPANTS_DATA } from '../../data/participants';
import SectionTitle from '../ui/SectionTitle';

const ParticipantsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredParticipants = PARTICIPANTS_DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.affiliation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <SectionTitle>Participant List</SectionTitle>
        <div className="relative w-full md:w-auto">
           <input 
              type="text" 
              placeholder="Search participants..." 
              className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                          <th className="p-4 font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Name</th>
                          <th className="p-4 font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Affiliation</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredParticipants.length > 0 ? (
                          filteredParticipants.map((p, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                  <td className="p-4 font-medium text-slate-900 dark:text-slate-200">{p.name}</td>
                                  <td className="p-4 text-slate-600 dark:text-slate-400">{p.affiliation}</td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="2" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                  No participants found matching "{searchTerm}"
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default ParticipantsView;
