import { useDispatch } from 'react-redux';
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import "./UserForm.css";
import { useFormik } from "formik";
import * as yup from "yup"; 
import { useSelector } from "react-redux";
import { NewUserAsync } from '../Api/User/UserSlice';
const validationSchema = yup.object({
    UserName: yup.string().required("Kullanıcı adı gerekli"),
    Password: yup.string().required("Şifre gerekli"),
    Mail: yup.string().email("Geçerli bir email adresi giriniz").required("Email gerekli"),
    passwordRepeat: yup.string().oneOf([yup.ref("Password"), null], "Şifreler uyuşmuyor"),
})
function Register() {
  const success = useSelector((state) => state.users.success)
  const error = useSelector((state) => state.users.error)
  const loading = useSelector((state) => state.users.loading)
  const dispatch = useDispatch()
 const registerForm = useFormik({
  initialValues: {
    UserName: "",
    Mail: "",
    Password: "",
    passwordRepeat: "",
  },
  validationSchema:validationSchema,
  onSubmit: async (values) => {
    console.log(values);
    dispatch(NewUserAsync(values));
  } 
 }
 )
  return (
    //Sayfa tasarımı bileşenleri
    <div className="register-form-div">
      <form className="register-form" onSubmit={registerForm.handleSubmit}>
      { /*
        error&&<p style={{color:"red"}} >{message}</p>
  */}
        <h3>Kayıt Ol</h3>
        <input
          type="text"
          name="UserName"
          value={registerForm.values.UserName}
          onChange={registerForm.handleChange}
          
          placeholder="Kullanıcı adı"
        />
        {registerForm.errors.UserName && registerForm.touched.UserName ?
          <div>{registerForm.errors.UserName}</div>
        : null}
        <input
          type="email"
          name="Mail"
          value={registerForm.values.Mail}
          onChange={registerForm.handleChange}
          placeholder="Email"
        />
        {registerForm.errors.Mail && registerForm.touched.Mail ?
          <div>{registerForm.errors.Mail}</div>
          : null}
        <input
          type="password"
          name="Password"
          value={registerForm.values.Password}
          onChange={registerForm.handleChange}
          placeholder="Şifre"
        />
        {registerForm.errors.Password && registerForm.touched.Password ?
          <div>{registerForm.errors.Password}</div>
          : null}
        <input
          type="password"
          name="passwordRepeat"
          value={registerForm.values.passwordRepeat}
          onChange={registerForm.handleChange}
          placeholder="Şifre Tekrar"
        />
        {registerForm.errors.passwordRepeat && registerForm.touched.passwordRepeat ?
          <div>{registerForm.errors.passwordRepeat}</div>
          : null}
        <button className="form-btn" type="submit">Kayıt ol</button>
      </form>
    </div>
  );
}

export default Register;
