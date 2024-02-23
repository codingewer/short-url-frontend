import "./ShortUrl.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
import sendicon from "../assets/icons/send-icon.png";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";

function ShortUrl() {
    const currentURL = window.location.href;
    const domain = currentURL.split("/dashboard/shorturl")[0];
    const CopyContent = (urll) => {
      navigator.clipboard
        .writeText( domain +"/l/" + urll +"/r/1")
        .then(() => {
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

    const demoİtems = [
      {
        ID: 1,
        OrginalUrl: "https://instagram.com",
        ShortenedUrl: "/insta",
      },
      {
        ID: 2,
        OrginalUrl: "https://x.com",
        ShortenedUrl: "/twitter",
      },
    ]
  const displayItems =  logined ? items : demoİtems;
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
items.reverse()
  return (
    <div className="short-url-container" >
       <form className="short-url-form">
              {error && <p style={{ color: "red" }}>{message}</p>}
              <span className="form-title">Linkinizi kısaltın</span>
              <div  style={{display:"flex", flexDirection:"column", gap:14, width:"100%", alignItems:"center"}} >
                <input type="text" placeholder="Kısaltma Adı(opsiyonel)" />
                <input type="text" placeholder="Açıklama(opsiyonel)" />
              </div>
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
                      href={domain + "/l" +  item.ShortenedUrl +"/r/1"}
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
    </div>
  )
}

export default ShortUrl