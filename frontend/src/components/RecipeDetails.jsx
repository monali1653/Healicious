import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFire, FaClock, FaHeart, FaRobot, FaPlay } from 'react-icons/fa';
import axios from 'axios';

const RecipeDetails = () => {
  const { category, dishName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recipes/${category}/${dishName}`
        );
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [category, dishName]);

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  const handleFavoriteClick = () => setIsFavorite(!isFavorite);

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto space-y-10">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Image */}
        <img
          src={recipe.img}
          alt={recipe.name}
          className="w-full lg:w-1/3 h-64 object-cover rounded-lg shadow-md"
        />

        {/* Heading and Buttons */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
          <div className="flex items-center text-yellow-500 text-lg">
            ★ 4.8
            <span className="text-gray-600 ml-2 text-sm">(54 ratings)</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium">
              <FaPlay /> Start Cooking
            </button>
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium">
              <FaRobot /> Ask AI
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              <FaHeart /> {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
            </button>
          </div>

          {/* Time */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow text-sm text-gray-700">
              <FaClock className="text-yellow-500" />
              <div>
                <div className="font-semibold text-black text-base">{recipe.cookTime}</div>
                Cook Time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions + Ingredients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cooking Instructions - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Cooking Instructions</h3>
          {recipe.steps.map((step, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <strong>Step {index + 1}:</strong> {step}
            </div>
          ))}
        </div>

        {/* Ingredients - Right Side */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
          {recipe.ingredients.map((ing, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow text-gray-700">
              {ing.name} - {ing.quantity}
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
        {/* Placeholder: Users can add their comments here */}
        <div className="bg-white p-4 rounded-lg shadow text-gray-800">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
