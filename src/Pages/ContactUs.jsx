import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import "./AboutUs.css";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import { useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import bgbanner from "../assets/imgs/undraw_contact_us_re_4qqt.svg";
import { Helmet } from "react-helmet";

function ContactUs() {
  const dispatch = useDispatch();
  const sitedata = useSelector((state) => state.settings.data);
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);
  const data =
    sitedata !== null
      ? sitedata
      : {
          AboutUs: "İletişim",
        };
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    Aos.init({ duration: 2000 });
  }, []);
  console.log(sitedata);
  return (
    <>
      <Helmet>
        <title>Linkamon | iletişim</title>
        <meta name="description" content="Bizimle iletişime geçin." />
        <meta
          name="keywords"
          content="iletişim, bizimle iletişme geçin, email, telefon, adres"
        />
        <meta property="og:title" content="Linklerinize değer katın" />
        <meta property="og:url" content="https:/linkamon.com" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsfggqsdp/image/upload/v1716366576/shorturl/ecrixcwzianjh4xtgpix.png"
        />
      </Helmet>
      <TopBar />
      <div data-aos="fade-up" className="contacus-page">
        <div className="faq-banner">
          <div className="contacus-banner">
            <div className="contactus-banner-inner">
              <div>
                <h1 className="contacus-title">İletişim</h1>
                <div className="contact-info-us-content">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="contactus-conten-title">Mail Adresi:</span>
                    <span className="contactus-conten-subtitle">
                      {sitedata?.ContactEmail}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="contactus-conten-title">Telefon:</span>
                    <span className="contactus-conten-subtitle">
                      {sitedata?.ContactNumber}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="contactus-conten-title">Adres:</span>
                    <span className="contactus-conten-subtitle">
                      {sitedata?.Address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="undraw-link-shortener-mvf6-1-icon"
              loading="lazy"
              alt="iletişim"
              src={bgbanner}
            />
          </div>
        </div>
        <div className="contactus-content"></div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
