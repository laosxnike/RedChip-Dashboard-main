// components/Card.tsx

import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3b4954]">
    <p className="text-white text-base font-medium leading-normal">{title}</p>
    <p className="text-white tracking-light text-2xl font-bold leading-tight">
      {value}
    </p>
  </div>
);

export default Card;
