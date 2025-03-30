
"use client";
import React, { useState, useTransition, useCallback } from "react";
import { Recipe } from "../page";

interface RecipeFetcherProps {
  render: (recipes: Recipe[], isPending: boolean, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void) => React.ReactNode;
}

const RecipeFetcher: React.FC<RecipeFetcherProps> = ({ render }) => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRecipes = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`/api/recipes?query=${searchQuery}`);
      const data: Recipe[] = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      fetchRecipes(value);
    });
  };

  return <>{render(recipes, isPending, handleSearch)}</>;
};

export default RecipeFetcher;
