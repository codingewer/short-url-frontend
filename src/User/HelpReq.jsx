import React, { useState } from "react";
import "./HelpReq.css";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  message: yup.string().required("Mesaj boş olamaz"),
});

function HelpReq() {
  // use formik for form

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const helpreqs = [
    {
      id: 1,
      answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia cum ab sunt provident maiores sint, tempore dolorem rem nostrum eum, iste ut, qui consequuntur libero. Laudantium laboriosam ratione in numquam?`,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 2,
      answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia cum ab sunt provident maiores sint, tempore dolorem rem nostrum eum, iste ut, qui consequuntur libero. Laudantium laboriosam ratione in numquam?`,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 3,
      answer: ``,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: false,
    },
  ];

  helpreqs.reverse()

  return (
    <div className="help-container">
      <div className="help-form-container">
        <form className="helpreq-form" onSubmit={formik.handleSubmit}>
          <h2>Destek Talebi Oluştur</h2>
          <textarea
            className="contacus-from-inputs"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            id="message"
            cols="30"
            placeholder="Mesajınız"
            rows="5"
          ></textarea>
          {formik.errors.message && formik.touched.message ? (
            <div>{formik.errors.message}</div>
          ) : null}
          <button type="submit">Gönder</button>
        </form>
      </div>
      <div className="last-helpreqs">
        {helpreqs.map((req, index) => (
          <div key={index} className="helpreq-card">
            <span className="helpreq-card-titles">Mesajınız: </span>
            <p>{req.content}</p>
            <span className="helpreq-card-titles">Tarih: </span>
            <p>{req.date}</p>
            {req.answered ? (
              <>
                <span className="helpreq-card-titles">Cevaplandı: </span>
                <p>{req.answer}</p>
              </>
            ) : (
              <p style={{color:"orange", fontSize:14, fontWeight:500}} >Cevap bekliyor...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpReq;
