import React from "react";

function HelpRequests(props) {
  const helpreqsTrue = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
  ];

  const helpreqsFalse = [
    {
      id: 1,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 3,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 3,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: false,
    },
  ];
  const helpreqs = props.answered ? helpreqsTrue : helpreqsFalse;
  return (
    <div className="cp-data-container">
      {helpreqs.map((balancereq) => (
        <div key={balancereq.id} className="cp-data-card">
          <h4>{balancereq.name}</h4>
          <p>{balancereq.email}</p>
          <p>{balancereq.content}</p>
          <p>{balancereq.balance}</p>
          <p>{balancereq.date}</p>
          <p style={{ color: balancereq.answered ? "green" : "red" }}>
            {balancereq.answered ? "cevaplandı" : "cevaplanmadı"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HelpRequests;
