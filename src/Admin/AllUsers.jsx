import React from "react";
import "./ControlPanelGlobalStyle.css";

function AllUsers() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      userName: "johndoe",
      iban: "TR123456678909876543",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "John Doe",
      userName: "johndoe",
      iban: "TR123456678909876543",
      email: "john@example.com",
    },
    {
      id: 3,
      name: "John Doe",
      userName: "johndoe",
      iban: "TR123456678909876543",
      email: "john@example.com",
    },
  ];
  return (
    <div className="cp-data-container">
      {users.map((user) => (
        <div key={user.id} className="cp-data-card">
          <h4>{user.name}</h4>
          <p>{user.userName}</p>
          <p>{user.iban}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
