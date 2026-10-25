import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState({
    name: "Guest",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        // get token from session storage
        const token = sessionStorage.getItem("token");

        // send get request
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if response is not valid (err)
        if (!response.ok) return;

        // convert data to json
        const data = await response.json();
        // save data in user state
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  });

  function handleLogout() {
    sessionStorage.removeItem("token");
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, {user.name}</h2>
      <a href="/login">Log in</a>
      <a href="signup">Sign up</a>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
