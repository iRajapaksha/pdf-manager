import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import pdfRoutes from "./routes/pdf.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pdf", pdfRoutes);

export default app;
