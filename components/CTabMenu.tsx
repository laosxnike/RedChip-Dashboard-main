// components/CTabMenu.tsx
import React from 'react';

const tabs = ['All content', 'Published', 'Drafts', 'Scheduled'];

const TabMenu: React.FC = () => {
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {tabs.map((tab) => (
        <div
          key={tab}
          className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#283139] pl-4 pr-4"
        >
          <p className="text-white text-sm font-medium leading-normal">
            {tab}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
