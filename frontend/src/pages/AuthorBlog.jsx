import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function AuthorBlog() {
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState("");

  // get id
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlogAsAdmin() {
      try {
        // get token
        const token = sessionStorage.getItem("token");

        // send get request
        const response = await fetch(`/api/author/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setBlog(result);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    }

    fetchBlogAsAdmin();
  }, [id]);

  return (
    <div>
      {message && <p>{message}</p>}

      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <p>{blog.text}</p>
          <p>Created: {blog.createdAt}</p>
          <p>Updated: {blog.updatedAt}</p>
        </div>
      )}
    </div>
  );
}
