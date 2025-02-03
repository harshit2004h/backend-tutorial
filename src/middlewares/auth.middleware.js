import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // get token from cookie
    // verify token
    // get user from token
    // attach user to req object
    // call next
    try {
        const accessToken = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1]

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded?._id).select("-password -refreshToken")

        if (!user)
            throw new ApiError(401, "Invalid Access Token")

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})