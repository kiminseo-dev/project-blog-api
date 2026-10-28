import { useState, useEffect } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // get token from session storage
        const token = sessionStorage.getItem("token");

        // send get blogs request
        const response = await fetch("/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // convert to json
        const blogs = await response.json();
        // save blogs
        setBlogs(blogs);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <fieldset key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.text}</p>
        </fieldset>
      ))}
    </div>
  );
}
