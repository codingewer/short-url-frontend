import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect, useState } from "react";
import axios from "axios";

function ShortenedUrl() {
  const { adIndex, shortenedUrl } = useParams();
  const adBlockDetected = useDetectAdBlock();

  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  const [url, setUrl] = useState();
  console.log(domain);
  const index = parseInt(adIndex);
  const handleSkip = () => {
    const nextIndex = index + 1;
    if (nextIndex < 5) {
      window.location.href = domain + "r/" + nextIndex;
    } else {
      window.location.href = url.OrginalUrl;
    }
  };
  useEffect(() => {
    if (index === 4) {
      axios
        .get(
          "https://shorturl-backend-vn3o.onrender.com/url/get/" + shortenedUrl
        )
        .then(function (response) {
          setUrl(response.data);
        })
        .catch(function (error) {});
    }
  }, []);
  console.log(url);
  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <span>{url?.Description}</span>
          <AdsComponent />
          <button disabled={adBlockDetected} onClick={handleSkip}>
            {index > 3 ? "Linke Git!" : "Reklamı Geç"}
          </button>
          {adBlockDetected ? (
            <span>Reklam engelleme sistemi aktif, reklamı geçemediniz!</span>
          ) : (
            <span>Reklamları geçtikten sonra linke yönledirileceksiniz!</span>
          )}
          <span>{index} / 4</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
