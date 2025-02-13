import express from "express";
import educationRoutes from "./educationRoutes.js";

const router = express.Router();

router.use("/education", educationRoutes);

export default router;
