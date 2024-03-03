import React, { useEffect } from "react";
import "./ControlPanelGlobalStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { GetFaqByIdAsync, UpdateFaqByIdAsync } from "../Api/Faq/FaqSlice";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import loadingico from "../assets/icons/loading.gif";

function UpdateFaq() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const faq = useSelector((state) => state.faqs.data);
  const success = useSelector((state) => state.faqs.success);
  const postsuccess = useSelector((state) => state.faqs.postsuccess);
  const loading = useSelector((state) => state.faqs.loading);
  const FaqFrom = useFormik({
    initialValues: {
      ID: "",
      Question: "",
      Answer: "",
    },
    onSubmit: async (values) => {
      await dispatch(UpdateFaqByIdAsync(values));
    },
  });

  useEffect(() => {
    if (success && faq !== null) {
      FaqFrom.setValues({
        ID: faq.ID,
        Question: faq.Question,
        Answer: faq.Answer,
      });
    } else {
      dispatch(GetFaqByIdAsync(id));
    }
  }, [dispatch, faq]);
  return (
    <div className="cp-data-container">
      <div className="faq-container">
        <form className="cp-details-form" onSubmit={FaqFrom.handleSubmit}>
          <h4>Sıkça Sorulan Sorular</h4>
          <label htmlFor="">Soru:</label>
          <textarea
            className="cp-form-inputs"
            type="text"
            name="Question"
            style={{ height: 200 }}
            value={FaqFrom.values.Question}
            onChange={FaqFrom.handleChange}
          />
          <label htmlFor="">Cevap:</label>
          <textarea
            className="cp-form-inputs"
            name="Answer"
            style={{ height: 200 }}
            value={FaqFrom.values.Answer}
            onChange={FaqFrom.handleChange}
          ></textarea>
          {loading && (
            <img className="loading-icon" src={loadingico} alt="loading" />
          )}
          <button disabled={loading}  type="submit" className="cp-form-btn">
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFaq;
