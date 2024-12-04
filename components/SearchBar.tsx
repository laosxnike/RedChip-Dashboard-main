// components/SearchBar.tsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar: React.FC = () => {
  return (
    <div className="px-4 py-3">
      <label className="flex flex-col min-w-40 h-12 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
          <div className="text-[#9cacba] flex border-none bg-[#283139] items-center justify-center pl-4 rounded-l-xl">
            <FiSearch size={24} />
          </div>
          <input
            placeholder="Search for a promotion"
            className="form-input w-full flex-1 rounded-xl text-white bg-[#283139] h-full placeholder-[#9cacba] px-4 rounded-l-none border-none focus:outline-none focus:ring-0"
          />
        </div>
      </label>
    </div>
  );
};

export default SearchBar;
