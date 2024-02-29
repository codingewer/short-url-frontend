import "./ShortUrl.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import sendicon from "../assets/icons/send-icon.png";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { GetUrlByCreatedByAsync, NewUrlAsync } from "../Api/Url/UrlSlice";
import { useFormik } from "formik";

function ShortUrl() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.url.items);
  const success = useSelector((state) => state.url.success);
  const user = JSON.parse(localStorage.getItem("user"));
  const currentURL = window.location.href;
  const domain = currentURL.split("/dashboard/shorturl")[0];
  const CopyContent = (urll) => {
    navigator.clipboard
      .writeText(domain + "/l/" + urll + "/r/1")
      .then(() => {
        alert("Kopyalandı: " + domain + urll);
      })
      .catch((err) => {
        console.error("Metin kopyalanırken bir hata oluştu:", err);
        alert("Metin kopyalanırken bir hata oluştu!");
      });
  };

  const formik = useFormik({
    initialValues: {
      OrginalUrl: "",
      Description: "",
      Title: "",
    },
    onSubmit: async () => {
      dispatch(NewUrlAsync(formik.values));
      formik.resetForm();
    },
  });
  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync());
  }, [dispatch]);
  const displayItems = success && items !== null ? items : [];
  console.log(items);
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
            name="Title"
            id="Title"
            onChange={formik.handleChange}
            value={formik.values.Title}
            placeholder="Başlık(opsiyonel)"
          />
          <input
            type="text"
            name="Description"
            id="Description"
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
      </form>
      {displayItems.length !== 0 && (
        <div className="last-shortened-urls">
          <span className="contents-titles">Son Linkler</span>
          {displayItems.map((item, index) => (
            <div key={index} className="last-shortened-url">
              <h3 className="card-index">{index + 1}</h3>
              <a
                target="_blank"
                rel="noreferrer"
                className="url-name"
                href={domain + "/l" + item.ShortenedUrl + "/r/1"}
              >
                {domain + item.ShortenedUrl}
              </a>
              <div className="card-btns">
                <button
                  className="copy-btn"
                  onClick={() => CopyContent(item.ShortenedUrl)}
                >
                  <img src={copyicon} alt="Kopyala" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
                <button
                  className="delete-btn"
                  //  onClick={() => DeleteLink(item.ID)}
                >
                  <img src={trashicon} alt="Sil" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShortUrl;
