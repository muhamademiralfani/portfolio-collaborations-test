import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes/index.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);


app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
})

export default app;
