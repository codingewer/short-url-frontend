import React, { useState } from "react";
import "./ControlPanelGlobalStyle.css";
import trashicon from "../assets/icons/trash-icon.png";

function AllFaq() {
  const [faqs, setFaqs] = useState([
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
  ]);
  //remove item from array by id
  const removeItem = (id) => {
    //require alert aprove
    if (window.confirm("Bu soru/cevabı silmekten emin misiniz?")) {
      const updatedFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(updatedFaqs);
    }
    return;
  };
  return (
    <div className="cp-data-container">
      <div className="faq-container">
        <form className="cp-details-form">
          <h4>Sıkça Sorulan Sorular</h4>
          <label htmlFor="">Soru:</label>
          <textarea className="cp-form-inputs" type="text" />
          <label htmlFor="">Cevap:</label>
          <textarea
            className="cp-form-inputs"
            name="answer"
            id="answer"
          ></textarea>
          <button className="cp-form-btn">Yeni Soru Ekle</button>
        </form>
      </div>
      {faqs.map((faq) => (
        <div key={faq.id} className="cp-data-card">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
          <div className="cp-card-btns">
            <button onClick={() => removeItem(faq.id)}>
              <img src={trashicon} alt="sil" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllFaq;
