"use client";

import { useState, useTransition, useCallback } from "react";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import SearchBar from "./components/SearchBar";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = useCallback(async (query: string, type: string) => {
    if (!query) return;
    try {
      const endpoint = `/api/recipes?query=${query}&type=${type}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const fetchRecipeDetails = useCallback(async (idMeal: string) => {
    try {
      const endpoint = `/api/recipes?query=${idMeal}&type=detail`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }, []);

  const handleSearch = (query: string, type: string) => {
    startTransition(() => {
      fetchRecipes(query, type);
    });
  };

  const handleSelectRecipe = (idMeal: string) => {
    fetchRecipeDetails(idMeal);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>
      {!selectedRecipe ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <ul className="mt-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  idMeal={recipe.idMeal}
                  strMeal={recipe.strMeal}
                  strMealThumb={recipe.strMealThumb}
                  onSelect={handleSelectRecipe}
                />
              ))
            ) : (
              <p className="text-gray-500">No recipes found. Try a different search.</p>
            )}
          </ul>
        </>
      ) : (
        <RecipeDetail
          strMeal={selectedRecipe.strMeal}
          strCategory={selectedRecipe.strCategory}
          strArea={selectedRecipe.strArea}
          strInstructions={selectedRecipe.strInstructions}
          strMealThumb={selectedRecipe.strMealThumb}
          strYoutube={selectedRecipe.strYoutube}
          onBack={handleBack}
        />
      )}
    </div>
  );
}