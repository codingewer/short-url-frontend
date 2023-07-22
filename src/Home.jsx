import React from "react";
import "./Url/ShortUrl.css";
import "./User/UserForm.css"
import Login from "./User/Login";
import Register from "./User/Register";
import { Navigate } from "react-router";

function Home() {
  const OpenForm = (id, id2) => {
    document.getElementById(id).style.display = "block";
    document.getElementById(id2).style.display = "none";

  };

  const logined = Boolean(localStorage.getItem("logined"))

  return (
    <div className="shorturl">
       <div className="navbar">
        <div className="title">Link Kısalt</div>
      </div>
      <div className="content">
        <div className="user-form-div">
            <div className="fom-bar">
            <button style={{borderBottom:"2px solid green"}} onClick={()=>OpenForm("login-form543","register-form345")}>Giriş</button>
            <button style={{borderBottom:"2px solid red"}} onClick={()=>OpenForm("register-form345","login-form543")} >Kayıt</button>
            </div>
          <div style={{display :"none"}} id="register-form345">
            <Register />
          </div>
          <div id="login-form543">
            <Login />
          </div>
        </div>
        <div className="how-work">
          <h3>Nasıl Çalışır?</h3>
          <p>
          Kısaltmak istedğiniz link girilir ve ona karşılık gelen kısa bir ad oluşturulur.
            Bu ad veri tabanında tutulur ve sizin belirledğiniz süre boyunca orda kalır süre bitince silinir.
            Kullanıcı adı ve şifre ile kayıt olduktan sonra istedğiniz kadar link kısaltabilirisiniz.
          </p>
        </div>
      </div>
      {logined && <Navigate to={"/shorturl"}/>}
    </div>
  );
}

export default Home;
