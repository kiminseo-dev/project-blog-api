import { useState, useEffect } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(true);

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
  }, [refresh]);

  async function handleUserRoleChange(user, role) {
    try {
      // get token
      const token = sessionStorage.getItem("token");

      const data = {
        [role]: !user[role],
      };

      // send patch request
      const response = await fetch(`/api/admin/${user.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // convert to json
      const result = await response.json();

      // refresh page
      setRefresh(prev => !prev);
    } catch (err) {
      console.error(err);
    }
  }

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
            <button onClick={() => handleUserRoleChange(user, "author")}>
              {user.author ? "Remove author access" : "Add author access"}
            </button>
            <li>admin: {user.admin.toString()}</li>
            <button onClick={() => handleUserRoleChange(user, "admin")}>
              {user.admin ? "Remove admin access" : "Add admin access"}
            </button>
          </ul>
        </fieldset>
      ))}
      <p>{message}</p>
    </div>
  );
}
