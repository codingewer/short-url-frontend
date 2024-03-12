import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./UserForm.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ForgotPasswordAsync } from "../Api/User/UserSlice";
import { Link } from "react-router-dom";
import TopBar from "../Bars/TopBar";
import loadingico from "../assets/icons/loading.gif";


const validationSchema = Yup.object({
  mail: Yup.string().required("Mail adı gerekli"),
});
function ForgotPassword() {
  const url = window.location.href;
  const domain = url.split("/forgotpassword")[0];
  const loading = useSelector((state) => state.users.loading);
  const success = useSelector((state) => state.users.success);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      mail: "",
      domain: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(ForgotPasswordAsync(formik.values));
      formik.resetForm();
    },
  });
  console.log(success);
  useEffect(() => {
    formik.setFieldValue("domain", domain +"/resetpassword/" );
  }, [url]);
  return (
    //SAyfa tasarımı
    <>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">
          <div className="register-form-div">
            <form className="register-form" onSubmit={formik.handleSubmit}>
              {success ?<p style={{ color: "green" }} >Mail Başarıyla gönderildi</p> : <p style={{ color: "red" }}>{error}</p>}
              {loading && <img className="loading-icon" src={loadingico} alt="" />}
              <h3>Şifremi unuttum</h3>
              <input
                type="mail"
                name="mail"
                value={formik.values.mail}
                onChange={formik.handleChange}
                placeholder="e-mail adresi"
              />
              <button className="form-btn" type="submit">
                Gönder
              </button>
              <Link to="/login">Giriş Yap</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
