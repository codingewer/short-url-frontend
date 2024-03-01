import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./ControlPanel.css";
import AllUsers from "./AllUsers";
import AllFaq from "./AllFaq";
import BalanceRequests from "./BalanceRequests";
import HelpRequests from "./HelpRequests";
import TopBar from "../Bars/TopBar";
import UpdateSiteSettings from "./UpdateSiteSettings";

function ControlPanel() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    setSelect(select);
  };
  const domain = window.location.href;
  const dom2 = domain.split("/controlpanel/");
  useEffect(() => {
    setSelect(dom2[1]);
    console.log(dom2[1]);
  },[])
  return (
    <>
      <TopBar />
      <div className="control-panel">
        <div className="site-details-faq">
          <div className="request-navbar">
            <Link
              className={
                selected === "/" ? "cp-navbar-item-selected" : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("/")}
              to="/controlpanel/"
            >
              Ödendi
            </Link>
            <Link
              className={
                selected === "balance-requests-notpaid"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("balance-requests-notpaid")}
              to="/controlpanel/balance-requests-notpaid"
            >
              Ödenmedi
            </Link>
            <Link
              className={
                selected === "help-requests-answered"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("help-requests-answered")}
              to="/controlpanel/help-requests-answered"
            >
              Cevaplanmış Destekler
            </Link>
            <Link
              className={
                selected === "help-requests-notanswered"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("help-requests-notanswered")}
              to="/controlpanel/help-requests-notanswered"
            >
              Cevaplanmamış Destekler
            </Link>
            <Link
              className={
                selected === "allfaq"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("allfaq")}
              to="/controlpanel/allfaq"
            >
              Sıkça sorulan Sorular
            </Link>
            <Link
              className={
                selected === "settings"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("settings")}
              to="/controlpanel/settings"
            >
              Ayarlar
            </Link>
          </div>
        </div>
        <div className="requests">
          <Routes>
            <Route path="/" element={<BalanceRequests paid={true} />} />
            <Route
              path="/balance-requests-notpaid"
              element={<BalanceRequests paid={false} />}
            />
            <Route
              path="/help-requests-answered"
              element={<HelpRequests answered={true} />}
            />
            <Route
              path="/help-requests-notanswered"
              element={<HelpRequests answered={false} />}
            />
            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/allfaq" element={<AllFaq />} />
            <Route path="/settings" element={<UpdateSiteSettings />} />
          </Routes>
        </div>
      </div>
      {!user.Admin && (window.location.href= "/dashboard") }
    </>
  );
}

export default ControlPanel;
