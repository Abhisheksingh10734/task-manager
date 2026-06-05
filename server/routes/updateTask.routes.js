import express from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import updateTask from "../controllers/updateTask.controllers.js";

const router = express.Router();

router.put("/:id/update", verifyAuth, updateTask);

export default router;