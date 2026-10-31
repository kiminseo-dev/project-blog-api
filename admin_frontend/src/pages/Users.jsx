import { useState, useEffect } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        // get token
        const token = sessionStorage.getItem("token");

        // get all users
        const response = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // convert to json
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setUsers(result);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <fieldset key={user.id}>
          <h3>{user.username}</h3>
          <ul>
            <li>id: {user.id}</li>
            <li>name: {user.name}</li>
            <li>username: {user.username}</li>
            <li>author: {user.author.toString()}</li>
            <li>admin: {user.admin.toString()}</li>
          </ul>
        </fieldset>
      ))}
      <p>{message}</p>
    </div>
  );
}
