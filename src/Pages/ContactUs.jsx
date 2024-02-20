import React from "react";
import "./ContacUs.css";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";

function ContactUs() {
  return (
    <>
      <TopBar />
      <div className="contacus-page">
        <div className="faq-banner"></div>
        <div className="contactus-content">
          <div className="about-us-text">
            <span style={{ fontSize: 24, fontWeight: 500 }}>Hakkımızda</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              accusantium, temporibus ab aut deserunt, quis corrupti unde ipsum
              non provident fuga soluta facilis. Nulla dolor natus esse odit
              quaerat illum! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Neque autem, hic illo excepturi quam animi dicta dolore
              nesciunt voluptatibus adipisci voluptas ducimus at nisi! Sequi
              perferendis et tempore iure vero? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Et eaque voluptatum eius ad non ea.
              Quisquam quam sit dolor sint. Ullam voluptatibus quae iste cumque,
              quo excepturi quod culpa porro?
            </p>
          </div>
          <div className="contacktus-form-container">
            <form className="contactus-form" action="">
              <span style={{ fontSize: 24, fontWeight: 500, marginBottom: 50 }}>
                İletişim Formu
              </span>
              <label htmlFor="name">İsim Soyisim:</label>
              <input
                className="contacus-from-inputs"
                type="text"
                name="name"
                id="name"
              />
              <label htmlFor="emain">Mail Adresiniz:</label>
              <input className="contacus-from-inputs" type="email" />
              <label htmlFor="Metin">Mesajınız:</label>
              <textarea
                className="contacus-from-inputs"
                name="message"
                id="message"
                cols="30"
                rows="10"
              />
              <button>Gönder</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
