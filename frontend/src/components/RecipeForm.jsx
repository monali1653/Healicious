import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [recipe, setRecipe] = useState({
    recipeName: "",
    description: "",
    disease: "",
    expectedTime: "",
    ingradients: [""],
    steps: [""],
    recipeImage: null,
  });
  
  const initialDiseases = [
    "Diabetes", "Anaemia", "Thyroid", "Obesity", "PCOS", "Heart Health",
    "Hypertension", "Cholesterol", "Liver Health", "Kidney Health",
    "Digestive Health", "Joint Pain", "Migraine Relief", "Lactose Intolerance",
    "Gluten Intolerance", "Arthritis", "Depression & Anxiety", "Asthma",
    "Menopause Support", "Pregnancy Nutrition", "Postpartum Recovery",
    "Immunity Boost", "Fatty Liver", "Skin Health", "Bone Strength",
    "Eye Health", "Sleep Improvement", "Allergy-Friendly", "Cancer Recovery",
    "Detox & Cleanse"
  ];
  const [diseases, setDiseases] = useState(initialDiseases);
  const [otherDisease, setOtherDisease] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Ingredient handlers
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingradients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingradients: newIngredients });
  };
  const addIngredient = () => setRecipe({ ...recipe, ingradients: [...recipe.ingradients, ""] });
  const removeIngredient = (index) => {
    setRecipe({ ...recipe, ingradients: recipe.ingradients.filter((_, i) => i !== index) });
  };

  // Step handlers
  const handleStepChange = (index, value) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe({ ...recipe, steps: newSteps });
  };
  const addStep = () => setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
  const removeStep = (index) => {
    setRecipe({ ...recipe, steps: recipe.steps.filter((_, i) => i !== index) });
  };

  const handleImageUpload = (e) => {
    setRecipe({ ...recipe, recipeImage: e.target.files[0] });
  };

  // ✅ Validation before moving to next step
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!recipe.recipeName.trim()) newErrors.recipeName = "Recipe name is required";
      if (!recipe.disease.trim()) {
        newErrors.disease = "Please select a disease category";
      } else if (recipe.disease === "Other" && !otherDisease.trim()) {
        newErrors.disease = "Please enter a category name";
      }
      if (!recipe.expectedTime) newErrors.expectedTime = "Expected time is required";
      // description is optional — no validation needed
    }
    if (step === 2) {
      if (recipe.ingradients.some((i) => !i.trim())) newErrors.ingradients = "All ingredients must be filled";
    }
    if (step === 3) {
      if (recipe.steps.some((s) => !s.trim())) newErrors.steps = "All steps must be filled";
    }
    if (step === 4) {
      if (!recipe.recipeImage) newErrors.recipeImage = "Recipe image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 1 && recipe.disease === "Other" && otherDisease.trim()) {
      const newCategory = otherDisease.trim();
      if (!diseases.includes(newCategory)) {
        setDiseases((prev) => [...prev, newCategory]);
      }
      setRecipe((prev) => ({ ...prev, disease: newCategory }));
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Submit using Axios
  const handleSubmit = async () => {
    if (!validateStep()) return;

    const formData = new FormData();
    formData.append("recipeName", recipe.recipeName);
    formData.append("description", recipe.description); // optional
    formData.append("disease", recipe.disease);
    formData.append("expectedTime", recipe.expectedTime);
    recipe.ingradients.forEach((ing) => formData.append("ingradients", ing));
    recipe.steps.forEach((st) => formData.append("steps", st));
    formData.append("recipeImage", recipe.recipeImage);

    try {
      const res = await api.post(
        "/api/v1/recipes/post-recipe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Recipe posted successfully!");
      navigate(`/disease/${recipe.disease}`)
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to post recipe");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Add Recipe
        </h2>

        {/* Progress dots */}
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

        {/* Step 1 — Basic Info */}
        {step === 1 && (
          <div>
            <label className="block mb-2 font-medium">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              value={recipe.recipeName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-2"
              placeholder="Enter recipe name"
            />
            {errors.recipeName && (
              <p className="text-red-500 text-sm mb-2">{errors.recipeName}</p>
            )}

            {/* ✅ New Description field (optional) */}
            <label className="block mb-2 font-medium">Description (optional)</label>
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter a short description (optional)"
            />

            <label className="block mb-2 font-medium">Disease Category</label>
            <select
              name="disease"
              value={recipe.disease}
              onChange={(e) => {
                setRecipe({ ...recipe, disease: e.target.value });
                if (e.target.value !== "Other") setOtherDisease("");
              }}
              className="w-full border rounded-lg p-2 mb-2"
            >
              <option value="">Select category</option>
              {diseases.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {errors.disease && (
              <p className="text-red-500 text-sm mb-2">{errors.disease}</p>
            )}

            {recipe.disease === "Other" && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Enter new category</label>
                <input
                  type="text"
                  value={otherDisease}
                  onChange={(e) => setOtherDisease(e.target.value)}
                  placeholder="e.g., Thyroid Support Advanced"
                  className="w-full border rounded-lg p-2"
                />
                {!otherDisease.trim() && (
                  <p className="text-gray-500 text-xs mt-1">Please provide a category name to continue.</p>
                )}
              </div>
            )}

            <label className="block mb-2 font-medium">Expected Time (minutes)</label>
            <input
              type="number"
              name="expectedTime"
              value={recipe.expectedTime}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter cooking time"
            />
            {errors.expectedTime && (
              <p className="text-red-500 text-sm mb-2">{errors.expectedTime}</p>
            )}

            <button
              onClick={nextStep}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}

        {/* Steps 2–4 remain unchanged (Ingredients, Steps, Image) */}
        {step === 2 && (
          <div>
            <label className="block mb-4 font-medium">Ingredients</label>
            {recipe.ingradients.map((ing, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 border rounded-lg p-2"
                  placeholder={`Ingredient ${index + 1}`}
                />
                <button
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            {errors.ingradients && (
              <p className="text-red-500 text-sm mb-2">{errors.ingradients}</p>
            )}
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

        {step === 3 && (
          <div>
            <label className="block mb-4 font-medium">Steps</label>
            {recipe.steps.map((st, index) => (
              <div key={index} className="flex items-start gap-2 mb-2">
                <textarea
                  value={st}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="flex-1 border rounded-lg p-2"
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
            {errors.steps && (
              <p className="text-red-500 text-sm mb-2">{errors.steps}</p>
            )}
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

        {step === 4 && (
          <div>
            <label className="block mb-4 font-medium">Upload Recipe Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg p-2 mb-4"
            />
            {errors.recipeImage && (
              <p className="text-red-500 text-sm mb-2">{errors.recipeImage}</p>
            )}

            {recipe.recipeImage && (
              <img
                src={URL.createObjectURL(recipe.recipeImage)}
                alt="preview"
                className="w-full h-40 object-cover rounded-lg border mb-4"
              />
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
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;