import { useState, useEffect } from "react";

export default function Author() {
  const [blogs, setBlogs] = useState([]);

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
  }, []);

  return (
    <div>
      <h1>Author</h1>
      {blogs.map((blog) => (
        <fieldset key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.text}</p>
          <a href={`/blogs/${blog.id}`}>Read blog</a>
        </fieldset>
      ))}
    </div>
  );
}
