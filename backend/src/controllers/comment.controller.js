import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Recipe } from "../models/recipe.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postComment = asyncHandler(async (req, res) => {
    try {
        const { recipeId, content } = req.body;
        const userId = req.user._id; 

        if (!recipeId || !content) {
            return res.status(400).json({ message: "recipeId and content are required" });
        }

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Create comment
        const comment = await Comment.create({
            content,
            recipe: recipeId,
            owner: userId
        });

        return res.status(201).json(new ApiResponse(201,comment,"Comment posted successfully"))
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error")
    }
})

export const getRecipeComments = asyncHandler(async (req, res) => {
    try {
        const { recipeId } = req.params;

        if (!recipeId) {
            return res.status(400).json({ message: "recipeId is required" });
        }
        const comments = await Comment.aggregate([
            { $match: { recipe: new mongoose.Types.ObjectId(recipeId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.avatar": 1
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        res.status(200).json(new ApiResponse(200,{ count: comments.length, comments },"Comments fetched successfully"))
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error")
    }
})