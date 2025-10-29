import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaHeart, FaCommentDots, FaThumbsUp } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Loader from "./Loader.jsx";

const RecipeDetails = () => {
  const { category, dishName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [totalLikes, setTotalLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const commentsRef = useRef(null);

  // ✅ Fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/v1/recipes/get-recipes/${category}`,
          { withCredentials: true }
        );

        const recipes = res.data.data || res.data;
        const selected = recipes.find(
          (r) =>
            r.recipeName.toLowerCase() ===
            decodeURIComponent(dishName).toLowerCase()
        );

        setRecipe(selected ? { ...selected, _id: selected._id || selected.id } : null);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [category, dishName]);

  // ✅ Fetch total likes
  useEffect(() => {
    if (!recipe?._id) return;
    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/like/get/${recipe._id}`,
          { withCredentials: true }
        );
        setTotalLikes(res.data.data || 0);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };
    fetchLikes();
  }, [recipe]);

  const handleFavoriteClick = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/toggle-wishlist",
      { recipeId: recipe._id },
      { withCredentials: true }
    );

    const message = res.data.message

    if (message.includes("Added")) {
      setIsFavorite(true);
    } else if (message.includes("Removed")) {
      setIsFavorite(false);
    }
  } catch (err) {
    console.error("Error toggling wishlist:", err);
    alert("Failed to toggle wishlist");
  }
};


  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!recipe?._id) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/comment/get-comment/${recipe._id}`,
          { withCredentials: true }
        );
        setComments(res.data.data?.comments || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [recipe]);

  // ✅ Check if the recipe is already in wishlist
useEffect(() => {
  const checkFavoriteStatus = async () => {
    if (!recipe?._id) return;
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/wishlist",
        { withCredentials: true }
      );

      const wishlist = res.data.data || [];
      const isFav = wishlist.some((item) => item._id === recipe._id);
      setIsFavorite(isFav);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  checkFavoriteStatus();
}, [recipe]);


  const handlePostComment = async () => {
    if (!newComment.trim()) return alert("Please enter a comment!");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/comment/post-comment",
        { recipeId: recipe._id, content: newComment },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const updated = await axios.get(
          `http://localhost:8000/api/v1/comment/get-comment/${recipe._id}`,
          { withCredentials: true }
        );
        setComments(updated.data.data.comments || []);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto space-y-10">
      {/* === Top Section === */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-full lg:w-1/3 h-64 object-cover rounded-lg shadow-md"
        />

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.recipeName}</h2>
          <p className="text-gray-600">{recipe.description}</p>
          
          {/* === Buttons === */}
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="mt-2 flex gap-2">
              <FaThumbsUp className="mt-1 text-amber-300"/>
              {totalLikes} {totalLikes === 1 ? "Like" : "Likes"}
            </div>
              

            <button
              onClick={() =>
                commentsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <FaCommentDots /> Comment
            </button>
          </div>

          <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? "bg-gray-400 hover:bg-red-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              {!isFavorite && <FaHeart />}
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow text-sm text-gray-700">
              <FaClock className="text-yellow-500" />
              <div>
                <div className="font-semibold text-black text-base">
                  {recipe.expectedTime || "N/A"} mins
                </div>
                Cook Time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === ✅ Ingredients Section === */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
        {recipe.ingradients?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recipe.ingradients.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-3 text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No ingredients listed.</p>
        )}
      </div>

      {/* === ✅ Steps Section === */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Steps</h3>
        {recipe.steps?.length > 0 ? (
          <div className="space-y-3">
            {recipe.steps.map((step, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 text-gray-700"
              >
                <span className="font-semibold text-yellow-600">Step {index + 1}:</span> {step}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No steps listed.</p>
        )}
      </div>

      {/* === ✅ Comments Section === */}
      <div ref={commentsRef} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>

        {comments.length ? (
          comments.map((cmt) => (
            <div key={cmt._id} className="flex gap-3 p-3">
              <Avatar src={cmt.user?.avatar} sx={{ width: 32, height: 32 }} className="mt-2"/>
              <div>
                <p className="font-semibold text-gray-800">
                  {cmt.user?.fullName || "Anonymous"}
                </p>
                <p className="text-gray-700 text-sm">{cmt.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        <div className="flex gap-3 mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handlePostComment}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
