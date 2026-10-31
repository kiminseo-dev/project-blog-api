import { Router } from "express";
const authRouter = Router();
import * as authController from "../controllers/authController.js";

authRouter.post(
  "/signup",
  authController.notAuthenticated, // check if user is logged in
  authController.createUser,
);

authRouter.post(
  "/login",
  authController.notAuthenticated, // check if user is logged in
  authController.authenticateUser,
);

authRouter.post(
  "/login/admin",
  authController.notAuthenticated,
  authController.authenticateAdmin,
);

authRouter.get(
  "/me",
  authController.verifyToken,
  authController.getCurrentUser,
);

export { authRouter };
