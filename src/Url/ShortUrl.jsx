import "./ShortUrl.css";
import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import { useDispatch, useSelector } from "react-redux";
import loadingicon from "../assets/icons/loading.gif";

import { GetUrlByCreatedByAsync, NewUrlAsync } from "../Api/Url/UrlSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import LastUrls from "./LastUrls";

const validationSchema = yup.object({
  OrginalUrl: yup.string().required("Url boş olamaz"),
});

function ShortUrl() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.url.items);
  const loading = useSelector((state) => state.url.loading);
  const error = useSelector((state) => state.url.error);
  const status = useSelector((state) => state.url.success);
  const message = useSelector((state) => state.url.message);
  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {};

  const formik = useFormik({
    initialValues: {
      OrginalUrl: "",
      Description: "",
      ShortenedUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(NewUrlAsync(formik.values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync(user.ID));
  }, [usersuccess]);

  console.log(items);
  return (
    <div className="short-url-container">
      {user.Blocked === true && (
        <span style={{ color: "red", textAlign: "center", fontWeight: 600 }}>
          Engellendiniz link kısaltamazsınız
        </span>
      )}
      <span className="form-title">Linkinizi kısaltın</span>
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
          <input
            type="text"
            name="ShortenedUrl"
            className="shorturl-form-input sui1"
            onChange={formik.handleChange}
            value={formik.values.ShortenedUrl}
            placeholder="Başlık(opsiyonel)"
          />
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
      <span className="content-title">Son Linkler</span>
      <LastUrls />
    </div>
  );
}

export default ShortUrl;
