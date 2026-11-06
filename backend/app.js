import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();
import { authRouter } from "./routes/authRouter.js";
import { blogsRouter } from "./routes/blogsRouter.js";
import { authorRouter } from "./routes/authorRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { commentsRouter } from "./routes/commentsRouter.js";

app.use(express.json()); // body converts to json
app.use(express.urlencoded({ extended: true })); // allows nested data

// authentication router
app.use("/api/auth", authRouter);

// blog router
app.use("/api/blogs", blogsRouter);

// author router
app.use("/api/author", authorRouter);

// admin router
app.use("/api/admin", adminRouter);

// comment router
app.use("/api/comments", commentsRouter);

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));
