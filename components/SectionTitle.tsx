// components/SectionTitle.tsx

import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="px-4 py-2">
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h3>
      {subtitle && <p className="text-[#9cacba] text-sm">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
