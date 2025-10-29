import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import { Clock, Eye, Heart } from "lucide-react";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [loadingMyRecipes, setLoadingMyRecipes] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/myprofile",
          { withCredentials: true }
        );
        setUser(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        setError(err.response?.data?.message || "Failed to load profile.");
      }
    };
    fetchUser();
  }, []);

  // ✅ Fetch wishlist recipes
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/wishlist",
          { withCredentials: true }
        );
        setWishlist(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoadingWishlist(false);
      }
    };
    fetchWishlist();
  }, []);

  // ✅ Fetch recipes posted by user
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/recipes/posted-by-user",
          { withCredentials: true }
        );
        setMyRecipes(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching my recipes:", err);
      } finally {
        setLoadingMyRecipes(false);
      }
    };
    fetchMyRecipes();
  }, []);

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

      setWishlist((prev) =>
        prev.map((r) =>
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

      setLikedRecipes((prev) =>
        prev.includes(recipeId)
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-medium">{error}</div>
    );

  if (!user)
    return (
      <div className="p-6">
        <Loader />
      </div>
    );

  const avatarName = user.avatar
    ? user.avatar.split("/").pop().replace(/\.(jpg|jpeg|png)$/, "")
    : "default";

  // ✅ Reusable Card Component (UI same as RecipeCards)
  const RecipeCard = ({ recipe }) => {
    const isLiked = likedRecipes.includes(recipe._id);
    return (
      <div
        key={recipe._id}
        className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
      >
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <img
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-6">
          {recipe.recipeName}
        </h3>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center text-gray-700">
            <Clock size={22} className="text-yellow-500 mb-1" />
            <p className="text-sm">Total Time</p>
            <p className="font-semibold text-gray-900">
              {recipe.expectedTime} min
            </p>
          </div>

          <div className="w-10 h-px bg-gray-300"></div>

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
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 pt-28">
      <div className="w-full max-w-5xl">
        {/* ✅ Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={`/images/${avatarName}.jpg`}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
          <h2 className="font-gothic text-2xl font-semibold">
            {user.fullName}
          </h2>
        </div>

        {/* ✅ Profile Info */}
        <div className="mb-10 space-y-1">
          <p className="font-parastoo text-lg flex items-center">
            <FaUser className="text-black mr-2" />
            {user.username || user.fullName}
          </p>
          <p className="font-parastoo text-lg flex items-center">
            <FaEnvelope className="text-black mr-2" />
            {user.email}
          </p>
          <p className="font-parastoo text-lg flex items-center">
            <FaPhone className="text-black mr-2" />
            {user.phoneNo}
          </p>
        </div>

        {/* ✅ Wishlist Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            My Wishlist
          </h2>
          {loadingWishlist ? (
            <p className="text-center text-gray-500">Loading wishlist...</p>
          ) : wishlist.length === 0 ? (
            <p className="text-center text-gray-500">
              No recipes in your wishlist yet.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-10">
              {wishlist.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        {/* ✅ My Recipes Section */}
        <section className="mt-16 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
            Recipes Posted by Me
          </h2>
          {loadingMyRecipes ? (
            <p className="text-center text-gray-500">Loading your recipes...</p>
          ) : myRecipes.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven't posted any recipes yet.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-10 mt-6 pt-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
