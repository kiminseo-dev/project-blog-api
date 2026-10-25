import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();
import { authRouter } from "./routes/authRouter.js";

app.use(express.json()); // body converts to json
app.use(express.urlencoded({ extended: true })); // allows nested data

// authentication router
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));
