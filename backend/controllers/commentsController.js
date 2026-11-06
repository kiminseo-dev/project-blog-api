import { prisma } from "../lib/prisma.js";

export async function postComment(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    // user does not exists
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // get blog
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    // blog does not exist
    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    // make comment
    const comment = await prisma.comment.create({
      data: {
        comment: req.body.comment,
        blogId: blog.id,
        userId: user.id,
      },
    });

    res.json(comment);
  } catch (err) {
    console.error(err);
    // 500 - internal server error
    res.status(500).json({
      message: "internal server error",
    });
  }
}
