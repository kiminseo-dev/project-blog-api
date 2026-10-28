import { useState } from "react";

export default function BlogCreate() {
  const [message, setMessage] = useState("");

  async function handleCreate(event) {
    // prevent browser default behavior
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);
    // extract form data
    const data = {
      title: formData.get("title"),
      text: formData.get("text"),
    };

    try {
      // get token
      const token = sessionStorage.getItem("token");

      // create blog post request
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      // convert to json
      const result = await response.json();

      // error
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setMessage("Blog Created");
      console.log(result);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <h1>Create A Blog</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="name">Title:</label>
        <input id="name" name="title" type="text" required />

        <label htmlFor="text">Text:</label>
        <input id="text" name="text" required />

        <button type="submit">Create</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
