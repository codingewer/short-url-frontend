import React, { useEffect, useState } from "react";
import "./BalanceRequest.css";
import { useFormik } from "formik";
import loadingicon from "../assets/icons/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBalanceByUserIDAsync,
  NewBalanceRequestAsync,
  UpdateUserBalanceInfoAsync,
} from "../Api/Balance/BalanceSlice";
import { formatDate } from "./Profile";
import "./UserForm.css";

function BalanceRequest(props) {
  const sitedata = useSelector((state) => state.settings.data);
  const loading = useSelector((state) => state.balance.loading);
  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {};
  const items = useSelector((state) => state.balance.balanceRequests);
  const balanceM = sitedata !== null ? sitedata.WithdrawnBalance : 100;
  const balanceW = parseInt(user.Balance);
  const barWidht = (balanceW / balanceM) * 100 + "%";
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: async (values) => {
      dispatch(NewBalanceRequestAsync(values));
      formik.resetForm();
    },
  });

  const balanceInForm = useFormik({
    initialValues: {
      ID: "",
      iban: "",
      ibanOwner: "",
      paparaNo: "",
    },
    onSubmit: async (values) => {
       dispatch(UpdateUserBalanceInfoAsync(values));
      console.log("2323");
    },
  });

  const [toglet, setToglet] = useState(false)
  const handleToggleForm = (id) =>{
    const form = document.getElementById(id)
    if (toglet) {
      form.style.display="none"
      setToglet(!toglet)
    } else{
      form.style.display="flex"
      setToglet(!toglet)
    }
      
  }

  const data = items !== null ? items : [];
  useEffect(() => {
    user0 !== null &&
      balanceInForm.setValues({
        ID: user.BalanceInfo.ID,
        iban: user.BalanceInfo.iban,
        ibanOwner: user.BalanceInfo.ibanOwner,
        paparaNo: user.BalanceInfo.paparaNo,
      });
  }, [dispatch, user0]);
  return (
    <div className="balance-container">
      <div className="balance-info">
        {balanceW < balanceM && (
          <span style={{ color: "red" }}>
            Çekmek için en az {balanceM} &#8378; gerekiyor
          </span>
        )}
        <div className="balance-amount">
          <span>
            Bakiyeniz:
            {balanceW < balanceM ? balanceW + "/" + balanceM : balanceW} &#8378;
          </span>
          <div className="balance-bar">
            <div
              style={{
                height: 20,
                width: barWidht,
                backgroundColor: balanceM >= 10 ? "#7215fc" : "red",
              }}
            ></div>
          </div>
        </div>
      </div>
      <form className="balance-form" onSubmit={formik.handleSubmit}>
        {loading && <img src={loadingicon} className="loading-icon" />}
        {formik.values.amount > balanceW && (
          <span style={{ color: "red", fontSize: 12 }}>
            bakiye yetersiz! En fazla {balanceW} TL çekebilirisiniz.
          </span>
        )}
        <input
          disabled={balanceW < balanceM ? true : false}
          value={formik.values.amount}
          name="amount"
          onChange={formik.handleChange}
          type="number"
          placeholder="Çekmek istediğiniz tutar"
        />
        <button type="submit">Çek</button>
      </form>

      <div className="balance-requests">
        <h4>Para çekme geçmişi</h4>
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={item.ID} className="balance-request">
              <span style={{ color: "red", fontWeight: "bold" }}>
                -{item.amount} &#8378;
              </span>
              <span>{formatDate(item.createdAt)}</span>
              {item.status ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Onaylandı
                </span>
              ) : (
                <span style={{ color: "orange", fontWeight: "bold" }}>
                  Onay bekliyor...
                </span>
              )}
            </div>
          ))}
      </div>
      <div className="balanceinfos-forms">
        <div  className="togle-form-btns" >
      <button onClick={()=>handleToggleForm("iban-noform")} >IBAN Ekle</button>
      <button onClick={()=>handleToggleForm("papara-noform")} >Papara No Ekle</button>
        </div>
        <form   id ="iban-noform" style={{display:"none"}} className="register-form" onSubmit={balanceInForm.handleSubmit}>
          <h3>IBAN Bilgileri</h3>
          <label htmlFor="password">IBAN</label>
          <input
            type="text"
            name="iban"
            value={balanceInForm.values.iban}
            onChange={balanceInForm.handleChange}
          />
          {balanceInForm.errors.iban && balanceInForm.touched.iban ? (
            <div>{balanceInForm.errors.iban}</div>
          ) : null}

          <label htmlFor="password">IBAN Sahibi Adı Soyadı</label>
          <input
            type="text"
            name="ibanOwner"
            value={balanceInForm.values.ibanOwner}
            onChange={balanceInForm.handleChange}
          />
          {balanceInForm.errors.ibanOwner && balanceInForm.touched.ibanOwner ? (
            <div>{balanceInForm.errors.ibanOwner}</div>
          ) : null}
          <button className="form-btn" type="submit">
            Ekle
          </button>
        </form>
        <form style={{display:"none"}} id="papara-noform" className="register-form" onSubmit={balanceInForm.handleSubmit}>
          <h3>Papara No</h3>
          <input
            type="text"
            name="iban"
            value={balanceInForm.values.iban}
            onChange={balanceInForm.handleChange}
          />
          {balanceInForm.errors.iban && balanceInForm.touched.iban ? (
            <div>{balanceInForm.errors.iban}</div>
          ) : null}
          <button className="form-btn" type="submit">
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
}

export default BalanceRequest;
