import React from "react";
import Login from "./Login";
import Register from "./Register";
import loadingico from "../assets/icons/loading.gif";
import TopBar from "../Bars/TopBar";
import { useSelector } from "react-redux";
function Userlogin() {
  const OpenForm = (id, id2) => {
    document.getElementById(id).style.display = "block";
    document.getElementById(id2).style.display = "none";
  };
  const loading = useSelector((state) => state.users.loading);

  return (
    <>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">

          <div className="fom-bar">
            <button
              className="switch-form-btn"
              onClick={() => OpenForm("login-form543", "register-form345")}
              >
              Giriş
            </button>
            <button
              className="switch-form-btn"
              onClick={() => OpenForm("register-form345", "login-form543")}
              >
              Kayıt
            </button>
          </div>
              {loading && <img className="loading-icon" src={loadingico} alt="" />}
          <div style={{ display: "none" }} id="register-form345">
            <Register />
          </div>
          <div id="login-form543">
            <Login />
          </div>
        </div>
        {/*logined && <Navigate to={"/shorturl"}/>
         */}
      </div>
    </>
  );
}

export default Userlogin;
