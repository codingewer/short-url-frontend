import React, { useState } from "react";
import "./ControlPanelGlobalStyle.css";
import trashicon from "../assets/icons/trash-icon.png";

function AllFaq() {
  const [faqs, setFaqs] =useState([
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
  ])
  //remove item from array by id
  const removeItem = (id) => {
    //require alert aprove
    if (window.confirm("Bu soru/cevabı silmekten emin misiniz?")) {
      const updatedFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(updatedFaqs);
    }
    return;
  }
  return (
    <div className="cp-data-container">
    {faqs.map((faq) => (
      <div key={faq.id} className="cp-data-card">
        <h3>{faq.question}</h3>
        <p>{faq.answer}</p>
        <div className="cp-card-btns">
          <button onClick={()=>removeItem(faq.id)} ><img src={trashicon} alt="sil" /></button>
        </div>
      </div>
    ))}
  </div>
  );
}

export default AllFaq;
