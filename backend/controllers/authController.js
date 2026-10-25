import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    // hashing password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // adding user
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      },
    });

    // user was successfully created
    res.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
      author: user.author,
      admin: user.admin,
    });
  } catch (err) {
    // prisma error: username already exists
    if (err.code === "P2002") {
      // 409 - the username already exists
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // 500 - internal server error
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


