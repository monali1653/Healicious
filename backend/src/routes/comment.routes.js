import { Router } from "express";
import { postComment, getRecipeComments} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/post-comment").post(verifyJWT, postComment);
router.route("/get-comment/:recipeId").get(verifyJWT, getRecipeComments)

export default router