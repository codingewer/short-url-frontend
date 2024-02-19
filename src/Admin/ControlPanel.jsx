import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import "./ControlPanel.css";
import UpdateUser from "../User/UpdateUser";
import NotFound from "../Url/NotFound";
import Urls from "./Urls";
import AllUsers from "./AllUsers";
import AllFaq from "./AllFaq";
import BalanceRequests from "./BalanceRequests";
import HelpRequests from "./HelpRequests";

function ControlPanel() {
  return (
    <div className="control-panel">
      <div className="site-details-faq">
        <div className="site-details">
          <form className="cp-details-form">
            <h4>Site Detayları</h4>
            <label htmlFor="">Görüntülenme başı kazanç:</label>
            <input
              min={0.0}
              className="cp-form-inputs"
              type="number"
              step="0.01"
            />
            <label htmlFor="">Hakkımızda:</label>
            <textarea
              className="cp-form-inputs"
              name="aboutUs"
              id="aboutUs"
            ></textarea>
            <button className="cp-form-btn">Kaydet</button>
          </form>
        </div>
        <div className="faq-container">
          <form className="cp-details-form">
            <h4>Sıkça Sorulan Sorular</h4>
            <label htmlFor="">Soru:</label>
            <textarea className="cp-form-inputs" type="text" />
            <label htmlFor="">Cevap:</label>
            <textarea
              className="cp-form-inputs"
              name="answer"
              id="answer"
            ></textarea>
            <button className="cp-form-btn">Yeni Soru Ekle</button>
          </form>
        </div>
      </div>
      <div className="requests">
        <div className="request-navbar">
          <Link to="/controlpanel/balance-requests-paid">Ödendi</Link>
          <Link to="/controlpanel/balance-requests-notpaid"> Ödenmedi </Link>
          <Link to="/controlpanel/help-requests-answered">Cevaplanmış Destekler</Link>
          <Link to="/controlpanel/help-requests-notanswered">Cevaplanmamış Destekler</Link>
          <Link to="/controlpanel/AllUsers">Tüm Kullanıcılar</Link>
          <Link to="/controlpanel/all-urls">Tüm Linkler</Link>
          <Link to="/controlpanel/allfaq">Sıkça sorulan Sorular</Link>
        </div>
        <Routes>
          <Route path="/balance-requests-paid" element={<BalanceRequests paid={true} />} />
          <Route path="/balance-requests-notpaid" element={<BalanceRequests paid={false} />} />
          <Route path="/help-requests-answered" element={<HelpRequests answered={true} />} /> 
          <Route path="/help-requests-notanswered" element={<HelpRequests asnswered= {false}/>} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/all-urls" element={<Urls />} />
          <Route path="/allfaq" element={<AllFaq />} />
        </Routes>
      </div>
    </div>
  );
}

export default ControlPanel;
