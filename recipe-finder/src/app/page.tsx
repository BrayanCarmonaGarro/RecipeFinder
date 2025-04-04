'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>("");

  const initialMessage = "Select a category or enter a recipe name to find recipes 🍽️";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(initialMessage.slice(0, index));
      index++;

      if (index > initialMessage.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

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
    
    setHasSearched(newQuery !== "");

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

      <section className="w-full max-w-2xl rounded-xl relative">
        <div
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
        </div>

        {!selectedRecipe && recipes.length === 0 && !hasSearched && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center text-lg text-black mt-9"
          >
            {typingText}
          </motion.p>
        )}

        {!selectedRecipe && hasSearched && recipes.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }} 
            className="text-center text-lg text-black mt-9"
          >
            Seems like we don't have that recipe. Try searching for something else!
          </motion.p>
        )}
      </section>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-7xl px-4">
          {!selectedRecipe ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <AnimatePresence mode="popLayout">
                  {recipes.map((recipe) => (
                    <motion.div
                      key={recipe.idMeal}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="recipe-card border-none"
                    >
                      <RecipeCard
                        idMeal={recipe.idMeal}
                        strMeal={recipe.strMeal}
                        strMealThumb={recipe.strMealThumb}
                        onSelect={handleSelectRecipe}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
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
      </div>
    </div>
  );
}
