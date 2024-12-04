// components/Pagination.tsx
import React from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4 gap-2">
      <Link href="#" className="flex w-10 h-10 items-center justify-center text-white">
        <FiChevronLeft size={18} />
      </Link>
      {[1, 2, 3, 4, 5].map((page) => (
        <Link
          href="#"
          key={page}
          className={`text-sm font-normal leading-normal flex w-10 h-10 items-center justify-center text-white rounded-full ${
            page === 1 ? 'bg-[#283139] font-bold' : ''
          }`}
        >
          {page}
        </Link>
      ))}
      <Link href="#" className="flex w-10 h-10 items-center justify-center text-white">
        <FiChevronRight size={18} />
      </Link>
    </div>
  );
};

export default Pagination;
