import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import pdfRoutes from "./routes/pdf.routes";
import activityRoutes from "./routes/activity.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(process.env.UPLOAD_DIR!));

app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/activity", activityRoutes);

app.use(errorHandler);

export default app;
