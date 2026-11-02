import { prisma } from "../lib/prisma.js";

export async function getBlog(req, res) {
  try {
    // get blog from db with id
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
        published: true,
      },
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.json(blog);
  } catch (err) {
    // 500 - internal server error
    console.error(err);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
}

export async function getBlogs(req, res) {
  try {
    // get blogs
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc", // latest first
      },
    });

    // send blogs []
    res.json(blogs);
  } catch (err) {
    // 500 - internal server error
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
