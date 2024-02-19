import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React from "react";
import "./ControlPanel.css";
import UpdateUser from '../User/UpdateUser';
import NotFound from '../Url/NotFound';
import Urls from './Urls';

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
        <div className='request-navbar'  >
          <Link to="/controlpanel/balance-requests" >Okunmuş Para Çekme</Link>
          <Link to="/controlpanel/help-requests" > Okunmamış Para Çekme </Link>
          <Link to="/controlpanel/help-requests" > Destek</Link>
          <Link to="/controlpanel/help-requests" >Tüm Kullanıcılar</Link>
          <Link to="/controlpanel/all-urls" >Tüm Linkler</Link>
          <Link to="/controlpanel/help-requests" >Sıkça sorulan Sorular</Link>
        </div>
        <Routes>
          <Route path="/balance-requests" element={<NotFound/>} />
          <Route path="/help-requests" element={<div>b</div>} />
          <Route path="/all-urls" element={<Urls/>} />
        </Routes>
      </div>
    </div>
  );
}

export default ControlPanel;
