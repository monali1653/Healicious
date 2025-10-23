import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye } from "lucide-react";

const RecipeCards = () => {
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: "Savoy Cabbage",
      time: "7 min",
      img: "/images/sav.jpg",
    },
    {
      id: 2,
      name: "Garden Onion",
      time: "10 min",
      img: "/images/gard.jpg",
    },
    {
      id: 3,
      name: "Cashew Nut",
      time: "8 min",
      img: "/images/cash.jpg",
    },
    {
      id: 4,
      name: "Wild Celery",
      time: "6 min",
      img: "/images/wild.webp",
    },
  ];

  const handleView = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="px-6 py-24 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
        Diabetes Recipes
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
          >
            {/* Floating Image */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
              <img
                src={recipe.img}
                alt={recipe.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
              />
            </div>

            {/* Recipe Name */}
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-6">
              {recipe.name}
            </h3>

            {/* Time + View Now Section */}
            <div className="flex flex-col items-center gap-4">
              {/* Time Section */}
              <div className="flex flex-col items-center text-gray-700">
                <Clock size={22} className="text-yellow-500 mb-1" />
                <p className="text-sm">total time</p>
                <p className="font-semibold text-gray-900">{recipe.time}</p>
              </div>

              {/* Divider */}
              <div className="w-10 h-px bg-gray-300"></div>

              {/* View Now Button */}
              <button
                onClick={() => handleView(recipe.id)}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
              >
                <Eye size={18} />
                View Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
