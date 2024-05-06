import "./ShortUrl.css";
import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import loadingicon from "../assets/icons/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUrlByIdAsync,
  GetUrlByCreatedByAsync,
  GetUrlByIdAsync,
  NewUrlAsync,
  UpdateUrlByIdAsync,
} from "../Api/Url/UrlSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router";

const validationSchema = yup.object({
  OrginalUrl: yup.string().required("Url boş olamaz"),
});

function UpdateUrl() {
  const url = useSelector((state) => state.url.url);
  const success = useSelector((state) => state.url.success);
  const items = useSelector((state) => state.url.items);
  const loading = useSelector((state) => state.url.loading);
  const error = useSelector((state) => state.url.error);
  const status = useSelector((state) => state.url.success);
  const message = useSelector((state) => state.url.message);
  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const data = url !== null ? url : {};
  const dispatch = useDispatch();
  const { Id } = useParams();
  const formik = useFormik({
    initialValues: {
      ID: Id,
      OrginalUrl: "",
      Description: "",
      ShortenedUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(UpdateUrlByIdAsync(formik.values));
    },
  });

  useEffect(() => {
    if (success && url !== null) {
      formik.setValues({
        ID: Id,
        OrginalUrl: url.OrginalUrl,
        Description: url.Description,
        ShortenedUrl: url.ShortenedUrl,
      });
    }else{

      dispatch(GetUrlByIdAsync(Id))
    }
  }, [dispatch, url]);
  
  console.log(url);
  return (
    <div className="short-url-container">
      <form className="short-url-form" onSubmit={formik.handleSubmit}>
        {status ? (
          <span style={{ color: "green", textAlign: "center" }}>{message}</span>
        ) : (
          <span style={{ color: "red", textAlign: "center" }}>{error}</span>
        )}
        {loading && <img src={loadingicon} className="loading-icon" />}
        <input
          className="url-input shorturl-form-input"
          type="text"
          name="OrginalUrl"
          id="OrginalUrl"
          onChange={formik.handleChange}
          value={formik.values.OrginalUrl}
          placeholder="Url(zorunlu)"
        />
        <div className="inputs-and-btn">
          <label htmlFor="ShortenedUrl">Başlık</label>
          <input
            type="text"
            name="ShortenedUrl"
            className="shorturl-form-input sui1"
            onChange={formik.handleChange}
            value={formik.values.ShortenedUrl}
            placeholder="Başlık(opsiyonel)"
          />
          <label htmlFor="Description">Açıklama</label>
          <input
            type="text"
            name="Description"
            className="shorturl-form-input sui1"
            onChange={formik.handleChange}
            value={formik.values.Description}
            placeholder="Açıklama(opsiyonel)"
          />
          <button className="form-short-btn" type="submit">
            <img src={sendicon} alt="" />
          </button>
        </div>
        {formik.errors.OrginalUrl && formik.touched.OrginalUrl ? (
          <span className="error-message">{formik.errors.OrginalUrl}</span>
        ) : null}
      </form>
    </div>
  );
}

export default UpdateUrl;
