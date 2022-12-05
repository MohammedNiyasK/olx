import React, { useState } from "react";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signInUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInUser(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
          <p>Signup</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
