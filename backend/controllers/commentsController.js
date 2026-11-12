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

export async function getCommentsForBlog(req, res) {
  try {
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

    // get all comments
    const comments = await prisma.comment.findMany({
      where: {
        blogId: blog.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(comments);
  } catch (err) {
    console.error(err);
    // 500 - internal error
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function deleteComment(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // get comment
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }

    if (user.id !== comment.userId) {
      return res.status(403).json({
        message: "Not your comment",
      });
    }

    // delete comment
    const deletedComment = await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });

    res.json(deletedComment);
  } catch (err) {
    console.error(err);
    // 500 - internal error
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function editComment(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }

    if (user.id !== comment.userId) {
      return res.status(403).json({
        message: "this is not your comment",
      });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        ...req.body,
      },
    });

    res.json({
      message: "comment changed",
      updatedComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function getComment(req, res) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
}
