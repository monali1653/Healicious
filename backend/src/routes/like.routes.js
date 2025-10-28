import { Router } from "express";
import { toggleLike, getRecipeLikes, likedByUser} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/toggle-like").post(verifyJWT, toggleLike);
router.route("/get/:recipeId").get(verifyJWT, getRecipeLikes)
router.route("/user-likes").get(verifyJWT, likedByUser)

export default router