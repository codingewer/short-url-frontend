import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import "./UserForm.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { NewUserAsync } from "../Api/User/UserSlice";
import { Link } from "react-router-dom";
const validationSchema = yup.object({
  UserName: yup.string().required("Kullanıcı adı gerekli"),
  Password: yup.string().required("Şifre gerekli"),
  Mail: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email gerekli"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Şifreler uyuşmuyor"),

    CheckBox : yup.boolean().oneOf([true], "Şartları kabul etmelisiniz"),
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
      CheckBox : false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(NewUserAsync(values));
    },
  });

  const [approved, setApproved] = useState(false);
  console.log(approved);
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
          <div>{registerForm.errors.UserName}</div>
        ) : null}
        <input
          type="email"
          name="Mail"
          value={registerForm.values.Mail}
          onChange={registerForm.handleChange}
          placeholder="Email"
        />
        {registerForm.errors.Mail && registerForm.touched.Mail ? (
          <div>{registerForm.errors.Mail}</div>
        ) : null}
        <input
          type="password"
          name="Password"
          value={registerForm.values.Password}
          onChange={registerForm.handleChange}
          placeholder="Şifre"
        />
        {registerForm.errors.Password && registerForm.touched.Password ? (
          <div>{registerForm.errors.Password}</div>
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
          <div>{registerForm.errors.passwordRepeat}</div>
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
        {registerForm.errors.CheckBox && registerForm.touched.CheckBox ? (
          <div>{registerForm.errors.CheckBox}</div>
        ) : null}
        <button  className="form-btn" type="submit">
          Kayıt ol
        </button>
        <Link
          style={{ textDecoration: "none", fontWeight: 700, fontSize: 18 }}
          to="/login"
        >
          Giriş Yap
        </Link>
      </form>
      {status && (window.location.href = "/")}
    </div>
  );
}

export default Register;
