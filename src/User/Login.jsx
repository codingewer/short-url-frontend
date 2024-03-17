import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import "./UserForm.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginAsync } from '../Api/User/UserSlice';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const validationSchema = Yup.object({
  userName: Yup.string().required("Kullanıcı adı gerekli"),
  password: Yup.string().required("Şifre gerekli"),
 // isVerified:  Yup.boolean().required("ReCAPTCHA Doğrulaması gerekli"),
})
function Login() {
  const success = useSelector((state) => state.users.logined)
  const error = useSelector((state) => state.users.error)
  const logined = localStorage.getItem("logined")
  const status = logined || success
const dispatch = useDispatch();

  const handleVerify = (response) => {
    formik.setFieldValue("isVerified", true);
    console.log("doğrulandı");
  };

  const handleExpired = () => {
    formik.setFieldValue("isVerified", false);
  };


  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      isVerified:null,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(LoginAsync(formik.values))
    },
  });
  console.log(success);
  console.log(error);
  return (
    //SAyfa tasarımı
    <div className="register-form-div">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        { 
        error &&
        <p style={{color:"red"}} >{error}</p>
        }
        <h3>Giriş Yap</h3>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          placeholder="Kullanıcı adı"
        />
        {formik.errors.userName && formik.touched.userName ? (
          <div style={{color:"red"}} >{formik.errors.userName}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Şifre"
        />
        {formik.errors.password && formik.touched.password ? (
          <div style={{color:"red"}} >{formik.errors.password}</div>
        ) : null}
      { /* <ReCAPTCHA
        sitekey='6LdVw5YpAAAAABsnsv9q6_EY_DsRiQIIPXxK2r0m'
        name="isVerified"
        value={formik.values.isVerified}
        onChange={handleVerify}
        onExpired={handleExpired}
        />}
        {formik.errors.isVerified && formik.touched.isVerified ? (
          <div style={{color:"red"}} >{formik.errors.isVerified}</div>
        ) : null*/}
        <br />
        <br />
        <br />
        <Link to="/forgotpassword" >Şifremi unuttum?</Link>
        <button className="form-btn" type="submit">Giriş yap </button>
        <Link style={{textDecoration:"none", fontWeight:700, fontSize:18}} to="/register">Kayıt Ol</Link>
      </form>
     { status && (window.location.href="/")}
    </div>
  );
}

export default Login;
