import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    // prevent browser default behavior
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);
    // extract form data
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      // get token
      const token = sessionStorage.getItem("token");

      // login post request
      const response = await fetch("/api/auth/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // convert response to json
      const result = await response.json();

      // unsuccessful response
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      // message sent form backend
      setMessage(result.message);

      // save token
      sessionStorage.setItem("token", result.token);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  }

  return (
    <div>
      <a href="/">Home</a>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <label for="username">Username:</label>
        <input id="username" name="username" type="text" required />

        <label for="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Log in</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
