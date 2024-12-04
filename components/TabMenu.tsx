// components/TabMenu.tsx
import React from 'react';

interface TabItem {
  label: string;
  active?: boolean;
}

const tabs: TabItem[] = [
  { label: 'All', active: true },
  { label: 'Active' },
  { label: 'Inactive' },
  { label: 'Scheduled' },
  { label: 'Drafts' },
  { label: 'Archived' },
];

const TabMenu: React.FC = () => {
  return (
    <div className="pb-3">
      <div className="flex border-b border-[#3b4954] px-4 gap-8">
        {tabs.map((tab) => (
          <a
            href="#"
            key={tab.label}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
              tab.active
                ? 'border-b-white text-white'
                : 'border-b-transparent text-[#9cacba]'
            }`}
          >
            <p className="text-sm font-bold tracking-[0.015em]">{tab.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;
