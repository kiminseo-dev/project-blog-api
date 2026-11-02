import { Router } from "express";
const authorRouter = Router();

authorRouter.get("/", (req, res) => {
    res.json({
        message: "hello"
    })
})

export { authorRouter };