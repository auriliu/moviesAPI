// SignUpForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle sign up
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:9000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Signup successful! Please log in.");
      // log in:
      setName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      setError("Network error");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button type="submit">sign up</button>
      <p>
        already have an account?
        <span onClick={onSwitchToLogin}> login</span>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default SignUpForm;
