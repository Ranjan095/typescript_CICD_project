import express from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import { verifyToken } from '../middlewares/auth.middleware';

const allRoutes = express.Router()

allRoutes.use("/auth", authRoutes)
allRoutes.use("/profile", verifyToken, profileRoutes)

export default allRoutes;