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
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-60"
        />
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