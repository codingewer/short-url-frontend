import React from "react";
import "./AboutUs.css";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import "./Faq.css";

function AboutUs() {
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
