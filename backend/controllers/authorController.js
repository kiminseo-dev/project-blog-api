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
      orderBy: {
        // newest first
        createdAt: "desc",
      },
    });

    res.json(blogs);
  } catch (err) {
    console.error(err);
    // 500 - server error
    res.status(500).json({
      message: "Internal server error",
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

    // when user does not exist
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // authorize user if author
    if (!user.author) {
      return res.status(403).json({
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

export async function updateBlogStatus(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    // user not found
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // user is not an author
    if (!user.author) {
      return res.status(403).json({
        message: "you are not an author",
      });
    }

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

    // userid and blog user id don't match
    if (user.id !== blog.userId) {
      return res.status(403).json({
        message: "this is not your blog",
      });
    }

    // update blog
    const updatedBlog = await prisma.blog.update({
      where: {
        id: blog.id,
      },
      data: {
        ...req.body,
      },
    });

    res.json(updatedBlog);
  } catch (err) {
    console.error(err);
    // 500 - internal server error
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function readBlogAsAuthor(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      // 404 - not found
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (!user.author) {
      // 403 - not authorized
      return res.status(403).json({
        message: "you are not an author",
      });
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!blog) {
      // 404 - not found
      return res.status(404).json({
        message: "blog not found",
      });
    }

    if (user.id !== blog.userId) {
      // 403 - unauthorized
      return res.status(403).json({
        message: "this is not your blog",
      });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    // 500 - internal server error
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function updateBlog(req, res) {
  // get user
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  // user not found
  if (!user) {
    // 404 resource not found
    return res.status(404).json({
      message: "user not found",
    });
  }

  // user not found
  if (!user.author) {
    // 403 - unauthorized
    return res.status(403).json({
      message: "you are not an admin",
    });
  }

  const blog = await prisma.blog.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  // blog not found 404 status
  if (!blog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  // user id does not match blog userid
  if (user.id !== blog.userId) {
    return res.status(403).json({
      message: "not your blog",
    });
  }

  const updatedBlog = await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: {
      ...req.body,
    },
  });

  // send updatedBlog
  res.json({
    updatedBlog,
    message: "updated",
  });
  try {
  } catch (err) {
    console.error(err);
    // 500 - internal server error
    res.status(500).json({
      message: "internal server",
    });
  }
}

export async function deleteBlog(req, res) {
  try {
    // get user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    // user does not exist
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // user not found
    if (!user.author) {
      // 403 - unauthorized
      return res.status(403).json({
        message: "you are not an admin",
      });
    }

    // get blog
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    // if blog does not exist
    if (!blog) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // user id and blog user id does not match
    if (user.id !== blog.userId) {
      return res.status(403).json({
        message: "this is not your blog",
      });
    }

    // delete blog
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blog.id,
      },
    });

    res.json(deleteBlog);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}
