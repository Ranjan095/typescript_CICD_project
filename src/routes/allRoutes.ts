import express from 'express';
import authRoutes from './authRoutes';

const allRoutes = express.Router()

allRoutes.use("/auth",authRoutes)

export default allRoutes;