import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import rejecticon from "../assets/icons/reject-icon.png";
import doneicon from "../assets/icons/done-icon.png";
import { GetByStatusBalanceRequestsAsync, UpdateBalanceStatusAsync } from '../Api/Balance/BalanceSlice';
import { formatDate } from '../User/Profile';
import loadingico from '../assets/icons/loading.gif';



function BalanceRequests(props) {
  const dispatch = useDispatch();
  const items = useSelector((state)=> state.balance.items)
  const status = useSelector((state)=> state.balance.success)
  const loading = useSelector((state)=> state.balance.loading)
  const error = useSelector((state)=> state.balance.error)
 
 useEffect(()=>{
  dispatch(GetByStatusBalanceRequestsAsync(props.paid))
 },[props.paid, dispatch])


 console.log(status)
  const changePaid = async (status, id ) => {
    window.confirm("Bu işlemi gerçekleştirmek istediğinize emin misiniz?") &&
     dispatch(UpdateBalanceStatusAsync({
      ID: id,
      status: !status
     }));
  };
const balanceReqs = items !== null ? items : []
console.log(balanceReqs)
  return (
    <div className="cp-data-container">
    {loading && <img className="loading-icon" src={loadingico} alt="" />}
      { status && balanceReqs.map((balancereq) => (
        <div key={balancereq.ID} className="cp-data-card">
          <h4>{balancereq.user.UserName}</h4>
          <p>{balancereq.user.Mail}</p>
          <p>{balancereq.user.BalanceInfo.iban}</p>
          <p>{balancereq.amount} <span> &#8378;</span></p>
          <p>{ formatDate(balancereq.createdAt)}</p>
          <p style={{ color: balancereq.status ? "green" : "red" }}>
            {balancereq.status ? "ödendi" : "Ödenmedi"}
          </p>
          <div className="cp-card-btns">
            <button type='button' onClick={()=> changePaid(balancereq.status , balancereq.ID)}>
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
