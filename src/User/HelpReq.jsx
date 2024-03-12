import React, { useEffect, useState } from "react";
import "./HelpReq.css";
import { useFormik } from "formik";
import * as yup from "yup";
import trashicon from "../assets/icons/trash-icon.png";
import { useDispatch, useSelector } from "react-redux";
import loadingico from "../assets/icons/loading.gif";
import uploadicon from "../assets/icons/uploadicon.png";
import {
  GetHelpRequestsByUserAsync,
  NewHelpRequestAsync,
} from "../Api/Help/HelpSlice";
import { formatDate } from "./Profile";
import { UploadImage, UploadVideo } from "../Api/File/FileSlice";

const validationSchema = yup.object({
  Content: yup.string().required("Mesaj boş olamaz"),
});

function HelpReq() {
  const items = useSelector((state) => state.help.items);
  const success = useSelector((state) => state.help.success);
  const url = useSelector((state) => state.file.url);
  const videoUrl = useSelector((state) => state.file.videoUrl);
  const fileloading = useSelector((state) => state.file.loading);
  const [inValidType, setİnvalidType] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Title: "",
      Content: "",
      VideoUrl: "",
      ImageUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(NewHelpRequestAsync(values));
      formik.resetForm();
    },
  });
  const data = items !== null ? items : [];
  useEffect(() => {
    dispatch(GetHelpRequestsByUserAsync());
    console.log("uese effect");
  }, [dispatch]);

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setFile(file);
  };
  const handleUpload = (file) => {
    file == null
      ? setİnvalidType(true)
      : dispatch(UploadImage(file)) && setİnvalidType(false);
  };
  const setFormikValue = (value, data) => {
    formik.setFieldValue(value, data);
  };

  const handleUploadVideo = async (file) => {
    file == null ? setİnvalidType(true) : dispatch(UploadVideo(file));
  };

  const handleUploadFile = () => {
    if (file.type === "video/mp4") {
      handleUploadVideo(file);
    } else {
      handleUpload(file);
    }
  };

  useEffect(() => {
    if (url) {
      setFormikValue("ImageUrl", url);
      document.getElementById('fileInput').value = '';
      setFile(null);
    }
  }, [url]);

  useEffect(() => {
    if (videoUrl) {
      setFile(null);
      document.getElementById('fileInput').value = '';
      setFormikValue("VideoUrl", videoUrl);
      console.log(videoUrl);
    }
  }, [videoUrl]);

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
          <div className="file-upload-container">
            <h3>Dosya Ekle(opsiyonel)</h3>
            {formik.values.ImageUrl && (
              <div className="uploaded-img">
                <a
                  target="_blank"
                  href={formik.values.ImageUrl}
                  rel="noreferrer"
                >
                  <img
                    className="uploaded-content"
                    src={formik.values.ImageUrl}
                    alt="fotoğraf"
                  />
                </a>
                <button
                  className="remove-file-btn"
                  type="button"
                  onClick={() => setFormikValue("ImageUrl", "")}
                >
                  <img src={trashicon} alt="sil" />
                </button>
              </div>
            )}
            {formik.values.VideoUrl && (
              <div className="uploaded-img">
                <a
                  target="_blank"
                  href={formik.values.VideoUrl}
                  rel="noreferrer"
                >
                  <video
                    className="uploaded-content"
                    controls={false}
                    autoPlay={false}
                    muted
                  >
                    <source src={formik.values.VideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </a>
              </div>
            )}
            {inValidType && (
              <span style={{ color: "red" }}>File not selected</span>
            )}
            <input
            id="fileInput" 
              accept=".jpg, .jpeg, .png, .gif, .mp4"
              className="upload-file"
              onChange={(event) => handleFileChange(event)}
              type="file"
            />
            {fileloading && (
              <img className="loading-icon" src={loadingico} alt="loading" />
            )}
            <button
              className="file-upload-container-button"
              type="button"
              onClick={handleUploadFile}
            >
             <img src={uploadicon} alt="Yükle" />
            </button>
          </div>
          <button className="helpreq-form-btn" type="submit">
            Gönder
          </button>
        </form>
      </div>
      <div className="last-helpreqs">
        {success &&
          data.map((req, index) => (
            <div key={index} className="helpreq-card">
              <span className="helpreq-card-titles">Mesajınız: </span>
              <p>{req.Content}</p>
              <div className="help-card-media">
                <h4>Dosyalar</h4>
                {req.ImageUrl && (
                  <div className="uploaded-img">
                    <img
                      className="uploaded-content"
                      src={req.ImageUrl}
                      alt="fotoğraf"
                    />
                  </div>
                )}
                {req.VideoUrl && (
                  <div className="uploaded-img">
                    <video
                      className="uploaded-content"
                      controls={false}
                      autoPlay={false}
                      muted
                    >
                      <source src={req.VideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
              <span className="helpreq-card-titles">Tarih: </span>
              <p>{formatDate(req.createdAt)}</p>
              {req.status ? (
                <>
                  <span className="helpreq-card-titles">
                    Cevaplandı: {formatDate(req.updatedAt)}{" "}
                  </span>
                  <p>{req.Answer}</p>
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
