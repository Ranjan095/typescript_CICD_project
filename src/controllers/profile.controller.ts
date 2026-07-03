import { Request, Response } from "express";
import { getProfileService } from "../services/profile.service";
import { AuthRequest } from "../types/auth.types";

export const getProfileController = async (req: AuthRequest, res: Response) => {
    try {
        const user = await getProfileService(req.user!.id);
        return res.status(200).json({
            status: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error
        })
    }
}