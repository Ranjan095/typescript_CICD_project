import express from 'express';
import { loginUserController, registerUserController } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { validate } from '../middlewares/validate';
const authRoutes = express.Router();

authRoutes.post("/register", validate(registerSchema), registerUserController)
authRoutes.post("/login", validate(loginSchema), loginUserController)


export default authRoutes;