import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function notAuthenticated(req, res, next) {
  try {
    // authorization header
    const authHeader = req.headers.authorization;

    // extract token after Bearer
    const token = authHeader.split(" ")[1];

    // verify the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // already logged in
    return res.status(403).json({
      message: "You are already logged in",
    });
  } catch (err) {
    // jwt is not there or invalid
    return next();
  }
}

export function verifyToken(req, res, next) {
  try {
    // get auth header
    const authHeader = req.headers.authorization;

    // get token
    const token = authHeader.split(" ")[1];
    // check token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // req.user gets the userId
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

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

export async function authenticateUser(req, res) {
  try {
    // find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    // username not found
    if (!user) {
      // 401 - Unauthorized
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // check if password is valid
    const match = await bcrypt.compare(req.body.password, user.password);

    // password incorrect
    if (!match) {
      // 401 - Unauthorized
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // creates json web token
    const token = jwt.sign(
      { userId: user.id }, // the data to put in the token
      process.env.JWT_SECRET, // sign the token so it cant be forged
      { expiresIn: "1h" },
    );

    // sending back the token
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);

    // 500 - internal server error
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getCurrentUser(req, res) {
  // find by userId
  // get id name and username
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  // user not found
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // return user data
  return res.json(user);
}
