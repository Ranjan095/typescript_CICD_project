import express from 'express';
import { registerUserController } from '../controllers/auth.controller';
const authRoutes =express.Router();

authRoutes.post("/register",registerUserController)

export default authRoutes;