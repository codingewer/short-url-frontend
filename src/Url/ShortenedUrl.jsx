import { useParams } from "react-router";
import "./Ads.css";
import AdsComponent from "./AdsComponent";
import Footer from "../Bars/Footer";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect, useState } from "react";
import axios from 'axios';

function ShortenedUrl() {
  const { adIndex, shortenedUrl } = useParams();
  const [adBlockDetected, setAdBlockDetected] = useState(false);
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
      window.location.href= url.OrginalUrl
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8180/url/get/" + shortenedUrl)
      .then(function (response) {
        setUrl(response.data);
      })
      .catch(function (error) {
      });
      const hasAdBlockClass = () => {
        const elementsWithAdBlockClass = document.getElementsByClassName('adsbygoogle');
        if (elementsWithAdBlockClass.length === 0) {
          setAdBlockDetected(true);
        }
      };
  
      hasAdBlockClass();
  }, []);
  if(adBlockDetected){
    alert("Reklam engellendi. Lütfen reklam engelini kaldırın!")
  }else{
    alert("Reklam engelleyici kullanmayın")
  }

  return (
    <>
      <div className="ads-container">
        <div className="ad-content">
          <AdsComponent dataAdSlot="3634852612" />
        <button disabled={adBlockDetected}  onClick={handleSkip}>
            {index > 3 ? "Linke Git!" : "Reklamı Geç"}
          </button>
          {
            adBlockDetected && <span>Reklam engellendi. Lütfen reklam engelini kaldırın!</span>
          }
            <span>Reklamları geçtikten sonra linke yönledirileceksiniz!</span>
          
          <span>{index} / 4</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShortenedUrl;
