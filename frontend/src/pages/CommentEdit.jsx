import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function CommentEdit() {
  const [comment, setComment] = useState({});
  const [message, setMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchComment() {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(`/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "something went wrong");
        }

        setComment(result);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchComment();
  }, []);

  async function handleCommentEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      comment: formData.get("comment"),
    };
    console.log(data);

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(`/api/comments/${id}`, {
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

      console.log(result);
      setMessage(result.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <a href={`/blogs/${comment.blogId}`}>Blog</a>
      <h1>Edit Comment</h1>
      <form onSubmit={handleCommentEdit}>
        <input
          value={comment.comment}
          name="comment"
          required
          onChange={(e) => setComment({ ...comment, comment: e.target.value })}
        />
        <button type="submit">Edit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
