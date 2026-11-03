import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState("");

  // get id from url
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlog() {
      try {
        // retrieve token
        const token = sessionStorage.getItem("token");

        // request to getBlog backend
        const response = await fetch(`/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // convert to json
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setBlog(data);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    }

    fetchBlog();
  }, [id]);

  return (
    <div>
      <a href="/">Home</a>
      <br></br>
      <a href="/blogs">Blogs</a>
      {message && <p>{message}</p>}

      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <p>{blog.text}</p>
          <p>
            <strong>Created:</strong> {blog.createdAt}
          </p>
          <p>
            <strong>Updated:</strong> {blog.updatedAt}
          </p>
          <p>
            <strong>Author:</strong> {blog.user.username}
          </p>
        </div>
      )}
    </div>
  );
}
