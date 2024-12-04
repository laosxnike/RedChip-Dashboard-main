// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { FiHome, FiGrid, FiSpeaker, FiSettings } from 'react-icons/fi';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', href: '#', icon: FiHome, active: true },
  { label: 'Catalog', href: '#', icon: FiGrid },
  { label: 'Promotions', href: '#', icon: FiSpeaker },
  { label: 'Settings', href: '#', icon: FiSettings },
];

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-full min-h-[700px] bg-[#111518] p-4">
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
              item.active ? 'bg-[#283139]' : ''
            }`}
          >
            <div className="text-white">
              <item.icon size={24} />
            </div>
            <p className="text-white text-sm font-medium">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
