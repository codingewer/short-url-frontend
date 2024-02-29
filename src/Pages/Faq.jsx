import React, { useState } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";
import { Link } from "react-router-dom";

function Faq() {
  const faqs = [
    {
      id: 1,
      question: "Nasıl Kullanılır?",
      answer:
        "Kayıt olun ve Dashboard kısmından ayarlardan ödeme bilgilerinizi girin ondan sonra kısalttığınız linklere basıldıkça reklam geliri elde edin.",
    },
    {
      id: 2,
      question: "Bakiyemi nasıl çekebilirim?",
      answer:
        "Açılır menüden veya dashboard kısmındaki menüden bakiye sekmesine basıp bakiyenizi öğrenip 10 lira ve üzeri istediğinz miktarı talep edebilirsiniz.",
    }
  ];
  const [isToggled, setToggled] = useState(false);
  const handleTogleMenu = (id) => {
    const linksMenu = document.getElementById(id);
    setToggled(!isToggled);
    isToggled
      ? (linksMenu.style.display = "flex")
      : (linksMenu.style.display = "none");
  };
  return (
    <>
      <TopBar />
      <div className="faq-page">
        <div className="faq-banner"></div>
        <div className="faq-content">
          <span style={{ fontSize: 28, marginBottom: 100 }}>
            Sıkça sorulan Sorular
          </span>
          {faqs.map((faq, index) => (
            <div className="faq-card" key={index}>
              <button onClick={() => handleTogleMenu(faq.id)}>
                <span>{faq.question}</span>
              </button>
              <span className="faq-card-content" id={faq.id}>
                {faq.answer}
              </span>Bakiye  TL'den az
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
