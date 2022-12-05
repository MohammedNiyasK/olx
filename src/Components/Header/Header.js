import React from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { UserContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("user is signed out");
      }
    });
  }, [setUser]);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
       <Link to ="/"><OlxLogo></OlxLogo></Link>   
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user.displayName ? (
              `Hello  ${user.displayName}`
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                login
              </Link>
            )}
          </span>

          <hr />
        </div>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            signOut(auth)
              .then(() => {
                navigate("/login");
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          {user && "Logout"}
        </span>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
         <Link to="/create" ><SellButtonPlus></SellButtonPlus></Link>   
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
