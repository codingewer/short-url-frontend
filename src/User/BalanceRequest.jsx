import React, { useState } from "react";
import "./BalanceRequest.css";

function BalanceRequest(props) {
  const balanceM = 10;
  const balanceW = 10;
  const barWidht = (balanceM / balanceW) * 100 + "%";
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState(false);

  const handleChangeBalance = (e) => {
    setBalance(e.target.value);
    e.target.value > balanceM ? setStatus(true) : setStatus(false);
  };
  return (
    <div className="balance-container">
      <div className="balance-info">
        {balanceM < 10 && <span>Çekmek için en az 10 &#8378; gerekiyor</span>}
        <div className="balance-amount">
          <span>
            Bakiyeniz: {" "}
            {balanceM}/ {balanceW} &#8378;
          </span>
          <div className="balance-bar">
            <div
              style={{ height: 20, width: barWidht, backgroundColor: balanceM >= 10 ? "green" : "red"}}
            ></div>
          </div>
        </div>
      </div>
      <form className="balance-form" action="">
        {status && (
          <span style={{ color: "red", fontSize: 12 }}>
            bakiye yetersiz! En fazla {balanceM} TL çekebilirisiniz.
          </span>
        )}
        <input
          min={10}
          max={props.balance}
          value={balance}
          onChange={(e) => handleChangeBalance(e)}
          type="number"
          placeholder="Çekmek istediğiniz tutar"
        />
        <button disabled={status ? true : false}>Çek</button>
      </form>

      <div className="balance-requests">
        <h4>Para çekm geçmişi</h4>
        <div className="balance-request">
          <span style={{ color: "red", fontWeight: "bold" }}>-125 &#8378;</span>
          <span>12.02.24</span>
          <span style={{ color: "orange", fontWeight: "bold" }}>
            Onay bekliyor...
          </span>
        </div>{" "}
        <div className="balance-request">
          <span style={{ color: "red", fontWeight: "bold" }}>-125 &#8378;</span>
          <span>12.02.24</span>
          <span style={{ color: "green", fontWeight: "bold" }}>Onaylandı</span>
        </div>{" "}
        <div className="balance-request">
          <span style={{ color: "red", fontWeight: "bold" }}>-125 &#8378;</span>
          <span>12.02.24</span>
          <span style={{ color: "green", fontWeight: "bold" }}>Onaylandı</span>
        </div>
        <div className="balance-request">
          <span style={{ color: "red", fontWeight: "bold" }}>-125 &#8378;</span>
          <span>12.02.24</span>
          <span style={{ color: "green", fontWeight: "bold" }}>Onaylandı</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceRequest;
