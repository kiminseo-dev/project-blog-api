import { Router } from "express";
const commentsRouter = Router();
// commentsController
import * as commentsController from "../controllers/commentsController.js";

// verify token middleware
import { verifyToken } from "../controllers/authController.js";

commentsRouter.use(verifyToken);

commentsRouter.post("/blogs/:id", commentsController.postComment);

export { commentsRouter };
