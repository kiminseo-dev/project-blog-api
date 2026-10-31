import { useState } from "react";

export default function Login() {
  // success and error messages
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    // prevents browser defaults
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);
    // extract from form data
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const token = sessionStorage.getItem("token");

      // login post request to server
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      // convert response to json
      const result = await response.json();

      // unsuccessful request
      // after result useful information from backend gets parsed first so result.message is available
      if (!response.ok) {
        // error message sent from backend or "something went wrong"
        throw new Error(result.message || "Something went wrong");
      }

      // message sent from backend
      setMessage(result.message);

      // save token in sessionStorage
      sessionStorage.setItem("token", result.token);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <a href="/">Home</a>
      <h1>Log in page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
