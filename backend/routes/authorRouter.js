import { Router } from "express";
const authorRouter = Router();
import * as authorController from "../controllers/authorController.js";
import { verifyToken } from "../controllers/authController.js";

// verify user token
authorRouter.use(verifyToken);

// getting all the blogs
authorRouter.get("/", authorController.getAllBlogs);

// read blog as admin
authorRouter.get("/blogs/:id", authorController.readBlogAsAuthor);

// create new blog
authorRouter.post("/blogs/create", authorController.createBlog);

// publish or unpublish blog
authorRouter.patch("/blogs/:id/status", authorController.updateBlogStatus);

authorRouter.patch("/blogs/:id/update", authorController.updateBlog);

export { authorRouter };
