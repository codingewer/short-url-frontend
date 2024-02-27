import React, { useState } from "react";
import logouticon from "../assets/icons/logout.png";
import "./Profile.css";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";
import { Navigate, Route, Routes } from "react-router";
import BalanceRequest from "./BalanceRequest";
import DataChart from "./DataChart";
import { Link } from "react-router-dom";
import SideBar from "../Bars/SideBar";
import ShortUrl from "../Url/ShortUrl";
import HelpReq from "./HelpReq";
import UpdateUser from "./UpdateUser";

function Profile() {
  const logined = Boolean(localStorage.getItem("logined"));
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    setSelect(select);
  };
  const handlelogout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Çıkış yapıldı");
    window.location.href = "/";
  };

  return (
    <>
      <SideBar />
      <div className="profile-container">
        <div className="profile-nav">
          <div className="navlinks">
            <Link
              to="/dashboard"
              onClick={() => handleActiveLink("/dashboard")}
              className={
                selected === "/dashboard" ? "navlink-active" : "navlink"
              }
            >
              İstatikler
            </Link>
            <Link
              to="/dashboard/shorturl"
              onClick={() => handleActiveLink("/dashboard/shorturl")}
              className={
                selected === "/dashboard/shorturl"
                  ? "navlink-active"
                  : "navlink"
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
              to="/dashboard/help"
              onClick={() => handleActiveLink("/dashboard/help")}
              className={
                selected === "/dashboard/help" ? "navlink-active" : "navlink"
              }
            >
              Destek
            </Link>
            <Link
              to="/dashboard/settings"
              onClick={() => handleActiveLink("/dashboard/settings")}
              className={
                selected === "/dashboard/settings"
                  ? "navlink-active"
                  : "navlink"
              }
            >
              Ayarlar
            </Link>
          </div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <button style={{color:"red"}} className="edit-btn" onClick={handlelogout}>
              Çıkış Yap
              <img src={logouticon} alt="Güncelle" />
            </button>
          </div>
        </div>
        <div className="profile-pages">
          <Routes>
            <Route path="/" element={<DataChart />} />
            <Route path="/balance" element={<BalanceRequest />} />
            <Route path="/shorturl" element={<ShortUrl />} />
            <Route path="/help" element={<HelpReq />} />
            <Route path="/settings" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <TopBar />
      {!logined && <Navigate to="/" />}
    </>
  );
}

export default Profile;
