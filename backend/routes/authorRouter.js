import { Router } from "express";
const authorRouter = Router();
import * as authorController from "../controllers/authorController.js";

authorRouter.get("/", authorController.getAllBlogs);

export { authorRouter };