import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import "./UserForm.css";

function Register() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });

  //Değişkenler
  const [status, setStatus] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  //Kullanıcıyı API'ye kayeden fonksiyon
  const SaveUser = (e) => {
    axios.post("https://shorturlbackend-1-y8099896.deta.app/user/new", {
        UserName: info.username,
        Password: info.password,
      }
      )
      .then(function (response) {
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
      passwordRepeat: "",
    });
    e.preventDefault();
  };
  return (
    //Sayfa tasarımı bileşenleri
    <div className="register-form-div">
      <form className="register-form" onSubmit={(e)=>SaveUser(e)}>
      { 
        error&&<p style={{color:"red"}} >{message}</p>
        }
        <h3>Kayıt Ol</h3>
        <input
          type="text"
          value={info.username}
          onChange={(e) =>
            setInfo({
              username: e.target.value,
              passwordRepeat: info.passwordRepeat,
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
              passwordRepeat: info.passwordRepeat,
              username: info.username,
            })
          }
          placeholder="Şifre"
        />
        <input
          type="password"
          value={info.passwordRepeat}
          onChange={(e) =>
            setInfo({
              passwordRepeat: e.target.value,
              password: info.password,
              username: info.username,
            })
          }
          placeholder="Şifre Tekrarı"
        />
        <button className="form-btn" type="submit">Kayıt ol</button>
      </form>
      {status && <Navigate to="/shorturl" />}
    </div>
  );
}

export default Register;
