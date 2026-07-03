import express from 'express';
import { registerUserController } from '../controllers/auth.controller';
import { validateRegister } from '../middlewares/validation/auth.validation';
const authRoutes = express.Router();

authRoutes.post("/register", validateRegister, registerUserController)

export default authRoutes;