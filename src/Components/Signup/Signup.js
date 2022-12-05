import React, { useState } from "react";

import Logo from "../../olx-logo.png";

import { collection, addDoc } from "firebase/firestore";

import "./Signup.css";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createUser(email, password);

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      await addDoc(collection(db, "users"), {
        userName:userName,
        email: email,
        phoneNumber: phone,
        uid: res.user.uid,
      });
      if (res) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    } catch (e) {
      setError(e.message);
      console.log(error);
    }

    setuserName("");
    setPhone("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => setuserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={userName}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="John"
            value={email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
}
