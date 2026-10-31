import { Router } from "express";
const blogsRouter = Router();
import * as blogsController from "../controllers/blogsController.js";
import { verifyToken } from "../controllers/authController.js";

// verify jwt token
blogsRouter.use(verifyToken);

// get all blogs
blogsRouter.get("/", blogsController.getBlogs);

// get specific blog
blogsRouter.get("/:id", blogsController.getBlog);

// make a blog
blogsRouter.post("/", blogsController.createBlog);

export { blogsRouter };
