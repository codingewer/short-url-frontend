import React from 'react'

function BalanceRequests(props) {
    const balancereqsTrue = [
        {
          id: 1,
          name: "John Doe",
          iban: "TR123456678909876543",
          email: "john@example.com",
          balance:125,
          date:"12.01.2024",
          paid:true,
        },
        {
            id: 3,
            name: "John Doe",
            iban: "TR123456678909876543",
            email: "john@example.com",
            balance:125,
            date:"12.01.2024",
            paid:true,

          },
          {
            id: 3,
            name: "John Doe",
            iban: "TR123456678909876543",
            email: "john@example.com",
            balance:125,    
            date:"12.01.2024",      
            paid:true,

          },
      ];

      const balancereqsFalse = [
        {
          id: 1,
          name: "John Doe",
          iban: "TR123456678909876543",
          email: "john@example.com",
          balance:125,
          date:"12.01.2024",
          paid:false,
        },
        {
            id: 3,
            name: "John Doe",
            iban: "TR123456678909876543",
            email: "john@example.com",
            balance:125,
            date:"12.01.2024",
            paid:false,

          },
          {
            id: 3,
            name: "John Doe",
            iban: "TR123456678909876543",
            email: "john@example.com",
            balance:125, 
            date:"12.01.2024",         
            paid:false,

          },
      ];
      const balancereqs = props.paid ? balancereqsTrue : balancereqsFalse;
  return (
    <div className="cp-data-container">
    {balancereqs.map((balancereq) => (
      <div key={balancereq.id} className="cp-data-card">
        <h4>{balancereq.name}</h4>
        <p>{balancereq.email}</p>
        <p>{balancereq.iban}</p>
        <p>{balancereq.balance}</p>
        <p>{balancereq.date}</p>
        <p style={{color: balancereq.paid ? "green" : "red"}}
        >{balancereq.paid ? "ödendi" : "Ödenmedi"}</p>
      </div>
    ))}
  </div>
  )
}

export default BalanceRequests