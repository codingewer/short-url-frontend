import React from "react";
import Login from "./Login";
import Register from "./Register";
import loadingico from "../assets/icons/loading.gif";
import TopBar from "../Bars/TopBar";
import { useSelector } from "react-redux";
function UserRegister() {
  const loading = useSelector((state) => state.users.loading);
  return (
    <>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">
              {loading && <img className="loading-icon" src={loadingico} alt="" />}
            <Register />
        </div>
      </div>
    </>
  );
}

export default UserRegister;
