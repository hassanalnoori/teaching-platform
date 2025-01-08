import React, { useState } from "react";
import { addUser } from "../../api"; // Corrected import path

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAdmin = {
        username,
        password,
        role: "admin",
        code: "", // No code needed for admin
      };
      await addUser(newAdmin);
      alert("Admin added successfully!");
      setUsername("");
      setPassword("");
      setFullName("");
    } catch (err) {
      console.error(err);
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Add New Admin</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;
