import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/me", authenticate, UserController.getMyProfile);

export default router;
