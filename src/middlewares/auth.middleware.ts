import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decodedAccessToken } from "../utils/jwt.util";
import { AuthRequest } from "../types/auth.types";

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "Please login access token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = decodedAccessToken(token)

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired access token",
        });
    }
};