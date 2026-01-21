import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { TALKS_DATA } from '../../data/scheduleData';
import { CONSTANTS } from '../../data/Constants';
import SectionTitle from '../ui/SectionTitle';

const TalksView = () => {
  const [activeTalkDay, setActiveTalkDay] = useState("Day 1");
  const [talkSearch, setTalkSearch] = useState("");
  const [openTalkId, setOpenTalkId] = useState(null);
  
  const currentDayTalks = TALKS_DATA[activeTalkDay] || [];
  const filteredTalks = currentDayTalks.filter(t => 
    t.title.toLowerCase().includes(talkSearch.toLowerCase()) ||
    t.speaker.toLowerCase().includes(talkSearch.toLowerCase()) ||
    t.abstract.toLowerCase().includes(talkSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        <div className="text-center mb-8">
             <SectionTitle>Talks & Abstracts</SectionTitle>
             <p className="text-slate-600 mt-[-1rem]">Select a day and search to filter scheduled talks.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {Object.keys(TALKS_DATA).map((day) => (
            <button
              key={day}
              onClick={() => setActiveTalkDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTalkDay === day ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="relative mb-8 max-w-lg mx-auto">
           <input 
              type="text" 
              placeholder="Search talks..." 
              className="pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
              value={talkSearch}
              onChange={(e) => setTalkSearch(e.target.value)}
           />
           <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>
        
        <div className="space-y-3 min-h-[300px]">
            {filteredTalks.length > 0 ? (
              filteredTalks.map((talk) => {
                const isOpen = openTalkId === talk.id;
                return (
                  <div key={talk.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div 
                      className="p-4 cursor-pointer flex justify-between items-start bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => setOpenTalkId(isOpen ? null : talk.id)}
                    >
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                           <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 w-fit">
                              {talk.time}
                           </span>
                           <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{talk.title}</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{talk.speaker} <span className="text-slate-400 dark:text-slate-500 font-normal">| {talk.affiliation}</span></p>
                      </div>
                      <div className="mt-1 text-indigo-500 ml-4">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-fade-in">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{talk.abstract}</p>
                        <div className="flex gap-4">
                          <a href={CONSTANTS.links.cloudDrive} className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"><FileText size={16} className="mr-2" /> Download Slides</a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-slate-500 italic py-10">No talks found.</p>
            )}
        </div>
    </div>
  );
};

export default TalksView;
