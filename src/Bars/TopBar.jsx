import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import Profile from "../User/Profile";

function TopBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const [isToggled, setToggled] = useState(false);
  const handleTogleMenu = () => {
    const linksMenu = document.getElementById("link-drop-menu");
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };
  const handleCloseMenu = () => {
    const linksMenu = document.getElementById("link-drop-menu");
    linksMenu.style.display = "none";
  }
  const logined = Boolean(localStorage.getItem("logined"));
  return (
    <div>
      <div
        className={scrollPosition > 300 ? "window-scrolled navbar" : "navbar"}
      >
        <div className="navbar-container">
          <div className="top-bar-logo">
            <Link to="/" relative="path">
              <img src={logo} alt="" />
            </Link>
          </div>
          <button onClick={handleTogleMenu} type="button" className="menu-btn">
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </button>
          <div className="bar-btns">
            <Link className="menu-login-btn" to={logined ?"/dashboard" : "/login</div>"}  relative="path">
              {logined ? "Dashbord" : "Giriş Yap"}
            </Link>
          </div>
        </div>
      </div>
      <div id="link-drop-menu" className="link-drop-menu">
        <Link onClick={handleCloseMenu} to="/dashboard" className="topbar-url" >Dashboard</Link>
        <Link onClick={handleCloseMenu} className="topbar-url" >İletişim</Link>
        <Link onClick={handleCloseMenu} className="topbar-url" >S.S.S</Link>
        <Link onClick={handleCloseMenu} className="menu-login-btn" to={logined ?"/dashboard" : "/login</div>"}  relative="path">
              {logined ? "Dashbord" : "Giriş Yap"}
            </Link>
      </div>
    </div>
  );
}

export default TopBar;
