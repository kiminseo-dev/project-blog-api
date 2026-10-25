import { Router } from "express";
const authRouter = Router();
import * as authController from "../controllers/authController.js"

authRouter.post("/signup", authController.createUser);

export { authRouter };
