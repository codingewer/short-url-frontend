import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-bar">
      <div className="footer-container">
        <div className="footer-company">
          <span>2024 tüm hakları saklıdır</span>
        </div>
        <div className="footer-urls">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/register">Kayıt Ol</Link>
          <Link to="/aboutus" >Hakkımızda</Link>
          <Link to="/terms" >Kullanım Şartları</Link>
          <Link to="/privacy" >Gizlilik Politikası</Link>
          <Link to="/paid" >Ödeme Kanıtları</Link>
          <Link to="/faq" >S.S.S</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
