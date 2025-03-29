interface RecipeCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  onSelect: (idMeal: string) => void;
}

export default function RecipeCard({
  idMeal,
  strMeal,
  strMealThumb,
  onSelect,
}: RecipeCardProps) {
  return (
    <div
      className="p-4 rounded mb-4 max-w-md mx-auto bg-white shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
      onClick={() => onSelect(idMeal)}>
      <h2 className="text-lg font-bold mb-2">{strMeal}</h2>
      <img
        src={strMealThumb}
        alt={strMeal}
        className="w-full h-auto rounded mb-2"
      />
    </div>
  );
}