import React, { useState } from "react";
import "./SideBar.css";
import "../User/Profile.css";
import userico from "../assets/icons/icons8-login-50 1.svg";
import signinico from "../assets/icons/icons8-user-48 1.svg";

import logo from "../assets/logo.jpeg";
import logouticon from "../assets/icons/logout.png";
import { Link } from "react-router-dom";
import chartico from "../assets/icons/chartico.svg";
import shorturlico from "../assets/icons/shorturlico.svg";
import walletico from "../assets/icons/walletico.svg";
import supportico from "../assets/icons/supportico.svg";

function SideBar() {
  const logined = Boolean(localStorage.getItem("logined"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelect] = useState("/");
  const handlelogout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    alert("Çıkış yapıldı");
    window.location.href = "";
  };
  const handleActiveLink = (select) => {
    const linksMenu = document.getElementById("side-bar-options");
    linksMenu.classList.remove("side-bar-open");
    setSelect(select);
  };
  return (
    <div id="side-bar-options" className="side-bar">
      <Link
        style={{
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: 12,
        }}
        to="/"
        relative="path"
      >
        <img
          style={{
            borderRadius: 12,
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="logo-1-icon"
          loading="lazy"
          alt=""
          src={logo}
        />
      </Link>
      {
        !logined &&
      <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        position: "relative",
        gap: 24,
        top: 24,
        width: "80%",
      }}
      >
        <Link
          style={{
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
            top: 12,
            color: "#B888FF",
            backgroundColor: "#464a5f",
            width: "100%",
          }}
          to="/login"
          className="bar-btn1"
          >
          <img className="icons8-user-48-1" alt="" src={userico} />
          <div className="kayt-ol-wrapper">
            <div
              style={{
                color: "#B888FF",
              }}
              className="kayt-ol"
              >
              Giriş Yap
            </div>
          </div>
        </Link>
        <Link
          style={{
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
            top: 12,
            color: "#B888FF",
            backgroundColor: "#464a5f",
            width: "100%",
          }}
          to="/register"
          className="bar-btn1"
          >
          <img className="icons8-user-48-1" alt="" src={signinico} />
          <div className="kayt-ol-wrapper">
            <div
              style={{
                color: "#B888FF",
              }}
              className="kayt-ol"
              >
              Kayıt Ol
            </div>
          </div>
        </Link>
      </div>
      }
      {logined && (
        <div className="side-bar-navs">
        <Link
        to="/dashboard"
        onClick={() => handleActiveLink("/dashboard")}
        className={
          selected === "/dashboard"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <img
              style={{
                height: 32,
                width: 32,
              }}
              src={chartico}
              alt=""
            />
            İstatikler
          </Link>

          <Link
            to="/dashboard/shorturl"
            onClick={() => handleActiveLink("shorturl")}
            className={
              selected === "shorturl"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <img
              style={{
                height: 32,
                width: 32,
              }}
              src={shorturlico}
              alt=""
            />
            Link Kısalt
          </Link>

          <Link
            to="/dashboard/balance"
            onClick={() => handleActiveLink("balance")}
            className={
              selected === "balance"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <img
              style={{
                height: 32,
                width: 32,
              }}
              src={walletico}
              alt=""
            />
            Bakiye
          </Link>

          <Link
            to="/dashboard/help"
            onClick={() => handleActiveLink("help")}
            className={
              selected === "help"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <img
              style={{
                height: 24,
                width: 32,
              }}
              src={supportico}
              alt=""
            />
            Destek
          </Link>

          {user.Role === "admin" && (
            <Link
              to="/controlpanel"
              onClick={() => handleActiveLink("/controlpanel")}
              className="side-bar-item"
            >
              Control Panel
            </Link>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "calc(100% - 24px )",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          position: "absolute",
          bottom: 24,
        }}
      >
        {logined && (
          <button
            style={{ color: "orange" }}
            className="edit-btn"
            onClick={handlelogout}
          >
            Çıkış Yap
            <img src={logouticon} alt="Güncelle" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
