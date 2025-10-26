import React, { useState } from "react";

const RecipeForm = () => {
  const [step, setStep] = useState(1);

  const [recipe, setRecipe] = useState({
    name: "",
    disease: "",
    cookTime: "",
    ingredients: [{ name: "", quantity: "" }],
    steps: [""],
    image: null,
  });

  const diseases = [
    "Diabetes",
    "Anaemia",
    "Thyroid",
    "Obesity",
    "PCOS",
    "Heart Health",
    "Hypertension",
    "Cholesterol",
    "Liver Health",
    "Kidney Health",
    "Digestive Health",
    "Joint Pain",
    "Migraine Relief",
    "Lactose Intolerance",
    "Gluten Intolerance",
    "Arthritis",
    "Depression & Anxiety",
    "Asthma",
    "Menopause Support",
    "Pregnancy Nutrition",
    "Postpartum Recovery",
    "Immunity Boost",
    "Fatty Liver",
    "Skin Health",
    "Bone Strength",
    "Eye Health",
    "Sleep Improvement",
    "Allergy-Friendly",
    "Cancer Recovery",
    "Detox & Cleanse"
  ];

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe({ ...recipe, steps: newSteps });
  };

  const addStep = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
  };

  const removeStep = (index) => {
    const newSteps = recipe.steps.filter((_, i) => i !== index);
    setRecipe({ ...recipe, steps: newSteps });
  };

  const handleImageUpload = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("disease", recipe.disease);
    formData.append("cookTime", recipe.cookTime);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("steps", JSON.stringify(recipe.steps));
    if (recipe.image) formData.append("image", recipe.image);

    // Example backend call:
    // await fetch("/api/recipes", { method: "POST", body: formData });

    alert("Recipe saved successfully!");
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Add Recipe
        </h2>

        {/* Progress Dots */}
        <div className="flex justify-center mb-6 space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                step >= num ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1 - Basic Info */}
        {step === 1 && (
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter recipe name"
            />

            <label className="block mb-2 text-gray-700 font-medium">
              Disease Category
            </label>
            <select
              name="disease"
              value={recipe.disease}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select category</option>
              {diseases.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="block mb-2 text-gray-700 font-medium">
              Cook Time (in mins)
            </label>
            <input
              type="number"
              name="cookTime"
              value={recipe.cookTime}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-6 focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter time in minutes"
            />

            <button
              onClick={nextStep}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2 - Ingredients */}
        {step === 2 && (
          <div>
            <label className="block mb-4 text-gray-700 font-medium">
              Ingredients
            </label>
            {recipe.ingredients.map((ing, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={ing.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="w-24 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                  placeholder="Qty"
                />
                <button
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addIngredient}
              className="text-yellow-600 font-medium mb-4"
            >
              + Add Ingredient
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Steps */}
        {step === 3 && (
          <div>
            <label className="block mb-4 text-gray-700 font-medium">
              Steps
            </label>
            {recipe.steps.map((st, index) => (
              <div key={index} className="flex items-start gap-2 mb-2">
                <textarea
                  value={st}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  onClick={() => removeStep(index)}
                  className="text-red-500 font-bold mt-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addStep}
              className="text-yellow-600 font-medium mb-4"
            >
              + Add Step
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Image Upload */}
        {step === 4 && (
          <div>
            <label className="block mb-4 text-gray-700 font-medium">
              Upload Recipe Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg p-2 mb-4"
            />

            {recipe.image && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(recipe.image)}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-lg border"
                />
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
