import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Login.css";
import logo from "../VKLogo.png";

console.log(logo);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" height={"50%"} width={"30%"}></img>
      <h1>Välkommen till din utbildning</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <a href="mailto:kundsupport@vkvattenskoter.com?subject=Forgot Password" class="italic-link"> 
          Forgot your password?
        </a>
        <button type="submit">
          <Link to="/HomePage" className="plain-link">
            Login
          </Link>
        </button>
      </form>
    </div>
  );
}

export default Login;