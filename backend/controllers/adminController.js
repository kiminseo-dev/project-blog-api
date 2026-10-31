import { prisma } from "../lib/prisma.js";

export async function getAllUsers(req, res) {
  try {
    // get user
    // everything except password
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        author: true,
        admin: true,
      },
    });

    // only admins can access all users
    if (!user.admin) {
      res.status(403).json({
        message: "Forbidden: Admin access required",
      });
    }

    // get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        author: true,
        admin: true,
      },
    });
    console.log(users);

    res.json(users);
  } catch (err) {
    // 500 - internal server error
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
