import React from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <div className="top-bar-logo">
            <Link to="/" relative="path">
            <img src={logo} alt="" />
            </Link>
          </div>
          <div className="bar-btns">
            <Link to="/login" relative="path">
              Giriş
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
