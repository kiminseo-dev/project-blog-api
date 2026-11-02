import { Router } from "express";
const authorRouter = Router();
import * as authorController from "../controllers/authorController.js";
import { verifyToken } from "../controllers/authController.js";

// verify user token
authorRouter.use(verifyToken);

authorRouter.get("/", authorController.getAllBlogs);

export { authorRouter };
