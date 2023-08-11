import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
function Login() {
  document.title = "WireStack | Login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error: loginError, loading } = useLogin();
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (loginError) {
      console.log(loginError);
    }
  };
  return (
    <div className="login-wrapper">
      <form action="">
        <div className="header">
          <h1>Login</h1>
          <span>Login and start blogging</span>
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
        <button onClick={(e) => handleLogin(e)}>Login</button>
        <small>
          Not a user ? <NavLink to="/signup">Signup</NavLink>
        </small>
        {loginError && <span className="error">{loginError}</span>}
      </form>
    </div>
  );
}

export default Login;
