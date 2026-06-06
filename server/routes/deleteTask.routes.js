import express from "express";
import deleteTask from "../controllers/deleteTask.controllers.js";
import { verifyAuth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.delete("/delete/:id", verifyAuth, deleteTask);

export default router;