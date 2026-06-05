import express from "express";
import create from "../controllers/createTask.controllers.js";
import { verifyAuth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/create-task", verifyAuth, create);

export default router;