import React, { useEffect, useState } from "react";
import "./BalanceRequest.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GetBalanceByUserIDAsync, NewBalanceRequestAsync } from "../Api/Balance/BalanceSlice";
import { formatDate } from "./Profile";

function BalanceRequest(props) {
  const usersuccess = useSelector((state)=> state.users.success);
  const user0 =  useSelector((state)=> state.users.userrealtime);
  const user = usersuccess ? user0 : {};
  const items = useSelector((state)=> state.balance.balanceRequests);
  const balanceM = 10;
  const balanceW =  user.Balance;
  const barWidht = (balanceW / balanceM) * 100 + "%";
  const [status, setStatus] = useState(false);
const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: async (values) => {
      await dispatch(NewBalanceRequestAsync(values));
      formik.resetForm();
    },

  })

  const data = items !== null ? items : []
useEffect(()=>{
  dispatch(GetBalanceByUserIDAsync())  
},[dispatch])
console.log(items)
  return (
    <div className="balance-container">
      <div className="balance-info">
        {balanceW < 10 && <span>Çekmek için en az 10 &#8378; gerekiyor</span>}
        <div className="balance-amount">
          <span>
            Bakiyeniz: {" "}
            { balanceW < 10 &&  balanceM + "/"} {balanceW} &#8378;
          </span>
          <div className="balance-bar">
            <div
              style={{ height: 20, width: barWidht, backgroundColor: balanceM >= 10 ? "#7215fc" : "red"}}
            ></div>
          </div>
        </div>
      </div>
      <form  className="balance-form" onSubmit={formik.handleSubmit}>
        {status && (
          <span style={{ color: "red", fontSize: 12 }}>
            bakiye yetersiz! En fazla {balanceW} TL çekebilirisiniz.
          </span>
        )}
        <input
        disabled = {balanceW <10 ? true : false}
          min={10}
          max={balanceW}
          value={formik.values.amount}
          name="amount"
          onChange={formik.handleChange}
          type="number"
          placeholder="Çekmek istediğiniz tutar"
        />
        <button disabled={status ? true : false}>Çek</button>
      </form>

      <div className="balance-requests">
        <h4>Para çekme geçmişi</h4>
        {
          data.length > 0 && data.map((item,index)=>(
        <div key ={item.ID} className="balance-request">
          <span style={{ color: "red", fontWeight: "bold" }}>-{item.amount} &#8378;</span>
          <span>{formatDate(item.createdAt)}</span>
          {
            item.status ? 
            <span style={{ color: "green", fontWeight: "bold" }}>
              Onaylandı
            </span>
            :
          <span style={{ color: "orange", fontWeight: "bold" }}>
            Onay bekliyor...
          </span>
          }
        </div>
          ))
        }
        </div>
    </div>
  );
}

export default BalanceRequest;
