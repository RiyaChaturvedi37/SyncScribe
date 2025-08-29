import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new login

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Token ko localStorage me store karo
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");
      navigate("/dashboard"); // dashboard par le jao
    } catch (err) {
      setError(err.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;

