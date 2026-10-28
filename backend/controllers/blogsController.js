import { prisma } from "../lib/prisma.js";


export async function getBlogs(req, res) {
  try {
    // get blogs
    const blogs = await prisma.blog.findMany();

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

export async function createBlog(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        // req.user from verifyToken middleware
        id: req.user.userId,
      },
    });

    // authorize user if author
    if (user.author) {
      res.status(403).json({
        message: "Not an Author",
      });
    }

    // create blog
    const blog = await prisma.blog.create({
      data: {
        title: req.body.title,
        text: req.body.text,
        userId: user.id,
      },
    });

    // send the blog
    res.json(blog);
  } catch (err) {
    // 500 - internal server error
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
