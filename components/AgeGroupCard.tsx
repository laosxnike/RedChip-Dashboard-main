// components/AgeGroupCard.tsx
import React from 'react';

interface AgeGroupCardProps {
  label: string;
  value: string;
}

const AgeGroupCard: React.FC<AgeGroupCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#283139] min-w-[158px] flex-1">
      <p className="text-white text-base font-medium">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
};

export default AgeGroupCard;
