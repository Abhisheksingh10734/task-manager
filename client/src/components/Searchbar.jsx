import React, { useState } from 'react';
import search from "../assets/search.png";

export const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');
  return (
    <>
    <div className="relative w-full">
    
      {/* Search Icon */}
      <img
        src={search}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60 group-focus-within:opacity-100 transition"
      />
    
      {/* Input */}
      <input
        type="text"
        placeholder="Search tasks here ..."
        className="w-full bg-[#1e1e40] border-[1.5px] border-[#2e2e5a] rounded-full py-[10px] pl-12 pr-10
                   text-[#e0e0ff] placeholder-[#4a4a72]
                   focus:outline-none focus:border-[#7c6ef0] focus:bg-[#22224a]
                   transition-all duration-200 font-bold tracking-wider text-sm"
      />
    
      {/* Clear button — show when input has value */}
      {searchValue && (
        <button
          // onClick={() => setSearchValue('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                     bg-[#2e2e5a] text-[#888] text-xs flex items-center justify-center
                     hover:bg-[#3e3e6a] transition"
        >
          ✕
        </button>
      )}
    
    </div>
    </>
  )
}
