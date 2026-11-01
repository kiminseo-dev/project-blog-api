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
      orderBy: {
        id: "asc",
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

export async function updateUserRole(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });
    console.log(user);

    // if user does not exist
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // user does not have admin access
    if (!user.admin) {
      return res.status(403).json({
        message: "You are not an admin",
      });
    }

    // update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
      select: {
        id: true,
        name: true,
        username: true,
        author: true,
        admin: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    // 500 - internal server error
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
