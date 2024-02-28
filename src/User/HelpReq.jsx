import React, { useEffect, useState } from "react";
import "./HelpReq.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  GetHelpRequestsByUserAsync,
  NewHelpRequestAsync,
} from "../Api/Help/HelpSlice";
import { formatDate } from "./Profile";

const validationSchema = yup.object({
  Content: yup.string().required("Mesaj boş olamaz"),
});

function HelpReq() {
  const items = useSelector((state) => state.help.items);
  const success = useSelector((state) => state.help.success);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Title: "",
      Content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(NewHelpRequestAsync(values));
      formik.resetForm();
    },
  });
  useEffect(() => {
    dispatch(GetHelpRequestsByUserAsync());
    console.log("uese effect");
  }, [dispatch]);
  return (
    <div className="help-container">
      <div className="help-form-container">
        <form className="helpreq-form" onSubmit={formik.handleSubmit}>
          <h2>Destek Talebi Oluştur</h2>
          <input
            type="text"
            name="Title"
            id="Title"
            onChange={formik.handleChange}
            value={formik.values.Title}
            placeholder="Konu"
            className="contacus-from-inputs"
          />
          <textarea
            className="contacus-from-inputs"
            name="Content"
            value={formik.values.Content}
            onChange={formik.handleChange}
            id="Content"
            cols="30"
            placeholder="Mesajınız"
            rows="5"
          ></textarea>
          {formik.errors.Content && formik.touched.Content ? (
            <div>{formik.errors.Content}</div>
          ) : null}
          <button type="submit">Gönder</button>
        </form>
      </div>
      <div className="last-helpreqs">
        {success &&
          items.map((req, index) => (
            <div key={index} className="helpreq-card">
              <span className="helpreq-card-titles">Mesajınız: </span>
              <p>{req.Content}</p>
              <span className="helpreq-card-titles">Tarih: </span>
              <p>{formatDate(req.createdAt)}</p>
              {req.answered ? (
                <>
                  <span className="helpreq-card-titles">Cevaplandı: </span>
                  <p>{req.status}</p>
                </>
              ) : (
                <p style={{ color: "orange", fontSize: 14, fontWeight: 500 }}>
                  Cevap bekliyor...
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default HelpReq;
