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

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
  }, [])

  return (
    <div className="short-url-container">
      {user?.Blocked === true && (
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
      <div
      style={{
        paddingTop:48
      }}
      >
        <h1
        style={{
          color: "darkslategray",
          fontSize: "32px",
          fontWeight: "700",
          textAlign: "left",
        }}
        
        >POLİTİKALAR</h1>
        <span
        style={{
          color: "darkslategray",
          fontSize: "16px",
          fontWeight: "500",
          textAlign: "left",
        }}
        >
          Tüm kullanıcıların aşağıdaki program politikalarına uyması
          gerekmektedir. Bu ihlallerin gerçekleşmesi durumunda hesabınızın devre
          dışı bırakılması hakkınımı saklı tutarız.
        </span>
        <ul className="policy-list">
          <li>
            Şiddeti yücelten, nefret söylemi içeren, tacize veya zorbalık ya da
            müstehcenlikle ilgili içeriğe bağlantı verilmesine izin verilmez.
          </li>
          <li>
            Yasa dışı uyuşturucularla ve diğerleri ile ilgili içeriğe bağlantı
            verilmesine izin verilmez.
          </li>
          <li>
            Bağlantılarının birbirine bağlanmasına ("döngü trafiği") veya
            ziyaretçilerin kafasını karıştırmak için başka yöntemler
            kullanılmasına izin verilmez.
          </li>
          <li>
            Gerekli haklara sahip olmadan telif hakkını ihlal eden veya korunan
            içeriğe bağlantı verilmesine izin verilmez. (müzik, film ve daha
            fazlası).
          </li>
          <li>
            Ziyaretçiyi yanıltmak amacı ile yanıltıcı veya aldatıcı yazılımlara
            bağlantı verilmesine izin verilmez.
          </li>
          <li>
            Kötü amaçlı yazılım veya reklam yazılımı içeriğine bağlantı
            verilmesine izin verilmez.
          </li>
          <li>
            Ziyaretçi sayısını gerçek dışı bir şekilde artırmak için kendi
            bağlantılarınıza tıklamanıza veya başka yöntemler kullanmanıza izin
            verilmez.
          </li>
          <li>
            Tıklama oluşturmak için üçüncü taraf hizmetleri, Botlar, Tıklama
            karşılığı ödeme, Otomatik Gezinme, Tıklama Değişim programları..
            gibi uygulamalar yasaktır. Bu politikaların ihlali sonucunda
            hesabınız para çekmenize izin verilmeden kapatılacaktır.
          </li>
          <span
          style={{
            color: "red",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "left",
          }}
          >

          Bu politikaların ihlali sonucunda hesabınız para çekmenize izin
          verilmeden kapatılacaktır.
          </span>
        </ul>
      </div>
    </div>
  );
}

export default ShortUrl;
