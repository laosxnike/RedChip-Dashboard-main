// components/ETabMenu.tsx
import React from 'react';
import Link from 'next/link';

interface TabItem {
  label: string;
  active?: boolean;
}

const tabs: TabItem[] = [
  { label: 'Overview', active: true },
  { label: 'Likes' },
  { label: 'Shares' },
  { label: 'Comments' },
  { label: 'Mentions' },
];

const TabMenu: React.FC = () => {
  return (
    <div className="pb-3">
      <div className="flex border-b border-[#3b4954] px-4 gap-8">
        {tabs.map((tab) => (
          <Link
            href="#"
            key={tab.label}
            className={`flex flex-col items-center justify-center border-b-[3px] ${
              tab.active ? 'border-b-white' : 'border-b-transparent'
            } pb-[13px] pt-4`}
          >
            <p
              className={`${
                tab.active ? 'text-white' : 'text-[#9cacba]'
              } text-sm font-bold leading-normal tracking-[0.015em]`}
            >
              {tab.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;
