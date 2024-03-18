import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./ControlPanel.css";
import AllUsers from "./AllUsers";
import AllFaq from "./AllFaq";
import BalanceRequests from "./BalanceRequests";
import HelpRequests from "./HelpRequests";
import TopBar from "../Bars/TopBar";
import UpdateSiteSettings from "./UpdateSiteSettings";
import UpdateFaq from "./UpdateFaq";
import UserPage from "../User/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSeenLengthAsync } from "../Api/ChartData/ChartSlice";
import UpdateUrlFaq from "./UpdateUrlFaq";
import UrlFaqs from "./UrlFaqs";

function ControlPanel() {
  const user = JSON.parse(localStorage.getItem("user"));
  const allseen = useSelector((state) => state.chardata.seenlenght)
  const dispatch = useDispatch()
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    setSelect(select);
  };
  const domain = window.location.href;
  const dom2 = domain.split("/controlpanel/");
  useEffect(() => {
    dispatch(GetAllSeenLengthAsync())
    setSelect(dom2[1]);
  },[dispatch])
  return (
    <>
      <TopBar />
      <div className="control-panel">
        <div className="site-details-faq">
          <div className="allseens-length">
          <span>{allseen}</span>
          <h4>Toplam Görüntülenme</h4>
          </div>
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
              S.S.S
            </Link>
            <Link
              className={
                selected === "allursfaqs"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("allursfaqs")}
              to="/controlpanel/allursfaqs"
            >
              Link Sayafası S.S.S
            </Link>
            <Link
              className={
                selected === "users"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("users")}
              to="/controlpanel/users"
            >
              Tüm Kullanıcılar
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
            <Route path="/allursfaqs" element={<UrlFaqs/>} />
            <Route path="/faqs/update/:id" element={<UpdateFaq />} />
            <Route path="/urlfaqs/update/:id" element={<UpdateUrlFaq/>} />
            <Route path="/settings" element={<UpdateSiteSettings />} />
            <Route path="/users" element={<AllUsers/>}  />
            <Route path="/user/:id" element={<UserPage/>}  />
          </Routes>
        </div>
      </div>
      {!user.Admin && (window.location.href= "/dashboard") }
    </>
  );
}

export default ControlPanel;
