import { Router } from "express";
const adminRouter = Router();
import * as adminController from "../controllers/adminController.js";
import { verifyToken } from "../controllers/authController.js";

adminRouter.use(verifyToken);

adminRouter.get("/users", adminController.getAllUsers);

export { adminRouter };
