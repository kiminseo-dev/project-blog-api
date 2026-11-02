import { prisma } from "../lib/prisma.js";

export async function getAllBlogs(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    // if user is not found
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // user is not an author
    if (!user.author) {
      return res.status(403).json({
        message: "You are not an author",
      });
    }

    // get blogs
    const blogs = await prisma.blog.findMany({
      where: {
        userId: user.id,
      },
    });
    console.log(blogs);

    res.json(blogs);
  } catch (err) {
    console.error(err);
    // 500 - server error
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
