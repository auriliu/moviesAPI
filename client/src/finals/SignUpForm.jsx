// SignUpForm.jsx
import React, { useState } from "react";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle sign up
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
    </form>
  );
};

export default SignUpForm;
