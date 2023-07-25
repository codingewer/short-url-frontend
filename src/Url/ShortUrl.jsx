import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import usericon from "../icons8-user-32.png";
import "./ShortUrl.css";
import trashicon from "../trash24.png";

function ShortUrl() {
  //link kopyalayan  fonksiyon
  const CopyContent = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(
      "https://linkkisalt.netlify.app/url/" + copyText.value
    );
    alert(
      "Kopyalandı: " + "https://linkkisalt.netlify.app/url/" + copyText.value
    );
  };

  //kullanılan değişkenleri tanımladık
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [day, setDay] = useState();
  const itemsStatus = items.length >= 1 ? true : false;
  const [status, setStatus] = useState(Boolean);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("user");
  const logined = Boolean(localStorage.getItem("logined"));
  const [shortenedUrl, setShortenedUrl] = useState("");

  //Kullanıcı çıkışı yapan fonksiyon
  const Signout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    setStatus(true);
  };

  //link kısalmak için veriyi alıp API'ye ileten fonksiyon
  const ShortLink = (e) => {
    axios
      .post("https://shorturl-ptsr.onrender.com/url/add", {
        OrginalUrl: url,
        ShortenedUrl: shortenedUrl,
        CreatedBy: username,
        ValidityDays: parseInt(day),
      })
      .then(function (response) {
        console.log(response);
        setItems((items) => [...items, response.data]);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.ERROR);
        setError(true);
      });
    setShortenedUrl("");
    setUrl("");
    e.preventDefault();
  };
  const removeObjectWithId =(id)=> {
    const objWithIdIndex = items.findIndex((obj) => obj.ID !== id);
  
    if (objWithIdIndex > -1) {
      items.splice(objWithIdIndex, 1);
    }
  
    return items;
  }

  const DeleteLink = (id) => {
    axios
      .delete("https://shorturl-ptsr.onrender.com/url/delete/"+id, {
       data:{ CreatedBy: username}
      })
      .then(function (response) {
       setItems((items)=>items.filter((item)=> item.ID!==id))
      })
      .catch(function (error) {
       console.log(error)
      });
  };

  //sayfa yüklenince Kullanıcıya ait linkler yüklenir
  useEffect(() => {
    axios
      .get(
        "https://shorturl-ptsr.onrender.com/url/getbycreatedby/" +
          username
      )
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

  return (
    //sayfa tasarımı
    <div className="shorturl">
      <div className="navbar">
        <div className="title">Link Kısalt</div>
        <div onClick={() => UsersBtns("signouttn")} className="user-icon">
          <img src={usericon} alt="" /> <p>{username}</p>
          <button
            id="signouttn"
            className="signout-btn"
            onClick={() => Signout()}
          >
            Çıkış
          </button>
        </div>
      </div>
      <div className="content">
        <div className="form-div">
        <a className="goto-statics" target="_blank" href="https://shorturlcounts.netlify.app/">İstasitklere git</a>
          <form className="short-url-form">
            {error && <p style={{ color: "red" }}>{message}</p>}
            <h3>Linki kısalt</h3>
            <input
              type="url"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              placeholder="Url(zorunlu)"
            />
            <div
              className="inputs-and-btn"
              style={{ display: "flex", width: "100%", gap: "20px" }}
            >
              <input
                type="number"
                onChange={(e) => setDay(e.target.value)}
                value={day}
                min="0"
                placeholder="Geçerilik Süresi(Gün)"
              />
              <input
                onChange={(e) => ShortenedUrlInput(e.target.value)}
                value={shortenedUrl}
                type="text"
                maxLength="10"
                placeholder="isim(opsiyonel)"
              />
              <button
                className="form-btn"
                disabled={url == "" ? true : false}
                type="submit"
                onClick={(e) => ShortLink(e)}
              >
                Kısalt
              </button>
            </div>
          </form>
          <div className="last-shorted">
            <h3>Linklerim</h3>
            {itemsStatus &&
              items.map((item) => (
                <div key={item.ID} className="link-card">
                  <div>
                    <button
                      onClick={() => DeleteLink(item.ID)}
                      style={{ border: "none", background: "none" }}
                    >
                      <img src={trashicon} />
                    </button>
                  </div>
                  <div>{item.RemainingDay} gün</div>
                  <div className="link-card-content">
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#4B56D2",
                      }}
                      href={item.OrginalUrl}
                    >
                      {item.OrginalUrl}
                    </a>
                  </div>
                  <div className="link-card-content">
                    <a target="_blank" href={"/url/" + item.ShortenedUrl}>
                      <input disabled id={item.ID} value={item.ShortenedUrl} />
                    </a>
                  </div>
                  <div className="btn-div">
                    <button
                      onClick={() => CopyContent(item.ID)}
                      className="card-btn form-btn"
                    >
                      Kopyala
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="how-work">
          <h3>Nasıl Çalışır?</h3>
          <p>
            Kısaltmak istedğiniz link girilir ve ona karşılık gelen kısa bir ad
            oluşturulur. Bu ad veri tabanında tutulur ve sizin belirledğiniz
            süre boyunca orda kalır süre bitince silinir. Kullanıcı adı ve şifre
            ile kayıt olduktan sonra istedğiniz kadar link kısaltabilirisiniz.
          </p>
        </div>
      </div>
      {!logined && <Navigate to="/home" />}
      {status && <Navigate to="/home" />}
    </div>
  );
}

export default ShortUrl;
