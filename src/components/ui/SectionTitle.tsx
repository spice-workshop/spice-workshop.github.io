import type { FC, ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 border-b-4 border-indigo-600 inline-block mb-8 pb-1">
    {children}
  </h2>
);

export default SectionTitle;
