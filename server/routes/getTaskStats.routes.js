import express from "express";
import getTaskStats from "../controllers/getTaskStats.controllers.js";
import { verifyAuth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/stats", verifyAuth, getTaskStats);

export default router;