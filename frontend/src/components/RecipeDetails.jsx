<<<<<<< Updated upstream
import React, { useState } from 'react';
import { FaFire, FaClock, FaHeart, FaRobot, FaPlay } from 'react-icons/fa';
=======
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaHeart, FaCommentDots } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Loader from "./Loader.jsx";
>>>>>>> Stashed changes

const RecipeDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentsRef = useRef(null);

<<<<<<< Updated upstream
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
=======
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

  // ✅ Toggle Wishlist (Add / Remove)
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

  const handlePostComment = async () => {
    if (!newComment.trim()) return alert("Please enter a comment!");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/comment/post-comment",
        { recipeId: recipe._id, content: newComment },
        { withCredentials: true }
      );
      if (res.status === 201) {
        setComments((prev) => [res.data.data, ...prev]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) return <p className="text-center mt-10"><Loader/></p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;
>>>>>>> Stashed changes

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto space-y-10">
      {/* === Top Section === */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <img
<<<<<<< Updated upstream
          src="/images/Banana.jpg"
          alt="Fluffy Banana Oat Pancakes"
=======
          src={recipe.recipeImage}
          alt={recipe.recipeName}
>>>>>>> Stashed changes
          className="w-full lg:w-1/3 h-64 object-cover rounded-lg shadow-md"
        />

        <div className="flex-1 space-y-4">
<<<<<<< Updated upstream
          <h2 className="text-2xl font-bold text-gray-800">
            Fluffy Banana Oat Pancakes with Cinnamon & Fresh Berries
          </h2>
          <div className="flex items-center text-yellow-500 text-lg">
            ★ 4.8
            <span className="text-gray-600 ml-2 text-sm">(54 ratings)</span>
          </div>
=======
          <h2 className="text-2xl font-bold text-gray-800">{recipe.recipeName}</h2>
          <p className="text-gray-600">{recipe.description}</p>
>>>>>>> Stashed changes

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
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

            <button
              onClick={() =>
                commentsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <FaCommentDots /> Comment
            </button>
          </div>

<<<<<<< Updated upstream
          {/* Time & Calories */}
=======
>>>>>>> Stashed changes
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow text-sm text-gray-700">
              <FaClock className="text-yellow-500" />
              <div>
<<<<<<< Updated upstream
                <div className="font-semibold text-black text-base">30 mins</div>
=======
                <div className="font-semibold text-black text-base">
                  {recipe.expectedTime || "N/A"} mins
                </div>
>>>>>>> Stashed changes
                Cook Time
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow text-sm text-gray-700">
              <FaFire className="text-yellow-500" />
              <div>
                <div className="font-semibold text-black text-base">1253 kcal</div>
                Calories
              </div>
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Instructions + Ingredients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cooking Instructions - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Cooking Instructions</h3>

          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Step 1:</strong> In a small bowl, combine the milk and apple cider vinegar then set aside for a few minutes.
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Step 2:</strong> In a blender, add the wet ingredients (milk, eggs, bananas, and vanilla) closest to the blade then layer the dry ingredients (oats, baking soda, salt and cinnamon) on top. *(see notes for tips depending on the blender you're using)* Blend until smooth. Allow the batter to sit for about 5 minutes while you warm a skillet over low heat. This allows the batter to thicken some for fluffier pancakes.
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Step 3:</strong> Lightly grease the skillet (if necessary) and pour about 1/4 cup of the batter for each pancake. Cook for 2-3 minutes, or until bubbles form and the edges appear firm. Flip it on the opposite side and continue to cook for another 2 minutes. Repeat this step until all of the batter is gone.
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <strong>Step 4:</strong> Serve warm with desired toppings and pure maple syrup, and enjoy!
          </div>
        </div>

        {/* Ingredients - Right Side */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
          {[
            '2 ripe bananas',
            '1 cup rolled oats',
            '1 egg',
            '1/2 cup milk',
            '1 tsp baking powder',
            '1/2 tsp cinnamon',
            'Pinch of salt',
            'Butter or oil for pan',
            'Fresh berries (optional)',
          ].map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Comments - Full Width Below */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Comments</h3>

        <div className="bg-white p-4 rounded-lg shadow text-gray-800">
          <p className="font-semibold">foodie_girl123:</p>
          <p>These pancakes were so fluffy and delicious! My kids loved them.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-gray-800">
          <p className="font-semibold">banana_lover:</p>
          <p>Perfect way to use overripe bananas. Easy and quick breakfast!</p>
=======
      {/* === Comments Section === */}
      <div ref={commentsRef} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>

        {comments.length ? (
          comments.map((cmt) => (
            <div key={cmt._id} className="flex gap-3 p-3">
              <Avatar src={cmt.user?.avatar} sx={{ width: 32, height: 32 }} />
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
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
