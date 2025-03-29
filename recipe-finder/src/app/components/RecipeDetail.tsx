interface RecipeDetailProps {
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube?: string;
    onBack: () => void;
  }
  
  export default function RecipeDetail({
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    onBack,
  }: RecipeDetailProps) {
    return (
      <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold mb-4">{strMeal}</h2>
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-auto rounded mb-4"
        />
        <p>
          <strong>Category:</strong> {strCategory}
        </p>
        <p>
          <strong>Area:</strong> {strArea}
        </p>
        <p className="mt-4">
          <strong>Instructions:</strong> {strInstructions}
        </p>
        {strYoutube && (
          <p className="mt-4">
            <strong>Video:</strong>{" "}
            <a
              href={strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch on YouTube
            </a>
          </p>
        )}
      </div>
    );
  }