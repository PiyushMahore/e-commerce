import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, _, next) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw new apiError(400, "No user logged in this moment");
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN)

    if (!decodedToken) {
        throw new apiError(500, "Somthing went wrong while getting the current user");
    }

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new apiError(500, "Somthing went wrong while getting the current user");
    }

    req.user = user;
    next()
});

export default verifyJwt;
