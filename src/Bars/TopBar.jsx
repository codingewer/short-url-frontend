import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

function TopBar() {
  const user = JSON.parse(localStorage.getItem("user"));
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

  const [isToggled, setToggled] = useState(true);
  const handleTogleMenu = () => {
    const linksMenu = document.getElementById("side-bar-options");
    setToggled(!isToggled);
    isToggled
      ? linksMenu.classList.add("side-bar-open")
      : linksMenu.classList.remove("side-bar-open");
  };
  const handleCloseMenu = () => {
    const linksMenu = document.getElementById("link-drop-menu");
    linksMenu.classList.add("side-bar-open");
  };
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
          {
            logined &&
          <Link className="menu-short-btn" to="/dashboard/shorturl">
            link Kısalt
          </Link>
          }
          <button onClick={handleTogleMenu} type="button" className="menu-btn">
            <div
              className={
                scrollPosition > 300 ? "menu-bar-scrolled menu-bar" : "menu-bar"
              }
            ></div>
            <div
              className={
                scrollPosition > 300 ? "menu-bar-scrolled menu-bar" : "menu-bar"
              }
            ></div>
            <div
              className={
                scrollPosition > 300 ? "menu-bar-scrolled menu-bar" : "menu-bar"
              }
            ></div>
          </button>
          <div className="bar-btns">
            <Link
              to="/aboutus"
              onClick={handleCloseMenu}
              className={
                scrollPosition > 300 ? "window-scrolled-links" : "topbar-links"
              }
            >
              Hakkımızda
            </Link>
            {user && user.Role === "admin" && (
              <Link to="/controlpanel" className="menu-login-btn">
                Controlpanel
              </Link>
            )}
            <Link
              className="menu-login-btn"
              to={logined ? "/dashboard" : "/login"}
              relative="path"
            >
              {logined ? "Dashbord" : "Giriş Yap"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
