'use client';
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

interface Category {
  strCategory: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Estado para la categoría seleccionada
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        const categoryNames = data.categories.map((cat: Category) => cat.strCategory);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (newQuery: string, category: string) => {
    setQuery(newQuery);
    setSelectedCategory(category); 
    const params = new URLSearchParams();
    if (newQuery) params.append("query", newQuery);
    if (category) params.append("category", category);

    try {
      const response = await fetch(`/api/recipes?${params.toString()}`);
      const data = await response.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const handleSelectRecipe = async (idMeal: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        console.error("Recipe details not found");
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      {!selectedRecipe && (
        <section
          className="w-full max-w-2xl mt-8 p-6 rounded-xl relative bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/hand-drawn-pattern-background_23-2150829939.jpg?t=st=1743266812~exp=1743270412~hmac=d7bfd10f988bcd5527428fa3840d7c00deaaa15d5021fbb5fc328926346859d3&w=900')",
          }}
        >
          <SearchBar
            query={query}
            onSearch={handleSearch}
            categories={categories}
            selectedCategory={selectedCategory} 
          />
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