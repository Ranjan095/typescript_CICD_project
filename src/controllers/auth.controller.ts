import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);
        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error
        })
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const result = await loginUserService({ ...req.body, user_agent: req.headers["user-agent"], ip_address: req.ip, });
        return res.status(200).json({
            status: true,
            message: "login sussess",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error
        })
    }

}