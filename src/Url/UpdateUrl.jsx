import "./ShortUrl.css";
import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUrlByIdAsync,
  GetUrlByCreatedByAsync,
  GetUrlByIdAsync,
  NewUrlAsync,
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
      dispatch(NewUrlAsync(formik.values));
      formik.resetForm();
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
        <span className="form-title">Linkinizi kısaltın</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="ShortenedUrl"
            onChange={formik.handleChange}
            value={formik.values.ShortenedUrl}
            placeholder="Başlık(opsiyonel)"
          />
          <input
            type="text"
            name="Description"
            onChange={formik.handleChange}
            value={formik.values.Description}
            placeholder="Açıklama(opsiyonel)"
          />
        </div>
        <div className="inputs-and-btn">
          <input
            className="url-input"
            type="text"
            name="OrginalUrl"
            id="OrginalUrl"
            onChange={formik.handleChange}
            value={formik.values.OrginalUrl}
            placeholder="Url(zorunlu)"
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
