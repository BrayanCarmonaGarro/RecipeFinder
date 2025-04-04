import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const category = req.nextUrl.searchParams.get("category");

  if (!query && !category) {
    return NextResponse.json({ error: "At least one parameter (query or category) is required" }, { status: 400 });
  }

  try {
    let apiUrl = "";

    if (query && category) {
      const categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const categoryData = await categoryResponse.json();

      const filteredMeals = categoryData.meals?.filter((meal: any) =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase())
      );

      return NextResponse.json(filteredMeals || []); 
    }

    if (query) {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    }

    if (category) {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data.meals || []); 
  } catch (error) {
    return NextResponse.json({ error: "Error fetching recipes" }, { status: 500 });
  }
}