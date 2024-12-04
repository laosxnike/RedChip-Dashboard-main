import React from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h4 className="text-sm text-gray-400">{title}</h4>
      <p className="text-2xl font-bold text-white">
        {value} {unit && <span className="text-sm">{unit}</span>}
      </p>
    </div>
  );
};

export default MetricCard; 