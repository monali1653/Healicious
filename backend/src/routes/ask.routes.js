import express from "express";
import { generateRecipe } from "../controllers/ask.controller.js";

const router = express.Router();

// POST /api/v1/ai/ask
router.post("/ask", generateRecipe);

export default router;
