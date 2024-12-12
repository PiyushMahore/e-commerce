import { User } from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookiesOptions = {
    httpOnly: true,
    secured: true
}

const generateAccessTokenRefreshToken = async (_id) => {
    if (!_id) {
        throw new apiError(400, "User ID is required");
    }

    const user = await User.findById(_id);

    if (!user) {
        throw new apiError(400, "Invailed user id");
    }

    const refreshToken = await user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()

    if (!accessToken || !refreshToken) {
        throw new apiError(500, "Failed to generate access and refresh token")
    }

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken }
}

const signUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "Email & Password is required")
    }

    const isAlreadyExist = await User.findOne({
        email: email
    });

    if (isAlreadyExist) {
        throw new apiError(400, "Email is already taken")
    }

    const user = await User.create({ email: email, password: password });

    if (!user) {
        throw new apiError(500, "Failed to create user");
    }

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id);

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .cookie("accessToken", accessToken, cookiesOptions)
        .json(new apiResponse(200, user, "User sign up successfully"));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "Email & Password is required")
    }

    const user = await User.findOne({
        email: email
    });
    if (!user) {
        throw new apiError(404, "No user found");
    }

    const isPasswordCorrect = await user.ChangeOrCheckPassword(password);

    if (!isPasswordCorrect) {
        throw new apiError(400, "Password Incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user._id);

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .cookie("accessToken", accessToken, cookiesOptions)
        .json(new apiResponse(200, user, "User login successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new apiError(404, "no user found")
    }

    return res
        .status(200)
        .json(new apiResponse(200, user, "User fetched successfully"))
});

const logOut = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: ""
        }
    }, {
        new: true
    });

    return res
        .status(200)
        .clearCookie("refreshToken", cookiesOptions)
        .clearCookie("accessToken", cookiesOptions)
        .json(new apiResponse(200, {}, "User logged out successfully"))
})

export { signUp, login, getCurrentUser, logOut }
