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
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full bg-[#9ea974] p-6 shadow- flex justify-between items-center px-8 relative">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.freepik.com/256/12068/12068188.png?ga=GA1.1.796280612.1743271643&semt=ais_hybrid"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-[#0d0d0c] text-3xl font-extrabold">
            Recipe Finder
          </h1>
        </div>
        <p className="text-[#1f1f1e] text-lg font-medium opacity-90 italic tracking-wide">
          Discover amazing flavors!
        </p>
      </header>

      {!selectedRecipe && (
        <section
          className="w-full max-w-2xl mt-8 p-6 rounded-xl relative bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/hand-drawn-pattern-background_23-2150829939.jpg?t=st=1743266812~exp=1743270412~hmac=d7bfd10f988bcd5527428fa3840d7c00deaaa15d5021fbb5fc328926346859d3&w=900')",
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </section>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-7xl px-4">
          {!selectedRecipe ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {recipes.map((recipe) => (
                <div className="recipe-card border-none" key={recipe.idMeal}>
                  <RecipeCard
                    idMeal={recipe.idMeal}
                    strMeal={recipe.strMeal}
                    strMealThumb={recipe.strMealThumb}
                    onSelect={handleSelectRecipe}
                  />
                </div>
              ))}
            </div>
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
      </div>
    </div>
  );
}