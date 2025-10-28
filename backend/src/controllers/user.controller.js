import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // add refresh token to database which is in user.module.js
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email,password, phoneNo, avatar } = req.body;
  if (
    [fullName, email, password, phoneNo].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({email});
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    fullName,
    phoneNo,
    email,
    password,
    avatar
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "username or email is required");
  }
  const user = await User.findOne({email});
  if (!user) {
    throw new ApiError(404, "user doesnot exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNo } = req.body;

  if (!fullName && !email && !phoneNo) {
    throw new ApiError(400, "All fields are required.");
  }

  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (email) updates.email = email;
  if (phoneNo) updates.phoneNo = phoneNo;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updates },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully."));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully."));
});

const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized request");
  }
  return res.json(req.user);
});

const getMyProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token expired or invalid");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = user.generateAccessToken();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user?._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isCorrect = await user.isPasswordCorrect(password);
  if (!isCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

  await User.findByIdAndDelete(req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully"));
});

const toggleWishlist = asyncHandler(async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) {
      throw new ApiError(400, "Invalid recipe id");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const alreadyInWishlist = user.wishlist.includes(recipeId);

    if (alreadyInWishlist) {
      user.wishlist.pull(recipeId);
    } else {
      user.wishlist.push(recipeId);
    }
    await user.save();
    await user.populate("wishlist");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user.wishlist,
          alreadyInWishlist ? "Removed From wishlist" : "Added to wishlist"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

const wishlistofUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  if (!user) throw new ApiError(404, "User not found");
  const wishlist = user.wishlist;
  if (wishlist.length == 0) {
    res.status(200).json(new ApiResponse(200, [], "wishlist is empty"));
  } else {
    res
      .status(200)
      .json(new ApiResponse(200, wishlist, "wishlist fetched successfully"));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  toggleWishlist,
  wishlistofUser,
  getMe,
  getMyProfile,
  updateAccountDetails,
  changeCurrentPassword,
  deleteAccount,
};
