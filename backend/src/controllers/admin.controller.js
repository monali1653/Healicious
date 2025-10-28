import { Recipe } from "../models/recipe.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPendingRecipes = asyncHandler(async (req,res) => {
    const pending = await Recipe.find({status: "pending"}).sort({createdAt: -1})
    res.status(200).json(new ApiResponse(200,pending, "Pending Recipes fetched successfully"))
})

const approveRecipe = asyncHandler(async (req,res) => {
    const {recipeId} = req.body
    if(!recipeId) {
        throw new ApiError(400,"Recipe ID is required")
    }
    const recipe = await Recipe.findById(recipeId)
    if(!recipe) {
        throw new ApiError(404,"recipe not found")
    }
    if(recipe.status !== "pending") {
        throw new ApiError(400,"recipe is already processed")
    }
    recipe.status = "approved"
    await recipe.save()
    return res.status(200).json(
        new ApiResponse(200,recipe,"recipe approved")
    )
})

const rejectRecipe = asyncHandler(async(req,res) => {
    const {recipeId} = req.body

    if(!recipeId) {
        throw new ApiError(400,"REcipe ID is required")
    }

    const recipe = await Recipe.findById(recipeId)
    if(!recipe) {
        throw new ApiError(404,"Recipe not found")
    }

    recipe.status = "rejected"
    await recipe.save()

    return res.status(200).json(
        new ApiResponse(200,recipe,"Recipe rejected")
    )
})

export {
    getPendingRecipes,
    approveRecipe,
    rejectRecipe
}