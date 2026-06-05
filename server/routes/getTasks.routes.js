import express from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import getTasks from "../controllers/getTasks.controllers.js";

const router = express.Router();

router.get("/tasks", verifyAuth, getTasks);

export default router;