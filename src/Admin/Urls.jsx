import React, { useEffect, useState } from "react";
import "../Url/ShortUrl.css";
import axios from "axios";
import "./ControlPanelGlobalStyle.css";
import copyicon from "../assets/icons/copy-icon.png";

function Urls() {
  const currentURL = window.location.href;
  const domain = currentURL.split("controlpanel/all-urls")[0];
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8180/url/getall")
      .then(function (response) {
        setItems(Array.from(response.data));
      })
      .catch(function (error) {
        setMessage(error.response.data.ERROR);
        setError(true);
      });
  }, []);
  return (
    <div>
      {items.length !== 0 && (
        <div className="cp-data-container">
          {items.map((item, index) => (
            <div key={index} className="cp-data-card">
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
                  <img src={copyicon} alt="Kopyala" />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Urls;
