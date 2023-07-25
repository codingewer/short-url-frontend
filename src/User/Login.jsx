import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import "./UserForm.css";

function Login() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  //Değişkenler
  const [status, setStatus] = useState(Boolean)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  //Kullanıcıyı API'de sorgulayıp dönen  fonksiyon
  const Login = (e) => {
    axios
      .post("https://shorturl-ptsr.onrender.com/user/login", {
        UserName: info.username,
        Password: info.password,
      })
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", response.data.UserName)
        localStorage.setItem("logined", true)
        setStatus(true)
      })
      .catch(function (error) {
        setMessage(error.response.data.ERROR);
        setError(true)
      });
    setInfo({
      username: "",
      password: "",
    });
    e.preventDefault();
  };
  return (
    //SAyfa tasarımı
    <div className="register-form-div">
      <form className="register-form" onSubmit={(e)=>Login(e)}>
        { 
        error&&<p style={{color:"red"}} >{message}</p>
        }
        <h3>Giriş Yap</h3>
        <input
          type="text"
          value={info.username}
          onChange={(e) =>
            setInfo({
              username: e.target.value,
              password: info.password,
            })
          }
          placeholder="Kullanıcı adı"
        />
        <input
          type="password"
          value={info.password}
          onChange={(e) =>
            setInfo({
              password: e.target.value,
              username: info.username,
            })
          }
          placeholder="Şifre"
        />
        <button className="form-btn" type="submit">Giriş yap </button>
      </form>
      {status && <Navigate to="/shorturl" />}
    </div>
  );
}

export default Login;
