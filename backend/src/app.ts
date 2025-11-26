import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import pdfRoutes from "./routes/pdf.routes";
import userRoutes from "./routes/user.routes";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pdf", pdfRoutes);

export default app;
