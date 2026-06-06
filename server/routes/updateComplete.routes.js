import express from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import updateComplete from "../controllers/updateComplete.controllers.js";

const router = express.Router();

router.patch("/status/:id", verifyAuth, updateComplete);

export default router;