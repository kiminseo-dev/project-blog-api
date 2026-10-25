import { useState } from "react";

export default function Signup() {
  // signup message (errors, success)
  const [message, setMessage] = useState("");

  async function handleSignup(event) {
    // prevents the browsers event default
    event.preventDefault();

    // get from data
    const formData = new FormData(event.currentTarget);
    // extract from data
    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      // signup post request
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // convert to json
      const result = await response.json();

      // this is after result because the server sends back useful information and parsing it first result.message is accessible
      if (!response.ok) {
        // throw new Error
        // stops execution in try block and jumps to the matching catch block
        throw new Error(result.message || "Something went wrong");
      }

      setMessage("Account created");
      console.log(result);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <h1>Sign up page</h1>
      <form onSubmit={handleSignup}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Signup</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
