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
      answer: "Linik girin kısaltın ve reklamlardan para kazanın",
    },
    {
      id: 2,
      question: "Nasıl Kullanılır?",
      answer: "Linik girin kısaltın ve reklamlardan para kazanın",
    },
    {
      id: 3,
      question: "Nasıl Kullanılır?",
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi cupiditate culpa eaque, rem odit natus
       iste modi fugit quod fugiat? Alias incidunt atque sed ad earum praesentium vero tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci beatae minima fugit cumque, maiores possimus mollitia earum ipsa est nemo alias tempore, in blanditiis reprehenderit, laboriosam ut officiis consequatur dolorum?`,
    },
    {
      id: 4,
      question: "Nasıl Kullanılır?",
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi cupiditate culpa eaque, rem odit natus
       iste modi fugit quod fugiat? Alias incidunt atque sed ad earum praesentium vero tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci beatae minima fugit cumque, maiores possimus mollitia earum ipsa est nemo alias tempore, in blanditiis reprehenderit, laboriosam ut officiis consequatur dolorum?`,
    },{
      id: 5,
      question: "Nasıl Kullanılır?",
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi cupiditate culpa eaque, rem odit natus
       iste modi fugit quod fugiat? Alias incidunt atque sed ad earum praesentium vero tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci beatae minima fugit cumque, maiores possimus mollitia earum ipsa est nemo alias tempore, in blanditiis reprehenderit, laboriosam ut officiis consequatur dolorum?`,
    },{
      id: 6,
      question: "Nasıl Kullanılır?",
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi cupiditate culpa eaque, rem odit natus
       iste modi fugit quod fugiat? Alias incidunt atque sed ad earum praesentium vero tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci beatae minima fugit cumque, maiores possimus mollitia earum ipsa est nemo alias tempore, in blanditiis reprehenderit, laboriosam ut officiis consequatur dolorum?`,
    },{
      id: 7,
      question: "Nasıl Kullanılır?",
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi cupiditate culpa eaque, rem odit natus
       iste modi fugit quod fugiat? Alias incidunt atque sed ad earum praesentium vero tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci beatae minima fugit cumque, maiores possimus mollitia earum ipsa est nemo alias tempore, in blanditiis reprehenderit, laboriosam ut officiis consequatur dolorum?`,
    },
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
        <span style={{fontSize:28, marginBottom:100}}>Sıkça sorulan Sorular</span>
        {faqs.map((faq, index) => (
          <div className="faq-card" key={index} >
            <button onClick={()=>handleTogleMenu(faq.id)} >
            <span>{faq.question}</span></button>
            <span className="faq-card-content"  id={faq.id} >{faq.answer}</span>
          </div>
        ))}
        <Link className="pages-links" to="/contactus">Sormaktan Çekinmeyin</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
