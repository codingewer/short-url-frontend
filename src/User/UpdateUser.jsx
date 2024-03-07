import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./UserForm.css";
import { useSelector } from "react-redux";
import { UpdatePasswordAsync, UpdateUserAsync } from "../Api/User/UserSlice";
import loadingico from "../assets/icons/loading.gif";
import { UpdateUserBalanceInfoAsync } from "../Api/Balance/BalanceSlice";
const validationSchema = Yup.object().shape({
  UserName: Yup.string().required("Kullanıcı adı gerekli"),
  Mail: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email gerekli"),
});

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Eski Şifre gerekli"),
  newPassword: Yup.string().required("Yeni Şifre gerekli"),
  ConfirmPassword: Yup.string()
    .required("Yeni Onayı Şifre gerekli")
    .oneOf([Yup.ref("newPassword"), null], "Şifreler uyuşmuyor"),
});

const balanceValidationSchema = Yup.object().shape({
  iban: Yup.string().required("IBAN gerekli"),
  ibanOwner: Yup.string().required("IBAN Sahibi gerekli"),
  paparaNo: Yup.string(),
});

function UpdateUser() {
  const user = useSelector((state) => state.users.userrealtime);
  const success = useSelector((state) => state.users.success);
  const error = useSelector((state) => state.users.error);
  const loading = useSelector((state) => state.users.loading);
  const balanceloading = useSelector((state) => state.balance.loading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Mail: "",
    },
    validationSchema,
    onSubmit: async () => {
      await dispatch(UpdateUserAsync(formik.values));
    },
  });
  const PasswordForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: () => {
      dispatch(UpdatePasswordAsync(PasswordForm.values));
      PasswordForm.resetForm();
      console.log("2323");
      return;
    },
  });

  const balanceInForm = useFormik({
    initialValues: {
      ID:"",
      iban: "",
      ibanOwner: "",
      paparaNo: "",
    },
    validationSchema: balanceValidationSchema,
    onSubmit: async (values) => {
      await dispatch(UpdateUserBalanceInfoAsync(values));
      PasswordForm.resetForm();
      console.log("2323");
    },
  });
  useEffect(() => {
    success == true &&
      formik.setValues({
        UserName: user.UserName,
        Mail: user.Mail,
      });
    user !== null &&
      balanceInForm.setValues({
        ID: user.BalanceInfo.ID,
        iban: user.BalanceInfo.iban,
        ibanOwner: user.BalanceInfo.ibanOwner,
        paparaNo: user.BalanceInfo.paparaNo,
      });
  }, [success]);
  return (
    <div id="update-user-form" className="update-from-div">
      <span style={{ marginTop: 24, fontSize: 18, fontWeight: 700 }}>
        Bilgileri Güncelle
      </span>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        {!success && (
          <span style={{ color: "red" }}>
            Bilgiler güncellenirken Hata Oluştu.
          </span>
        )}
        <label htmlFor="UserName">Kullanıcı Adı</label>
        <input
          type="text"
          id="UserName"
          name="UserName"
          value={formik.values.UserName}
          onChange={formik.handleChange}
        />
        {
          //validate with validationSchema
          formik.errors.UserName && formik.touched.UserName ? (
            <div>{formik.errors.UserName}</div>
          ) : null
        }
        <label htmlFor="Mail">Email</label>
        <input
          type="email"
          name="Mail"
          value={formik.values.Mail}
          onChange={formik.handleChange}
        />
        {formik.errors.Mail && formik.touched.Mail ? (
          <div>{formik.errors.Mail}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
      {loading && <img className="loading-icon" src={loadingico} alt="" />}
      <form className="register-form" onSubmit={PasswordForm.handleSubmit}>
        <label htmlFor="password">Eski Şifre</label>
        <input
          type="password"
          name="password"
          value={PasswordForm.values.password}
          onChange={PasswordForm.handleChange}
        />
        {PasswordForm.errors.password && PasswordForm.touched.password ? (
          <div>{PasswordForm.errors.password}</div>
        ) : null}
        <label htmlFor="newPassword">Yeni Şifre</label>
        <input
          type="password"
          name="newPassword"
          value={PasswordForm.values.newPassword}
          onChange={PasswordForm.handleChange}
        />
        {PasswordForm.errors.newPassword && PasswordForm.touched.newPassword ? (
          <div>{PasswordForm.errors.newPassword}</div>
        ) : null}
        <label htmlFor="ConfirmPassword">Yeni Şifre Onayı</label>
        <input
          type="password"
          name="ConfirmPassword"
          value={PasswordForm.values.ConfirmPassword}
          onChange={PasswordForm.handleChange}
        />
        {PasswordForm.errors.ConfirmPassword &&
        PasswordForm.touched.ConfirmPassword ? (
          <div>{PasswordForm.errors.ConfirmPassword}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
      {balanceloading && <img className="loading-icon" src={loadingico} alt="" />}
      <form className="register-form" onSubmit={balanceInForm.handleSubmit}>
        <h3>Ödeme Bilgileri</h3>
        <label htmlFor="password">IBAN</label>
        <input
          type="text"
          name="iban"
          value={balanceInForm.values.iban}
          onChange={balanceInForm.handleChange}
        />
        {balanceInForm.errors.iban && balanceInForm.touched.iban ? (
          <div>{balanceInForm.errors.iban}</div>
        ) : null}

        <label htmlFor="password">IBAN Sahibi Adı Soyadı</label>
        <input
          type="text"
          name="ibanOwner"
          value={balanceInForm.values.ibanOwner}
          onChange={balanceInForm.handleChange}
        />
        {balanceInForm.errors.ibanOwner && balanceInForm.touched.ibanOwner ? (
          <div>{balanceInForm.errors.ibanOwner}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
