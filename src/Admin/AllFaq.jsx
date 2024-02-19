import React from "react";
import "./ControlPanelGlobalStyle.css";

function AllFaq() {
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
  ];
  return (
    <div className="cp-data-container">
    {faqs.map((faq) => (
      <div key={faq.id} className="cp-data-card">
        <h3>{faq.question}</h3>
        <p>{faq.answer}</p>
      </div>
    ))}
  </div>
  );
}

export default AllFaq;
