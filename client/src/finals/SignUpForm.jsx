import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../UserContext";

const SignUpForm = ({ onSwitchToLogin }) => {
  const { setUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await res.json();
      console.log("data: ");
      console.log(data);
      console.log(data.freshUser.name);

      setSuccess("Signup successful! Please log in.");
      // log in:
      localStorage.setItem("user", data.freshUser.name);
      setUser(data.freshUser.name);
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
        have an account already?
        <span onClick={onSwitchToLogin}> login</span>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default SignUpForm;
