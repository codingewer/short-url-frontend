import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDetectAdBlock } from "adblock-detect-react";

function ShortenedUrl() {
  const { adIndex, shortenedUrl } = useParams();
  const [url, setUrl] = useState(null);
  const currentURL = window.location.href;
  const domain = currentURL.split("r/" + adIndex)[0];
  console.log(domain);
  const index = parseInt(adIndex);
  const handleSkip = () => {
    const nextIndex = index + 1;
    if (nextIndex < 5) {
      window.location.href = domain + "r/" + nextIndex;
    } else {
      window.location.href= url.originalurl
    }
  };
  const adBlockDetected = useDetectAdBlock();
  console.log(adBlockDetected)
  useEffect(() => {
    axios
    .get("http://localhost:8180/url/get/" + shortenedUrl)
    .then(function (response) {
      setUrl(response.data);
    })
    .catch(function (error) {
    });
      const adElements = document.querySelectorAll('.adsbygoogle');

      if (adElements.length === 0) {
        console.log('Reklam engelleyici algılandı.');
      } else {
       console.log('Reklam engelleyici algılanmadı.');
      }
  }, []);

  console.log(url);
  if (adBlockDetected) {
   alert("Merhaba reklam engelleyici");
  }
  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <AdsComponent dataAdSlot="3634852612" />
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
