import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const RecipeDetails = () => {
  const [liked, setLiked] = useState(false);
  const [rating] = useState(4.3);

  const toggleLike = () => setLiked(!liked);

  const ingredients = [
   "1. 1 cup rolled oats",
    "2. 1 tablespoon olive oil (or any vegetable oil)",
    "3. ½ teaspoon mustard seeds",
    "4. 1 teaspoon urad dal (optional)",
    "5. 1 small onion, finely chopped",
    "6. 1 small carrot, finely chopped",
    "7. ¼ cup green peas",
    "8. 1 small tomato, chopped",
    "9. 1 green chili, slit",
    "10. ½ teaspoon grated ginger",
    "11. 1½ cups hot water",
    "12. Salt to taste",
    "13. Fresh coriander leaves for garnish",
    "14. Lemon juice (optional)"
  ];

  const steps = [
   "Dry roast the oats in a pan for 2–3 minutes until slightly golden. Remove and keep aside.",
    "In the same pan, heat oil and add mustard seeds. Let them splutter.",
    "Add urad dal, ginger, and green chili. Sauté for 30 seconds.",
    "Add chopped onions, carrots, peas, and tomato. Sauté until veggies turn soft.",
    "Pour in hot water and add salt.",
    "Slowly add the roasted oats while stirring continuously to avoid lumps.",
    "Cover and cook for 3–4 minutes on low flame until water is absorbed.",
    "Garnish with coriander leaves and lemon juice before serving.",
  ];

  const comments = [
    { user: "user12", text: "Perfect for my morning routine!" },
    { user: "chef22", text: "Easy to make and delicious." },
    { user: "cook44", text: "Loved it, especially the texture!" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
      {/* LEFT SECTION (Static) */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center bg-gray-100">
        {/* Image */}
        <img
          src="/images/OatsUpma.jpg"
          alt="Recipe"
          className="w-full h-full object-cover"
        />

        {/* Heart Button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 text-xl md:text-2xl transition"
        >
          <FaHeart
            className={`${
              liked ? "text-pink-500" : "text-gray-300"
            } hover:scale-110 transition-transform duration-200`}
          />
        </button>

        {/* Disease Tag */}
        <div
          className="absolute bottom-6 left-0 bg-orange-500 text-white px-6 py-2 text-lg font-semibold"
          style={{
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
          }}
        >
          For Diabetes
        </div>
      </div>

      {/* RIGHT SECTION (Scrollable) */}
      <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-12">
        {/* Recipe Name */}
        <h2 className="text-3xl font-bold text-black mb-6">Oats and Vegetable Upma</h2>

        {/* Ingredients */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-black mb-3">Ingredients</h3>
          <ul className="list-none text-black space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-black mb-3">Steps</h3>
          <ol className="list-decimal list-inside text-black space-y-1">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Ratings */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-black mb-3">Ratings</h3>
          <div className="flex items-center gap-2 text-yellow-400 text-3xl">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Average Rating: {rating.toFixed(1)} / 5
          </p>
        </div>

        {/* Comments */}
        <div className="pb-12">
          <h3 className="text-2xl font-semibold text-black mb-4">Comments</h3>
          {comments.map((c, i) => (
            <div key={i} className="mb-4">
              <p className="text-sm font-semibold text-gray-700">@{c.user}</p>
              <p className="text-gray-800">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
