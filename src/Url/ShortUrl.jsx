import { useState } from "react";
import "./ShortUrl.css";
import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import editicon from "../assets/icons/edit-icon.png";
import { useDispatch, useSelector } from "react-redux";
import loadingicon from "../assets/icons/loading.gif";

import {
  DeleteUrlByIdAsync,
  GetUrlByCreatedByAsync,
  NewUrlAsync,
} from "../Api/Url/UrlSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

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
  const currentURL = window.location.href;
  const urlgetloading = useSelector((state) => state.url.getloading);
  const domain = currentURL.split("/dashboard/shorturl")[0];

  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {};
  const [showLimit, setShowLimit] = useState(10);

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
      ShortenedUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(NewUrlAsync(formik.values));
      formik.resetForm();
    },
  });

  const DeleteContent = async (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(DeleteUrlByIdAsync(id));
    }
  };

  const hanldeShowMore = () => {
    setShowLimit(showLimit + 25);
  };

  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync(user.ID));
  }, [usersuccess]);

  const [filtereUrls, setFiltereUrls] = useState([]);
  var filteredurls = [];
  const handleSearch = (searchTerm) => {
    filteredurls = items.filter(
      (url) =>
        url.OrginalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.ShortenedUrl.includes(searchTerm.toLowerCase())
    );
    setFiltereUrls(filteredurls);

  };
  useEffect(() => {
    setFiltereUrls(items);
  }, [items]);

  console.log(items)
  return (
    <div className="short-url-container">
      {user.Blocked === true && (
        <span style={{ color: "red", textAlign: "center", fontWeight: 600 }}>
          Engellendiniz link kısaltamazsınız
        </span>
      )}
      <form className="short-url-form" onSubmit={formik.handleSubmit}>
        {status ? (
          <span style={{ color: "green", textAlign: "center" }}>{message}</span>
        ) : (
          <span style={{ color: "red", textAlign: "center" }}>{error}</span>
        )}
        {loading && <img src={loadingicon} className="loading-icon" />}
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
      <span className="contents-titles">Son Linkler</span>
      {urlgetloading && <img src={loadingicon} className="loading-icon" />}

      {items?.length !== 0 && (
        <div className="last-shortened-urls">
          <input
          placeholder="Ara(orneksite.com)"
          className="searchurlinput"
          
          type="text" onChange={(e) => handleSearch(e.target.value)} />
          <table>
            <thead>
              <tr>
                <th style={{ width: 100 }}>#</th>
                <th style={{ width: 400 }}>Link</th>
                <th style={{ width: 400 }}>Orijinal Link</th>
                <th style={{ width: 200 }}>Tıklanma</th>
                <th style={{ width: 200 }}>Gelir</th>
                <th style={{ width: 200 }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtereUrls?.slice(0, showLimit).map((item, index) => (
                <tr key={index}>
                  <td style={{ width: 100 }}>{index + 1}</td>
                  <td style={{ width: 400 }}>
                    <a
                      className="url-name"
                      target="_blank"
                      rel="noreferrer"
                      href={domain + "/l/" + item.ShortenedUrl + "/r/1"}
                    >
                      {domain + "/l/" + item.ShortenedUrl}
                    </a>
                  </td>
                  <td style={{ width: 400 }}>
                    <a
                      className="url-name"
                      target="_blank"
                      rel="noreferrer"
                      href={item.OrginalUrl}
                    >
                      {item.OrginalUrl}
                    </a>
                  </td>
                  <td style={{ width: 200 }}>{item?.ClickCount}</td>
                  <td style={{ width: 200 }}>{parseInt(item?.ClickEarning)}</td>

                  <td style={{ width: 200 }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        className="card-btns"
                        type="button"
                        onClick={() => CopyContent(item?.ShortenedUrl)}
                      >
                        <img src={copyicon} alt="Kopyala" />
                      </button>
                      <button
                        type="button"
                        className="card-btns"
                        onClick={() => DeleteContent(item?.ID)}
                      >
                        <img src={trashicon} alt="Sil" />
                      </button>
                      <Link
                        className="card-btns"
                        to={"/dashboard/updateurl/" + item.ID}
                      >
                        <img src={editicon} alt="Kopyala" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showLimit < filtereUrls?.length && (
            <button
              className="show-more-btn"
              onClick={hanldeShowMore}
              type="button"
            >
              Daha Falza Göster{filtereUrls.length}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ShortUrl;
