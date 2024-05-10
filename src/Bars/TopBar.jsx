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
                        <div className="deme-kantlar-container">
              <Link to="/controlpanel" className="deme-kantlar">
                Controlpanel
              </Link>
              </div>
            )}
            <div className="deme-kantlar-container">
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
