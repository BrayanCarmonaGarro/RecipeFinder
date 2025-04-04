'use client'
import React, { useState } from "react";

interface SearchBarProps {
    query: string;
    onSearch: (query: string, category: string) => void;
    categories: string[];
    selectedCategory: string; 
}

export default function SearchBar({ query, onSearch, categories, selectedCategory }: SearchBarProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value, selectedCategory); 
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSearch(query, e.target.value); 
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center space-x-2">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-3 rounded-full text-lg shadow-md focus:outline-none bg-white/70 border-none backdrop-blur-sm hover:bg-white"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={query}
                    onChange={handleInputChange}
                    className="p-3 pl-10 rounded-full w-full text-lg shadow-md focus:outline-none bg-white/70 border-none backdrop-blur-sm hover:bg-white"
                />
            </div>
            <svg
                className="absolute left-45 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#15BFAE]"
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
    );
}