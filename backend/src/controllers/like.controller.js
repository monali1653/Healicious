import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Like } from "../models/like.model.js";
import { Recipe } from "../models/recipe.model.js";

export const toggleLike = asyncHandler(async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user._id

        if (!recipeId || !userId) {
            throw new ApiError(400,"recipeId and userId are required")
        }

        const recipeObjectId = new mongoose.Types.ObjectId(recipeId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const recipe = await Recipe.findById(recipeObjectId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const existingLike = await Like.findOne({ recipe: recipeObjectId, likedBy: userObjectId });
        if (existingLike) {
            await Like.deleteOne({ _id: existingLike._id })
        } else {
            await Like.create({ recipe: recipeObjectId, likedBy: userObjectId })
        }

        res.status(200).json(new ApiResponse(200,"Recipe like toggled succesfully"));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export const getRecipeLikes = asyncHandler(async (req, res) => {
    try {
        const { recipeId } = req.params;

        if (!recipeId) {
            throw new ApiError(400,"recipeId is required")
        }

        const totalLikes = await Like.countDocuments({ recipe: recipeId });

        return res.status(200).json(new ApiResponse(200,totalLikes,"recipe's total likes fetched successfully"))

    } catch (error) {
        throw new ApiError(500,"Server Error")
    }
})

export const likedByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const likes = await Like.find({ likedBy: userId }).select("recipe");
    const likedRecipeIds = likes.map((like) => like.recipe.toString());

    res
      .status(200)
      .json(new ApiResponse(200, likedRecipeIds, "User liked recipes fetched"));
  } catch (error) {
    throw new ApiError(500,"Something went wrong")
  }
})