import React, { useEffect, useState } from "react";
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
import UpdateUrl from "../Url/UpdateUrl";
import { GetUserByIDAsync } from "../Api/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

function Profile() {
  const logined = Boolean(localStorage.getItem("logined"));
  const [selected, setSelect] = useState("/");
  const balancesatatus = useSelector((state) => state.balance.success);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(GetUserByIDAsync());
    dispatch(GetSiteDataBySiteName())
  }, [dispatch,balancesatatus]);
  console.log(user);
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
            <button
              style={{ color: "red" }}
              className="edit-btn"
              onClick={handlelogout}
            >
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
            <Route path="/updateurl/:Id" element={<UpdateUrl />} />
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

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("tr-TR", { month: "long" });
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${day}-${month}-${year} - ${hour}:${minute}`;
};