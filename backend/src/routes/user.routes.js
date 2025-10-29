import { Router } from "express";
import {
    loginUser,
    logoutUser, 
    registerUser,
    toggleWishlist,
    wishlistofUser,
    getMe,
    getMyProfile,
    updateAccountDetails,
    changeCurrentPassword,
    deleteAccount,
    refreshAccessToken
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/me").get(verifyJWT, getMe)
router.route("/refresh").post(refreshAccessToken)
router.route("/update").put(verifyJWT, updateAccountDetails)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/delete-account").post(verifyJWT,deleteAccount)

router.route("/toggle-wishlist").post(verifyJWT, toggleWishlist)
router.route("/wishlist").get(verifyJWT, wishlistofUser)

router.route("/myprofile").get(verifyJWT, getMyProfile)

export default router;