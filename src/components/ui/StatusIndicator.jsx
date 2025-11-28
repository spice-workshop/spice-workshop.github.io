import React from 'react';
import { Circle } from 'lucide-react';

const StatusIndicator = ({ status }) => {
  if (status === 'ended') {
    return (
      <div className="flex items-center text-red-500 font-semibold text-xs uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full border border-red-100 dark:border-red-900/30 opacity-75">
        <Circle className="w-2 h-2 fill-red-500 mr-2" />
        Ended
      </div>
    );
  }
  return null;
};

export default StatusIndicator;
