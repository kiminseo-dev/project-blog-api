import { Router } from "express";
const blogsRouter = Router();
import * as blogsController from "../controllers/blogsController.js";
import * as authController from "../controllers/authController.js";

blogsRouter.get("/", authController.verifyToken, blogsController.getBlogs);

// make a blog
blogsRouter.post("/", authController.verifyToken, blogsController.createBlog);

export { blogsRouter };
