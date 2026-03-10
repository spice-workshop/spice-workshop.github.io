import type { FC, ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 inline-block mb-8 pb-2 relative">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-indigo rounded-full" />
  </h2>
);

export default SectionTitle;
