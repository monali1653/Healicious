import { Router } from "express";
import { toggleLike, getRecipeLikes, getRecipesByDisease} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/toggle-like").post(verifyJWT, toggleLike);
router.route("/get-likes").get(verifyJWT, getRecipeLikes)
router.route("/get-likes/:disease").get(verifyJWT, getRecipesByDisease)

export default router