import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()); // body converts to json
app.use(express.urlencoded({ extended: true })); // allows nested data

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));
