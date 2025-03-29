import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }
    onSearch(query, searchType);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex gap-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
        <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a recipe..."
              value={query}
              onChange={handleSearch}
              className="p-3 pl-10 rounded-full w-full text-lg shadow-md focus:outline-none bg-white/70 border-none backdrop-blur-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#15BFAE]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0a8.5 8.5 0 111.42-1.42L21 21z"
              />
            </svg>
          </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
}