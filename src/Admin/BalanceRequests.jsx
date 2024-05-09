import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import rejecticon from "../assets/icons/reject-icon.png";
import doneicon from "../assets/icons/done-icon.png";
import {
  GetByStatusBalanceRequestsAsync,
  UpdateBalanceStatusAsync,
} from "../Api/Balance/BalanceSlice";
import { formatDate } from "../User/Profile";
import loadingico from "../assets/icons/loading.gif";

function BalanceRequests(props) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.balance.items);
  const status = useSelector((state) => state.balance.success);
  const loading = useSelector((state) => state.balance.loading);

  useEffect(() => {
    dispatch(GetByStatusBalanceRequestsAsync(props.paid));
  }, [props.paid, dispatch]);

  const changePaid = async (status, id) => {
    window.confirm("Bu işlemi gerçekleştirmek istediğinize emin misiniz?") &&
      dispatch(
        UpdateBalanceStatusAsync({
          ID: id,
          status: !status,
        })
      );
  };
  const balanceReqs = items !== null ? items : [];
  return (
    <div className="cp-data-container">
      {loading && <img className="loading-icon" src={loadingico} alt="" />}
      {status &&
        balanceReqs.map((balancereq) => (
          <div key={balancereq.ID} className="cp-data-card">
            <h3>{balancereq.user.UserName}</h3>
            <p>{balancereq.user.Mail}</p>
            {balancereq.option === "papara" ? (
              <div style={{display:"grid", gap:12}} >
                <h4>Papara Hesabına</h4>
                <span>Papara No:</span>
                <span>{balancereq.user.BalanceInfo.paparaNo}</span>
              </div>
            ) : (
              <div style={{display:"grid", gap:12}} >
                <h4>Banka Hesabına</h4>
                <span>İBAN:</span>
                <span>{balancereq.user.BalanceInfo.iban}</span>
                <span>İBAN Sahibi:</span>
                <span>{balancereq.user.BalanceInfo.ibanOwner}</span>
              </div>
            )}
            <p>
              {balancereq.amount} <span> &#8378;</span>
            </p>
            <p>{formatDate(balancereq.createdAt)}</p>
            <p style={{ color: balancereq.status ? "green" : "red" }}>
              {balancereq.status ? "ödendi" : "Ödenmedi"}
            </p>
            <div className="cp-card-btns">
              <button
                type="button"
                onClick={() => changePaid(balancereq.status, balancereq.ID)}
              >
                <img
                  src={balancereq.status ? rejecticon : doneicon}
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
