import React from 'react';
import search from "../assets/search.png";

export const Searchbar = ({
    searchValue,
    setSearchValue,
    disabled
}) => {
    return (
        <div className="relative w-full">

            <img
                src={search}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 transition
                    ${disabled ? "opacity-30" : "opacity-60"}
                `}
                alt="search"
            />

            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={disabled}
                placeholder={
                    disabled
                        ? "No tasks available"
                        : "Search tasks here ..."
                }
                className={`w-full rounded-full py-[10px] pl-12 pr-10
                font-bold tracking-wider text-sm transition-all duration-200
                ${
                    disabled
                    ? "bg-[#151525] text-gray-500 cursor-not-allowed border-[#2a2a2a]"
                    : "bg-[#1e1e40] border-[1.5px] border-[#2e2e5a] text-[#e0e0ff] placeholder-[#4a4a72] focus:outline-none focus:border-[#7c6ef0] focus:bg-[#22224a]"
                }`}
            />

            {!disabled && searchValue && (
                <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                    bg-[#2e2e5a] text-[#888] text-xs flex items-center justify-center
                    hover:bg-[#3e3e6a] transition"
                >
                    ✕
                </button>
            )}
        </div>
    );
};