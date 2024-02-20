import React, { useState } from "react";
import rejecticon from "../assets/icons/close-icon.png";
import doneicon from "../assets/icons/done-icon.png";
import "./ControlPanelGlobalStyle.css";

function Helphelpreqs(props) {
  const [helpreqsTrue, sethelpreqsTrue] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
  ]);

  const [helpreqsFalse, sethelpreqsFalse] = useState([
    {
      id: 4,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 5,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 6,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores 
      consequuntur, facere neque! Quis maiores sint, temporibus 
      tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: false,
    },
  ]);
  const helpreqs = props.answered ? helpreqsTrue : helpreqsFalse;
  const changeAnswered = (id) => {
    const helpreq = helpreqs.find((req) => req.id === id);
    const answeredStatus = helpreq.answered
      ? "cevapladığınızdan"
      : "Cevaplamdığınızdan";
    if (
      window.confirm(
        helpreq.name +
          " kişisinin sorununu " +
          answeredStatus +
          " emin misiniz?"
      )
    ) {
      helpreq.answered = !helpreq.answered;
      if (helpreq.answered === true) {
        const updateReqs = helpreqsFalse.filter((requ) => requ.id !== id);
        sethelpreqsFalse(updateReqs);
        helpreqsTrue.push(helpreq);
      } else {
        const updateReqs = helpreqsTrue.filter((requ) => requ.id !== id);
        sethelpreqsTrue(updateReqs);
        helpreqsFalse.push(helpreq);
      }
    }
  };
  return (
    <div className="cp-data-container">
      {helpreqs.map((helpreq) => (
        <div key={helpreq.id} className="cp-data-card">
          <h4>{helpreq.name}</h4>
          <p>{helpreq.email}</p>
          <p>{helpreq.content}</p>
          <p>{helpreq.balance}</p>
          <p>{helpreq.date}</p>
          <p style={{ color: helpreq.answered ? "green" : "red" }}>
            {helpreq.answered ? "cevaplandı" : "cevaplanmadı"}
          </p>
          <div className="cp-card-btns">
            <button onClick={() => changeAnswered(helpreq.id)}>
              <img
                src={helpreq.answered ? rejecticon : doneicon}
                alt="ödendi/ödenmedi"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Helphelpreqs;
