import React, { useState } from "react";
import "./BalanceRequestPopUp.css";

function BalanceRequestPopUp(props) {
  const handleCloseMenu = () => {
    const linksMenu = document.getElementById("balance-request-form");
    linksMenu.style.display = "none";
  };
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState(false);


  const handleChangeBalance = (e) => {
    setBalance(e.target.value);
    e.target.value > props.balance ? setStatus(true) : setStatus(false);
  };

  console.log(props.balance);
  return (
    <div id="balance-request-form" className="popup-form">
      <form action="">
        <h4>Bakiyenden Para Çek</h4>
        {status && <span style={{color:"red"}} > bakiye yetersiz! En fazla {props.balance} TL çekebilirisiniz.</span>}
        <label htmlFor="">Miktar:</label>
        <input
        min={1}
        max={props.balance}
          value={balance}
          onChange={(e) => handleChangeBalance(e)}
          type="number"
        />
        <button disabled={status ? true : false}>Çek</button>
      </form>
    </div>
  );
}

export default BalanceRequestPopUp;
