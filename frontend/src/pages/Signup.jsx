import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
function Signup() {
  document.title = "WireStack | SignUp";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { signup, error: signupError, loading } = useSignup();
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password, fullname, username);
  };
  return (
    <div className="login-wrapper">
      <form action="">
        <div className="header">
          <h1>SignUp</h1>
          <span>Become a WriteStacker </span>
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname || ""}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username || ""}
        />

        <button onClick={(e) => handleSignup(e)}>SignUp</button>
        <small>
          Already have and account ? <NavLink to="/login">Login</NavLink>
        </small>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
}

export default Signup;
