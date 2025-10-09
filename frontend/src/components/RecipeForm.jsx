import React, { useState } from "react";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [nutrition, setNutrition] = useState({
    vitamins: 0,
    carbs: 0,
    proteins: 0,
    minerals: 0,
  });

  // Handle ingredient change
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Add new ingredient field on Enter
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && ingredients[index].trim() !== "") {
      e.preventDefault();
      setIngredients([...ingredients, ""]);
    }
  };

  // Handle nutrition change
  const handleNutritionChange = (name, value) => {
    setNutrition({ ...nutrition, [name]: value });
  };

  return (
    <div className="min-h-screen bg-purple-100/50 flex items-center justify-center p-6">
      <div className="relative bg-white rounded-[3rem] shadow-lg w-full max-w-7xl py-8 px-24 backdrop-blur-md border-4 border-purple-400 ">

        {/* Clipart placeholders */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center">
          <img src="/images/cap.png" />
        </div>
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full flex items-center justify-center">
          <img src="/images/veggie.png" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-900">
          Add Your Own Recipe
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Form */}
          <div className="flex-1">
            <form className="space-y-8">
              {/* Recipe Name */}
              <div>
                <label className="block text-purple-900 font-semibold mb-1">
                  Recipe Name
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent p-2"
                  placeholder="Enter recipe name"
                />
              </div>

              {/* Disease Dropdown */}
              <div>
                <label className="block text-purple-900 font-semibold mb-1">
                  Disease
                </label>
                <select className="w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent p-2">
                  <option value="">Select Disease</option>
                  <option value="bp">BP</option>
                  <option value="anaemia">Anaemia</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="obesity">Obesity</option>
                  <option value="heart">Heart</option>
                  <option value="kidney">Kidney Disease</option>
                </select>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-purple-900 font-semibold mb-1">
                  Ingredients
                </label>
                {ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent p-2 mb-2"
                    placeholder={`Ingredient ${index + 1}`}
                  />
                ))}
                <p className="text-sm text-gray-600">
                  Press Enter after typing to add more ingredients
                </p>
              </div>

              {/* Method */}
              <div>
                <label className="block text-purple-900 font-semibold mb-1">
                  Method
                </label>
                <textarea
                  className="w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent p-2"
                  rows="3"
                  placeholder="Enter preparation method"
                />
              </div>

              {/* Nutritional Content with Sliders */}
              {/* <div>
                <label className="block text-purple-900 font-semibold mb-4">
                  Nutritional Content (%)
                </label>
                {Object.keys(nutrition).map((key) => (
                  <div key={key} className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-purple-900">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span>{nutrition[key]}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={nutrition[key]}
                      onChange={(e) =>
                        handleNutritionChange(key, parseInt(e.target.value))
                      }
                      className="w-full accent-purple-600"
                    />
                  </div>
                ))}
              </div> */}

              {/* Image Upload */}
              <div>
                <label className="block text-purple-900 font-semibold mb-1">
                  Upload Dish Image
                </label>
                <input
                  type="file"
                  className="w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent p-2"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Submit Recipe
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/images/dish.png" alt="Dish Preview" className="rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
