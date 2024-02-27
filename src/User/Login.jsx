import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import "./UserForm.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginAsync } from '../Api/User/UserSlice';
import { Navigate } from 'react-router';

const validationSchema = Yup.object({
  userName: Yup.string().required("Kullanıcı adı gerekli"),
  password: Yup.string().required("Şifre gerekli"),
})
function Login() {
  const success = useSelector((state) => state.users.success)
  const error = useSelector((state) => state.users.error)
  const logined = localStorage.getItem("logined")
  const status = logined || success
const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
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
        !success &&
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
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Şifre"
        />
        <button className="form-btn" type="submit">Giriş yap </button>
      </form>
     { status && <Navigate to="/dashboard"/>}
    </div>
  );
}

export default Login;
