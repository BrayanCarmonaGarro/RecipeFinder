import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const type = req.nextUrl.searchParams.get("type");

  if (!query || !type) {
    return NextResponse.json(
      { error: "Both 'query' and 'type' parameters are required" },
      { status: 400 }
    );
  }

  let apiUrl = "";

  // Construir la URL de la API según el tipo de búsqueda
  switch (type) {
    case "name":
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      break;
    case "category":
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
      break;
    case "detail":
      apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`;
      break;
    default:
      return NextResponse.json(
        { error: "Invalid 'type' parameter. Must be 'name', 'category', or 'detail'." },
        { status: 400 }
      );
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Manejar casos donde no se encuentren resultados
    if (!data.meals) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data.meals.length === 1 ? data.meals[0] : data.meals);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Error fetching recipes" },
      { status: 500 }
    );
  }
}