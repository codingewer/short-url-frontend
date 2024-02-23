import React from "react";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import "./UserForm.css";

const validationSchema = Yup.object({
  userName: Yup.string().required("Kullanıcı adı gerekli"),
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email gerekli"),
  iban: Yup.string().required("IBAN gerekli"),
  ibanName: Yup.string().required("IBAN adı gerekli"),
  password: Yup.string().required("Şifre gerekli"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor")
    .required("Şifre gerekli"),
});

function UpdateUser() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      iban: "",
      ibanName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      console.log(formik.values);
      alert("Details Updated Successfully");
    },
  });
  return (
    <div id="update-user-form" className="update-from-div">
      <span style={{ marginTop: 24, fontSize: 18, fontWeight: 700 }}>
        Bilgileri Güncelle
      </span>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">Kullanıcı Adı</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
        />
        {
          //validate with validationSchema
          formik.errors.userName && formik.touched.userName ? (
            <div>{formik.errors.userName}</div>
          ) : null
        }
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="iban">IBAN</label>
        <input
          type="text"
          id="iban"
          name="iban"
          value={formik.values.iban}
          onChange={formik.handleChange}
        />
        {formik.errors.iban && formik.touched.iban ? (
          <div>{formik.errors.iban}</div>
        ) : null}
        <label htmlFor="ibanName">IBAN Alıcı Adı</label>
        <input
          type="text"
          id="ibanName"
          name="ibanName"
          value={formik.values.ibanName}
          onChange={formik.handleChange}
        />
        {formik.errors.ibanName && formik.touched.ibanName ? (
          <div>{formik.errors.ibanName}</div>
        ) : null}
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
