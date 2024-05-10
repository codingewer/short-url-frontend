import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import "./UserForm.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { NewUserAsync } from "../Api/User/UserSlice";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
const validationSchema = yup.object({
  UserName: yup.string().required("Kullanıcı adı gerekli"),
  Password: yup
    .string()
    .required("Şifre gerekli")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olmalıdır"),
  Mail: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email gerekli"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Şifreler uyuşmuyor"),
  isVerified: yup.boolean().required("ReCAPTCHA Doğrulaması gerekli"),
});
function Register() {
  const success = useSelector((state) => state.users.success);
  const error = useSelector((state) => state.users.error);
  const logined = localStorage.getItem("logined");
  const status = logined || success;
  const dispatch = useDispatch();
  const registerForm = useFormik({
    initialValues: {
      UserName: "",
      Mail: "",
      Password: "",
      passwordRepeat: "",
      isVerified: null,
      CheckBox: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(NewUserAsync(values));
    },
  });

  const handleVerify = (response) => {
    registerForm.setFieldValue("isVerified", true);
    console.log("doğrulandı");
  };

  const handleExpired = () => {
    registerForm.setFieldValue("isVerified", false);
  };
  const [approved, setApproved] = useState(false);
 
  const sitedata = useSelector((state)=> state.settings.data)
  const sitedatasuccess = useSelector((state)=> state.settings.success)
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  },[dispatch]);
  const data = sitedata !== null ? sitedata : {
    ReChapchaCode:""
  }
  return (
    //Sayfa tasarımı bileşenleri
    <div className="register-form-div">
      <form className="register-form" onSubmit={registerForm.handleSubmit}>
        {!status && <p style={{ color: "red" }}>{error}</p>}
        <h3>Kayıt Ol</h3>
        <input
          type="text"
          name="UserName"
          value={registerForm.values.UserName}
          onChange={registerForm.handleChange}
          placeholder="Kullanıcı adı"
        />
        {registerForm.errors.UserName && registerForm.touched.UserName ? (
          <div style={{ color: "red" }} >{registerForm.errors.UserName}</div>
        ) : null}
        <input
          type="email"
          name="Mail"
          value={registerForm.values.Mail}
          onChange={registerForm.handleChange}
          placeholder="Email"
        />
        {registerForm.errors.Mail && registerForm.touched.Mail ? (
          <div style={{ color: "red" }} >{registerForm.errors.Mail}</div>
        ) : null}
        <input
          type="password"
          name="Password"
          value={registerForm.values.Password}
          onChange={registerForm.handleChange}
          placeholder="Şifre"
        />
        {registerForm.errors.Password && registerForm.touched.Password ? (
          <div style={{ color: "red" }} >{registerForm.errors.Password}</div>
        ) : null}
        <input
          type="password"
          name="passwordRepeat"
          value={registerForm.values.passwordRepeat}
          onChange={registerForm.handleChange}
          placeholder="Şifre Tekrar"
        />
        {registerForm.errors.passwordRepeat &&
        registerForm.touched.passwordRepeat ? (
          <div style={{ color: "red" }} >{registerForm.errors.passwordRepeat}</div>
        ) : null}
        <div className="checkbox-container">
          <input type="checkbox" onChange={() => setApproved(!approved)} />
          <span>
            {" "}
            <Link to="/terms">Kullanım Şartlarını</Link> ve{" "}
            <Link to="/privacy">Gizlilik Politikasını</Link>
            kabul ediyorum.
          </span>
        </div>
        { sitedatasuccess && <ReCAPTCHA
        sitekey={data.ReChapchaCode}
        name="isVerified"
        value={registerForm.values.isVerified}
        onChange={handleVerify}
        onExpired={handleExpired}
        />}
        {registerForm.errors.isVerified && registerForm.touched.isVerified ? (
          <div style={{ color: "red" }}>{registerForm.errors.isVerified}</div>
        ) : null}
        <button disabled={!approved} className="form-btn" type="submit">
          Kayıt ol
        </button>
        <Link
          style={{ textDecoration: "none", fontWeight: 700, fontSize: 18 }}
          to="/login"
        >
          Giriş Yap
        </Link>
      </form>
      {status && (window.location.href = "/dashboard")}
    </div>
  );
}

export default Register;
