import type { FC } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useParticipants } from '../../utils/csvLoader';

const CommitteesSection: FC = () => {
  const { data: participants, loading } = useParticipants();

  const socList = participants.filter(p => p.roles.includes('SOC'));
  const locList = participants.filter(p => p.roles.includes('LOC'));

  return (
    <div className="mb-24 border-t border-slate-100 pt-12">
      <SectionTitle>Organizing Committees</SectionTitle>
      {loading ? (
        <p className="text-center text-slate-500">Loading committees...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Scientific Organizing Committee (SOC)", color: "bg-indigo-500", list: socList },
            { title: "Local Organizing Committee (LOC)", color: "bg-green-500", list: locList },
          ].map((comm, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
                <span className={`w-8 h-1 ${comm.color} mr-3 rounded-full`} />
                {comm.title}
              </h3>
              <ul className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                {comm.list.map((member, mIdx) => (
                  <li key={mIdx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{member.name}</span>
                      {member.roles.includes('Chair') && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          Chair
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{member.affiliation}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommitteesSection;
