import { Router } from "express";
const adminRouter = Router();
import * as adminController from "../controllers/adminController.js";
import { verifyToken } from "../controllers/authController.js";

adminRouter.use(verifyToken);

// get all users
adminRouter.get("/users", adminController.getAllUsers);

// change role
adminRouter.patch("/:id/role", adminController.updateUserRole);

export { adminRouter };
