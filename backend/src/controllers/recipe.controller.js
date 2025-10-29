import { Recipe } from "../models/recipe.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const postRecipe = asyncHandler(async (req,res) => {
    let {recipeName, description, disease, ingradients, steps, expectedTime} = req.body;
    if ([recipeName, disease, ingradients, steps, expectedTime].some(
      (field) => field == null || (typeof field === "string" && field.trim() === "") || (Array.isArray(field) && field.length === 0) // empty array
    )) {
  throw new ApiError(400, "All fields are required");
}

    const recipeImageLocalPath = req.files?.recipeImage?.[0]?.path;
    if(!recipeImageLocalPath) {
      throw new ApiError(400,"recipe Image is Required")
    }
    const image = await uploadOnCloudinary(recipeImageLocalPath)
    if(!image) {
      throw new ApiError(400,"Book Image is Required")
    }
    const pendingRecipe = await Recipe.create({
        recipeName,
        description,
        disease,
        ingradients,
        steps,
        recipeImage: image.url,
        user: req.user._id,
        expectedTime,
        status: "pending"
    })

    if(!pendingRecipe) {
      throw new ApiError(500,"Something went wrong while adding the book")
    }
    return res.status(200).json(
      new ApiResponse(200, pendingRecipe,"Book sold successfully")
    )
})

const getRecipesByDisease = asyncHandler(async (req, res) => {
  const { disease } = req.params;

  if (!disease || disease.trim() === "") {
    throw new ApiError(400, "Disease category is required");
  }

  const userId = req.user?._id;

  // Show approved recipes for everyone + include requester's own pending recipes
  const recipes = await Recipe.find({
    disease: { $regex: new RegExp(disease, "i") },
    $or: [
      { status: "approved" },
      { status: "pending", user: userId },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, recipes, "Recipes fetched successfully"));
});


const getRecipesPostByMe = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const postedRecipes = await Recipe.find({ user: userId }).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, postedRecipes, "Recipes posted by user fetched.")
  );
});

// Distinct disease categories: approved for all users + include requester's pending
const getRecipeCategories = asyncHandler(async (req, res) => {

  const categories = await Recipe.distinct("disease", {status:"approved" });

  return res
    .status(200)
    .json(new ApiResponse(200, categories.sort(), "Categories fetched"));
});

export {
  postRecipe,
  getRecipesByDisease,
  getRecipesPostByMe,
  getRecipeCategories
}