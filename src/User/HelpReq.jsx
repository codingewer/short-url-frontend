import React, { useEffect, useState } from "react";
import "./HelpReq.css";
import { useFormik } from "formik";
import * as yup from "yup";
import trashicon from "../assets/icons/trash-icon.png";
import { useDispatch, useSelector } from "react-redux";
import urlico from "../assets/icons/urlico.svg";
import doneicon from "../assets/icons/Done.svg";
import pendingico from "../assets/icons/Hourglass.svg";

import uploadicon from "../assets/icons/uploadicon.png";
import uploadicongif from "../assets/icons/uploadico.gif";
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
      document.getElementById("fileInput").value = "";
      setFile(null);
    }
  }, [url]);

  useEffect(() => {
    if (videoUrl) {
      setFile(null);
      document.getElementById("fileInput").value = "";
      setFormikValue("VideoUrl", videoUrl);
      console.log(videoUrl);
    }
  }, [videoUrl]);
  console.log(data);
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
            <h3>Ek Dosyalar</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
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
                  <button
                    className="remove-file-btn"
                    type="button"
                    onClick={() => setFormikValue("VideoUrl", "")}
                  >
                    <img src={trashicon} alt="sil" />
                  </button>
                </div>
              )}
              {inValidType && (
                <span style={{ color: "red" }}>File not selected</span>
              )}
            </div>

            <div>
              <input
                id="fileInput"
                accept=".jpg, .jpeg, .png, .gif, .mp4"
                className="upload-file"
                onChange={(event) => handleFileChange(event)}
                type="file"
              />
              <button
                className="file-upload-container-button"
                type="button"
                onClick={handleUploadFile}
              >
                <img
                  style={{
                    height: 32,
                  }}
                  src={fileloading ? uploadicongif : uploadicon}
                  alt="Yükle"
                />
              </button>
            </div>
            <button className="helpreq-form-btn" type="submit">
              Gönder
            </button>
          </div>
        </form>
      </div>
      <div className="last-helpreqs">
        {success &&
          data.map((req, index) => (
            <div key={index} className="helpreq-card">
              <span className="helpreq-card-titles">{req.Title} </span>
              <p>{req.Content}</p>
              {req.ImageUrl !== "" && req.VideoUrl !== "" && (
                <div className="help-card-media">
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    Dosyalar
                  </span>

                  <div className="supports-url">
                    <img
                      style={{
                        height: 24,
                      }}
                      src={urlico}
                      alt="imageurl"
                    />
                    <a
                      a
                      target="_blank"
                      href={req.ImageUrl}
                      rel="noreferrer"
                      className="support-url-text"
                    >
                      {req.ImageUrl}
                    </a>
                  </div>
                  <a
                    a
                    target="_blank"
                    href={req.VideoUrl}
                    rel="noreferrer"
                    className="supports-url"
                  >
                    <img
                      style={{
                        height: 24,
                      }}
                      src={urlico}
                      alt="imageurl"
                    />
                    <span className="support-url-text">{req.VideoUrl}</span>
                  </a>
                </div>
              )}
              <p>{formatDate(req.createdAt)}</p>
              {req.status ? (
                <>
                  {" "}
                  <img  className="helpreq-status-ico" src={doneicon} style={{ height: 32 }} />
                  <span 
                  
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "green",
                  }}
                  >
                    Cevaplandı: {formatDate(req.updatedAt)}{" "}
                  </span>
                  <p>{req.Answer}</p>
                </>
              ) : (
                <img className="helpreq-status-ico" src={pendingico} style={{ height: 32 }} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default HelpReq;
