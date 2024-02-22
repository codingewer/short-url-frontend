import React, { useState } from "react";
import "./SideBar.css";
import "../User/Profile.css";
import logouticon from "../assets/icons/logout.png";
import { Link } from "react-router-dom";

function SideBar() {
  const handlelogout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    alert("Çıkış yapıldı");
    window.location.href = "";
  };
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    const linksMenu = document.getElementById("side-bar-options");
    linksMenu.classList.remove("side-bar-open");
    setSelect(select);
  };
  return (
    <div id="side-bar-options" className="side-bar">
      <div className="navlinks">
        <Link
          to="/dashboard"
          onClick={() => handleActiveLink("/dashboard")}
          className={selected === "/dashboard" ? "navlink-active" : "navlink"}
        >
          İstatikler
        </Link>
        <Link
          to="/dashboard/shorturl"
          onClick={() => handleActiveLink("/dashboard/shorturl")}
          className={
            selected === "/dashboard/shorturl" ? "navlink-active" : "navlink"
          }
        >
          link Kısalt
        </Link>
        <Link
          to="/dashboard/balance"
          onClick={() => handleActiveLink("/dashboard/balance")}
          className={
            selected === "/dashboard/balance" ? "navlink-active" : "navlink"
          }
        >
          Bakiye
        </Link>
        <Link
          to="dashboard/help"
          onClick={() => handleActiveLink("/dashboard/help")}
          className={
            selected === "/dashboard/help" ? "navlink-active" : "navlink"
          }
        >
          Destek
        </Link>
        <Link
          to="dashboard/settings"
          onClick={() => handleActiveLink("/dashboard/settings")}
          className={
            selected === "/dashboard/settings" ? "navlink-active" : "navlink"
          }
        >
          Ayarlar
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{ color: "orange" }}
          className="edit-btn"
          onClick={handlelogout}
        >
          Çıkış Yap
          <img src={logouticon} alt="Güncelle" />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
