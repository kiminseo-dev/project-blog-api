import { useState, useEffect } from "react";

export default function Author() {
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // get token
        const token = sessionStorage.getItem("token");

        // send get request to get all blogs
        const response = await fetch("/api/author", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // convert to json
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setBlogs(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBlogs();
  }, [refresh]);

  async function handleBlogStatusChange(blog) {
    try {
      // get token
      const token = sessionStorage.getItem("token");

      // true -> false
      // false -> true
      const data = {
        published: !blog.published,
      };

      const response = await fetch(`/api/author/blogs/${blog.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // convert to json
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setRefresh(prev => !prev);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Author</h1>
      <a href="/author/blogs/create">Create Blog</a>
      {blogs.map((blog) => (
        <fieldset key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.text}</p>
          <a href={`/blogs/${blog.id}`}>Read blog</a>
          <br></br>
          <button onClick={() => handleBlogStatusChange(blog)}>
            {blog.published ? "unpublish" : "publish"}
          </button>
        </fieldset>
      ))}
    </div>
  );
}
