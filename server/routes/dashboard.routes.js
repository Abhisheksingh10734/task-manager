import express from "express";
import {dashboardProtect} from "../controllers/dashboard.controllers.js";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/me", verifyAuth, dashboardProtect);

export default router;