// components/ClientsSection.tsx

import React from 'react';
import Link from 'next/link';

// These are your actual clients from [subpage].tsx
const CLIENT_SYMBOLS = [
  'ZOM', 'PEV', 'LOBO', 'SMXT', 'SPI', 'SPEC', 'ASPI', 'AREC',
  'INHD', 'QYOUF', 'PODC', 'LVO', 'STSS', 'MMA', 'OMQS',
  'EBZT', 'MOB', 'RCAT', 'CVM', 'CBDW', 'AENT', 'TRIB',
  'WHEN', 'KDLY', 'NXL', 'CANF', 'LYT', 'SAVU', 'OSTX',
];

const ClientsSection: React.FC = () => {
  return (
    <section className="my-8">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
        Clients
      </h2>
      <div className="flex flex-wrap gap-2 px-4">
        {CLIENT_SYMBOLS.map((symbol) => (
          <Link 
            key={symbol} 
            href={`/clients/${symbol}/overview`}
            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#283139] px-4 hover:bg-[#3b4954] transition-colors"
          >
            <p className="text-white text-sm font-medium leading-normal">
              {symbol}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;

