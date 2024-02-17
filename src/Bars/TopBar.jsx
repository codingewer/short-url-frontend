import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

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
  return (
    <div>
      <div
        className={scrollPosition > 500 ? "window-scrolled navbar" : "navbar"}
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
            <Link className="menu-login-btn" to="/login" relative="path">
              Giriş
            </Link>
          </div>
        </div>
      </div>
      <div id="link-drop-menu" className="link-drop-menu">
        <Link className="topbar-url" >Hakkımızda</Link>
        <Link className="topbar-url" >İletişim</Link>
        <Link className="topbar-url" >S.S.S</Link>
        <Link className="menu-login-btn" to="/login" relative="path">
          Giriş
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
