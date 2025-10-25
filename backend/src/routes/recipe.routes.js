import { Router } from "express";
import { postRecipe,fetchAllRecipes,getRecipesPostByMe } from "../controllers/recipe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/post-recipe").post(verifyJWT,upload.fields([
    {
        name:"recipeImage",
        maxCount: 1
    }
]), postRecipe)
router.route("/get-recipes").get(verifyJWT, fetchAllRecipes);
router.route("/posted-by-user").get(verifyJWT, getRecipesPostByMe)

export default router