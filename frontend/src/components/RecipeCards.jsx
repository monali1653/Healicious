import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Eye, Heart } from "lucide-react";
import axios from "axios";

const RecipeCards = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/v1/recipes/get-recipes/${category}`,
          { withCredentials: true }
        );

        const recipeData = res.data?.data || [];
        setRecipes(recipeData);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchRecipes();
  }, [category]);

  const handleView = (recipe) => {
    navigate(`/disease/${recipe.disease}/${recipe.recipeName}`);
  };

  const handleToggleLike = async (recipeId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/like/toggle-like",
        { recipeId },
        { withCredentials: true }
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((r) =>
          r._id === recipeId
            ? {
                ...r,
                totalLikes: likedRecipes.includes(recipeId)
                  ? r.totalLikes - 1
                  : r.totalLikes + 1,
              }
            : r
        )
      );

      setLikedRecipes((prevLiked) =>
        prevLiked.includes(recipeId)
          ? prevLiked.filter((id) => id !== recipeId)
          : [...prevLiked, recipeId]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-20 bg-yellow-50 min-h-screen">
      {/* ✅ Heading unchanged */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-14 text-center">
        Diabetes Recipes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No recipes found for this category.
        </p>
      ) : (
        <div
          className="
            mt-6
            grid 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
            justify-items-center
          "
        >
          {recipes.map((recipe) => {
            const isLiked = likedRecipes.includes(recipe._id);

            return (
              <div
                key={recipe._id}
                className="
                  relative bg-white 
                  rounded-2xl shadow-md 
                  hover:shadow-xl transition-all duration-300 
                  w-full max-w-xs 
                  pt-16 pb-8 px-4 text-center
                  flex flex-col items-center
                "
              >
                {/* Recipe Image */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                  <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="
                      w-24 h-24 sm:w-28 sm:h-28 
                      rounded-full object-cover 
                      border-4 border-yellow-300 shadow-lg
                    "
                  />
                </div>

                {/* Recipe Title */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-8 mb-4">
                  {recipe.recipeName}
                </h3>

                {/* Recipe Info */}
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="flex flex-col items-center text-gray-700">
                    <Clock size={22} className="text-yellow-500 mb-1" />
                    <p className="text-sm">Total Time</p>
                    <p className="font-semibold text-gray-900">
                      {recipe.expectedTime} min
                    </p>
                  </div>

                  <div className="w-10 h-px bg-gray-300"></div>

                  {/* ❤️ Like Button & Count */}
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <button
                      onClick={() => handleToggleLike(recipe._id)}
                      className="transition-transform transform hover:scale-110"
                    >
                      <Heart
                        size={22}
                        className={`${
                          isLiked ? "fill-red-500 text-red-500" : "text-red-500"
                        }`}
                      />
                    </button>
                    <span className="font-medium">{recipe.totalLikes || 0}</span>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => handleView(recipe)}
                    className="
                      flex items-center justify-center gap-2 
                      bg-yellow-400 hover:bg-yellow-500 
                      text-white font-medium 
                      px-4 py-2 rounded-lg 
                      shadow-sm transition-all duration-300
                      w-full sm:w-auto
                    "
                  >
                    <Eye size={18} />
                    View Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
