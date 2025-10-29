import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import Loader from "./Loader";
import axios from "axios";

// Known diseases
const diseases = [
  { name: "All Types" },
  { name: "Diabetes" },
  { name: "Anaemia" },
  { name: "Thyroid" },
  { name: "Obesity" },
  { name: "PCOS" },
  { name: "Heart Health" },
];

const extraDiseases = [
  { name: "Hypertension" },
  { name: "Cholesterol" },
  { name: "Liver Health" },
  { name: "Kidney Health" },
  { name: "Digestive Health" },
  { name: "Joint Pain" },
  { name: "Migraine Relief" },
  { name: "Lactose Intolerance" },
  { name: "Gluten Intolerance" },
  { name: "Arthritis" },
  { name: "Depression & Anxiety" },
  { name: "Asthma" },
  { name: "Menopause Support" },
  { name: "Pregnancy Nutrition" },
  { name: "Postpartum Recovery" },
  { name: "Immunity Boost" },
  { name: "Fatty Liver" },
  { name: "Skin Health" },
  { name: "Bone Strength" },
  { name: "Eye Health" },
  { name: "Sleep Improvement" },
  { name: "Allergy-Friendly" },
  { name: "Cancer Recovery" },
  { name: "Detox & Cleanse" },
];

const RecipeCards = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [totalLikes, setTotalLikes] = useState({});

  // Combine both arrays for validation
  const allDiseases = [...diseases, ...extraDiseases];
  const knownDiseaseNames = allDiseases.map((d) => d.name.toLowerCase());
  const isKnownDisease = category
    ? knownDiseaseNames.includes(category.toLowerCase())
    : false;

  // ✅ Fetch recipes
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

  // ✅ Fetch user's liked recipes
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

  // ✅ Fetch like count for a recipe
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

  // ✅ View recipe
  const handleView = (recipe) => {
    navigate(`/disease/${recipe.disease}/${recipe.recipeName}`);
  };

  // ✅ Like/Unlike recipe
  const handleToggleLike = async (recipeId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/like/toggle-like",
        { recipeId },
        { withCredentials: true }
      );
      await fetchRecipeLikes(recipeId);

      setLikedRecipes((prevLiked) =>
        prevLiked.includes(recipeId)
          ? prevLiked.filter((id) => id !== recipeId)
          : [...prevLiked, recipeId]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // ✅ Navigate to Ask AI
  const handleAskAI = () => {
    navigate(`/ask-ai?query=${encodeURIComponent(category)}`);
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <div className="px-6 py-24 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center capitalize">
        {category ? `${category} Recipes` : "Recipes"}
      </h2>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-gray-500 text-lg">
            No recipes found for this disease.
          </p>
          <button
            onClick={handleAskAI}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            <MessageSquare size={20} />
            Ask AI about "{category}"
          </button>
        </div>
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
                      <ThumbsUp
                        size={22}
                        className={`${
                          isLiked
                            ? "fill-blue-500 text-blue-500"
                            : "text-blue-500"
                        }`}
                      />
                    </button>
                    <span className="font-medium">
                      {totalLikes[recipe._id] ?? 0}
                    </span>
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

      {/* Persistent Ask AI CTA */}
      {!loading && recipes.length > 0 && (
        <div className="fixed left-0 right-0 bottom-6 flex justify-center pointer-events-auto">
          <button
            onClick={handleAskAI}
            className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            <MessageSquare size={18} />
            Ask AI for a custom recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
