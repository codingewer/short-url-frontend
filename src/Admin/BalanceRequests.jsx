import React, { useState } from "react";
import rejecticon from "../assets/icons/reject-icon.png";
import doneicon from "../assets/icons/done-icon.png";

function BalanceRequests(props) {
  const [balancereqsTrue, setbalancereqsTrue] = useState([
    {
      id: 1,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 13,
      date: "12.01.2024",
      paid: true,
    },
    {
      id: 2,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 24,
      date: "12.01.2024",
      paid: true,
    },
    {
      id: 3,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 10,
      date: "12.01.2024",
      paid: true,
    },
  ]);

  const [balancereqsFalse, setbalancereqsFalse] = useState([
    {
      id: 4,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 12,
      date: "12.01.2024",
      paid: false,
    },
    {
      id: 5,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 100,
      date: "12.01.2024",
      paid: false,
    },
    {
      id: 6,
      name: "John Doe",
      iban: "TR123456678909876543",
      email: "john@example.com",
      balance: 25,
      date: "12.01.2024",
      paid: false,
    },
  ]);
  //find item by id from array

  const balancereqs = props.paid ? balancereqsTrue : balancereqsFalse;
  const changePaid = (id) => {
    const request = balancereqs.find((req) => req.id === id);
    const paidStatus = request.paid ? "ödemediğinzde" : "ödediğinizden";
    if (
      window.confirm(
        request.name + " kişisinin parasını " + paidStatus + " emin misiniz?"
      )
    ) {
      request.paid = !request.paid;
      if ((request.paid === true)) {
        const updateReqs = balancereqsFalse.filter((requ) => requ.id !== id);
        setbalancereqsFalse(updateReqs);
        balancereqsTrue.push(request);
      } else {
        const updateReqs = balancereqsTrue.filter((requ) => requ.id !== id);
        setbalancereqsTrue(updateReqs);
        balancereqsFalse.push(request);
      }
    }
  };

  return (
    <div className="cp-data-container">
      {balancereqs.map((balancereq) => (
        <div key={balancereq.id} className="cp-data-card">
          <h4>{balancereq.name}</h4>
          <p>{balancereq.email}</p>
          <p>{balancereq.iban}</p>
          <p>{balancereq.balance}</p>
          <p>{balancereq.date}</p>
          <p style={{ color: balancereq.paid ? "green" : "red" }}>
            {balancereq.paid ? "ödendi" : "Ödenmedi"}
          </p>
          <div className="cp-card-btns">
            <button onClick={() => changePaid(balancereq.id)}>
              <img
                src={balancereq.paid ? rejecticon : doneicon}
                alt="ödendi/ödenmedi"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BalanceRequests;
