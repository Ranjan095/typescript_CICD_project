import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);
        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: result
        })
     } catch (error) {
        return res.status(500).json({
            status:false,
            message:"Internal Server Error",
            error:error instanceof Error ? error.message : error
        })
    }
};