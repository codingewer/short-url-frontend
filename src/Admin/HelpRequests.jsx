import React, { useState } from "react";
import rejecticon from "../assets/icons/close-icon.png";
import doneicon from "../assets/icons/done-icon.png";
import "./ControlPanelGlobalStyle.css";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  message: yup.string().required("Mesaj boş olamaz"),
});

function Helphelpreqs(props) {
  const formik = useFormik({
    initialValues: [
      {
        id: 1,
        message: "",
      },
      {
        id: 2,
        message: "",
      },
      {
        id: 3,
        message: "",
      },
    ],
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [helpreqsTrue, sethelpreqsTrue] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: true,
    },
  ]);

  const [helpreqsFalse, sethelpreqsFalse] = useState([
    {
      id: 4,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 5,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores consequuntur, 
      facere neque! Quis maiores sint, temporibus tempora alias fugiat rem provident!`,
      email: "john@example.com",
      date: "12.01.2024",
      answered: false,
    },
    {
      id: 6,
      name: "John Doe",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Asperiores velit explicabo cumque repellendus, numquam vel aut eius dolores 
      consequuntur, facere neque! Quis maiores sint, temporibus 
      tempora alias fugiat rem provident!`,
      date: "12.01.2024",
      answered: false,
    },
  ]);
  const helpreqs = props.answered ? helpreqsTrue : helpreqsFalse;
  const changeAnswered = (id) => {
    const helpreq = helpreqs.find((req) => req.id === id);
    const answeredStatus = helpreq.answered
      ? "cevapladığınızdan"
      : "Cevaplamdığınızdan";
    if (
      window.confirm(
        helpreq.name +
          " kişisinin sorununu " +
          answeredStatus +
          " emin misiniz?"
      )
    ) {
      helpreq.answered = !helpreq.answered;
      if (helpreq.answered === true) {
        const updateReqs = helpreqsFalse.filter((requ) => requ.id !== id);
        sethelpreqsFalse(updateReqs);
        helpreqsTrue.push(helpreq);
      } else {
        const updateReqs = helpreqsTrue.filter((requ) => requ.id !== id);
        sethelpreqsTrue(updateReqs);
        helpreqsFalse.push(helpreq);
      }
    }
  };
  return (
    <div className="cp-data-container">
      {helpreqs.map((helpreq) => (
        <div key={helpreq.id} className="cp-data-card">
          <h4>{helpreq.name}</h4>
          <p>{helpreq.email}</p>
          <p>{helpreq.content}</p>
          <p>{helpreq.balance}</p>
          <p>{helpreq.date}</p>
          <p style={{ color: helpreq.answered ? "green" : "red" }}>
            {helpreq.answered ? "cevaplandı" : "cevaplanmadı"}
          </p>
          {!helpreq.answered && (
            <div className="help-form-container">
              <form
                className="helpreq-form"
                onSubmit={() => changeAnswered(helpreq.id)}
              >
                <textarea
                  className="contacus-from-inputs"
                  name={`${helpreq.id}.message`}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  id="message"
                  cols="30"
                  placeholder="Cevap"
                  rows="5"
                ></textarea>
                {formik.errors.message && formik.touched.message ? (
                  <div>{formik.errors.message}</div>
                ) : null}
                <button type="submit">Cevapla</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Helphelpreqs;
