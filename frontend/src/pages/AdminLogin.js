// src/pages/AdminLogin.js
import React, { useState } from "react";

function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "luli123") {
      localStorage.setItem("isAdmin", "1");
      window.location.href = "/admin";
    } else {
      alert("Password gabim!");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "80px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Shkruaj passwordin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Hyr
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
