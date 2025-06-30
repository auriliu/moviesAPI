// LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle login

    setError("");

    try {
      const res = await fetch("http://localhost:9000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "login failed");
        return;
      }

      const data = await res.json();
      console.log(data);

      navigate("/");
    } catch {
      setError("network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">login</button>
      <p>
        don't have an account yet?
        <span onClick={onSwitchToSignUp}> sign up</span>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
