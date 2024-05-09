import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import "./AboutUs.css";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import { useSelector } from "react-redux";
import { GetSiteDataBySiteName } from '../Api/Settings/SettingsSlice';

function Privacy() {
  const dispatch = useDispatch();
  const sitedata = useSelector((state)=> state.settings.data)
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  },[dispatch]);
  const data = sitedata !== null ? sitedata : {
    Privacy:"Gizlilik"
  }
  return (
    <>
      <TopBar />
      <div className="contacus-page">
        <div className="faq-banner"></div>
        <div className="contactus-content">
          <div className="about-us-text">
            <span style={{ fontSize: 24, fontWeight: 500 }}>Gizlilik Politikası</span>

            <div  dangerouslySetInnerHTML={{ __html: data.PrivacyPolicy }}>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
