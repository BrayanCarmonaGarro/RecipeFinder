import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");

  useEffect(() => {
    if (query.trim()) {
      const delayDebounce = setTimeout(() => {
        onSearch(query, searchType);
      }, 500); // Espera 500ms antes de ejecutar la búsqueda

      return () => clearTimeout(delayDebounce); // Limpia el temporizador si el usuario sigue escribiendo
    }
  }, [query, searchType, onSearch]);

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
      </div>
    </div>
  );
}