import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./ControlPanel.css";
import UpdateUser from "../User/UpdateUser";
import NotFound from "../Url/NotFound";
import Urls from "./Urls";
import AllUsers from "./AllUsers";
import AllFaq from "./AllFaq";
import BalanceRequests from "./BalanceRequests";
import HelpRequests from "./HelpRequests";
import TopBar from "../Bars/TopBar";

function ControlPanel() {
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    setSelect(select);
  };
  const notPaid = 12
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
              Ödendi  { " (" + notPaid + ")"}
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
              Ödenmedi{ " (" + notPaid + ")"}
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
                selected === "allusers"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("allusers")}
              to="/controlpanel/allusers"
            >
              Tüm Kullanıcılar
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
              element={<HelpRequests asnswered={false} />}
            />
            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/allfaq" element={<AllFaq />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default ControlPanel;
