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
      className="border p-4 rounded mb-4 max-w-md mx-auto bg-white shadow-md cursor-pointer"
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