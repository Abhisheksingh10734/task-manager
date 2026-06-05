import express from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import editTask from "../controllers/editTask.controllers.js";

const router = express.Router();

router.get("/:id", verifyAuth, editTask);

export default router;