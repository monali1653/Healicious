// RecipeCards.jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const recipes = [
  {
    name: "Sugar-Free Pancakes",
    image: "/images/sugar.webp",
  },
  {
    name: "Grilled Chicken Salad",
    image: "/images/grilled.avif",
  },
  {
    name: "Vegetable Stir Fry",
    image: "/images/Vegetable.jpg",
  },
  // Add more recipes here
];

const RecipeCards = () => {
  const diseaseName = "Diabetes-Friendly Recipes";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Disease Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{diseaseName}</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="relative h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
            />

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white flex items-center justify-between px-4 py-2">
              <span className="font-semibold">{recipe.name}</span>
              <div className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full">
                <FaArrowRight className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
