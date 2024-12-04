// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { FiBell, FiMessageCircle } from 'react-icons/fi';
import { TbCircuitCapacitor } from 'react-icons/tb';

const Header: React.FC = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Audiences', href: '/audiences' },
    { label: 'Content', href: '/content' },
    { label: 'Engagement', href: '/engagement' }
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283139] px-10 py-3 bg-[#111518]">
      <div className="flex items-center gap-4 text-white">
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          RedChip
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {navLinks.map((link) => (
            <Link 
              href={link.href}
              key={link.label} 
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-xl h-10 bg-[#283139] text-white px-2.5 hover:bg-[#3b4954] transition-colors">
            <FiBell size={20} />
          </button>
          <button className="flex items-center justify-center rounded-xl h-10 bg-[#283139] text-white px-2.5 hover:bg-[#3b4954] transition-colors">
            <FiMessageCircle size={20} />
          </button>
          <button 
            onClick={() => window.open('http://localhost:3002', '_blank')}
            className="flex items-center justify-center rounded-full w-12 h-12 bg-[#283139] hover:bg-[#3b4954] transition-colors cursor-pointer"
          >
            <TbCircuitCapacitor size={32} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
