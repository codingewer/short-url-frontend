import React, { useEffect, useState } from "react";
import "./Profile.css";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";
import { Navigate, Route, Routes } from "react-router";
import BalanceRequest from "./BalanceRequest";
import DataChart from "./DataChart";
import SideBar from "../Bars/SideBar";
import ShortUrl from "../Url/ShortUrl";
import HelpReq from "./HelpReq";
import UpdateUser from "./UpdateUser";
import UpdateUrl from "../Url/UpdateUrl";
import { GetUserByIDAsync } from "../Api/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import SideBarDash from "../Bars/SideBarDash";
import { Link } from "react-router-dom";

function Profile() {
  const logined = Boolean(localStorage.getItem("logined"));
  const balancesatatus = useSelector((state) => state.balance.success);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handlelogout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Çıkış yapıldı");
    window.location.href = "/";
  };
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(GetUserByIDAsync(user?.ID));
    dispatch(GetSiteDataBySiteName());
  }, [dispatch, balancesatatus]);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <>
      {width < 1080 ? (
        <TopBar />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
            top: "48px",
          }}
        >
          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link
              className="form-btn"
              to="/dashboard/shorturl"
              style={{
                marginRight: "24px",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: 12,
              }}
            >
              Link Kısalt
            </Link>
          </div>
        </div>
      )}
      <SideBar />
      <div className="profile-container">
        <div className="profile-nav">
          <SideBarDash />
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
