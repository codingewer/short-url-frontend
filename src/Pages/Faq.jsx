import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { GetAllFaqsAsync } from "../Api/Faq/FaqSlice";
import bgbanner from "../assets/imgs/undraw_questions_re_1fy7.svg";

function Faq() {
  const faqs = useSelector((state) => state.faqs.items);
  const dispatch = useDispatch();
  const [isToggled, setToggled] = useState(true);

  const handleTogleMenu = (id) => {
    const linksMenu = document.getElementById(id);
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };

  useEffect(() => {
    dispatch(GetAllFaqsAsync());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Linkamon | S.S.S.";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <TopBar />
      <div data-aos="fade-up" className="faq-page">
        <div className="faq-banner">
          <div className="home-banner">
            <div className="home-banner-inner">
              <div className="frame-parent">
                <div className="link-shortener-parent">
                  <div className="link-shortener">
                    <h1 className="link-ksaltn">Sıkça Sorulan</h1>
                    <h1 className="para-kazann">Sorular</h1>
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
        <div className="faq-content">
          {faqs !== null
            ? faqs.map((faq, index) => (
                <div className="faq-card" key={index}>
                  <button onClick={() => handleTogleMenu(faq.ID)}>
                    <span>{faq.Question}</span>
                  </button>
                  <span className="faq-card-content" id={faq.ID}>
                    {faq.Answer}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
