import "./ShortUrl.css";
import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import editicon from "../assets/icons/edit-icon.png";
import { useDispatch, useSelector } from "react-redux";
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

  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync());
  }, []);

  const displayItems =  items !== null ? items : [];
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
      <span className="contents-titles">Son Linkler</span>
      {displayItems.length !== 0 && (
        <div className="last-shortened-urls">
          <table>
            <thead>
              <tr>
                <th style={{ width: 100 }}>#</th>
                <th style={{ width: 400 }}>Url</th>
                <th style={{ width: 200 }}>Tıklanma</th>
                <th style={{ width: 200 }}>Gelir</th>
                <th style={{ width: 200 }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map((item, index) => (
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
                  <td style={{ width: 200 }}>{item.ClickCount}</td>
                  <td style={{ width: 200 }}>{parseInt(item.ClickEarning)}</td>

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
                        onClick={() => CopyContent(item.ShortenedUrl)}
                      >
                        <img src={copyicon} alt="Kopyala" />
                      </button>
                      <button
                      type="button"
                        className="card-btns"
                        onClick={() => DeleteContent(item.ID)}
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
        </div>
      )}
    </div>
  );
}

export default ShortUrl;
