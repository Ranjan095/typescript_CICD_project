import express from "express";
import { getProfileController } from "../controllers/profile.controller";
const profileRoutes = express.Router();

profileRoutes.get("/", getProfileController)

export default profileRoutes;