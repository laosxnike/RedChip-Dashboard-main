// components/StatCard.tsx

import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, subtitle, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value} {unit && <span className="text-sm">{unit}</span>}
      </p>
      {children}
    </div>
  );
};

export default StatCard;
