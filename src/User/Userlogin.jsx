import React from "react";
import Login from "./Login";
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
              {loading && <img className="loading-icon" src={loadingico} alt="" />}
            <Login />
        </div>
      </div>
    </>
  );
}

export default Userlogin;
