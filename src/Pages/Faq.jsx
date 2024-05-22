import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { GetAllFaqsAsync } from '../Api/Faq/FaqSlice';

function Faq() {
  
  const faqs = useSelector(((state) => state.faqs.items))
  const dispatch = useDispatch();
  const [isToggled, setToggled] = useState(false);
  const handleTogleMenu = (id) => {
    const linksMenu = document.getElementById(id);
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };

  useEffect(() => {
    dispatch(GetAllFaqsAsync())
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Linkamon | S.S.S.';
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <TopBar />
      <div data-aos="fade-up"  className="faq-page">
        <div className="faq-banner"></div>
        <div className="faq-content">
          <span style={{ fontSize: 28, marginBottom: 100 }}>
            Sıkça sorulan Sorular
          </span>
          {
          faqs !== null ?
          faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <button onClick={() => handleTogleMenu(faq.ID)}>
                <span>{faq.Question}</span>
              </button>
              <span className="faq-card-content" id={faq.ID}>
                {faq.Answer}
              </span>
            </div>
          ))  : null
        
        }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
