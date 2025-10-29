import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import api from "../api/axiosInstance.js";
import Loader from "../components/Loader.jsx";
import { Clock, Eye } from "lucide-react";
import Avatar from "@mui/material/Avatar";

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
        const res = await api.get("/api/v1/users/myprofile");
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
        const res = await api.get("/api/v1/users/wishlist");
        setWishlist(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoadingWishlist(false);
      }
    };
    fetchWishlist();
  }, []);

  // ✅ Fetch recipes posted by user (kept same logic)
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get("/api/v1/recipes/posted-by-user");
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

  // ✅ Wishlist Recipe Card (unchanged)
  const RecipeCard = ({ recipe }) => (
    <div
      key={recipe._id}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[15rem] sm:max-w-[16rem] md:max-w-[18rem] pt-14 pb-6 px-3 text-center flex flex-col items-center"
    >
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
        />
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-6 mb-4">
        {recipe.recipeName}
      </h3>

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center text-gray-700">
          <Clock size={20} className="text-yellow-500 mb-1" />
          <div className="flex gap-2">
            <p className="text-xs sm:text-sm">Total Time</p>
            <p className="font-semibold text-gray-900 text-sm">
              {recipe.expectedTime} min
            </p>
          </div>
        </div>

        <button
          onClick={() => handleView(recipe)}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-3 py-1.5 rounded-lg text-sm shadow-sm transition-all duration-300 w-full sm:w-auto"
        >
          <Eye size={16} />
          View Now
        </button>
      </div>
    </div>
  );

  // ✅ New “My Recipes” Card UI (like your SoldItems example)
  const MyRecipeCard = ({ recipe }) => (
    <div
      key={recipe._id}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Left section */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-2/3">
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
        />
        <div>
          <h2 className="font-parastoo font-medium text-lg sm:text-xl text-gray-800">
            {recipe.recipeName}
          </h2>
          <p className="font-parastoo text-sm sm:text-base text-gray-600 mt-1">
            Disease: <span className="capitalize">{recipe.disease}</span>
          </p>
          <p className="font-parastoo text-sm sm:text-base mt-1 font-medium text-gray-700 flex items-center gap-1">
            <Clock size={16} className="text-yellow-500" />{" "}
            {recipe.expectedTime} min
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="mt-4 sm:mt-0 text-sm text-right">
        <p className="font-gothic text-gray-600">
          Posted on{" "}
          {new Date(recipe.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="font-parastoo text-base text-gray-600 mt-1">
          Status:{" "}
          <span
            className={`font-semibold ${
              recipe.status === "approved"
                ? "text-green-600"
                : recipe.status === "pending"
                ? "text-yellow-600"
                : recipe.status === "rejected"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {recipe.status}
          </span>
        </p>
        {recipe.status === "rejected" && recipe.rejectionReason && (
          <p className="font-parastoo text-sm text-red-600 mt-1">
            Reason: {recipe.rejectionReason}
          </p>
        )}
        <button
          onClick={() => handleView(recipe)}
          className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm"
        >
          View Recipe
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center px-4 py-10 pt-28">
      <div className="w-full max-w-6xl">
        {/* ✅ Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar
              src={user.avatar}
              sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}
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

        {/* ✅ Wishlist Section (unchanged) */}
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
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {wishlist.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        {/* ✅ My Recipes Section (new UI) */}
        <section className="mt-16 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
            Recipes Posted by Me
          </h2>
          {loadingMyRecipes ? (
            <div className="text-center text-gray-500">
              <Loader />
            </div>
          ) : myRecipes.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven't posted any recipes yet.
            </p>
          ) : (
            <div className="space-y-4">
              {myRecipes.map((recipe) => (
                <MyRecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
