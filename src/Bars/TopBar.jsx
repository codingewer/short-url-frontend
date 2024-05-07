import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../assets/logo.jpeg";
import userico from "../assets/icons/icons8-login-50 1.svg";
import signinico from "../assets/icons/icons8-user-48 1.svg";
import menuico from "../assets/icons/menu-ico.svg";
import { Link } from "react-router-dom";

function TopBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
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
    /*
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
    </div>*/
    <div className="top-bar-container">
      <div className="top-bar">
        <Link to="/" relative="path">
          <img className="logo-1-icon" loading="lazy" alt="" src={logo} />
        </Link>
        <div className="component-1">
          <div className="component-1-child" />
          <div className="component-1-item" />
          <div className="component-1-inner" />
        </div>
        <div className="top-bar-inner">
          <div className="frame-parent-top">
          {user && user.Role === "admin" && (
                        <div className="deme-kantlar-wrapper">
              <Link to="/controlpanel" className="deme-kantlar">
                Controlpanel
              </Link>
              </div>
            )}
            <div className="deme-kantlar-wrapper">
              <Link to="/dashboard/shorturl" className="deme-kantlar">
                Link Kısalt
              </Link>
            </div>
            <div className="deme-kantlar-wrapper">
              <Link to="/aboutus" className="deme-kantlar">
                Hakkımızda
              </Link>
            </div>
            <div className="deme-kantlar-container">
              <Link to="/paid" className="deme-kantlar">
                Ödeme Kanıtları
              </Link>
            </div>
            <div className="button-bar">
              <button className="bar-btn">
                <img
                  className="icons8-login-50-1"
                  alt=""
                  src={logined ? signinico : userico}
                />
                <div className="giri-yap-wrapper">
                  <Link
                    className="giri-yap"
                    to={logined ? "/dashboard" : "/login"}
                    relative="path"
                  >
                    {logined ? "Dashbord" : "Giriş Yap"}
                  </Link>
                </div>
              </button>
              {!logined && (
                <Link to="/register" className="bar-btn1">
                  <img className="icons8-user-48-1" alt="" src={signinico} />
                  <div className="kayt-ol-wrapper">
                    <div className="kayt-ol">Kayıt Ol</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <button className="menu-btn" onClick={handleTogleMenu}>
          <img className="menu-ico" alt="menu" src={menuico} />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
