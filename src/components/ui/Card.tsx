import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-gradient-surface-light dark:bg-gradient-surface-dark rounded-2xl shadow-soft border border-slate-200/80 dark:border-slate-700/80 p-6 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export default Card;
