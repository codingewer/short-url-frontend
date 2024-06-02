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
import bgbanner from "../assets/imgs/undraw_personal_information_re_vw8a.svg";
import { Helmet } from "react-helmet";

function Privacy() {
  const dispatch = useDispatch();
  const sitedata = useSelector((state) => state.settings.data);
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);
  const data =
    sitedata !== null
      ? sitedata
      : {
          Privacy: "Gizlilik",
        };
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Helmet>
        <title>Linkamon | Gizlilik Politikası</title>
        <meta
          name="description"
          content="Kullanıcılarmızın gizliliğine linkamon.com olarak önem veriyoruz."
        />
        <meta name="keywords" content="gizlilik, gizlilik politikası" />
        <meta property="og:title" content="Linkamon | Gizlilik Politikası" />
        <meta property="og:description" content="Kullanıcılarmızın gizliliğine linkamon.com olarak önem veriyoruz." />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsfggqsdp/image/upload/v1717322360/shorturl/ohqcrxshtgjabzvr4w2n.svg"
        />
      </Helmet>
      <TopBar />
      <div data-aos="fade-up" className="contacus-page">
        <div className="faq-banner">
          <div className="home-banner">
            <div className="home-banner-inner">
              <div className="frame-parent">
                <div className="link-shortener-parent">
                  <div className="link-shortener">
                    <h1 className="link-ksaltn">Gizlilik</h1>
                    <h1 className="para-kazann">Politikası</h1>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="undraw-link-shortener-mvf6-1-icon"
              loading="lazy"
              alt=""
              src={bgbanner}
            />
          </div>
        </div>
        <div className="contactus-content">
          <div dangerouslySetInnerHTML={{ __html: data.PrivacyPolicy }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
