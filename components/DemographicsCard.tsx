// components/DemographicsCard.tsx
import React from 'react';

interface DemographicsCardProps {
  label: string;
  icon: JSX.Element;
}

const DemographicsCard: React.FC<DemographicsCardProps> = ({ label, icon }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#3b4954] bg-[#1b2227] p-4">
      <div className="text-white" data-icon={label} data-size="24px">
        {icon}
      </div>
      <h2 className="text-white text-base font-bold">{label}</h2>
    </div>
  );
};

export default DemographicsCard;
