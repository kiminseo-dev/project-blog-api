import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function BlogEdit() {
  const [blog, setBlog] = useState({
    title: "",
    text: "",
  });
  const [message, setMessage] = useState("");

  // get id from params
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlog() {
      try {
        // get token
        const token = sessionStorage.getItem("token");

        const response = await fetch(`/api/author/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "something went wrong");
        }

        setBlog(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBlog();
  }, [id]);

  async function handleBlogUpdate(event) {
    // stop browser default
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);

    // get data from form data
    const data = {
      title: formData.get("title"),
      text: formData.get("text"),
    };

    try {
      // get token
      const token = sessionStorage.getItem("token");

      const response = await fetch(`/api/author/blogs/${id}/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "something went wrong");
      }
      setMessage(result.message);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <a href="/author">Author</a>
      <h1>Edit Blog</h1>
      <form onSubmit={handleBlogUpdate}>
        <label htmlFor="name">Title:</label>
        <input
          id="name"
          name="title"
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
        />

        <label htmlFor="text">Text:</label>
        <input
          id="text"
          name="text"
          type="text"
          value={blog.text}
          onChange={(e) => setBlog({ ...blog, text: e.target.value })}
          required
        />

        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
