import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ShortUrl.css";
import sendicon from "../assets/icons/send-icon.png";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import economyicon from "../assets/icons/economy.png";
import freeicon from "../assets/icons/free-pay.png";
import quickicon from "../assets/icons/quick-start.png";
import { Link } from "react-router-dom";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";

function ShortUrl() {
  const currentURL = window.location.href;
  const domain = currentURL.split("shorturl")[0];
  const CopyContent = (urll) => {
    navigator.clipboard
      .writeText(domain + urll)
      .then(() => {
        console.log("Metin kopyalandı:", domain + urll);
        alert("Kopyalandı: " + domain + urll);
      })
      .catch((err) => {
        console.error("Metin kopyalanırken bir hata oluştu:", err);
        alert("Metin kopyalanırken bir hata oluştu!");
      });
  };

  //kullanılan değişkenleri tanımladık
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("user");
  const logined = Boolean(localStorage.getItem("logined"));
  const [shortenedUrl, setShortenedUrl] = useState("");

  //Kullanıcı çıkışı yapan fonksiyon
  const Signout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
  };

  //link kısalmak için veriyi alıp API'ye ileten fonksiyon
  const ShortLink = (e) => {
    logined === true
      ? axios
          .post("http://localhost:8180/url/add", {
            OrginalUrl: url,
            ShortenedUrl: shortenedUrl,
            CreatedBy: username,
          })
          .then(function (response) {
            console.log(response.data);
            setUrl(response.data.ShortenedUrl);
            setShortenedUrl("");
            setUrl("");
            setStatus(true);
            setItems((items) => [...items, response.data]);
          })
          .catch(function (error) {
            console.log(error);
            setMessage(error.response.data.ERROR);
            setError(true);
            setStatus(false);
          })
      : window.location.replace("/login");
    e.preventDefault();
  };
  const removeObjectWithId = (id) => {
    const objWithIdIndex = items.findIndex((obj) => obj.ID !== id);

    if (objWithIdIndex > -1) {
      items.splice(objWithIdIndex, 1);
    }

    return items;
  };

  const DeleteLink = (id) => {
    axios
      .delete("http://localhost:8180/url/delete/" + id, {
        data: { CreatedBy: username },
      })
      .then(function (response) {
        setItems((items) => items.filter((item) => item.ID !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //sayfa yüklenince Kullanıcıya ait linkler yüklenir
  useEffect(() => {
    axios
      .get("http://localhost:8180/url/getbycreatedby/" + username)
      .then(function (response) {
        setItems(Array.from(response.data));
      })
      .catch(function (error) {
        setMessage(error.response.data.ERROR);
        setError(true);
      });
  }, []);

  const ShortenedUrlInput = (value) => {
    setShortenedUrl(value);
    if (parseInt(shortenedUrl.length) > 10) {
      setMessage("İsim 10 karakterden uzun olamaz");
      setError(true);
    }
  };
  const [btnson, setBtnson] = useState(false);
  const UsersBtns = (id) => {
    if (btnson) {
      document.getElementById(id).style.display = "none";
      setBtnson(false);
    } else {
      document.getElementById(id).style.display = "flex";
      setBtnson(true);
    }
  };

  const wwu = [
    {
      title: "Başlaması çok kolay",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın`,
      iconUrl: quickicon,
    },
    {
      title: "Başlaması çok kolay",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın`,
      iconUrl: freeicon,
    },
    {
      title: "Başlaması çok kolay",
      subTitle: `Hemen kaydolun ve kısalttığınız linklere basıldıkça para
      kazanın`,
      iconUrl: economyicon,
    },
  ];

  return (
    //sayfa tasarımı
    <>
    <div className="shorturl">
      <div className="shorturl-bg-banner"></div>
      <div className="short-url-content">
        <div className="form-div">
          <div className="get-started">
            <div className="get-started-texts">
              <span className="gs-title">Hızlı kolay ve anlışılır</span>
              <span className="gs-sub-title">
                Linklerini kısalt paylaş linklerle reklam göster ve reklamlardan
                kazanç elde et hem başlaması çok kolay!
              </span>
            </div>
            <div className="gs-links">
              <a href="#work-with-us">Daha fazla bilgi edinin</a>
              <Link className="gs-login-link" to="/login">
                Şimdi başlayın
              </Link>
            </div>
          </div>
          <form className="short-url-form">
            {error && <p style={{ color: "red" }}>{message}</p>}
            <span className="form-title">Linkinizi kısaltın</span>
            <div className="inputs-and-btn">
              <input
                type="url"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder="Url(zorunlu)"
                />
              <button
                className="form-short-btn"
                type="submit"
                onClick={(e) => ShortLink(e)}
                >
                <img src={sendicon} alt="" />
              </button>
            </div>
          </form>
          {items.length !== 0 && (
            <div className="last-shortened-urls">
              <span className="contents-titles">Son Linkler</span>
              {items.map((item, index) => (
                <div key={index} className="last-shortened-url">
                  <h3 className="card-index">{index + 1}</h3>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="url-name"
                    href={domain + item.ShortenedUrl}
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
                      onClick={() => DeleteLink(item.ID)}
                      >
                      <img src={trashicon} alt="Sil" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div id="work-with-us" className="work-with-us">
            <span className="contents-titles">bizimle çalışın</span>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 48,
              }}
              >
              {wwu.map((item, index) => (
                <div key={index} className="wwu-card">
                  <div className="wwu-card-icon">
                    <img src={item.iconUrl} alt={item.title} />
                  </div>
                  <div className="wwu-content">
                    <span className="wwu-title">{item.title}</span>
                    <span className="wwu-sub-title">{item.subTitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
      {/*!logined && <Navigate to="/home" />}
      {status && <Navigate to="/home" />*/}
    </div>
    <Footer />
      <TopBar />
      </>
  );
}

export default ShortUrl;
