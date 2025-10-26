import { Recipe } from "../models/recipe.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const postRecipe = asyncHandler(async (req,res) => {
    let {recipeName, description, disease, ingradients, steps, expectedTime} = req.body;
    if([recipeName, description, disease, ingradients, steps, expectedTime].some((field) => field ?.trim() ==="")) {
      throw new ApiError(400, "All fields are required")
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

const fetchAllRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find({ status: "approved" });
    res.status(200).json(new ApiResponse(200,recipes,"All recipes fetched successfully"));
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    throw new ApiError(500,"Internal Server Error")
  }
});

const getRecipesPostByMe = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const postedRecipes = await Recipe.find({ user: userId }).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, postedRecipes, "Recipes posted by user fetched.")
  );
});

export {
  postRecipe,
  fetchAllRecipes,
  getRecipesPostByMe
}