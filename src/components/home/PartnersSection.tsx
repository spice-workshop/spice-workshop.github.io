import type { FC } from 'react';
import { PARTNERS_LIST } from '../../data/PartnerData';

const PartnersSection: FC = () => (
  <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">Supported By</h3>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700">
        {PARTNERS_LIST.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-all hover:scale-110 hover:drop-shadow-lg"
            title={`Visit ${partner.name}`}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              width="200"
              height="100"
              loading="lazy"
              className="h-16 md:h-20 w-32 md:w-40 object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default PartnersSection;
