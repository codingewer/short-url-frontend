import React, { useEffect, useState } from "react";
import rejecticon from "../assets/icons/close-icon.png";
import loadingico from "../assets/icons/loading.gif";
import "./ControlPanelGlobalStyle.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  GetHelpRequestsByStatusAsync,
  UpdateHelpRequestStatusAsync,
} from "../Api/Help/HelpSlice";
import { formatDate } from "../User/Profile";

const validationSchema = yup.object({
  Answer: yup.string().required("Mesaj boş olamaz"),
});

function Helphelpreqs(props) {
  const items = useSelector((state) => state.help.items);
  const status = useSelector((state) => state.help.success);
  const loading = useSelector((state) => state.help.loading);
  const error = useSelector((state) => state.help.error);
  const dispatch = useDispatch();
  const [formTitle, setFormTitle] = useState("Başlık");
  const [helpID, setHelpID] = useState("");
  const formik = useFormik({
    initialValues: {
      Answer: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(
        UpdateHelpRequestStatusAsync({
          Answer: values.Answer,
          status: true,
          ID: helpID,
        })
      );
      formik.resetForm();
      HandldeTogleForm("Başlık", "");
    },
  });
  const [isToggled, setToggled] = useState(true);
  const HandldeTogleForm = (title, id) => {
    setFormTitle(title);
    setHelpID(id);
    const linksMenu = document.getElementById("cp-help-form-25t");
    setToggled(!isToggled);
    isToggled
      ? linksMenu.classList.add("cphelp-form-close")
      : linksMenu.classList.remove("cphelp-form-close");
  };
  const helpReqs = items !== null ? items : [];
  useEffect(() => {
    dispatch(GetHelpRequestsByStatusAsync(props.answered));
  }, [props.answered, dispatch]);
  return (
    <div className="cp-data-container">
      {loading && <img className="loading-icon" src={loadingico} alt="" />}
      <form
        id="cp-help-form-25t"
        className="cphelpreq-form"
        onSubmit={formik.handleSubmit}
      >
        <button
          type="button"
          onClick={() => HandldeTogleForm("başlık", "")}
          style={{ background: "none", border: "none" }}
        >
          <img style={{ height: 18 }} src={rejecticon} alt="kapat" />
        </button>
        <h4>{formTitle}</h4>
        <textarea
          className="contacus-from-inputs"
          name="Answer"
          value={formik.values.Answer}
          onChange={formik.handleChange}
          cols="30"
          placeholder="Cevap"
          rows="5"
        ></textarea>
        {formik.errors.Answer && formik.touched.Answer ? (
          <div>{formik.errors.Answer}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Gönder
        </button>
      </form>
      {helpReqs.length !== 0 &&
        helpReqs.map((helpreq) => (
          <div key={helpreq.ID} className="cp-data-card">
            <h4>{helpreq.user.UserName}</h4>
            <p>{helpreq.Title}</p>
            <p>{helpreq.Content}</p>
            <div className="help-card-media">
              <h4>Dosyalar:</h4>
              {helpreq.ImageUrl && (
                <div className="uploaded-img">
                  <a target="_blank" href={helpreq.ImageUrl} rel="noreferrer">
                    <img
                      className="uploaded-content"
                      src={helpreq.ImageUrl}
                      alt="fotoğraf"
                    />
                  </a>
                </div>
              )}
              {helpreq.VideoUrl && (
                <div className="uploaded-img">
                  <a target="_blank" href={helpreq.VideoUrl} rel="noreferrer">
                    <video
                      className="uploaded-content"
                      controls={false}
                      autoPlay={false}
                      muted
                    >
                      <source src={helpreq.VideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </a>
                </div>
              )}
            </div>

            {helpreq.status && <p>{helpreq.Answer}</p>}
            <p>{formatDate(helpreq.createdAt)}</p>
            <div style={{ color: helpreq.status ? "green" : "red" }}>
              {helpreq.status ? (
                <div>
                  <p>Cevaplandı:</p>
                  <p>{formatDate(helpreq.updatedAt)}</p>
                </div>
              ) : (
                "cevaplanmadı"
              )}
            </div>

            {!helpreq.status && (
              <button
                className="form-btn"
                onClick={() => HandldeTogleForm(helpreq.Content, helpreq.ID)}
              >
                Cevapla
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Helphelpreqs;
