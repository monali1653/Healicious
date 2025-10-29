import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import Loader from "./Loader";
import axios from "axios";

const RecipeCards = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [totalLikes, setTotalLikes] = useState({});

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

      // Fetch likes for each recipe
      recipeData.forEach((r) => fetchRecipeLikes(r._id));
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

  // ✅ Toggle Like Handler
  const handleToggleLike = async (recipeId) => {
  try {
    await axios.post(
      "http://localhost:8000/api/v1/like/toggle-like",
      { recipeId },
      { withCredentials: true }
    );

    // Refresh the like count for this recipe
    await fetchRecipeLikes(recipeId);

    // Toggle liked/unliked state
    setLikedRecipes((prevLiked) =>
      prevLiked.includes(recipeId)
        ? prevLiked.filter((id) => id !== recipeId)
        : [...prevLiked, recipeId]
    );
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};



  useEffect(() => {
  const fetchUserLikes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/like/user-likes",
        { withCredentials: true }
      );
      setLikedRecipes(res.data.data || []);
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
    }
  };

  fetchUserLikes();
}, []);

const fetchRecipeLikes = async (recipeId) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/like/get/${recipeId}`,
      { withCredentials: true }
    );
    const count = res.data.data;

    setTotalLikes((prev) => ({
      ...prev,
      [recipeId]: count,
    }));
  } catch (error) {
    console.error("Error fetching recipe likes:", error);
  }
};

  if (loading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );


  return (
    <div className="px-6 py-24 bg-yellow-50 min-h-screen">
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No recipes found for this disease.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 mt-20">
          {recipes.map((recipe) => {
            const isLiked = likedRecipes.includes(recipe._id);
            return (
              <div
                key={recipe._id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
              >
                {/* Recipe Image */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                  <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
                  />
                </div>

                {/* Recipe Title */}
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-4">
                  {recipe.recipeName}
                </h3>
                <div className="text-sm text-gray-500 mt-4 mb-4">
                  {recipe.description}
                </div>
                {/* Recipe Info */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center text-gray-700">
                    <Clock size={22} className="text-yellow-500 mb-1" />
                    <div className="flex gap-2">
                      <p className="text-sm">Total Time</p>
                      <p className="font-semibold text-gray-900">
                        {recipe.expectedTime} min
                      </p>
                    </div>
                  </div>
                  {/* ❤️ Like Button & Count */}
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <button
                      onClick={() => handleToggleLike(recipe._id)}
                      className="transition-transform transform hover:scale-110"
                    >
                      <ThumbsUp size={22} className={`${
                          isLiked ? "fill-blue-500 text-blue-500" : "text-blue-500"
                        }`}/>
                    </button>
                    <span className="font-medium">{totalLikes[recipe._id] ?? 0}</span>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => handleView(recipe)}
                    className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
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