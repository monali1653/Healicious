import { Router } from "express";
import { 
    getPendingRecipes,
    approveRecipe,
    rejectRecipe
 } from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route('/pending').get(verifyJWT,isAdmin,getPendingRecipes)
router.route('/approve').put(verifyJWT,isAdmin,approveRecipe)
router.route('/reject').put(verifyJWT,isAdmin,rejectRecipe)

export default router